import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const ApiService = {
    

    async getUsersAuth() {
        try {
            const response = await apiClient.get('/users');
            return response.data;
        }
        catch(error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    async postUsersRegister(username: string, login: string, password: string) {
        try {
          const response = await apiClient.post('/users', {
            username,
            login,
            password
          });
          return response.data;
        }
        catch(error) {
          console.error('Error registering user:', error);
          throw error;
        }
      },

    async getAllExpense() {
        try {
            const response = await apiClient.get('/expenses');
            return response.data;
        }
        catch(error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }
    },

}