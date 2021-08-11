<template>
  <div>
    <h1>Cadastro de ação</h1>
    <p>
      Informe os campos a seguir para submeter uma ação e, após apreciação da
      comissão, ela poderá ser incluída no mapa.
    </p>
    <p>
      <strong>Ação: </strong>
      <v-text-field
        label="Título ou nome da ação"
        :rules="rules"
        v-model="acao"
      ></v-text-field>
    </p>
    <p>
      <strong>ODS relacionado: </strong>

      <v-btn-toggle group id="ods-btn-toggle" v-model="odsSelected">
        <v-btn
          v-for="ods in objectives"
          v-bind:key="ods.id"
          height="100px"
          width="100px"
        >
          <v-img :src="getODSImage(ods.id)"></v-img>
        </v-btn>
      </v-btn-toggle>
    </p>

    <p><strong>Metas Nacionais por ODS: </strong></p>
    <p v-if="odsSelected == null" style="color: #60646a">
      Clique em uma ODS para exibição das metas relacionadas.
    </p>

    <v-list-item-group v-if="odsSelected != null">
      <v-list-item
        two-line
        v-for="item in getMetas(odsSelected)"
        v-bind:key="item.meta"
      >
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox :input-value="active"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              <strong>Meta {{ item.meta }} </strong>
            </v-list-item-title>
            <v-list-item-subtitle>{{ item.descricao }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list-item-group>

    <p>
      <strong>Descrição/Objetivo: </strong>
      <v-textarea
        label="Descrição e objetivos da sua ação"
        :rules="rules"
        v-model="descricao"
      ></v-textarea>
    </p>
    <p>
      <strong>Departamento: </strong>
      <v-text-field
        label="Departamento da UFES onde a ação é desenvolvida"
        :rules="rules"
        v-model="departamento"
      ></v-text-field>
    </p>
    <p>
      <strong>Coordenador:</strong>
      <v-text-field
        label="Nome do coordenador da ação"
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
        label="E-mail do coordenador da ação"
        :rules="rules"
        v-model="email"
      ></v-text-field>
    </p>
    <p>
      <v-dialog v-model="dialog" width="200">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on"> Enviar proposta de ação </v-btn>
        </template>

        <v-card>
          <v-card-title>Sucesso</v-card-title>
          <v-card-text>Dados enviados !!!</v-card-text>
        </v-card>
      </v-dialog>

      <v-btn v-on:click="hideForm"> Voltar </v-btn>
    </p>
  </div>
</template>

<script>
import metasODS from "assets/metas_ods.json";

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
      objectives: metasODS.objetivos,
      submetas: metasODS.submetas,
      odsSelected: null,
    };
  },
  methods: {
    hideForm() {
      this.$emit("hide-form");
    },
    getODSImage(ods_number) {
      return "/img/ods_icons/" + ods_number + ".png";
    },
    getMetas(ods_number) {
      if (ods_number == null) {
        return;
      }

      let metas = [];
      for (let item of this.submetas) {
        if (item.meta.split(".")[0] == ods_number + 1) {
          metas.push(item);
        }
      }
      return metas;
    },
  },
};
</script>

<style>
#ods-btn-toggle {
  display: flex;
  flex-wrap: wrap;
}
</style>