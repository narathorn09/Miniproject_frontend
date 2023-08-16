<template>
  <a-modal
    v-model:open="open"
    title="LOGIN"
    :confirm-loading="confirmLoading"
    @ok="onFinish"
    centered="true"
    :footer="null"
    :width="350"
  >
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 24 }"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="Username" name="username" labelAlign="left">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="Password" name="password" labelAlign="left">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";

export default {
  name: "ModalLogin",
  data() {
    return {
      open: false,
      confirmLoading: false,
      formState: {
        username: "", 
        password: "",
      },
    };
  },

  methods: {
    showModal() {
      this.open = true;
    },
    async onFinish(values) {
      console.log("Success:", values);
      try {
        const response = await request.post("/login", values);
        if (response.status == 200) {
          this.open = false;
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
          });
          localStorage.setItem("auth", JSON.stringify(response.data));
          this.$router.go(0);
        }
      } catch (error) {
        Swal.fire({
          title: "เข้าสู่ระบบไม่สำเร็จ!",
          text: "โปรดตรจสอบ username และ password",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error login:", error);
      }
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
  },
};
</script>

<style scoped></style>
>
