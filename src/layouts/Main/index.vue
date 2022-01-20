<template>
  <a-layout style="min-height: 100vh">
    <LeftMenu :collapsed="collapsed" />
    <a-layout>
      <Header v-model:collapsed="collapsed" />
      <a-layout-content :style="{ padding: '24px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent } from "vue";
import LeftMenu from "./LeftMenu.vue";
import Header from "./Header.vue";
import AuthApi from "@/apis/auth";
import { notification } from "ant-design-vue";

export default defineComponent({
  components: {
    LeftMenu,
    Header,
  },
  data: function () {
    return {
      collapsed: false,
    };
  },

  created: function () {
    this.checkUserLogged();
  },
  watch: {
    $route: async function (to) {
      if (to.path.startsWith("/auth")) return;

      this.checkUserLogged();
    },
  },
  methods: {
    checkUserLogged: async function () {
      try {
        await AuthApi.checkUserLogged();
      } catch {
        notification["error"]({
          message: "Session timeout",
        });
        this.$router.push({
          path: "/auth/login",
          query: { redirect: this.$route.fullPath },
        });
      }
    },
  },
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
