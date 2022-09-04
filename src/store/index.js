import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state() {
    return {
      films:{}, 
      film:{},
      error:null
    }
  },
  mutations: {
  },
  actions: {
    async addFilms(_){
      await axios.get(
        `https://floating-sierra-20135.herokuapp.com/api/movies`
      ).then((response) => (this.state.films =  response.data.data)).catch(error=>console.log(error));
    },
    async addOneFilm(_, id){
      await axios.get(
        `https://floating-sierra-20135.herokuapp.com/api/movie/${id}`
      ).then((response) => (this.state.film = response.data.data)).catch(error=>this.state.error = error);
    },

  },
  getters:{
  },
  modules: {
  }
})
