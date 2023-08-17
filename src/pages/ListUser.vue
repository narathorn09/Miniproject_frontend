<template>
  <div class="container">
    <h2>รายชื่อผู้ใช้งานในระบบ</h2>
    <div class="button-container">
      <a-button type="primary" @click="goToCreateUserPage">
        เพิ่มผู้ใช้
      </a-button>
    </div>
    <a-table :columns="columns" :data-source="userData">
      <template #headerCell="{ column }">
        <template v-if="column.key === '#'">
          <div class="table-header-index">#</div>
        </template>
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === '#'">
          <div class="table-body-index">
            {{ index + 1 }}
          </div>
        </template>
        <template v-else-if="column.key === 'userType'">
          <span>
            <a-tag :color="record.userType === '1' ? 'geekblue' : 'green'">
              <span>{{ record.userType === "1" ? "แอดมิน" : "สมาชิก" }}</span>
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-col class="table-body-action">
            <a-button @click="goToEditUserById(record.userID)">แก้ไข</a-button>
            <a-button @click="deleteUserById(record.userID, record.username)" danger>ลบ</a-button>
          </a-col>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";

export default {
  name: "ListUser",
  data() {
    return {
      userData: [],
      columns: [
        {
          title: "#",
          dataIndex: "#",
          key: "#",
        },
        {
          title: "ชื่อผู้ใช้",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "บทบาท",
          dataIndex: "userType",
          key: "userType",
        },
        {
          title: "จัดการ",
          key: "action",
          dataIndex: "action",
        },
      ],
    };
  },
  methods: {
    goToCreateUserPage() {
      this.$router.push("/create-user");
    },

    goToEditUserById(userId) {
      this.$router.push(`/edit-user/${userId}`);
    },

    async deleteUserById(userId, username) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบชื่อผู้ใช้ ${username}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await request.delete(`/user/${userId}`);
            if (response.status === 200) {
              Swal.fire({
                title: "ลบสำเร็จ!",
                text: `ลบผู้ใช้ ${username} สำเร็จ`,
                icon: "success",
                confirmButtonText: "ตกลง",
              });
              this.fetchUserData();
            }
          } catch (err) {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "เกิดข้อผิดพลาดในการลบผู้ใช้",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          }
        }
      });
    },

    async fetchUserData() {
      try {
        const response = await request.get("/user");
        this.userData = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  created() {
    this.fetchUserData();
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
  margin-bottom: 20px;
}
.table-header-index {
  /* width: 100px; */
  /* display: flex; */
  justify-content: center;
  align-items: center;
}
.table-body-index {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.table-body-action {
  width: 130px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
