<template>
  <div class="petitpays">
      <div v-if="pays">
          <table></table>
        <img alt="Drapeau" :src="getDrapeauPays()">
        <h1 >{{ pays.translations.fr}}</h1>
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
  mounted () {
      this.getPays();
  },
  methods: {
    getPays() {    
      var url = "https://restcountries.eu/rest/v2/all";
      fetch(url)
        .then((response) => {
          response.json().then((data) => {
              
            this.pays = data[0];
            console.log(this.pays);
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Une erreur est survenue lors du chargement des données");
        });
    },
    getDrapeauPays()
    {
        return this.pays.flag;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
