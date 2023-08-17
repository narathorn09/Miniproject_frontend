<template>
  <a-carousel autoplay class="img-cover-container">
    <img
      class="img-hero"
      src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    />
    <img
      class="img-hero"
      src="https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    />
    <img
      class="img-hero"
      src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    />
    <img
      class="img-hero"
      src="https://images.unsplash.com/photo-1461696114087-397271a7aedc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    />
  </a-carousel>
  <div class="container-text-relative">
    <h1>BOARD GAME BONTO</h1>
    <h2>บอร์ดเกมบนโต๊ะ</h2>
    <h3>เล่นกันบนโต๊ะนะอย่าลงไปเล่นใต้โต๊ะ</h3>
    <p>เว็บไซต์สำหรับรีวิวบอร์ดเกม ที่ไม่เหมือนใครและไม่มีใครเหมือน</p>
  </div>
</template>
<script>
export default {
  name: "ImgHeroCover",
};
</script>

<style scoped>
.img-cover-container {
  margin-left: -100px;
  margin-right: -100px;
  margin-top: -40px;
}

:deep(.slick-slide) {
  text-align: center;
  height: 500px;
  line-height:500px;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}

.img-hero {
  object-fit: contain;
}
.container-text-relative {
  position: relative;
  top: -380px;
  margin-bottom: -200px;
  text-align: center;
}
h1 {
  font-size: 60px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgb(255, 255, 255);
}

h2 {
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 40px;
  color: rgb(222, 222, 222);
}

h3 {
  font-size: 16px;
  font-weight: normal;
  margin-top: 30px;
  margin-bottom: 10px;
  color: rgb(222, 222, 222);
}

p{
  font-size: 16px;
  font-weight: normal;
  margin-top: 10px;
  margin-bottom: 20px;
  color: rgb(222, 222, 222);
}

</style>
