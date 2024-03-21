<template>
  <div class="customTrip-make-sec">
    <div class="container">
      <div class="customMake-grid">
        <div class="left">
          <div class="main-buttons-categories">
            <button class="main-cat-btn current" @click="setCategory('activities', $event)">
              Activites
            </button>
            <button class="main-cat-btn" @click="setCategory('accomodations', $event)">
              Accomodations
            </button>
          </div>
          <div v-show="category === 'activities'" class="activities">
            <div v-show="!isSmallScreen">
              <ul v-if="activities" class="activities-box">
                <li
                  class="single-activity-wrap"
                  v-for="activity in activities"
                  :key="activity.id"
                  draggable="true"
                  :data-id="activity.id"
                >
                  <img :src="activity.image.url" />
                  <p>{{ activity.name }}</p>
                </li>
              </ul>
            </div>
            <!--Small screen-->
            <div v-show="isSmallScreen">
              <ul v-if="activities" class="activities-box">
                <li
                  class="single-activity-wrap mobile"
                  v-for="activity in activities"
                  :key="activity.id"
                  :data-id="activity.id"
                  draggable="false"
                  @click="addActivityToCurDay(activity)"
                >
                  <img :src="activity.image.url" />
                  <p>{{ activity.name }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div v-show="category === 'accomodations'" class="accomodations">
            <p class="select-acc-type-p">Select the type of accommodation you want to stay</p>
            <div class="acc-buttons-wrap">
              <button class="selected" @click="setAccommodation('cabin', $event)">Cabins</button>
              <button @click="setAccommodation('hotel', $event)">Hotels</button>
              <button @click="setAccommodation('Bed&Breakfasts', $event)">Bed & Breakfasts</button>
              <button @click="setAccommodation('Camping&Rv', $event)">Camping & Rv</button>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="days">
            <h3>{{ customTrip.customTrip.customName }}</h3>
            <button
              class="day-btn"
              v-for="(day, i) in customTrip.customTrip.days"
              :key="i"
              @click="setCurDay(i, $event)"
            >
              Day {{ i < 10 ? `0${i + 1}` : i + 1 }}
            </button>
          </div>
          <div v-for="(day, i) in customTrip.customTrip.days" :key="i" class="days-content">
            <div v-show="customTrip.customTrip.curDay === i" class="day-content">
              <div class="custom-day-box">
                <div
                  v-if="customTrip.customTrip.dayContent[customTrip.customTrip.curDay]"
                  class="activity-box"
                  :id="'activity' + i"
                >
                  <div
                    class="single-activity-wrap"
                    v-for="content in customTrip.customTrip.dayContent[
                      customTrip.customTrip.curDay
                    ]"
                    :key="content.id"
                  >
                    <img :src="content.image.url" />
                    <p>{{ content.name }}</p>
                    <button class="remove-btn" @click="removeItem(content)">X</button>
                  </div>
                  <p v-show="!isSmallScreen" class="add-msg">Add Item In Marked White Space</p>
                  <p v-show="isSmallScreen" class="add-msg">
                    Click on activities you want to add for current day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="submit-btn" @click="tripPopup = true">Submit</button>
      <p>
        When you submit, after some time you will be contacted via an e-mail address, with the best
        offer for your interests
      </p>
      <div class="trip-popup" v-if="tripPopup">
        <div class="content-box">
          <p class="p-head">Are you sure you want to submit?</p>
          <p class="p-text">Once you submit, your trip idea will be sent and can't be changed</p>
          <button class="submit" @click="createTrip($event)">Submit</button>
          <button @click="cancelTrip">Cancel</button>
          <p v-show="emptyActivities">You have to add activities...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTripStore } from '@/stores/customTrip'
import { fetchData } from '../globalFunc/apiCallfunc.js'
//import { useLoginStore } from '@/stores/login'

let authTokenStore = localStorage.getItem('authToken')
const router = useRouter()
const customTrip = useTripStore()
//const dayActive = ref(0)
const category = ref('activities')
const activities = ref(null)
const activitiesErr = ref(null)
const activApi = 'https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/thingstodo'
const draggables = ref([])
const dropContainer = ref(null)
const timeOutEls = ref(null)
const isDraggedOver = ref(false)
const draggableEl = ref(null)
const tripPopup = ref(false)
const isSmallScreen = ref(false)
const emptyActivities = ref(false)

