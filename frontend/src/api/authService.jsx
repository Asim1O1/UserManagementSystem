import axios from "axios";

import { BASE_URL } from "../../Base_Url.js"

const authService = {
  register: async (formData) => {
    const response = await axios.post(`${BASE_URL}users/register`, formData);
    {
        return response?.data
    }
  },
};

export default authService;
