<template>
    <div  class="SideBar">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-else>
        <div class="autherinfo">
          <div class="authersummay">
            <p>作者</p>
            <router-link :to="{name: 'user',params: {name:userinfo.loginname}}">
              <img :src="userinfo.avatar_url">
            </router-link>
            <router-link :to="{name: 'user',params: {name: userinfo.loginname}}"
                         :title="userinfo.loginname">
              {{userinfo.loginname}}
            </router-link>
            <section>
              积分:{{userinfo.score}}
            </section>
          </div>
          <div class="recent_topics">
            <p>作者近期主题</p>
            <ul>
              <li v-for="list in topicsLimitBy5">
                <router-link :to="{name: 'ad',params: {id: list.id, name: list.author.loginname}}"
                             :title="list.title">
                  {{list.title}}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="recent_replies">
            <p>作者最近回复</p>
            <ul>
              <li v-for="list in userinfo.recent_replies">
                <router-link :to="{name: 'ad',params: {id: list.id ,name: list.author.loginname}}"
                             :title="list.title">
                  {{list.title}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      loading: true,
      userinfo: {}
    }
  },
  computed: {
    topicsLimitBy5 () {
      return this.userinfo.recent_topics.slice(0, 5)
    }
  },
  methods: {
    getData () {
      this.$http({
        url: `https://cnodejs.org/api/v1/user/${this.$route.params.name}`,
        method: 'get'
      })
        .then((response) => {
          if (response.data.success === true) {
            this.userinfo = response.data.data
            this.loading = false
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  beforeMount () {
    this.loading = true
    this.getData()
  },
  watch: {
    $route () {
      this.getData()
    }
  }
}
</script>

<style scoped>
.SideBar{
  width: 24%;float: right;
}
  ul{list-style: none;}
  ul li a{text-decoration: none;line-height: 24px;height: 24px;
    color: #a8a3a3;font-size: 12px;text-overflow: ellipsis;overflow: hidden;display: inline-block;}
.autherinfo{display: block;background: white;margin-right: 25px;margin-top: 8px;}
  .authersummay img{
    width: 24px;
    height: 24px;
    margin-left: 18px;display: inline-block;
  }
 .authersummay p{ text-align: center;font-size: 15px;background-color: rgba(212, 205, 205, 0.17);line-height: 30px;}
  .authersummay section{margin-left:18px;margin-bottom: 20px;margin-top: 8px;border-bottom: 2px solid grey;}
  .authersummay a{color: black;font-size: 16px;text-decoration: none;margin-left: 8px;}
  .recent_topics{display: block;}
  .recent_topics p{text-align: center;font-size: 14px;background-color: rgba(212, 205, 205, 0.17);line-height: 30px;}
  ul li{margin-left: 18px;overflow: hidden;display: inline-block;padding: 3px 8px;}
  ul li:hover a{
    color: #000;}
.recent_replies p{text-align: center;font-size: 14px;background-color: rgba(212, 205, 205, 0.17);line-height: 30px;}
</style>
