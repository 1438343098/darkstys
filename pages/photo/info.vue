<template>
	<view class="index">
		详情
	</view>
</template>

<script>
	import {getPhotoInfo,getPhotoList} from "@/api/photo.js"
	export default{
		data(){
			return{
			}
			
		},
		onLoad(){
			this.getPhotoLists('图片')
		},
		methods:{
		  async getPhotoLists(type,text=""){
			  let data = (await getPhotoList({page:this.page,"text":text})).data
			  if(type){	  
				  this.newList = data.data.result
				  this.list = this.list.concat(this.newList)
				  return
			  }
			  this.list = data.data.result
		  },
		}
	}
</script>

<style lang="scss" scoped>

</style>
