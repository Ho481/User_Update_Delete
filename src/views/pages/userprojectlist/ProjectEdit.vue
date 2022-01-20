<template>
  <a-drawer
    title="Project Info"
    :width="720"
    :visible="isProjectEditing"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form
      ref="formRef"
      :model="ProjectEdit"
      :rules="rules"
      layout="vertical"
      @finish="handleSubmitChangePass"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="ProjectName" name="Projectname">
            <a-input
              v-model:value="ProjectEdit.Projectname"
              placeholder="Please enter Project Name"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Code" name="code">
            <a-input
              v-model:value="ProjectEdit.code"
              placeholder="Please enter email"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Customer" name="customer">
            <a-input
              v-model:value="ProjectEdit.customer"
              placeholder="Please enter customer"
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
      ProjectEdit: {},
      rules: {
        id: [
          {
            required: true,
            message: "Please input Fsoft account",
            trigger: "change",
          },
        ],
        Projectname: [
          {
            required: true,
            message: "Please inputProject Name",
            trigger: "change",
          },
        ],
        code: [
          {
            required: true,
            message: "Please input code",
            trigger: "change",
          },
        ],
        customer: [
          {
            required: true,
            message: "Please input customer",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("user", ["isProjectEditing"]),
  },
  watch: {
    isProjectEditing: function () {
      this.ProjectEdit = {};
    },
  },
  methods: {
    onClose: function () {
      this.setIsEditing(false);
    },
    resetForm: function () {
      this.$refs.formRef.resetFields();
    },
    handleAdd() {
      const { count, rules } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`,
      };
      this.dataSource = [...rules, newData];
      this.count = count + 1;
    },
    ...mapMutations("user", ["setIsEditing"]),
    ...mapActions("user", ["createUser"]),
  },
};
</script>
<style scoped></style>
