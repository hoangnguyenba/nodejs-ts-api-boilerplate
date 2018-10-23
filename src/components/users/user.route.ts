
import { UserModel } from './user.model';
import { getManager } from 'typeorm';

export class UserService {

    /**
     * @description get list of user
     * @author Hoang Nguyen
     * @since 23/10/2018
     * @param {*} args
     * @returns {Promise<UserModel[]>}
     * @memberof UserService
     */
    async list(args: any): Promise<UserModel[]> {
        const users = await getManager().find(UserModel);
        return users;
    }
}
