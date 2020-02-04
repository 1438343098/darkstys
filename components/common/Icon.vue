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
	// @font-face {
	//   font-family: 'iconfont';  /* project id 1278045 */
	//   src: url('https:https://at.alicdn.com/t/font_1278045_6ni49wgrevn.eot');
	//   src: url('https:https://at.alicdn.com/t/font_1278045_6ni49wgrevn.eot?#iefix') format('embedded-opentype'),
	//   url('https:https://at.alicdn.com/t/font_1278045_6ni49wgrevn.woff2') format('woff2'),
	//   url('https:https://at.alicdn.com/t/font_1278045_6ni49wgrevn.woff') format('woff'),
	//   url('https:https://at.alicdn.com/t/font_1278045_6ni49wgrevn.ttf') format('truetype'),
	//   url('https:https://at.alicdn.com/t/font_1278045_6ni49wgrevn.svg#iconfont') format('svg');
	// }
	@font-face {
	  font-family: 'iconfont';  /* project id 1278045 */
	  src: url('//at.alicdn.com/t/font_1278045_xntk8w7z6e.eot');
	  src: url('//at.alicdn.com/t/font_1278045_xntk8w7z6e.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1278045_xntk8w7z6e.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1278045_xntk8w7z6e.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1278045_xntk8w7z6e.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1278045_xntk8w7z6e.svg#iconfont') format('svg');
	}
	.iconfont{
	font-family:"iconfont" !important;
	font-size:16px;font-style:normal;
	display: inline-block;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;}
</style>
