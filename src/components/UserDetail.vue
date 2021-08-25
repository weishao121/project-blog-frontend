<template>
  <v-container class='mt-15'>
    <h1>个人中心</h1>
    <div>{{userDetail.email}}</div>
    <v-btn v-if='this.$store.state.user !== null && this.$store.state.user.email === this.userDetail.email'>修改信息</v-btn>
    <h1>个人博客</h1>
    <div class='blogs'>
      <v-card elevation='3' v-for='blog in userBlogs' :key='blog.id' @click='to({ name: "viewBlog", params: { blogId: blog.id }})' class='content-card mb-3'>
        <div class='content-card-left'>
          <v-card-title class='blog-title ml-5'>{{blog.title}}</v-card-title>
          <v-card-subtitle class='ml-5'>{{blog.description}}</v-card-subtitle>
          <v-card-subtitle class='ml-5'>{{blog.createdAt}} - {{blog.mainTag}}</v-card-subtitle>
        </div>
        <div class='content-card-right'>
          <v-list-item-avatar size='200px'>
            <v-img class='content-card-img align-end' src='https://i.imgur.com/YcP0tik.jpeg'></v-img>
          </v-list-item-avatar>
        </div>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import UserServices from '@/services/user'
import BlogServices from '@/services/blog'
export default {
  data() {
    return {
      userDetail: null,
      userBlogs: null
    }
  },
  async mounted() {
    const userId = this.$store.state.route.params.userId
    this.userDetail = (await UserServices.show(userId)).data
    const userName = this.userDetail.email
    const blogs = await BlogServices.list({
      author: userName
    })
    this.userBlogs = blogs.data
    console.log(this.userBlogs)
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
