<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot/>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const padding = 15; // tag's padding

@Component({
  name: 'ScrollPane',
})
export default class ScrollPane extends Vue {
  private left: number = 0;

  private handleScroll(e: any) {
    const eventDelta = e.wheelDelta || -e.deltaY * 40;
    const $scrollWrapper = (this.$refs.scrollContainer as any).$refs.wrap;
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
  }
  private moveToTarget($target: any) {
    const $container = (this.$refs.scrollContainer as any).$el;
    const $containerWidth = $container.offsetWidth;
    const $scrollWrapper = (this.$refs.scrollContainer as any).$refs.wrap;
    const $targetLeft = $target.offsetLeft;
    const $targetWidth = $target.offsetWidth;
    if ($targetLeft > $containerWidth) {
      // tag in the right
      $scrollWrapper.scrollLeft = $targetLeft - $containerWidth + $targetWidth + padding;
    } else {
      // tag in the left
      $scrollWrapper.scrollLeft = $targetLeft - padding;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  /deep/ {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
