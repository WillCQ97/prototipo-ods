<template>
  <div>
    <div id="map-wrap">
      <client-only>
        <l-map :zoom="zoom" :options="mapOptions" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

          <l-marker
            v-for="(marker, index) in createProjectMarkers"
            v-bind:lat-lng="marker.latlng"
            v-bind:key="index"
            v-on:click="enableButton(marker.idProj)"
          >
            <l-icon :icon-url="iconUrl" :icon-size="iconSize"></l-icon>
            <l-popup :content="show_popup(marker.idProj)"></l-popup>
          </l-marker>

          <l-control position="bottomleft">
            <v-btn v-if="btnVisible" v-on:click="show_information">
              Saiba mais
            </v-btn>
          </l-control>

          <l-geo-json v-if="show" :geojson="geojson" :options="jsonOptions" />
        </l-map>
      </client-only>
    </div>
    <div><v-banner v-if="bannerVisible" v-html="bannerContent"></v-banner></div>
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
      btnVisible: false,
      bannerVisible: false,
      bannerContent: "",
      idProjSelected: 0,
    };
  },
  computed: {
    mapOptions() {
      return {
        minZoom: 18,
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
            "</div></div>";
        }
      });
      return desc;
    },
    enableButton(idProject) {
      this.btnVisible = true;
      this.bannerVisible = false;
      this.idProjSelected = idProject;
    },
    disableButton() {
      this.btnVisible = false;
    },
    show_information() {
      this.disableButton();
      this.bannerVisible = true;
      
      projects.forEach((project) => {
        if (this.idProjSelected == project.id) {
          this.bannerContent =
            "<strong>Saiba mais sobre a ação</strong><br>" +
            "<strong>Projeto:</strong> " +
            project.nome +
            "<br><strong>Descrição: </strong>" +
            project.descricao +
            "<br><strong>Objetivos: </strong>" +
            project.objetivos +
            "<br><strong>Público-alvo: </strong>" +
            project.publico +
            "<br><strong>Início: </strong>" +
            project.inicio +
            "<br><strong>Departamento: </strong>" +
            project.departamento +
            "<br><strong>Professor:</strong> " +
            project.responsavel +
            "<br><strong>Contatos: </strong>" +
            project.contatos.email + ' / ' + project.contatos.telefone + 
            "</div></div>";
        }
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
  height: 65px;
  width: 65px;
}

div.popup_text {
  padding-left: 5px;
}
</style>