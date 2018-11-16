<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component
export default class Redirect extends Vue {
  beforeCreate() {
    const { params, query } = this.$route;
    const { path } = params;
    const url = path === undefined ? '/' : ('/' + path);

    this.$router.replace({ path: url, query });
  }
  render(h: any) {
    return h(); // avoid warning message
  }
}
</script>
