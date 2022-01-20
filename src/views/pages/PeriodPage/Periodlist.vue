/* eslint-disable prettier/prettier */
<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="gutter-box">
        <div class="Header">
          <a-layout-content class="Top-line">
            <a-breadcrumb separator="/">
              <a-breadcrumb-item>Home</a-breadcrumb-item>
              <a-breadcrumb-item href="">Period</a-breadcrumb-item>
              <a-breadcrumb-item href="">Period List</a-breadcrumb-item>
            </a-breadcrumb>
          </a-layout-content>
        </div>
        <div class="Top-content">
          <a-input-search
            class="Search"
            v-model:value="value"
            placeholder="input search text"
            enter-button="Search"
            size="large"
            style="width: 40%"
            @search="onSearch"
          />
        </div>
      </div>
      <div class="gutter-box">
        <div class="Toolbar">
          <a-space direction="horizontal">
            <a-date-picker
              v-model:value="startValue"
              :disabled-date="disabledStartDate"
              show-time
              placeholder="Start Date"
              @openChange="handleStartOpenChange"
            />
            <a-date-picker
              v-model:value="endValue"
              :disabled-date="disabledEndDate"
              show-time
              placeholder="End Date"
              :open="endOpen"
              @openChange="handleEndOpenChange"
            />
          </a-space>
          <div class="New-period">
            <a-button type="primary" @click="showDrawer">
              <PlusOutlined />
              New account
            </a-button>
            <a-drawer
              title="Create a new Period"
              :width="720"
              :visible="visible"
              :body-style="{ paddingBottom: '80px' }"
              @close="onClose"
            >
              <a-form :model="form" :rules="rules" layout="vertical">
                <div class="function-details">
                  <div class="common-info">
                    <div class="Top-create">
                      <a-h1 class="text">Name:</a-h1>
                      <a-input
                        size="small"
                        style="width: 60%"
                        v-model:value="nameVal"
                        placeholder="Input new period name"
                      >
                      </a-input>
                      <a-h1 class="text">Manager:</a-h1>
                      <a-select
                        v-model:value="value"
                        label-in-value
                        size="small"
                        style="width: 20%"
                        :options="options"
                        @change="handleChange"
                      >
                      </a-select>
                    </div>
                    <a-h1 class="text">Description:</a-h1>
                    <a-textarea
                      style="margin-left: 2%"
                      v-model:value="descriptionVal"
                      placeholder="Description #01"
                      :rows="4"
                    />
                    <div class="Mid-create">
                      <a-h1 class="text">Project:</a-h1>
                      <a-input
                        style="width: 30%"
                        v-model:value="projectValue"
                        placeholder="Project #01"
                      />
                      <a-h1 class="text">Type:</a-h1>
                      <a-input
                        style="width: 30%"
                        v-model:value="typeValue"
                        placeholder="Period Type #01"
                      />
                    </div>
                    <div class="Bot-create">
                      <a-h1 class="text">Code:</a-h1>
                      <a-input
                        style="width: 15%"
                        v-model:value="codeValue"
                        placeholder="Code #01"
                      />
                      <a-h1 class="text">Status:</a-h1>
                      <a-select
                        v-model:value="statusValue"
                        label-in-value
                        :options="statusOptions"
                        @change="handleChangeStatus"
                      >
                      </a-select>
                    </div>
                    <div class="Date-picker">
                      <a-col :span="4"><a-h1>From:</a-h1></a-col>
                      <a-col :span="6"
                        ><a-date-picker v-model:value="fromValue"
                      /></a-col>
                      <a-col :span="4"><a-h1>To:</a-h1></a-col>
                      <a-col :span="6"
                        ><a-date-picker v-model:value="toValue" />
                      </a-col>
                    </div>
                  </div>
                </div>
              </a-form>
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
                <a-button style="margin-right: 8px" @click="onClose"
                  >Cancel</a-button
                >
                <a-button type="primary" @click="onClose">Submit</a-button>
              </div>
            </a-drawer>
          </div>
        </div>
        <div class="Table">
          <a-row :gutter="18">
            <a-col :span="24">
              <a-table :columns="columns" :data-source="data">
                <template #action="{ record }">
                  <span>
                    <a-button @click="onOpenUserInfo(record)">
                      <template #icon><InfoCircleOutlined /></template>
                    </a-button>
                    <a-button
                      type="primary"
                      class="action-btn"
                      @click="showModal"
                    >
                      <a-modal> </a-modal>
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
      </div>
    </a-col>
  </a-row>
