import { NodeService } from './NodeService.js'
import { ServiceVolume } from './ServiceVolume.js'

export class GethService extends NodeService {
  static buildByUserInput (network, ports, dir) {
    const service = new GethService()
    service.setId()
    const workingDir = service.buildWorkingDir(dir)
        
    const volumes = [
      new ServiceVolume(workingDir + '/data', '/root/.ethereum')
    ]

    service.init(
      'GethService',  // service
      service.id, // id
      1,  // configVersion
      'ethereum/client-go', // image
      'v1.10.20', // imageVersion
      'geth --' + network + ' --http --http.port=8545 --http.addr=0.0.0.0 --http.vhosts="*" --allow-insecure-unlock --http.api="debug,eth,net,web3,personal" --ws --ws.port=8546 --ws.addr=0.0.0.0 --ws.api="debug,eth,net,web3" --ws.origins="*" --metrics --metrics.expensive --metrics.port=6060 --metrics.addr=0.0.0.0', // command
      null, // entrypoint
      null, // env
      ports,  // ports
      volumes,  // volumes
      'root', // user
      network // network
      // executionClients
      // consensusClients
    )

    return service
  }

  static buildByConfiguration (config) {
    const service = new GethService()

    service.initByConfig(config)

    return service
  }

  buildExecutionClientHttpEndpointUrl () {
    return 'http://stereum-' + this.id + ':8545'
  }

  buildExecutionClientWsEndpointUrl () {
    return 'ws://stereum-' + this.id + ':8546'
  }

  buildExecutionClientMetricsEndpoint () {
    return 'stereum-' + this.id + ':6060'
  }

  buildPrometheusJob () {
    return `\n  - job_name: stereum-${this.id}\n    metrics_path: /debug/metrics/prometheus\n    static_configs:\n      - targets: [${this.buildExecutionClientMetricsEndpoint()}]`
  }
}

// EOF
