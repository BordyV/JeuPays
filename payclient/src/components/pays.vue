<template>
  <div class="petitpays">
    <div v-if="pays">
      <h1>{{ pays.length }}</h1>
      <div v-for="item in pays" :key="item.name">
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{item.translations.fr}}</div>
            <v-list-item-title class="headline mb-1">
              {{item.name}}
            </v-list-item-title>
            <v-list-item-subtitle
              >{{item.subregion}}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-avatar size="80" color="grey" tile><v-img :src="item.flag"></v-img></v-avatar>
        </v-list-item>
      </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pays",
  data: () => {
    return {
      pays: undefined,
    };
  },
  mounted() {
    this.getPays();
  },
  methods: {
    getPays() {
      var url = "https://restcountries.eu/rest/v2/all";
      fetch(url)
        .then((response) => {
          response.json().then((data) => {
            this.pays = data;
            console.log(this.pays);
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Une erreur est survenue lors du chargement des données");
        });
    },
    getDrapeauPays() {
      return this.pays.flag;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
