import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const ApiService = {
    //Отримати витрати з сервера
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