<template>
	<view class="index">
		<navigator url='image/index' hover-class='none' class="bilibili" >
			<image  mode='widthFix' class="photoimg" src="http://superliu.cn/photo/bilibili.jpg" ></image>
		</navigator>
		<navigator  url='music/index' hover-class='none' class="music">
			<image  mode='widthFix' class="photoimg" src="http://superliu.cn/photo/music.jpg" ></image>
		</navigator>
	</view>
</template>

<script>
	export default{
		methods:{
			
		},
		
	}
</script>

<style lang="scss" scoped>
	.index{
		height: 100%;
	}
.bilibili,.music{
	height: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.photoimg{
	width: 80%;
	height: 80%;
	border-radius: 10px;
	
	
}

.bilibili{
	background: #606cff;
	.photoimg{
		transform: translateX(-10upx);
		animation: 10s lrauto infinite alternate linear;
		box-shadow: 0upx 0upx 40upx 25upx #b6c3ff;
	}
}
.music{
	background: #dc1e1e;
	.photoimg{
		transform: translateX(-10upx);
		animation: 5s lrauto infinite 1s alternate linear;
		box-shadow: 0upx 0upx 40upx 25upx #e66767;
	}
}
@keyframes lrauto{
  0% {transform: translateX(-10upx);}
  25% {transform: translateY(-10upx);}
  75% {transform: translateY(10upx);}
  100% {transform: translateX(10upx);}
}
</style>
