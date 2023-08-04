import { Request, Response } from "express";
import * as usersService from "../services/usersService";

export const signup = async (req: Request, res: Response) => {
  const { name, password, email } = req.body;

  try {
    await usersService.createUser(name, password, email);
    res.status(201).json({ data: "SUCCESS_CREATED_USER!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "SERVER_ERROR" });
    }
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await usersService.signinUser(email, password);
    res.status(200).json({ data: "SUCCESS_SIGNIN" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "SERVER_ERROR" });
    }
  }
};
