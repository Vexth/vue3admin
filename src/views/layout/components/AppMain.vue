<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TagsModule } from '@/store/modules/tags';
@Component
export default class AppMain extends Vue {
  get cachedViews() {
    return TagsModule.cachedViews;
  }
  get key() {
    return this.$route.fullPath;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  /* 50 = navbar */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
</style>