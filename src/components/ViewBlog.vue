<template>
  <v-container id='body' class='mt-15'>
    <div v-if='blog != null'>
      <div v-if='this.$store.state.user.username === blog.author'>
        <v-btn color='primary' :to='{ name: "editBlog", params: { blogId: blog.id }}'>编辑博客</v-btn>
        <v-dialog
          v-model="deleteDialog"
          persistent
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="error darken-1"
              dark
              v-bind="attrs"
              v-on="on"
            >
              删除博客
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              确认删除博客?
            </v-card-title>
            <v-card-text>删除博客后，不能逆转</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                text
                @click="deleteDialog = false"
              >
                返回
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="deleteBlog"
              >
                确认
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
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
      blog: null,
      deleteDialog: false
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
  },
  methods: {
    async deleteBlog() {
      // alert('Deleted! ! !')
      try {
        await BlogServices.delete(this.blog)
        this.$router.push({
          name: 'userDetail',
          params: {
            userId: this.$store.state.user.id
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
