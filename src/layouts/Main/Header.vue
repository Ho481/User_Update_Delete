<template>
  <a-layout-header style="background: #fff; padding: 0 0 0 10px">
    <menu-unfold-outlined
      height="2em"
      width="2em"
      v-if="collapsed"
      class="trigger"
      style="width: 2em; height: 2em"
      @click="toggleMenu"
    />
    <menu-fold-outlined v-else class="trigger" @click="toggleMenu" />

    <a-dropdown placement="bottomRight">
      <a-avatar size="large" class="avatar">SG</a-avatar>

      <template #overlay>
        <a-menu class="avatar-dropdown-menu">
          <a-menu-item @click="profile">
            <template #icon>
              <UserOutlined />
            </template>
            <span>Profile</span>
          </a-menu-item>

          <a-menu-item @click="logout">
            <template #icon>
              <PoweroffOutlined />
            </template>
            <span>Logout</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>
<script>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import AuthApi from "@/apis/auth";

export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PoweroffOutlined,
    UserOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleMenu: function () {
      this.$emit("update:collapsed", !this.collapsed);
    },
    logout: function () {
      AuthApi.logout(); // ignore
      this.$router.push({
        path: "/auth/login",
      });
    },
    profile: function () {
      AuthApi.checkUserLogged(); // ignore
      this.$router.push({
        path: "/user-profile",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  margin-left: auto;
  background-color: #1e8a47;
  float: right;
  margin-top: 1em;
  margin-right: 2em;

  &:hover {
    cursor: pointer;
  }
}

.avatar-dropdown-menu {
  // text-align: center;
  min-width: 10em;
  padding: 1em 0 1em 0;
}
</style>
