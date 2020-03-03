<template>
	<view class="top" @click="tops">
		<Icon class="jiantou" type="&#xe632;" size="15" color="#fff" />
	</view>
</template>

<script>
	export default{
		methods:{
			// 回到顶部
			tops(){
				uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
				});
			},
		}
		
	}
</script>

<style scoped>
	.top{
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		position: fixed;
		right: 70upx;
		bottom: 150upx;
		background: rgba(0,0,0,.3);
		
	}
	.jiantou{
		display: inline-block;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-60%,-60%) rotate(90deg);
	}
</style>
