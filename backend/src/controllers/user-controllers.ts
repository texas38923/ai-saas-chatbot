import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users from db:
    const users = await User.find();
    return res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //signing up the user:
    const { name, email, password } = req.body;

    //check if already registered:
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send('User already registered!');

    //encrypt the password for safety purposes:
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    //save the user details:
    await user.save();

    //creating token for the user session , and storing cookie:

    //clearing the previous session cookies of user:
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    //jwt tokens and http only cookies for auth process:
    const token = createToken(user._id.toString(), user.email, '7d');

    //date string for expiring in 7 days:
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    //sending the cookie from backend to the frontend:
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //logging in the user:
    const { email, password } = req.body;

    //check if not registered already:
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('User not registered!');
    }

    //check if password matches with encrypted pswd:
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send('Incorrect Password!');
    }

    //clearing the previous session cookies of user:
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    //jwt tokens and http only cookies for auth process:
    const token = createToken(user._id.toString(), user.email, '7d');

    //date string for expiring in 7 days:
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    //sending the cookie from backend to the frontend:
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get the user from local variables:
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send('User not registered or Token Malfunctioned..');
    }

    //user token check:
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Credentials didn't match..");
    }

    return res
      .status(200)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get the user from local variables:
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send('User not registered or Token Malfunctioned..');
    }

    //user token check:
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Credentials didn't match..");
    }

    //clear the user cookie to logout:
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    return res
      .status(200)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};
