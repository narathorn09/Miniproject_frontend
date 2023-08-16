<template>
  <a-card hoverable class="card-container" headStyle="font-size: 30px; height: 80px;">
    <h2>{{ title }}</h2>
    <div class="card-img-container">
      <a-Image class="card-img" :src="'data:image/jpeg;base64,' + photoData" />
    </div>
    <h3>คะแนนรีวิวจากแอดมิน : {{ adminRating }}/10</h3>
    <h3>คะแนนรีวิวเฉลี่ย : {{ averageRating }}/10</h3>
    <p>{{ description }}</p>
  </a-card>
</template>

<script>
export default {
  name: "CardBoardGame",
  props: ["titel", "description", "photoData", "adminRating", "averageRating"],
  data() {
    return {
      text: "CardBoardGame",
    };
  },
};
</script>

<style scoped>
.card-container {
  width: 100%;
}
.card-img-container {
  width: 300px;
  /* height: 400px; */
  overflow: hidden;

}
.card-img {
  /* width: fit-content; */
  height: 100%;
  object-fit: cover;
}

</style>
