<template>
  <v-card class="mx-auto" max-width="800" tile>
    <v-list>
      <v-subheader>Projetos Submetidos</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-if="submissions.length === 0">
          <v-list-item-content>
            <v-list-item-title>Não há novos envios.</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          two-line
          v-for="(submission, index) in submissions"
          v-bind:key="index"
        >
          <v-list-item-content>
            <v-list-item-title>
              <strong>Ação: </strong>{{ submission.project.action }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <strong>Meta ODS relacionada: </strong>
              {{ submission.project.target_id }} <br />
              <strong>Descrição: </strong>{{ submission.project.description }}
              <br />
              <strong>Centro: </strong>
              {{ submission.project.location.center }}
              <br />
              <strong>Departamento: </strong>
              {{ submission.project.location.departament }}
              <br />
              <strong>Coordenador: </strong>
              {{ submission.project.coordinator.name }}<br />
              <strong>Vínculo com a UFES: </strong>
              {{ submission.project.coordinator.role }} <br />
              <strong>E-mail: </strong>
              {{ submission.project.coordinator.email }}
              <br />
              <strong>Data de envio: </strong>{{ submission.date }}<br />
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon color="green" v-on:click="acceptSubmission(index)">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-action>
            <v-btn icon color="red" v-on:click="rejectSubmission(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "PageSubmissions",
  data() {
    return {
      submissions: this.$store.state.submissions.list,
      selectedItem: undefined,
    };
  },
  methods: {
    acceptSubmission(index) {
      this.$store.commit("projects/add", this.submissions[index].project);

      this.$store.commit("submissions/remove", this.submissions[index]);
    },
    rejectSubmission(index) {
      this.$store.commit("submissions/remove", this.submissions[index]);
    },
  },
};
</script>
