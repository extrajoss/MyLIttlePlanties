<template>
  <v-toolbar dark>
    <v-layout>
      <v-flex xs2>
        <h2 class="md-title"
            style="
        padding-left: 1em;
        cursor: pointer;
        flex: 1"
            @click="home()">
          {{ title }}
        </h2>
      </v-flex>
      <v-flex xs2>
        <div v-if="isUser">
          <v-menu bottom
                  left
                  open-on-hover>
            <v-btn slot="activator"
                   v-show="user.authenticated">
              {{user.name}}
            </v-btn>
            <v-list>
              <v-list-tile @click="editUser"
                           v-show="user.authenticated">
                <v-list-tile-title>Edit User</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="logout"
                           v-show="user.authenticated">
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
<v-btn v-show="!user.authenticated" to="/login">Login</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import auth from "../modules/auth";
import config from "../config";
export default {
  name: "navbar",
  data() {
    return {
      title: config.title,
      isUser: config.isUser
    };
  },
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  methods: {
    editUser() {
      this.$router.push("/edit-user");
    },
    home() {
      this.$router.push("/");
    },
    async logout() {
      await auth.logout();
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>