// import { login, logout, getInfo } from '@/api/user'


const state = {
 
        hasLogin: false,
        userName: "",
		city:""
    }

const mutations= {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		addCity(state,city){
			state.city = city
		}
    }

const actions = {
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}