import jwt from 'jsonwebtoken';
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email }; //payload obj.
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token; //returns the token string;
};
//# sourceMappingURL=token-manager.js.map