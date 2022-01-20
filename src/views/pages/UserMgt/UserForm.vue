<template>
  <a-drawer
    title="User Info"
    :width="720"
    :visible="isUserFormOpen"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form
      v-if="!isCreateUpdateUserSuccess"
      ref="formRef"
      :model="userForm"
      :rules="rules"
      layout="vertical"
      @finish="handleSubmitChangePass"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Account" name="username">
            <a-input
              v-model:value="userForm.username"
              placeholder="Please enter Fsoft account"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Email" name="email">
            <a-input
              v-model:value="userForm.email"
              placeholder="Please enter Fsoft email"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Password" name="password">
            <a-input
              v-model:value="userForm.password"
              type="password"
              autocomplete="off"
              placeholder="Please enter password"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Confirm Password" name="confirm_password">
            <a-input
              v-model:value="userForm.confirm_password"
              type="password"
              autocomplete="off"
              placeholder="Please enter password again"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Role" name="role">
            <a-select
              ref="select"
              v-model:value="userForm.role"
              :options="roleList"
            >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24" style="text-align: center">
          <a-button
            type="primary"
            html-type="submit"
            :loading="isSubmitCreateUpdateUser"
          >
            Submit</a-button
          >
          <a-button style="margin-left: 10px" @click="resetForm">
            Reset</a-button
          >
        </a-col>
      </a-row>
    </a-form>
    <div v-if="isCreateUpdateUserSuccess">
      <a-result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      ></a-result>
    </div>
  </a-drawer>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      userForm: {},
      roleList: [
        { value: "pm", label: "PM" },
        { value: "manager", label: "Manager" },
        { value: "presaler", label: "Presaler" },
      ],
      rules: {
        username: [
          {
            required: true,
            message: "Please input Fsoft account",
            trigger: "change",
          },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Please input Fsoft email",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input the password",
            trigger: "change",
          },
        ],
        confirm_password: [
          { validator: this.validateConfirmPass, trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapState("user", [
      "isUserFormOpen",
      "isSubmitCreateUpdateUser",
      "isCreateUpdateUserSuccess",
    ]),
  },
  watch: {
    isUserFormOpen: function () {
      this.userForm = {};
    },
  },
  methods: {
    validateConfirmPass(rule, value) {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== this.userForm.password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    },
    onClose: function () {
      this.setUserFormStatus(false);
    },
    handleSubmitChangePass: function () {
      this.createUser(this.userForm);
    },
    resetForm: function () {
      this.$refs.formRef.resetFields();
    },
    ...mapMutations("user", ["setUserFormStatus"]),
    ...mapActions("user", ["createUser"]),
  },
};
</script>
<style scoped></style>
