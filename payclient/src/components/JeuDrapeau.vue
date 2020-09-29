<template>
  <div class="jeudrapeau">
    <div v-if="paysPasse != paysATrouver && randomPays">
      
      <h2>{{paysPasse +"/"+ paysATrouver + " pays"}}</h2>
      <img width="25%" :src="randomPays.flag" />
      <div class="md-layout">
        <md-field :class="{ 'md-invalid': nbErreurPaysCourant > 0 }" class="md-layout-item">
          <label for="first-name">Quel est le pays correspondant au drapeau ?</label>
          <md-input name="paysInput" id="paysInput" v-model="paysInput" @change="correctionPays()"/>
          <span class="md-error"> {{nbErreurPaysCourant + "/" + nbErreurPossible}}</span>
          </md-field>
          <md-button class="md-raised md-primary" @click="passerPays()" >Passer le pays</md-button>
      </div>
    </div>

    <div v-if="paysPasse == paysATrouver">
      <h1>Tu as trouvé {{paysTrouves}} sur {{paysATrouver}} pays.</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "JeuDrapeau",
  data: () => {
    return {
      lesPays: undefined,
      randomPays: undefined,
      paysInput: undefined,
      paysPasse :0,
      paysATrouver: 3,
      nbErreurPaysCourant: 0,
      nbErreurPossible: 3,
      paysTrouves: 0,
    };
  },
  mounted() {
    this.getPays(() => {
      this.setRandomPays();
    });
  },
  methods: {
    getPays(callback) {
      var url = "https://restcountries.eu/rest/v2/all";
      fetch(url)
        .then((response) => {
          response.json().then((data) => {
            this.lesPays = data;
            console.log(this.lesPays);
            callback();
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Une erreur est survenue lors du chargement des données");
        });
    },
    setRandomPays() {
      var min = Math.ceil(0);
      var max = Math.floor(this.lesPays.length);
      var rando = Math.floor(Math.random() * (max - min)) + min;
      this.randomPays = this.lesPays[rando];
    },
    correctionPays() {
      if (this.paysInput) {
        //si le petit est égal a la traduction francaise ou anglaise
        if (
          this.normalizePays(this.paysInput).toLowerCase() ===
            this.normalizePays(this.randomPays.translations.fr).toLowerCase() ||
          this.normalizePays(this.paysInput).toLowerCase() ===
            this.normalizePays(this.randomPays.name).toLowerCase()
        ) {
          this.paysPasse ++;
          this.paysTrouves++;
          this.paysInput = undefined;
          this.nbErreurPaysCourant = 0;
          this.setRandomPays();
        } 
        //si on a pas trouvé le nom du pays
        else {
          if(this.nbErreurPaysCourant < this.nbErreurPossible)
          {
            this.nbErreurPaysCourant ++;
            this.paysInput = this.randomPays.translations.fr.slice(0,this.nbErreurPaysCourant);
          }
          else
          {
            this.paysPasse++;
            this.paysInput = undefined;
            this.nbErreurPaysCourant = 0;
            this.setRandomPays();
          }
        }
      }
    },
    normalizePays(pays) {
      return pays.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    passerPays() {
      this.paysPasse ++;
      this.setRandomPays();   
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jeudrapeau {
  margin: 5%;
  margin-top: 2%;
}
</style>
