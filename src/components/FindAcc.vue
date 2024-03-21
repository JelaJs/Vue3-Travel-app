<template>
  <div class="home-find-section">
    <div class="container">
      <p class="section-headers">Find Accomodation</p>
      <div v-if="accData" class="acc-grid">
        <div @click="goToSingleAcc(acc.id)" v-for="acc in accData" :key="acc.id" class="acc-wrap">
          <div class="img-wrap">
            <img :src="acc.image_link.url" alt="Accomodation image" />
            <p class="acc-name">{{ acc.name }}</p>
          </div>
        </div>
      </div>
      <div v-if="accData">{{ errorData }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '../globalFunc/apiCallfunc'
import { useRouter } from 'vue-router'
const accData = ref(null)
const errorData = ref(null)
const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/accomodation'

const router = useRouter()
const goToSingleAcc = (id) => {
  router.push(`/singleacc/${id}`)
}

onMounted(async () => {
  await fetchData(apiUrl, accData, errorData)
})
</script>

<style scoped lang="scss">
.home-find-section {
  padding-top: 8rem;

  .acc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 1rem;

    .img-wrap {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .img-wrap:hover img {
      transform: scale(1.06);
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      transition: all 0.3s;
    }

    .acc-name {
      position: absolute;
      top: 5px;
      left: 5px;
      font-weight: 600;
      font-size: 2.3rem;
      color: #fff;
    }
  }
}

/**Responsive */
@media (max-width: 1200px) {
  .home-find-section .acc-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 860px) {
  .home-find-section .acc-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .home-find-section .acc-grid {
    grid-template-columns: 1fr;
  }
}
</style>
