<template>
  <div class="container">
    <h2>เพิ่มบอร์ดเกม</h2>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="ชื่อบอร์ดเกม" name="title" labelAlign="left">
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <a-form-item label="รายละเอียด" name="description" labelAlign="left">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>

      <a-form-item
        label="คะแนนรีวิวจากแอดมิน"
        name="adminRating"
        labelAlign="left"
      >
        <a-input-number
          :min="0"
          :max="10"
          :step="0.5"
          v-model:value="formState.adminRating"
        />
      </a-form-item>

      <a-form-item name="upload" label="รูปภาพ" labelAlign="left">
        <a-upload
          v-model:file-list="fileList"
          :before-upload="true"
          @change="handleFileChange"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :maxCount="1"
          @preview="handlePreview"
        >
          เลือกรูปภาพ
        </a-upload>
        <a-modal
          centered="true"
          :open="previewVisible"
          :title="previewTitle"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" class="img-preview" :src="previewImage" />
        </a-modal>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
        <div class="button-container">
          <a-button type="primary" html-type="submit" :disabled="ckeckPhoto()">บันทึก</a-button>
          <a-button class="button-cancel" @click="goToBack">ยกเลิก</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  name: "CreateUser",
  data() {
    return {
      formState: {
        title: "",
        description: "",
        adminRating: 0,
        averageRating: 0,
        user: {
          userID: null,
        },
      },
      previewVisible: ref(false),
      previewImage: ref(""),
      previewTitle: ref(""),
      fileList: ref([]),
      selectedPhoto: null,
    };
  },

  methods: {
    ckeckPhoto() {
      return this.selectedPhoto === null;
    },

    goToBack() {
      this.$router.go(-1);
    },

    beforeUpload() {
      return true;
    },

    handleFileChange(event) {
      // console.log("Event:", event);
      const selectedFile = event.file;
      // console.log("Selected File:", selectedFile);
      if (selectedFile) {
        this.selectedPhoto = selectedFile;
      } else {
        this.selectedPhoto = null;
      }
    },

    handleCancel() {
      this.previewVisible = false;
      this.previewTitle = "";
    },

    async handlePreview(file) {
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }

      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
      this.previewTitle =
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
    },

    async onFinish(values) {
      // console.log("Success:", values);
      const user = JSON.parse(localStorage.getItem("auth"));
      const data = new FormData();
      data.append(
        "body",
        JSON.stringify({
          ...this.form,
          ...values,
          averageRating: 0,
          user: { userID: user?.userID },
        })
      );
      data.append("photo", this.selectedPhoto);

      // for (const entry of data.entries()) {
      //   console.log(entry[0], entry[1]);
      // }
      
      try {
        const response = await request.post("/boardgame", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status == 201) {
          Swal.fire({
            title: "เพิ่มบอร์ดเกมสำเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            this.$router.push("/manage-boardgame");
          });
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเพิ่มบอร์ดเกมได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error Create BoardGame:", error);
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
.img-preview {
  width: 100%;
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
