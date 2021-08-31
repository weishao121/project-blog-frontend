<template>
  <v-container class='mt-15'>
    <h1>登入</h1>
    <v-text-field label='用户名' v-model='username'></v-text-field>
    <v-text-field label='密码' type='password' v-model='password'></v-text-field>
    <v-btn @click="login">点击登入</v-btn>
  </v-container>
</template>
<script>
import Auth from '@/services/auth'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const response = await Auth.login({
        username: this.username,
        password: this.password
      })
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user)
      this.$router.push({ 'name': 'HomePage' })
    }
  }
}
</script>
<style scoped>
.main {
  text-align: center;
}
</style>
