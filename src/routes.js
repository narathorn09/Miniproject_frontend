import HomePage from './pages/Home.vue';
import CreateBoardGame from './pages/CreateBoardGame.vue';
import ListBoardGame from './pages/ListBoardGame.vue';
import EditBoardGame from './pages/EditBoardGame.vue';
import ListUser from './pages/ListUser.vue';
import CreateUser from './pages/CreateUser.vue';
import EditUser from './pages/EditUser.vue';
import BoardGameDetailById from './pages/BoardGameDetailById.vue';

const auth = JSON.parse(localStorage.getItem('auth'));

let routes = []

if(auth?.userType === '1'){
  routes = [
    { path: '/', component: HomePage, meta: { title: 'Home - BoardGame' } },
    { path: '/boardgame-detail/:gameId', component: BoardGameDetailById, meta: { title: 'Detail - BoardGame' } },
    { path: '/manage-boardgame', component: ListBoardGame, meta: { title: 'Admin Menu - BoardGame' } },
    { path: '/create-boardgame', component: CreateBoardGame, meta: { title: 'Admin Menu - BoardGame' } },
    { path: '/edit-boardgame/:gameId', component: EditBoardGame, meta: { title: 'Admin Menu - BoardGame' } },
    { path: '/manage-user', component: ListUser, meta: { title: 'Admin Menu - BoardGame' } },
    { path: '/create-user', component: CreateUser, meta: { title: 'Admin Menu - BoardGame' } },
    { path: '/edit-user/:userId', component: EditUser, meta: { title: 'Admin Menu - BoardGame' } },
  ];
}else if(auth?.userType === '0'){
   routes = [
    { path: '/', component: HomePage, meta: { title: 'Home - BoardGame' } },
    { path: '/boardgame-detail/:gameId', component: BoardGameDetailById, meta: { title: 'Detail - BoardGame' } },
  ];
}else{
  routes = [
    { path: '/', component: HomePage, meta: { title: 'Home - BoardGame' } },
    { path: '/boardgame-detail/:gameId', component: BoardGameDetailById, meta: { title: 'Detail - BoardGame' } },
  ];
}


export default routes;
