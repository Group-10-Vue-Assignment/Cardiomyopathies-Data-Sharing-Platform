<template>
  <div v-show="!user" class="non-user">
    <div class="navbar-fixed">
      <nav class="blue-grey lighten-1 noSelect">
        <div class="nav-wrapper">
          <a
            href="#"
            class="noSelect brand-logo tooltipped"
            data-position="bottom"
            data-tooltip="A data sharing platform for the different types of cardiomyopathies"
            >Cardiomyopathy Hub</a
          >
          <a href="#" data-target="mobile-demo-nonuser" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <NonUserNavBarList />
          </ul>
        </div>
      </nav>
    </div>
    <ul class="sidenav" id="mobile-demo-nonuser">
      <NonUserNavBarList />
    </ul>
  </div>
  <div v-show="user" class="user-items">
    <div class="navbar-fixed">
      <nav class="blue-grey lighten-1 noSelect">
        <div class="nav-wrapper">
          <a
            href="#"
            class="noSelect brand-logo tooltipped"
            data-position="bottom"
            data-tooltip="A data sharing platform for the different types of cardiomyopathies"
            >Cardiomyopathy Hub</a
          >
          <a href="#" data-target="mobile-demo-user" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <UserNavBarList @handleClick="handleClick" />
          </ul>
        </div>
      </nav>
    </div>
    <ul class="sidenav" id="mobile-demo-user">
      <UserNavBarList @handleClick="handleClick" :horizontalSwitch="false" />
    </ul>
  </div>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import { projectAuth } from "../firebase/config";
import { useRouter } from "vue-router";
import NonUserNavBarList from "@/components/NonUserNavBarList.vue";
import UserNavBarList from "@/components/UserNavBarList.vue";

export default {
  components: {
    NonUserNavBarList,
    UserNavBarList
  },
  setup() {
    const router = useRouter();
    const { user } = getUser();
    console.log(user);

    //handle log out for user
    const handleClick = async () => {
      try {
        router.push({ name: "Login" });
        await projectAuth.signOut();
      } catch (err) {
        console.log(err.message);
      }
    };

    return { user, handleClick };
  }
};
</script>

<style scoped>
@media only screen and (min-width: 993px) {
  .brand-logo {
    left: 0.5rem;
  }
}

@media only screen and (max-width: 565px) {
  .brand-logo {
    width: 500px;
  }
}

.user-items {
  display: flex;
}

.non-user {
  display: flex;
}

.logout {
  margin-right: 8px;
  cursor: pointer;
}

.sidenav {
  text-align: left;
}
</style>
