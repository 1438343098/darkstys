<template>
	<view class="reshow" >
		<view class="box">
			<view class="re_hd" ><image class="imgs" :src="user_img"></image></view>
			<view class="autographsw">
				<text style="color:rgb(255, 129, 91);">签名</text>
				<input type="text" placeholder="成为万里挑一的存在吧" maxLength="12" />
				<text class="iconfont icon-xie"></text>
			</view>
			<view class="re_showis">
				<view class="re_item">
					<view style="width:100%">
						<!-- <Picker mode='date' onChange={this.onDateChange.bind(this)}>
	                  <view class='pickerRili'>
	                    <text>生日</text> <text>{this.state.dateSel}</text><AtIcon value='calendar' size='16' color='#000'></AtIcon>
	                  </view>
	                </Picker> -->
					</view>

					<!-- <view style="width:100%"><AtSwitch title={'性别　　　　　 　　'+this.state.sex} style="width:100%;" color="pink" checked={this.state.sexs} onChange={this.handleChangeSex.bind(this)} ></AtSwitch></view> -->
					<!-- <view style="width:100%"><Citypicker  Division=" - " getCity={this.cityEnd.bind(this)}></Citypicker></view> -->
				</view>

			</view>
		</view>
		<!-- <view class={this.state.showSlide} style={{ width: this.state.clientWidth,height: this.state.clientHeight}}>
	            {listItems}
	          </view> -->

		<!-- {this.state.times && <view  class="rilis"  style={{ width:this.state.clientWidth,height:this.state.clientHeight }}><AtCalendar onSelectDate={this.handleChangeDate}/></view>} -->
	</view>
</template>

<script>
let url = 'http://testlifein.overseaslife.com.cn/static/images/map/icon/';
export default {
	data() {
		return {
			// 头像组件出现与样式
			showList: false,
			showSlide: 're_headC',
			// 日期
			times: false,
			// 决定的数据
			user_img: url + 'nan.png',
			autograph: '',
			dateSel: '2000-1-1',
			sexs: false,
			sex: '男'
		};
	}
};
</script>

<style lang="scss" scoped>
.reshow {
	position: absolute;
	overflow: hidden;

	top: -700upx;
	left: 375upx;
	width: 750upx;
	height: 100vh;
	animation: img 4s both;
	.ends {
		width: 200upx;
	}
	
	.box {
		width: 100%;
		height: 100vh;
		background: url(http://testlifein.overseaslife.com.cn/static/images/bgs2.jpeg) no-repeat;
		background-size: cover;
		position: absolute;
		top: 0;
		left: 0;
		animation: reUpBg 10s both;
	}
	.re_showis {
		width: 100%;
		height: 60%;
		background: #e2e2e2;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.re_item {
		width: 90%;
		height: 80%;
		background: #fff;
		border-radius: 20upx;
		position: absolute;
		color: #000;
		padding: 0 30upx;
		box-sizing: border-box;
		left: 50%;
		top: -50upx;
		transform: translateX(-50%);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	.re_btn {
		position: absolute;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		display: flex;
		justify-content: space-around;
	}
	.re_hd {
		background: rgba(216, 216, 216, 0.7);
		border-radius: 50%;
		width: 200upx;
		height: 200upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 100upx;
		left: 50%;
		transform: translateX(-50%);
		.imgs{
			width: 80%;
			height: 80%;
		}
	}
	.autographsw {
		display: flex;
		background: transparent;
		justify-content: space-around;
		padding: 20upx;
		width: 90%;
		font-size: 30upx;
		color: #fff;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 320upx;
		position: relative;
		z-index: 0;
		input {
			background: transparent;
		}
		border-bottom: 1upx solid #ccc;
	}

	.at-input__children::after {
		border: 0;
	}
	.icon-xie {
		color: rgb(53, 180, 192);
		font-size: 50upx;
	}
	.pickerRili {
		font-size: 30upx;
		margin: 0.68267rem;
		border-bottom: 1upx solid #d6e4ef;
		padding: 0.512rem 0.68267rem 0.512rem 0;
		display: flex;
		justify-content: space-between;
	}
	.register {
		background: rgb(53, 180, 192);
	}
	.logins {
		background: rgb(255, 129, 91) !important;
	}
}

.re_headC {
	position: absolute;
	width: 375upx;
	height: 1600upx;
	bottom: 0;
	left: 0;
	overflow-y: auto;
	background: #fff;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	transform: translateY(1600upx);
	.items {
		padding: 0;
		margin: 0;
		width: 20%;
		border: 2upx solid rgb(160, 160, 160);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 150upx;
		margin: 15upx;
	}
}
.re_headC.outs {
	animation: hdDowns 1s both;
}
.re_headC.ups {
	animation: hdUps 1s both;
}

@keyframes hdUps {
	0% {
		transform: translateY(1600upx);
	}
	100% {
		transform: translateY(0upx);
	}
}
@keyframes hdDowns {
	0% {
		transform: translateY(0upx);
	}
	100% {
		transform: translateY(1600upx);
	}
}
@keyframes reUpBg {
	0% {
		background-position: 0;
	}
	100% {
		background-position: 0 -500upx;
	}
}

.wtMX {
	width: 100%;
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
