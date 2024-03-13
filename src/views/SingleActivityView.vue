<template>
  <div>
    <div class="single-activity">
      <div class="single-activity-hero">
        <div v-if="thingData" class="container">
          <h1>{{ thingData.name }}</h1>
          <p class="hero-desc">{{ thingData.description }}</p>
          <div class="hero-img-wrap">
            <img :src="thingData.image.url" />
          </div>
        </div>
      </div>

      <div v-if="thingData" class="activities-section">
        <div class="container">
          <p class="section-headers">Activities</p>
          <div class="activities-grid">
            <div v-for="activity in thingData.activities" :key="activity.name">
              <div class="img-wrap">
                <img :src="activity.image.url" />
              </div>
              <div class="content-wrap">
                <p class="act-name">{{ activity.name }}</p>
                <p v-if="activity.phone"><span>Phone:</span> {{ activity.phone }}</p>
                <p v-if="activity.durationFrom">
                  <span>Duration:</span> {{ activity.durationFrom }}h - {{ activity.durationTo }}h
                </p>
                <p v-if="activity.difficulty"><span>Difficulty:</span> {{ activity.difficulty }}</p>
                <p v-if="activity.whenFrom">
                  <span>When:</span> {{ activity.whenFrom }} - {{ activity.whenTo }}
                </p>
                <p v-if="activity.street"><span>Location:</span> {{ activity.street }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchData } from '../globalFunc/apiCallfunc'
import Footer from '../components/FooterComp.vue'

const route = useRoute()
const id = ref(route.params.id)
const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/thingstodo/${id.value}`
const thingData = ref(null)
const thingErr = ref(null)

onMounted(async () => {
  await fetchData(apiUrl, thingData, thingErr)
})
</script>

<style scoped lang="scss">
.single-activity {
  .single-activity-hero {
    padding-top: 8rem;
    background-color: #f2eee9;

    h1 {
      font-size: 6.4rem;
      font-weight: 600;
    }

    .hero-desc {
      line-height: 1.3;
      font-size: 1.8rem;
      margin-top: 2rem;
    }

    .hero-img-wrap {
      margin-top: 2rem;
      position: relative;
      bottom: -30px;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }

  /**Activities Section */
  .activities-section {
    padding-top: 8rem;
    padding-bottom: 6rem;

    .activities-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 2rem;
      margin-top: 2rem;

      .img-wrap {
        margin-bottom: 0;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }

      .content-wrap {
        padding: 1rem;
        p {
          margin-bottom: 1rem;
          font-size: 1.6rem;
        }

        .act-name {
          font-weight: 500;
        }

        span {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
