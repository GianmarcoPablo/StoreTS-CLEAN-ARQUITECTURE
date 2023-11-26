import e, { Request, Response } from "express"
import { AuthService } from "../services/auth.service";
import { RegisterDto, CustomError } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {

    constructor(
        public readonly authService: AuthService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message })
        }
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterDto.create(req.body)

        if (error) return res.status(400).json({ message: error })
        this.authService.registerUser(registerUserDto!)
            .then(user => res.status(201).json(user))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        if (error) return res.status(400).json({ message: error })

        this.authService.loginUser(loginUserDto!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res))
    }

    validateEmail = (req: Request, res: Response) => { }

}