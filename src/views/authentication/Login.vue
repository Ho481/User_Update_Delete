<template>
  <div class="main">
    <!-- <a-card style="width: 50vw; margin-left: auto; margin-right: auto"> -->
    <a-alert
      v-if="errorMessage.length > 0"
      type="error"
      showIcon
      style="margin-bottom: 24px"
      :message="errorMessage"
      closable
    />

    <a-form
      :model="form"
      layout="vertical"
      style="width: 100%"
      @submit="handleSubmit"
    >
      <a-form-item label="Username">
        <a-input v-model:value="form.username" @keyup.enter="handleSubmit" />
      </a-form-item>

      <a-form-item label="Password">
        <a-input-password
          v-model:value="form.password"
          @keyup.enter="handleSubmit"
        />
      </a-form-item>
      <a-form-item style="text-align: center">
        <a-button
          html-type="submit"
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="loading"
          >Login</a-button
        >
      </a-form-item>
    </a-form>
    <!-- </a-card> -->
  </div>
</template>

<script>
import AuthApi from "@/apis/auth";

const FORM_INIT = {
  username: "",
  password: "",
};
export default {
  data: function () {
    return {
      form: JSON.parse(JSON.stringify(FORM_INIT)),
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    handleSubmit: async function () {
      if (this.loading) return;
      try {
        this.loading = true;
        this.errorMessage = "";
        await AuthApi.login(this.form.username, this.form.password);

        const redirectUrl = this.$route.query["redirect"]
          ? this.$route.query["redirect"]
          : "/";
        this.$router.push(redirectUrl);
      } catch (e) {
        this.errorMessage = "Username or password is incorrect";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
