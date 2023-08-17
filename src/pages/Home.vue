<template>
  <ImgHeroCover />
  <a-col class="input-search-container">
    <a-input-search
      class="input-search"
      size="large"
      v-model:value="searchValue"
      placeholder="ค้นหาบอร์ดเกม"
      @search="onSearch"
    />
  </a-col>

  <div v-if="isHaveBoardGameData" class="card-container">
    <div
      v-for="(game, index) in boardGameData"
      :key="index"
      class="card-content"
    >
      <CardBoardGame
        :title="game.title"
        :description="game.description"
        :photoData="game.photoData"
        :adminRating="game.adminRating"
        :averageRating="game.averageRating"
      />
    </div>
  </div>

  <a-empty v-else-if="!isHaveBoardGameData" class="empty-container">
    <template #description>
      <span> ไม่พบบอร์ดเกมที่ค้นหา </span>
    </template>
  </a-empty>
</template>

<script>
import { request } from "../../axios-config";
import CardBoardGame from "../components/CardBoardGame.vue";
import ImgHeroCover from "../components/ImgHeroCover.vue";

export default {
  name: "HomePage",
  components: {
    CardBoardGame,
    ImgHeroCover,
  },

  data() {
    return {
      searchValue: "",
      boardGameData: null,
    };
  },

  computed: {
    isHaveBoardGameData() {
      return this.boardGameData?.length > 0 ? true : false;
    },
  },

  methods: {
    async fetchBoardGameData() {
      try {
        const response = await request.get("/boardgame");
        this.boardGameData = response.data;
      } catch (error) {
        console.error("Error fetching board game data:", error);
      }
    },

    async onSearch(titleValue) {
      try {
        this.searchValue = titleValue;
        const response = await request.get("/searchBoardGame", {
          params: {
            title: this.searchValue,
          },
        });
        this.boardGameData = response.data;
      } catch (error) {
        console.error("Error search board game data:", error);
      }
    },
  },

  created() {
    this.fetchBoardGameData();
  },
};
</script>

<style scoped>
.input-search-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 150px; */
}
.input-search {
  width: 50%;
  top: -150px;
  z-index: 2;
  height: 0px;
  position: relative;
  transform: scale(1.2);
}
.card-container {
  /* margin-top: -130px; */
}
.card-content {
  margin-top: 10px;
}
.empty-container {
  height: 200px;
  justify-content: center;
  align-self: center;
}
</style>
