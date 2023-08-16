<template>
  <ImgHeroCover />
  <a-col style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 150px">
    <a-input-search
      class="input-search"
      size="large"
      v-model:value="searchValue"
      placeholder="ค้นหาบอร์ดเกม"
      @search="onSearch"
    />
    <!-- <span>จำนวนบอร์ดเกมที่พบ {{ boardGameData?.length }}</span> -->
  </a-col>

  <div v-if="isHaveBoardGameData" style="margin-top: -130px;">
    <div
      v-for="(game, index) in boardGameData"
      :key="index"
      style="margin-top: 10px"
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

  <a-empty
    v-else-if="!isHaveBoardGameData"
    style="height: 200px; justify-content: center; align-self: center"
  >
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
      boardGamesSearch: [],
      boardGameData: null,
    };
  },

  computed: {
    searchResults() {
      if (!this.value) {
        return this.boardGameData;
      }
      const searchTerm = this.value.toLowerCase();
      return this.boardGameData.filter((game) =>
        game.title.toLowerCase().includes(searchTerm)
      );
    },
    isHaveBoardGameData(){
      return this.boardGameData?.length > 0 ? true : false;
    }
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

    async onSearch(newValue) {
      try {
        this.searchValue = newValue;
        const response = await request.get("/searchBoardGame", {
          params: {
            title: this.searchValue,
          },
        });
        this.boardGameData = response.data;
      } catch (error) {
        console.error("Error fetching board game data:", error);
      }
    },
  },

  created() {
    // Fetch data when the component is created
    this.fetchBoardGameData();
  },
};
</script>

<style scoped>
.input-search {
  width: 50%;
  font-family: "Prompt", sans-serif;
  margin-top: -360px;
}
</style>
