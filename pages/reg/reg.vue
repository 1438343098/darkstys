<template>
	<view class="todo">
		<view class="lo_hd"><Icon type="&#xe74d;" size='50' color='#00355f'/></view>
		<view class="inputs">
			<text class="lo_text">ID号:</text>
			<input class="input_end" placeholder-style="color:#00355f" v-model="account" placeholder="请输入账号"/>
		</view>
		<view class="inputs">
			<text class="lo_text">密码:</text>
			<input class="input_end" placeholder-style="color:#00355f" v-model="password" type="password" placeholder="请输入密码" />
		</view>
		<view class="inputs">
		    <text class="lo_text">邮箱：</text>
		    <input class="input_end" placeholder-style="color:#00355f" v-model="email" type="text" placeholder="请输入邮箱号码" />
		</view>
		<view class="lo_btn"><button class="login"  @click="register">注册</button></view>
	</view>	
</template>

<script>
    import service from '../../service.js';
	import Icon from 'components/common/Icon.vue'
    export default {
        components: {
            Icon
        },
        data() {
            return {
                account: '',
                password: '',
                email: ''
            }
        },
        methods: {
            register() {
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
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }

                const data = {
                    account: this.account,
                    password: this.password,
                    email: this.email
                }
                service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	.iconfont{
		color:#00355f;
	}
	.imgs{
		width:60%;
		height: 60%;
	}
	
.todo {
	width: 100%;
	background: linear-gradient(#b97d9f, #477497);
	.lo_hd {
		text-align: center;
		margin-top: 200upx;
	}
	.login{
		background: #a990cc;
		color:#00355f ;
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
		border:1px solid #00355F;
		display: flex;
		justify-content: center;
		align-items: center;
        background-color: #477497;
    }

</style>
