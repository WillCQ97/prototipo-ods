<template>
  <div id="map-wrap">
    <client-only>
      <l-map :zoom="zoom" :options="mapOptions" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <l-marker
          v-for="(marker, index) in createProjectMarkers"
          v-bind:lat-lng="marker.latlng"
          v-bind:key="index"
        >
          <l-icon :icon-url="iconUrl" :icon-size="iconSize"></l-icon>
          <l-popup :content="show_popup(marker.idProj)"></l-popup>
        </l-marker>

        <l-geo-json v-if="show" :geojson="geojson" :options="jsonOptions" />
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
      iconUrl: "logo-ods-small.png",
      iconSize: [25, 25],
      markers: [],
    };
  },
  computed: {
    mapOptions() {
      return {
        zoomControl: false,
      };
    },
    createProjectMarkers() {
      var markers = [];

      projects.forEach((project) => {
        markers.push({
          idProj: project.id,
          latlng: project.coord,
        });
      });

      return markers;
    },
    jsonOptions() {
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
      let desc;
      projects.forEach((project) => {
        if (idProject == project.id) {
          desc =
            '<div class="popup">' +
            '<img class="popup_img" src="/ods_icons/' +
            project.ods +
            '.png"><br>' +
            '<div class="popup_text"><strong>Projeto:</strong> ' +
            project.nome +
            "<br><strong>Departamento: </strong>" +
            project.departamento +
            "<br><strong>Professor:</strong> " +
            project.responsavel +
            "<br><strong><a target='_blank'>Saiba mais</a></strong>" +
            "</div></div>";
        }
      });
      return desc;
    },
    show_information() {
      console.log("executei");
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
  height: 65px;
  width: 65px;
}

div.popup_text {
  padding-left: 5px;
}
</style>