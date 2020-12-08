import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex)
  
export default new Vuex.Store({
    state: {
        text: '测试',
        liqCity1:"",
        liqCity2:"",
        liqCity3:"",
        vehCity1:"",
        vehCity2:"",
        vehCity3:"",
        vehCity4:"",
        gdaCity1:"",
        gdaCity2:"",
        gdaCity3:"",
         
        // 液化
        liqueProportion:"",
        liqueRecord:"",
        liqueStatus:"",
        liqueWeek:"",
        liqueUser:"",
        liqueUnit:"",
        liqueContr:"",
        liqueNumber:"",
        // 车用
        carInformation:"",
        carRecord:"",
        carSector:"",
        carrankStatus:"",
        carunitNum:"",
        carTions:"",
        carCard:"",
        carHardware:"",
        
        // 工业
        totalNumCylinders:"",
        totalOrders:"",
        totalUnit:"",
        totalRecord:"",   
        totalWareNumber:"",
        totalPersonnel:"",
        totalBottle:"",
        totalStatus:"",
        totalfindBottle:"",
        totalByStatus:""
   
    

    },
    mutations: {
        TOLIQCITY1:(state, key)=>{
            state.liqCity1 = key
            console.log(key)
         },
        TOLIQCITY2:(state, key)=>{state.liqCity2 = key},
        TOLIQCITY3:(state, key)=>{state.liqCity3 = key},
        LIQUEPROPORTION:(state,key)=>{state.liqueProportion = key},
        LIQUERECORD:(state,key)=>{state.liqueRecord = key},
        LIQUESTATUS:(state,key)=>{state.liqueStatus = key},
        LIQUEWEEK:(state,key)=>{state.liqueWeek = key},
        LIQUEUSER:(state,key)=>{state.liqueUser = key},
        LIQUEUNIT:(state,key)=>{state.liqueUnit = key},
        LIQUECONTR:(state,key)=>{state.liqueContr = key},
        LIQUENumber:(state,key)=>{state.liqueNumber = key},

        TOVEHCITY1:(state, key) =>{state.vehCity1 = key},
        TOVEHCITY2:(state, key) =>{state.vehCity2 = key},
        TOVEHCITY3:(state, key) =>{state.vehCity3 = key},
        TOVEHCITY4:(state, key) =>{state.vehCity4 = key},

        TOGDACITY1:(state, key) =>{state.gdaCity1 = key},
        TOGDACITY2:(state, key) =>{state.gdaCity2 = key},
        TOGDACITY3:(state, key) =>{state.gdaCity3 = key},
      
        TOGDAMAPDATALINDERS:(state,key)=>{state.totalNumCylinders=key},
        TOGDAMAPDATAORDER:(state,key)=>{state.totalOrders=key},
        TOGDAMAUNIT:(state,key)=>{state.totalUnit=key},
        TOGDAMRECORD:(state,key)=>{state.totalRecord=key},
        TOGDAMWARENUMBER:(state,key)=>{state.totalWareNumber=key},
        TOGDAMPERSONNEL:(state,key)=>{state.totalPersonnel=key},
        TOGDAMBOTTLE:(state,key)=>{state.totalBottle=key},
        TOGDAMSTATUS:(state,key)=>{state.totalStatus=key},
        TOGDAMFINDBOTTLE:(state,key)=>{state.totalfindBottle=key},
        TOGDAMBYSTATUS:(state,key)=>{state.totalByStatus=key},


        CARINFORMATION:(state,key)=>{state.carInformation=key},
        CARRECORD:(state,key)=>{state.carRecord=key},
        CARSECTOR:(state,key)=>{state.carSector=key},
        CARRANKSTATUS:(state,key)=>{state.carrankStatus=key},
        CARUNITNUM:(state,key)=>{state.carunitNum=key},
        CARTIONS:(state,key)=>{state.carTions=key},
        CARCARD:(state,key)=>{state.carCard=key},
        CARHARDWARE:(state,key)=>{state.carHardware=key}
        
    },
})