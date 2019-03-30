import Vue from 'vue'
import Router from 'vue-router'
import Header from './components/HeaderW.vue'
import PostList from './components/PostList.vue'
import Userinfo from './components/Userinfo.vue'
import Article from './components/Article.vue'
import SideBar from './components/SideBar.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Header,
      components: {
        main: PostList
      }
    },
    {
      path: '/topic/:id&author=:name',
      name: 'ad',
      components: {
        main: Article,
        SideBar: SideBar
      }
    },
    {
      path: '/user/:name',
      name: 'user',
      components: {
        main: Userinfo
      }
    }
  ]
})
