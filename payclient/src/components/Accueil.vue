<template>
  <div class="accueil">
    <h1>
      <router-link to="/jeuDrapeau">Aller sur le jeu des drapeaux</router-link>
    </h1>

  <h2>Bienvenue sur le projet du jeu des pays ! </h2>
  <h2>Ce projet consiste à réviser ses drapeaux sous forme d'un jeu.</h2>
  <h2>Vous pouvez choisir le nombre de drapeaux et de continents que vous souhaitez pour vous entrainer !</h2>
  <br>
  <h2>/!\Attention certains drapeaux peuvent être en double.</h2>
  <h2> Par exemple, Svalbard (qui n'est pas un pays mais une archipel de la Norvège) à le même drapeau que la Norvège. </h2>
  <h2> Ceci est du à l'api qui est utilisé. </h2>
  
  <h2>Une version v2 du projet est en cours et sera disponible sur mobile. </h2>
  <h2>Amusez-vous bien !! </h2>

      <h1>
      <router-link to="/jeuDrapeau">Aller sur le jeu des drapeaux</router-link>
    </h1>

  </div>
</template>

<script>
export default {
  name: "accueil",
  data: () => {
    return {
      
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
