import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  //send a post request to the backend:
  const res = await axios.post('/user/login', { email, password });

  //if not OK:
  if (res.status !== 200) {
    throw new Error('Unable to login..');
  }

  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  //send a post request to the backend:
  const res = await axios.post('/user/signup', { name, email, password });

  //if not OK:
  if (res.status !== 201) {
    throw new Error('Unable to signup..');
  }

  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  //send a get request to the backend:
  const res = await axios.get('/user/auth-status');

  //if not OK:
  if (res.status !== 200) {
    throw new Error('Unable to authenticate..');
  }

  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  //send a post request to the backend:
  const res = await axios.post('/chat/new', { message });

  //if not OK:
  if (res.status !== 200) {
    throw new Error('Unable to send chat..');
  }

  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  //send a post request to the backend:
  const res = await axios.post('/chat/all-chats');

  //if not OK:
  if (res.status !== 200) {
    throw new Error('Unable to retreive old chats..');
  }

  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  //send a post request to the backend:
  const res = await axios.delete('/chat/delete');

  //if not OK:
  if (res.status !== 200) {
    throw new Error('Unable to delete chats..');
  }

  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  //send a post request to the backend:
  const res = await axios.get('/user/logout');

  //if not OK:
  if (res.status !== 200) {
    throw new Error('Unable to logout user..');
  }

  const data = await res.data;
  return data;
};
