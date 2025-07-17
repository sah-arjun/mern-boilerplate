import { Request, Response } from "express";
import * as AuthService from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, username, password } = req.body;
        const data = await AuthService.register(name, username, password);
        res.status(201).json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const data = await AuthService.login(username, password);
        res.json(data);
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};