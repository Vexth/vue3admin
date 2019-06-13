<!--
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <template v-if="item.meta.title">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.name }}</span>
          <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { RouteRecord } from 'vue-router';
import pathToRegexp from 'path-to-regexp';

@Component
export default class Breadcrumb extends Vue {
  levelList: RouteRecord[] = [];

  created() {
    this.getBreadcrumb();
  }

  @Watch('$route')
  onRouteChange() {
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    // let matched: RouteRecord[] = this.$route.matched.filter((item: RouteRecord) => item.name);
    // const first: RouteRecord = matched[0];
    // if (first && (first.name as string).trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
    //   matched = [{ path: '/dashboard', meta: { title: 'dashboard' }} as RouteRecord].concat(matched);
    // }
    const matched: RouteRecord[] = this.$route.matched.filter((item: RouteRecord) => item.name);
    this.levelList = matched.filter((item: RouteRecord) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
  }

  handleLink(item: any) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect);
      return;
    }
    this.$router.push(this.pathCompile(path));
  }

  pathCompile(path: any) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route;
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
