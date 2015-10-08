/**
 * Created by kee on 15/9/28.
 */
import {
	AUTH_LOAD,
	AUTH_LOAD_SUCCESS,
	AUTH_LOAD_FAIL
} from '../constants/auth'

const initialState = {
	loading: false,
	msg: '',
	error: '',
	user: {
		logind:false
	}
};

export default function auth(state = initialState, actions ={}){
	let { type } = actions;
	switch (type){
		case AUTH_LOAD:
			return {
				...state,
				loading:true //loading state
			}
		case AUTH_LOAD_SUCCESS:
			return {
				...state,
				loading:false, //loading done
				error:'',	//reset error
				msg:actions.msg,
				user:{
					logind:true,
					...actions.result
				}
			}
		case AUTH_LOAD_FAIL:
			return {
				...state,
				loading:false, //loading error
				error:actions.error //show error
			}
	}
	return state
}
