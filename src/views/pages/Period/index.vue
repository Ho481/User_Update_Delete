<template>
  <div class="function-header">
    <h1>Periods</h1>
    <a-row>
      <a-col :span="14">
        <a-row :gutter="8" class="header-left">
          <a-col class="gutter-row" :span="20">
            <a-input v-model:value="searchValue" placeholder="Basic usage" />
          </a-col>
          <a-col class="gutter-row" :span="4">
            <a-button type="primary">Search</a-button>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="10">
        <a-row :gutter="8" class="header-right">
          <a-col class="gutter-row" :span="20">
            <h1>New Period</h1>
          </a-col>
          <a-col class="gutter-row" :span="4">
            <PlusCircleOutlined />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
  <div class="function-details">
    <h2 class="details">Period Details</h2>
    <div class="common-info">
      <a-row :gutter="24" class="row-info">
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="8">
              <h1>Name:</h1>
            </a-col>
            <a-col :span="16">
              <a-input v-model:value="nameVal" placeholder="Period #01" />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="8">
              <h1>Manager:</h1>
            </a-col>
            <a-col :span="16">
              <a-select
                v-model:value="value"
                label-in-value
                style="width: 120px"
                :options="options"
                @change="handleChange"
              >
              </a-select>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="row-info">
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="8">
              <h1>Description:</h1>
            </a-col>
            <a-col :span="16">
              <a-textarea
                v-model:value="descriptionVal"
                placeholder="Description #01"
                :rows="4"
              />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="8">
              <h1>Project:</h1>
            </a-col>
            <a-col :span="16">
              <a-input v-model:value="projectValue" placeholder="Project #01" />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="row-info">
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="8">
              <h1>Type:</h1>
            </a-col>
            <a-col :span="16">
              <a-input
                v-model:value="typeValue"
                placeholder="Period Type #01"
              />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="8">
              <h1>Code:</h1>
            </a-col>
            <a-col :span="16">
              <a-input v-model:value="codeValue" placeholder="Code #01" />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="row-info">
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="12">
              <a-row>
                <a-col :span="4"><h1>From:</h1></a-col>
                <a-col :span="20"
                  ><a-date-picker v-model:value="fromValue"
                /></a-col>
              </a-row>
            </a-col>
            <a-col :span="12">
              <a-row>
                <a-col :span="4"><h1>To:</h1></a-col>
                <a-col :span="20"
                  ><a-date-picker v-model:value="toValue"
                /></a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="8">
              <h1>Status:</h1>
            </a-col>
            <a-col :span="16">
              <a-select
                v-model:value="statusValue"
                label-in-value
                style="width: 120px"
                :options="statusOptions"
                @change="handleChangeStatus"
              >
              </a-select>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
  <div class="members-list">Hello</div>
</template>

<script>
import { PlusCircleOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
export default {
  components: {
    PlusCircleOutlined,
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
    const searchValue = ref("");
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

    return {
      value: ref({
        value: "TruongBN2",
      }),
      statusValue: ref({
        statusValue: "Enable",
      }),
      statusOptions,
      options,
      handleChange,
      handleChangeStatus,
      descriptionVal,
      searchValue,
      nameVal,
      projectValue,
      typeValue,
      codeValue,
      fromValue: ref(),
      toValue: ref(),
    };
  },
};
</script>

<style scoped>
h2.details {
  text-align: center;
  margin-top: 30px;
}

.row-info {
  margin-top: 10px;
}
</style>
