import User from '../models/User.js';
import { configureOpenAI } from '../config/openai-config.js';
import { OpenAIApi } from 'openai';
export const generateChatCompletion = async (req, res, next) => {
    //get the message from the user:
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: 'User not registered or token malfunctioned..' });
        }
        //grab chats of user for the context of the conversation:
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });
        //send all the chats with the new one to the api:
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        //get latest response:
        const chatResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'openai server error..' });
    }
};
export const sendChatsToUser = async (req, res, next) => {
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
        return res.status(200).json({ message: 'OK', chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
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
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: 'OK' });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map