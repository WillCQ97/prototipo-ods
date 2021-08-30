<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        :center="center"
        :options="mapOptions"
        style="height: 525px; z-index: 1"
        :zoom="zoom"
      >
        <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>
        <l-geo-json
          :geojson="geojson"
          :options="jsonOptions"
          v-if="showGeoJson"
        />
        <l-marker
          v-for="marker in createProjectMarkers"
          v-bind:key="marker.id"
          v-bind:lat-lng="marker.coord"
          v-on:click="enableInfoButton(marker.projectData)"
        >
          <l-icon
            :icon-size="merkerIconSize"
            :icon-url="markerIconUrl"
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
        :disabled="btnInfoDisabled"
        v-on:click="showProjectInformation"
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
    bounds: {
      type: Array,
      required: true,
    },
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
      markerIconUrl: "/img/logo-ods-small.png",
      merkerIconSize: [20, 20],
      markers: [],
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
        maxBounds: this.bounds,
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
        coord: project.location.coord,
        projectData: {
          name: project.action,
          goalId: project.target_id.split(".")[0],
          targetId: project.target_id,
          description: project.description,
          departament: project.location.departament,
          coordinator: project.coordinator.name,
          role: project.coordinator.role,
          email: project.coordinator.email,
        },
        popupContent:
          '<div class="popup">' +
          '<img class="popup_img" src="/img/ods_icons/' +
          project.target_id.split(".")[0] +
          '.png"><br>' +
          '<div class="popup_text"><strong>Ação:</strong> ' +
          project.action +
          "<br><strong>Departamento: </strong>" +
          project.location.departament +
          "<br><strong>Coordenador:</strong> " +
          project.coordinator.name +
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