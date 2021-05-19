<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="[-20.2404, -41.5061]"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "VisualMap",
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 10,
      center: [-20.2404, -41.5061],
    };
  },
};
</script>