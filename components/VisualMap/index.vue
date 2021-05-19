<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <!--este marcador pode ser personalizado-->
        <l-marker :lat-lng="[-20.76161, -41.536]"></l-marker>

        <l-geo-json v-if="show" :geojson="geojson" :options="options" />
      </l-map>
    </client-only>
  </div>
</template>

<script>
import alegre_geojson from "assets/campus_alegre";

export default {
  name: "VisualMap",
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 18,
      center: [-20.76161, -41.536],
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      geojson: alegre_geojson,
      show: true,
      fillColor: "#e4ce7f",
      enableTooltip: true,
    };
  },
  computed: {
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
            feature.properties.primario +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    },
  },
};
</script>