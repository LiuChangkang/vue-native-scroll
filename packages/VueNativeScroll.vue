<template>
  <div
      class="n-scroll vue-native-scroll__outer"
      :style="{height}"
      style="overflow:hidden auto;-webkit-overflow-scrolling:touch"
      v-on:scroll="scroll"
      v-on:scroll.once.self="checkScrollElement"
      ref="scrollWrapper"
  >
    <slot name="before"></slot>

    <div
        ref="scrollBody"
        :style="{
          minHeight: SCROLL_NEGATIVE_NUMBER ? 'calc(100% + 2px)' : '100%',
          transform: compositing ? 'translateZ(0)' : ''
        }"
        v-on:touchstart="touchStart"
        v-on:touchmove="touchMove"
        v-on:touchend="touchEnd"
        v-on:touchcancel="touchEnd"
    >
      <slot></slot>
    </div>

    <slot name="after"></slot>
  </div>
</template>

<script>
  function __scrollTop__(el, value) {
    const hasScrollTop = 'scrollTop' in el;
    if (value === undefined)
      return hasScrollTop ? el.scrollTop : el.pageYOffset;
    return hasScrollTop ? el.scrollTop = value : el.scrollTo(el.scrollX, value);
  }

  __scrollTop__(window, -9);
  const SCROLL_NEGATIVE_NUMBER = __scrollTop__(window) < 0; // 是否可以负滚动
  __scrollTop__(window, 0);

  const negativeComponent = {
    methods: {
      touchStart() {
        const el = this.$el;
        const scrollTop = el.scrollTop;
        if (scrollTop === 0) {
            el.scrollTop = 1
        } else {
          let offsetScreen2Top = el.scrollHeight - el.clientHeight; // 可视区域距离滚动区域顶端的距离
          if (offsetScreen2Top === scrollTop)
            el.scrollTop = offsetScreen2Top - 1 // 到达底部就-1
        }
      },
      touchMove() {},
      touchEnd() {}
    },
    mounted() {
      if (this.mountedDownScroll && __scrollTop__(this.$el) === 0)
        __scrollTop__(this.$el, 1);
    }
  };

  const nonNegativeComponent = {
    methods: {
      touchStart(e) {
        if (__scrollTop__(this.scrollElement) === 0) {
          this.startY = e.touches[0].clientY;
        }
      },
      touchMove(e) {
        const _ = this;
        if (_.startY === undefined && __scrollTop__(_.scrollElement) === 0) {
          _.startY = e.touches[0].clientY;
        } else if (e.cancelable && e.touches[0].clientY > _.startY) {
          e.preventDefault();
          _.$emit('pullDownOver', e.touches[0].clientY - _.startY);
        }
      },
      touchEnd() {
        if (this.startY)
          this.startY = undefined;
      }
    }
  };

  export default {
    name: "VueNativeScroll",
    mixins: [SCROLL_NEGATIVE_NUMBER ? negativeComponent : nonNegativeComponent],
    props: {
      height: {
        type: String,
        default: ''
      },
      compositing: { // 是否开启复合层加速
        type: Boolean,
        default: true
      },
      mountedDownScroll: { // 可以负滚动的情况下，初始化是否往下滚1px
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        scrollElement: window
      }
    },
    computed: {
      SCROLL_NEGATIVE_NUMBER: () => SCROLL_NEGATIVE_NUMBER,
    },
    methods: {
      scroll(e) {
        e.distance = {
          top: this.$refs.scrollWrapper.scrollTop,
          bottom: this.$refs.scrollBody.clientHeight - this.$refs.scrollWrapper.clientHeight - this.$refs.scrollWrapper.scrollTop
        };
        this.$emit('scroll', e);
      },
      checkScrollElement() {
        this.scrollElement = this.$el;
      },
    },
    install(Vue, set = {}) {
      Vue.component(set.name || 'scroll-view', this);

      if (!set.noPreventDefault && document) { // 默认阻止滚动事件
        document.body.addEventListener('touchmove', function (e) {
          if (e.cancelable) {
            let compareElement = e.target.parentElement;
            while (compareElement !== document.body) {
              if (compareElement.classList.contains('n-scroll')) {
                return;
              } else {
                compareElement = compareElement.parentElement;
              }
            }
            e.preventDefault();
          }
        }, {
          passive: false
        });
      }
    }
  }
</script>
