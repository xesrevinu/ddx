/**
 * Created by kee on 15/10/2.
 */
import db from './connection'

export default {
	async getAuth(username){
		const users = db.get('users');
		return new Promise((resolve, reject)=>{
			let query = {
				email:username
			};
			users.findOne(query, (err, data)=>{
				if(err){
					return reject(err)
				}
				return resolve(data)
			})
		})
	},
	async createUser(body){
		const users = db.get('users');
		return new Promise((resolve, reject)=>{
			let newUser = {
				...body,
				create_time:Date.now()
			};
			users.insert(newUser, (err, data)=>{
				if(err){
					return reject(err)
				}
				return resolve(data)
			})
		})
	},
	async userExist(email){
		const users = db.get('users');
		return new Promise((resolve, reject)=>{
			let query = {
				email:email
			};
			users.find(query, (err, data)=>{
				if(err){
					return reject(err)
				}
				if(data == null || data.length == 0){
					return resolve(true)
				}
				return resolve(false)
			})
		})
	}
}