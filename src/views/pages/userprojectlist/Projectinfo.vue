<template>
  <a-drawer
    title="Project Info"
    :width="720"
    :visible="isInfoDrawerOpen"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-descriptions
      :title="selectedUser.ID"
      :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }"
      bordered
      :v-if="selectedUser != null && selectedUser.ID != null"
    >
      <a-descriptions-item label="ID">{{
        selectedUser.ID
      }}</a-descriptions-item>
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
  </a-drawer>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("user", ["isInfoDrawerOpen", "selectedUser"]),
  },
  methods: {
    onClose() {
      this.setInfoDrawerStatus(false);
    },
    ...mapMutations("user", ["setInfoDrawerStatus"]),
  },
};
</script>
<style scoped></style>
