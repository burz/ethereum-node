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
        <router-link to="/manage">
          <span>to edit node</span>
          <img
            src="../../../../public/img/icon/node-journal-icons/maintenance3.png"
            alt="icon"
          />
        </router-link>
      </div>
      <div class="config-btns">
        <div class="config-update">
          <span class="btn-text">UPDATE</span>
          <img
            alt="update-icon"
            src="/img/icon/header-icons/update-green.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ControlService from "@/store/ControlService";
export default {
  data() {
    return {
      maschinName: "Server Name",
      ipAddress: "0.0.0.0",
    };
  },
  mounted() {
    this.maschinNameMet();
  },
  methods: {
    async maschinNameMet() {
      try {
        const response = await ControlService.getServerVitals();
        let data = await response.serverVitals.stdout;
        const arr = data.split(/\r?\n/);
        this.maschinName = arr[0];
      } catch (error) {
        error;
      }
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
  grid-template-columns: 1fr;
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

.config-btns {
  grid-column: 1;
  grid-row: 2/10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;
}

.config-btns .config-update {
  grid-column: 1;
  grid-row: 2/3;
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

.config-btns .config-update span {
  width: 50%;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgb(196, 196, 196);
}
.config-btns .config-update img {
  width: 20px;
  height: 17px;
  margin-right: 10px;
}

.config-btns .config-update:hover {
  background-color: #2c2c2c;
  transform: scale(1.02);
}

.config-btns .config-update:active {
  box-shadow: none;
  transform: scale(1);
}

.edit-btn {
  grid-column: 1;
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

.btn-text {
  margin-left: 10px;
}
.router-box .btn-text {
  text-decoration: none;
  color: #4eb051;
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
</style>
