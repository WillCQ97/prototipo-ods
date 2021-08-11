<template>
  <div>
    <h1>Mapa Colaborativo</h1>
    <h1><em>Campus</em> de Alegre - Sede</h1>
    <VisualMap
      :center="mapCenter"
      :geojson="geojson"
      :projects="projects"
      :bounds="bounds"
      v-on:project-selected="showProjectInformation"
      v-on:show-form="showSubmissionForm"
    />

    <div id="pageDescription" v-if="pageDescriptionVisible">
      <h2>Sugerir uma ação</h2>
      <p>
        Se você deseja sugerir uma ação, clique no botão
        <strong>ADICIONAR AÇÃO</strong> e preencha o formulário com as
        informações necessárias. Sua requisição será a avaliada e poderá ser
        adicionada ao mapa.
      </p>
      <h2>Saiba mais sobre a ação</h2>
      <p>
        Para visualizar as informações essenciais acerca de alguma ação, basta
        clicar no ícone do ODS marcado no mapa. Para informações mais
        detalhadas, após selecionar a ação clique no botão
        <strong>SAIBA MAIS</strong> que se habilitará.
      </p>
    </div>

    <div v-if="projectInfoVisible">
      <h2>Saiba mais sobre a ação</h2>

      <div id="metaods-project">
        <div>
          <v-img contain :src="projectImage" height="100" width="100"></v-img>
        </div>
        <p id="metaods-project-text" :style="getBackgroundColor(projectODS[2])">
          <strong>
            ODS {{ project.ods }}: {{ projectODS[0].toUpperCase() }}
            <br />
            {{ projectODS[1] }}
          </strong>
        </p>
      </div>

      <p>
        <strong>Ação:</strong> {{ project.name }} <br />
        <strong>Meta ODS relacionada: </strong> {{ project.meta_ods }} <br />
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
import projectsAlegre from "assets/projects_alegre.json";
import metasODS from "assets/metas_ods.json";

export default {
  name: "Alegre",
  data() {
    return {
      pageDescriptionVisible: true,
      submissionFormVisible: false,
      projectInfoVisible: false,
      mapCenter: [-20.76161, -41.536],
      bounds: [
        [-20.75885, -41.5391],
        [-20.76464, -41.53211],
      ],
      geojson: featuresAlegre,
      projects: projectsAlegre,
      project: {},
      projectImage: "",
      projectODS: [],
      objectives: metasODS.objetivos,
    };
  },
  methods: {
    getBackgroundColor(color_code) {
      return "backgroundColor: " + color_code + ";";
    },
    getODS(ods_number) {
      for (let objetivo of this.objectives) {
        if (objetivo.id == ods_number) {
          return [objetivo.nome, objetivo.descricao, objetivo.cor];
        }
      }
    },
    showProjectInformation(projectData) {
      this.pageDescriptionVisible = false;
      this.project = projectData;
      this.projectInfoVisible = true;
      this.projectImage = "/img/ods_icons/" + projectData.ods + ".png";
      this.projectODS = this.getODS(projectData.ods);
    },
    showSubmissionForm() {
      this.pageDescriptionVisible = false;
      this.projectInfoVisible = false;
      this.submissionFormVisible = true;
    },
    btnVoltarAction() {
      this.pageDescriptionVisible = true;
      this.projectInfoVisible = false;
      this.submissionFormVisible = false;
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