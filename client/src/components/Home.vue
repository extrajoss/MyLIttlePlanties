<template>
  <div style="height: calc(100vh - 48px);overflow: auto">
    <v-layout 
      row
      wrap>      
      <v-flex class="xs6">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Canvas 2d Graphics</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div 
              id="rect"
              style="width: 200px; height: 200px"/>
            {{ pointerX }} - {{ pointerY }}
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="xs6">
        <v-card>
          <v-toolbar >
            <v-toolbar-title>Gardens</v-toolbar-title>
                        <v-text-field               
              v-validate="'required'"
              v-model="cityName"           
              :error-messages="errors.collect('city')"
              label="City"
              data-vv-name="city" /><v-btn @click="addGarden">+</v-btn>
          </v-toolbar>
          <v-card-text>
<Garden
  v-for="garden in gardens"
  v-bind:key="garden.id"
  v-bind:initialGarden="garden"
></Garden>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="xs6">
        <v-card>
          <v-toolbar>
            <img :src="imageSrc">
            <v-toolbar-title>Weather</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <pre>
              {{ text }}
            </pre>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <div style="height: 2em"/>
  </div>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.v-whiteframe {
  margin-right: 1em;
  margin-top: 1em;
  width: 100%;
  padding: 1em;
}
</style>

<script>
import rpc from "../modules/rpc";
import CanvasWidget from "../modules/canvas-widget";
import { mapGetters,mapActions,mapMutations } from "vuex";
import Garden from "./Garden"

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default {
  name: "Home",
  components: {Garden},
  computed: {
    ...mapGetters(["user","city","gardens"])
  },
  data() {
    return {
      text: "",
      error: "",
      icon: "01d",
      cityName: "Sydney",
      imageSrc: "http://openweathermap.org/img/w/10d.png",
      pointerX: 0,
      pointerY: 0
    };
  },
  watch: {
    cityName: function(val) {
      console.log("City Changed",this.city,val)
      if(this.city.name!==val){
        this.getWeather();
      }
    }
  },
  mounted() {
    this.refreshPlantTypes();
    this.refreshPlantStages();
    this.initCanvas();
    this.drawCanvas();
    this.getWeather();
    this.refreshGardens();
  },
  methods: {
    ...mapActions([
      'refreshPlantTypes',
      'refreshPlantStages',
      'refreshGardens',
      'addGarden'
    ]),
    ...mapMutations([
      'setCity'
    ]),
    async getWeather() {
      let response = await rpc.rpcRun("publicGetWeather", this.cityName);
      if (response.result) {
        this.setCity(response.result)
        this.text = JSON.stringify(this.city, null, "\t");
        this.icon = this.city.weather[0].icon;
        this.imageSrc = `http://openweathermap.org/img/w/${this.icon}.png`;
      } else {
        this.error = response.error.message;
      }
    },
    initCanvas() {
      this.canvasWidget = new CanvasWidget("#rect");
      this.canvasWidget.drawWidth = this.canvasWidget.width();
      this.canvasWidget.drawHeight = this.canvasWidget.height();
      this.canvasWidget.mousemove = e => {
        this.canvasWidget.getPointer(event);
        this.canvasWidget.drawWidth = this.canvasWidget.pointerX;
        this.canvasWidget.drawHeight = this.canvasWidget.pointerY;
        this.pointerX = this.canvasWidget.pointerX.toFixed(0);
        this.pointerY = this.canvasWidget.pointerY.toFixed(0);
        this.drawCanvas();
      };
    },
    drawCanvas() {
      for (let i = 0; i < 10; i += 1) {
        let x1 = Math.random() * this.canvasWidget.drawWidth;
        let y1 = Math.random() * this.canvasWidget.drawHeight;
        let x2 = Math.random() * (this.canvasWidget.drawWidth - x1);
        let y2 = Math.random() * (this.canvasWidget.drawHeight - y1);
        this.canvasWidget.fillRect(x1, y1, x2 - x1, y2 - y1, getRandomColor());
      }
    }
  }
};
</script>
