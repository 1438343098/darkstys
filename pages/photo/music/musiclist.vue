<template>
	<view class="index">
		<view class="ofh">
			<view class="alt" v-bind:style="{ backgroundImage: 'url('+coverImgUrl+')' }" >
			</view>
			<view class="imgs fl" v-bind:style="{ backgroundImage: 'url('+coverImgUrl+')' }">
			</view>
			<view class="title  fr" >
			{{listInfo.name}}
			</view>
			<view class="user fr" >
				<text class='userlog' v-bind:style="{ backgroundImage: 'url('+listInfo.creator.avatarUrl.replace(/http:\/\//, 'https://')+')' }"></text>
				<text>{{listInfo.creator.nickname}}</text>
			</view>
		</view>
		<view class="info"  :class="showInfo?'all':'mini'">
			<text >标签：{{listInfo.tags.join(' ')}}</text>
			<text >{{listInfo.description}}</text>
			<Icon :class="showInfo?'up':'dowm'" @click='sldes' class="jiantou" type="&#xe632;" size="15" color="#ccc" />
		</view>
		<view class="musicList">
			<view class="all"  @click="playItem(0)">
				<button type="warn">播放全部</button> 
			</view>
			
			<view class="musicItem" @click="playItem(index)" v-for="(item,index) in listInfo.tracks" :key='index'>
				<view class="play"  >
					<image :src="item.al.picUrl.replace(/http:\/\//, 'https://')" mode="widthFix"></image>
				</view>
				<view class="text" >
					{{item.name}}
				</view>
				<view class="by">
					<text :key='keys' v-for="(user,keys) in item.ar">
						{{user.name}}
					</text>
				</view>
			</view>
		</view>
		<Top ref='top' />
		<footer-music />
	</view>
</template>

<script>
	import { mapGetters,mapActions ,mapMutations} from 'vuex'
	import {getMusicList} from "@/api/photo.js"
	export default{
		data(){
			return{
				page:0,
				limit:1,
				listInfo:{
					name:'',
				creator:{avatarUrl:'',nickname:''},
				tags:[],
				description:'',
				tracks:[]
				},
				id:'',
				coverImgUrl:"",
				showInfo:false
			}
			
		},
		computed:{
			...mapGetters(['songList',"musicIndex"])
		},
		onLoad(id){
			uni.showLoading({
			    title: '加载中'
			});
			this.id = id.id
			getMusicList({id:this.id,offset:0,limit:0}).then(res=>{
				this.limit = res.playlist.trackIds.length
				this.getData()	
			})
		},
		methods:{
			...mapMutations("audio",["SETGLOBALDATA"]),
			...mapActions('audio',['play','pause','update']),
			getData(){
				getMusicList({id:this.id,offset:this.page,limit:this.limit}).then(res=>{
					this.listInfo = res.playlist
					this.coverImgUrl = this.listInfo.coverImgUrl.replace(/http:\/\//, 'https://')
					uni.hideLoading()
				}).catch(()=>{
					uni.hideLoading()
				})
			},
			// 控制描述
			sldes(){
				this.showInfo = !this.showInfo
			},
			// 播放音乐
			playItem(index){
				let list = []
				list = this.listInfo.tracks.map(item=>{
						return {
							id:item.id,
							br:item.m?item.m.br:item.l.br,
							name:item.name,
							auth:item.ar.map(item=>item.name)
						}
				})
				this.SETGLOBALDATA({key:'songList',value:list})
				this.update(index)
			},
			
		},
	}
</script>

<style lang="scss" scoped>
.index{
	padding-bottom: 18%;
}
.alt{
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	filter: blur(40upx);
	height: 320upx;
	box-sizing: border-box;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 0;
}
.imgs{
	width: 260upx;
	height: 260upx;
	background-repeat: no-repeat;
	background-size: cover;
	margin: 40upx;
	position: relative;
	z-index: 1;
	box-sizing: border-box;
}
.title{
	margin: 40upx 10upx 0upx 0;
	width: 400upx;
	position: relative;
	z-index: 1;
	}
	.user{
		position: relative;
		z-index: 1;
		width: 400upx;
		margin-top: 40upx;
		.userlog{
			background-repeat: no-repeat;
			background-size: cover;
			display: inline-block;
			vertical-align: middle;
			margin-right: 30upx;
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			
		}
	}
	
	.info{
		padding:20upx 40upx;
		
		overflow: hidden;
		display: flex;
		position: relative;
		flex-wrap: wrap;
		transition: all .5s linear;
		.jiantou{
			transition: all .5s linear;
			position: absolute;
			right: 20upx;
			bottom: 20upx;
		}
		.dowm{
			transform: rotate(-90deg);
		}
		
		.up{
			transform: rotate(90deg);
		}
		
	}
	.all{
		height: audo;
	}
	.mini{
		height: 150upx;
	}
	.musicList{
		padding: 40upx;
		.all{
			margin-bottom: 20upx;
		}
	}
	.musicItem{
		height: 100upx;
		margin-bottom: 20upx;
		position: relative;
		.text{
			width: 100%;
			background: rgba(0,0,0,.3);
			color:#f8f8f8;
			height:100%;
			padding-left: 100upx;
			padding-right: 40upx;
			box-sizing: border-box;
			padding-top: 20upx;
		}
		.by{
	
			    position: absolute;
			    right: 40upx;
			    color: #505050;
			    font-size: 20upx;
			    width: 190upx;
			    bottom: 8upx;
			    white-space: nowrap;
			    overflow: hidden;
			    text-align: right;
			    text-overflow: ellipsis;
		}
		.play{
			position: absolute;
			left: 10upx;
			top: 50%;
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			transform: translateY(-50%);
			overflow: hidden;
		}
	}
</style>
