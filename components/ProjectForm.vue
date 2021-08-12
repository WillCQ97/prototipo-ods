<template>
  <div>
    <h1>Cadastro de ação</h1>
    <p>
      Informe os campos a seguir para submeter uma ação e, após apreciação da
      comissão, ela poderá ser incluída no mapa.
    </p>
    <p>
      <strong>Ação*: </strong>
      <v-text-field
        label="Título ou nome da ação"
        :rules="rules"
        v-model="acao"
      ></v-text-field>
    </p>
    <p>
      <strong>ODS relacionado*: </strong>

      <v-btn-toggle group id="ods-btn-toggle" v-model="odsSelectedIndex">
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

    <p><strong>Metas Nacionais por ODS*: </strong></p>

    <p v-if="odsSelectedIndex == null" style="color: #60646a">
      Clique em uma ODS para exibição das metas relacionadas.
    </p>

    <div v-if="odsSelectedIndex != null" id="ods-selected">
      <div>
        <v-img
          :src="getODSImage(odsSelectedIndex + 1)"
          width="50px"
          height="50px"
          contain
        ></v-img>
      </div>
      <p id="ods-selected-text">
        <strong>{{ getODS(odsSelectedIndex + 1) }}</strong>
      </p>
    </div>

    <v-list-item-group
      v-if="odsSelectedIndex != null"
      v-model="metaSelectedIndex"
    >
      <v-list-item
        two-line
        v-for="item in getMetas(odsSelectedIndex + 1)"
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
      <strong>Descrição/Objetivo*: </strong>
      <v-textarea
        label="Descrição e objetivos da sua ação"
        :rules="rules"
        v-model="descricao"
      ></v-textarea>
    </p>
    <p>
      <strong>Departamento*: </strong>
      <v-text-field
        label="Departamento da UFES onde a ação é desenvolvida"
        :rules="rules"
        v-model="departamento"
      ></v-text-field>
    </p>
    <p>
      <strong>Coordenador*: </strong>
      <v-text-field
        label="Nome do coordenador da ação"
        :rules="rules"
        v-model="coordenador"
      ></v-text-field>
    </p>
    <p>
      <strong>Vínculo com a UFES*: </strong>
      <v-text-field
        label="Vínculo do coordenador com a UFES, por exemplo, professor"
        :rules="rules"
        v-model="vinculo"
      ></v-text-field>
    </p>
    <p>
      <strong>E-mail*: </strong>
      <v-text-field
        label="E-mail do coordenador da ação"
        :rules="rules"
        v-model="email"
      ></v-text-field>
    </p>

    <p>
      <v-btn v-on:click="sendForm"> Enviar proposta de ação </v-btn>
      <v-btn v-on:click="hideForm"> Voltar </v-btn>
    </p>

    <p>
      <v-dialog v-model="dialogSuccess" width="500">
        <v-card>
          <v-card-title>Sucesso!</v-card-title>
          <v-card-text>
            Sua ação foi enviada para contemplação pela comissão avaliadora.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialogSuccess = false"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogError" width="500">
        <v-card>
          <v-card-title>Erro!</v-card-title>
          <v-card-text>
            Existem campos que não foram informados. <br />
            Por favor, verifique-os e tente novamente!
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="dialogError = false">Voltar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </p>
  </div>
</template>

<script>
import metasODS from "assets/metas_ods.json";

export default {
  data() {
    return {
      acao: "",
      descricao: "",
      departamento: "",
      coordenador: "",
      vinculo: "",
      email: "",
      dialogSuccess: false,
      dialogError: false,
      rules: [
        //fixme: validar as entradas informadas
        (value) => !!value || "Este campo é obrigatório.",
      ],
      objectives: metasODS.objetivos,
      submetas: metasODS.submetas,
      odsSelectedIndex: null,
      metaSelectedIndex: null,
    };
  },
  methods: {
    hideForm() {
      this.$emit("hide-form");
    },
    getODSImage(ods_number) {
      return "/img/ods_icons/" + ods_number + ".png";
    },
    getODS(ods_number) {
      for (let objetivo of this.objectives) {
        if (objetivo.id == ods_number) {
          return objetivo.descricao;
        }
      }
    },
    getMetas(ods_number) {
      if (ods_number == null) {
        return;
      }

      let metas = [];
      for (let item of this.submetas) {
        if (item.meta.split(".")[0] == ods_number) {
          metas.push(item);
        }
      }
      return metas;
    },
    sendForm() {
      let campos = [
        this.acao,
        this.descricao,
        this.departamento,
        this.coordenador,
        this.vinculo,
        this.email,
      ];

      for (let campo of campos) {
        if (campo.trim() === "") {
          this.dialogError = true;
          return;
        }
      }

      if (this.odsSelectedIndex == null || this.metaSelectedIndex == null) {
        this.dialogError = true;
        return;
      }

      this.dialogSuccess = true;
    },
  },
};
</script>

<style>
#ods-btn-toggle {
  display: flex;
  flex-wrap: wrap;
}
#ods-selected {
  display: flex;
}
#ods-selected-text {
  padding-left: 5px;
  align-self: center;
}
</style>