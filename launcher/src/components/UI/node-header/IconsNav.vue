<template>
  <div class="icons-box">
    <div
      class="icon-btn"
      @mouseover="showHelpText = true"
      @mouseleave="showHelpText = false"
    >
      <img alt="help-icon" src="/img/icon/header-icons/question-mark.png" />
      <span class="help-text" v-if="showHelpText">Help</span>
    </div>

    <div
      class="icon-btn"
      @mouseover="showNotifText = true"
      @mouseleave="showNotifText = false"
    >
      <img alt="Login" src="/img/icon/header-icons/megaphone9.png" />
      <span class="notif-text" v-if="showNotifText">Notifications</span>
    </div>
    <div
      class="icon-btn"
      v-if="isUpdateAvailable"
      @mouseover="showUpdateText = true"
      @mouseleave="showUpdateText = false"
    >
      <img alt="update-icon" src="/img/icon/header-icons/update-green.png" />
      <span class="update-text" v-if="showUpdateText">Update</span>
    </div>
    <div
      class="icon-btn"
      @click="updateModalHandler"
      v-else
      @mouseover="showUpdateText = true"
      @mouseleave="showUpdateText = false"
    >
      <img alt="update-icon" src="/img/icon/header-icons/update-blue.png" />
      <span class="update-text" v-if="showUpdateText">Update</span>
    </div>

    <div
      class="icon-btn"
      @mouseover="showSettingText = true"
      @mouseleave="showSettingText = false"
    >
      <img alt="Login" src="/img/icon/header-icons/setting4.png" />
      <span class="setting-text" v-if="showSettingText">Setting</span>
    </div>

    <div
      class="icon-btn"
      @mouseover="showExitText = true"
      @mouseleave="showExitText = false"
    >
      <img alt="Login" src="/img/icon/header-icons/exit9.png" />
      <span class="exit-text" v-if="showExitText">Exit</span>
    </div>
    <update-modal
      @remove-modal="removeModalHandler"
      @update-confirm="updateConfirmationHandler"
      v-if="showUpdateModal"
    ></update-modal>
    <update-waiting v-if="updateWaitingModal"></update-waiting>
  </div>
</template>
<script>
import ControlService from "@/store/ControlService";
import UpdateModal from "./UpdateModal.vue";
import UpdateWaiting from "./UpdateWaiting.vue";
export default {
  components: { UpdateModal, UpdateWaiting },
  data() {
    return {
      isUpdateAvailable: false,
      showUpdateModal: false,
      showHelpText: false,
      showExitText: false,
      showSettingText: false,
      showUpdateText: false,
      showNotifText: false,
      updateWaitingModal: false,
    };
  },
  methods: {
    runUpdates: async function () {
      await ControlService.runUpdates();
    },
    updateModalHandler() {
      this.showUpdateModal = true;
    },
    removeModalHandler() {
      this.showUpdateModal = false;
    },
    updateConfirmationHandler: async function () {
      this.showUpdateModal = false;
      this.updateWaitingModal = true;
      await this.runUpdates();
      this.updateWaitingModal = false;
    },
  },
};
</script>
<style scoped>
.icons-box {
  width: 25%;
  max-width: 250px;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.icon-btn {
  width: 14.5%;
  height: 85%;
  border-radius: 100%;
  background-color: #336666;
  box-shadow: 1px 1px 3px 1px rgb(33, 58, 53);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.icon-btn {
  width: 14%;
  height: 85%;
  border: 2px solid #a5a5a5;
  border-radius: 100%;
  background-color: #336666;
  box-shadow: 1px 1px 5px 1px rgb(33, 58, 53);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition-duration: 200ms;
}
.icon-btn:hover {
  background-color: #274f4f;
  border: 2px solid rgb(141, 141, 141);
  transition-duration: 200ms;
}
.icon-btn:active {
  box-shadow: none;
  background-color: #274f4f;
  transition-duration: 200ms;
  transform: scale(0.92);
}
.icon-btn:active img {
  /* width: 65%;
  height: 65%; */
  box-shadow: none;
}
.icon-btn img {
  width: 70%;
  height: 70%;
  transform: scale(1);
}
.help-text {
  width: 20px;
  height: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  bottom: -10px;
  left: 3px;
  transition-duration: 500ms;
}
.notif-text {
  width: 20px;
  height: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  bottom: -10px;
  left: -20px;
  transition-duration: 500ms;
}
.update-text {
  width: 20px;
  height: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  bottom: -10px;
  left: -4px;
  transition-duration: 500ms;
}
.setting-text {
  width: 20px;
  height: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  bottom: -10px;
  left: -2px;
  transition-duration: 500ms;
}
.exit-text {
  width: 20px;
  height: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  bottom: -10px;
  left: 6px;
  transition-duration: 500ms;
}
</style>
