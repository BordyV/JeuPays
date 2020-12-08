<template>
  <div class="payscard">
    <div class="cardPays" :v-bind="paysDeLaCard">
        <md-card>
          <md-card-media>
            <img :src="paysDeLaCard.flag" alt="paysDeLaCard.name">
          </md-card-media>
    
          <md-card-header>
            <div class="md-title" v-bind:class="[reussite]" v-if="paysDeLaCard.translations.fr"> {{paysDeLaCard.translations.fr}}</div>
            <div class="md-title" v-else> {{paysDeLaCard.name}}</div>
            <div class="md-subhead" v-if="paysDeLaCard.capital">Capitale: {{paysDeLaCard.capital}}</div>
            <div class="md-subhead" v-else>Capitale inconnue</div>
          </md-card-header>

        </md-card>
      </div>
  </div>
</template>

<script>
export default {
  name: "paysCard",
  props: ["paysDeLaCard","reussite"],
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

.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
.cardPays {
  display: inline;
}
.echec {
  color: #CE1126;
}
.succes {
  color: #009543;
}
</style>
