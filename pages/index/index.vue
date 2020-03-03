<template>
	<view class="content">
		<view  class="hello">
	
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :circular='true' >
				<swiper-item>
					<view class="swiper-item uni-bg-red">暂时先放个轮播图？1</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">暂时先放个轮播图？2</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">暂时先放个轮播图？3</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: mapState('user',[ 'userName', 'city']),
	onLoad() {
		this.showHead = false;
		console.log(this.userName,this.city)
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
