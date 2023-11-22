import axios from "axios";

const apiKey = '39897326-f21002c92f1dc5a3c50660c6d';
const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: apiKey,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: perPage,
};

export const fetchImg = async (query, page) => {
  const response = await axios.get(`?q=${query}&page=${page}`);
  return response.data;
};