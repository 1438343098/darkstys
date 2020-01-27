<template>
	<view class="index">
		bilibil 相簿 
		<view class="search">
			<input class="inputs" type="text" @input="onKeyInput" placeholder="图片搜索" />
			<button class="btns" @click="search">搜索</button>
		</view>
		<view class="imgList">
			<view class="imgItem" v-for="(item,index) in list" :key='index'>
				<view class="img">
					<image mode='aspectFit' :src="item.cover" ></image>
					<view class="count">
						{{item.count}}
					</view>
				</view>
				<view class="info ac">
					<view class="title">
						<rich-text :nodes="item.title"></rich-text>
					</view>
					<view class="name">
						{{item.uname}}
					</view>
				</view>
			</view>
			<view class="imgItem">
				
			</view>
		</view>
	</view>
</template>

<script>
	import {getPhotoInfo,getPhotoList} from "@/api/photo.js"
	export default{
		data(){
			return{
				page:1,
				list:[],
				newList:[],
				imgName:''
			}
			
		},
		onLoad(){
			this.getPhotoLists('图片')
		},
		methods:{
		  async getPhotoLists(type,text=""){
			  let data = (await getPhotoList({page:this.page,"text":text})).data
			  if(type){	  
				  this.newList = data.result
				  this.list = this.list.concat(this.newList)
				  return
			  }
			  this.list = data.result
		  },
		  // 搜索
		  search(){
			  console.log("this.imgName: " + this.imgName);
			this.getPhotoLists(false,this.imgName)
		  },
		  onKeyInput(event) {
		        this.imgName = event.target.value
		    }
		},
		// 上拉加载
		onReachBottom() {
			if (this.newList.length < 20) {
				return
			}
			this.page++
			this.getPhotoLists(true)
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
