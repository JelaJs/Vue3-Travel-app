<template>
  <div>
    <div class="single-acc-review" v-show="pageLoaded">
      <div v-if="singleAccData" class="container">
        <img :src="singleAccData.image.url" alt="Single acomodation image" />
        <button class="btn-home" @click="goToHome">← Home</button>
        <div class="flex">
          <div class="left">
            <h3 class="header">{{ singleAccData.name }}</h3>
            <p>{{ singleAccData.desc }}</p>
            <button v-if="!singleAccData.isSaved" @click.stop="addToBookmarks(singleAccData)">
              Add to Bookmarks
            </button>
            <button v-if="singleAccData.isSaved" @click.stop="RemoveFromBookmarks(singleAccData)">
              Remove from Bookmarks
            </button>
          </div>
          <div class="right">
            <div class="details-wrap">
              <p class="details">Details</p>
              <div class="inner-flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  />
                </svg>
                <p>{{ singleAccData.location }}</p>
              </div>
              <div class="inner-flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  />
                </svg>
                <p>{{ singleAccData.phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!singleAccData">{{ accError }}</div>
    </div>
    <PagePreloader v-show="!pageLoaded" />
    <Footer />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { fetchData } from '../globalFunc/apiCallfunc'
import { fetchAccData } from '../globalFunc/singleAccfunc'
import { useBookmarkStore } from '../stores/bookmarks.js'
import Footer from '../components/FooterComp.vue'
import PagePreloader from '@/components/PagePreloader.vue'

const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const number = ref(route.params.number)
const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/accomodation/${id.value}`
const accData = ref(null)
const accError = ref(null)
const nameLink = ref(null)
const singleAccData = ref(null)
const singleAccErr = ref(null)
const bookmark = useBookmarkStore()
const pageLoaded = ref(false)

const goToHome = () => {
  router.push('/')
}

const addToBookmarks = (acc) => {
  bookmark.bookmarks.push(acc)
  bookmark.setLocalStorage()
  bookmark.modifyObj(singleAccData.value, bookmark.bookmarks)
  //console.log('Bookmarks arr', bookmark.bookmarks)
}

const RemoveFromBookmarks = (acc) => {
  const elInd = bookmark.bookmarks.findIndex((ac) => ac.name === acc.name)
  bookmark.bookmarks.splice(elInd, 1)
  bookmark.setLocalStorage()
  bookmark.modifyObj(singleAccData.value, bookmark.bookmarks)
}

onMounted(async () => {
  await fetchAccData(apiUrl, accData, nameLink, accError)
  const singleAccUrl = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/${nameLink.value}/${number.value}`
  await fetchData(singleAccUrl, singleAccData, singleAccErr)
  bookmark.modifyObj(singleAccData.value, bookmark.bookmarks)
  setTimeout(() => {
    pageLoaded.value = true
  }, 1000)
})
</script>

<style scoped lang="scss">
.single-acc-review {
  padding-top: 8rem;
  padding-bottom: 6rem;
  background-color: #f2eee9;

  .btn-home {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-left: 3rem;
    margin-top: 2rem;
    font-size: 1.8rem;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-top: 3rem;
  }

  .left {
    padding: 3rem;
    width: 60%;

    .header {
      font-size: 6.4rem;
    }

    p {
      margin-top: 2rem;
      font-size: 1.8rem;
      line-height: 1.3;
    }

    button {
      margin-top: 5rem;
      cursor: pointer;
      background-color: transparent;
      border: none;
      font-size: 1.6rem;
      font-weight: 600;
      transition: all 0.3s;
    }

    button:hover {
      color: #ffffff;
    }
  }

  .right {
    padding: 3rem;
    width: 40%;
  }

  .details-wrap {
    background-color: #fff;
    color: #000;
    padding: 3rem;
    border-radius: 10px;
    width: 400px;
    height: 300px;

    .inner-flex {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-top: 2rem;
    }

    svg {
      widows: 20px;
      height: 20px;
      fill: #000;
    }
  }

  .details {
    font-size: 1.8rem;
    font-weight: 600;
    padding-bottom: 1rem;
    border-bottom: 1px solid #000;
  }
}
</style>
