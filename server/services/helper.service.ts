import { IMeUser } from '../../types/me';
import { IUser } from '../../types/user';
import path from "path";
import { v4 as uuidv4 } from 'uuid';

export class HelperService {

    tranformMeData(user: IUser) {
        return {
            id: user['_id'],
            firstName: user['firstName'],
            lastName: user['lastName'],
            email: user['email'],
            username: user?.username
        } as IMeUser;
    }

    handleFileDetails(file) {
        let requestedFile = file;
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension = path.parse(file.originalname).ext;
        requestedFile.originalname = `${filename}${extension}`;
        return requestedFile;
    }

}

export default new HelperService();