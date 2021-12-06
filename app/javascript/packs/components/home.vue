<template>
  <div>
    <router-view/>
    <%= image_tag(@comment.images.first) if @comment.images.attached? %>
  </div>

</template>

<script setup>
import { reactive, ref, toRefs ,getCurrentInstance, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
    const route = useRoute()
    console.log( "This is home")
</script>

<style>

</style>