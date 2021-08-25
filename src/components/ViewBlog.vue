<template>
  <v-container id='body' class='mt-15'>
    <div v-if='blog != null'>
      <div>{{blog.title}}</div>
      <div>{{blog.description}}</div>
      <div>{{blog.author}} - {{blog.createdAt}}</div>
    </div>
    <textarea class='editable' name="editable"></textarea> <!-- Medium Editor -->
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
        toolbar: false,
        disableEditing: true
      })
      mEditor.setContent(this.blog.content)
    })
  }
}
</script>
<style scoped>
#body {
  text-align: center;
}
</style>
