<template>
        <v-card class="plant">
            <v-toolbar>
<v-toolbar-title>{{this.plant.PlantType&&this.plant.PlantType.description}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
            </v-card-text>
            </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Plant",
  props: ["initialPlant"],
  data() {
    return {
      plant: this.initialPlant
    };
  },
  methods: {
    ...mapActions([
      'refreshPlant',
      'deletePlant'
    ])
  },
  mounted() {
    this.refreshPlant(this.plant)
    .then(plant=>{
        this.plant = plant
    });
  }
};
</script>