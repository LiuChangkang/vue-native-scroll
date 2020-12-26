const deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;

const deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);

// eslint-disable-next-line no-underscore-dangle
function __scrollTop__(el, value) {
    const hasScrollTop = 'scrollTop' in el;
    if (value === undefined) {
        return hasScrollTop ? el.scrollTop : el.pageYOffset;
    }
    // eslint-disable-next-line
    return hasScrollTop ? el.scrollTop = value : el.scrollTo(el.scrollX, value);
}

function ListView(el, options) {
    options = options || {};
    this.$el = el.childNodes[0];
    this.onScroll = options.onScroll || null;
    el.style.position = 'relative' || options.position;
    this.$el.addEventListener('touchstart', this.touchStart.bind(this));
    this.$el.addEventListener('touchmove', this.touchMove.bind(this));
    this.$el.addEventListener('touchend', this.touchEnd.bind(this));
    this.$el.addEventListener('touchcancel', this.touchEnd.bind(this));
    this.$el.addEventListener('scroll', this.scroll.bind(this));
    this.$el.style = 'position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden auto;';
}

ListView.prototype.touchStart = function touchStart(e) {
    if (deviceIsIOS && document) {
        document.documentElement.style.overflow = 'hidden';
    } else if (deviceIsAndroid && __scrollTop__(this.$el) === 0) {
        this.touchPageY = e.touches[0].pageY;
    }
};

ListView.prototype.touchMove = function touchMove(e) {
    if (e.touches[0].pageY > this.touchPageY) e.preventDefault();
};

ListView.prototype.touchEnd = function touchEnd() {
    this.touchPageY = undefined;
    if (deviceIsIOS && document) document.documentElement.style.overflow = '';
};

ListView.prototype.scroll = function scroll(e) {
    if (this.onScroll) this.onScroll(e);
};

ListView.prototype.scrollDistance = function scrollDistance() {
    const scrollTop = __scrollTop__(this.$el);
    const offsetScreen2Top = this.$el.scrollHeight - this.$el.clientHeight;
    return {
        top: scrollTop,
        bottom: offsetScreen2Top - scrollTop
    };
};

ListView.prototype.destroy = function destroy() {
    this.$el.removeEventListener('touchstart', this.touchStart.bind(this));
    this.$el.removeEventListener('touchmove', this.touchMove.bind(this));
    this.$el.removeEventListener('touchend', this.touchEnd.bind(this));
    this.$el.removeEventListener('touchcancel', this.touchEnd.bind(this));
    this.$el.removeEventListener('scroll', this.scroll.bind(this));
    return delete this;
};

Object.freeze(ListView);

export default ListView;
