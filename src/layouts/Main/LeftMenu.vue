<template>
  <a-layout-sider
    :collapsed="collapsed"
    :trigger="null"
    :width="250"
    collapsible
  >
    <div class="logo" />
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
      <a-menu-item key="/">
        <router-link to="/">
          <span>Home</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="/example">
        <router-link to="/example">
          <span>Example</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="/test">
        <router-link to="/test">
          <span>testing</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="/UserProjectList">
        <router-link to="/UserProjectList">
          <span>Project List</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="/functions-period">
        <router-link to="/functions-period">
          <span>Functions Period</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="/Period">
        <router-link to="/Period">
          <span>Period</span>
        </router-link>
      </a-menu-item>

      <a-sub-menu key="sub2" @titleClick="titleClick">
        <template #icon>
          <TeamOutlined />
        </template>
        <template #title>User Management</template>
        <a-menu-item key="5">
          <router-link to="/userMgt">
            <span>User List</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub3" @titleClick="titleClick">
        <template #icon>
          <TeamOutlined />
        </template>
        <template #title>Project Management</template>
        <a-menu-item key="5">
          <router-link to="/project">
            <span>Create Project</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { TeamOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    TeamOutlined,
  },
  data: function () {
    return {
      selectedKeys: [this.$route.path],
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
