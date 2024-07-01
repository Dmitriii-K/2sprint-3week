import { Request, Response } from "express";
import { LoginInputModel, LoginSuccessViewModel } from "../input-output-types/auth-type";
import { userCollection } from "../db/mongo-db";
import { UserDBModel } from "../input-output-types/users-type";
import { OutputErrorsType } from "../input-output-types/output-errors-type";
import { WithId } from "mongodb";
import bcrypt from 'bcryptjs'; 
import { jwtService } from "../adapters/jwtToken";


export const authController = {
    
}