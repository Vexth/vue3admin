<template>
  <div class="table-header">
    <el-form :inline="true" :model="data" class="form--label-left" label-width="180px">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in config" :key="item.code">
          <el-form-item :label="item.title" class="table-header-item">
            <el-select v-if="item.type === 'select'" v-model="data[item.code]" :placeholder="`请输入${item.title}`" :size="size" clearable>
              <el-option v-for="option in item.options" :key="option.value" :value="option.value" :label="option.label"></el-option>
            </el-select>
            <el-input v-else v-model="data[item.code]" :placeholder="`请输入${item.title}`" :size="size"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="table-header_button">
          <el-button :size="size" type="text" @click="reset">清空</el-button>
          <el-button :size="size" type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { HeaderConfigItem } from './data';

@Component({})
export default class TableHeader extends Vue {
  public DEFAULT_COPY: object = {};
  @Prop({default() {
    return 'small';
  }})
  public size!: 'small' | 'mini' | 'medium';

  @Prop({})
  public data!: object;

  @Prop({default: []})
  public config!: HeaderConfigItem[];

  public mounted() {
    this.DEFAULT_COPY = Object.assign({}, this.data);
  }
  // 查询
  public search(item: any) {
    const list: object = JSON.stringify(item) === '{}' ? {} : this.data;
    this.$emit('search', list);
  }
  // 清空
  private reset() {
    this.$emit('update:data', Object.assign({}, this.DEFAULT_COPY));
    this.search({});
  }
}
</script>

<style lang="scss">
.table-header {
  padding-top: 10px;
  .table-header_button {
    text-align: right;
    float: right;
    margin-bottom: 12px;
    line-height: 40px;
  }
  .table-header-item.el-form-item {
    width: 100%;
    display: flex;
    flex: auto;
    margin-bottom: 12px;
    .el-form-item__content, .el-select {
      width: 100%;
    }
  }
}

</style>
