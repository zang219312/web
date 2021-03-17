/**
 * 小程序云开发请求二次封装（数据库操作）
 * 只适用于小程序原生的云开发
 */
export default {
	/**
	 * 云数据添加
	 * collectionName  集合名称
	 * data            需要添加的数据
	 * isLoad          请求是否显示加载提示 默认是提示
	 */
	add(collectionName, data = {}, isLoad = true) {
		return new Promise((resolve, reject) => {
			if (isLoad) {
				uni.showLoading({
					title: '加载中',
					mark: true
				})
			}
			const db = wx.cloud.database()
			db.collection(collectionName).add({
				data: data
			}).then(res => {
				resolve(res)
				if (isLoad) {
					uni.hideLoading()
				}
			}).catch(res => {
				if (isLoad) {
					uni.hideLoading()
				}
				reject(res)
			});
		});
	},

	/**
	 * 云数据查询
	 * collectionName  集合名称
	 * id              指定记录的_id
	 * isLoad          请求是否显示加载提示 默认是提示
	 */
	query(collectionName, id = '', isLoad = true) {
		return new Promise((resolve, reject) => {
			if (isLoad) {
				uni.showLoading({
					title: '加载中',
					mark: true
				})
			}
			const db = wx.cloud.database()
			let qq = db.collection(collectionName)
			if (id != '') {
				qq = db.collection(collectionName).doc(id)
			}
			qq.get().then(res => {
				resolve(res.data)
				if (isLoad) {
					uni.hideLoading()
				}
			}).catch(res => {
				if (isLoad) {
					uni.hideLoading()
				}
				reject(res)
			});
		});
	},

	/**
	 * 云数据条件查询
	 * collectionName   集合名称
	 * where            查询条件
	 * limit            返回数据条数（最大20）
	 * skip             查询数据位置
	 * orderBy          排序条件
	 * isLoad           请求是否显示加载提示 默认是提示
	 */
	whereQuery(collectionName, where = {}, limit = 20, skip = 0, orderBy = [], isLoad = true) {
		return new Promise((resolve, reject) => {
			if (isLoad) {
				uni.showLoading({
					title: '加载中',
					mark: true
				})
			}
			const db = wx.cloud.database()
			let qq = db.collection(collectionName)
			if (where != '') {
				qq = qq.where(where)
			}
			qq = qq.skip(skip).limit(limit)
			//处理排序数组，循环拼凑
			if (orderBy.length > 0) {
				orderBy.forEach(item => {
					qq = qq.orderBy(item.name, item.value)
				})
			}
			qq.get().then(res => {
				resolve(res.data)
				if (isLoad) {
					uni.hideLoading()
				}
			}).catch(res => {
				if (isLoad) {
					uni.hideLoading()
				}
				reject(res)
			});
		});
	},

	/**
	 * 云数据删除（只支持单个删除，多个删除需要借助云函数）
	 * collectionName  集合名称
	 * id              指定记录的_id
	 * isLoad          是否显示删除提示框
	 */
	del(collectionName, id, isLoad = true) {
		return new Promise((resolve, reject) => {
			if (isLoad) {
				uni.showLoading({
					title: '删除中',
					mark: true
				})
			}
			const db = wx.cloud.database()
			db.collection(collectionName).doc(id).remove().then(res => {
				resolve(res.stats)
				if (isLoad) {
					uni.hideLoading()
				}
			}).catch(res => {
				if (isLoad) {
					uni.hideLoading()
				}
				reject(res)
			});
		});
	},

	/**
	 * 云数据修改（单条数据）
	 * collectionName 集合名称
	 * id             指定记录的_id
	 * data           修改的数据
	 * isLoad         是否显示修改提示框 
	 */
	update(collectionName, id, data, isLoad = true) {
		return new Promise((resolve, reject) => {
			if (isLoad) {
				uni.showLoading({
					title: '修改中',
					mark: true
				})
			}
			const db = wx.cloud.database()
			db.collection(collectionName).doc(id).update(data).then(res => {
				resolve(res.stats)
				if (isLoad) {
					uni.hideLoading()
				}
			}).catch(res => {
				if (isLoad) {
					uni.hideLoading()
				}
				reject(res)
			});
		});
	},

}
