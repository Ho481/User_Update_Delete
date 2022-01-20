// import UserApi from "@/apis/v1/user";
import UserApi from "../../apis/v1/user";

export default {
  namespaced: true,
  state() {
    return {
      userList: [],
      isSearchChing: false,
      searchParams: {},
      isInfoDrawerOpen: false,
      isUserFormOpen: false,
      isUserEditOpen: false,
      isUserDeleteOpen: false,
      isCreateUser: true,
      isEditUser: true,
      isDeleteUser: true,
      isCreateUpdateUserSuccess: false,
      isSubmitCreateUpdateUser: false,
      isUpdateUserSuccess: false,
      isDeleteUserSuccess: false,
      isSubmitUpdateUser: false,
      isSubmitDeleteUser: false,
      selectedUser: {},
      userEdit: {},
      
    };
  },
  mutations: {
    setUserList: function (state, val = []) {
      state.userList = val;
    },
    setSearchingStatus: function (state, val) {
      state.isSearchChing = val;
    },
    setSearchParams: function (state, val) {
      state.searchParams = val;
    },
    setInfoDrawerStatus: function (state, val) {
      state.isInfoDrawerOpen = val;
    },
    setUserFormStatus: function (state, val) {
      state.isUserFormOpen = val;
      if (!val) {
        state.isCreateUpdateUserSuccess = false;
      }
    },
    setUserEditStatus: function (state, val) {
      state.isUserEditOpen = val;
      if (!val) {
        state.isUpdateUserSuccess = false;
      }
    },
    setUserDeleteStatus: function (state, val) {
      state.isUserDeleteOpen = val;
      if (!val) {
        state.isDeleteUserSuccess = false;
      }
    },
    setCreateUserStatus: function (state, val) {
      state.isCreateUser = val;
    },
    setSelectedUser: function (state, id) {
      state.selectedUser = state.userList.find((user) => user.id === id);
    },
    setuserEdit: function (state, id) {
      state.selectedUser = state.userList.find((user) => user.id === id);
    },
    setFormSubmittingStatus: function (state, val) {
      state.setFormSubmittingStatus = val;
    },
    setFormSubmittingStatusEdit: function (state, val) {
      state.setFormSubmittingStatusEdit = val;
    },
    setFormSubmittingStatusDelete: function (state, val) {
      state.setFormSubmittingStatusDelete = val;
    },
    setCreateUpdateStatus: function (state, val) {
      state.isCreateUpdateUserSuccess = val;
    },
    setUpdateStatus: function (state, val) {
      state.isUpdateUserSuccess = val;
    },
    setDeleteStatus: function (state, val) {
      state.isDeleteUserSuccess = val;
    },
  },
  actions: {
    async searchUser({ commit, state }) {
      try {
        commit("setSearchingStatus", true);
        commit("setUserList");
        console.log(state.searchParams);
        const data = await UserApi.searchUser(state.searchParams);
        console.log(data);
        commit("setUserList", data.data.users);
      } finally {
        commit("setSearchingStatus", false);
      }
    },
    async createUser({ commit, dispatch }, userForm) {
      try {
        commit("setFormSubmittingStatus", true);
        console.log(userForm);
        const data = await UserApi.createUser(userForm);
        if (data.status == 200) {
          commit("setCreateUpdateStatus", true);
        }
        console.log(data);
        dispatch("searchUser");
      } finally {
        commit("setFormSubmittingStatus", false);
      }
    },
    async updateUser({ commit, dispatch }, userEdit) {
      try {
        commit("setFormSubmittingStatusEdit", true);
        console.log(userEdit);
        const data = await UserApi.updateUser(userEdit);
        if (data.status == 200) {
          commit("setUpdateStatus", true);
        }
        console.log(data);
        dispatch("searchUser");
      } finally {
        commit("setFormSubmittingStatusEdit", false);
      }
    },
    async deleteUser({ commit, dispatch }, userDelete) {
      try {
        commit("setFormSubmittingStatusDelete", true);
        console.log(userDelete);
        const data = await UserApi.deleteUser(userDelete);
        if (data.status == 200) {
          commit("setDeleteStatus", true);
        }
        console.log(data);
        dispatch("searchUser");
      } finally {
        commit("setFormSubmittingStatusDelete", false);
      }
    },
  },
  getters: {},
};
