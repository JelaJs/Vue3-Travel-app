<template>
  <div class="bookmarks-page">
    <div v-if="bookmark.bookmarks" class="bookmarks-grid">
      <div
        v-for="bookmark in bookmark.bookmarks"
        :key="bookmark.id"
        class="bookmark-wrap"
        @click="
          goToSingleAcc(
            bookmark.cabin_id,
            bookmark.bad_breakfast_id,
            bookmark.camping_rv_id,
            bookmark.hotel_id
          )
        "
      >
        <img :src="bookmark.image.url" />
        <p class="type">{{ bookmark.type }}</p>
        <p class="header">{{ bookmark.name }}</p>
        <button class="remove-btn" @click.stop="removeFromBookmarks(bookmark)">Remove</button>
      </div>
    </div>
    <div v-if="bookmark.bookmarks.length === 0">
      <p class="no-bookmarks-p">No bookmarks yet...</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useBookmarkStore } from '../stores/bookmarks.js'

const router = useRouter()
const bookmark = useBookmarkStore()
console.log(bookmark.bookmarks)

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

const removeFromBookmarks = (acc) => {
  const elInd = bookmark.bookmarks.findIndex((ac) => ac.name === acc.name)
  bookmark.bookmarks.splice(elInd, 1)
  bookmark.setLocalStorage()
  bookmark.modifyArray(bookmark.bookmarks, bookmark.bookmarks)
}
</script>

<style scoped lang="scss">
.bookmarks-page {
  margin-top: 1rem;

  .bookmark-wrap {
    cursor: pointer;
  }

  .bookmarks-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2rem;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }

    .type {
      font-size: 1.4rem;
    }

    .header {
      font-size: 1.8rem;
      font-weight: 600;
      margin-top: 1rem;
    }

    .remove-btn {
      background-color: transparent;
      border: none;
      font-size: 1.4rem;
      font-weight: 600;
      margin-top: 3rem;
      cursor: pointer;
    }
  }
  .no-bookmarks-p {
    margin-top: 4rem;
    font-size: 3rem;
  }
}
</style>
