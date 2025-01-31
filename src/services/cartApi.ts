import axios from 'axios';

const API_URL = '/api/Cart'; // Adjust the URL to match your API endpoint

export const getCart = async (userId: string) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const addToCart = async (userId: string, productId: number, quantity: number) => {
  await axios.post(`${API_URL}/add`, [{ userId, productId, quantity }], {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const removeFromCart = async (userId: string, productId: number) => {
  await axios.delete(`${API_URL}/remove/${userId}/${productId}`);
};