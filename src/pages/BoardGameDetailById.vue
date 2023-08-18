<template>
  <div class="container">
    <a-float-button
      type="primary"
      @click="openModalAddReview"
      style="right: 150px"
    >
      <template #icon> +</template></a-float-button
    >

    <h2 style="font-size: 30px">{{ boardGameData.title }}</h2>
    <div style="display: flex; flex-direction: row; margin-top: 30px">
      <a-col
        style="
          margin-right: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <div class="card-img-container">
          <a-Image
            class="card-img"
            :src="'data:image/jpeg;base64,' + boardGameData.photoData"
          />
        </div>
      </a-col>
      <a-col>
        <h3>
          คะแนนรีวิวจากแอดมิน :
          <a-tag color="geekblue" class="tag">
            <span>{{ boardGameData.adminRating }}/10</span>
          </a-tag>
        </h3>
        <h3>
          คะแนนรีวิวเฉลี่ย :
          <a-tag color="green" class="tag">
            <span>{{ boardGameData.averageRating?.toFixed(1) }}/10</span>
          </a-tag>
        </h3>
        <p>{{ boardGameData.description }}</p>
      </a-col>
    </div>
    <a-divider />
    <h2>ความคิดเห็น</h2>
    <template v-if="reviews?.length > 0">
      <template v-for="(review, index) in reviews" :key="index">
        <a-comment>
          <template #actions v-if="authUser(review.user.userID)">
            <span
              key="edit-comment"
              @click="
                openModalEdit(
                  review.reviewID,
                  review.rating,
                  review.comment,
                  review.user.userID
                )
              "
              >แก้ไข</span
            >
            <span
              key="delete-comment"
              style="color: red"
              @click="deleteComment(review.reviewID)"
              >ลบ</span
            >
          </template>
          <template #author
            ><sapn>{{ review.user.username }}</sapn></template
          >
          <template #avatar>
            <img
              src="@/assets/person-comment.png"
              alt="avatar"
            />
          </template>
          <template #content>
            <a-tag
              ><sapn>{{ review.rating }}/10</sapn></a-tag
            >
            <p>
              {{ review.comment }}
            </p>
          </template>
          <template #datetime>
            <!-- <a-tooltip :title="formattedDateTime(review.timestamp)"> -->
            <span>{{ formattedDateTime(review.timestamp) }}</span>
            <!-- </a-tooltip> -->
          </template>
        </a-comment>
        <a-divider />
      </template>
    </template>
    <template v-else-if="reviews?.length === 0"> ไม่มีความคิดเห็น </template>
    <a-modal
      v-model:open="open"
      title="แก้ไขความคิดเห็น"
      centered="true"
      :footer="null"
      :width="auto"
    >
      <a-form
        :model="formState"
        name="EditReview"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onEditReview"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="คะแนนรีวิว" name="rating" labelAlign="left">
          <a-input-number
            :min="0"
            :max="10"
            :step="0.5"
            v-model:value="formState.rating"
          />
        </a-form-item>

        <a-form-item label="ความคิดเห็น" name="comment" labelAlign="left">
          <a-textarea v-model:value="formState.comment" />
        </a-form-item>

        <div class="button-container">
          <a-button type="primary" html-type="submit">ยืนยัน</a-button>
        </div>
      </a-form>
    </a-modal>
    <a-modal
      v-model:open="openAddReviw"
      title="เพิ่มความคิดเห็น"
      centered="true"
      :footer="null"
      :width="auto"
    >
      <a-form
        :model="formAdd"
        name="addReview"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onAddReview"
      >
        <a-form-item label="คะแนนรีวิว" name="rating" labelAlign="left">
          <a-input-number
            :min="0"
            :max="10"
            :step="0.5"
            v-model:value="formAdd.rating"
          />
        </a-form-item>

        <a-form-item label="ความคิดเห็น" name="comment" labelAlign="left">
          <a-textarea v-model:value="formAdd.comment" />
        </a-form-item>

        <div class="button-container">
          <a-button type="primary" html-type="submit">ยืนยัน</a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
// import Swal from "sweetalert2";

