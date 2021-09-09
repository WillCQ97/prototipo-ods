<template>
  <div>
    <h1>Cadastro de ação</h1>
    <p>
      Informe os campos a seguir para submeter uma ação e, após apreciação da
      comissão, ela poderá ser incluída no mapa.
    </p>
    <p>
      <strong>Atenção:</strong> você deve mover o marcador azul que surgiu no
      mapa para selecionar o local onde o projeto é desenvolvido. Se possível,
      evite colocá-lo imediatamente acima de outros projetos.
    </p>
    <p>
      <strong>Ação*: </strong>
      <v-text-field
        label="Título ou nome da ação"
        :rules="rules"
        v-model="fieldAction"
      ></v-text-field>
    </p>
    <p>
      <strong>ODS relacionado*: </strong>

      <v-btn-toggle group id="ods-btn-toggle" v-model="goalSelectedIndex">
        <v-btn
          v-for="goal in odsGoals"
          v-bind:key="goal.id"
          height="100px"
          width="100px"
        >
          <v-img :src="getODSImage(goal.id)"></v-img>
        </v-btn>
      </v-btn-toggle>
    </p>

    <p><strong>Metas Nacionais por ODS*: </strong></p>

    <p v-if="goalSelectedIndex == null" style="color: #60646a">
      Clique em uma ODS para exibição das metas relacionadas.
    </p>

    <div v-if="goalSelectedIndex != null" id="ods-selected">
      <div>
        <v-img
          :src="getODSImage(goalSelectedIndex + 1)"
          width="50px"
          height="50px"
          contain
        ></v-img>
      </div>
      <p id="ods-selected-text">
        <strong>{{ getGoalDescription(goalSelectedIndex + 1) }}</strong>
      </p>
    </div>

    <v-list-item-group
      v-if="goalSelectedIndex != null"
      v-model="targetSelectedIndex"
    >
      <v-list-item
        two-line
        v-for="target in getTargetsODS(goalSelectedIndex + 1)"
        v-bind:key="target.id"
      >
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox :input-value="active"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              <strong>Meta {{ target.id }} </strong>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ target.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list-item-group>

    <p>
      <strong>Descrição/Objetivo*: </strong>
      <v-textarea
        label="Descrição e objetivos da sua ação"
        :rules="rules"
        v-model="fieldDescription"
      ></v-textarea>
    </p>
    <p>
      <strong>Centro*: </strong>
      <v-combobox
        label="Centro onde a ação é desenvolvida"
        :items="fieldCenterItems"
        :rules="rules"
        v-model="fieldCenterValue"
      ></v-combobox>
    </p>
    <p>
      <strong>Departamento*: </strong>
      <v-text-field
        label="Departamento da UFES onde a ação é desenvolvida"
        :rules="rules"
        v-model="fieldDepartament"
      ></v-text-field>
    </p>
    <p>
      <strong>Coordenador*: </strong>
      <v-text-field
        label="Nome do coordenador da ação"
        :rules="rules"
        v-model="fieldCoordinator"
      ></v-text-field>
    </p>
    <p>
      <strong>Vínculo com a UFES*: </strong>
      <v-combobox
        label="Vínculo do coordenador com a UFES, por exemplo, professor"
        :items="fieldRoleItems"
        :rules="rules"
        v-model="fieldRoleValue"
      ></v-combobox>
    </p>
    <p>
      <strong>E-mail*: </strong>
      <v-text-field
        label="E-mail do coordenador da ação"
        :rules="rules"
        v-model="fieldEmail"
      ></v-text-field>
    </p>

    <p>
      <v-btn v-on:click="sendForm"> Enviar proposta de ação </v-btn>
      <v-btn v-on:click="cleanFormFields"> Limpar campos </v-btn>
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
import odsData from "assets/ods_goals.json";

