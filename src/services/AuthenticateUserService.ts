import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { sign } from "jsonwebtoken"



interface IAuthenticateResquest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateResquest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({ email: email });
        if (!user) {
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }
        const token = sign({
            email: user.email,
        }, "871ffb7bd09cdc05a7c7b2216ea3089f", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token;
    }


}




export { AuthenticateUserService }