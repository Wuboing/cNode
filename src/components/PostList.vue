<template>
    <div>
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div v-else class="PostList">
        <ul>
          <li v-for="(post, index) in posts" :key="index">
            <router-link :to="{name: 'user',params: {name: post.author.loginname}}"
                         :title="post.author_id">
              <img :src="post.author.avatar_url" :title="post.author.loginname"/>
            </router-link>
            <span>
              {{post.reply_count}}/{{post.visit_count}}
            </span>
            <router-link :to="{name: 'ad',params: {id: post.id,name: post.author.loginname}}"
                         :title="post.title">
              {{post.title}}
            </router-link>
            <span class="last_reply">
            {{ post.last_reply_at | formatDate}}
          </span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PostList',
  data () {
    return {
      loading: false,
      posts: {}
    }
  },
  filters: {
    timeStyle (createTime) {
      return String(createTime).match(/.{10}/)[0]
    }
  },
  methods: {
    getData () {
      this.$http({
        url: 'https://cnodejs.org/api/v1/topics',
        method: 'get',
        params: {
          page: 1,
          limit: 30
        }
      })
        .then((response) => {
          if (response.data.success === true) {
            this.posts = response.data.data
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
  .loading{
    text-align: center;
    font-size: 20px;
    margin-top: 200px;
  }
ul{
  padding: 0;margin:0;}
li{
  border-bottom: 1px solid darkgrey;list-style: none;margin-bottom: 20px;
  }
li a{text-decoration: none;
  color: #000;font-size:16px;
  text-align: center;
}
li a:hover{color: red;}
  img{width:24px;
    height: 24px;}
  .PostList{
    background-color: white;
    padding: 0.5rem;
    margin: 0.5rem 3rem;
  }
  .PostList ul li span{
    display: inline-block;margin: 0 8px;
    font-size: 12px;text-align: center;}
  .last_reply{float: right;}
</style>
