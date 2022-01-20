import axios from "@/apis/axios";
// import qs from "qs";

export default {
  change_password: (form) => {
    return axios
      .patch("/api/v1/user_profile/change_password", {
        user: { ...form },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
