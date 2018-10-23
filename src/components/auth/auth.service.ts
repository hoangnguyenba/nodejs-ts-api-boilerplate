import { UserModel } from '../users';
import * as jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';

export interface LoginResponse {
    token: string;
}

export interface RegisterResponse {
    id: number;
}

export class AuthService {
    async login(info: {email: string, password: string}): Promise<LoginResponse> {
        const { email } = info;
        // const user = await UserModel.findOne({email: email});
        // return { token: 'this is demo' };
        return { token: this.createToken({email: email}) };
    }

    async register(newUserObj: any): Promise<RegisterResponse> {
        let newUser = await getManager().create(UserModel, newUserObj);
        newUser = await getManager().save(UserModel, newUser);
        return { id: newUser.id };
    }

    createToken(data: {email: string}): string {
        return jwt.sign(data, 'configthis');
    }
}
