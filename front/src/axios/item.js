import axios from "axios";

const base = "http://localhost:8000/api/v1/items";

export const getAllItems = async () => {
  const res = await axios.get(`${base}/`);
  return res;
};

export const getItem = async (id) => {
  const res = await axios.get(`${base}/${id}`);
  return res;
};

export const createItem = async (body) => {
  const res = await axios.post(`${base}`, body);
  return res;
};

export const updateItem = async (id, body) => {
  const res = await axios.put(`${base}/${id}`, body);
  return res;
};

export const deleteItem = async (id) => {
  const res = await axios.delete(`${base}/${id}`);
  return res;
};
