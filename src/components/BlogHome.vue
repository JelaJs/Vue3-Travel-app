<template>
  <div class="blog-section">
    <div class="container">
      <Carousel :autoplay="10000" :wrap-around="true">
        <Slide v-for="blog in blogs" :key="blog.id">
          <div class="carousel__item">
            <div class="slide-flex">
              <div class="blog-left">
                <p class="blog-header">{{ blog.name }}</p>
                <p class="blog-desc">{{ blog.shortDesc }}</p>
                <button>Read More</button>
              </div>
              <div class="blog-right"><img :src="blog.blogImg.url" alt="Blog images" /></div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '../globalFunc/apiCallfunc'
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const blogs = ref(null)
const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/blog'
const blogsErr = ref(null)

onMounted(async () => {
  await fetchData(apiUrl, blogs, blogsErr)
  console.log('Blogs val', blogs.value)
})
</script>

<style scoped lang="scss">
.blog-section {
  margin-top: 8rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: #125057;

  .slide-flex {
    display: flex;
    align-items: center;
    gap: 4rem;
    padding-left: 4rem;
    padding-right: 4rem;
    color: #fff;

    .blog-left {
      text-align: start;

      .blog-header {
        font-size: 3.6rem;
        font-weight: 600;
      }

      .blog-desc {
        font-size: 1.8rem;
        line-height: 1.4;
        margin-top: 2rem;
      }

      button {
        margin-top: 4rem;
        border: none;
        padding: 1.5rem 3rem;
        font-size: 1.6rem;
        font-weight: 600;
        color: #fff;
        border-radius: 100px;
        background-color: #3b9aa4;
        cursor: pointer;
        transition: all 0.3s;
      }

      button:hover {
        background-color: #318892;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
}
</style>
