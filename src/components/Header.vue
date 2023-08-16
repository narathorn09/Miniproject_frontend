<template>
  <a-layout-header class="main-container">
    <div class="content-container">
      <span>BoardGameBonto</span>
    </div>
    <div class="nav-container">
      <a class="link-button" @click="goToHomePage">หน้าแรก</a>
      <a-button v-if="isAuth" @click="openChildModalFunction"
        >เข้าสู่ระบบ</a-button>
      <a-dropdown v-if="!isAuth" :placement="bottomRight" arrow>
        <a-button>{{ auth?.username }}</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item v-if="isAdmin">
              <a class="link-menu" @click="goToAboutPage">จัดการ</a>
            </a-menu-item>
            <a-menu-item>
              <a class="link-menu" @click="logout">ออกจากระบบ</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
  <ModalLogin ref="modalLogin" />
</template>

<script>
import ModalLogin from "./ModalLogin.vue";

export default {
  name: "HeaderBar",
  components: {
    ModalLogin,
  },
  data() {
    return {
      isModalOpen: false,
      auth: JSON.parse(localStorage.getItem("auth")),
    };
  },
  computed: {
    isAdmin() {
      return this.auth && this.auth.userType === "1";
    },
    isAuth() {
      return !this.auth ? true : false;
    },
  },

  methods: {
    goToHomePage() {
      this.$router.push("/");
    },
    goToAboutPage() {
      this.$router.push("/adminmenu");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
      this.$router.go(0);
    },
    openChildModalFunction() {
      this.$refs.modalLogin.showModal(); // Call the child component's function
    },
  },
  // created() {

  // },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 100px;
  padding-right: 100px;
  color: #fff;
  /* width: 100%; */
}
.content-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.nav-container {
  width: auto;
}

.link-button {
  margin-right: 40px;
  transition: color 0.3s;
}
.link-button:hover {
  text-decoration: none;
}
.link-menu:hover{
  text-decoration: none;
}
</style>
