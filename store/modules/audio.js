import { getPlayUrl, getMusicLyric } from '@/api/photo.js'
const state = {
	// 是否有音乐组件
	openAudio:false,
	audio: null,
	index:0,
	songList: [] //播放列表
}

const mutations = {
    SETGLOBALDATA(state, payload) {
        let { key, value } = payload
        state[key] = value
		if(key === 'songList'){
			getPlayUrl(state.songList[state.index]).then(res=>{
				console.log(res)
				state.audio.src = res.data[0].url
			})
		}
    },
	UPDATE(state) {
		state.index += 1
		getPlayUrl(state.songList[state.index]).then(res=>{
			state.audio.src = res.data[0].url
			state.audio.play()
		})
	},
	RESET(state) {
		state.index = 0
		getPlayUrl(state.songList[state.index]).then(res=>{
			state.audio.src = res.data[0].url
			state.audio.play()
		})
	},
	AUDIOSTATUS(state,payload){
		state.audio[payload]()
	}
}

const actions = {
	play({ commit }){
		commit("AUDIOSTATUS",'play')
	},
	pause({ commit }){
		commit("AUDIOSTATUS",'pause')
	}
    
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
