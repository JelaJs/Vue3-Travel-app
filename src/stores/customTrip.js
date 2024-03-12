import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTripStore = defineStore('trip', () => {
  const customTrip = ref({
    customName: '',
    days: [],
    dayContent: {},
    firstDay: '',
    lastDay: '',
    curDay: 0,
    accomodation: 'Cabins',
    isSaved: false
  })

  if (localStorage.getItem('customTrip')) {
    customTrip.value = JSON.parse(localStorage.getItem('customTrip'))
  }

  const modalOpen = ref(false)
  //const curDay = ref(0)

  function setName(nameT) {
    customTrip.value.customName = nameT
  }

  function setDays(days) {
    customTrip.value.days = days
    //console.log(customTrip.value)
  }

  function setFirstDay(date) {
    customTrip.value.firstDay = date
  }

  function setLastDay(date) {
    customTrip.value.lastDay = date
  }

  return { customTrip, setName, setDays, modalOpen, setFirstDay, setLastDay }
})
