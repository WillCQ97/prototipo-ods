<template>
  <div>
    <div>
      <h1><em>Campus</em> de Alegre - Sede</h1>
      <h2>Mapa interativo</h2>
      <VisualMap
        :center="mapCenter"
        :geojson="geojson"
        :projects="projects"
        v-on:project-selected="showProjectInformation"
        v-on:show-form="showSubmissionForm"
      />
    </div>

    <div>
      <div id="pageDescription" v-if="pageDescriptionVisible">
        <h2>Saiba mais sobre a ação</h2>
        <p>
          Para visualizar as informações essenciais acerca de algum projeto,
          basta clicar no ícone do ODS marcado no mapa.
        </p>
        <p>
          Para informações mais detalhadas, selecione algum projeto no mapa e
          então clique no botão
          <strong>SAIBA MAIS</strong> que surgir no canto superior direito.
        </p>
        <h2>Sugerir uma ação</h2>
        <p>
          Se você deseja sugerir um projeto para ser adicionado ao mapa, clique
          no botão superior esquerdo e preencha o formulário com as informações
          necessárias. Sua requisição será a avaliada e poderá ser adicionada ao
          mapa.
        </p>
      </div>

      <div v-if="projectInfoVisible">
        <h2>Saiba mais sobre a ação</h2>

        <p>
          <strong>Ação:</strong> {{ project.name }} <br />
          <strong>Meta ODS relacionada: </strong> {{ project.metaods }} <br />
          <strong>Descrição/Objetivo: </strong> {{ project.description }} <br />
          <strong>Departamento: </strong> {{ project.departament }} <br />
          <strong>Coordenador:</strong> {{ project.coordinator }} <br />
          <strong>Vínculo com a UFES:</strong> {{ project.role }} <br />
          <strong>E-mail: </strong> {{ project.email }}
        </p>
        <p><v-btn v-on:click="btnVoltarAction">Voltar</v-btn></p>
      </div>
    </div>
    <div>
      <ProjectForm
        v-if="submissionFormVisible"
        v-on:hide-form="btnVoltarAction"
      />
    </div>
  </div>
</template>

<script>
import featuresAlegre from "assets/features_alegre.js";
import projectsAlegre from "assets/projects_alegre.json";

export default {
  name: "Alegre",
  data() {
    return {
      pageDescriptionVisible: true,
      submissionFormVisible: false,
      projectInfoVisible: false,
      mapCenter: [-20.76161, -41.536],
      geojson: featuresAlegre,
      projects: projectsAlegre,
      project: {},
    };
  },
  methods: {
    showProjectInformation(projectData) {
      this.pageDescriptionVisible = false;
      this.project = projectData;
      this.projectInfoVisible = true;
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
</style>