<template>
  <v-card class="mx-auto" max-width="600" tile>
    <v-list>
      <v-subheader>Projetos Submetidos</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          three-line
          v-for="(project, index) in projects"
          v-bind:key="index"
        >
          <v-list-item-content>
            <v-list-item-title
              ><strong>Ação: </strong>{{ project.acao }}</v-list-item-title
            >
            <v-list-item-subtitle>
              <strong>Descrição: </strong>{{ project.descricao }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <strong>Coordenador: </strong>{{ project.coordenador.nome }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import submissions from "assets/submissions.json";

export default {
  name: "PageSubmissions",
  data() {
    return {
      projects: submissions,
      selectedItem: -1,
    };
  },
};
</script>
