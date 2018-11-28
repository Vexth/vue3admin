<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in Array.from(visitedViews)"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="tag"
        :key="tag.path"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px', top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import ScrollPane from '@/components/ScrollPane/index.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { TagsModule } from '@/store/modules/tags';
@Component({
  components: {
    ScrollPane,
  },
})
export default class TagsView extends Vue {
  private visible: boolean = false;
  private top: number = 0;
  private left: number = 0;
  private selectedTag: any = {};

  get visitedViews() {
    return TagsModule.visitedViews;
  }
  @Watch('$route')
  onRouteChild() {
    this.addViewTags();
    this.moveToCurrentTag();
  }
  @Watch('$visible')
  onVisibleChild(value: any) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu);
    } else {
      document.body.removeEventListener('click', this.closeMenu);
    }
  }
  mounted() {
    this.addViewTags();
  }
  generateRoute() {
    if (this.$route.name) {
      return this.$route;
    }
    return false;
  }
  isActive(route: any) {
    return route.path === this.$route.path;
  }
  addViewTags() {
    const route = this.generateRoute();
    if (!route) {
      return false;
    }
    TagsModule.addVisitedView(route);
    TagsModule.addCachedView(route);
  }
  moveToCurrentTag() {
    const tags: any = this.$refs.tag;
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {
          (this.$refs.scrollPane as any).moveToTarget(tag.$el);
          // when query is different then update
          if (tag.to.fullPath !== this.$route.fullPath) {
            TagsModule.updateVisitedView(this.$route);
          }
          break;
        }
      }
    });
  }
  async refreshSelectedTag(view: any) {
    await TagsModule.delCachedView(view);
    const { fullPath } = view;
    await this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect' + fullPath,
      });
      this.visible = false;
    });
  }
  async closeSelectedTag(view: any) {
    await TagsModule.delVisitedView(view);
    await TagsModule.delCachedView(view);
    this.visible = false;
    const visitedViews = await TagsModule.visitedViews;
    if (this.isActive(view)) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.path);
      } else {
        this.$router.push('/');
      }
    }
  }
  async closeOthersTags() {
    this.$router.push(this.selectedTag);
    await TagsModule.delOthersVisitedViews(this.selectedTag);
    await TagsModule.delOthersCachedViews(this.selectedTag);
    this.visible = false;
    this.moveToCurrentTag();
  }
  async closeAllTags() {
    await TagsModule.delAllVisitedViews();
    await TagsModule.delAllCachedViews();
    this.visible = false;
    this.$router.push('/');
  }
  openMenu(tag: any, e: any) {
    this.visible = true;
    this.selectedTag = tag;
    const offsetLeft = this.$el.getBoundingClientRect().left;
    this.left = e.clientX - offsetLeft + 15;
    this.top = e.clientY;
  }
  closeMenu() {
    this.visible = false;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  // top: 50px;
  // position: fixed;
  // z-index: 9;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
