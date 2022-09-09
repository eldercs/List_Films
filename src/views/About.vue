<template>
  <div class="about">
    <div class="about__back">
      <router-link to="/"
        ><img src="../assets/Arrow.svg" class="about__back-img" />Назад к
        списку</router-link
      >
    </div>
    <hr />
    <div class="film" v-if="JSON.stringify(film) !== '{}'">
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
        <h2 class="router-text">{{ film.title }}</h2>
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
            }}<span v-if="index !== film.actors.length - 1">, </span></span
          >
        </p>
        <p v-if="film.description != null" class="about__film-description">
          {{ film.description }}
        </p>
        <div class="film__time" v-if="film.collapse && film.collapse.duration != null">
          <p>
            {{ film.collapse.duration[0] }} <img src="../assets/Vector.png" class="film__time-img" />
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="$store.state.error != null" class="text_error">
      <h2>К сожалению по вашему запросу ничего не найдено</h2>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  name: "About",
  data() {
    return {
      film: {},
    };
  },
  async created() {
    if (this.$store.state.films.length === 0 || this.$store.state.films.length === undefined) {
      await this.$store.dispatch("addOneFilm", this.id)
      this.film = this.$store.state.film
    } else {
      for (let i of this.$store.state.films) {
        if (i.id == this.id) {
          this.film = i;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.about {
  text-align: left;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 42px;
  a {
    color: #ff5252;
  }
}
.about__back {
  font-size: 20px;
  margin-bottom: 22px;
}
.about__back-img {
  vertical-align: -5px;
  margin-right: 16px;
}
.text_error{
  font-family: 'Roboto';
  font-size:32px;
  font-weight: 500;
  color:#FFFFFF;
}
</style>
