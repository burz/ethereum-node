<template>
  <div class="config-node">
    <div class="server">
      <span class="title">Server</span>
      <div class="server-details">
        <span class="ip">{{ ipAddress }}</span>
        <span class="name">{{ maschinName }}</span>
      </div>
    </div>
    <div class="config-bg">
      <div class="edit-btn">
        <router-link to="/node">
          <span>back to NODE</span>
          <img
            src="../../../../public/img/icon/manage-node-icons/undo1.png"
            alt="icon"
          />
        </router-link>
      </div>
      <div class="config-btns">
        <div class="config-add" @click="$emit('modalPreset')">
          <span class="btn-text">ADD 1 CLICK PRESET</span>
        </div>
        <div class="config-network">
          <span class="btn-text">CHANGE NETWORK</span>
        </div>
        <div class="config-priority">
          <span class="btn-text">ADD PRIORITY</span>
        </div>
      </div>
      <div class="delete-box">
        <div class="delete-btn" @click="openRemoveModal">
          <span class="btn-text">DELETE CONFIGS</span>
          <img
            src="../../../../public/img/icon/manage-node-icons/bin.png"
            alt="icon"
          />
        </div>
      </div>
      <div class="remove-modal-parent" v-if="removeModal">
        <div class="modal-opacity"></div>
        <div class="remove-modal-content">
          <div class="title-box">
            <img
              src="../../../../public/img/icon/manage-node-icons/stop.png"
              alt=""
            />
          </div>
          <div class="remove-message">
            <span>All the plugins will be removed.</span>
            <span>Are you sure?</span>
          </div>
          <div class="remove-btn">
            <div class="cancel-box" @click="cancelRemove">
              <span>Cancel</span>
            </div>
            <div class="yes-box" @click="removeConfirmation">
              <span>Remove</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapWritableState } from "pinia";
