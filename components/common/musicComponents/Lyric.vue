<template>
	<view class="lyric">
	
		<view class="lrc-box">
			<view class="msg">播放时间：{{lrcTime}}</view>
			<view class="text-box" :style="{'transform': 'translateY(-'+100+'upx)'}">
			<view class="lrc-item" v-for="index in 2" :key="index+'ss'" />
			<view v-if="!Array.isArray(lrclist[0])" class="lrc-item" v-for="(item,index) in lrclist" :key="index">
					<text>
						{{item.lrc}}
					</text> 
			</view>
			<view v-else class="lrc-item" v-for="(item,index) in lrclist[0]" :key="index">
					<text>
						{{item.lrc}}
					</text> 
					<text>
						{{lrclist[1].lrc}}
					</text> 
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapActions,mapMutations } from 'vuex'
	export default{
		components: {},
		data() {
			return {
				sec:0
			}
		},
		methods: {
			
		},
		computed:{
			...mapGetters(['lrclist','lrcTime']),
		}
	} 
</script>

<style scoped lang="scss">
	.lyric{
		color:#eeeeee;
		width: 100%;
		height: 100%;
		position: relative;
		.lrc-box{
			width: 100%;
			height: 500upx;
			text-align: center;
			overflow-y: hidden;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.text-box{
			transition: all .5s ;
		}
		.lrc-item{
			display: flex;
			height: 100upx;
			flex-direction: column;
			justify-content: center;
			
		}
		.msg{
		    width: 100%;
		    height: 50px;
		    position: absolute;
		    top: 100px;
		    background: rgba(116, 241, 195, 0.28);
		}
	}
</style>
