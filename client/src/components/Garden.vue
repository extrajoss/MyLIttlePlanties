<template>
        <v-card class="garden">
            <v-toolbar>
<v-toolbar-title><v-btn @click="deleteGarden(currentGarden)">-</v-btn>{{this.garden.City&&this.garden.City.name}}</v-toolbar-title>
<v-btn v-if="garden.id !== currentGarden.id" @click="refreshCurrentGarden(garden)">Show Garden</v-btn><v-btn v-else @click="addPot(currentGarden)">+</v-btn>
            </v-toolbar>
            <v-card-text v-if="garden.id === currentGarden.id">
                <Pot
  v-for="pot in currentGarden.Pots"
  v-bind:key="pot.id"
  v-bind:initialPot="pot"
></Pot>
            </v-card-text>
            </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Pot from "./Pot"

export default {
  name: "Garden",
  components: {Pot},
  computed:{
      ...mapGetters(["currentGarden"])
  },
  props: ["initialGarden"],
  data() {
    return {
      garden: this.initialGarden
    };
  },
  methods: {
    ...mapActions([
      'deleteGarden',
      'refreshCurrentGarden',
      'addPot'
    ])
  },
  mounted() {
    this.refreshCurrentGarden(this.garden)
    .then(garden=>{
        this.garden = garden
    });
  }
};
</script>