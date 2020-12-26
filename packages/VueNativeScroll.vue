<template>
  <div ref="scrollBody">
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
import PartialScroll from './PartialScroll';
export default {
  name: "VueNativeScroll",
  props: {
    position: {
      type: String,
      default: 'relative'
    }
  },
  mounted() {
    this.scroll = new PartialScroll(this.$refs.scrollBody, {
      onScroll: this.onScroll,
      position: this.position
    });
  },
  beforeDestroy() {
    this.scroll.destroy();
  },
  methods: {
    onScroll(e) {
      this.$emit('scroll', e);
    },
    scrollDistance() {
      return this.scroll.scrollDistance();
    }
  },
  install(Vue, options = {}) {
    Vue.component(options.name || 'ScrollView', this);
  }
}
</script>