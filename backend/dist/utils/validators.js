import { body, validationResult } from 'express-validator';
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const errors = await validation.run(req);
            if (!errors.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body('email').trim().isEmail().withMessage('Email is required'),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password should contain at least 6 characters.'),
];
export const signupValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body('message').notEmpty().withMessage('Message is required'),
];
//# sourceMappingURL=validators.js.map