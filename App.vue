<script>
	import {
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		getMusicComments,
		getMusicLyric
	} from "@/api/photo.js"
	import utils from '@/utils';
	export default {
		methods: {
			// 获取评论
			getComments(id){
				getMusicComments({
					id,
					limit: 20,
					offset: 0
				}).then(res => {
					this.SETGLOBALDATA({
						key: "comments",
						value: res
					});
					console.log("评论",res)
				})
			},
			// 获取歌词
			getLrc(id){
				let lrclist = []
				getMusicLyric({
					id
				}).then(res => {
					if (res.lrc.lyric && res.tlyric.lyric){
						// lrclist = utils.musicFormate(res.tlyric.lyric)
						lrclist = [
							...utils.musicFormate(res.lrc.lyric),
							...utils.musicFormate(res.tlyric.lyric)
							].sort((a,b)=>{
								return a.lrc_sec - b.lrc_sec
							})
					}else{
						if(res.lrc.lyric){
							lrclist = utils.musicFormate(res.lrc.lyric)
						}else if(res.tlyric.lyric){
							lrclist = utils.musicFormate(res.tlyric.lyric)
						}else{
							lrclist = ["纯音乐,请欣赏"]
						}
					}
					this.SETGLOBALDATA({
						key: "lrclist",
						value: lrclist
					});
					console.log("歌词",lrclist)
				})
			},
			...mapMutations("audio", ['SETGLOBALDATA']),
			...mapActions("audio", ['update', 'reset']),

		},
		computed: {
			...mapGetters(['songList', 'musicIndex',  "musicID"])
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success(e) {
					/* 窗口宽度 大于420px且不在PC页面时，跳转至PC页面 */
					if (e.windowWidth > 420 && !window.top.isPC) {
						window.location.pathname = '/static/html/pc.html';
					}
				}
			})
			//初始化全局的音频播放器
			let audio = uni.createInnerAudioContext();
			this.SETGLOBALDATA({
				key: "audio",
				value: audio
			});
			audio.onEnded(() => {
				console.log(54545,this.songList)
				if (this.songList.length - 1 != this.musicIndex) {
					this.update()
				} else {
					this.reset()
				}
			})
			
			// 歌词更新事件 更新歌词
			audio.onTimeUpdate(() => {
				this.SETGLOBALDATA({
					key: "lrcTime",
					value: parseInt(audio.currentTime)
				});
			})
			// 新音乐事件 获取歌词。评论
			audio.onCanplay(() => {
				// 歌词
				this.getLrc(this.musicID);
				// 评论
				this.getComments(this.musicID);
			})
			
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	.uni-input-placeholder {
		color: #00355f;
	}

	uni-image {
		width: 100%;
	}

	.ofh {
		overflow: hidden;
	}

	.ac {
		text-align: center;
	}

	.al {
		text-align: left;
	}

	.ar {
		text-align: right;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	page {
		width: 100%;
		height: 100%;
		display: block;
		font-size: 30upx;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}


	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */
	.uni-body::-webkit-scrollbar {
		display: none
	}
</style>
