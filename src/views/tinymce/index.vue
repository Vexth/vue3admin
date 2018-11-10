<template>
  <div class="dashboard-container">
    <tinymce :height="300" v-model="content"/>
    <div ref="html">{{ html }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Tinymce from '@/components/Tinymce/index.vue';
@Component({
  components: {
    Tinymce,
  },
})
export default class Dashboard extends Vue {
  private content: any = '';
  private html: any = '';

  @Watch('content')
  onContent(val: any) {
    (this.$refs.html as any).innerHTML = val;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
