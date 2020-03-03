<template>
	<view class="footermusic">
		<view class="control">
		<view class="pl"  @click="pop('lyric')">
			<Icon type="&#xe602;" size="20" color="#0000ff" />
		</view>
		<view class="left" @click="PREV">
			<Icon  type="&#xe64d;" size="30" color="#5d60ff" />
		</view>
		<view class="play" @click="plays">
			<Icon  :type="audio.paused?'&#xe647;':'&#xe64a;'" size="34" color="#00aaff" />
		</view>
		<view class="right" @click="UPDATE">
			<Icon   type="&#xe648;" size="30" color="#5d60ff" />
		</view>
		<view class="list"  @click="pop('comments')">
			<Icon  type="&#xe612;" size="30" color="#0000ff" />
		</view>
		
			
		</view>
		<uni-popup ref="popuplyric" type="bottom">
			这是歌词
			<view class="close" @click="$refs.popuplyric.close()">
				<Icon class="jiantou" type="&#xe632;" size="20" color="#ff007f" />
			</view>
		</uni-popup>
		<uni-popup ref="popupcomments" type="bottom">
			这是评论
			<view class="close" @click="$refs.popupcomments.close()">
				<Icon class="jiantou" type="&#xe632;" size="20" color="#ff007f" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "./uni-popup.vue"
	import { mapGetters,mapActions,mapMutations } from 'vuex'
	import {getMusicComments,getMusicLyric} from "@/api/photo.js"
	export default{
		 components: {uniPopup},
		methods:{
			...mapActions("audio",['play','pause']),
			...mapMutations("audio",['PREV',"UPDATE"]),
			plays(){
				if(this.audio.paused){
					this.play()
				}else{
					this.pause()
				}
			},
			// 底部
			pop(type){
				if(type == 'lyric'){
					console.log(555)
					this.$refs.popupcomments.close()
					this.$refs.popuplyric.open()
				}else{
					this.$refs.popupcomments.open()
					this.$refs.popuplyric.close()
				}
			}
		},
		computed:{
			...mapGetters(["audio"]),
		}
		
	}
</script>

<style lang="less" scoped>
	.control{
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-top: 1px solid #ccc;
		background: #ffd2ed;
		position: fixed;
		height: 10%;
		bottom: 0;
		width: 100%;
		.control>view{
			flex: auto;
			display: flex;
			height: 100%;
			justify-content: center;
			align-items: center;
		}
	
	}
	.close{
		position: absolute;
		bottom: 20upx;
		width: 40upx;
		height: 40upx;
		right: 40upx;
	}
	.jiantou{
		display: inline-block;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-60%,-60%) rotate(-90deg);
	}
</style>
