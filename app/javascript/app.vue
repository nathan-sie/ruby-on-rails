<template>
  <div>
    <router-view/>
    <div>
      fuck world!
    </div>
  </div>
</template>

<script>
// import user from './packs/components/user.vue';
// import Aside from './packs/components/Aside.vue';
// import Header from './packs/components/Header.vue';
// import home from './packs/components/home.vue';
// import Layout from "./packs/layout/Layout.vue";

export default {
  name:"app",
  data() {
    return {
    };
  },
  // components: {
  //   user: user,
  //   Aside : Aside,
  //   Header : Header,
  //   home : home,
  //   Layout : Layout,
  // }
};
</script>

<style scoped>

p {
  font-size: 2em;
  text-align: center;
}
</style>
