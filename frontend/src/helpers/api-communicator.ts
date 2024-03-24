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
