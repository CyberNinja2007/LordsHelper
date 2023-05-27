import axios from "axios";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

export async function getAll(token) {
  try {
    const response = await axios.get(`${API_URL}/bots`, {
      headers: { "Authorization": token },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function create(token) {
  try {
    const response = await axios.post(`${API_URL}/bots`, {
      headers: { authorization: token },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function deleteOne(id, token) {
  try {
    const response = await axios.post(`${API_URL}/bots/${id}`, {
      headers: { authorization: token },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}
