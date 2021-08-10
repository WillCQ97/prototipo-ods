<template>
  <v-app id="app">
    <v-navigation-drawer
      id="menu"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      light
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <strong>{{ item.title }}</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :color="barColor" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-title>
        <strong>{{ title }}</strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon left disabled>
        <v-img
          :src="srcIcon"
          :height="iconHeight"
          :width="iconWidth"
          contain
        ></v-img>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer v-if="fixed" :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Página inicial",
          to: "/",
        },
        {
          icon: "mdi-map",
          title: "Ações campus Alegre",
          to: "/alegre",
        },
        {
          icon: "mdi-text",
          title: "Sobre",
          to: "/about",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Protótipo Mapa Colaborativo",
      srcIcon: "/ods-na-ufes-selo.png",
      iconHeight: 40,
      iconWidth: 40,
      barColor: "#4870a1",
    };
  },
};
</script>

<style>
#app {
  background-color: #d2dce8;
  color: black;
}
#menu {
  background-color: #c2cbdb;
  color: black;
}
</style>