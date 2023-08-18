<template>
  <a-modal
    v-model:open="open"
    :title="isChangeForm ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'"
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
        <a-form-item label="ชื่อผู้ใช้" name="username" labelAlign="left">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="รหัสผ่าน" name="password" labelAlign="left">
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
        <a-form-item
          label="ชื่อผู้ใช้"
          name="username"
          labelAlign="left"
          :rules="usernameRules"
        >
          <a-input v-model:value="formRegis.username" />
        </a-form-item>

        <a-form-item
          label="รหัสผ่าน"
          name="password"
          labelAlign="left"
          :rules="[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]"
        >
          <a-input-password v-model:value="formRegis.password" />
        </a-form-item>

        <a-form-item
          label="ยืนยันรหัสผ่าน"
          name="conpassword"
          labelAlign="left"
          :rules="conPassRules"
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

    usernameRules() {
      const rules = [
        { required: true, message: "กรุณากรอกชื่อผู้ใช้!" },
        {
          validator: this.validateUsernamePromise,
          trigger: "change",
        },
      ];

      return rules;
    },

    conPassRules() {
      const rules = [
        { required: true, message: "กรุณายืนยันรหัสผ่าน!" },
        {
          validator: this.validatePasswordPromise,
          trigger: "change",
        },
      ];

      return rules;
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

    async handleUsernameChange(value) {
      try {
        const response = await request.get("/checkUsername", {
          params: {
            username: value,
          },
        });
        if (response.status == 200) return response.data;
      } catch (error) {
        console.error("Error Check Username:", error);
      }
    },

    async validateUsernamePromise(__, value) {
      let result = await this.handleUsernameChange(value);
      if (!result) {
        return Promise.resolve();
      }
      return Promise.reject("ชื่อผู้ใช้ไม่สามารถใช้งานได้");
    },

    async validatePasswordPromise() {
      let result =
        this.formRegis.password !== this.formRegis.conpassword &&
        this.formRegis.conpassword !== "";
      if (result) {
        return Promise.reject("รหัสผ่านไม่ตรงกัน");
      }
      return Promise.resolve();
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
            timer: 1000,
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
            timer: 1000,
          }).then(() => {
            localStorage.setItem("auth", JSON.stringify(response.data));
            this.$router.go(0);
          });
        }
      } catch (error) {
        Swal.fire({
          title: "เข้าสู่ระบบไม่สำเร็จ!",
          text: "โปรดตรวจสอบชื่อผู้ใช้ และรหัสผ่านอีกครั้ง",
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