if (!authTokenStore) {
  router.push('/login')
}

const innerObj = customTrip.customTrip.days.reduce((acc, currentValue, index) => {
  // Dodavanje novog svojstva u objekat, gde će ključ biti indeks elementa, a vrednost će biti prazan niz
  acc[index] = []
  return acc
}, {})

customTrip.customTrip.dayContent = innerObj
const setCurDay = (curDay, e) => {
  let btns = [...document.querySelectorAll('.day-btn')]
  //dayActive.value = curDay
  btns.forEach((btn) => btn.classList.remove('curDay'))
  e.target.classList.add('curDay')
  customTrip.customTrip.curDay = curDay
  dropContainer.value = document.querySelector(`#activity${customTrip.customTrip.curDay}`)
  dragFunctionEls(dropContainer.value)
  //console.log(btns)
}

const setCategory = (cat, e) => {
  let catBtns = document.querySelectorAll('.main-cat-btn')
  catBtns.forEach((btn) => btn.classList.remove('current'))
  e.target.classList.add('current')
  category.value = cat
}

const setAccommodation = (acc, e) => {
  const btns = [...document.querySelectorAll('.acc-buttons-wrap button')]
  btns.forEach((btn) => btn.classList.remove('selected'))
  e.target.classList.add('selected')
  customTrip.customTrip.accomodation = acc
}

const dragFunctionEls = (dropEl) => {
  draggables.value = [...document.querySelectorAll('.single-activity-wrap')]
  //dropContainer.value = document.querySelector(`#activity${customTrip.customTrip.curDay}`)

  draggables.value.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
      draggableEl.value = document.querySelector('.dragging')
    })

    draggable.addEventListener('dragend', () => {
      if (isDraggedOver.value === true) {
        //let draggableEl = document.querySelector('.dragging')
        // const dataimg = draggableEl.getAttribute('data-img')
        // const dataName = draggableEl.getAttribute('data-name')
        const dataId = draggableEl.value.getAttribute('data-id')
        const draggedObj = activities.value.find((el) => el.id === Number(dataId))
        customTrip.customTrip.dayContent[customTrip.customTrip.curDay].push(draggedObj)
      }

      draggable.classList.remove('dragging')
      draggableEl.value = null
    })
  })

  window.addEventListener('dragover', (e) => {
    e.preventDefault()

    //console.log(e)
    if (e.target === dropEl) {
      isDraggedOver.value = true
    }

    if (e.target !== dropEl) {
      isDraggedOver.value = false
    }
  })
}

//For small screen
const addActivityToCurDay = (activity) => {
  console.log('Radi')
  customTrip.customTrip.dayContent[customTrip.customTrip.curDay].push(activity)
}

const removeItem = (content) => {
  let index = customTrip.customTrip.dayContent[customTrip.customTrip.curDay].findIndex(
    (el) => el.id === content.id
  )

  customTrip.customTrip.dayContent[customTrip.customTrip.curDay].splice(index, 1)
}

const createTrip = async (e) => {
  customTrip.customTrip.isSaved = true

  const isEmpty = Object.values(customTrip.customTrip.dayContent).every(
    (value) => value.length === 0
  )

  if (isEmpty) {
    emptyActivities.value = true
    return
  }

  try {
    let formData = new FormData()
    formData.append('name', customTrip.customTrip.customName)
    formData.append('duration', customTrip.customTrip.days.length)
    formData.append('accType', customTrip.customTrip.accomodation)
    formData.append('isSaved', customTrip.customTrip.isSaved)
    formData.append('daysActivities', JSON.stringify(customTrip.customTrip.dayContent))
    /* const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }*/

    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/customtrip', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.error(err)
  }

  emptyActivities.value = false
  e.target.style.color = '#ccc'
  e.target.disabled = true
  localStorage.removeItem('customTrip')
  tripPopup.value = false
  router.push('/yourtrip')
  e.target.disabled = false
}

