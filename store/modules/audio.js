import { getPlayUrl, getMusicLyric } from '@/api/photo.js'
const state = {
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
	PREV(state){
		state.index -= 1
		if(state.index < 0){
			state.index = state.songList.length-1
		}
		getPlayUrl(state.songList[state.index]).then(res=>{
			state.audio.src = res.data[0].url
			state.audio.play()
		})
	},
	UPDATE(state,indexs) {
		if(indexs){
			state.index += indexs
			
		}else{
			state.index += 1
		}
		console.log(state.songList[state.index])
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
