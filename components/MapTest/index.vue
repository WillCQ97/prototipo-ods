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

          <!-- fixme: VERIFICAR A FUNÇÃO ENABLE BUTTON A SEGUIR, TALVEZ RETIRAR O BOTÃO DO MAPA -->
          <!-- v-on:click="enableButton(marker.idProj)" -->
          <!--l-marker
            v-for="marker in createProjectMarkers"
            v-bind:key="marker.id"
            v-bind:lat-lng="marker.coord"
          >
            <l-icon :icon-url="iconUrl" :icon-size="iconSize"></l-icon>
            <l-popup
              :content="marker.popupContent"
              :options="popupOptions"
            ></l-popup>
          </l-marker-->

          <l-control position="bottomleft">
            <!-- fixme: ATUALIZAR AQUI POSTERIORMENTE -->
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
export default {
  name: "VisualMap",
  props: {
    center: Array,
    geojson: Object,
    projects: Array,
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 18,
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      show: true,
      fillColor: "#e4ce7f",
      enableTooltip: true,
      iconUrl: "logo-ods-small.png",
      iconSize: [20, 20],
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
        scrollWheelZoom: false,
      };
    },
    popupOptions() {
      return {
        maxWidth: 315,
      };
    },
    /*
    createProjectMarkers() {
      var markers = [];

      projects.forEach((project) => {
        markers.push({
          id: project.id,
          coord: project.coord,
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
    */
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
    enableButton(idProject) {
      this.btnVisible = true;
      this.bannerVisible = false;
      this.idProjSelected = idProject;
    },
    disableButton() {
      this.btnVisible = false;
    },
    show_information() {
      //fixme: atualizar esta função
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
            project.contatos.email +
            " / " +
            project.contatos.telefone +
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
  height: 75px;
  width: 75px;
}

div.popup_text {
  padding-left: 5px;
}
</style>