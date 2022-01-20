<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Project Name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Project Code">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Customer">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item label="Description" name="desc">
      <a-textarea v-model:value="formState.desc" />
    </a-form-item>

    <a-form-item label="Start Date">
      <a-space direction="vertical">
        <a-range-picker
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['Start Time', 'End Time']"
          @change="onChange"
          @ok="onOk"
        />
      </a-space>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { defineComponent, reactive, toRaw } from "vue";
export default defineComponent({
  setup() {
    const formState = reactive({
      name: "",
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
    };

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
    };
  },
});
</script>
