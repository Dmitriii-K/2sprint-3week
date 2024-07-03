import { Request, Response } from "express";
import { LoginInputModel, LoginSuccessViewModel } from "../input-output-types/auth-type";
import { OutputErrorsType } from "../input-output-types/output-errors-type";
import { jwtService } from "../adapters/jwtToken";
import { AuthRepository } from "./authRepository";
import { bcryptService } from "../adapters/bcrypt";


export class AuthController {
  static authLoginUser = async (
    req: Request<{}, {}, LoginInputModel>,
    res: Response<LoginSuccessViewModel | OutputErrorsType>
  ) => {
    try {
      const {login, email} = req.body
      const authUser = await AuthRepository.findUserByLogiOrEmail({login, email});
      if (!authUser) {
        res.status(401).json({ errorsMessages: [{field: 'user', message: 'user not found'}] });
      } else {
        const isCorrect = await bcryptService.comparePasswords( req.body.password, authUser?.password);
        if(isCorrect) {
          const{ token: accessToken } = await jwtService.generateToken(authUser);
          res.status(200).json({accessToken});
          return;
        } else {
          res.status(401).json({ errorsMessages: [{field: 'password and login', message: 'password or login is wrong'}] });
        }
    };
    } catch (error) {
      console.log(error);
      res.sendStatus(505);
    }
  };

  static authRegistration = async () => {
  };

  static authRegistrationConfirmation = async () => {
  };

  static authRegistrationEmailResending = async () => {
  }
};


