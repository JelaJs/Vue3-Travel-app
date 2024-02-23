<template>
  <div class="home-get-section">
    <div class="container">
      <p class="section-headers">Get Inspired</p>
      <p class="sub-title">Trip Ideas:</p>
      <div v-if="tripIdeas" class="trip-flex">
        <div v-for="trip in tripIdeas" :key="trip.id">
          <div class="img-content-wrap">
            <div class="img-wrap">
              <img :src="trip.singleimage.url" alt="Single trip image" />
            </div>
          </div>
          <p class="trip-name">{{ trip.name }}</p>
          <p class="trip-duration"><span class="clock-icon">&#8987;</span>{{ trip.duration }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '../globalFunc/apiCallfunc'
const tripIdeas = ref(null)
const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/tripideas'
const errors = ref(null)

onMounted(async () => {
  await fetchData(apiUrl, tripIdeas, errors)
})
</script>

<style scoped lang="scss">
.home-get-section {
  padding-top: 35rem;

  .sub-title {
    margin-top: 3rem;
    font-weight: 500;
  }

  .trip-flex {
    display: flex;
    gap: 3rem;
    margin-top: 1rem;

    .img-wrap {
      border-radius: 10px;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      transition: all 0.3s;
    }

    .img-content-wrap:hover img {
      transform: scale(1.06);
      cursor: pointer;
    }

    .img-wrap {
      overflow: hidden;
    }

    .trip-name {
      margin-top: 0.5rem;
      font-weight: 600;
      font-size: 1.8rem;
    }

    .trip-duration {
      font-size: 1.3rem;
      margin-top: 0.5rem;
    }

    .clock-icon {
      margin-right: 0.5rem;
    }
  }
}
</style>
