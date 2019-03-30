<template>
    <div class="header">
      <router-link :to="{name: 'root'}">
        <img src="../assets/cnodejs_light.svg"/>
      </router-link>
      <span><a href="#">关于</a></span>
    </div>
</template>

<script>
export default {
  name: 'HeaderW'
}
</script>

<style scoped>
body{padding: 0;margin: 0;font-size: 14px;}
.header{
  background: #333333;
  height: 70px;
}
a{text-decoration: none;}
span{
  float: right;line-height: 70px; padding-right: 8px;}
img{
    width: 100px;height: 70px;margin-left: 30px;}
</style>
