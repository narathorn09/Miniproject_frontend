<template>
  <a-layout-header class="main-container">
    <div class="content-container">
      <span>BoardGameBonto</span>
    </div>
    <div class="nav-container">
      <a class="link-button" @click="goToHomePage">หน้าแรก</a>
      <a-button v-if="isAuth" @click="openChildModalFunction">
        เข้าสู่ระบบ
      </a-button>
      <a-dropdown v-if="!isAuth" :placement="bottomRight" arrow>
        <a-button>{{ auth?.username }}</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item v-if="isAdmin">
              <a class="link-menu" @click="goToManageBoardGamePage">จัดการบอร์ดเกม</a>
            </a-menu-item>
            <a-menu-item v-if="isAdmin">
              <a class="link-menu" @click="goToManageUserPage">จัดการผู้ใช้</a>
            </a-menu-item>
            <a-menu-item>
              <a class="link-menu" @click="logout">ออกจากระบบ</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
  <ModalLoginAndRegis ref="modalLogin" />
</template>

<script>
import ModalLoginAndRegis from "./ModalLoginAndRegis.vue";

export default {
  name: "HeaderBar",
  components: {
    ModalLoginAndRegis,
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
    goToManageBoardGamePage() {
      this.$router.push("/manage-boardgame");
    },
    goToManageUserPage() {
      this.$router.push("/manage-user");
    },
    logout() {
      localStorage.clear();
      // this.$router.go(0);
      // window.location.reload();
      // this.$router.push("/");
      this.$router.go("/");
      
    },
    openChildModalFunction() {
      this.$refs.modalLogin.showModal();
    },
  },
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
