<template>
  <div>
    <h1>Submissão de projeto</h1>
    <p>
      Informe os campos a seguir para submeter um projeto e após avaliação ele
      poderá ser incluído no mapa.
    </p>
    <p>
      <strong>Ação: </strong>
      <v-text-field
        label="Título ou nome do projeto"
        v-model="acao"
      ></v-text-field>

      <strong>Meta ODS relacionada: </strong>
      <v-text-field
        label="Número da meta e submeta de ODS como, por exemplo, 2.3 ou 11.5"
        v-model="meta"
      ></v-text-field>

      <strong>Descrição/Objetivo: </strong>
      <v-textarea
        label="Descrição e objetivos de seu projeto"
        v-model="descricao"
      ></v-textarea>

      <strong>Departamento: </strong>
      <v-text-field
        label="Departamento da UFES onde o projeto é desenvolvido"
        v-model="departamento"
      ></v-text-field>

      <strong>Coordenador:</strong>
      <v-text-field
        label="Nome do coordenador do projeto"
        v-model="coordenador"
      ></v-text-field>

      <strong>Vínculo com a UFES:</strong>
      <v-text-field
        label="Vínculo do coordenador com a UFES, por exemplo, professor"
        v-model="vinculo"
      ></v-text-field>

      <strong>E-mail: </strong>
      <v-text-field
        label="E-mail do coordenador do projeto"
        v-model="email"
      ></v-text-field>

      <v-btn v-on:click="enviarProjeto">Enviar projeto</v-btn>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      acao: "",
      meta: "",
      descricao: "",
      departamento: "",
      coordenador: "",
      vinculo: "",
      email: "",
    };
  },
  methods: {
    enviarProjeto() {
      console.log("Dados enviados");
    },
  },
};
</script>