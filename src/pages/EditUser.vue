<template>
  <div class="container">
    <h2>แก้ไขข้อมูลผู้ใช้</h2>
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
  name: "EditUser",
  data() {
    return {
      formState: {
        userType: "",
        username: "",
        password: "",
      },
    };
  },

  methods: {
    checkDisabled() {
      return this.formState.userType === "" || this.formState.username === "";
    },

    goToBack() {
      this.$router.go(-1);
    },

    async onFinish(values) {
      const data = { ...values, password: this.formState.password };
      console.log("data:", data);
      try {
        const userId = this.$route.params.userId;
        const response = await request.put(`/user/${userId}`, data);
        if (response.status == 200) {
          Swal.fire({
            title: "แก้ไขข้อมูลผู้ใช้สำเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            this.$router.push("/manage-user");
          });
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error Create User:", error);
      }
    },

    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },

    async fetchUserDataById() {
      try {
        const userId = this.$route.params.userId;
        const response = await request.get(`/user/${userId}`);
        this.formState = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },

  created() {
    this.fetchUserDataById();
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
</style>
