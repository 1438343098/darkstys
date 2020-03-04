import { getPlayUrl, getMusicLyric } from '@/api/photo.js'
const state = {
	audio: null,
	index:0,
	paused:true,
	timeout:null,
	songList: [] //播放列表
}

const mutations = {
	// 设置全局数据
    SETGLOBALDATA(state, payload) {
        let { key, value } = payload
        state[key] = value
    },
	// 上一曲
	PREV(state){
		state.index -= 1
		if(state.index < 0){
			state.index = state.songList.length-1
		}
	},
	// 更新播放 默认下一曲,如果传入对应下标则播放对应音乐
	UPDATE(state,indexs) {
		if(state.songList.length !== 0){
			if(typeof indexs != "undefined"){
				state.index = indexs
			}else{
				state.index += 1
			}
		}
	},
	// 重新播放
	RESET(state) {
		state.index = 0
	},
	// 播放方式
	AUDIOSTATUS(state,payload){
		state.audio[payload]()
	},
	// 请求音乐地址
	PLAYMUSIC(state){
		state.paused = true
		if(state.songList.length !== 0){
			// 防抖
			if(state.timeout !== null){
				clearTimeout(state.timeout)
				state.paused = true
				state.timeout = null
			}else{
				state.timeout = setTimeout(()=>{
					getPlayUrl({br:state.songList[state.index].br,id:state.songList[state.index].id}).then(res=>{
						state.audio.src = res.data[0].url
						state.audio.play()
						state.paused = false
						state.timeout = null
					})
				},200)
			}
		}
		
		
	}
}

const actions = {
	play({ commit }){
		commit("AUDIOSTATUS",'play')
	},
	pause({ commit }){
		commit("AUDIOSTATUS",'pause')
	},
	reset({commit}){
		commit("RESET")
		commit("PLAYMUSIC")
	},
	update({commit},indexs){
		commit("UPDATE",indexs)
		commit("PLAYMUSIC")
	},
	prev({commit}){
		commit("PREV")
		commit("PLAYMUSIC")
	}
    
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
