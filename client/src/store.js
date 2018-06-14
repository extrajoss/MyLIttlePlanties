import Vue from 'vue'
import Vuex from 'vuex'

import rpc from "./modules/rpc";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      authenticated: false
    },
    city:{},
    currentGarden:null,
    gardens:[],
    pots:[],
    plantTypes:[],
    plantStages:[]
  },  
  getters: {
    user: state => state.user,
    city: state => state.city,
    currentGarden: state => state.currentGarden,
    gardens: state => state.gardens,
    pots: state => state.pots,
    plantTypes: state => state.plantTypes,
    plantStages: state => state.plantStages
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setCity (state, city) {
      state.city = city
    },
    setCurrentGarden (state, currentGarden) {
      state.currentGarden = currentGarden
    },
    setGardens (state, gardens) {
      state.gardens = gardens
    },
    setPots (state, pots) {
      state.pots = pots
    },
    setPlantTypes (state, plantTypes) {
      state.plantTypes = plantTypes
    },
    setPlantStages (state, plantStages) {
      state.plantStages = plantStages
    }
  },
  actions:{
    async refreshGardens({commit,state}){
      let response = await rpc.rpcRun("fetchGardens", {User:state.user});
      if (response.result) {
        commit("setGardens", response.result)
        if(!state.currentGarden && state.gardens.length>0 ){
          console.log("setting currentGarden from gardens",state.gardens[0])
          commit("setCurrentGarden", state.gardens[0])
        }
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async refreshCurrentGarden({commit,dispatch,state},garden){
      let response = await rpc.rpcRun("fetchGarden", garden);
      if (response.result) {
        console.log("setting currentGarden",response.result)
        commit("setCurrentGarden", response.result)
        dispatch("refreshGardens")
        return response.result
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async addGarden({commit,dispatch,state}){
      let response = await rpc.rpcRun("createGarden", {
        User: state.user,
        City: state.city
      });
      if (response.result) {
        console.log("setting currentGarden",response.result)
        commit("setCurrentGarden", response.result)
        dispatch("refreshGardens")
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async deleteGarden({commit,dispatch},garden) {
      let response = await rpc.rpcRun("deleteGarden", garden);
      if (response.result) {
        console.log("setting currentGarden",{})
        commit("setCurrentGarden", {})
        dispatch("refreshGardens")
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async refreshPot({commit,state},pot){
      let response = await rpc.rpcRun("fetchPot", pot);
      if (response.result) {
        return response.result
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async addPot({commit,dispatch,state},garden) {
      let response = await rpc.rpcRun("createPot", {Garden:garden});
      if (response.result) {
        commit("setCurrentGarden", response.result) 
      } else if (response.error){
        console.error(response.error.message);
      }
    },
    async deletePot({commit,dispatch,state},pot) {
      let response = await rpc.rpcRun("deletePot", pot);
      if (response.result) {
        commit("setCurrentGarden", response.result) 
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async refreshPlant({commit,state},plant){
      let response = await rpc.rpcRun("fetchPlant", plant);
      if (response.result) {
        return response.result
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async addPlant({commit,dispatch,state},plant) {
      let response = await rpc.rpcRun("createPlant", plant);
      if (response.result) {
        return response.result
      } else if (response.error){
        console.error(response.error.message);
      }
    },
    async deletePlant({commit,dispatch,state},plant) {
      let response = await rpc.rpcRun("deletePlant", plant);
      if (response.result) {
        return response.result
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async refreshPlantTypes({commit,state}){
      let response = await rpc.rpcRun("fetchPlantTypes");
      if (response.result) {
        commit("setPlantTypes", response.result)
      } else if (response.error){
        console.error(response.error.message)
      }
    },
    async refreshPlantStages({commit,state}){
      let response = await rpc.rpcRun("fetchPlantStages");
      if (response.result) {
        commit("setPlantStages", response.result)
      } else if (response.error){
        console.error(response.error.message)
      }
    }
  }
})

export default store
