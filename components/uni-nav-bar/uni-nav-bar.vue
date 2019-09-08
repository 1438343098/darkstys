<template>
	<view class="uni-navbar" v-if="show" :class="{'uni-navbar-fixed':isFixed,'uni-navbar-shadow':hasShadow}" :style="{'background-color':backgroundColor}">
		<uni-status-bar v-if="insertStatusBar"></uni-status-bar>
		<view class="uni-navbar-header" :style="{color:color}">
			<view class="uni-navbar-container">
				<view v-if="title.length" class="uni-navbar-container-title">{{title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
    import uniStatusBar from '../uni-status-bar/uni-status-bar.vue'

    export default {
        components: {
            uniStatusBar,
        },
        props: {
            /**
             * 标题文字
             */
            title: {
                type: String,
                default: ''
            },/**
             * 是否出现
             */
            show: {
                type: Boolean,
                default: false
            },
            /**
             * 左侧按钮文本
             */
            leftText: {
                type: String,
                default: ''
            },
            /**
             * 右侧按钮文本
             */
            rightText: {
                type: String,
                default: ''
            },
            /**
             * 左侧按钮图标
             */
            leftIcon: {
                type: String,
                default: ''
            },
            /**
             * 右侧按钮图标
             */
            rightIcon: {
                type: String,
                default: ''
            },
            /**
             * 是否固定在顶部
             */
            fixed: {
                type: [Boolean, String],
                default: true
            },
            /**
             * 按钮图标和文字颜色
             */
            color: {
                type: String,
                default: '#fff'
            },
            /**
             * 背景颜色
             */
            backgroundColor: {
                type: String,
                default: '#b97d9f'
            },
            /**
             * 是否包含状态栏，默认固定在顶部时包含
             */
            statusBar: {
                type: [Boolean, String],
                default: true
            },
            /**
             * 是否使用阴影，默认根据背景色判断
             */
            shadow: {
                type: String,
                default: 'false'
            }
        },
        computed: {
            isFixed() {
                return String(this.fixed) === 'true'
            },
            insertStatusBar() {
                switch (String(this.statusBar)) {
                    case 'true':
                        return true
                    case 'false':
                        return false
                    default:
                        return this.isFixed
                }
            },
            hasShadow() {
                var backgroundColor = this.backgroundColor
                switch (String(this.shadow)) {
                    case 'true':
                        return true
                    case 'false':
                        return false
                    default:
                        return backgroundColor !== 'transparent' && backgroundColor.indexOf('rgba') < 0
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
	$height:88upx;
	/* #ifdef MP-WEIXIN */
	$height:100upx;
	/* #endif */
	/* #ifdef APP-PLUS */
	$height:92upx;
	/* #endif */
    .uni-navbar {
        display: block;
        position: relative;
        width: 100%;
        background-color: #b97d9f;
        overflow: hidden;
    }
	
	.uni-navbar view{
		line-height:$height;
	}

    .uni-navbar-shadow {
        box-shadow: 0 2upx 12upx #ccc;
    }

    .uni-navbar.uni-navbar-fixed {
        position: fixed;
        z-index: 998;
		top: 0;
    }

    .uni-navbar-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        height:$height;
        line-height:$height;
        font-size: 50upx;
    }
	
	
	.uni-navbar-container{
		width:100%;
		margin:0 10upx;
	}
	.uni-navbar-container-title{
		font-size:30upx;
		text-align:center;
		padding-right: 60upx;
		width: 100%;
	}
</style>
