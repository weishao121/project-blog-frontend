<template>
  <div>
    <v-container class='mt-15 box'>
        <v-row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="modal"
            persistent
            fullscreen
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                发布博客
              </v-btn>
            </template>
            <v-card>
              <v-row id='public-card'>
                <v-col>
                  <v-card-title class="text-h5">
                  预览
                  </v-card-title>
                  <v-text-field label='标题' v-model='blog.title'></v-text-field>
                  <v-text-field label='简介' v-model='blog.description'></v-text-field>
                  <v-text-field label='标签' v-model='blog.mainTag'></v-text-field>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="modal = false"
                      >
                        返回修改
                      </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="publish"
                      >
                        现在发布
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <medium-editor :content='blog.content' :options='options' v-model='blog.content'></medium-editor>
    </v-container>
  </div>
</template>
<script>
import Blog from '@/services/blog'
export default {
  data() {
    return {
      modal: false,
      blog: [
        {
          author: '',
          title: '',
          description: '',
          mainTag: '',
          content: ''
        }
      ],
      options: {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'quote', 'h1', 'h2', 'h3', 'unorderedlist']
        },
        placeholder: {
          text: '从这里开始写作'
        }
      }
    }
  },
  mounted() {
    // console.log(this.$store.state.user.email)
  },
  methods: {
    async publish() {
      this.modal = false
      await Blog.post({
        author: this.$store.state.user.email,
        title: this.blog.title,
        description: this.blog.description,
        mainTag: this.blog.mainTag,
        content: this.blog.content
      })
      this.$router.push('/')
      // console.log(response.data)
    }
  }
}
</script>
<style scoped>

#public-card {
  padding: 50px;
}
</style>
