<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        :zoom="zoom"
        :options="mapOptions"
        :center="center"
        style="height: 525px; z-index: 1"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-geo-json
          v-if="showGeoJson"
          :geojson="geojson"
          :options="jsonOptions"
        />
        <l-marker
          v-for="marker in createProjectMarkers"
          v-bind:key="marker.id"
          v-bind:lat-lng="marker.coord"
          v-on:click="enableInfoButton(marker.projectData)"
        >
          <l-icon
            :icon-url="markerIconUrl"
            :icon-size="merkerIconSize"
          ></l-icon>
          <l-popup
            :content="marker.popupContent"
            :options="popupOptions"
          ></l-popup>
        </l-marker>
      </l-map>
    </client-only>
    <div id="botoes">
      <v-btn class="btn" v-on:click="emitShowProjectForm">
        Adicionar Ação
      </v-btn>
      <v-btn
        class="btn"
        v-on:click="showProjectInformation"
        :disabled="btnInfoDisabled"
      >
        Saiba mais
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisualMap",
  props: {
    center: {
      type: Array,
      required: true,
    },
    geojson: {
      type: Object,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 18,
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      showGeoJson: true,
      fillColor: "#e4ce7f",
      enableTooltip: true,
      markerIconUrl: "logo-ods-small.png",
      merkerIconSize: [20, 20],
      markers: [],
      position: { lat: -20.76233, lng: -41.53548 },
      btnInfoDisabled: true,
      projectSelected: {},
    };
  },
  computed: {
    jsonOptions() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    mapOptions() {
      return {
        minZoom: 18,
        zoomControl: false,
        scrollWheelZoom: false,
      };
    },
    popupOptions() {
      return {
        maxWidth: 315,
      };
    },
    createProjectMarkers() {
      return this.projects.map((project) => ({
        ...project,
        id: project.id,
        coord: project.coord,
        projectData: {
          name: project.acao,
          metaods: project.meta_ods,
          description: project.descricao,
          departament: project.local.departamento,
          coordinator: project.coordenador.nome,
          role: project.coordenador.vinculo,
          email: project.coordenador.email,
        },
        popupContent:
          '<div class="popup">' +
          '<img class="popup_img" src="/ods_icons/' +
          project.meta_ods.split(".")[0] +
          '.png"><br>' +
          '<div class="popup_text"><strong>Ação:</strong> ' +
          project.acao +
          "<br><strong>Departamento: </strong>" +
          project.local.departamento +
          "<br><strong>Coordenador:</strong> " +
          project.coordenador.nome +
          "</div></div>",
      }));
    },
    styleFunction() {
      const fillColor = this.fillColor;
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1,
        };
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return;
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>ID:" +
            feature.properties.idd +
            "</div><div>Nome: " +
            feature.properties.primario,
          { permanent: false, sticky: true }
        );
      };
    },
  },
  methods: {
    enableInfoButton(project) {
      this.btnInfoDisabled = false;
      this.projectSelected = project;
    },
    showProjectInformation() {
      this.btnInfoDisabled = true;
      this.$emit("project-selected", this.projectSelected);
    },
    emitShowProjectForm() {
      this.btnInfoDisabled = true;
      this.$emit("show-form");
    },
  },
};
</script>

<style>
.btn {
  margin-left: 10px;
  margin-right: 10px;
}

div#botoes {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

div#map-wrap {
  height: 82vh;
}

div.popup {
  display: flex;
}

img.popup_img {
  height: 75px;
  width: 75px;
}

div.popup_text {
  padding-left: 5px;
}
</style>