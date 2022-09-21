import moment from "moment";
const baseUrl = 'https://api.cnblogs.com';

const request = async (options) => {
	const overDate = moment(uni.getStorageSync('expires_in_start')).add(uni.getStorageSync('expires_in'),
		'second')
	if (!uni.getStorageSync('token') || moment().isAfter(overDate)) {
		await getToken()
	}
	return requestFn(options)
}

async function requestFn(options) {
	return await uni.request({
		...options,
		url: baseUrl + options.url,
		header: {
			...{
				'Authorization': `Bearer ${uni.getStorageSync('token')}`
			},
			...options.header
		},

	}).then(res => {
		// console.log(res, 'res')
		const data = res[1]
		if (data.statusCode == 200) {
			return data.data
		}
		uni.showToast({
			title: data.data.title,
			icon: 'none',
			duration: 4000
		});
		return data.data
	})
}


async function getToken() {
	const token = await requestFn({
		url: '/token',
		method: 'POST',
		data: {
			client_id: '76316480-b3b4-4428-bb62-25f911c1faae',
			client_secret: 'GO-QDzfj7jaFFOgF1aLXUfcZ_zeyLzWqPvn7XZgI0pLqKYb1GZfojnRXDhWA5IEMnZsAIkHNU1qwLq7D',
			grant_type: 'client_credentials'
		},
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
	uni.setStorageSync('token', token.access_token);
	uni.setStorageSync('expires_in', token.expires_in);
	uni.setStorageSync('expires_in_start', moment().valueOf());
}


module.exports = {
	request
}
