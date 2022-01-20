<template>
  <a-drawer
    title="Project Info"
    :width="720"
    :visible="isUserFormOpen"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form
      ref="formRef"
      :model="userForm"
      :rules="rules"
      layout="vertical"
      @finish="handleSubmitChangePass"
    >
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="ID" name="ID">
            <a-input
              v-model:value="userForm.ID"
              placeholder="Please enter ID"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="ProjectName" name="ProjectName">
            <a-input
              v-model:value="userForm.ProjectName"
              placeholder="Please enter Project Name"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="Code" name="Code">
            <a-input
              v-model:value="userForm.Code"
              placeholder="Please enter code"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Customer" name="Customer">
            <a-input
              v-model:value="userForm.Customer"
              placeholder="Please enter customer"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="Start" name="Start">
            <a-date-picker
              v-model:value="userForm.Start"
              placeholder="Please enter start date"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="End" name="End">
            <a-date-picker
              v-model:value="userForm.Start"
              placeholder="Please enter end date"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Description" name="Description">
            <a-input
              v-model:value="userForm.Description"
              placeholder="Please enter description"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24" style="text-align: center">
          <a-button type="primary" html-type="submit" @click="handleAdd">
            Submit</a-button
          >
          <a-button style="margin-left: 10px" @click="resetForm">
            Reset</a-button
          >
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      userForm: {},
      rules: {
        ID: [
          {
            required: true,
            message: "Please input ID",
            trigger: "change",
          },
        ],
        ProjectName: [
          {
            required: true,
            message: "Please input Project Name",
            trigger: "change",
          },
        ],
        Code: [
          {
            required: true,
            message: "Please input code",
            trigger: "change",
          },
        ],
        Customer: [
          {
            required: true,
            message: "Please input customer",
            trigger: "change",
          },
        ],
        Description: [
          {
            required: true,
            message: "Please input description",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("user", ["isUserFormOpen"]),
  },
  watch: {
    isUserFormOpen: function () {
      this.userForm = {};
    },
  },
  methods: {
    onClose: function () {
      this.setUserFormStatus(false);
    },
    resetForm: function () {
      this.$refs.formRef.resetFields();
    },
    handleAdd() {
      const { data } = this;
      const newData = {
        ID: 8,
        ProjectName: "CONVERS",
        Code: "123G",
        Customer: "Gray",
        Start: "08/03/2022",
        End: "12/05/2022",
        Description: "Slovakia's Project",
      };
      this.dataSource = [...data, newData];
      // this.count = count + 1;
    },
    ...mapMutations("user", ["setUserFormStatus"]),
    ...mapActions("user", ["createUser"]),
  },
};
</script>
<style scoped></style>
