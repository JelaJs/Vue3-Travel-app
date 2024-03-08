import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTripStore = defineStore('trip', () => {
  const customTrip = ref({
    customName: '',
    days: [9, 10, 11, 12, 13],
    dayContent: {}
  })
  const modalOpen = ref(false)
  const curDay = ref(0)

  function setName(nameT) {
    customTrip.value.customName = nameT
  }

  function setDays(days) {
    customTrip.value.days = days
    console.log(customTrip.value)
  }

  return { customTrip, setName, setDays, modalOpen, curDay }
})