export default {
  name: "BoardGameDetailById",
  data() {
    return {
      auth: JSON.parse(localStorage.getItem("auth")),
      open: false,
      openAddReviw: false,
      gameId: this.$route.params.gameId,
      boardGameData: {},
      reviews: [],
      formState: {
        reviewId: null,
        userId: null,
        rating: 0,
        comment: "",
      },
      formAdd: {
        reviewId: null,
        userId: null,
        rating: 0,
        comment: "",
      },
    };
  },

  methods: {
    formattedDateTime(date) {
      // Use dayjs to format the current date and time
      return dayjs(date).format("DD MMMM YYYY HH:mm:ss น.");
    },

    resetFormAdd() {
      this.formAdd.reviewId = null;
      this.formAdd.userId = null;
      this.formAdd.rating = 0;
      this.formAdd.comment = "";
    },

    openModalAddReview() {
      if (this.auth) {
        this.openAddReviw = true;
      } else {
        Swal.fire({
          title: "กรุณาเข้าสู่ระบบ!",
          text: "ต้องเข้าสู่ระบบเพื่อแสดงความคิดเห็น",
          icon: "info",
          confirmButtonText: "ตกลง",
        });
      }
    },

    openModalEdit(reviewId, rating, comment, userId) {
      this.open = true;
      this.formState.reviewId = reviewId;
      this.formState.userId = userId;
      this.formState.rating = rating;
      this.formState.comment = comment;
    },

    async onAddReview(values) {
      const data = {
        ...values,
        game: { gameID: parseInt(this.gameId) },
        user: { userID: this.auth?.userID },
      };
      console.log("data:", data);
      try {
        const response = await request.post(`/review`, data);
        if (response.status == 201) {
          this.openAddReviw = false;
          Swal.fire({
            title: "เพิ่มความคิดเห็นสำเร็จ!",
            icon: "success",
            showConfirmButton: false,
            confirmButtonText: "ตกลง",
            timer: 1000,
          });
          this.resetFormAdd();
          this.fetchBoardGameDataById();
          this.fetchReviewByGameId();
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเพิ่มความคิดเห็นได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error create review:", error);
      }
    },

    async onEditReview(values) {
      const data = {
        ...values,
        game: { gameID: parseInt(this.gameId) },
        user: { userID: this.formState.userId },
      };
      console.log("data:", data);
      try {
        const response = await request.put(
          `/review/${this.formState.reviewId}`,
          data
        );
        if (response.status == 200) {
          this.open = false;
          Swal.fire({
            title: "แก้ไขความคิดเห็นสำเร็จ!",
            icon: "success",
            showConfirmButton: false,
            confirmButtonText: "ตกลง",
            timer: 1000,
          });
          this.fetchBoardGameDataById();
          this.fetchReviewByGameId();
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถแก้ไขความคิดเห็นได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error edit review:", error);
      }
    },

    authUser(userId) {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        const authUserId = auth.userID;
        return authUserId === userId;
      }
    },
    async deleteComment(reviewId) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบความคิดเห็น?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await request.delete(`/review/${this.gameId}/${reviewId}`);
            if (response.status === 200) {
              Swal.fire({
                title: "ลบสำเร็จ!",
                text: `ลบความคิดเห็นสำเร็จ`,
                icon: "success",
                confirmButtonText: "ตกลง",
              });
              this.fetchBoardGameDataById();
              this.fetchReviewByGameId();
            }
          } catch (err) {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "เกิดข้อผิดพลาดในการลบความคิดเห็น",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          }
        }
      });
    },

    async fetchBoardGameDataById() {
      try {
        const response = await request.get(`/boardgame/${this.gameId}`);
        this.boardGameData = response.data;
      } catch (error) {
        console.error("Error fetching board game data:", error);
      }
    },
    async fetchReviewByGameId() {
      try {
        const response = await request.get(`/review/${this.gameId}`);
        this.reviews = response.data;
      } catch (error) {
        console.error("Error fetching reviews data:", error);
      }
    },
  },
  created() {
    this.fetchBoardGameDataById();
    this.fetchReviewByGameId();
  },
};
</script>
<style scoped>
.container {
  border-radius: 8px;
  background: #fff;
  padding: 40px;
}
.card-img-container {
  width: 300px;
  /* height: 400px; */
  overflow: hidden;
  border-radius: 8px;
}
.tag {
  font-size: 20px;
  width: fit-content;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
