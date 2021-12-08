<template>
  <div>
    <router-view/>
  </div>
  <!-- <div>
    <img :src="getImage()">
  </div> -->
  <div>
    <img :src="image">
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onBeforeMount} from "vue";
import axios from "axios"
import {useRoute} from 'vue-router'
const route = useRoute()
var image_url = route.query.image_url.toString()
let image = require("/Users/Leo/" +image_url);
console.log(route.query.image_url)
console.log(image)
console.log("This is home:")

// const getImage = () =>{
//    axios.post('/postimage',{id : route.query.id}).then(response=>{
//     // console.log("=======================================ssssssss==============================")
//     // console.log(response.data.data.image_url)
//     const image =  "/Users/Leo/a.jpeg"
     
//       // imgUrl = m.default
      
//   })
// }
</script>
<style>

</style>