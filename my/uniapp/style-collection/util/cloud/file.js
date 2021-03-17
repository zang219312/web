/**
 * 小程序云开发请求二次封装（存储操作）
 * 只适用于小程序原生的云开发
 */
export default {
	/**
	 * 云端存储上传
	 */
	upload(cloudPath, filePath, params = {
		isLoad: true
	}) {
		return new Promise((resolve, reject) => {
			if (params.isLoad) {
				uni.showLoading({
					title: '上传中',
					mark: true
				})
			}
			wx.cloud.uploadFile({
				cloudPath: cloudPath,
				filePath: filePath,
			}).then(res => {
				if (res.errMsg == 'cloud.uploadFile:ok') {
					resolve(res.fileID)
				} else {
					resolve()
				}
				if (params.isLoad) {
					uni.hideLoading()
				}
			}).catch(res => {
				if (params.isLoad) {
					uni.hideLoading()
				}
				reject(res)
			});
		});
	},

	/**
	 * 删除云端存储文件(避免存储空间的浪费)
	 * ids []
	 */
	delFile(ids) {
		return new Promise((resolve, reject) => {
			wx.cloud.deleteFile({
				fileList: ids
			}).then(res => {
				if (res.errMsg == 'cloud.deleteFile:ok') {
					resolve(res.fileList)
				} else {
					resolve()
				}
			}).catch(res => {
				reject(res)
			});
		});
	}
}
