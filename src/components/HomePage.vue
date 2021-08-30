<template>
  <v-container>
    <div class='trending mt-15'>
      <v-icon>mdi-trending-up</v-icon> <span>当前最火</span>
      <div class='trending-content'>
        <v-card v-for='blog in trending' :key='blog.id'>
          <v-avatar><v-icon>mdi-account-circle</v-icon></v-avatar> {{blog.author}}
          <div class='nav-to-blog' @click='to({ name: "viewBlog", params: { blogId: blog.id }})'>
            <v-card-title class='ml-5 mb-5'>{{blog.title}}</v-card-title>
            <v-card-subtitle class='ml-3'>{{blog.createdAt}} - {{blog.mainTag}}</v-card-subtitle>
          </div>
        </v-card>
      </div>
    </div>
    <div class='content'>
      <div class='blogs'>
        <v-card elevation='3' v-for='blog in blogs' :key='blog.id' class='content-card mb-3'>
          <div class='content-card-left'>
            <v-avatar><v-icon>mdi-account-circle</v-icon></v-avatar> {{blog.author}}
            <div class='nav-to-blog' @click='to({ name: "viewBlog", params: { blogId: blog.id }})'>
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
      <div class="sides">
        <div class='recommends'>
          <v-icon>mdi-post</v-icon> <span>专栏主题</span>
          <div class="recommends-content mt-3">
            <v-chip v-for='chip in recommends' :key='chip.tagname'>
              <div class='chip-item' @click='to({ name: "cateBlog", params: { category: chip.tagname }})'>{{chip.tagname}}</div>
            </v-chip>
          </div>
        </div>
        <v-divider></v-divider>
        <!-- <div class='follow'>I am follow</div>
        <v-divider></v-divider>
        <div class='footer'>I am footer</div> -->
      </div>
    </div>
    <!-- <h1>HomePage</h1>
    <div v-for='blog in blogs' :key='blog.id'>
      {{blog.author}} - {{blog.title}} - {{blog.description}} - {{blog.createdAt}} - {{blog.mainTag}}
    </div> -->
  </v-container>
</template>

<script>
import BlogServices from '@/services/blog'
export default {
  name: 'HomePage',
  data() {
    return {
      trending: null,
      blogs: null,
      recommends: [
        {
          tagname: '科技'
        },
        {
          tagname: '金钱'
        },
        {
          tagname: '创业'
        },
        {
          tagname: '提高效率'
        },
        {
          tagname: 'OpenX'
        }
      ]
    }
  },
  async mounted() {
    // this.blogs = (await BlogServices.index()).data
    const blogResults = (await BlogServices.index()).data
    this.trending = blogResults.trendingBlogs
    this.blogs = blogResults.allBlogs
  },
  methods: {
    to(route) {
      this.$router.push(route)
    }
  }
}
</script>
<style scoped>
.nav-to-blog:hover {
  cursor: pointer;
}
.trending-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.content {
  /* background-color: orange; */
  min-height: 1500px;
  display: grid;
  grid-template-areas:
   "blog blog blog blog sides";
}
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
.blogs {
  grid-area: blog;
  margin: 10px 10px 0 0;
  /* min-height: 500px; */
  /* background-color: darkcyan; */
}
.blog-title {
  font-size: 2em;
}
.sides {
  grid-area: sides;
  /* background-color: darkblue; */
  grid-template-areas:
    "recommends"
    "follow"
    "footer"
}
.recommends {
  padding: 10px 0 10px 10px;
  grid-area: recommends;
  max-width:300px;
  min-width: 300px;
  /* background-color: darkred; */
}
.recommends-content {
  display: grid;
  grid-template-columns: repeat(3, 0.25fr);
  grid-gap: 10px;
  justify-items: center;
}
.follow {
  grid-area: follow;
  min-height: 50px;
  /* background-color: darkolivegreen; */
}
.footer {
  grid-area: footer;
  min-height: 50px;
  /* background-color: darkmagenta; */
}
</style>
