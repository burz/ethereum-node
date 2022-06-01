import { HetznerServer } from '../HetznerServer.js'
import { NodeConnection } from '../NodeConnection.js'
import { ServicePort, servicePortProtocol } from './ServicePort.js'
import { ServiceManager } from '../ServiceManager.js'
import { GethService } from './GethService.js'
const log = require('electron-log')

jest.setTimeout(500000)

test('geth installation', async () => {
  const serverSettings = {
    name: 'Geth--integration-test--ubuntu-2204',
    image: 'ubuntu-22.04',
    location: 'fsn1',
    server_type: 'cpx21',
    start_after_create: true
  }

  const testServer = new HetznerServer()
  await testServer.create(serverSettings)
  log.info('Server started')

  const connectionParams = {
    host: testServer.serverIPv4,
    port: '22',
    username: 'root',
    password: testServer.serverRootPassword,
    privatekey: undefined
  }
  const nodeConnection = new NodeConnection(connectionParams)
  const serviceManager = new ServiceManager(nodeConnection)
  await testServer.connect(nodeConnection)

  await testServer.passwordAuthentication(testServer.serverRootPassword)

  //prepare node
  await nodeConnection.sshService.exec(` mkdir /etc/stereum &&
  echo "stereum_settings:
  settings:
    controls_install_path: /opt/stereum
    os_user: stereum
    updates:
      lane: stable
      unattended:
        install: false
  " > /etc/stereum/stereum.yaml`)
  await nodeConnection.findStereumSettings()
  await nodeConnection.prepareStereumNode(nodeConnection.settings.stereum.settings.controls_install_path);
  
  //install geth
  const ports = [
    new ServicePort(null, 30303, 30303, servicePortProtocol.tcp),
    new ServicePort(null, 30303, 30303, servicePortProtocol.udp)
  ]
  const executionClient = GethService.buildByUserInput('goerli', ports, nodeConnection.settings.stereum.settings.controls_install_path + '/geth')
  await nodeConnection.writeServiceConfiguration(executionClient.buildConfiguration())
  await serviceManager.manageServiceState(executionClient.id, 'started')

  // get logs
  await testServer.Sleep(10000)
  const status = await nodeConnection.sshService.exec(`docker logs stereum-${executionClient.id}`)

  // destroy
  await nodeConnection.destroyNode()
  await nodeConnection.sshService.disconnect()
  await testServer.destroy()

  // check if geth service established WebSocket connection
  // idk why but logs are stored in stderr but stdout string is empty
  expect(status.stderr).toMatch(/WebSocket enabled/)
  expect(status.stderr).toMatch(/Started P2P networking/)
  expect(status.stderr).not.toMatch(/Rejected WebSocket connection/)
})
