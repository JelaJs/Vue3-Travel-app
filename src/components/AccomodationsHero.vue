<template>
  <div class="accomodations-hero">
    <div class="container">
      <h1>Accomodation</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt turpis mi, in
        mattis eros tempus et. Quisque ut velit id neque consequat suscipit. Praesent finibus sed
        risus eu porttitor. Proin ac porttitor leo, ac sollicitudin sapien. Aenean mattis diam vel
        scelerisque auctor. Nulla pulvinar feugiat nibh
      </p>
      <div class="imgs-wrap">
        <img
          v-if="weather === 'summer'"
          src="../assets/accomodationPageImgs/summer.jpg"
          alt="Accomodation summer image"
        />
        <img
          v-if="weather === 'winter'"
          src="../assets/accomodationPageImgs/winter.jpg"
          alt="Accomodation winter image"
        />
        <div class="btns-wrap">
          <button class="btn-summer" @click="changeWeather('summer')">Summer</button>
          <button class="btn-winter active" @click="changeWeather('winter')">Winter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const weather = ref('winter')

const changeWeather = (weatherStr) => {
  const btns = document.querySelectorAll('button')
  weather.value = weatherStr
  btns.forEach((btn) => {
    if (!btn.classList.contains('active')) {
      btn.classList.add('active')
    } else {
      btn.classList.remove('active')
    }
  })
}
</script>

<style scoped lang="scss">
.accomodations-hero {
  padding-top: 8rem;
  background-color: #f2eee9;

  h1 {
    font-size: 6.4rem;
  }

  p {
    margin-top: 2rem;
    font-size: 1.8rem;
    line-height: 1.6;
  }

  .imgs-wrap {
    margin-top: 2rem;
    position: relative;
    bottom: -30px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .btns-wrap {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    button {
      background-color: rgba(0, 0, 0, 0.466);
      color: #fff;
      border: none;
      outline: none;
      padding: 1rem 2rem;
      cursor: pointer;
    }

    .btn-summer {
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px;
    }

    .btn-winter {
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
    }

    .active {
      background-color: #fff;
      color: #000;
    }
  }
}
</style>
