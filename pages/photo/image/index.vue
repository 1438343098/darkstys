<template>
	<view class="index">
		<view class="search">
			<input class="inputs" type="text" @input="onKeyInput" placeholder="图片搜索" />
			<button class="btns" @click="search">
				<Icon class="jiantou" type="&#xe64b;" size="20" color="#fff" />
				
			</button>
		</view>
		<view class="imgList">
			<view class="imgItem" @click="toInfo(item)" v-for="(item, index) in list" :key="index">
				<view class="img">
					<!-- <image mode="widthFix" @longpress="downloadImg(item.cover,item.uname)" :src="item.cover"></image> -->
					<image mode="widthFix"  :src="item.cover.replace(/http:\/\//, 'https://')"></image>
					<view class="count">{{ item.count }}</view>
				</view>
				<view class="info ac">
					<view class="title"><rich-text :nodes="item.title"></rich-text></view>
					<view class="name">{{ item.uname }}</view>
				</view>
			</view>
			<Top ref='top' />
		</view>
	</view>
</template>

<script>
import { getPhotoInfo, getPhotoList } from '@/api/photo.js';
import downloader from '@/js_sdk/img-downloader.js';
export default {
	data() {
		return {
			page: 1,
			list: [],
			newList: [],
			imgName: ''
		};
	},
	onLoad() {
		this.getPhotoLists('图片');
	},
	methods: {
		async getPhotoLists(type, text = '') {
			let data = (await getPhotoList({ page: this.page, text: text })).data;
			if (type) {
				this.newList = data.result;
				this.list = this.list.concat(this.newList);
				return;
			}
			this.list = data.result;
		},
		// 搜索
		search() {
			this.getPhotoLists(false, this.imgName);
			this.$refs.top.tops()
		},
		onKeyInput(event) {
			this.imgName = event.target.value;
		},
		// 详情
		toInfo(item) {
			uni.navigateTo({
				url: `/pages/photo/image/info?id=${item.id}`
			});
		},

	},

	// 上拉加载
	onReachBottom() {
		if (this.newList.length < 20) {
			return;
		}
		this.page++;
		this.getPhotoLists(true);
	}
};
</script>

<style lang="scss" scoped>
.index {
	padding: 20upx;
}
.btns {
	width: 20%;
	line-height: 80upx;
	background-color: #ff007f;
	border-radius: 0;
	&:after {
		border: 0;
	}
}
.inputs {
	width: 80%;
	height: 100%;
	padding-left: 40upx;
	line-height: 80upx;
	box-sizing: border-box;
}
.title {
	font-size: 12upx;
}
.name {
	font-size: 14upx;
}
.imgList {
	margin-top: 60upx;
}
.search {
	position: fixed;
	top: 88upx;
	/* #ifdef APP-PLUS */
	top: 0;
	/* #endif */
	/* #ifdef MP-WEIXIN */
	top: 0;
	/* #endif */
	left: 0upx;
	background: rgba(99, 183, 238, 0.5);
	right: 0upx;
	height: 80upx;
	display: flex;
	z-index: 20;
}
.imgItem {
	width: 100%;
	margin-top: 80upx;
	box-sizing: border-box;
	.img {
		text-align: center;
		position: relative;
		margin-bottom: 20upx;
	}

	.count {
		width: 40upx;
		background: rgba(0, 0, 0, 0.3);
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
</style>
