<template>
  <v-container class='mt-15'>
    <div v-if='category != null'>
      <h1>{{category}}</h1>
      <v-card elevation='3' v-for='blog in cateBlogs' :key='blog.id' class='content-card mt-2 mb-2'>
        <div class='content-card-left'>
          <v-avatar><v-icon>mdi-account-circle</v-icon></v-avatar> {{blog.author}}
          <div @click='to({ name: "viewBlog", params: { blogId: blog.id }})'>
            <v-card-title class='blog-title ml-5'>{{blog.title}}</v-card-title>
            <v-card-subtitle class='ml-5'>{{blog.description}}</v-card-subtitle>
            <v-card-subtitle class='ml-5'>{{blog.createdAt}} - {{blog.mainTag}}</v-card-subtitle>
          </div>
        </div>
        <div class='content-card-right'>
          <v-list-item-avatar size='200px'>
            <v-img class='content-card-img align-end' src='https://i.imgur.com/YcP0tik.jpeg'></v-img>
          </v-list-item-avatar>
        </div>
      </v-card>
    </div>
    <div v-else>
      <h1>当前专栏尚未有博客</h1>
    </div>
  </v-container>
</template>
<script>
import BlogServices from '@/services/blog'
export default {
  data() {
    return {
      category: null,
      cateBlogs: null
    }
  },
  async mounted() {
    const category = this.$store.state.route.path.split('/')[2]
    this.cateBlogs = (await BlogServices.listCate(category)).data
    if (this.cateBlogs.length !== 0) this.category = this.cateBlogs[0].mainTag
  },
  methods: {
    to(route) {
      this.$router.push(route)
    }
  }
}
</script>
<style scoped>
.content-card {
  display: grid;
  grid-template-areas:
    "cl cl cr cr";
  max-width: 850px;
  min-width: 850px
}
.content-card-left {
  grid-area: cl;
  min-width: 400px;
  max-width: 400px;
}
.content-card-right {
  grid-area: cr;
  display: flex;
  text-align: center;
}
.content-card-img {
  float:right;
}
</style>
