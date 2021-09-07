<template>
  <div>
    <h1>Mapa Colaborativo</h1>
    <h1><em>Campus</em> de Alegre - Sede</h1>
    <VisualMap
      :bounds="bounds"
      :center="mapCenter"
      :geojson="geojson"
      :projects="projects"
      :submissionMarker="submissionMarker"
      v-on:project-selected="showProjectInformation"
      v-on:show-form="showSubmissionForm"
    />

    <div id="page-description" v-if="pageDescriptionVisible">
      <h2>Cadastrar uma ação</h2>
      <p>
        Se você deseja cadastrar uma ação, clique no botão
        <strong>ADICIONAR AÇÃO</strong> e preencha o formulário com as
        informações necessárias. Sua requisição será apreciada, para posterior
        publicação no mapa.
      </p>
      <h2>Saiba mais sobre a ação</h2>
      <p>
        Para visualizar as informações essenciais acerca de alguma ação, basta
        clicar no ícone do ODS marcado no mapa. Para informações mais
        detalhadas, clique em <strong>SAIBA MAIS</strong>.
      </p>
    </div>

    <div v-if="projectInformationVisible">
      <h2>Saiba mais sobre a ação</h2>

      <div id="metaods-project">
        <div>
          <v-img
            contain
            :src="projectGoalImage"
            height="100"
            width="100"
          ></v-img>
        </div>
        <p
          id="metaods-project-text"
          :style="styleBackgroundColor(projectGoal.color)"
        >
          <strong>
            ODS {{ projectGoal.id }}: {{ projectGoal.name.toUpperCase() }}
            <br />
            {{ projectGoal.description }}
          </strong>
        </p>
      </div>

      <p>
        <strong>Ação:</strong> {{ project.name }} <br />
        <strong>Meta ODS relacionada: </strong> {{ project.targetId }} <br />
        <strong>Descrição/Objetivo: </strong> {{ project.description }} <br />
        <strong>Departamento: </strong> {{ project.departament }} <br />
        <strong>Coordenador:</strong> {{ project.coordinator }} <br />
        <strong>Vínculo com a UFES:</strong> {{ project.role }} <br />
        <strong>E-mail: </strong> {{ project.email }}
      </p>
      <p><v-btn v-on:click="btnVoltarAction">Voltar</v-btn></p>
    </div>

    <div>
      <ProjectForm
        :submissionLocation="submissionMarker.position"
        v-if="submissionFormVisible"
        v-on:hide-form="btnVoltarAction"
      />
    </div>

    <div id="ods-ufes-logo">
      <v-img src="/img/ods-ufes-logo.png" max-width="300"></v-img>
    </div>
  </div>
</template>

<script>
import featuresAlegre from "assets/features_alegre.js";
import odsData from "assets/ods_goals.json";

export default {
  name: "Alegre",
  data() {
    return {
      bounds: [
        [-20.75885, -41.5391],
        [-20.76464, -41.53211],
      ],
      geojson: featuresAlegre,
      mapCenter: [-20.76161, -41.536],
      odsGoals: odsData.goals,
      pageDescriptionVisible: true,
      project: {},
      projects: this.$store.state.projects.list,
      projectInformationVisible: false,
      projectGoal: {},
      projectGoalImage: "",
      submissionFormVisible: false,
      submissionInitialPosition: { lat: -20.76161, lng: -41.536 },
      submissionMarker: {
        position: { lat: -20.76161, lng: -41.536 },
        draggable: true,
        visible: false,
      },
    };
  },
  methods: {
    styleBackgroundColor(colorCode) {
      return "backgroundColor: " + colorCode + ";";
    },
    getGoal(odsNumber) {
      for (let goal of this.odsGoals) {
        if (goal.id == odsNumber) {
          return goal;
        }
      }
    },
    showProjectInformation(projectData) {
      this.pageDescriptionVisible = false;
      this.project = projectData;
      this.projectGoal = this.getGoal(projectData.goalId);
      this.projectGoalImage = "/img/ods_icons/" + projectData.goalId + ".png";
      this.projectInformationVisible = true;
      this.submissionFormVisible = false;
    },
    showSubmissionForm() {
      this.pageDescriptionVisible = false;
      this.projectInformationVisible = false;
      this.submissionFormVisible = true;
    },
    btnVoltarAction() {
      this.pageDescriptionVisible = true;
      this.projectInformationVisible = false;
      this.submissionFormVisible = false;
      this.submissionMarker.visible = false;
      this.submissionMarker.position = this.submissionInitialPosition;
    },
  },
};
</script>

<style>
h2#suggestion-title {
  padding-top: 15px;
}
div#metaods-project {
  display: flex;
}
p#metaods-project-text {
  padding: 10px;
  margin-left: 10px;
  align-self: center;
}
div#ods-ufes-logo {
  display: flex;
  justify-content: center;
}
</style>