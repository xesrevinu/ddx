/**
 * Created by kee on 15/9/28.
 */
import {
	POSTS_LOAD,
	POSTS_LOAD_SUCCESS,
	POSTS_LOAD_FAIL
} from '../constants/posts'
import ajax from 'axios'

export function load(callback){
	return {
		types:[POSTS_LOAD, POSTS_LOAD_SUCCESS, POSTS_LOAD_FAIL],
		promise:()=> ajax.get('//localhost:3000/api/posts'),
		before:({dispatch, getState})=>{
			// dispatch global loading
			//非异步得手动调用fn
			//fn()
			// setTimeout(()=>{
			// 	console.log('before');
			// 	fn(1)
			// },2000)
		},
		after:()=>{
			callback ? callback() : null
		},
		examine:result=>{
			let data = result.data;
			return data
		}
	}
}
