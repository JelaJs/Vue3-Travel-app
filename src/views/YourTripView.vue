<template>
  <div class="build-trip-section">
    <div class="container">
      <h1>Build Trip</h1>
      <div class="btn-wrapper">
        <button class="tripbtn current" @click="setPage('bookmarks', $event)">Bookmarks</button>
        <button class="tripbtn" @click="setPage('trips', $event)">My trips</button>
        <div class="page-wrapper">
          <BookmarksPage v-if="page === 'bookmarks'" />
          <TripsPage v-if="page === 'trips'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookmarksPage from '@/components/BookmarksPage.vue'
import TripsPage from '@/components/TripsPage.vue'
import { ref } from 'vue'

const page = ref('bookmarks')

const setPage = (curPage, e) => {
  const btns = document.querySelectorAll('.tripbtn')
  page.value = curPage

  btns.forEach((btn) => btn.classList.remove('current'))
  e.target.classList.add('current')
}
</script>

<style scoped lang="scss">
.build-trip-section {
  padding-top: 8rem;
  padding-bottom: 6rem;

  h1 {
    font-size: 6.4rem;
  }

  .btn-wrapper {
    margin-top: 3rem;

    button {
      background-color: transparent;
      border: none;
      font-size: 2.3rem;
      font-weight: 600;
      margin-right: 2rem;
      color: #00000062;
      cursor: pointer;
    }

    .current {
      color: #000;
    }
  }
}

/**Responsive */
@media (max-width: 1200px) {
  .build-trip-section h1 {
    font-size: 5.4rem;
  }
}

@media (max-width: 960px) {
  .build-trip-section h1 {
    font-size: 4.6rem;
  }
}

@media (max-width: 630px) {
  .build-trip-section h1 {
    font-size: 3.2rem;
  }

  .build-trip-section .btn-wrapper button {
    font-size: 1.8rem;
  }
}
</style>
