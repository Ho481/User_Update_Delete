<template>
  <a-breadcrumb class="breadcrumb-margin">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>Profile</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="">
    <a-row :gutter="8">
      <a-col :span="6">
        <div class="gutter-box">
          <div v-if="currentUser">
            <div class="account-center">
              <a-avatar :size="100">
                <template #icon><UserOutlined /></template>
              </a-avatar>
              <div class="user-account">{{ currentUser.username }}</div>
              {{ currentUser.email }}
            </div>
            <a-divider>
              <InfoCircleOutlined />
            </a-divider>

            <div>
              <a-row :gutter="1">
                <a-col
                  :xs="titleCol.xs"
                  :sm="titleCol.sm"
                  :md="titleCol.md"
                  :lg="titleCol.lg"
                  :xl="titleCol.xl"
                  :xxl="titleCol.xxl"
                >
                  Role:
                </a-col>
                <a-col
                  :xs="valCol.xs"
                  :sm="valCol.sm"
                  :md="valCol.md"
                  :lg="valCol.lg"
                  :xl="valCol.xl"
                  :xxl="valCol.xxl"
                  class="info-value"
                >
                  {{ currentUser.role }}
                </a-col>

                <a-col
                  :xs="titleCol.xs"
                  :sm="titleCol.sm"
                  :md="titleCol.md"
                  :lg="titleCol.lg"
                  :xl="titleCol.xl"
                  :xxl="titleCol.xxl"
                >
                  Created Date:
                </a-col>
                <a-col
                  :xs="valCol.xs"
                  :sm="valCol.sm"
                  :md="valCol.md"
                  :lg="valCol.lg"
                  :xl="valCol.xl"
                  :xxl="valCol.xxl"
                  class="info-value"
                >
                  {{ moment(currentUser.created_at).format("MMM DD YYYY") }}
                </a-col>

                <a-col
                  :xs="titleCol.xs"
                  :sm="titleCol.sm"
                  :md="titleCol.md"
                  :lg="titleCol.lg"
                  :xl="titleCol.xl"
                  :xxl="titleCol.xxl"
                >
                  Updated Date:
                </a-col>
                <a-col
                  :xs="valCol.xs"
                  :sm="valCol.sm"
                  :md="valCol.md"
                  :lg="valCol.lg"
                  :xl="valCol.xl"
                  :xxl="valCol.xxl"
                  class="info-value"
                >
                  {{ moment(currentUser.created_at).format("MMM DD YYYY") }}
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="18">
        <div class="gutter-box">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1">
              <template #tab>
                <span>
                  <LockOutlined />
                  Password
                </span>
              </template>
              <div>
                <a-row type="flex" justify="center">
                  <a-col :span="12">
                    <div class="alert-box">
                      <a-alert
                        type="success"
                        class="alert-message-margin"
                        v-if="successMessages.length > 0"
                      >
                        <template #message>
                          <ul>
                            <li
                              v-for="message_content in successMessages"
                              :key="message_content"
                            >
                              {{ message_content }}
                            </li>
                          </ul>
                        </template>
                      </a-alert>

                      <a-alert
                        type="error"
                        class="alert-message-margin"
                        v-if="errorMessages.length > 0"
                      >
                        <template #message>
                          <ul>
                            <li
                              v-for="message_content in errorMessages"
                              :key="message_content"
                            >
                              {{ message_content }}
                            </li>
                          </ul>
                        </template>
                      </a-alert>
                    </div>
                    <a-form
                      ref="formRef"
                      :model="newPasswordForm"
                      :label-col="labelCol"
                      :wrapper-col="wrapperCol"
                      :rules="rules"
                      @finish="handleSubmitChangePass"
                      @keyup.enter="handleSubmitChangePass"
                      @finishFailed="handleSubmitChangePassFailed"
                    >
                      <a-form-item
                        has-feedback
                        ref="password"
                        label="Current Password"
                        name="password"
                      >
                        <a-input
                          type="password"
                          autocomplete="off"
                          v-model:value="newPasswordForm.password"
                        />
                      </a-form-item>

                      <a-form-item
                        has-feedback
                        ref="new_password"
                        label="New Password"
                        name="new_password"
                      >
                        <a-input
                          type="password"
                          autocomplete="off"
                          v-model:value="newPasswordForm.new_password"
                        />
                      </a-form-item>

                      <a-form-item
                        has-feedback
                        ref="confirm_password"
                        label="Confirm Password"
                        name="confirm_password"
                      >
                        <a-input
                          type="password"
                          autocomplete="off"
                          v-model:value="newPasswordForm.confirm_password"
                        />
                      </a-form-item>

                      <a-form-item :wrapper-col="{ span: 16, offset: 6 }">
                        <a-button
                          type="primary"
                          html-type="submit"
                          :loading="isFormSubmitting"
                        >
                          Submit</a-button
                        >
                        <a-button style="margin-left: 10px" @click="resetForm">
                          Reset</a-button
                        >
                      </a-form-item>
                    </a-form>
                  </a-col>
                </a-row>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <span>
                  <RadarChartOutlined />
                  Skills
                </span>
              </template>
              Tab 2
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import {
  UserOutlined,
  InfoCircleOutlined,
  LockOutlined,
  RadarChartOutlined,
} from "@ant-design/icons-vue";
import { mapState } from "vuex";
import moment from "moment";
import UserProfileApi from "@/apis/v1/userProfile";

export default {
  components: {
    UserOutlined,
    InfoCircleOutlined,
    LockOutlined,
    RadarChartOutlined,
  },
  data() {
    return {
      activeKey: "1",
      newPasswordForm: {
        password: "",
        new_password: "",
        confirm_password: "",
      },
      labelCol: { xs: 12, sm: 12, md: 12, lg: 11, xl: 10, xxl: 8 },
      wrapperCol: { xs: 12, sm: 12, md: 12, lg: 13, xl: 14, xxl: 16 },
      titleCol: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
      valCol: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
      rules: {
        password: [
          {
            required: true,
            message: "Please input the password",
            trigger: "change",
          },
        ],
        new_password: [
          { required: true, validator: this.validatePass, trigger: "change" },
        ],
        confirm_password: [
          { validator: this.validateConfirmPass, trigger: "change" },
        ],
      },
      errorMessages: [],
      successMessages: [],
      isFormSubmitting: false,
    };
  },
  methods: {
    moment() {
      return moment();
    },
    validatePass(rule, value) {
      if (value === "") {
        return Promise.reject("Please input the current password");
      } else {
        if (this.newPasswordForm.new_password !== "") {
          this.$refs.formRef.validateFields("New Password");
        }
        return Promise.resolve();
      }
    },
    validateConfirmPass(rule, value) {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== this.newPasswordForm.new_password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    },
    resetForm() {
      this.successMessages = [];
      this.errorMessages = [];
      this.$refs.formRef.resetFields();
    },
    handleSubmitChangePass: async function () {
      this.successMessages = [];
      this.errorMessages = [];
      try {
        this.isFormSubmitting = true;
        const result = await UserProfileApi.change_password(
          this.newPasswordForm
        );
        this.successMessages = result.messages;
      } catch (err) {
        this.errorMessages = ["Change password failed"];
      } finally {
        this.isFormSubmitting = false;
      }
    },
    handleSubmitChangePassFailed() {},
  },
  computed: {
    ...mapState(["currentUser"]),
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
.info-value {
  text-align: right;
  font-weight: 600;
}
</style>
