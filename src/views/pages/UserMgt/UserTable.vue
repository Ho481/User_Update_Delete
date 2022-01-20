<template>
  <a-table
    :columns="columns"
    :data-source="userList"
    :loading="isSearchChing"
    @change="handleTableChange"
  >
    <template #action="{ record }">
      <span>
        <a-button @click="onOpenUserInfo(record.id)">
          <template #icon><InfoCircleOutlined /></template>
        </a-button>

        <a-button
          @click="onEditUser(record.id)"
          type="primary"
          class="action-btn"
        >
          <template #icon><FormOutlined /></template>
        </a-button>

        <!-- <a-popconfirm
          title="Are you sure delete this user?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="onDelete(record.id)"
          @cancel="cancel"
        > -->
        <a-button @click="onDelete(record.id)" type="danger" class="action-btn">
          <template #icon><DeleteOutlined /></template>
        </a-button>
        <!-- </a-popconfirm> -->
      </span>
    </template>
  </a-table>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

import {
  InfoCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    InfoCircleOutlined,
    DeleteOutlined,
    FormOutlined,
  },
  created() {
    this.searchUser();
  },
  data() {
    return {
      columns: [
        {
          title: "Account",
          dataIndex: "username",
          key: "username",
          sorter: true,
          slots: { title: "Account", customRender: "username" },
          width: "20%",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          sorter: true,
          slots: { title: "Email", customRender: "email" },
          width: "40%",
        },
        {
          title: "Role",
          dataIndex: "role",
          key: "role",
          sorter: true,
          slots: { title: "Role", customRender: "role" },
          width: "20%",
        },
        {
          title: "Action",
          key: "action",
          slots: { customRender: "action" },
          width: "20%",
          align: "center",
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["userList", "searchParams", "isSearchChing"]),
  },
  methods: {
    handleTableChange: function (page, filters, sorter) {
      this.setSearchParams({
        ...this.searchParams,
        query: {
          ...this.searchParams.query,
          s: sorter.field + ` ${sorter.order === "ascend" ? "asc" : "desc"}`,
        },
      });
      this.searchUser();
    },
    onDelete(user_id) {
      this.setSelectedUser(user_id);
      this.setUserDeleteStatus(true);
    },
    onOpenUserInfo(user_id) {
      this.setSelectedUser(user_id);
      this.setInfoDrawerStatus(true);
    },
    onEditUser(user_id) {
      this.setSelectedUser(user_id);
      this.setUserEditStatus(true);
    },
    ...mapActions("user", ["searchUser"]),
    ...mapMutations("user", [
      "setSearchParams",
      "setSelectedUser",
      "setInfoDrawerStatus",
      "setUserEditStatus",
      "setUserDeleteStatus",
    ]),
  },
};
</script>
<style scoped>
.action-btn {
  margin-left: 5px;
}
</style>
