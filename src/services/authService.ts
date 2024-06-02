import api from './api';

interface LoginData {
  email: string;
  password: string;
}

 export const login = async (data: LoginData) => {
  const response = await api.post('/login', data);
  if (response.data.data.token) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('role', response.data.data.user.role); 
  }
  return response.data;
};

 const register = async (data: LoginData) => {
    const response = await api.post('/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role); 
    }
    return response.data;
  };

 const logout = async () => {
    const response = await api.post(`/logout`, {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
  
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    return response.data;
  
  };


export default {
    logout,
    login,
  };
