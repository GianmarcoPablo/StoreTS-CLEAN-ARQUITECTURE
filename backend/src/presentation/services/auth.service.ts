import { CustomError, LoginUserDto, RegisterDto, UserEntity } from "../../domain";
import { UserModel } from "../../database";
import { HashPasswordAdapter } from "../../config";
import { GenerateTokenAdapter } from "../../config/generateTokenAdapter";

export class AuthService {

    public async registerUser(registerUserDto: RegisterDto) {
        const existsUser = await UserModel.findOne({ email: registerUserDto.email })
        if (existsUser) throw CustomError.badRequest("User already exists")
        try {
            const user = new UserModel(registerUserDto)
            user.password = await HashPasswordAdapter.hash(user.password)
            const token = await GenerateTokenAdapter.generateToken({ id: user.id })
            await user.save()
            const { password, ...userEntity } = UserEntity.fromObject(user)
            return {
                user: userEntity,
                token: token
            }
        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR]: ${error}`)
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {
        try {
            const user = await UserModel.findOne({ email: loginUserDto.email })
            if (!user) throw CustomError.badRequest("User not found")

            const isMatch = await HashPasswordAdapter.compare(loginUserDto.password, user.password)

            if (!isMatch) throw CustomError.badRequest("Invalid credentials")

            const { password, ...userEntity } = UserEntity.fromObject(user)
            const token = await GenerateTokenAdapter.generateToken({ id: user.id })
            return {
                user: userEntity,
                token: token
            }
        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR]: ${error}`)
        }
    }
}