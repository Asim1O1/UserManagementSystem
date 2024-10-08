import axios from "axios"; // Make sure axios is imported
import { BASE_URL } from "../../Base_Url";

const token = localStorage.getItem("accessToken");

const UserProfileApi = {
  getUserProfile: async () => {
    try {
      const response = await axios.get(`${BASE_URL}users/userProfile`, {
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
        console.log("Entered the update user profile")
      const response = await axios.put(
        `${BASE_URL}users/updateUserProfile`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
