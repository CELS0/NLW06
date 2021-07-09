import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
interface IPayload{
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authtoken = request.headers.authorization;

    if (!authtoken) {
        return response.status(401).end();
    }

    const [, token] = authtoken.split(" ");

    try {

        const { sub } = verify(token, "871ffb7bd09cdc05a7c7b2216ea3089f") as IPayload;
        request.user_id = sub
        return next();

    } catch (err) {
        return response.status(401).end();
    }


    return next();

}