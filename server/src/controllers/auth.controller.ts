import { Request, Response } from "express";
import * as AuthService from '../services/auth.service';
import User from "../models/User";

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

export const getDashboard = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).userId).select('id username name');
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        res.json({
        message: 'Authenticated user retrieved successfully',
        user,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};