<template>
  <a-card
    hoverable
    class="card-container"
    headStyle="font-size: 24px; "
    @click="goToBoardGameDetailById(gameId)"
  >
    <h2>{{ title }}</h2>
    <div style="display: flex; flex-direction: row; margin-top: -10px">
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
            :src="'data:image/jpeg;base64,' + photoData"
            :preview="false"
          />
        </div>
      </a-col>
      <a-col>
        <h3>
          คะแนนรีวิวจากแอดมิน :
          <a-tag color="geekblue" class="tag">
            <span>{{ adminRating }}/10</span>
          </a-tag>
        </h3>
        <h3>
          คะแนนรีวิวเฉลี่ย :
          <a-tag color="green" class="tag">
            <span>{{ averageRating.toFixed(1) }}/10</span>
          </a-tag>
        </h3>
        <p>{{ description }}</p>
      </a-col>
    </div>
  </a-card>
</template>

<script>
export default {
  name: "CardBoardGame",
  props: [
    "gameId",
    "titel",
    "description",
    "photoData",
    "adminRating",
    "averageRating",
  ],
  methods: {
    goToBoardGameDetailById(gameId) {
      this.$router.push(`/boardgame-detail/${gameId}`);
    },
  },
};
</script>

<style scoped>
.card-container {
  width: 100%;
  padding: 24px;
}
.card-container:hover {
  background-color: rgb(215, 232, 255);
}
.card-img-container {
  width: 300px;
  /* height: 400px; */
  overflow: hidden;
  border-radius: 8px;
}
.card-img {
  /* width: fit-content; */
  /* height: 100%; */
  /* object-fit: cover; */
  border-radius: 8px;
}
.tag {
  font-size: 20px;
  width: fit-content;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
}

h3 {
  /* margin-top: -2px; */
}
</style>
