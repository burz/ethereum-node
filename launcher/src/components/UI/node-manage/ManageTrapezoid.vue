<template>
  <div class="trap-container">
    <div class="trap-box">
      <div class="trapezoid">
        <slot></slot>
      </div>
      <div class="plus-icon">
        <slot name="plusIcon"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.trap-container {
  width: 98%;
  margin: 0 auto;
  height: 155px;
  background-color: #181818;
  display: flex;
  justify-content: center;
  align-items: center;
}
.trap-box {
  width: 95%;
  height: 84%;
  display: flex;
  background-image: url("../../../../public/img/icon/manage-node-icons/trap.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  justify-content: center;
  align-items: center;
  position: relative;
}
.trapezoid {
  width: 70%;
  height: 73%;
  margin-top: 5px;
}

.plus-icon {
  position: absolute;
  top: 3%;
  right: 1%;
  width: 50px;
  height: 30px;
  border-radius: 50px;
}
</style>
