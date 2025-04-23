import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { getEnvValue } from "../config/config.service";
import { JWTPayload } from "src/utils/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: getEnvValue('JWT_SECRET'),
        });
    }       

    async validate(payload: JWTPayload) {
        return { id: payload.id, rut: payload.rut}
    }
}