<template>
  <Teleport to="body">
    <div class="preloader"></div>
  </Teleport>
</template>

<style scoped lang="scss">
.preloader {
  background: #f2eee9 url(../assets/loadGif/loading.gif) no-repeat center center;
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 999;
}
</style>
