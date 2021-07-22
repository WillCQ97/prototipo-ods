<template>
  <div>
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
            v-on:click="enableButton(marker.projectData)"
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

          <l-control position="bottomleft">
            <v-btn v-if="btnVisible" v-on:click="showProjectInformation">
              Saiba mais
            </v-btn>
          </l-control>
        </l-map>
      </client-only>
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
      btnVisible: false,
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
      var markers = [];

      // fixme: verificar uso de uma função map
      this.projects.forEach((project) => {
        markers.push({
          id: project.id,
          coord: project.coord,
          projectData: project,
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
        });
      });

      return markers;
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
    enableButton(project) {
      this.btnVisible = true;
      this.projectSelected = project;
    },
    showProjectInformation() {
      this.btnVisible = false;
      this.$emit("project-selected", {
        name: this.projectSelected.nome,
        metaods: this.projectSelected.meta_ods,
        description: this.projectSelected.descricao,
        departament: this.projectSelected.local.departamento,
        coordinator: this.projectSelected.coordenador.nome,
        role: this.projectSelected.coordenador.vinculo,
        email: this.projectSelected.coordenador.email,
      });
    },
  },
};
</script>

<style>
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