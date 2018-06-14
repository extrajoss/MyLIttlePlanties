<template>
        <v-card class="pot">
            <v-toolbar>
<v-toolbar-title><v-btn @click="deletePot(pot)">-</v-btn>{{this.pot.id}}</v-toolbar-title>
<v-select
          :items="plantTypes"
          item-text="description"
          item-value="id"
          v-model="plantTypeId"
          label="Type"
          single-line
        ></v-select>
<v-btn @click="addPlantLocal({PotId:pot.id,PlantTypeId:plantTypeId})">+</v-btn>
            </v-toolbar>
            <v-card-text>        
<Plant
  v-for="plant in pot.Plants"
  v-bind:key="plant.id"
  v-bind:initialPlant="plant"
></Plant>
            </v-card-text>
            </v-card>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
import Plant from "./Plant"

export default {
  name: "Pot",
  props: ["initialPot"],
  components: {Plant},
  data() {
    return {
      pot: this.initialPot,
      plantTypeId: null
    };
  },
  computed: {
    ...mapGetters(["plantTypes"])
  },
  methods: {
    ...mapActions([
      'refreshPot',
      'deletePot',
      'addPlant'
    ]),
    async addPlantLocal(values){
      this.pot = await this.addPlant(values)
      }
  },
  mounted() {
    this.refreshPot(this.pot)
    .then(pot=>{
        this.pot = pot
    });
  }
};
</script>