import { IArtist } from "../../../../types/artist";
import { Artist } from "../../../models";
import AwsService from "../../../services/aws.service";

export class AuthService {

    constructor() { }

    async get(options): Promise<Array<IArtist>> {
        return new Promise(async (resolve, reject) => {
            try {
                let serverRequest = await Artist.find({})
                for (let request of serverRequest) {
                    let obj = request as any;
                    if (obj?.avatarKey) {
                        const url = await AwsService.getFromAWSCloudS3(obj.avatarKey);
                        obj.avatar = url
                    }
                }
                return resolve(serverRequest);
            } catch (e) {
                return reject(e);
            }
        })
    }
    async getMyArtist(): Promise<Array<IArtist>> {
        return new Promise(async (resolve, reject) => {
            try {
                let serverRequest = await Artist.find({ isMyArtist: true })
                for (let request of serverRequest) {
                    let obj = request as any;
                    if (obj?.avatarKey) {
                        const url = await AwsService.getFromAWSCloudS3(obj.avatarKey);
                        obj.avatar = url
                    }
                }
                return resolve(serverRequest);
            } catch (e) {
                return reject(e);
            }
        })
    }
    async post(payload: IArtist): Promise<IArtist> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!payload) {
                    return reject({ code: 400, message: "Server returned error." })
                }
                const serverRequest = new Artist(payload);
                return resolve(await serverRequest.save());
            } catch (e) {
                return reject(e);
            }
        })
    }
    async postWithImage(payload: IArtist, file: any): Promise<IArtist> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!file) {
                    return reject({ code: 400, message: "Server returned error." })
                }

                await AwsService.uploadToAWSCloudS3(file);

                if (!payload) {
                    return reject({ code: 400, message: "Server returned error." })
                }

                payload.avatar = "";
                payload.avatarKey = file.originalname;

                const serverRequest = new Artist(payload);

                return resolve(await serverRequest.save());
            } catch (e) {
                return reject(e);
            }
        })
    }
    async getById(id): Promise<IArtist> {
        return new Promise(async (resolve, reject) => {
            try {
                let [serverRequest] = await Artist.find({ _id: id });
                if (serverRequest?.avatarKey) {
                    const url: any = await AwsService.getFromAWSCloudS3(serverRequest.avatarKey);
                    serverRequest.avatar = url
                }
                return resolve(serverRequest);
            } catch (e) {
                return reject(e);
            }
        })
    }
    async update(id, payload: IArtist): Promise<IArtist> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return reject({ code: 400, message: "Invalid id, Server returned error." })
                }
                if (!payload) {
                    return reject({ code: 400, message: "Invalid payload, Server returned error." })
                }

                const update = await Artist.findOneAndUpdate({ _id: id }, payload)
                return resolve(update);
            } catch (e) {
                return reject(e);
            }
        })
    }
    async updateWithProfile(id, payload: IArtist, file): Promise<IArtist> {
        return new Promise(async (resolve, reject) => {
            try {
                await AwsService.removeFromAWSCloudS3(payload.avatarKey);

                if (!file) {
                    return reject({ code: 400, message: "File Not Found, Server returned error." })
                }

                await AwsService.uploadToAWSCloudS3(file);

                if (!id) {
                    return reject({ code: 400, message: "Invalid id, Server returned error." })
                }

                if (!payload) {
                    return reject({ code: 400, message: "Invalid payload, Server returned error." })
                }

                payload.avatar = "";
                payload.avatarKey = file.originalname;

                const update = await Artist.findOneAndUpdate({ _id: id }, payload)

                return resolve(update);
            } catch (e) {
                reject(e);
            }
        })
    }    
    async addToMyArtist(id): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return reject({ code: 400, message: "Invalid id, Server returned error." })
                }

                const request = await Artist.updateMany({ _id: id }, {
                    $set:{ isMyArtist : true }
                })
                return resolve(request);
            } catch (e) {
                return reject(e);
            }
        })
    }
    async delete(id): Promise<IArtist> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return reject({ code: 400, message: "Invalid id, Server returned error." })
                }

                const request = await Artist.findOneAndDelete({ _id: id })
                return resolve(request);
            } catch (e) {
                return reject(e);
            }
        })
    }
}

export default new AuthService();
