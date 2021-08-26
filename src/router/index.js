import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Register from '@/components/Register'
import Login from '@/components/Login'
import ViewBlog from '@/components/ViewBlog'
import WriteBlog from '@/components/WriteBlog'
import UserDetail from '@/components/UserDetail'
import CateBlog from '@/components/CateBlog'
import EditBlog from '@/components/EditBlog'

Vue.use(Router)

export default new Router({
  mode: 'history', // to remove the # sign
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blog/:blogId',
      name: 'viewBlog',
      component: ViewBlog
    },
    {
      path: '/blog/new',
      name: 'writeBlog',
      component: WriteBlog
    },
    {
      path: '/user/:userId',
      name: 'userDetail',
      component: UserDetail
    },
    {
      path: '/category/:category',
      name: 'cateBlog',
      component: CateBlog
    },
    {
      path: '/blog/edit/:blogId',
      name: 'editBlog',
      component: EditBlog
    }
  ]
})
