<template>
    <div class="Userinfo">
      <div class="loading" v-if="loading">
        Loading
      </div>
      <div v-else>
        <div class="author">
          <img :src="userinfo.avatar_url" :title="userinfo.loginname"/>
          <span>{{userinfo.loginname}}</span>
          <p>{{userinfo.score}} 积分</p>
          <section>
            注册时间 :{{ userinfo.create_at | formatDate }}
          </section>
        </div>
        <div class="author-content">
          <p>作者近期主题</p>
          <ul>
            <li v-for="list in userinfo.recent_topics">
              <router-link :to="{name: 'ad',params: {id: list.id,name: list.author.loginname}}"
                           :title="list.title">
                {{list.title}}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="author-content">
          <p>作者最近回复</p>
          <ul>
            <li v-for="list in userinfo.recent_replies">
              <router-link :to="{name: 'ad',params: {id: list.id,name:list.author.loginname}}"
                           :title="list.title">
                {{list.title}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Userinfo',
  data () {
    return {
      loading: false,
      userinfo: {}
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
  }
}
</script>

<style scoped>
.author,.author-content{
  width: 80%;
  background: white;
  margin: 20px auto;
}
  .author img{
    width: 80px;
    height: 80px;
    margin: 10px;
  }
  .author span{
    margin-left: 8px;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
  }
  .author p,.author section{
    margin-left: 20px;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .author-content p{text-align: center;height: 50px;background: rgba(212, 205, 205, 0.17);line-height: 50px;}
  .author-content ul{list-style: none;}
  .author-content ul li{line-height: 30px;padding: 4px 0 4px 35px;text-overflow: ellipsis;white-space: normal;overflow: hidden;}
  .author-content ul li a{color: #094E99;text-decoration: none;font-size: 12px;}
</style>
