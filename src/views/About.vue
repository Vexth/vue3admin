<template>
  <div class="about">
    <table-header @search="test" :config="config" :data.sync="list"></table-header>
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TableHeader from '@/components/table-header'; // @ is an alias to /src

@Component({
  components: {
    TableHeader,
  },
})
export default class About extends Vue {
  public config: any = [
    {
      title: '输入框',
      code: 'id',
      type: 'input',
    },
    {
      title: '下拉框',
      code: 'auth',
      type: 'select',
      options: [
        {
          value: 0,
          label: 'xxxx',
        },
        {
          value: 1,
          label: 'yyyy',
        },
      ],
    },
  ];
  public list: object = {};
  public test(item: any) {
    console.log(item);
  }
}
</script>
