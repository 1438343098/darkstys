<template>
	<view class="index">
		<view class="title ac">{{ data.item.title }}</view>
		<view class="ups">
			up主:
			<text class="up" :style="{ color: '#' + id.substr(0, 6) }">{{ data.user.name }}</text>
		</view>
		<view class="info">{{ data.item.description }}</view>
		<view class="imglist ac" v-for="(item, index) in data.item.pictures" :key="index">
			<image @longpress="downloadImg(item.img_src,data.item.title)" mode="widthFix" :src="item.img_src"></image>
		</view>
		<Top />
	</view>
</template>

<script>
import downloader from '@/js_sdk/img-downloader.js';
import { getPhotoInfo } from '@/api/photo.js';
export default {
	data() {
		return {
			id: '',
			data: { item: { pictures: [], description: '', title: '' }, user: { name: '' } }
		};
	},
	onLoad(data) {
		this.id = data.id;
		console.log(data, 888);
		this.getData();
	},
	methods: {
		getData() {
			getPhotoInfo({ doc_id: this.id }).then(res => {
				this.data = res.data;
			});
		},
		downloadImg(url,name) {
			url = url.replace(/http:\/\//, 'https://');
			downloader.load(url, 'bilibili' + name).then(([err, res]) => {
				//下载结果
				console.log(err, res); // err 和 res 只会有一个存在，另一个为null
				if (res) {
					uni.showToast({
						title: '图片已保存',
						duration: 2000
					});
					return;
				}
				// #ifdef MP-WEIXIN
				if (err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' || err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
					// 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
					wx.showModal({
						title: '提示',
						content: '需要您授权保存相册',
						showCancel: false,
						success: modalSuccess => {
							wx.openSetting({
								success(settingdata) {
									console.log('settingdata', settingdata);
									if (settingdata.authSetting['scope.writePhotosAlbum']) {
										wx.showModal({
											title: '提示',
											content: '获取权限成功,再次点击图片即可保存',
											showCancel: false
										});
									} else {
										wx.showModal({
											title: '提示',
											content: '获取权限失败，将无法保存到相册哦~',
											showCancel: false
										});
									}
								},
								fail(failData) {
									console.log('failData', failData);
								},
								complete(finishData) {
									console.log('finishData', finishData);
								}
							});
						}
					});
				}
				// #endif
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.index {
	padding: 40upx;

	.ups {
		font-size: 20upx;
		margin: 10upx 0;
	}
	.info {
		color: pink;
		margin: 20upx 0;
		font-size: 26upx;
	}
	.imglist {
		width: 100%;
		padding: 10upx 0;
		box-sizing: border-box;
	}
}
</style>
