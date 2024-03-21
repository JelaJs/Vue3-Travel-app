<template>
  <div>
    <div class="blog-section">
      <div v-if="blogData" class="container">
        <h1 class="blog-header">{{ blogData.name }}</h1>
        <p class="date">{{ blogData.date }}</p>
        <img :src="blogData.blogImg.url" alt="Current blog image" />
        <div class="exp-wrap">
          <p class="short-desc">{{ blogData.shortDesc }}</p>
          <h3 class="exp-header">{{ blogData.blogExpirience.title }}</h3>
          <p class="exp-desc">{{ blogData.blogExpirience.description }}</p>
          <img :src="blogData.blogExpirience.expImg.url" alt="Single blog expiriance image" />
        </div>
      </div>
      <div v-if="blogData">{{ blogErr }}</div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchData } from '../globalFunc/apiCallfunc'
import Footer from '../components/FooterComp.vue'

const route = useRoute()
const id = ref(route.params.id)
const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/blog/${id.value}`
const blogData = ref(null)
const blogErr = ref(null)

onMounted(async () => {
  await fetchData(apiUrl, blogData, blogErr)
  console.log(blogData.value)
})
</script>

<style scoped lang="scss">
.blog-section {
  padding-top: 8rem;
  padding-bottom: 6rem;

  .blog-header {
    font-size: 6.4rem;
    font-weight: 600;
    text-align: center;
  }

  .date {
    margin-top: 2rem;
    text-align: center;
  }

  img {
    width: 100%;
    height: 100%;
    margin-top: 3rem;
    border-radius: 10px;
  }

  .exp-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }

  .short-desc {
    font-size: 1.8rem;
    line-height: 1.4;
    margin-top: 4rem;
  }

  .exp-header {
    font-size: 2.8rem;
    font-weight: 600;
    margin-top: 6rem;
  }

  .exp-desc {
    font-size: 1.8rem;
    line-height: 1.4;
    margin-top: 3rem;
  }
}
</style>
