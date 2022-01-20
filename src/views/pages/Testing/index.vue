<template>
  <div>
    <a-button @click="test">testing {{ this.$store.state.test }}</a-button>
  </div>
</template>
<script>
import TestApi from "@/apis/v1/test";
export default {
  methods: {
    test: async function () {
      const response = await TestApi.fetchUsers();
      console.log(response);
    },
  },
};
</script>
