<template>
  <div class="home">
    <h4>Фильмы</h4>
    <input type="checkbox" value="1" id="checkbox1" v-model="checkSort" />
    <label for="checkbox1">Отсортировать по названию</label>
    <input type="checkbox" value="2" id="checkbox2" v-model="checkSort" />
    <label for="checkbox2">Отсортировать по году</label>
    <hr />
    <pre-loader />
    <div class="list__film">
      <div v-for="(film, index) in films" :key="index" class="film">
        <div class="fon-poster">
          <img
            :src="film.frames[0]"
            v-if="film.frames"
            class="poster__img"
            alt="poster"
          />
          <img
            src="https://st.kp.yandex.net/images/no-poster.gif"
            class="poster__img"
            v-else
          />
        </div>
        <div class="about__film">
          <a class="router-text" @click="about(film.id)">{{ film.title }}</a>
          <p>
            {{ film.year }}
            <span
              style="margin-right: 5px"
              v-for="(genre, index) in film.genres"
              :key="index"
              >{{ genre.toUpperCase() }}
            </span>
          </p>
          <p v-if="film.directors != null">
            РЕЖИСЕР:
            <span v-for="direct in film.directors" :key="direct">{{
              direct.toUpperCase()
            }}</span>
          </p>
          <p v-if="film.actors != null">
            АКТЕРЫ:
            <span
              v-for="(actor, index) in film.actors"
              :key="index"
              class="about__film-actors"
              >{{ actor
              }}<span v-if="index != film.actors.length - 1">, </span></span
            >
          </p>
          <p v-if="film.description != null" class="about__film-description">
            {{ film.description }}
          </p>
          <div class="film__time" v-if="film.collapse.duration != null">
            <p>
              {{ film.collapse.duration[0]
              }}<img src="../assets/Vector.png" class="film__time-img" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreLoader from "../components/PreLoader.vue";
export default {
  name: "Home",
  data() {
    return {
      films: {},
      noSortFilms:{},
      aboutFilm: [],
      firstFrame: "",
      checkSort: [],
    };
  },
  async created() {
    await this.$store.dispatch("addFilms");
    this.films = this.$store.state.films;
    this.noSortFilms = JSON.parse(JSON.stringify(this.films))
  },
  methods: {
    about(id) {
      this.$router.push(`/about/${id}`);
    },
  },
  watch: {
    checkSort: function (val) {
      if (val.length == 2) {
        this.checkSort.splice(0, 1);
      }
      else if (val.length == 0){
        const noSort = JSON.parse(JSON.stringify(this.noSortFilms))
        this.films = noSort
      }
      if (val[0] == 1) {
        this.films.sort(function (d1, d2) {
          return d1.title > d2.title ? 1 : -1;
        });
      } else if (val[0] == 2) {
        this.films.sort(function (d1, d2) {
          return d1.year > d2.year ? 1 : -1;
        });
      }
    },
  },
  computed: {},
  components: {
    PreLoader,
  },
};
</script>
<style lang="scss">
.film {
  display: flex;
  margin-top: 16px;
  background-color: #4d4747;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.film:hover{
  transform: translate(0px, -8px);
  transition: all 0.5s ease;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.35);
}
.fon-poster {
  position: relative;
  min-width: 168px;
  text-align: center;
  background-color: #c4c4c4;
  margin: 0;
  padding: 0;
  border: none;
}
.poster__img {
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  max-width: 168px;
  max-height: 100%;
  vertical-align: middle;
}
.about__film {
  position: relative;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 24px;
  margin-left: 24px;
  p {
    font-size: 12px;
    margin-bottom: 8px;
  }
}
.about__film-actors {
  color: #e5e5e5;
  font-size: 12px;
}
.about__film-description {
  font-size: 16px;
  color: #e5e5e5;
}
.film__time {
  position: absolute;
  color: black;
  font-family: "Roboto";
  font-size: 12px;
  top: 0;
  right: 0;
  height: 0;
  width: 160px;
  border-bottom: 50px solid #c4c4c4;
  border-left: 24px solid transparent;
  p {
    margin-left: 10px;
  }
}
.film__time-img {
  vertical-align: -5px;
  padding-left: 12px;
  margin-top: 5px;
}
.home {
  max-width: 1400px;
  margin: 0 auto;
  text-align: left;
  h4 {
    margin-top: 48px;
    margin-bottom: 18px;
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;
  }
  .router-text {
    text-decoration: none;
    cursor: pointer;
    color: white;
    font-size: 36px;
    font-family: "Roboto";
  }
  input[type="checkbox"] {
    display: none;
  }
  label {
    font-size: 16px;
    margin-bottom: 18px;
  }
  hr {
    margin-top: 18px;
  }
  label:nth-child(5) {
    margin-left: 34.5px;
  }
  label:before {
    content: " ";
    display: inline-block;
    margin-right: 10.5px;
    position: relative;
    text-align: center;
    width: 15px;
    height: 15px;
    background: #363232;
    border: 1px solid #e3e3e3;
    border-image: initial;
    vertical-align: middle;
  }
  input:checked + label:before {
    background-image: url("../assets/Path.png");
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(255, 82, 82, 0.98);
    color: white;
  }
}
</style>
