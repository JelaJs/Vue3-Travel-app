<template>
  <div>
    <div class="singleAcc-page-hero">
      <div v-if="accData" class="container">
        <button class="home-btn" @click="goHome">← Home</button>
        <h1 class="acc-page-header">{{ accData.name }}</h1>
        <p class="acc-page-desc">{{ accData.description }}</p>
        <div class="acc-page-imgs-wrap">
          <img
            v-if="weather === 'winter'"
            :src="accData.image_winter.url"
            alt="Accomodation winter image"
          />
          <img
            v-if="weather === 'summer'"
            :src="accData.image_summer.url"
            alt="Accomodation summer image"
          />
          <div v-if="accData.image_summer !== null" class="btns-wrap">
            <button class="btn-summer" @click="changeWeather('summer')">Summer</button>
            <button class="btn-winter active" @click="changeWeather('winter')">Winter</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="accData" class="single-accs-section">
      <div class="container">
        <p class="section-headers">{{ accData.name }}</p>
        <div class="grid">
          <div
            v-for="acc in accomodations"
            :key="acc.id"
            class="acc-wrap"
            @click="goToSingleAcc(acc.id)"
          >
            <div class="img-inner-wrap">
              <img :src="acc.image.url" alt="Accomodations images" />
              <button class="btn-save">+</button>
            </div>
            <div class="content-inner-wrap">
              <p class="acc-type">{{ acc.type }}</p>
              <p class="acc-name">{{ acc.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchAccData } from '../globalFunc/singleAccfunc'
import { fetchData } from '../globalFunc/apiCallfunc'
import { useRouter } from 'vue-router'

const route = useRoute()
const id = ref(route.params.id)
const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/accomodation/${id.value}`
const accData = ref(null)
const errorData = ref(null)
const nameLink = ref(null)
const weather = ref('winter')
const accomodations = ref(null)
const accomodationsError = ref(null)
const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goToSingleAcc = (number) => {
  router.push(`/singleacc/${id.value}/${number}`)
}

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

onMounted(async () => {
  await fetchAccData(apiUrl, accData, nameLink, errorData)
  const apiUrlAccs = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/${nameLink.value}`
  await fetchData(apiUrlAccs, accomodations, accomodationsError)
})
</script>

<style scoped lang="scss">
.singleAcc-page-hero {
  padding-top: 8rem;
  background-color: #f2eee9;

  .home-btn {
    border: none;
    cursor: pointer;
    font-size: 1.8rem;
  }

  .acc-page-header {
    font-size: 6.4rem;
    font-weight: 600;
  }

  .acc-page-desc {
    max-width: 1000px;
    line-height: 1.3;
    font-size: 1.8rem;
    margin-top: 2rem;
  }

  .acc-page-imgs-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 3rem;
    border-radius: 10px;
    bottom: -50px;
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

/**Second Section */
.single-accs-section {
  padding-top: 10rem;
  padding-bottom: 8rem;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-top: 1rem;
  }

  .acc-wrap {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    border: 1px solid #8d8d8d;
  }

  .acc-wrap:hover img {
    transform: scale(1.08);
  }

  .img-inner-wrap {
    position: relative;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 185px;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    transition: all 0.3s;
    cursor: pointer;
  }

  .btn-save {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    color: #fff;
    font-size: 2.3rem;
    font-weight: 500;
    padding: 0.5rem;
    border: 1px solid #fff;
    cursor: pointer;
  }

  .content-inner-wrap {
    padding: 1rem;
  }

  .acc-type {
    font-size: 1.4rem;
    color: #00000070;
  }

  .acc-name {
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }
}
</style>
