<template>
  <div class="gutter-box">
    <a-row :gutter="[16, 16]">
      <a-col :span="16"><p class="all-project-text">All project</p></a-col>
      <a-col :span="4"
        ><a-button type="primary" disabled class="btn-edit-project">
          Edit
        </a-button></a-col
      >
      <a-col :span="4">
        <a-button
          type="primary"
          class="btn-new-project"
          @click="onOpenCreateUserForm"
        >
          New Project
        </a-button>
      </a-col>
    </a-row>
  </div>
  <div class="project-header">
    <div class="gutter-box">
      <a-collapse>
        <a-collapse-panel header="Search bar">
          <a-row :gutter="0">
            <a-col :span="24">
              <a-row :gutter="0" style="width: 100%">
                <a-col
                  :xs="formCol.xs"
                  :sm="formCol.sm"
                  :md="formCol.md"
                  :lg="formCol.lg"
                  :xl="formCol.xl"
                  :xxl="formCol.xxl"
                  class="search-item-group"
                >
                  <a-row :gutter="0">
                    <a-col
                      :xs="titleCol.xs"
                      :sm="titleCol.sm"
                      :md="titleCol.md"
                      :lg="titleCol.lg"
                      :xl="titleCol.xl"
                      :xxl="titleCol.xxl"
                      class="search-item-label"
                      >ID:</a-col
                    >
                    <a-col
                      :xs="valCol.xs"
                      :sm="valCol.sm"
                      :md="valCol.md"
                      :lg="valCol.lg"
                      :xl="valCol.xl"
                      :xxl="valCol.xxl"
                    >
                      <a-input v-model:value="searchForm.id_cont" />
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
                  <a-row :gutter="0">
                    <a-col
                      :xs="titleCol.xs"
                      :sm="titleCol.sm"
                      :md="titleCol.md"
                      :lg="titleCol.lg"
                      :xl="titleCol.xl"
                      :xxl="titleCol.xxl"
                      class="search-item-label"
                      >Project:</a-col
                    >
                    <a-col
                      :xs="valCol.xs"
                      :sm="valCol.sm"
                      :md="valCol.md"
                      :lg="valCol.lg"
                      :xl="valCol.xl"
                      :xxl="valCol.xxl"
                    >
                      <a-input v-model:value="searchForm.project_cont" />
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
                  <a-row :gutter="0">
                    <a-col
                      :span="24"
                      style="text-align: center"
                      class="search-item-add"
                    >
                      <a-button type="primary" @click="onOpenCreateUserForm">
                        <PlusOutlined />
                        New project
                      </a-button>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24">
              <div class="search-button-bar">
                <a-button
                  type="primary"
                  html-type="submit"
                  :loading="isFormSubmitting"
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
  </div>
  <div class="project-details">
    <a-collapse>
      <a-collapse-panel header="Project Details">
        <div class="gutter-box">
          <a-row :gutter="8">
            <a-row :gutter="[16, 16]">
              <!-- <a-col :span="4">
                <label class="search-label">Search Project</label>
                <a-input-search
                  placeholder="input search text"
                  size="large"
                  class="search-text"
                  @search="onSearch"
                >
                </a-input-search>
              </a-col> -->
              <a-col :span="13"
                ><label class="category-label">Category</label>
                <div class="category-text">
                  <a-select
                    default-value="All"
                    style="width: 120px"
                    @change="handleChange"
                  >
                    <a-select-option value="New"> New </a-select-option>
                    <a-select-option value="Sales"> Sales </a-select-option>
                    <a-select-option value="Used"> Used </a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="6">
                <label class="From-Date-label">From Date</label>
                <a-space direction="vertical" class="From-Date">
                  <a-date-picker
                    v-model:value="startValue"
                    :disabled-date="disabledStartDate"
                    placeholder="Start Date"
                    @openChange="handleStartOpenChange"
                  />
                </a-space>
              </a-col>
              <a-col :span="5"
                ><label class="Date-label">Date</label>
                <a-space direction="vertical" class="Date">
                  <a-date-picker
                    v-model:value="endValue"
                    :disabled-date="disabledEndDate"
                    placeholder="End Date"
                    :open="endOpen"
                    @openChange="handleEndOpenChange"
                  />
                </a-space>
              </a-col>
            </a-row>
          </a-row>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
  <div class="gutter-box">
    <a-row :gutter="18">
      <a-col :span="24">
        <a-table :columns="columns" :data-source="data">
          <template #action="{ record }">
            <span>
              <a-button @click="onOpenUserInfo(record.ID)">
                <template #icon><InfoCircleOutlined /></template>
              </a-button>
              <a-button type="primary" class="action-btn" @click="showModal">
                <a-modal
                  title="Title"
                  :visible="visible"
                  @ok="() => onEdit(record)"
                  @cancel="handleCancel"
                >
                  <a-col :span="8">
                    <a-form-item label="ProjectName" name="ProjectName">
                      <a-input
                        v-model:value="userForm.ProjectName"
                        placeholder="Please enter Project Name"
                      />
                    </a-form-item>
                  </a-col>
                </a-modal>
                <template #icon><FormOutlined /></template>
              </a-button>
              <!-- <a-popconfirm
                v-if="dataSource.length"
                title="Sure to delete?"
                @confirm="() => onDelete(record.key)"
              > -->
              <a-popconfirm
                title="Are you sure delete this project?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="() => onDelete(record)"
                @cancel="cancel"
              >
                <a-button type="danger" class="action-btn">
                  <template #icon><DeleteOutlined /></template>
                </a-button>
              </a-popconfirm>

              <!-- </a-popconfirm> -->
            </span>
          </template>
        </a-table>
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
    <project-edit></project-edit>
  </div>
