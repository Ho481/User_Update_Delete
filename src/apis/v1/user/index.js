import axios from "@/apis/axios";
import qs from "qs";

export default {
  searchUser: (queryParams) => {
    return axios
      .get(`/api/v1/user?${qs.stringify(queryParams)}`)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  createUser: (userForm) => {
    return axios.post(
      "/api/v1/user",
      qs.stringify({
        user: {
          ...userForm,
        },
      })
    );
  },
  updateUser: (selectedUser) => {
    return axios.patch(
      "/api/v1/user/" + selectedUser.id,
      qs.stringify({
        user: {
          ...selectedUser,
        },
      })
    );
  },
  // updateUser: (UserID) => {
  //   return axios
  //     .patch(`/api/v1/user?${(UserID)}`)
  //     .then((response) => {
  //       console.log(response);
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // },
  deleteUser: (selectedUser) => {
    return axios.delete(
      "/api/v1/user/" + selectedUser.id,
      qs.stringify({
        user: {
          ...selectedUser,
        },
      })
    );
  },
};
