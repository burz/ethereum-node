<template>
  <div class="plugin-parent">
    <div class="select-box">
      <div class="icon-box">
        <img
          v-if="isTestnetActive"
          class="testnet-icon"
          src="../../../../public/img/icon/click-installation/testnet-icon.png"
          alt="icon"
        />
        <img
          v-if="isMainnetActive"
          class="mainnet-icon"
          src="../../../../public/img/icon/click-installation/mainnet-icon.png"
          alt="icon"
        />
      </div>
      <select
        class="ring-0"
        id="selector"
        @change="pluginNetworkHandler"
        v-model="selectedNetworks"
      >
        <option class="ring-0" value="" selected>CHOOSE A NETWORK</option>
        <option class="ring-0" value="mainnet">Mainnet</option>
        <option class="ring-0" value="testnet">Testnet</option>
      </select>
    </div>
    <div class="plugin-table">
      <div class="table-content">
        <div class="plugin-box">
          <div class="mainnet-container" v-if="isMainnetActive">
            <div
              class="mainnet-plugin"
              v-for="(item, index) in this.mainnetPlugins"
              :key="index"
            >
              <img
                :src="item.icon"
                alt="icon"
                :class="{
                  selectedItem:
                    item.id === this.selectedPreset?.id &&
                    item.serviceAvailable,
                  notAvailable: !item.serviceAvailable,
                }"
                @click="selectItemToInstall(item)"
              />
            </div>
          </div>
          <div class="testnet-container" v-if="isTestnetActive">
            <div
              class="testnet-plugin"
              v-for="(item, index) in this.testnetPlugins"
              :key="index"
            >
              <img
                @mousedown.stop
                :src="item.icon"
                alt="icon"
                :class="{
                  selectedItem:
                    item.id === this.selectedPreset?.id &&
                    item.serviceAvailable,
                  notAvailable: !item.serviceAvailable,
                }"
                @click="selectItemToInstall(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ControlService from "@/store/ControlService";
import { mapWritableState } from "pinia";
import { useClickInstall } from "@/store/clickInstallation";
import { useServices } from "@/store/services";
export default {
  data() {
    return {
      isMainnetActive: false,
      mainnetPlugins: [],
      isTestnetActive: false,
      testnetPlugins: [],
    };
  },
  computed: {
    ...mapWritableState(useClickInstall, {
      plugins: "presets",
      selectedPreset: "selectedPreset",
      selectedNetworks: "selectedNetworks",
    }),
    ...mapWritableState(useServices, {
      allServices: "allServices",
    }),
  },
  beforeUpdate() {
    this.mainnetNetworkHandler();
    this.testnetNetworkHandler();
  },
  mounted() {
    this.selectedNetworks = ""
    this.selectedPreset = undefined
  },
  methods: {
    mainnetNetworkHandler() {
      if (this.selectedNetworks == "mainnet") {
        this.mainnetPlugins = this.plugins.filter(
          (item) => item.network == "mainnet"
        );
        this.isMainnetActive = true;
        this.isTestnetActive = false;
      }
    },

    testnetNetworkHandler() {
      if (this.selectedNetworks == "testnet") {
        this.testnetPlugins = this.plugins.filter(
          (item) => item.network == "testnet"
        );
        this.isMainnetActive = false;
        this.isTestnetActive = true;
      }
    },
    selectItemToInstall: async function (item) {
      const constellation = await ControlService.getOneClickConstellation(
        item.name
      );
      let includedPlugins = this.allServices.filter((service) =>
        constellation.includes(service.service)
      );
      if (
        includedPlugins.map((e) => e.service).includes("BloxSSVService") ||
        includedPlugins.map((e) => e.service).includes("RocketpoolService")
      ) {
        includedPlugins.splice(
          includedPlugins.findIndex(
            (e) =>
              e.service != "BloxSSVService" &&
              e.service != "RocketpoolService" &&
              e.category === "validator"
          ),
          1
        );
      }
      item.includedPlugins = includedPlugins;
      this.selectedPreset = item;
      this.$emit("disableBtn");
    },
  },
};
</script>
<style scoped>
.plugin-parent {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
}
.select-box {
  width: 35%;
  height: 13%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(31, 31, 31);
  border: 2px solid rgb(126, 159, 151);
  border-radius: 5px;
  box-shadow: inset 0 1px 5px 1px rgb(18, 18, 18), 0 1px 3px 1px rgb(31, 31, 31);
}
.select-box #selector {
  width: 85%;
  height: 90%;
  border: none !important;
  border-radius: 5px;
  background-color: transparent;
  padding: 0;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgb(97, 194, 255);
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
}
.select-box #selector option {
  width: 100%;
  height: 100%;
  margin-left: 5px;
  border: none !important;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
}
.select-box:hover {
  border: 2px solid rgb(32, 191, 235);
}
.icon-box {
  width: 13%;
  height: 83%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-box img {
  width: 90%;
  height: 100%;
}
.plugin-table {
  width: 94%;
  height: 77%;
  border-radius: 20px;
  overflow-y: auto;
  box-shadow: 0 1px 2px 1px rgb(21, 45, 41);
}

.table-content {
  width: 100%;
  height: 100%;
  background-color: rgb(47, 114, 112);
}
.mainnet-container,
.testnet-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 50%);
  overflow-x: hidden;
  overflow-y: auto;
  align-items: center;
  justify-items: center;
}
.plugin-box {
  width: 100%;
  height: 100%;
}
.mainnet-plugin,
.testnet-plugin {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainnet-plugin img,
.testnet-plugin img {
  width: 52%;
  height: 75%;
  cursor: pointer;
}
.mainnet-plugin img:hover,
.testnet-plugin img:hover {
  transform: scale(1.1);
  transition-duration: 0.1s;
}
.mainnet-plugin img:active,
.testnet-plugin img:active {
  transform: scale(1);
  transition-duration: 0.1s;
}
.selectedItem {
  border: 2px solid rgb(53, 178, 246) !important;
  border-radius: 6px !important;
  box-shadow: 0px 1px 5px 2px rgb(31, 31, 31) !important;
}
.notAvailable {
  opacity: 0.2;
  pointer-events: none;
}

</style>
