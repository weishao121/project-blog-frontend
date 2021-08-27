<template>
  <v-container id='body' class='mt-15'>
    <v-btn
      color='primary'
      @click='edit'
    >确认修改</v-btn>
    <div v-if='user != null'>
      <v-text-field
        label='Title'
        required
        v-model='user.email'
      ></v-text-field>
    </div>
  </v-container>
</template>
<script>
import UserServices from '@/services/user'
export default {
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    const userId = this.$store.state.route.params.userId
    this.user = (await UserServices.show(userId)).data
  },
  methods: {
    async edit() {
      const userId = this.$store.state.route.params.userId
      try {
        await UserServices.edit(this.user)
        this.$router.push({
          name: 'userDetail',
          params: {
            userId: userId
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
