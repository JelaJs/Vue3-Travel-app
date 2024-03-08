<template>
  <div class="customTrip-make-sec">
    <div class="container">
      <button @click="log">Log</button>
      <div class="customMake-grid">
        <div class="left">
          <div class="buttons-categories">
            <button @click="setCategory('activities')">Activites</button>
            <button @click="setCategory('accomodations')">Accomodations</button>
          </div>
          <div v-if="category === 'activities'" class="activities">Activities</div>
          <div v-if="category === 'accomodations'" class="accomodations">Accomodations</div>
        </div>
        <div class="right">
          <div class="days">
            <h3>{{ customTrip.customTrip.customName }}</h3>
            <button v-for="(day, i) in customTrip.customTrip.days" :key="i" @click="setCurDay(i)">
              Day {{ i < 10 ? `0${i + 1}` : i + 1 }}
            </button>
          </div>
          <div v-for="(day, i) in customTrip.customTrip.days" :key="i" class="days-content">
            <div v-if="dayActive === i" class="day-content">
              <div
                v-for="(curDayCon, i) in customTrip.customTrip.dayContent[
                  customTrip.customTrip.curDay
                ]"
                :key="i"
              >
                {{ curDayCon }}
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
import { useTripStore } from '@/stores/customTrip'
import { fetchData } from '../globalFunc/apiCallfunc.js'

const customTrip = useTripStore()
const dayActive = ref(0)
const category = ref('activities')
const activities = ref(null)
const activitiesErr = ref(null)
const activApi = ''

const innerObj = customTrip.customTrip.days.reduce((acc, currentValue, index) => {
  // Dodavanje novog svojstva u objekat, gde će ključ biti indeks elementa, a vrednost će biti prazan niz
  acc[index] = [index]
  return acc
}, {})

customTrip.customTrip.dayContent = innerObj
const setCurDay = (curDay) => {
  dayActive.value = curDay
  customTrip.customTrip.curDay = curDay
}

const setCategory = (cat) => {
  category.value = cat
}

const log = () => {
  console.log(customTrip.customTrip)
  //console.log(innerObj)
}

onMounted(async () => {
  //fetchData()
})
</script>

<style scoped lang="scss">
.customTrip-make-sec {
  margin-top: 8rem;
  margin-bottom: 6rem;

  .customMake-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
}
</style>
