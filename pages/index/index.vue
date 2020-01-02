<template>
	<view class="content">
		<view  class="hello">
			去除一些花里胡哨的东西
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: mapState(['forcedLogin', 'userName', 'city']),
	onLoad() {
		this.showHead = false;
	},
	data() {
		return {
			showHead: false,
		};
	},
	methods: {
	},

};
</script>

<style lang="scss" scoped>
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}
.hello2 {
	position: absolute;
	overflow: hidden;
	top: -700upx;
	left: 375upx;
	width: 750upx;
	background: linear-gradient(#c07da4, #477497);
	height: 100vh;
	animation: img 4s both;
	padding-top: 100upx;
}
.title {
	margin-top: 50upx;
}


</style>
