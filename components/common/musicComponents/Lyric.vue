<template>
	<view class="lyric">
		<view class="lrc-box">
			<view class="msg"></view>
			<view class="text-box" :style="{ transform: 'translateY(-' + sec * 100 + 'upx)' }">
				<view class="lrc-item" v-for="index in 2" :key="index + 'ss'" />
				<view :style="{'color':lrcTime >= item.lrc_sec ?'pink':'#5555ff'}" class="lrc-item" v-for="(item, index) in lrclist" :key="index">
					<text>{{ item.lrc }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	components: {},
	data() {
		return {
			sec: 0
		};
	},
	watch: {
		lrcTime(val) {
			this.lrclist.forEach((item,index)=>{
				if(item.lrc_sec == val){
					this.sec = index
				}
			})
		}
	},
	computed: {
		...mapGetters(['lrclist', 'lrcTime'])
	}
};
</script>

<style scoped lang="scss">
.lyric {
	color: #eeeeee;
	.lrc-box {
		width: 100%;
		height: 500upx;
		text-align: center;
		overflow-y: hidden;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -120%);
	}
	.text-box {
		transition: all 0.5s;
		padding: 0 80upx;
	}
	.lrc-item {
		display: flex;
		height: 100upx;
		flex-direction: column;
		justify-content: center;
	}
	.msg {
		width: 100%;
		height: 50px;
		position: absolute;
		top: 100px;
		background: rgba(116, 241, 195, 0.28);
	}
}
</style>
