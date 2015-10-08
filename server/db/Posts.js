/**
 * Created by kee on 15/9/26.
 */
import db from './connection'

export default {
	async getPosts(){
		let posts = db.get('posts');
		return new Promise((resolve, reject)=> {
			posts.find({}, (err, data)=> {
				if (err) {
					return reject(err)
				}
				return resolve(data)
			})
		})
	},
	async getPost(id){
		let posts = db.get('posts');
		let query = {
			"_id": id
		};
		return new Promise((resolve, reject)=> {
			posts.find(query, (err, data)=> {
				if (err) {
					return reject(err)
				}
				return resolve(data)
			})
		})
	},
	async createPost(body){
		let posts = db.get('posts');
		let { name, id, content } = body;
		if (!name || !id || !content) {
			return Promise.reject(new Error('字段不全'))
		}
		return new Promise((resolve, reject)=> {
			let body = {
				name,
				id,
				content,
				create_time: Date.now()
			};
			posts.insert(body, (err, data)=> {
				if (err) {
					return reject(err);
				}
				return resolve(data);
			})
		})
	}
}
