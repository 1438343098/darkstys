<template>
	<view class="footermusic">
		<view class="control">
		<view class="pl"  @click="pop('lyric')">
			<Icon type="&#xe602;" size="20" color="#0000ff" />
		</view>
		<view class="left" @click="prev()">
			<Icon  type="&#xe64d;" size="30" color="#5d60ff" />
		</view>
		<view class="play" @click="plays">
			<Icon  :type="musicPaused?'&#xe647;':'&#xe64a;'" size="34" color="#00aaff" />
		</view>
		<view class="right" @click="update()">
			<Icon   type="&#xe648;" size="30" color="#5d60ff" />
		</view>
		<view class="list"  @click="pop('comments')">
			<Icon  type="&#xe612;" size="30" color="#0000ff" />
		</view>
		
			
		</view>
		<myPopup ref="popuplyric" type="bottom">
			<Lyric />
			<view class="close" @click="$refs.popuplyric.close()">
				<Icon class="jiantou" type="&#xe632;" size="20" color="#ff007f" />
			</view>
		</myPopup>
		<myPopup ref="popupcomments" type="bottom">
			<Comments />
			<view class="close" @click="$refs.popupcomments.close()">
				<Icon class="jiantou" type="&#xe632;" size="20" color="#ff007f" />
			</view>
		</myPopup>
	</view>
</template>

<script>
	import myPopup from "./uni-popup.vue"
	import Lyric from './musicComponents/Lyric.vue'
	import Comments from './musicComponents/Comments.vue'
	import { mapGetters,mapActions,mapMutations } from 'vuex'
	
	export default{
		 components: {myPopup,Comments,Lyric},
		methods:{
			...mapActions("audio",['play','pause','prev','update']),
			plays(){
				if(this.musicPaused){
					if(this.audio.src){
						this.play()
					}
				}else{
					this.pause()
				}
			},
			// 底部
			pop(type){
				if(type == 'lyric'){
					this.$refs.popupcomments.close()
					this.$refs.popuplyric.open()
				}else{
					this.$refs.popupcomments.open()
					this.$refs.popuplyric.close()
				}
			}
		},
		computed:{
			...mapGetters(["musicPaused",'audio']),
		}
		
	}
</script>

<style lang="scss" scoped>
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
