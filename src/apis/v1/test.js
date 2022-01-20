import axios from "@/apis/axios";

export default {
  fetchUsers: () => {
    return axios.get("/v1/users");
  },
};
