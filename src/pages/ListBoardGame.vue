<template>
  <div class="container">
    <h2>รายการบอร์ดเกม</h2>
    <div class="button-container">
      <a-button type="primary" @click="goToCreateGamePage">
        เพิ่มบอร์ดเกม
      </a-button>
    </div>
    <a-table :columns="columns" :data-source="boardGameData">
      <!-- <template #headerCell="{ column }">
      <template v-if="column.key === 'title'">
        <span>
          <smile-outlined />
          ชื่อบอร์ดเกม
        </span>
      </template>
    </template> -->

      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === '#'">
          <div class="table-body-index">
            {{ index + 1 }}
          </div>
        </template>
        <template v-if="column.key === 'photoData'">
          <div class="table-body-photo">
            <a-Image
              class="table-body-photo-cell-img"
              :src="'data:image/jpeg;base64,' + record.photoData"
            />
          </div>
        </template>
        <template v-if="column.key === 'description'">
          <div class="table-body-description">
            <span>{{ record.description }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-col class="table-body-action">
            <a-button @click="goToEditBoardGameById(record.gameID)">แก้ไข</a-button>
            <a-button @click="deleteBoardGameById(record.gameID, record.title)" danger>ลบ</a-button>
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
  name: "ListBoardGame",
  data() {
    return {
      boardGameData: [],
      columns: [
        {
          title: "#",
          dataIndex: "#",
          key: "#",
        },
        {
          title: "รูปภาพ",
          dataIndex: "photoData",
          key: "photoData",
        },
        {
          title: "ชื่อบอร์ดเกม",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "รายละเอียด",
          dataIndex: "description",
          key: "description",
        },

        {
          title: "คะแนนรีวิวจากแอดมิน",
          key: "adminRating",
          dataIndex: "adminRating",
        },
        {
          title: "คะแนนรีวิวเฉลี่ย",
          key: "averageRating",
          dataIndex: "averageRating",
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
    goToCreateGamePage() {
      this.$router.push("/create-boardgame");
    },

    goToEditBoardGameById(gameId) {
      this.$router.push(`/edit-boardgame/${gameId}`);
    },

    async deleteBoardGameById(gameId, title) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบบอร์ดเกม ${title}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await request.delete(`/boardgame/${gameId}`);
            if (response.status === 200) {
              Swal.fire({
                title: "ลบสำเร็จ!",
                text: `ลบบอร์ดเกม ${title} สำเร็จ`,
                icon: "success",
                confirmButtonText: "ตกลง",
              });
              this.fetchBoardGameData();
            }
          } catch (err) {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "เกิดข้อผิดพลาดในการลบบอร์ดเกม",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          }
        }
      });
    },

    async fetchBoardGameData() {
      try {
        const response = await request.get("/boardgame");
        this.boardGameData = response.data;
      } catch (error) {
        console.error("Error fetching board game data:", error);
      }
    },

  },

  created() {
    this.fetchBoardGameData();
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
.table-body-index {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-body-photo {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-body-photo-cell-img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.table-body-description {
  width: 350px;
  /* height: 100px; */
  overflow-y: auto;
  /* white-space: pre-wrap; */
  /* text-overflow: ellipsis; */
  text-align: left;
  text-overflow: ellipsis;
  display: flex;
  justify-content: start;
  align-items: center;
}
.table-body-action {
  width: 130px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
