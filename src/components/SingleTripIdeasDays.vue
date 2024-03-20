<template>
  <div v-if="tripData" class="trip-days-section">
    <div class="container">
      <div class="tripdays-grid">
        <div class="days-menu">
          <ul>
            <li
              v-for="day in tripData.days"
              :key="day.day"
              @click="scrollToSection(day.day.slice(3))"
            >
              {{ day.day }}
            </li>
          </ul>
        </div>
        <div class="days-activites">
          <div
            v-for="day in tripData.days"
            :key="day.day"
            class="single-day"
            :class="day.day.slice(3)"
          >
            <h4>{{ day.day }}</h4>
            <p>{{ day.description }}</p>
            <div class="activities-wrap">
              <div
                v-for="activity in day.activities"
                :key="activity.thingstodo_id"
                class="single-activity"
                @click="goToSingleActivity(activity.thingstodo_id)"
              >
                <div class="activities-img-wrap">
                  <img :src="activity.activityImage.url" />
                </div>
                <p>{{ activity.activityname }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchData } from '../globalFunc/apiCallfunc'

const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/tripideas/${id.value}`
const tripData = ref(null)
const tripErr = ref(null)

const scrollToSection = (id) => {
  const el = [...document.getElementsByClassName(`${id}`)][0]

  el.scrollIntoView({ behavior: 'smooth' })
}

const goToSingleActivity = (id) => {
  router.push(`/activity/${id}`)
}

onMounted(async () => {
  await fetchData(apiUrl, tripData, tripErr)
  console.log(tripData.value)
})
</script>

<style scoped lang="scss">
.trip-days-section {
  padding-top: 8rem;
  padding-bottom: 6rem;

  .tripdays-grid {
    display: grid;
    grid-template-columns: 1fr 6fr;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    li {
      font-size: 1.8rem;
      font-weight: 600;
      cursor: pointer;
      color: #0000006e;
    }
  }

  .single-day {
    margin-bottom: 10rem;
  }

  .days-activites {
    h4 {
      font-size: 3.2rem;
      border-bottom: 1px solid #000;
      padding-bottom: 2rem;
    }

    p {
      margin-top: 2rem;
      font-size: 1.8rem;
    }
  }

  .activities-wrap {
    display: flex;
    gap: 3rem;
    margin-top: 3rem;

    .single-activity {
      cursor: pointer;
    }

    .single-activity:hover img {
      transform: scale(1.06);
    }

    .activities-img-wrap {
      overflow: hidden;
      border-radius: 10px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      transition: all 0.3s;
    }
  }
}

/**Responsive */
@media (max-width: 1200px) {
  .trip-days-section .days-activites h4 {
    font-size: 2.8rem;
  }
}

@media (max-width: 740px) {
  .trip-days-section .days-activites p {
    font-size: 1.6rem;
  }

  .trip-days-section .activities-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .trip-days-section .tripdays-grid {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  .trip-days-section ul {
    flex-direction: row;
  }

  .trip-days-section .days-activites p {
    margin-top: 1rem;
  }
}

@media (max-width: 440px) {
  .trip-days-section .activities-wrap {
    grid-template-columns: 1fr;
  }
}
</style>
