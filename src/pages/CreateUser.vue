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
      <a-form-item label="ชื่อผู้ใช้" name="username" labelAlign="left">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="รหัสผ่าน" name="password" labelAlign="left">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item label="ยืนยันรหัสผ่าน" name="conpassword" labelAlign="left">
        <a-input-password v-model:value="formState.conpassword" />
      </a-form-item>

      <a-form-item label="บทบาท" name="userType" labelAlign="left">
        <a-radio-group v-model:value="formState.userType">
          <a-radio :value="1">แอดมิน</a-radio>
          <a-radio :value="0">สมาชิก</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
        <div class="button-container">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="checkDisabled()"
            >บันทึก</a-button
          >
          <a-button class="button-cancel" @click="goToBack"
            >ยกเลิก</a-button
          >
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
    };
  },

  methods: {
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
.button-cancel{
  margin-left: 10px
}
</style>
