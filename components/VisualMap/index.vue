<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <l-marker
          v-for="(marker, index) in createMarkers"
          v-bind:lat-lng="marker.latlng"
          v-bind:key="index"
        >
          <l-icon :icon-url="iconUrl" :icon-size="iconSize"></l-icon>
          <l-popup :content="show_popup(marker.idProj)"></l-popup>
        </l-marker>

        <l-geo-json v-if="show" :geojson="geojson" :options="options" />
      </l-map>
    </client-only>
  </div>
</template>

<script>
import alegre from "assets/campus_alegre";
import projects from "assets/lista_projetos.json";

export default {
  name: "VisualMap",
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 18,
      center: [-20.76161, -41.536],
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      geojson: alegre,
      show: true,
      fillColor: "#e4ce7f",
      enableTooltip: true,
      iconUrl: "logo-ods-big.png",
      iconSize: [30, 30],
      markers: [],
    };
  },
  computed: {
    createMarkers() {
      var markers = [];

      projects.forEach((project) => {
        alegre.features.forEach((feature) => {
          if (project.idDepartamento == feature.properties.idd) {
            let rand = Math.floor(
              Math.random() * feature.geometry.coordinates[0].length
            );
            markers.push({
              idProj: project.id,
              latlng: [
                feature.geometry.coordinates[0][rand][1],
                feature.geometry.coordinates[0][rand][0],
              ],
            });
          }
        });
      });

      return markers;
    },
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
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
        return () => {};
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
    show_popup(idProject) {
      let desc = "";
      projects.forEach((project) => {
        if (idProject == project.id) {
          desc =
            "<strong>Projeto:</strong> " +
            project.nome +
            "<br><strong>Departamento: </strong>" +
            project.departamento +
            "<br><strong>Professor:</strong> " +
            project.responsavel;
        }
      });
      return desc;
    },
  },
};
</script>