</template>
<script>
import {
  InfoCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
import { mapState, mapMutations } from "vuex";
import { mapActions } from "vuex";
import UserInfo from "./Projectinfo.vue";
import UserForm from "./ProjectAdd.vue";
import ProjectEdit from "./ProjectEdit.vue";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
    sorter: true,
    slots: { title: "ID", customRender: "ID" },
  },
  {
    title: "ProjectName",
    dataIndex: "ProjectName",
    key: "ProjectName",
    sorter: true,
    slots: { title: "ProjectName", customRender: "ProjectName" },
  },
  {
    title: "Code",
    dataIndex: "Code",
    key: "Code",
  },
  {
    title: "Customer",
    key: "Customer",
    dataIndex: "Customer",
  },
  {
    title: "Start",
    key: "Start",
    dataIndex: "Start",
  },
  {
    title: "End",
    key: "End",
    dataIndex: "End",
  },
  {
    title: "Description",
    key: "Description",
    dataIndex: "Description",
  },
  {
    title: "Action",
    key: "action",
    slots: { customRender: "action" },
    width: "20%",
    align: "center",
  },
];

const data = [
  {
    ID: 1,
    ProjectName: "Anana",
    Code: "123A",
    Customer: "David",
    Start: "12/02/2022",
    End: "12/03/2022",
    Description: "Slovakia's Project",
  },
  {
    ID: 2,
    ProjectName: "Addia",
    Code: "123B",
    Customer: "Mr.Lee",
    Start: "12/03/2022",
    End: "12/04/2022",
    Description: "Slovakia's Project",
  },
  {
    ID: 3,
    ProjectName: "Nik",
    Code: "123C",
    Customer: "Peter",
    Start: "11/02/2022",
    End: "23/03/2022",
    Description: "Slovakia's Project",
  },
  {
    ID: 4,
    ProjectName: "MLBB",
    Code: "123D",
    Customer: "Mie",
    Start: "17/02/2022",
    End: "17/03/2022",
    Description: "Slovakia's Project",
  },
  {
    ID: 5,
    ProjectName: "PUM",
    Code: "123E",
    Customer: "David",
    Start: "12/02/2022",
    End: "12/03/2022",
    Description: "Slovakia's Project",
  },
  {
    ID: 6,
    ProjectName: "BIT",
    Code: "123F",
    Customer: "Leo",
    Start: "15/02/2022",
    End: "24/03/2022",
    Description: "Slovakia's Project",
  },
  {
    ID: 7,
    ProjectName: "CONVERS",
    Code: "123G",
    Customer: "Gray",
    Start: "08/03/2022",
    End: "12/05/2022",
    Description: "Slovakia's Project",
  },
];
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    InfoCircleOutlined,
    DeleteOutlined,
    FormOutlined,
    UserInfo,
    UserForm,
    ProjectEdit,
  },
  data() {
    return {
      data,
      columns,
      searchForm: {
        id_cont: "",
        project_cont: "",
      },
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
    };
  },
  computed: {
    ...mapState("user", ["userList", "searchParams"]),
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    onSearch(value) {
      console.log(value);
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    onClose() {
      this.visible = false;
    },
    onDelete(record) {
      const data = [...this.data];
      this.data = data.filter((project) => project.ID !== record.ID);
    },
    handleTableChange: function (page, filters, sorter) {
      console.log(sorter);
      console.log(this.searchParams);
    },
    resetForm: function () {
      this.searchForm = {
        id_cont: "",
        project_cont: "",
      };
    },
    onEdit(record) {
      const newData = [...this.data];
      const target = newData.filter((project) => project.ID === record.ID)[0];
      this.editingKey = record.ID;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    onOpenCreateUserForm: function () {
      this.setCreateUserStatus(true);
      this.setUserFormStatus(true);
    },
    onOpenUserInfo(record) {
      this.setSelectedUser(record);
      this.setInfoDrawerStatus(true);
    },
    handleSearchSubmit: async function () {
      console.log("submit");
      this.setSearchParams({
        page: 1,
        items: 1,
        query: { ...this.searchForm },
      });
      this.searchUser();
    },
    ...mapActions("user", ["searchUser"]),
    ...mapMutations("user", [
      "setSearchParams",
      "setCreateUserStatus",
      "setUserFormStatus",
      "setSelectedUser",
      "setInfoDrawerStatus",
      "setIsEditing",
      "setEditingProject",
    ]),
  },

  setup() {
    const startValue = ref();
    const endValue = ref();
    const endOpen = ref(false);

    const disabledStartDate = (startValue) => {
      if (!startValue || !endValue.value) {
        return false;
      }

      return startValue.valueOf() > endValue.value.valueOf();
    };

    const disabledEndDate = (endValue) => {
      if (!endValue || !startValue.value) {
        return false;
      }

      return startValue.value.valueOf() >= endValue.valueOf();
    };

    const handleStartOpenChange = (open) => {
      if (!open) {
        endOpen.value = true;
      }
    };

    const handleEndOpenChange = (open) => {
      endOpen.value = open;
    };

    return {
      startValue,
      endValue,
      endOpen,
      disabledStartDate,
      disabledEndDate,
      handleStartOpenChange,
      handleEndOpenChange,
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

      // moment,
    };
  },
});
</script>
<style lang="css" scoped>
.gutter-box {
  background-color: white;
  margin-top: 20px;
}

.all-project-text {
  font-weight: 700;
  margin-left: 15px;
  margin-top: 15px;
}
.btn-edit-project {
  font-weight: 300;
  margin-left: 89px;
  margin-top: 15px;
}
.btn-new-project {
  font-weight: 700;
  margin-top: 15px;
}

.search-label {
  font-weight: 700;
  margin-left: 10px;
}
.search-text {
  border-radius: 5px;
  margin-left: 10px;
  width: 240px;
}

.category-label {
  font-weight: 700;
  margin-left: 30px;
}
.category-text {
  margin-left: 30px;
  margin-bottom: 15px;
}
.From-Date-label {
  margin-left: 80px;
  font-weight: 700;
}
.From-Date {
  margin-left: 80px;
  width: 120px;
  margin-bottom: 15px;
}
.Date-label {
  margin-right: 120px;
  font-weight: 700;
}
.Date {
  margin-right: 120px;
  width: 120px;
  margin-bottom: 15px;
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
.search-button-bar {
  margin: auto;
}
.search-item-add {
  margin-left: 220px;
}
</style>
