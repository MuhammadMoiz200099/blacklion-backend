import { Document, PaginateModel } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	phone?: string;
	address?: string;
	city?: string;
	country?: string;
	postalCode?: string;
	profilePicture?: string;
	password?: string;
	provider?: string;
	salt?: string;
	date?: Date;
	resetPasswordToken?: string;
	facebook?: {};
	twitter?: {};
	google?: {};
	github?: {};
}
export interface IUserModel<T extends Document> extends PaginateModel<T> { }