import axios from "axios"; // Make sure axios is imported
import { BASE_URL } from "../../Base_Url";

const token = localStorage.getItem("accessToken");

const UserProfileApi = {
  getUserProfile: async () => {
    try {
      const response = await axios.get(`${BASE_URL}users/getUserProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}users/updateUserProfile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error; 
    }
  },
};

export default UserProfileApi;
