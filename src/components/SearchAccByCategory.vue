<template>
  <div class="searchBy-section">
    <div class="container">
      <p class="section-headers">Search for accomodation</p>
      <div class="find-grid">
        <div class="options">
          <form>
            <fieldset>
              <legend>Type</legend>
              <div class="input-flex">
                <input
                  class="hotels"
                  type="checkbox"
                  value="hotel"
                  v-model="hotel"
                  @change="print(hotel, cabin, camp, bed_br)"
                />
                <label for="hotels">Hotels</label>
              </div>
              <div class="input-flex">
                <input
                  class="cabins"
                  type="checkbox"
                  value="cabin"
                  v-model="cabin"
                  @change="print(hotel, cabin, camp, bed_br)"
                />
                <label for="cabins">cabins</label>
              </div>
              <div class="input-flex">
                <input
                  class="bed&breakfasts"
                  type="checkbox"
                  value="bad_breakfast"
                  v-model="bed_br"
                  @change="print(hotel, cabin, camp, bed_br)"
                />
                <label for="bed&breakfasts">Bed & Breakfasts</label>
              </div>
              <div class="input-flex">
                <input
                  class="camping&rv"
                  type="checkbox"
                  value="camping_rv"
                  v-model="camp"
                  @change="print(hotel, cabin, camp, bed_br)"
                />
                <label for="camping&rv">Camping & Rv</label>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="accomodations">
          <div class="grid">
            <div
              v-for="acc in filteredAccs"
              :key="acc.id"
              class="acc-wrap"
              @click="
                goToSingleAcc(acc.cabin_id, acc.bad_breakfast_id, acc.camping_rv_id, acc.hotel_id)
              "
            >
              <div class="img-inner-wrap">
                <img :src="acc.image.url" alt="Accomodations images" />
                <button v-if="!acc.isSaved" class="btn-save" @click.stop="addToBookmarks(acc)">
                  +
                </button>
                <button
                  v-if="acc.isSaved"
                  class="btn-remove"
                  @click.stop="removeFromBookmarks(acc)"
                >
                  -
                </button>
              </div>
              <div class="content-inner-wrap">
                <p class="acc-type">{{ acc.type }}</p>
                <p class="acc-name">{{ acc.name }}</p>
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
import { fetchData } from '../globalFunc/apiCallfunc'
import { useRouter } from 'vue-router'
import { useBookmarkStore } from '../stores/bookmarks.js'

const router = useRouter()
const allAccs = ref([])
const allAccsUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/allsingleaccs'
const accsErr = ref(null)
const hotel = ref(false)
const cabin = ref(false)
const camp = ref(false)
const bed_br = ref(false)
const filteredAccs = ref(allAccs.value)
const bookmark = useBookmarkStore()

const print = (hotel, cabin, camp, bed_br) => {
  let hotels = []
  let cabins = []
  let camps = []
  let beds = []

  if (hotel) {
    hotels = allAccs.value.filter((acc) => acc.type === 'Hotel')
  }

  if (cabin) {
    cabins = allAccs.value.filter((acc) => acc.type === 'Cabins')
  }

  if (camp) {
    beds = allAccs.value.filter((acc) => acc.type === 'Campgrounds')
  }

  if (bed_br) {
    camps = allAccs.value.filter((acc) => acc.type === 'Bed & Breakfast')
  }

  filteredAccs.value = [...hotels, ...cabins, ...camps, ...beds]

  if (!hotel && !cabin && !camp && !bed_br) {
    filteredAccs.value = allAccs.value
  }
  console.log(filteredAccs.value)
}

const goToSingleAcc = (cabin_id, bad_breakfast_id, camping_rv_id, hotel_id) => {
  console.log(cabin_id, bad_breakfast_id, camping_rv_id, hotel_id)
  if (cabin_id !== 0) {
    router.push(`/singleacc/1/${cabin_id}`)
  }

  if (bad_breakfast_id !== 0) {
    router.push(`/singleacc/3/${bad_breakfast_id}`)
  }

  if (camping_rv_id !== 0) {
    router.push(`/singleacc/4/${camping_rv_id}`)
  }

  if (hotel_id !== 0) {
    router.push(`/singleacc/2/${hotel_id}`)
  }
}

const addToBookmarks = (acc) => {
  bookmark.bookmarks.push(acc)
  bookmark.setLocalStorage()
  //bookmark.compareTwoArrs(accomodations.value, bookmark.bookmarks)
  bookmark.modifyArray(filteredAccs.value, bookmark.bookmarks)
  //console.log('Bookmarks arr', bookmark.bookmarks)
}

const removeFromBookmarks = (acc) => {
  const elInd = bookmark.bookmarks.findIndex((ac) => ac.name === acc.name)
  bookmark.bookmarks.splice(elInd, 1)
  bookmark.setLocalStorage()
  bookmark.modifyArray(filteredAccs.value, bookmark.bookmarks)
}

onMounted(async () => {
  await fetchData(allAccsUrl, allAccs, accsErr)
  filteredAccs.value = allAccs.value
  console.log('All accs', allAccs.value)
  bookmark.modifyArray(filteredAccs.value, bookmark.bookmarks)
})
</script>

<style scoped lang="scss">
.searchBy-section {
  padding-top: 8rem;
  padding-bottom: 6rem;

  .find-grid {
    display: grid;
    grid-template-columns: 1fr 4fr;
    margin-top: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-top: 1rem;
  }

  .acc-wrap {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    border: 1px solid #8d8d8d;
  }

  .acc-wrap:hover img {
    transform: scale(1.08);
  }

  .img-inner-wrap {
    position: relative;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 185px;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    transition: all 0.3s;
    cursor: pointer;
  }

  .btn-save,
  .btn-remove {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    color: #fff;
    font-size: 2.3rem;
    font-weight: 500;
    padding: 0.5rem;
    border: 1px solid #fff;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-save:hover {
    background-color: #fff;
    color: #000;
  }

  .btn-remove {
    background-color: #fff;
    color: #000;
    padding: 0.5rem 1rem;
  }

  .btn-remove:hover {
    background-color: transparent;
    color: #fff;
  }

  .content-inner-wrap {
    padding: 1rem;
  }

  .acc-type {
    font-size: 1.4rem;
    color: #00000070;
  }

  .acc-name {
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }

  form {
    border: none;

    fieldset {
      border: none;

      legend {
        margin-bottom: 2rem;
        font-weight: 500;
      }
      .input-flex {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;

        input {
          cursor: pointer;
        }
      }
    }
  }
}

/**Responsive */
@media (max-width: 1200px) {
  .searchBy-section .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 960px) {
  .searchBy-section .find-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .searchBy-section .grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 580px) {
  .searchBy-section .grid {
    grid-template-columns: 1fr;
  }
}
</style>
