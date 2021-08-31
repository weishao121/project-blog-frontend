<template>
  <v-container>
    <v-app-bar id='topbar' fixed>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <!-- <v-btn @click='to("/")' icon>
        <v-icon>mdi-open-source-initiative</v-icon>
      </v-btn> -->
      <v-toolbar-title id='topbar-title'><a @click='toMain("/")'>开源博客</a></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items id='topbar-item' v-if='!$store.state.isUserLoggedIn'>
        <v-btn :to='{ name: "register" }' icon class='topbar-links'>
          <v-icon class='mr-2'>mdi-account-plus</v-icon>
          注册
        </v-btn>
        <v-btn :to='{ name: "login" }' icon class='topbar-links'>
          <v-icon class='mr-2'>mdi-login</v-icon>
          登入
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <!-- After successful login -->
        <v-btn :to='{ name: "writeBlog" }' icon color='success' class='topbar-links'>
          <v-icon class='mr-2'>mdi-typewriter</v-icon>
          开始写作
        </v-btn>
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn id='topbar-icon' icon x-large v-on="on">
              <v-avatar color="brown" size="48">
                <span class="white--text text-h5">{{$store.state.user.username}}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="white--text text-h5">{{$store.state.user.username}}</span>
                </v-avatar>
                <h3>{{$store.state.user.username}}</h3>
                <p class="text-caption mt-1">{{$store.state.user.usernamel}}</p>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text :to='{name: "writeBlog"}'>开始写作</v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text :to='{ name: "userDetail", params: { userId: $store.state.user.id }}'>个人中心</v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click='logout'>登出</v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </v-container>
</template>
<script>
export default {
  methods: {
    toMain(route) {
      if (this.$route.name === route.name) return
      else if (this.$route.name === 'HomePage' && route === '/') return
      this.$router.push({ 'name': 'HomePage' })
    },
    toRest(route) {
      if (this.$route.name === route.name || this.$route.name === route) return
      this.$router.push(route)
    },
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'HomePage' })
    }
  }
}
</script>
<style scoped>
#topbar {
  padding: 0 235px 0 235px;
}
#topbar-title {
  font-size: 1.75em;
}
.topbar-links {
  font-size: 1.5em;
  margin: 0 25px 0 25px;
}
#topbar-icon {
  margin: 0 35px 0 35px;
}
</style>
