import { IJwtOptions } from "./auth.interface";

export const _options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '1 days',
    jwtid: 'tradingtool_token#*'
};