const cancelTrip = () => {
  tripPopup.value = false
  emptyActivities.value = false
}

const handleSize = () => {
  if (window.innerWidth < 860) {
    isSmallScreen.value = true
  } else {
    isSmallScreen.value = false
  }
}

onMounted(async () => {
  window.addEventListener('resize', handleSize)
  customTrip.customTrip.curDay = 0
  console.log(customTrip.customTrip.curDay)
  clearTimeout(timeOutEls.value)

  fetchData(activApi, activities, activitiesErr)
  console.log(activities.value)

  dropContainer.value = document.querySelector(`#activity${customTrip.customTrip.curDay}`)
  timeOutEls.value = setTimeout(() => {
    dragFunctionEls(dropContainer.value)
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleSize)
})
</script>

<style scoped lang="scss">
.customTrip-make-sec {
  padding-top: 8rem;
  padding-bottom: 6rem;
  background-color: #f2eee9;

  .customMake-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 3rem;
  }

  .left {
    .select-acc-type-p {
      margin-top: 2rem;
    }

    .main-buttons-categories {
      display: flex;
      gap: 2rem;

      button {
        background-color: transparent;
        outline: none;
        border: none;
        font-size: 2rem;
        font-weight: 600;
        color: #0000007a;
        cursor: pointer;
      }

      button.current {
        color: #000;
      }
    }

    .acc-buttons-wrap {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
      align-items: flex-start;

      button {
        border: none;
        background-color: transparent;
        outline: none;
        color: #00000083;
        cursor: pointer;
        font-size: 1.6rem;
        font-weight: 600;
      }

      button.selected {
        color: #000;
      }
    }
  }

  .right {
    .day-btn {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      margin-right: 2rem;
      font-size: 1.6rem;
      color: #00000096;
    }

    .day-btn.curDay {
      color: #000;
    }
  }

  .activities-box {
    margin-top: 2rem;
    overflow-y: scroll;
    height: 50rem;
  }

  .single-activity-wrap {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding-left: 0;
    border: 1px solid #ccc;
    margin-top: 1rem;
    cursor: move;
    position: relative;

    .remove-btn {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 2rem;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    img {
      width: 20rem;
      height: 10rem;
      object-fit: cover;
    }
  }

  .single-activity-wrap.mobile {
    cursor: pointer;
  }

  .custom-day-box {
    width: 100%;
    padding: 6rem 1rem;
    background-color: #fff;
    margin-top: 1rem;
  }

  .activity-box {
    padding: 4rem 0.5rem;
    padding-bottom: 10rem;
    border: 1px dashed #ccc;
    position: relative;
  }

  .dragging {
    opacity: 0.5;
  }

  .add-msg {
    margin-top: 3rem;
    text-align: center;
    display: inline-block;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translate(-50%);
  }

  .trip-popup {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #00000075;
    display: flex;
    justify-content: center;
    align-items: center;

    .content-box {
      background-color: #fff;
      padding: 3rem;

      .p-head {
        margin-bottom: 1rem;
        font-size: 1.8rem;
        font-weight: 600;
      }

      .p-text {
        margin-bottom: 3rem;
      }

      button.submit {
        color: rgb(184, 33, 33);
      }
    }
  }
  button {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 2rem;
    font-weight: 600;
    margin-right: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .submit-btn {
    background-color: white;
    padding: 1.5rem 3rem;
    border-radius: 100px;
  }

  .submit-btn:hover {
    background-color: #000;
    color: #fff;
  }
}

/**Responsive */
@media (max-width: 859px) {
  .customTrip-make-sec .customMake-grid {
    grid-template-columns: 1fr;
  }

  .customTrip-make-sec .left .acc-buttons-wrap button {
    padding: 0;
    margin: 0;
  }

  .customTrip-make-sec .left .acc-buttons-wrap {
    margin-bottom: 3rem;
  }
}

@media (max-width: 480px) {
  .customTrip-make-sec .single-activity-wrap {
    flex-direction: column;
    align-items: flex-start;
  }

  .customTrip-make-sec .single-activity-wrap .remove-btn {
    top: -10px;
    right: 0;
    transform: translate(0, 0);
  }
}
</style>
