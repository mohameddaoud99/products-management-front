<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/FooterPage.vue';


</script>

<template>
  <div id="app">
    <NavBar />
    <RouterView />
    <Footer/>
  </div>
</template>

