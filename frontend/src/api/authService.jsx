import axios from "axios";

import { BASE_URL } from "../../Base_Url.js";

const authService = {

  register: async (formData) => {
    const response = await axios.post(`${BASE_URL}users/register`, formData);
    {
      return response?.data;
    }
  },

  login: async (authData) => {
    console.log("The auth data is ", authData);
    const response = await axios.post(`${BASE_URL}users/login`, authData);
    console.log("The response is ", response?.data);
    {
      return response;
    }
  },
};

export default authService;
