<template>
  <a-breadcrumb class="breadcrumb-margin">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>Users</a-breadcrumb-item>
    <a-breadcrumb-item>User List</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="">
    <a-collapse>
      <a-collapse-panel header="Search bar">
        <a-row :gutter="0">
          <a-col :span="24">
            <div class="gutter-box-search-bar">
              <a-form :model="searchForm" ref="formRef">
                <a-row :gutter="0" :style="{ width: '100%' }">
                  <a-col
                    :xs="formCol.xs"
                    :sm="formCol.sm"
                    :md="formCol.md"
                    :lg="formCol.lg"
                    :xl="formCol.xl"
                    :xxl="formCol.xxl"
                    class="search-item-group"
                  >
                    <a-row>
                      <a-col
                        :xs="titleCol.xs"
                        :sm="titleCol.sm"
                        :md="titleCol.md"
                        :lg="titleCol.lg"
                        :xl="titleCol.xl"
                        :xxl="titleCol.xxl"
                        class="search-item-label"
                        >Account:</a-col
                      >
                      <a-col
                        :xs="valCol.xs"
                        :sm="valCol.sm"
                        :md="valCol.md"
                        :lg="valCol.lg"
                        :xl="valCol.xl"
                        :xxl="valCol.xxl"
                      >
                        <a-input v-model:value="searchForm.username_cont" />
                      </a-col>
                    </a-row>
                  </a-col>

                  <a-col
                    :xs="formCol.xs"
                    :sm="formCol.sm"
                    :md="formCol.md"
                    :lg="formCol.lg"
                    :xl="formCol.xl"
                    :xxl="formCol.xxl"
                    class="search-item-group"
                  >
                    <a-row>
                      <a-col
                        :xs="titleCol.xs"
                        :sm="titleCol.sm"
                        :md="titleCol.md"
                        :lg="titleCol.lg"
                        :xl="titleCol.xl"
                        :xxl="titleCol.xxl"
                        class="search-item-label"
                        >Email:</a-col
                      >
                      <a-col
                        :xs="valCol.xs"
                        :sm="valCol.sm"
                        :md="valCol.md"
                        :lg="valCol.lg"
                        :xl="valCol.xl"
                        :xxl="valCol.xxl"
                      >
                        <a-input v-model:value="searchForm.email_cont" />
                      </a-col>
                    </a-row>
                  </a-col>

                  <a-col
                    :xs="formCol.xs"
                    :sm="formCol.sm"
                    :md="formCol.md"
                    :lg="formCol.lg"
                    :xl="formCol.xl"
                    :xxl="formCol.xxl"
                    class="search-item-group"
                  >
                    <a-row>
                      <a-col
                        :xs="titleCol.xs"
                        :sm="titleCol.sm"
                        :md="titleCol.md"
                        :lg="titleCol.lg"
                        :xl="titleCol.xl"
                        :xxl="titleCol.xxl"
                        class="search-item-label"
                        >Role:</a-col
                      >
                      <a-col
                        :xs="valCol.xs"
                        :sm="valCol.sm"
                        :md="valCol.md"
                        :lg="valCol.lg"
                        :xl="valCol.xl"
                        :xxl="valCol.xxl"
                      >
                        <a-input v-model:value="searchForm.role_cont" />
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-form>
            </div>
          </a-col>
          <a-col :span="24">
            <div class="search-button-bar">
              <a-button
                type="primary"
                html-type="submit"
                :loading="isSearchChing"
                @click="handleSearchSubmit"
              >
                Submit</a-button
              >
              <a-button style="margin-left: 10px" @click="resetForm">
                Reset</a-button
              >
            </div>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
  </div>

  <div style="margin-top: 15px">
    <a-row :gutter="0">
      <a-col :span="24">
        <div class="gutter-box">
          <a-button
            class="user-add-btn"
            type="primary"
            @click="onOpenCreateUserForm"
            style="margin-bottom: 8px"
          >
            <template #icon><UserAddOutlined /></template>
          </a-button>

          <user-table></user-table>
        </div>
      </a-col>
    </a-row>
  </div>
  <div>
    <user-info></user-info>
  </div>
  <div>
    <user-form></user-form>
  </div>
  <div>
    <user-edit></user-edit>
  </div>
  <div>
    <user-delete></user-delete>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import UserTable from "./UserTable.vue";
import UserInfo from "./UserInfo.vue";
import UserForm from "./UserForm.vue";
import UserEdit from "./UserEdit.vue";
import UserDelete from "./UserDelete.vue";
import { UserAddOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    UserTable,
    UserInfo,
    UserForm,
    UserEdit,
    UserDelete,
    UserAddOutlined,
  },
  data() {
    return {
      titleCol: { xs: 12, sm: 12, md: 12, lg: 10, xl: 8, xxl: 8 },
      valCol: { xs: 12, sm: 12, md: 12, lg: 14, xl: 16, xxl: 16 },
      formCol: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 8,
        xl: 6,
        xxl: 6,
      },
      searchForm: {
        username_cont: "",
        email_cont: "",
        role_cont: "",
      },
    };
  },
  computed: {
    ...mapState("user", ["isSearchChing"]),
  },
  methods: {
    resetForm: function () {
      this.searchForm = {
        username_cont: "",
        email_cont: "",
        role_cont: "",
      };
    },
    onOpenCreateUserForm: function () {
      this.setCreateUserStatus(true);
      this.setUserFormStatus(true);
    },
    handleSearchSubmit: async function () {
      console.log("submit");
      this.setSearchParams({
        page: 1,
        items: 10,
        query: { ...this.searchForm },
      });
      this.searchUser();
    },
    ...mapActions("user", ["searchUser"]),
    ...mapMutations("user", [
      "setSearchParams",
      "setCreateUserStatus",
      "setUserFormStatus",
    ]),
  },
};
</script>
<style scoped>
.account-center {
  text-align: center;
}
.user-account {
  font-size: 2rem;
}
.search-item {
  display: flex;
}
.search-item-label {
  margin: auto;
  text-align: right;
  padding-right: 5px;
}
.search-item-group {
  padding: 5px;
}
.user-add-btn {
  margin-bottom: 8px;
}
</style>