</template>
<script>

import { PlusOutlined } from "@ant-design/icons-vue";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, reactive, watch } from "vue";
const columns = [
  {
    title: "Periodid",
    dataIndex: "Periodid",
    key: "Periodid",
    sorter: true,
    slots: { title: "Periodid", customRender: "Periodid" },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "startdate",
    key: "startdate",
  },
  {
    title: "End Date",
    dataIndex: "enddate",
    key: "enddate",
  },
  {
    title: "Project Name",
    dataIndex: "projectname",
    key: "projectname",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "Status",
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
    Periodid: "1",
    name: "TienHV11",
    startdate: "13/01/2022",
    enddate: "15/01/2022",
    projectname: "Testing",
    status: "Active",
  },
  {
    Periodid: "2",
    name: "PhucH8",
    startdate: "13/02/2022",
    enddate: "16/01/2022",
    projectname: "Testing",
    status: "Active",
  },
];
export default defineComponent({
  components: {
    PlusOutlined,
    InfoCircleOutlined,
    DeleteOutlined,
    FormOutlined,
  },
  data() {
    return {
      data,
      columns,
    };
  },
  methods: {
    onDelete(record) {
      const data = [...this.data];
      this.data = data.filter(
        (periodlist) => periodlist.Periodid !== record.Periodid
      );
    },
  },
  setup() {
    const options = ref([
      {
        value: "truongbn2",
        label: "TruongBN2",
      },
      {
        value: "giangbq",
        label: "GiangBQ",
      },
    ]);

    const statusOptions = ref([
      {
        statusValue: "enable",
        label: "Enable",
      },
      {
        statusValue: "disable",
        label: "Disable",
      },
    ]);

    const descriptionVal = ref("");
    const nameVal = ref("");
    const projectValue = ref("");
    const typeValue = ref("");
    const codeValue = ref("");

    const handleChange = (value) => {
      console.log(value);
    };

    const handleChangeStatus = (statusValue) => {
      console.log(statusValue);
    };
    const value = ref("");

    const onSearch = (searchValue) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };
    const form = reactive({
      name: "",
    });
    const visible = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };
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

    watch(startValue, () => {
      console.log("startValue", startValue.value);
    });
    watch(endValue, () => {
      console.log("endValue", endValue.value);
    });
    return {
      //Data of table period list

      //Columns of Table Period list

      //Search
      value,
      onSearch,
      //Date Picker
      startValue,
      endValue,
      endOpen,
      disabledStartDate,
      disabledEndDate,
      handleStartOpenChange,
      handleEndOpenChange,
      //Create Period Drawer
      form,
      visible,
      showDrawer,
      onClose,
      statusValue: ref({
        statusValue: "Enable",
      }),
      statusOptions,
      options,
      handleChange,
      handleChangeStatus,
      descriptionVal,
      nameVal,
      projectValue,
      typeValue,
      codeValue,
      fromValue: ref(),
      toValue: ref(),
    };
  },
});
</script>

<style lang="css" scoped>
.gutter-box {
  background: hsl(0, 0%, 100%);
  padding: 15px;
  margin-bottom: 1%;
}
.Header {
  display: flex;
  position: relative;
}
.Header .Top-line {
  width: 20%;
}
.Top-content .Search {
  padding-top: 1%;
  padding-left: 2%;
}
.Toolbar .New-period {
  margin-left: 40%;
}
.Toolbar {
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 2%;
}
.Toolbar .Btn {
  margin-left: 2%;
}
.Top-create {
  display: flex;
}
.Date-picker {
  display: flex;
  margin-top: 2%;
}
.Mid-create {
  display: flex;
  margin-top: 2%;
  margin-bottom: 2%;
}
.Bot-create {
  display: flex;
}
.text {
  margin-right: 3%;
  margin-left: 2%;
}
.Table {
  background-color: white;
  margin-top: 20px;
  margin-left: 40px;
}
</style>
