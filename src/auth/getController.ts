import { Request, Response } from "express";
import { MeViewModel } from "../input-output-types/auth-type";
import { userCollection } from "../db/mongo-db";
import { AuthMe } from "./authQueryRepository";

export const getUserInformation = async (req: Request, res: Response<MeViewModel>) => {
    try {
        // const userMe = await userCollection.findOne({_id: req.user._id});
        // const result = {email: userMe!.email, login: userMe!.login, userId: userMe!._id.toString()}
        const result = await AuthMe.getAuth(req.user);
        res.status(200).json(result);
        return;
    } catch (error) {
        console.log(error);
    }
};