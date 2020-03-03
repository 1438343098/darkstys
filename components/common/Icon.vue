<template>
	<rich-text class="iconfont" :style="{color:color,'font-size':fontSize}" @click="onClick()" :nodes="type"></rich-text>
</template>

<script>
	export default {
		props: {
			/**
			 * 图标类型
			 */
			type: String,
			/**
			 * 图标颜色
			 */
			color: String,
			/**
			 * 图标大小
			 */
			size: {
				type: [Number, String],
				default: 24
			}
		},
		computed: {
			fontSize() {
				var size = Number(this.size)
				size = isNaN(size) ? 24 : size
				return `${size}px`
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>

<style lang="scss" scoped>
// https:
	
	@font-face {
	  font-family: 'iconfont';  /* project id 1278045 */
	  src: url('//at.alicdn.com/t/font_1278045_v0i4s2hyjo.eot');
	  src: url('//at.alicdn.com/t/font_1278045_v0i4s2hyjo.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1278045_v0i4s2hyjo.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1278045_v0i4s2hyjo.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1278045_v0i4s2hyjo.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1278045_v0i4s2hyjo.svg#iconfont') format('svg');
	}
	.iconfont{
	font-family:"iconfont" !important;
	font-size:16px;font-style:normal;
	display: inline-block;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;}
</style>
