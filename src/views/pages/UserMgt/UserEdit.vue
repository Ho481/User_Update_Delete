<template>
  <a-drawer
    title="User Edit"
    :width="720"
    :visible="isUserEditOpen"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form
      v-if="!isUpdateUserSuccess"
      ref="form"
      :model="selectedUser"
      :rules="rules"
      layout="vertical"
      @finish="handleSubmit"
    >
      <a-descriptions
        :title="selectedUser.username"
        :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }"
        bordered
        :v-if="selectedUser != null && selectedUser.id != null"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Account" name="username">
              <a-input v-model:value="selectedUser.username" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Email" name="email">
              <a-input v-model:value="selectedUser.email" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Password" name="password">
              <a-input
                type="password"
                v-model:value="selectedUser.initial_password"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Role" name="role">
              <a-select
                ref="select"
                v-model:value="selectedUser.role"
                :options="roleList"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24" style="text-align: center">
            <a-button
              type="primary"
              html-type="submit"
              :loading="isSubmitUpdateUser"
            >
              Submit</a-button
            >
            <a-button style="margin-left: 10px" @click="resetForm">
              Reset</a-button
            >
          </a-col>
        </a-row>
      </a-descriptions>
    </a-form>
    <div v-if="isUpdateUserSuccess">
      <a-result status="success" title="Successfully update!"></a-result>
    </div>
  </a-drawer>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      roleList: [
        { value: "pm", label: "PM" },
        { value: "manager", label: "Manager" },
        { value: "presaler", label: "Presaler" },
      ],
      rules: {
        confirm_password: [
          { validator: this.validateConfirmPass, trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapState("user", [
      "isUserEditOpen",
      "isSubmitUpdateUser",
      "isUpdateUserSuccess",
      "selectedUser",
    ]),
  },
  watch: {
    isUserEditOpen: function () {
      this.userEdit = {};
    },
  },
  methods: {
    validateConfirmPass(rule, value) {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== this.selectedUser.initial_password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    },
    onClose: function () {
      this.setUserEditStatus(false);
    },
    handleSubmit: function () {
      this.updateUser(this.selectedUser);
    },
    resetForm: function () {
      this.$refs.form.resetFields();
    },
    ...mapMutations("user", ["setUserEditStatus"]),
    ...mapActions("user", ["updateUser"]),
  },
};
</script>
<style scoped></style>
