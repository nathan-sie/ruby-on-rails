<template>
  <div>
    <router-view/>
    <img :src="post.image_url"/>
  </div>

</template>

// <script setup>
// import { reactive, ref, toRefs ,getCurrentInstance, onMounted, computed} from 'vue';
// import {useRoute} from 'vue-router';
// import { mapActions, mapGetters } from "vuex";
// import axios from "axios";
//     const route = useRoute()
//     console.log( "This is home")
//     const computed =(computed) =>{
//       ...mapGetters("posts",["posts"])
//     }
//     const mapActions
// </script>

// <script>
// import { mapActions, mapGetters } from "vuex";

// export default {
//   name: "PostList",
//   created() {
//     this.fetchPosts();
//   },
//   computed: {
//     ...mapGetters("posts", ["posts"])
//   },
//   methods: {
//     ...mapActions("posts", ["fetchPosts", "deletePost"]),
//     del(id) {
//       this.deletePost(id);
//     }
//   }
// };
// </script>

<style>

</style>