<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="teal" light>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Topics</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-group
        v-for="(project, index) in projects"
        :key="index"
        v-model="project.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              ><strong>Ação: </strong>{{ project.acao }}</v-list-item-title
            >
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              <strong>Descrição: </strong>
              {{ project.descricao }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{project.meta_ods}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{project.local.centro}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{project.local.departamento}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{project.coordenador.nome}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
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
