<template>
  <div class = "homestyle">
    <!--    头部-->
    <Header/>
    <!--    主体-->
    <div style="display: flex">
      <!--      侧边栏-->
      <Aside/>
      <!--      内容区域-->
      <Home/>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";
import Home from "../components/home.vue"
export default {
  name: "Layout",
  components:{
    Header,
    Aside,
    Home
  }
}
</script>

<style scoped>  
.homestyle{
  height: 100%;
  width: 100%;
}
</style>