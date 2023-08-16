<template>
  <div id="app">
    <a-layout>
      <HeaderBar />
      <a-layout-content
        style="padding-left: 100px; padding-right: 100px; padding-bottom: 40px; margin-top: 40px;"
      >
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer
        style="text-align: center; background-color: rgb(255, 255, 255)"
        >© 2023 BoardGame Bonto, All Rights Reserved</a-layout-footer
      >
    </a-layout>
  </div>
</template>

<script>
import HeaderBar from "./components/Header.vue";
export default {
  name: "App",
  components: {
    HeaderBar,
  },
};
</script>