export default {
  props: {
    submissionLocation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fieldAction: "",
      fieldCenterItems: [
        "Centro de Artes (CAr)",
        "Centro de Ciências Agrárias e Engenharias (CCAE)",
        "Centro de Ciências Exatas (CCE)",
        "Centro de Ciências Exatas, Naturais e da Saúde (CCENS)",
        "Centro de Ciências Humanas e Naturais (CCHN)",
        "Centro de Ciências Jurídicas e Econômicas (CCJE)",
        "Centro de Ciências da Saúde (CCS)",
        "Centro de Educação (CE)",
        "Centro de Educação Física e Desportos (CEFD)",
        "Centro Tecnológico (CT)",
        "Centro Universitário Norte do Espírito Santo (Ceunes)",
        "Hospital Universitário Cassiano Antônio Moraes (Hucam)",
        "Reitoria (incluindo Pró-Reitorias, Secretarias, Superintendências, Institutos, Bibliotecas, etc.)",
      ],
      fieldCenterValue: "",
      fieldCoordinator: "",
      fieldDepartament: "",
      fieldDescription: "",
      fieldEmail: "",
      fieldRoleItems: [
        "Professor",
        "Servidor técnico-administrativo",
        "Aluno de pós-graduação",
        "Aluno de graduação",
      ],
      fieldRoleValue: "",
      dialogSuccess: false,
      dialogError: false,
      rules: [
        //fixme: validar as entradas informadas
        (value) => !!value || "Este campo é obrigatório.",
      ],
      //fixme: gerenciar melhor as listas de targets e ods
      odsGoals: odsData.goals,
      odsTargets: odsData.targets,
      targetsSelected: [],
      goalSelectedIndex: null,
      targetSelectedIndex: null,
    };
  },
  methods: {
    addZeroToDate(number) {
      if (number <= 9) {
        return "0" + number;
      }
      return number;
    },
    cleanFormFields() {
      this.fieldAction = "";
      this.fieldCenter = "";
      this.fieldCoordinator = "";
      this.fieldDepartament = "";
      this.fieldDescription = "";
      this.fieldEmail = "";
      this.fieldRoleValue = "";
      this.goalSelectedIndex = null;
      this.targetSelectedIndex = null;
    },
    dateFormatted() {
      let date = new Date();
      return (
        date.getFullYear() +
        "-" +
        this.addZeroToDate(date.getMonth() + 1) +
        "-" +
        this.addZeroToDate(date.getDate())
      );
    },
    hideForm() {
      this.$emit("hide-form");
    },
    getODSImage(odsNumber) {
      return "/img/ods_icons/" + odsNumber + ".png";
    },
    getGoalDescription(odsNumber) {
      for (let goal of this.odsGoals) {
        if (goal.id == odsNumber) {
          return goal.description;
        }
      }
    },
    getTargetsODS(odsNumber) {
      if (odsNumber == null) {
        return;
      }

      let targets = [];
      for (let target of this.odsTargets) {
        if (target.id.split(".")[0] == odsNumber) {
          targets.push(target);
        }
      }
      this.targetsSelected = targets;
      return targets;
    },
    sendForm() {
      let campos = [
        this.fieldAction,
        this.fieldCenterValue,
        this.fieldCoordinator,
        this.fieldDepartament,
        this.fieldDescription,
        this.fieldEmail,
        this.fieldRoleValue,
      ];

      for (let campo of campos) {
        if (campo.trim() === "") {
          this.dialogError = true;
          return;
        }
      }

      if (this.goalSelectedIndex == null || this.targetSelectedIndex == null) {
        this.dialogError = true;
        return;
      }

      this.$store.commit("submissions/add", {
        date: this.dateFormatted(),
        project: {
          id: this.$store.state.submissions.nextIndex,
          action: this.fieldAction,
          target_id: this.targetsSelected[this.targetSelectedIndex].id,
          description: this.fieldDescription,
          location: {
            center: this.fieldCenterValue,
            departament: this.fieldDepartament,
            coord: [this.submissionLocation.lat, this.submissionLocation.lng],
          },
          coordinator: {
            name: this.fieldCoordinator,
            role: this.fieldRoleValue,
            email: this.fieldEmail,
          },
        },
      });

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