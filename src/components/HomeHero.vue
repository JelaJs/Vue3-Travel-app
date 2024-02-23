<template>
  <div class="hero-section">
    <div class="container">
      <Carousel @slide-end="handleSlideChange">
        <Slide v-for="(slide, index) in imgSlider" :key="index">
          <div class="carousel__item">
            <div class="slide-wrap">
              <h1 class="slide-header" :style="{ maskImage: logoGradient }">
                {{ headers[index] }}
              </h1>
              <div class="overlay"></div>
              <div
                class="circle"
                :style="{
                  position: 'absolute',
                  top: y + 'px',
                  left: x + 'px',
                  width: size + 'px',
                  height: size + 'px'
                }"
              ></div>
              <img class="slider-img" :src="slide" alt="Hero slide img" />
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
//import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import { useMouse, useWindowSize } from '@vueuse/core'

const { x, y } = useMouse()
const { width, height } = useWindowSize()
const dx = computed(() => Math.abs(x.value - width.value / 2))
const dy = computed(() => Math.abs(y.value - height.value / 2))
const distance = computed(() => Math.sqrt(dx.value * dx.value + dy.value * dy.value))
const size = computed(() => Math.max(300 - distance.value / 3, 150))
//const opacity = computed(() => Math.min(Math.max(size.value / 300, 0.7), 1))
const headerEl = ref(null)
const slideEl = ref(null)
const allEls = ref(null)

function handleSlideChange(e) {
  let curSlideIndex = e.currentSlideIndex
  let singleEl = allEls.value[curSlideIndex]
  headerEl.value = singleEl.querySelector('.slide-header')
}

const logoGradient = computed(() => {
  let rect = headerEl.value?.getBoundingClientRect()
  const xPos = x.value - (rect?.left ?? 0)
  const yPos = y.value - (rect?.top ?? 0)

  return `radial-gradient(circle at ${xPos}px ${yPos}px, black 30%, transparent 100%)`
})

const imgSlider = [
  '/src/assets/heroSliderImgs/img1.jpg',
  '/src/assets/heroSliderImgs/img2.jpg',
  '/src/assets/heroSliderImgs/img3.jpg'
]

const headers = ['Ski & Adventure', 'Get Cozy', 'Snow Rides']

import 'vue3-carousel/dist/carousel.css'

onMounted(() => {
  slideEl.value = document.querySelector('.carousel__slide--active')
  headerEl.value = document.querySelector('.carousel__slide--active .slide-header')
  allEls.value = document.querySelectorAll('.carousel__slide')
})
</script>

<style scoped lang="scss">
.hero-section {
  padding-top: 8rem;
  background-color: #f2eee9;
  height: 75rem;

  .slide-wrap {
    position: relative;
    height: 90rem;
    border-radius: 10px;
    overflow: hidden;

    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 6;
      color: #fff;
      font-size: 8.3rem;
      cursor: none;
    }

    .circle {
      background-color: rgba(255, 255, 255, 0.466);
      border-radius: 50%;
      z-index: 5;
      transform: translate(-50%, -50%);
      filter: blur(60px);
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 5;
      background-color: #000000cb;
      border-radius: 10px;
      cursor: none;
    }

    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
}
</style>
