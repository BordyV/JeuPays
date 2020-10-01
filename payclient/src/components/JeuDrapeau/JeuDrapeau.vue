<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./JeuDrapeauStyle.css" scoped></style>

<template src="./JeuDrapeauTemplate.html"></template>

<script>
import PaysCard from '@/components/PaysCard';
export default {
  name: "JeuDrapeau",
  components: {
    PaysCard
  },
  data: () => {
    return {
      lesPays: undefined,
      lesPaysRegion: undefined,
      //les pays qui passent pendant le jeu
      lesPaysATrouver: [],
      //le pays qui passe pendant le jeu 
      randomPays: undefined,
      paysInput: undefined,
      paysPasse: 0,
      paysATrouver: 10,
      regionATrouver: [],
      nbErreurPaysCourant: 0,
      nbErreurPossible: 3,
      paysTrouves: 0,
      parametreJeuDrapeau: false,
    };
  },
  mounted() {
    this.parametreJeuDrapeau = true;
    this.getPays(() => {
      this.setRandomPays(() => {});
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
    getPaysRegion(region, callback) {
      var url = "https://restcountries.eu/rest/v2/region/"+region;
      fetch(url)
        .then((response) => {
          response.json().then((data) => {
            this.lesPaysRegion = data;
            console.log(this.lesPaysRegion);
            callback();
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Une erreur est survenue lors du chargement des données");
        });
    },
    setRandomPays(callback) {
      var min = Math.ceil(0);
      var max = Math.floor(this.lesPays.length);
      var rando = Math.floor(Math.random() * (max - min)) + min;
      callback();
      //on fait un random pour avoir le pays
      this.randomPays = this.lesPays[rando];
      //on fait un tant que les pays a déjà été trouvé on random le pays
      while(this.lesPaysATrouver.includes(this.randomPays))
      {

        this.randomPays = this.lesPays[rando];
      }
    },
    correctionPays() {
      if (this.paysInput) {
        if (this.randomPays.translations.fr) {
          //si le petit est égal a la traduction francaise ou anglaise
          if (
            this.normalizePays(this.paysInput).toLowerCase() ===
              this.normalizePays(
                this.randomPays.translations.fr
              ).toLowerCase() ||
            this.normalizePays(this.paysInput).toLowerCase() ===
              this.normalizePays(this.randomPays.name).toLowerCase()
          ) {
              this.validerLemot(true);
          }
          //si on a pas trouvé le nom du pays
          else {
            if (this.nbErreurPaysCourant < this.nbErreurPossible) {
              this.nbErreurPaysCourant++;
              this.paysInput = this.randomPays.translations.fr.slice(
                0,
                this.nbErreurPaysCourant
              );
            } else {
              this.validerLemot(false);
            }
          }
        }
        //si la tradution francaise n'existe pas 
        else
        {
          if (this.normalizePays(this.paysInput).toLowerCase() ===
              this.normalizePays(this.randomPays.name).toLowerCase())
          {
              this.validerLemot(true);
          }
          else
          {
            if (this.nbErreurPaysCourant < this.nbErreurPossible) {
              this.nbErreurPaysCourant++;
              this.paysInput = this.randomPays.name.slice(
                0,
                this.nbErreurPaysCourant
              );
            } else {
              this.validerLemot(false);
            }
          }
        }
      }
    },
    validerLemot(val)
    {
        if (val ==true)
        {
          this.paysPasse++;
            this.paysTrouves++;
            this.paysInput = undefined;
            this.nbErreurPaysCourant = 0;
            this.setRandomPays(() => {
                this.lesPaysATrouver.push(this.randomPays);
            });
        }
        else
        {
              this.paysPasse++;
              this.paysInput = undefined;
              this.nbErreurPaysCourant = 0;
              this.setRandomPays(() => {
                this.lesPaysATrouver.push(this.randomPays);
              });
        }
    },
    normalizePays(pays) {
      return pays.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    passerPays() {
      this.validerLemot(false);
    },
    envoyerLesParametresJeu() {
      if(this.regionATrouver.length>0)
      {
        this.randomPays = undefined;
        this.lesPays = [];
        for(var region of this.regionATrouver)
        {
          if(region == "")
          {
            this.getPays( () => {
              this.setRandomPays(() => {});
            });
            this.parametreJeuDrapeau = false;
            return false;
          }
          this.getPaysRegion(region, () => {
            Array.prototype.push.apply(this.lesPays, this.lesPaysRegion);
            this.setRandomPays(() => {});
          });
        }
      }
      this.parametreJeuDrapeau = false;
      
    },
  },
};
</script>