<template>
  <a-modal
    v-model:open="open"
    :title="isChangeForm ? 'Login' : 'Register'"
    centered="true"
    :footer="null"
    :width="350"
  >
    <template v-if="isChangeForm">
      <a-form
        :model="formState"
        name="Login"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onLogin"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="Username" name="username" labelAlign="left">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="Password" name="password" labelAlign="left">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <div class="button-container">
          <a-button type="primary" html-type="submit">เข้าสู่ระบบ</a-button>
        </div>
        <div class="footer-container">
          <a @click="changeForm">สมัครสมาชิก</a>
        </div>
      </a-form>
    </template>
    <template v-else>
      <a-form
        :model="formRegis"
        name="register"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onRegis"
      >
        <a-form-item label="Username" name="username" labelAlign="left">
          <a-input v-model:value="formRegis.username" />
        </a-form-item>

        <a-form-item label="Password" name="password" labelAlign="left">
          <a-input-password v-model:value="formRegis.password" />
        </a-form-item>

        <a-form-item
          label="Confirm Password"
          name="conpassword"
          labelAlign="left"
        >
          <a-input-password v-model:value="formRegis.conpassword" />
        </a-form-item>

        <div class="button-container">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="submitButtonDisabled"
          >
            สมัครสมาชิก
          </a-button>
        </div>
        <div class="footer-container">
          <a @click="changeForm">เข้าสู่ระบบ</a>
        </div>
      </a-form>
    </template>
  </a-modal>
</template>

<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";

export default {
  name: "ModalLoginAndRegis",
  data() {
    return {
      open: false,
      formState: {
        username: "",
        password: "",
      },
      formRegis: {
        username: "",
        password: "",
        conpassword: "",
      },
      isChangeForm: true,
    };
  },
  computed: {
    submitButtonDisabled() {
      return (
        this.formRegis.password !== this.formRegis.conpassword ||
        this.formRegis.conpassword === "" ||
        this.formRegis.password === "" ||
        this.formRegis.username === ""
      );
    },
  },
  methods: {
    showModal() {
      this.isChangeForm = true;
      this.open = true;
    },

    changeForm() {
      this.isChangeForm = !this.isChangeForm;
      this.resteForm();
    },

    resteForm() {
      this.formRegis.username = "";
      this.formRegis.password = "";
      this.formRegis.conpassword = "";
      this.formState.username = "";
      this.formState.password = "";
    },

    async onRegis(values) {
      const data = { ...values, userType: "0" };
      try {
        const response = await request.post("/register", data);
        if (response.status == 201) {
          Swal.fire({
            title: "สมัครสมาชิกสำเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
          });
          this.isChangeForm = !this.isChangeForm;
          this.resteForm();
        }
      } catch (error) {
        if (error.response.data === "Username is already taken.") {
          Swal.fire({
            title: "ชื่อผู้ใช้ไม่พร้อมใช้งาน!",
            text: "โปรดเปลี่่ยนชื่อผู้ใช้",
            icon: "warning",
            confirmButtonText: "ตกลง",
          });
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "สมัครสมาชิกไม่สำเร็จ",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
        console.error("Error Regis:", error);
      }
    },

    async onLogin(values) {
      try {
        const response = await request.post("/login", values);
        if (response.status == 200) {
          this.open = false;
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            localStorage.setItem("auth", JSON.stringify(response.data));
            this.$router.go(0);
          });
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

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
