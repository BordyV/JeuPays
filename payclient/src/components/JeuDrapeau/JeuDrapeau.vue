<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./JeuDrapeauStyle.css" scoped></style>

<template src="./JeuDrapeauTemplate.html"></template>

<script>
import PaysCard from "@/components/PaysCard";
export default {
  name: "JeuDrapeau",
  components: {
    PaysCard,
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
      //nombre de pays total lors du jeu
      paysPasse: 0,
      paysATrouver: 10,
      regionATrouver: [],
      nbErreurPaysCourant: 0,
      nbErreurPossible: 3,
      paysTrouves: 0,
      lesPaysTrouves: [],
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
    //fonction qui recupere tout les pays
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
    //fonction qui recupere les pays par region
    getPaysRegion(region, callback) {
      var url = "https://restcountries.eu/rest/v2/region/" + region;
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
      while (this.lesPaysATrouver.includes(this.randomPays)) {
        rando = Math.floor(Math.random() * (max - min)) + min;
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
        else {
          if (
            this.normalizePays(this.paysInput).toLowerCase() ===
            this.normalizePays(this.randomPays.name).toLowerCase()
          ) {
            this.validerLemot(true);
          } else {
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
    validerLemot(val) {
      if (val == true) {
        this.paysPasse++;
        this.paysTrouves++;
        this.lesPaysTrouves.push(this.randomPays);
        this.paysInput = undefined;
        this.nbErreurPaysCourant = 0;
        //si le nombre de paysPasse est différent du nombre de pays a trouver on continue le jeu
        if(this.paysPasse != this.paysATrouver)
        {
          this.setRandomPays(() => {
            this.lesPaysATrouver.push(this.randomPays);
          });
        }
        else
        {
          this.lesPaysATrouver.push(this.randomPays);

        }
      } else {
        this.paysPasse++;
        this.paysInput = undefined;
        this.nbErreurPaysCourant = 0;
         //si le nombre de paysPasse est différent du nombre de pays a trouver on continue le jeu
        if(this.paysPasse != this.paysATrouver)
        {
          this.setRandomPays(() => {
            this.lesPaysATrouver.push(this.randomPays);
          });
        }
        else
        {
          this.lesPaysATrouver.push(this.randomPays);

        }
      }
    },
    normalizePays(pays) {
      return pays.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    passerPays() {
      this.validerLemot(false);
    },
    envoyerLesParametresJeu() {
      if (this.regionATrouver.length > 0) {
        this.randomPays = undefined;
        this.lesPays = [];
        for (var region of this.regionATrouver) {
          //si la region n'est egal a rien c'est a dire toutes les regions du monde
          if (region == "" || region == undefined) {
            //on recupere tous les pays
            this.getPays(() => {
              this.setRandomPays(() => {});
              //si le nombre de pays que l'utilisateur veut est superieur au nombre de pays qu'on a
              //alors on met le max possible
              
              if (this.paysATrouver > this.lesPays.length) {
                this.paysATrouver = this.lesPays.length;
              }
            });
            this.parametreJeuDrapeau = false;
            return false;
          }
          //on recupere les pays de la region en cours
          this.getPaysRegion(region, () => {
            Array.prototype.push.apply(this.lesPays, this.lesPaysRegion);
            this.setRandomPays(() => {});

            //si le nombre de pays que l'utilisateur veut est superieur au nombre de pays qu'on a
            //alors on met le max possible
            if (this.paysATrouver > this.lesPays.length) {
              this.paysATrouver = this.lesPays.length;
            }
          });
        }
      }
      else{
        this.regionATrouver= [""];
        this.envoyerLesParametresJeu();
      }
      this.parametreJeuDrapeau = false;
    },
  },
};
</script>