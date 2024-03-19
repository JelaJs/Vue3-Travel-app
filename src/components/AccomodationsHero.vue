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
          v-show="weather === 'summer'"
          src="../assets/accomodationPageImgs/summer.jpg"
          alt="Accomodation summer image"
        />
        <img
          v-show="weather === 'winter'"
          src="../assets/accomodationPageImgs/winter.jpg"
          alt="Accomodation winter image"
        />
        <div class="btns-wrap">
          <button class="btn-summer" @click="changeWeather('summer', $event)" value="summer">
            Summer
          </button>
          <button class="btn-winter active" @click="changeWeather('winter', $event)" value="winter">
            Winter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const weather = ref('winter')

const changeWeather = (weatherStr, e) => {
  const btnSum = document.querySelector('.btn-summer')
  const btnWin = document.querySelector('.btn-winter')

  if (e.target.value === 'summer') {
    btnSum.classList.add('active')
    btnWin.classList.remove('active')
  }

  if (e.target.value === 'winter') {
    btnWin.classList.add('active')
    btnSum.classList.remove('active')
  }
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

/**Responsive */
@media (max-width: 1200px) {
  .accomodations-hero h1 {
    font-size: 5.4rem;
  }
}

@media (max-width: 960px) {
  .accomodations-hero h1 {
    font-size: 4.1rem;
  }

  .accomodations-hero p {
    font-size: 1.6rem;
  }
}

@media (max-width: 630px) {
  .accomodations-hero h1 {
    font-size: 3.2rem;
  }
}
</style>
