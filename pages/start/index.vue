<template>
	<view class="todo">
		<view class="one" @click="goIndex">
			<image src="/static/image/start.jpg" class="imgBg" />
			<view class="titles">
				<text class="texts">darkSky</text>
				<button class="button" type="primary">
					<text class="upt">融</text>
					<text class="upt">入</text>
					<text class="upt">夜</text>
					<text class="upt">空</text> 
				</button> 
			</view>
		</view>
	</view>
</template>

<script>
import data from 'service';
export default {
	data(){
		return{
			time:null
		}
	},
	onLoad() {
		this.time = setTimeout(function() {
			uni.switchTab({
				url:'/pages/index/index'
			})
		}, 3000);
	},
	methods: {
		// 进入首页
		goIndex() {
		clearTimeout(this.time)
		this.time = null
			uni.switchTab({
				url:'/pages/index/index'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	
.todo {
	& > text{
		color:red
		
	}
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	overflow: hidden;
	.titles {
		position: absolute;
		z-index: 10;
		background: transparent;
		top: 50%;
		left: 50%;
		height: 700upx;
		transform: translate(-50%, -50%);
	}
	.button {
		position: absolute;
		bottom: 0;
		background: transparent;
		text-align: center;
		left: 50%;
		border: 0;
		width: 240upx;
		transform: translateX(-50%);
	}
	.texts {
		font-family: 'Times New Roman', Times, serif;
		color: rgba(160, 137, 137, 0.8);
		font-size: 80upx;
		letter-spacing: 2upx;
	}
	.upt {
		display: inline-block;
		transform: translateY(20upx);
	}
	.upt:nth-child(1) {
		animation: upts 5s infinite;
	}
	.upt:nth-child(2) {
		animation: upts 5s infinite 0.5s;
	}
	.upt:nth-child(3) {
		animation: upts 5s infinite 1s;
	}
	.upt:nth-child(4) {
		animation: upts 5s infinite 1.5s;
	}
}

.imgBg {
	width: 200%;
	height: 100%;
	animation: gor 30s linear infinite;
	position: fixed;
}
@keyframes gor {
	0% {
		transform: translateX(0);
	}
	50% {
		transform: translateX(-50%);
	}
	100% {
		transform: translateX(0%);
	}
}
@keyframes upts {
	0% {
		transform: translateY(20upx);
	}
	50% {
		transform: translateY(-20upx);
	}
	100% {
		transform: translateY(20upx);
	}
}

</style>
