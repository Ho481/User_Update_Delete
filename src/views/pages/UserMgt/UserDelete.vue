<template>
  <a-drawer
    title="User Delete"
    :width="720"
    :visible="isUserDeleteOpen"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form
      v-if="!isDeleteUserSuccess"
      :model="selectedUser"
      layout="vertical"
      @finish="handleSubmitDelete"
    >
      <a-descriptions
        :title="selectedUser.username"
        :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }"
        bordered
        :v-if="selectedUser != null && selectedUser.id != null"
      >
        <a-descriptions-item label="Account">{{
          selectedUser.username
        }}</a-descriptions-item>
        <a-descriptions-item label="Email">
          {{ selectedUser.email }}</a-descriptions-item
        >
        <a-descriptions-item label="Role">
          {{ selectedUser.role }}</a-descriptions-item
        >
        <a-descriptions-item label="Initial Password">{{
          selectedUser.selectedUser
        }}</a-descriptions-item>
        <a-row :gutter="16">
          <a-col :span="24" style="text-align: center">
            <p>Do you really want to delete this {{ selectedUser.username }}</p>
            <a-button
              type="danger"
              html-type="submit"
              :loading="isSubmitDeleteUser"
            >
              Yes</a-button
            >
            <a-button style="margin-left: 10px" @click="onClose"> No</a-button>
          </a-col>
        </a-row>
      </a-descriptions>

      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      </div>
    </a-form>
    <div v-if="isDeleteUserSuccess">
      <a-result status="success" title="Successfully delete!"></a-result>
    </div>
  </a-drawer>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", [
      "isUserDeleteOpen",
      "isSubmitDeleteUser",
      "isDeleteUserSuccess",
      "selectedUser",
    ]),
  },
  watch: {
    isUserDeleteOpen: function () {
      this.userDelete = {};
    },
  },
  methods: {
    onClose: function () {
      this.setUserDeleteStatus(false);
    },
    handleSubmitDelete: function () {
      this.deleteUser(this.selectedUser);
    },
    resetForm: function () {
      this.$refs.form.resetFields();
    },
    ...mapMutations("user", ["setUserDeleteStatus"]),
    ...mapActions("user", ["deleteUser"]),
  },
};
</script>
<style scoped></style>
