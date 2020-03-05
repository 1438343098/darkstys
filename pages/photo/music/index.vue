<template>
	<view class="index">
		<uni-popup ref="popup" class="typeStatus" type="top">
			<view class="typelist">
				<text >全部</text> <text class='type' @click="search('全部')">全部</text>
			</view>
			<view class="typelist" v-for="(value,key) in catlist.categories" :key='key'>
				<view class="title">
					{{value}}
				</view>
				<view class='type' @click="search(item.name)" v-if='item.category == key' :key="index" v-for="(item,index) in catlist.sub" >{{item.name}}</view> 
			</view>
		</uni-popup>
		<view class="musicList">
			<view class="types">
				<text>歌单类型 :</text> 
				<text class='type'  @click="$refs.popup.open()">{{cat}}</text> 
			</view>
			<view class="musicBox">
				<view 
				class="musicItem"
				@click="goInfo(item.id)"
				 v-bind:style="{ backgroundImage: 'url('+httpsurl(item.coverImgUrl)+')' }" 
				v-for="(item,index) in listInfo" 
				:key='index'>
					<view class="play" @click.stop='playListMusic(item.id)'>
						<Icon  type="&#xe647;" size="34" color="#009413" />
					</view>
					<view class="text" >
						{{item.name}}
					</view>
					<view class="by">
						by:{{item.creator.nickname}}
					</view>
				</view>
			</view>
			
		</view>
		
		<FooterMusic />
		<Top ref='top' />
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import { mapGetters,mapActions ,mapMutations} from 'vuex'
	import {getMusicListInfo,getMusicList,getMusicListCatlist} from "@/api/photo.js"
	export default{
		components: {uniPopup},
		data(){
			return{
				page:0,
				limit:10,
				cat:'全部',
				listInfo:[],
				tempList:[],
				imgName:'',
				catlist:{}
			}
			
		},
		computed:{
			...mapGetters(['songList',"musicIndex"])
		},
		onLoad(){
			
				this.getMusicListInfos()
				this.getMusicListCatlists()
		},
		methods:{
			...mapMutations("audio",["SETGLOBALDATA"]),
			...mapActions('audio',['update']),
			// 获取类型
			getMusicListCatlists(){
				getMusicListCatlist().then(res=>{
					this.catlist = res
				})
			},
			// 去列表
			goInfo(id){
				uni.navigateTo(
					{url:'/pages/photo/music/musiclist?id='+id}
				)
			},
			// 直接播放列表
			playListMusic(id){
				getMusicList({id,offset:0,limit:100}).then(res=>{
					let list = []
					list = res.playlist.tracks.map(item=>{
							return {
								id:item.id,
								br:item.m?item.m.br:item.l.br,
								name:item.name,
								auth:item.ar.map(item=>item.name)
							}
					})
					this.SETGLOBALDATA({key:'songList',value:list})
					this.update(0)
				})
			},
			// 格式图片
			httpsurl(url){
				return url.replace(/http:\/\//, 'https://');
			},
			// 获取歌单
			getMusicListInfos(){
				uni.showLoading({
				    title: '歌单加载中...'
				});
				getMusicListInfo({
					offset:this.page*this.limit,
					limit:this.limit,
					type:this.cat
				}).then(res=>{
					this.tempList = res.playlists
					this.listInfo = this.listInfo.concat(res.playlists)
					uni.hideLoading()
				}).catch(()=>{
					uni.hideLoading()
				})
			},
			// 搜索类型
			search(type){
				this.cat = type
				this.getMusicListInfos()
				this.$refs.popup.close()
				this.$refs.top.tops()
			}
		},
		// 上拉加载
		onReachBottom() {
			if (this.tempList.length < this.limit) {
				return
			}
			this.page++
			this.getMusicListInfos()
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		height: 100%;
		width: 100%;
	}
	.types{
		position: fixed;
		top: 88upx;
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 0;
		/* #endif */
		left: 0upx;
		right: 0;
		z-index: 10;
		background: #f8f8f8;
		display: flex;
		justify-content: flex-start;
		padding: 40upx;
		
	}
	.type{
		font-size: 24upx;
		border: 1upx solid pink;
		border-radius: 15upx;
		padding: 0 20upx ;
		width: 100upx;
		color:#a905df;
		text-align: center;
		margin-left: 40upx;
	}
	.typeStatus{
		color:#f8f8f8;
		.typelist{
			padding: 10upx 0 10upx 14upx;
			width: 100%;
		}
		.type{
			width: auto;
			color:#f8f8f8;
			margin:4upx 20upx;
			display: inline-block;
		}
	}
	.musicBox{
		padding-top: 120upx;
		padding-bottom: 18%;
	}
	.musicItem{
		height: 150upx;
		margin-bottom: 20upx;
		background-size: cover;
		position: relative;
		
		animation:ups 60s infinite linear;
		background-repeat: no-repeat;
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
			color:#b5b5b5;
			bottom: 15upx;
		}
		.play{
			position: absolute;
			left: 10upx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	@keyframes ups{
		0%{background-position-y:0%;}
		50%{background-position-y:100%;}
		100%{background-position-y:0%;}
	}
</style>
