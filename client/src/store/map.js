const actions = {
  async displayData({ commit, status }) {
    return commit("setDisplayStatus", status);
  },
};

const mutations = {
  setCenter(state, center) {
    state.center = center;
  },
  setDisplayStatusTooltip(state, status) {
    state.displayStatusTooltip = status;
  },
  setUserCoordinates(state, coordinates) {
    state.userLatitude = coordinates.latitude;
    state.userLongitude = coordinates.longitude;
  },
  setMapControlMini(state, val) {
    state.mapControlMini = val;
  },
  setSelectedTab(state, tab) {
    state.selectedTab = tab;
  },
  setZoom(state, zoom) {
    state.zoom = zoom;
  },
};

const state = {
  displayStatusTooltip: true,
  center: [45.59, -122.6793],
  userLatitude: null,
  userLongitude: null,
  loading: false,
  mapControlMini: false,
  searchResults: [],
  selectedTab: "map",
  zoom: 10,
};

const getters = {};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};