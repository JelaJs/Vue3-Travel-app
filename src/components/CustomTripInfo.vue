<template>
  <div v-if="customTrip.modalOpen" @click="closeModal" class="customTr-popup-overlay">
    <div v-if="customTrip.modalOpen" class="customTr-popup" @click.stop>
      <div class="btnClose-wrap">
        <button @click="closeModal" class="close">X</button>
      </div>
      <label class="customTr-title" for="title">Add Trip Title:</label>
      <input v-model="tripName" name="title" class="titleInput" placeholder="Eg. Summer Vacation" />
      <p class="customTr-pick">Pick a date:</p>
      <VueDatePicker v-model="date" multi-dates></VueDatePicker>
      <button class="createTr-btn" @click="clDate">Create</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useTripStore } from '../stores/customTrip.js'

const date = ref([])
const tripName = ref('')
const customTrip = useTripStore()
const router = useRouter()

const clDate = () => {
  let dateArr = Array.from(date.value)
  let daysArr = dateArr.map((el) => el.getDate())
  let sortedDays = daysArr.sort((a, b) => a - b)
  //console.log(date.value)
  // console.log('Formated:', sortedDays)
  customTrip.setName(tripName.value)
  customTrip.setDays(sortedDays)
  router.push('/makeCustomtrip')
}

const closeModal = () => {
  customTrip.modalOpen = false
}
</script>

<style scoped lang="scss">
.customTr-popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #00000083;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .customTr-popup {
    background-color: #fff;
    width: 50%;
    padding: 3rem 5rem;
    border-radius: 10px;

    .btnClose-wrap {
      text-align: end;
      margin-bottom: 2rem;

      button {
        background-color: transparent;
        border: none;
        font-size: 2.3rem;
        font-weight: 500;
        cursor: pointer;
      }
    }

    .customTr-title {
      display: block;
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .customTr-pick {
      font-size: 2rem;
      font-weight: 600;
      margin-top: 4rem;
    }

    .titleInput {
      width: 100%;
      height: 4rem;
      padding: 1rem;
      outline: none;
      border-radius: 10px;
      border: 1px solid #ccc;
    }

    .createTr-btn {
      background-color: transparent;
      border: none;
      font-size: 2rem;
      font-weight: 500;
      margin-top: 3rem;
      color: rgb(197, 20, 20);
      cursor: pointer;
    }
  }
}
</style>
