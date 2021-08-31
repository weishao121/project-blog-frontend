<template>
  <v-container class='mt-15'>
    <h1>登入</h1>
    <v-text-field label='用户名' v-model='username'></v-text-field>
    <v-text-field label='密码' type='password' v-model='password'></v-text-field>
    <div class='err' v-html='error'></div><br>
    <v-btn @click="login">点击登入</v-btn>
  </v-container>
</template>
<script>
import Auth from '@/services/auth'
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await Auth.login({
          username: this.username,
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
.main {
  text-align: center;
}
.err {
  color: red;
}
</style>
