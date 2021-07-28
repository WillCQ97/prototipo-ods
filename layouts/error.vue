<template>
  <v-app dark>
    <div v-if="error.statusCode === 404">
      <h1>
        {{ pageNotFound }}
      </h1>
      <p>A página que você está tentando acessar não existe.</p>
    </div>
    <div v-else>
      <h1>
        {{ otherError }}
      </h1>
    </div>
    <NuxtLink to="/"> Página Inicial </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Conteúdo Não Encontrado",
      otherError: "Ocorreu um problema.",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
