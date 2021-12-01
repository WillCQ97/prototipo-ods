<template>
  <div>
    <h1><em>Campus</em> de São Mateus</h1>
    <VisualMap
      :bounds="bounds"
      :center="mapCenter"
      :formButtonDisabled="true"
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
        <br />
        <strong>Ação:</strong> {{ project.name }} <br /><br />
        <strong>Meta ODS relacionada: </strong> <br />
        <strong>{{ projectTarget.id }}</strong> -
        {{ projectTarget.description }} <br /><br />
        <strong>Descrição/Objetivo: </strong> {{ project.description }}
        <br /><br />
        <strong>Departamento: </strong> {{ project.departament }} <br /><br />
        <strong>Coordenador:</strong> {{ project.coordinator }} <br /><br />
        <strong>Vínculo com a UFES:</strong> {{ project.role }} <br /><br />
        <!--<strong>E-mail: </strong> {{ project.email }}<br />-->
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
import allFeatures from "assets/all_features.js";
import odsData from "assets/ods_goals.json";
// fixme: tratar os projetos usando store ao invés do json diretamente
import projects from "assets/projects_sm.json";

export default {
  name: "SaoMateus",
  data() {
    return {
      bounds: [
        [-18.67119, -39.86451],
        [-18.67869, -39.85459],
      ],
      geojson: allFeatures.sao_mateus,
      mapCenter: [-18.6752, -39.86186],
      odsGoals: odsData.goals,
      odsTargets: odsData.targets,
      pageDescriptionVisible: true,
      project: {},
      projects: projects,
      projectInformationVisible: false,
      projectGoal: {},
      projectGoalImage: "",
      projectTarget: {},
      submissionFormVisible: false,
      submissionInitialPosition: { lat: -18.675281, lng: -39.862261 },
      submissionMarker: {
        position: { lat: -18.675281, lng: -39.862261 },
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
    getTarget(targetID) {
      for (let target of this.odsTargets) {
        if (target.id == targetID) {
          return target;
        }
      }
    },
    showProjectInformation(projectData) {
      this.pageDescriptionVisible = false;
      this.project = projectData;
      this.projectGoal = this.getGoal(projectData.goalId);
      this.projectTarget = this.getTarget(projectData.targetId);
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