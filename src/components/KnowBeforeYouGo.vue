<template>
  <div class="home-know-section">
    <div class="container">
      <p class="section-headers">Know Before You Go</p>
      <div
        class="content-box"
        @mouseover="boxContent"
        @mouseout="boxContentDefoult"
        @click="goToSeasonPage"
      >
        <p class="box-header">Seasons & Climate</p>
        <p class="hover-text">
          velit eu aliquet. Proin euismod dignissim enim, quis consequat quam imperdiet nec. Aenean
          suscipit purus vel justo tempor, et eleifend elit pulvinar. Interdum et ma
        </p>
        <p class="learn-more">
          Learn more <span class="arrow">{{ spanContent }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const box = ref(null)
const hoverp = ref(null)
const spanContent = ref('>')

const boxContent = () => {
  if (window.innerWidth < 960) return
  box.value.style.backgroundColor = '#a3a3c5'
  box.value.style.color = 'white'
  hoverp.value.style.opacity = '1'
  hoverp.value.style.lineHeight = '1.2'
  spanContent.value = '→'
}

const boxContentDefoult = () => {
  box.value.style.backgroundColor = '#d7d7ec'
  box.value.style.color = '#000'
  hoverp.value.style.opacity = '0'
  hoverp.value.style.lineHeight = '0'
  spanContent.value = '>'
}

const goToSeasonPage = () => {
  router.push('/seasonclimate')
}

onMounted(() => {
  box.value = document.querySelector('.content-box')
  hoverp.value = document.querySelector('.hover-text')
  //spanEl.value = document.querySelector('.arrow')
})
</script>

<style scoped lang="scss">
.home-know-section {
  padding-top: 8rem;
  .content-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 40rem;
    height: 20rem;
    margin-top: 1rem;
    background-color: #d7d7ec;
    padding: 20px;
    border-radius: 10px;
    transition: all 0.3s;
    cursor: pointer;
  }

  .box-header {
    font-weight: 600;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .hover-text {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    opacity: 0;
    line-height: 0;
    transition: all 0.3s;
    color: #ffffffda;
  }

  .learn-more {
    font-weight: 600;
    font-size: 1.4rem;
  }
}

/**Responsive */
@media (max-width: 1200px) {
  .home-know-section .content-box {
    width: 36rem;
    height: 18rem;
  }
}

@media (max-width: 960px) {
  .home-know-section .content-box {
    width: 32rem;
    height: 16rem;
  }
}

@media (max-width: 540px) {
  .home-know-section .content-box {
    width: 26rem;
    height: 13rem;

    .home-know-section .box-header {
      font-size: 1.6rem;
    }

    .home-know-section .learn-more {
      font-size: 1.2rem;
    }
  }
}
</style>
