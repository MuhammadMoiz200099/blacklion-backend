import { IUser } from "../../../../types/user";
import { User } from "../../../models";

export class UserService {

	constructor() {}

	async get(): Promise<Array<IUser>> {
		return User.find({});
	}
	async create(userData: IUser): Promise<IUser> {
		const userInstance = new User(userData);
		return userInstance.save();
	}
	async getById(id): Promise<IUser> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const [get] = await User.find({ _id: id });
				return resolve(get);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async update(id, user): Promise<IUser> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				if (!user) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const updateQuery = await User.findOneAndUpdate({ _id: id }, user);
				return resolve(updateQuery);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async delete(id): Promise<IUser> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const deleteQuery = await User.findOneAndDelete({ _id: id });
				return resolve(deleteQuery);
			} catch (err) {
				return reject(err);
			}
		})
	}
}

export default new UserService();
