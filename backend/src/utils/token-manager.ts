import jwt from 'jsonwebtoken';

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email }; //payload obj.
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token; //returns the token string;
};
