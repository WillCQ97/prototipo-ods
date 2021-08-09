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
        :rules="rules"
        v-model="acao"
      ></v-text-field>
    </p>
    <p>
      <strong>Meta ODS relacionada: </strong>
      <v-text-field
        label="Número da meta e submeta de ODS como, por exemplo, 2.3 ou 11.5"
        :rules="rules"
        v-model="meta"
      ></v-text-field>
    </p>
    <p>
      <strong>Descrição/Objetivo: </strong>
      <v-textarea
        label="Descrição e objetivos de seu projeto"
        :rules="rules"
        v-model="descricao"
      ></v-textarea>
    </p>
    <p>
      <strong>Departamento: </strong>
      <v-text-field
        label="Departamento da UFES onde o projeto é desenvolvido"
        :rules="rules"
        v-model="departamento"
      ></v-text-field>
    </p>
    <p>
      <strong>Coordenador:</strong>
      <v-text-field
        label="Nome do coordenador do projeto"
        :rules="rules"
        v-model="coordenador"
      ></v-text-field>
    </p>
    <p>
      <strong>Vínculo com a UFES:</strong>
      <v-text-field
        label="Vínculo do coordenador com a UFES, por exemplo, professor"
        :rules="rules"
        v-model="vinculo"
      ></v-text-field>
    </p>
    <p>
      <strong>E-mail: </strong>
      <v-text-field
        label="E-mail do coordenador do projeto"
        :rules="rules"
        v-model="email"
      ></v-text-field>
    </p>
    <p>
      <v-dialog v-model="dialog" width="200">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on"> Enviar projeto </v-btn>
        </template>

        <v-card>
          <v-card-title>Sucesso</v-card-title>
          <v-card-text>Dados enviados</v-card-text>
        </v-card>
      </v-dialog>
      <v-btn v-on:click="hideForm"> Voltar </v-btn>
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
      dialog: false,
      rules: [
        //fixme: validar as entradas informadas
        (value) => !!value || "Este campo é obrigatório.",
      ],
    };
  },
  methods: {
    hideForm() {
      this.$emit("hide-form");
    },
  },
};
</script>