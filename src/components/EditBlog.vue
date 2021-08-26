<template>
  <v-container id='body' class='mt-15'>
    <v-btn
      color='primary'
      @click='edit'
    >确认修改</v-btn>
    <div v-if='blog != null'>
      <v-text-field
        label='Title'
        required
        v-model='blog.title'
      ></v-text-field>
      <v-text-field
        label='Description'
        required
        v-model='blog.description'
      ></v-text-field>
    </div>
    <textarea class='editable' name="editable"></textarea>  <!-- Medium Editor -->
  </v-container>
</template>
<script>
import BlogServices from '@/services/blog'
import MediumEditor from 'medium-editor'
export default {
  data() {
    return {
      blog: null
    }
  },
  async mounted() {
    const blogId = this.$store.state.route.params.blogId
    this.blog = (await BlogServices.show(blogId)).data
    this.$nextTick(() => {
      let mEditor = new MediumEditor('.editable', {
      })
      mEditor.setContent(this.blog.content)
    })
  },
  methods: {
    async edit() {
      const blogId = this.$store.state.route.params.blogId
      try {
        await BlogServices.edit(this.blog)
        this.$router.push({
          name: 'viewBlog',
          params: {
            blogId: blogId
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped>
#body {
  text-align: center;
}
</style>