import { useNodeHeader } from "@/store/nodeHeader";
import { useNodeStore } from "@/store/theNode";
import ControlService from "@/store/ControlService";
import { useServices } from "@/store/services";
export default {
  data() {
    return {
      modalActive: false,
      removeModal: false,
      removeIsConfirmed: false,
      maschinName: "Server Name",
      ipAddress: "0.0.0.0",
    };
  },
  created() {
    this.maschinNameMet();
  },
  computed: {
    ...mapWritableState(useNodeHeader, {
      headerServices: "runningServices",
    }),
    ...mapWritableState(useNodeStore, {
      configData: "configData",
    }),
    ...mapWritableState(useServices, {
      installedServices: "installedServices",
      runningServices: "runningServices",
    }),
  },
  methods: {
    async maschinNameMet() {
      try {
        const response = await ControlService.getServerVitals();
        let data = await response.serverVitals.stdout;
        const arr = data.split(/\r?\n/);
        this.maschinName = arr[0];
      } catch (error) {
        console.log(error);
      }
    },
    openModal() {
      this.modalActive = true;
    },
    closeModal() {
      this.modalActive = false;
    },
    openRemoveModal() {
      this.removeModal = true;
    },
    cancelRemove() {
      this.removeModal = false;
    },
    removeConfirmation() {
      this.removeModal = false;
      this.removeIsConfirmed = true;
      this.removeAllPlugins();
      this.destroyNode();
    },
    removeAllPlugins() {
      if (this.removeIsConfirmed) {
        this.headerServices = [];
        this.runningServices = [];
        this.installedServices = [];
      }
      this.removeIsConfirmed = false;
    },
    destroyNode: async function () {
      console.log(await ControlService.destroy());
    },
  },
};
</script>
<style scoped>
.config-node {
  grid-column: 1;
  width: 100%;
  height: 100%;
  padding: 5px;
  margin-top: 1px;
  display: grid;
  background-color: #3b3b3b;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
}
.config-bg {
  grid-column: 1;
  grid-row: 3/10;
  width: 95%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(9, 1fr);
  background-color: #606060;
  border-radius: 10px;
  margin: 0 auto;
}
.server {
  grid-column: 1;
  grid-row: 1/3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.server .title {
  width: max-content;
  height: 15px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgb(138, 138, 138);
  text-transform: uppercase;
  margin-left: 8px;
}
.server-details {
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.server-details span:first-child {
  width: 100%;
  height: 30%;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #8a8a8a;
  text-transform: uppercase;
  border: 1px solid #a1a1a1;
  margin-top: 2px;
  background-color: rgb(44, 44, 44);
  border-radius: 5px;
  padding: 4px;
}
.server-details span:last-child {
  width: 100%;
  height: 30%;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #8a8a8a;
  text-transform: uppercase;
  border: 1px solid #a1a1a1;
  margin-top: 2px;
  background-color: rgb(44, 44, 44);
  border-radius: 5px;
  padding: 4px;
}

.config-box .config-title {
  grid-column: 2/7;
  grid-row: 1;
  margin-left: 20px;
}
.config-title span {
  font-size: 8px;
  font-weight: bold;
  background-color: #334b3f;
  border: 1px solid rgb(169, 168, 168);
  padding: 4px 5px;
  border-radius: 8px;
  box-shadow: 1px 1px 5px 2px rgb(69, 68, 68);
}

.config-btns {
  grid-column: 1/6;
  grid-row: 2/5;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
}
.config-btns .config-add,
.config-btns .config-network,
.config-btns .config-priority {
  width: 90%;
  height: 32px;
  background-color: #292929;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgb(196, 196, 196);
  border: 1px solid #787878;
  margin-top: 5px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 1px 3px 1px #2c2c2c;
}
.config-btns .config-add span,
.config-btns .config-network span,
.config-btns .config-priority span {
  width: 100%;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgb(196, 196, 196);
}
.config-btns .config-add:hover,
.config-btns .config-network:hover,
.config-btns .config-priority:hover {
  background-color: #2c2c2c;
  transform: scale(1.02);
}
.config-btns .config-add:active,
.config-btns .config-network:active,
.config-btns .config-priority:active {
  box-shadow: none;
  transform: scale(1);
}
.delete-box {
  grid-column: 1/6;
  grid-row: 6/7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-btn {
  grid-column: 1/7;
  grid-row: 1/2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5px;
}
.edit-btn a:hover {
  background-color: #2c2c2c;
  transform: scale(1.02);
}
.edit-btn a:active {
  box-shadow: none;
  transform: scale(1);
}
.edit-btn a {
  width: 90%;
  height: 32px;
  background-color: #292929;
  font-size: 0.6rem;
  font-weight: 800;
  color: rgb(194, 194, 194);
  border: 1px solid #787878;
  margin-top: 5px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 1px 3px 1px #2c2c2c;
}
.edit-btn span {
  color: rgb(249, 187, 73);
  font-size: 0.7rem;
  font-weight: 800;
  text-align: center;
  margin-left: 10px;
  text-transform: uppercase;
}
.edit-btn img {
  width: 18px;
  height: 18px;
  background-color: transparent;
  margin-right: 10px;
}
.delete-box {
  grid-column: 1/6;
  grid-row: 8;
}
.delete-box .delete-btn {
  width: 90%;
  height: 32px;
  border: 1px solid #828282;
  border-radius: 8px;
  box-shadow: 0 1px 4px #373737;
  background-color: #303030;
  cursor: pointer;
  outline-style: none;
  color: #d25353;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-text {
  margin-left: 10px;
}
.router-box .btn-text {
  text-decoration: none;
  color: #4eb051;
}
.delete-box .delete-btn:hover {
  background-color: #2c2c2c;
  transform: scale(1.02);
}
.delete-box .delete-btn:active {
  transform: scale(1);
  border: 1px solid #f46969;
  color: #ef5252;
  box-shadow: none;
}
.delete-btn img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
.btn-icon {
  width: 21px;
  height: 21px;
  border-radius: 5px;
  margin-right: 5px;
}
.btn-icon img {
  width: 21px;
  height: 21px;
}

.config-row {
  grid-column: 1/7;
  grid-row: 2;
  width: 95%;
  height: 30px;
  border: 2px solid rgb(155, 212, 236);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  margin: 0 auto;
}

.config-row .row-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 25px;
}
.config-row .row-content span {
  width: 80%;
  font-size: 0.7rem;
  font-weight: 700;
}
.testnet-icon {
  width: 20%;
  min-width: 23px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.testnet-icon img {
  width: 23px;
  height: 23px;
}
.remove-modal-parent {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 97;
}
.modal-opacity {
  width: 100%;
  height: 100%;
  background-color: black;
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0.7;
  z-index: 98;
}
.remove-modal-content {
  width: 40%;
  height: 40%;
  border-radius: 3rem;
  background-color: #324844;
  border: 4px solid rgb(171, 170, 170);
  z-index: 99;
  opacity: 1;
  position: fixed;
  top: 30%;
  left: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 5px 1px rgb(6, 6, 6);
}
.remove-message {
  width: 90%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.remove-message span {
  color: rgb(195, 195, 195);
  font-size: 1.1rem;
  font-weight: 800;
}
.remove-btn {
  width: 80%;
  height: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.yes-box {
  width: 30%;
  height: 50%;
  border-radius: 10px;
  background-color: #e94949;
  box-shadow: 0 1px 3px 1px rgb(35, 59, 53);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgb(210, 210, 210);
}
.cancel-box {
  width: 30%;
  height: 50%;
  border-radius: 10px;
  border: 3px solid #8f8f8f;
  background-color: #32564d;
  box-shadow: 0 1px 3px 1px rgb(35, 59, 53);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgb(187, 187, 187);
}
.cancel-box:hover {
  background-color: #2c433d;
  transform: scale(1.1);
  transition: all 100ms;
}
.yes-box:hover {
  background-color: #e94949;
  border: none;
  transform: scale(1.1);
  transition: all 100ms;
  color: #d6d6d6;
}
.cancel-box:active {
  transform: scale(1);
  box-shadow: none;
}
.yes-box:active {
  transform: scale(1);
  box-shadow: none;
}
.title-box {
  width: 80%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-box img {
  width: 70px;
  height: 70px;
  margin-top: 10px;
}

::-webkit-scrollbar {
  width: 1px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(160, 160, 160);
  border-radius: 50px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
  margin: 10px;
}
</style>
