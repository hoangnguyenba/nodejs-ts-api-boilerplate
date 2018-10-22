// import { UserModel } from '../users';
import * as jwt from 'jsonwebtoken';

export interface LoginResponse {
    token: string;
}

export class AuthService {
    async login(data: {email: string, password: string}): Promise<LoginResponse> {
        const { email } = data;
        // const user = await UserModel.findOne({email: email});
        // return { token: 'this is demo' };
        return { token: this.createToken({email: email}) };
    }

    createToken(data: {email: string}): string {
        return jwt.sign(data, 'configthis');
    }
}
