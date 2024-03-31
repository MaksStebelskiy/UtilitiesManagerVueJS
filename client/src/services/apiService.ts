import axios from "axios";
import store from "@/store";

const apiClient = axios.create({
  baseURL: "http://192.168.28.244:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiService = {
  async getUsersAuth() {
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async postUsersRegister(username: string, login: string, password: string) {
    try {
      const response = await apiClient.post("/users", {
        username,
        login,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  async getAllExpense() {
    try {
      const currentUser = store.state.user;
      if (!currentUser) {
        throw new Error("User is not authenticated");
      }

      const { id, username, login } = currentUser;
      const response = await apiClient.get(
        `/expenses?id=${id}&username=${username}&login=${login}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error;
    }
  },
};
