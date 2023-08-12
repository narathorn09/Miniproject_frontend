<!-- Example component -->
<!-- <template>
 <div :class="appBar">
    <button @click="goToHomePage">Go to Home Page</button>
    <button @click="goToAboutPage">Go to About Page</button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      className: 'appBar',
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push('/');
    },
    goToAboutPage() {
      this.$router.push('/about');
    },
  },
};
</script> -->
<template>
  <a-layout>
    <a-layout-header
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 100px;
        padding-right: 100px;
        color: #fff;
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span> BoardGame Bonto</span>
        <a-input-search
          v-model:value="value"
          placeholder="Search BoardGame"
          style="width: 400px; background-color: transparent; margin-left: 20px"
          @search="onSearch"
        />
      </div>

      <a-button>LOGIN</a-button>
    </a-layout-header>
    <a-layout-content
      style="padding-left: 100px; padding-right: 100px; padding-bottom: 40px"
    >
      <a-row
        v-if="boardGameData"
        style="justify-content: space-between; align-items: start"
      >
        <a-col
          v-for="game in boardGameData"
          :key="game.id"
          :span="24"
          style="margin-top: 40px"
        >
          <a-card hoverable style="width: 100%">
            <h2>{{ game.title }}</h2>
            <!-- <div style="width: 100px; height: 100px;"> -->
            <a-Image
              style="width: 300px; height: 100%; object-fit: contain"
              :src="'data:image/jpeg;base64,' + game.photoData"
            />
            <!-- </div> -->
            <h3>คะแนนรีวิวจากแอดมิน : {{ game.adminRating }}/10</h3>
            <h3>คะแนนรีวิวเฉลี่ย : {{ game.averageRating }}/10</h3>
            <p>{{ game.description }}</p>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer style="text-align: center; background-color: rgb(255, 255, 255)">© 2023 BoardGame Bonto, All Rights Reserved</a-layout-footer>
  </a-layout>
</template>

<script setup>
import {
  Button as AButton,
  Image as AImage,
  Card as ACard,
  Row as ARow,
  Col as ACol,
  Layout as ALayout,
} from "ant-design-vue";

// const { AHeader, AContent } = ALayout;
</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      boardGameData: null,
    };
  },

  methods: {
    async fetchBoardGameData() {
      try {
        const response = await axios.get("http://localhost:9000/boardgame");
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
