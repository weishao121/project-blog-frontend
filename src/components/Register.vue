<template>
  <v-container class='mt-15'>
    <form
      autocomplete="off">
      <h1>注册</h1>
      <v-text-field label='用户名' v-model='username'></v-text-field>
      <v-text-field label='电邮' v-model='email'></v-text-field>
      <v-text-field label='密码' type='password' v-model='password'></v-text-field>
      <div class='err' v-html='error'></div><br>
      <v-btn @click='register'>点击注册</v-btn>
    </form>
  </v-container>
</template>
<script>
import Auth from '@/services/auth'
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        const response = await Auth.register({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({ 'name': 'HomePage' })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<style scoped>
.err {
  color: red;
}
</style>
