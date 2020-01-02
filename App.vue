<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
.uni-input-placeholder {
	color: #00355f;
}
.imgs {
	width: 100%;
	height: 100%;
}
.ac{
	text-align: center;
}
.al{
	text-align: left;
}
.ar{
	text-align: right;
}
page {
	width: 100%;
	height: 100%;
	display: block;
}
swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}


/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */
</style>
