<template>
  <div class="home-explore-sec">
    <div class="container">
      <div class="wrap">
        <img src="../assets/exploreHomeImg/map.jpg" alt="map image" />
        <div class="content-wrap">
          <p class="head">Didn't find any interesting for you?</p>
          <p>Explore and find proper accommodation for yourself at any location</p>
          <button @click="goToExplorePage">Explore</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToExplorePage = () => {
  router.push('/explore')
}
</script>

<style scoped lang="scss">
.home-explore-sec {
  padding: 6rem 0;

  .wrap {
    position: relative;

    img {
      width: 100%;
      height: 70rem;
      object-fit: cover;
      border-radius: 10px;
      filter: grayscale(100%);
    }

    .content-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      background-color: #fff;
      padding: 2rem;
      border-radius: 10px;

      p {
        color: #000;
        font-size: 1.8rem;
      }

      .head {
        font-size: 3.2rem;
        font-weight: 600;
        margin-bottom: 2rem;
      }

      button {
        margin-top: 3rem;
        background-color: #000;
        color: #fff;
        border: none;
        outline: none;
        font-size: 1.8rem;
        padding: 1.5rem 3rem;
        border-radius: 100px;
        cursor: pointer;
        letter-spacing: 2px;
        transition: all 0.3s;
      }

      button:hover {
        padding: 1.5rem 4rem;
      }
    }
  }
}
</style>
