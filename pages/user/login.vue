<template>
	<view class="todo">
		<view class="lo_hd"><Icon type="&#xe74d;" size="50" color="#00355f" /></view>
		<view class="inputs">
			<text class="lo_text">ID号:</text>
			<input class="input_end" placeholder-style="color:#00355f" v-model="account" placeholder="请输入账号" />
		</view>
		<view class="inputs">
			<text class="lo_text">密码:</text>
			<input class="input_end" placeholder-style="color:#00355f" v-model="password" type="password" placeholder="请输入密码" />
		</view>
		<view class="lo_btn"><button class="login" @click="bindLogin">登录</button></view>
		<view class="action-row">
			<navigator url="/pages/user/reg">注册账号</navigator>
			<navigator url="/pages/user/pwd">忘记密码</navigator>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{ top: positionTop + 'px' }">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value"><image class="imgs" :src="provider.image" @tap="oauth(provider.value)"></image></view>
		</view>
	</view>
</template>

<script>
import service from 'service.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			providerList: [],
			hasProvider: true,
			account: '',
			password: '',
			positionTop: 0
		};
	},
	methods: {
		...mapMutations('user',['login', 'addCity']),
		initProvider() {
			const filters = ['weixin', 'qq', 'sinaweibo'];
			uni.getProvider({
				service: 'oauth',
				success: res => {
					if (res.provider && res.provider.length) {
						for (let i = 0; i < res.provider.length; i++) {
							if (~filters.indexOf(res.provider[i])) {
								this.providerList.push({
									value: res.provider[i],
									image: '/static/img/' + res.provider[i] + '.png'
								});
							}
						}
						this.hasProvider = true;
					}
				},
				fail: err => {
					console.error('获取服务供应商失败：' + JSON.stringify(err));
				}
			});
		},
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		bindLogin() {
			/**
			 * 客户端对账号信息进行一些必要的校验。
			 * 实际开发中，根据业务需要进行处理，这里仅做示例。
			 */
			if (this.account.length < 5) {
				uni.showToast({
					icon: 'none',
					title: '账号最短为 5 个字符'
				});
				return;
			}
			if (this.password.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '密码最短为 6 个字符'
				});
				return;
			}
			/**
			 * 下面简单模拟下服务端的处理
			 * 检测用户账号密码是否在已注册的用户列表中
			 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
			 */
			const data = {
				account: this.account,
				password: this.password
			};
			const validUser = service.getUsers().some(function(user) {
				return data.account === user.account && data.password === user.password;
			});
			if (validUser) {
				this.toMain(this.account);
			} else {
				uni.showToast({
					icon: 'none',
					title: '用户账号或密码不正确'
				});
			}
		},
		oauth(value) {
			uni.login({
				provider: value,
				success: res => {
					uni.getUserInfo({
						provider: value,
						success: infoRes => {
							/**
							 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
							 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
							 */
							this.toMain(infoRes.userInfo.nickName);
							if (typeof infoRes.userInfo.status != 'undefined') {
								this.addCity(infoRes.userInfo.status.annotations[0].place.title);
							} else {
								this.addCity(infoRes.userInfo.city);
							}
						}
					});
				},
				fail: err => {
					console.error('授权登录失败：' + JSON.stringify(err));
				}
			});
		},
		toMain(userName) {
			this.login(userName);
			
			uni.navigateBack();
			
		}
	},
	onReady() {
		this.initPosition();
		this.initProvider();
	}
};
</script>

<style lang="scss" scoped>
.iconfont {
	color: #00355f;
}
.imgs {
	width: 60%;
	height: 60%;
}

.todo {
	width: 100%;
	height: 100%;
	background: #ffdcf7;
	.lo_hd {
		text-align: center;
		padding-top: 200upx;
	}
	.login {
		background: #a990cc;
		color: #00355f;
	}
	.inputs {
		margin: 30upx 60upx;
		margin-top: 50upx;
		border-bottom: 1upx solid #00355f;
		color: #00355f;
		padding-bottom: 20upx;
	}
	.lo_btn {
		margin: 30upx 60upx;
		margin-top: 70upx;
	}
	.lo_text {
		font-size: 30upx;
		display: inline-block;
		line-height: 80upx;
	}
	.input_end {
		display: inline-block;
		line-height: 80upx;
		height: 80upx;
		vertical-align: top;
		padding-left: 20upx;
	}
}
.oauth-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}

.oauth-image {
	width: 100upx;
	height: 100upx;
	border-radius: 100upx;
	margin: 0 40upx;
	border: 1px solid #00355f;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #477497;
}
.action-row {
	display: flex;
	margin: 0 40upx;
	color: #00355f;
	justify-content: space-between;
}
</style>
