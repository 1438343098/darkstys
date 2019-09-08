<template>
	<view class='todo'>
	        <view class="one" @click="goIndex">
	          <image 
	            src="/static/image/start.jpg"
	            class="imgBg"
	          />
	          <view class="titles">
	            <text class="texts">darkSky</text>
	            <button class="button"  type='primary'>
	              <text class="upt">融</text>
	              <text class="upt">入</text>
	              <text class="upt">夜</text>
	              <text class="upt">空</text>
	            </button>
	          </view>
	        </view>
			<view v-show="re" class="two">
				<Re />
			</view>
	      </view>
</template>

<script>
	import data from "service"
	import Re from "./re/login"
	export default {
		onLoad() {
			console.log(data.getUsers())
		},
		components: {
			Re
		},
		data() {
			return {
				re: false,
				okIndex:true
			}
		},
		methods:{
			// 进入首页
		  goIndex(){
			  console.log(5555)
			  this.re = true
			//如果没用户数据进入数据填写页
			// if(this.state.userInfo){
			//   Taro.redirectTo({ url:'../index/index'})
			// }else{
			//   this.re = true
			// }
			setTimeout(()=>{
				this.okIndex = false
			},5000)
		  }
		}
	}
</script>

<style lang="scss" scoped >
	.todo{
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    right: 0;
	    left: 0;
	    overflow:hidden;
	    .titles{
	        position: absolute;
	        z-index: 10;
	        background: transparent;
	        top: 50%;
	        left: 50%;
	        height: 700upx;
	        transform: translate(-50%,-50%);
	    }
	    .button{
	        position: absolute;
	        bottom: 0;
	        background: transparent;
	        text-align:center;
	        left: 50%;
	        border:0;
			width: 240upx;
	        transform: translateX(-50%);
	    }
	    .texts{
	        font-family: 'Times New Roman', Times, serif;
	        color: rgba(160, 137, 137, 0.8);
	        font-size: 80upx;
	        letter-spacing: 2upx;
	    }
	    
	    .one{
	        position: absolute;
	        top: 0;
	        left:0upx;
	        width: 100%;
	        height: 100%;
	        z-index: 10;
	        overflow:hidden;
	    }
	    .two{
	        position: absolute;
	        top: 0;
	        overflow:hidden;
	        left:0upx;
	        width: 100%;
	        height: 100%;
	        z-index: 11;
	        animation: imgdiv 4s both;
	    }
	    .upt{
	        display: inline-block; 
	        transform: translateY(20upx)
	    }
	    .upt:nth-child(1){
	        animation: upts 5s infinite;
	    }
	    .upt:nth-child(2){
	        animation: upts 5s infinite .5s;
	    }
	    .upt:nth-child(3){
	        animation: upts 5s infinite 1s;
	    }
	    .upt:nth-child(4){
	        animation: upts 5s infinite 1.5s;
	    }
	}
	
	.imgBg{
	    width: 200%;
	    height: 100%;
	    animation: gor 30s linear infinite;
	    position: fixed;
	}
	@keyframes gor{
	    0%{
	        transform: translateX(0)
	    }
	    50%{
	        transform: translateX(-50%)
	    }
	    100%{
	        transform: translateX(0%)
	    }
	}
	@keyframes upts{
	    0%{
	        transform: translateY(20upx)
	    }
	    50%{
	        transform: translateY(-20upx)
	    }
	    100%{
	        transform: translateY(20upx)
	    }
	}
@keyframes imgdiv{
	0% {width:0;height:0;left:375upx;top:700upx;border-radius:0;}
	100% {width: 2500upx;height:2500upx;left:-750upx;top:-650upx;border-radius:1250upx;}
}
</style>
