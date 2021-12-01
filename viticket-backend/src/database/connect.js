import mongoose from 'mongoose'

class Database {
	constructor() {
		this._connect()
	}

	_connect() {
		mongoose
			.connect(`mongodb://mongo/db_viticket_01`)
			.then(() => {
				console.log('Kết nối tới cơ sở dữ liệu thành công!')
			})
			.catch(err => {
				console.log(err)
				console.log('Kết nối tới cơ sở dữ liệu thất bại!')
			})

	}
}
const database = new Database()
export default database