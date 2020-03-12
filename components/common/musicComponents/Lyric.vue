<template>
	<view class="lyric">
		<view class="musicInfo">
			<view class="musicImg fl">
				<image :src="musicInfo == null?'/static/image/musicDefault.png':musicInfo.songs[0].al.picUrl" mode="widthFix"></image>
			</view>
			<view class="info fl">
				<view class="name">
					{{musicInfo == null?'请先选择音乐！':musicInfo.songs[0].name}}
				</view>
				<view class="user" >
					{{musicInfo == null?'请先选择音乐！':musicInfo.songs[0].ar.map(item=>item.name).join(',')}}
				</view>
				<!-- #ifndef H5 -->
				<view class="download" @click="musicSrcLoad">
					{{musicInfo == null?'无音源！':'下载音乐'}}
				</view>
				<!-- #endif -->
				
			</view>
			<view class="lovehand">
				<view class="handImg">
					<image src="/static/image/hand.png" class="img" ></image>
				</view>
			</view>
		</view>
		<view class="lrc-box">
			<view class="msg"></view>
			<view class="text-box" :style="{ transform: 'translateY(-' + sec * 100 + 'upx)' }">
				<view class="lrc-item" v-for="index in ['a1','a2']" :key="index" />
				<view class="lrc-item" v-if="lrclist == null">
					<text>请先选择音乐！</text>
				</view>
				<view class="lrc-item" v-else-if="lrclist.length == 0">
					<text>歌词加载中...</text>
				</view>
				<view v-else :style="{'color':lrcTime >= item.lrc_sec ?'pink':'#eee'}" class="lrc-item" v-for="(item, index) in lrclist" :key="index">
					<text>{{ item.lrc ||  item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {
			sec: 0
		};
	},
	watch: {
		lrcTime(val) {
			if(val == 0) this.sec = 0
			this.lrclist.forEach((item,index)=>{
				if(--index<0){
					index = 0
				}
				if(item.lrc_sec == val && this.lrclist[index].lrc_sec < val){
					this.sec = ++index
				}
			})
		}
	},
	methods:{
		musicSrcLoad(){
				if(this.musicSrc){
					let url = this.musicSrc.replace(/http:\/\//, 'https://');
					console.log(url,8788)
					uni.downloadFile({
						url,
						success:res =>{
							if (res.statusCode === 200) {
								console.log(res)
								uni.saveFile({
								  tempFilePath: res.tempFilePath,
								  success: function (ress) {
									uni.showToast({
										title: '音乐下载成功',
									});	
									console.log(ress)
								  },
								  fail:()=>{
								  	uni.showToast({
								  		title: '音乐下载失败',
								  		icon:'none'
								  	});
								  }
								});
							}
							
						},
						fail:()=>{
							uni.showToast({
								title: '音乐下载失败',
								icon:'none'
							});
						}
					})
				}else{
					uni.showToast({
					    title: '请先选择音乐',
						icon:"none"
					});
				}
		}
	},
	computed: {
		...mapGetters(['lrclist', 'lrcTime','musicInfo','musicSrc'])
	}
};
</script>

<style scoped lang="scss">
.lyric {
	color: #eeeeee;
	.lrc-box {
		width: 100%;
		height: 500upx;
		text-align: center;
		overflow-y: hidden;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -120%);
	}
	.text-box {
		transition: all 0.5s;
		padding: 0 80upx;
	}
	.lrc-item {
		display: flex;
		height: 100upx;
		flex-direction: column;
		justify-content: center;
	}
	.msg {
		width: 100%;
		height: 100upx;
		position: absolute;
		top: 200upx;
		background: rgba(116, 241, 195, 0.28);
	}
	.musicInfo{
		width: 100%;
		height: 300upx;
		text-align: center;
		position: absolute;
		top: -1000upx;
		left: 50%;
		transform: translate(-50%, 0%);
		.musicImg{
			width: 30%;
			height: 225upx;
			margin: 30upx 0 0 40upx;
			border-radius: 50%;
			overflow: hidden;
		}
		.info{
			width: 50%;
			margin: 30upx 30upx 0 ;
			height: 100%;
			position: relative;
		}
		.user{
			margin-top: 10upx;
			font-size: 20upx;
		}
		.name{
			font-size: 30upx;
		}
		.download{
			position: absolute;
			bottom: 30upx;
			background: #ff0000;
			width: 80%;
			right: 20upx;
			line-height: 70upx;
			border-radius: 10upx;
		}
	}
	.lovehand{
		width: 300upx;
		height: 300upx;
		position: absolute;
		animation: 8s rautoZ infinite alternate linear;
		right: 20upx;
		bottom: -270upx;
	}
	.handImg{
		width: 60upx;
		height: 60upx;
		margin: 0 auto;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
}
@keyframes rautoZ{
  0% {transform:rotateZ(30deg)}
   50% {transform:rotateZ(-30deg)}
   100% {transform:rotateZ(30deg)}
}
</style>
