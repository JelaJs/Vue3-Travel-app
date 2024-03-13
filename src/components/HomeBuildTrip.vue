<template>
  <div class="home-build-section">
    <div class="container">
      <div class="build-wrap">
        <img src="../assets/heroSecImgs/homeImg.jpg" alt="Build trip section image" />
        <div class="build-overlay"></div>
        <div class="p-btn-wrap">
          <p class="build-header">Your Ideal Trip</p>
          <p class="build-desc">
            Plan and build out your dream vacation to Banff and Lake Louise with the Trip Builder.
          </p>
          <button class="build-btn" @click="goToBuildPage">Build Your Trip</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToBuildPage = () => {
  router.push('/yourtrip')
}
</script>

<style scoped lang="scss">
.home-build-section {
  padding-top: 8rem;

  .build-wrap {
    border-radius: 10px;
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .build-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 84.2rem;
    border-radius: 10px;
    background-color: #0000003a;
  }

  .p-btn-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
  }

  .build-header {
    font-weight: 600;
    font-size: 6.4rem;
  }

  .build-desc {
    margin-top: 2rem;
    font-size: 1.8rem;
  }

  .build-btn {
    margin-top: 5rem;
    padding: 1.5rem 3rem;
    border-radius: 100px;
    border: none;
    outline: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .build-btn:hover {
    background-color: rgb(163, 163, 197);
    color: white;
  }
}
</style>
