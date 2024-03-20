<template>
  <div class="hero-section">
    <div v-if="tripData" class="container">
      <Carousel :items-to-show="2.5" :wrap-around="true">
        <Slide v-for="slide in tripData.images" :key="slide">
          <div class="carousel__item">
            <img :src="slide.url" alt="" />
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <div class="info-flex">
        <div class="left">
          <h2>{{ tripData.name }}</h2>
          <p>{{ tripData.desc }}</p>
        </div>
        <div class="right">
          <div>
            <p class="who">Who's it for?</p>
            <p class="items" v-for="f in tripData.for" :key="f">{{ f.for }}</p>
          </div>
          <p class="when">When To Go:</p>
          <p class="when-info">{{ tripData.when }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchData } from '../globalFunc/apiCallfunc'

//Slider
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const route = useRoute()
const id = ref(route.params.id)
const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/tripideas/${id.value}`
const tripData = ref(null)
const tripErr = ref(null)

onMounted(async () => {
  await fetchData(apiUrl, tripData, tripErr)
  //console.log(tripData.value)
})
</script>

<style scoped lang="scss">
.hero-section {
  padding-top: 8rem;
  padding-bottom: 4rem;
  background-color: #f2eee9;
  .carousel__item {
    padding: 0 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      cursor: grab;
    }
  }

  .info-flex {
    margin-top: 6rem;
    display: flex;
    align-items: center;
    gap: 4rem;
    .left {
      width: 70%;
      h2 {
        font-size: 6.4rem;
      }

      p {
        font-size: 1.8rem;
        line-height: 1.4;
        margin-top: 2rem;
      }

      button {
        margin-top: 3.5rem;
        border: none;
        background-color: transparent;
        color: #000;
        font-size: 2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      button:hover {
        color: #0000007a;
      }
    }

    .right {
      background-color: #fff;
      padding: 3rem;
      border-radius: 10px;
      width: 30%;

      .who {
        font-size: 1.8rem;
        font-weight: 600;
      }

      .items {
        margin-top: 1rem;
        padding-left: 0.5rem;
      }

      .when {
        margin-top: 3rem;
        font-weight: 600;

        .when-info {
          font-weight: 400;
          margin-top: 1rem;
        }
      }
    }
  }
}

/**Responsive */
@media (max-width: 1200px) {
  .hero-section .info-flex .left h2 {
    font-size: 5.4rem;
  }
}

@media (max-width: 960px) {
  .hero-section .info-flex .left h2 {
    font-size: 4.2rem;
  }

  .hero-section .info-flex .left p {
    font-size: 1.6rem;
  }
}

@media (max-width: 740px) {
  .hero-section .info-flex .left h2 {
    font-size: 3.2rem;
  }

  .hero-section .info-flex {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 3rem;
  }

  .hero-section .info-flex .left {
    width: 100%;
  }

  .hero-section .info-flex .right {
    width: 60%;
  }
}

@media (max-width: 420px) {
  .hero-section .info-flex .right {
    width: 80%;
  }
}
</style>
