<template>
    <div class="Article">
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div v-else>
        <div>
          <h3>{{post.title}}</h3>
          <ul>
            <li>• 分类:{{postTab}}</li>
            <li>• {{post.visit_count}}次访问</li>
            <li>• 发布与:{{ post.create_at | formatDate }}</li>
            <li>
              • 作者:
              <router-link :to="{name: 'user',params: { name: post.author.loginname }}">
                {{post.author.loginname}}
              </router-link>
            </li>
          </ul>
          <div v-html="post.content" id="content"></div>
        </div><hr/>
        <div class="reply">
          <div v-for="(reply,index) in post.replies" :key="index" class="replySec">
            <div class="replyUp">
              <router-link :to="{name: 'user',params: {name: reply.author.loginname}}">
                <img :src="reply.author.avatar_url" :title="reply.author.loginname"/>
              </router-link>
              <router-link :to="{name:'user',params: {name:reply.author.loginname}}">
                {{reply.author.loginname}}
              </router-link>
              <span>
                {{index+1}}楼
              </span>
            </div>
            <section v-if="reply.ups.length>0" class="thumbsClass">
              <span>❤ </span>{{reply.ups.length}}
            </section>
            <p v-html="reply.content"></p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      loading: true,
      post: {
        author: {
          loginname: 'temp'
        }
      }
    }
  },
  computed: {
    postTab () {
      const type = this.post.tab.toString()
      if (type === 'ask') {
        return '问答'
      }
      if (type === 'share') {
        return '分享'
      }
      if (type === 'job') {
        return '招聘'
      }
      if (type === 'good') {
        return '精华'
      }
    }
  },
  methods: {
    getData () {
      this.$http({
        url: `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,
        method: 'get'
      })
        .then((response) => {
          if (response.data.success === true) {
            this.post = response.data.data
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
  .Article{
    width: 70%;border: 1px solid #ddd;padding: 0.8rem 0.4rem;
    margin-left: 3%;background: #ffffff;box-sizing: border-box;
    display: inline-block;margin-top: 8px;
  }
  ul{
    list-style-type: none;}
  ul li{
    float: left;
    font-size: 12px;color: grey;margin-left: 8px;
  }
  ul li a{font-size: 12px;}
  .Article #content{clear: left;margin-left: 15px;
    margin-top: 50px;}
  li a{text-decoration: none;
    color: #000;font-size:20px;
    text-align: center;
  }
  li a:hover{color: red;}
  .thumbsClass{color: red;float: right;margin-right: 8px;
    display: inline-block;}
  a{text-decoration: none;color: black;}
  .reply .replySec{
    display: block;
  }
  .replyUp img{
    margin: 4px;
    width: 24px;height: 24px;
  }
  .replyUp a{
    display: inline-block;
    line-height: 24px;
    margin: 4px;
  }
  .replySec{
    border-bottom: 1px solid grey;
    padding-bottom: 20px;
  }
  .replySec p{
    padding-left: 60px;
    display: block;
  }
  .replySec p img{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
