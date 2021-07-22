<template>
  <div>
    <div>
      <h1><em>Campus</em> de Alegre - Sede</h1>
      <h2>Mapa interativo</h2>
      <MapTest
        :center="mapCenter"
        :geojson="geojson"
        :projects="projects"
        v-on:project-selected="showProjectInformation"
      />
    </div>
    <div>
      <h2>Saiba mais sobre a ação</h2>
      <p v-if="!selected">
        Selecione algum projeto no mapa para visualizar suas informações
        detalhadas.
      </p>
      <div v-if="selected">
        <!--Carregar a imagem, o título e o subtítulo da ODS-->
        <strong>Ação:</strong> {{ project.name }} <br />
        <strong>Meta ODS relacionada: </strong> {{ project.metaods }} <br />
        <strong>Descrição/Objetivo: </strong> {{ project.description }} <br />
        <strong>Departamento: </strong> {{ project.departament }} <br />
        <strong>Coordenador:</strong> {{ project.coordinator }} <br />
        <strong>Vínculo com a UFES:</strong> {{ project.role }} <br />
        <strong>E-mail: </strong> {{ project.email }}
      </div>
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
      selected: false,
      mapCenter: [-20.76161, -41.536],
      geojson: featuresAlegre,
      projects: projectsAlegre,
      project: {},
    };
  },
  methods: {
    showProjectInformation(data) {
      this.project = data;
      this.selected = true;
    },
  },
};
</script>

