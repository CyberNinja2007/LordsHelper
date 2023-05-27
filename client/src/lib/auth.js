import axios from "axios";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

export async function register(userData) {
  try {
    const response = await axios.post(`${API_URL}/user/registration`, userData);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function login(userData) {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userData);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function auth(token) {
    try {
      const response = await axios.get(`${API_URL}/user/auth`, {headers: {'Authorization': token}});
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
}

export async function refresh(token) {
    try {
      const response = await axios.get(`${API_URL}/user/refresh`, {headers: {'Authorization': token}});
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
}

export async function logout(token) {
  try {
    const response = await axios.get(`${API_URL}/user/logout`, {headers: {'Authorization': token}});
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    return error.response.data;
  }
  // Delete access and refresh tokens
  //deleteCookie('access');
  //deleteCookie('refresh');

}
