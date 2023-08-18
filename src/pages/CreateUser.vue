<template>
  <div class="container">
    <h2>เพิ่มผู้ใช้งานในระบบ</h2>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="ชื่อผู้ใช้"
        name="username"
        labelAlign="left"
        :rules="usernameRules"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="รหัสผ่าน"
        name="password"
        labelAlign="left"
        :rules="[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item
        label="ยืนยันรหัสผ่าน"
        name="conpassword"
        labelAlign="left"
        :rules="conPassRules"
      >
        <a-input-password v-model:value="formState.conpassword" />
      </a-form-item>

      <a-form-item
        label="บทบาท"
        name="userType"
        labelAlign="left"
        :rules="[{ required: true, message: 'กรุณเลือกบทบาท!' }]"
      >
        <a-select v-model:value="formState.userType" class="select">
          <a-select-option value="0">สมาชิก</a-select-option>
          <a-select-option value="1">แอดมิน</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
        <div class="button-container">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="checkDisabled()"
            >บันทึก</a-button
          >
          <a-button class="button-cancel" @click="goToBack">ยกเลิก</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";

export default {
  name: "CreateUser",
  data() {
    return {
      formState: {
        userType: "",
        username: "",
        password: "",
        conpassword: "",
      },
      usernameValid: false,
    };
  },
  computed: {
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
    checkMatchPassword() {
      return (
        this.formState.password !== this.formState.conpassword &&
        this.formState.password &&
        this.formState.conpassword
      );
    },
    checkDisabled() {
      return (
        this.formState.userType === "" ||
        this.formState.username === "" ||
        this.formState.password === "" ||
        this.formState.conpassword === "" ||
        this.formState.password !== this.formState.conpassword
      );
    },
    goToBack() {
      this.$router.go(-1);
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
        this.formState.password !== this.formState.conpassword &&
        this.formState.conpassword !== "";
      if (result) {
        return Promise.reject("รหัสผ่านไม่ตรงกัน");
      }
      return Promise.resolve();
    },

    async onFinish(values) {
      console.log("Success:", values);

      try {
        const response = await request.post("/user", values);
        if (response.status == 201) {
          Swal.fire({
            title: "เพิ่มผู้ใช้สำเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            this.$router.push("/manage-user");
          });
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเพิ่มผู้ใช้ได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error Create User:", error);
      }
    },

    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
  },
};
</script>

<style scoped>
.container {
  border-radius: 8px;
  background: #fff;
  padding: 40px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.button-cancel {
  margin-left: 10px;
}
.select {
  width: 120px;
}
</style>
