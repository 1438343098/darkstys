<template>
	<view class="content">
		<Nav title="叫啥好呢" :show="showHead" />
		<view v-if="hasLogin" class="hello">
			<view class="title">您好 来自{{ city }}的 {{ userName }}，您已成功登录。</view>
			<view class="ul">
				<view>这是首页。</view>
				<view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
			</view>
		</view>
		<view class="todo" v-else>
			<view class="one" @click="goIndex">
				<image src="/static/image/start.jpg" class="imgBg" />
				<view class="titles">
					<text class="texts">darkSky</text>
					<button class="button" type="primary">
						<text class="upt">融</text>
						<text class="upt">入</text>
						<text class="upt">夜</text>
						<text class="upt">空</text>
					</button>
				</view>
			</view>
			<view v-show="re" class="two">
				<view class="hello2">
					<view class="title">您好 游客。</view>
					<view class="ul">
						<view>这是首页。</view>
						<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Nav from 'components/uni-nav-bar/uni-nav-bar.vue';
import { mapState } from 'vuex';

export default {
	components: { Nav },
	computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'city']),
	onLoad() {
		uni.hideTabBar();
		this.showHead = false;
	},
	data() {
		return {
			showHead: false,
			re: false
		};
	},
	methods: {
		// 进入首页
		goIndex() {
			console.log(5555);
			this.re = true;
		}
	},
	watch: {
		re: function(val) {
			if (!val) {
				uni.hideTabBar();
			} else {
				
				setTimeout(() => {
					uni.showTabBar();
					this.showHead = true;
					if (!this.hasLogin) {
						uni.showModal({
							title: '未登录',
							content: '您未登录，需要登录后才能继续',
							/**
							 * 如果需要强制登录，不显示取消按钮
							 */
							showCancel: !this.forcedLogin,
							success: res => {
								if (res.confirm) {
									/**
									 * 如果需要强制登录，使用reLaunch方式
									 */
									if (this.forcedLogin) {
										uni.reLaunch({
											url: '../login/login'
										});
									} else {
										uni.navigateTo({
											url: '../login/login'
										});
									}
								}
							}
						});
					}
				}, 1600);
			}
		}
	}

};
</script>

<style lang="scss" scoped>
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
	padding-top: 100upx;
}
.hello2 {
	position: absolute;
	overflow: hidden;
	top: -700upx;
	left: 375upx;
	width: 750upx;
	background: linear-gradient(#c07da4, #477497);
	height: 100vh;
	animation: img 4s both;
	padding-top: 100upx;
}
.title {

	margin-top: 50upx;
}

.ul {
	font-size: 30upx;

	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
}


// 样式
.todo {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	overflow: hidden;
	.titles {
		position: absolute;
		z-index: 10;
		background: transparent;
		top: 50%;
		left: 50%;
		height: 700upx;
		transform: translate(-50%, -50%);
	}
	.button {
		position: absolute;
		bottom: 0;
		background: transparent;
		text-align: center;
		left: 50%;
		border: 0;
		width: 240upx;
		transform: translateX(-50%);
	}
	.texts {
		font-family: 'Times New Roman', Times, serif;
		color: rgba(160, 137, 137, 0.8);
		font-size: 80upx;
		letter-spacing: 2upx;
	}

	.one {
		position: absolute;
		top: 0;
		left: 0upx;
		width: 100%;
		height: 100%;
		z-index: 10;
		overflow: hidden;
	}
	.two {
		position: absolute;
		top: 0;
		overflow: hidden;
		left: 0upx;
		width: 100%;
		height: 100%;
		z-index: 11;
		animation: imgdiv 4s both;
	}
	.upt {
		display: inline-block;
		transform: translateY(20upx);
	}
	.upt:nth-child(1) {
		animation: upts 5s infinite;
	}
	.upt:nth-child(2) {
		animation: upts 5s infinite 0.5s;
	}
	.upt:nth-child(3) {
		animation: upts 5s infinite 1s;
	}
	.upt:nth-child(4) {
		animation: upts 5s infinite 1.5s;
	}
}

.imgBg {
	width: 200%;
	height: 100%;
	animation: gor 30s linear infinite;
	position: fixed;
}
@keyframes gor {
	0% {
		transform: translateX(0);
	}
	50% {
		transform: translateX(-50%);
	}
	100% {
		transform: translateX(0%);
	}
}
@keyframes upts {
	0% {
		transform: translateY(20upx);
	}
	50% {
		transform: translateY(-20upx);
	}
	100% {
		transform: translateY(20upx);
	}
}
@keyframes imgdiv {
	0% {
		width: 0;
		height: 0;
		left: 375upx;
		top: 700upx;
		border-radius: 0;
	}
	100% {
		width: 2500upx;
		height: 2500upx;
		left: -750upx;
		top: -650upx;
		border-radius: 1250upx;
	}
}
@keyframes img {
	0% {
		left: -375upx;
		top: -700upx;
	}
	100% {
		left: 750upx;
		top: 650upx;
	}
}
</style>
