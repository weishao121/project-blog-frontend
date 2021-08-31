<template>
  <v-container class='mt-15'>
    <form
      autocomplete="off">
      <h1>注册</h1>
      <v-text-field label='用户名' v-model='username'></v-text-field>
      <v-text-field label='电邮' v-model='email'></v-text-field>
      <v-text-field label='密码' type='password' v-model='password'></v-text-field>
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
      password: ''
    }
  },
  methods: {
    async register() {
      const response = await Auth.register({
        username: this.username,
        email: this.email,
        password: this.password
      })
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user)
      this.$router.push({ 'name': 'HomePage' })
      // console.log(response.data)
    }
  }
}
</script>
<style scoped>
</style>
