<template>
	<view class="index">
		<view @click="palys">
			播放
		</view>
		<br/>
		<br/>
		<br/>
		<view @click="pauses">
			暂停
		</view>
<!-- 		<music-global /> -->
	</view>
</template>

<script>
	import { mapGetters,mapActions ,mapMutations} from 'vuex'
	import {getMusicListInfo,getPlayUrl} from "@/api/photo.js"
	export default{
		data(){
			return{
				page:1,
				list:[],
				newList:[],
				imgName:''
			}
			
		},
		computed:{
			...mapGetters(['openAudio','songList'])
		},
		onLoad(){
			console.log(this.songList)
			if(this.songList.length == 0){
				let list = []
				getMusicListInfo().then(res=>{
					
					list = res.result.map(item=>{
							return {
								id:item.id,
								br:item.song.bMusic.bitrate
							}
					})
					this.SETGLOBALDATA({key:'songList',value:list})
				})
			}
			
		},
		methods:{
			...mapMutations("audio",["SETGLOBALDATA"]),
			...mapActions('audio',['play','pause']),
			palys(){
				this.play()
			},
			pauses(){
				this.pause()
			}
		}
	}
</script>

<style lang="scss" scoped>
.btns{
	width: 20%;
	line-height: 60upx;
	border-radius: 0 4upx 4upx 0;
	background-color: #eccfec;
}
.inputs{
	width: 80%;
	height: 100%;
	line-height: 60upx;
	border:#007AFF 1px solid;
	box-sizing: border-box;
	
}
.search{
	position: fixed;
	top: 150upx;
	left: 40upx;
	right: 40upx;
	height: 60upx;
	display: flex;
	z-index: 20;
}
	.imgItem{
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		.img{
			text-align: center;
			position: relative;
			margin-bottom:40upx ;
		}
		
		.count{
			width: 40upx;
			background: rgba(0,0,0,.3);
			color: #fff;
			position: absolute;
			right: 50%;
			transform: translateX(50%);
			bottom: 20upx;
			height: 40upx;
			line-height: 40upx;
			border-radius: 50%;
			font-size: 10upx;
		}
	}
	// .keyword{}
	.index{
		margin-bottom: 150upx;
	}
</style>
