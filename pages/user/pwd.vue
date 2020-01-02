<template>
	<view class="todo">
		<view class="lo_hd"><Icon type="&#xe74d;" size="50" color="#00355f" /></view>
		<view class="inputs">
			<text class="lo_text">邮箱：</text>
			<input class="input_end" placeholder-style="color:#00355f" v-model="email" type="text" placeholder="请输入邮箱号码" />
		</view>
		<view class="lo_btn"><button class="login" @click="findPassword">提交</button></view>
		<view class="action-row">
			<navigator url="../user/reg">注册账号</navigator>
			<navigator url="../user/login">立即登录</navigator>
		</view>
	</view>
</template>

<script>
	import Icon from 'components/common/Icon.vue';
import service from '../../service.js';
import mInput from '../../components/m-input.vue';

export default {
	components: {
		mInput,
		Icon
	},
	data() {
		return {
			email: ''
		};
	},
	methods: {
		findPassword() {
			/**
			 * 仅做示例
			 */
			if (this.email.length < 3 || !~this.email.indexOf('@')) {
				uni.showToast({
					icon: 'none',
					title: '邮箱地址不合法'
				});
				return;
			}
			uni.showToast({
				icon: 'none',
				title: '已发送重置邮件至注册邮箱，请注意查收。',
				duration: 3000
			});
		}
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
.action-row {
	display: flex;
	margin: 0 40upx;
	color: #00355f;
	justify-content: space-between;
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
</style>
