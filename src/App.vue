<template>
  <div id="app">
    <HeadW></HeadW>
    <router-view name="main"></router-view>
    <router-view name="SideBar"></router-view>
  </div>
</template>
<script>
import HeadW from './components/HeaderW.vue'
export default {
  name: 'app',
  components: {
    HeadW
  }
}
</script>
<style lang="scss">
  body{padding: 0;margin: 0;}
  li{line-style: none;}
  html {
    background-color: #DDDDDD;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
  body,div,span,a,p,ul,li {
    margin: 0;
    padding: 0;
  }
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
