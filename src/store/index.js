import { createStore } from "vuex";
import {
  getNextGlobalGraph,
  getPreviousGlobalGraph,
  getNextUserGraph,
  getPreviousUserGraph,
  getNextSearchGraph,
  getPreviousSearchGraph
} from "@/firebaseFunctions/getGraph";

let nextNotificationId = 1;
let lastVisibleDocForGlobalDashboard = "";
let lastVisibleDocForUserDashboard = "";

export default createStore({
  state: {
    notifications: [],
    globalGraph: [],
    globalDashboardNextButton: false,
    globalDashboardPreviousButton: true,
    userGraph: [],
    userDashboardNextButton: false,
    userDashboardPreviousButton: true,
    searchGraph: [],
    searchNextButton: false,
    searchPreviousButton: true,
    lastVisibleDocForSearch: ""
  },
  mutations: {
    DELETE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        n => n.id !== notificationToRemove.id
      );
    },
    ADD_NOTIFICATION(state, notificationToAdd) {
      state.notifications.push({
        ...notificationToAdd,
        id: nextNotificationId++
      });
    },
    SET_GLOBAL_DASHBOARD_GRAPH(state, graph) {
      state.globalGraph = graph;
    },
    DISABLE_GLOBAL_DASHBOARD_NEXT_BUTTON(state, result) {
      state.globalDashboardNextButton = result;
    },
    DISABLE_GLOBAL_DASHBOARD_PREVIOUS_BUTTON(state, result) {
      state.globalDashboardPreviousButton = result;
    },
    SET_USER_DASHBOARD_GRAPH(state, graph) {
      state.userGraph = graph;
    },
    DISABLE_USER_DASHBOARD_NEXT_BUTTON(state, result) {
      state.userDashboardNextButton = result;
    },
    DISABLE_USER_DASHBOARD_PREVIOUS_BUTTON(state, result) {
      state.userDashboardPreviousButton = result;
    },
    SET_SEARCH_GRAPH(state, graph) {
      state.searchGraph = graph;
    },
    DISABLE_SEARCH_NEXT_BUTTON(state, result) {
      state.searchNextButton = result;
    },
    DISABLE_SEARCH_PREVIOUS_BUTTON(state, result) {
      state.searchPreviousButton = result;
    },
    SET_SEARCH_LAST_VISIBLE_DOC(state, doc) {
      state.lastVisibleDocForSearch = doc;
      console.log(state.lastVisibleDocForSearch);
    }
  },
  actions: {
    removeNotification({ commit }, notificationToRemove) {
      commit("DELETE_NOTIFICATION", notificationToRemove);
    },
    addNotification({ commit }, notificationToAdd) {
      commit("ADD_NOTIFICATION", notificationToAdd);
      console.log(nextNotificationId);
    },
    async fetchNextGlobalDashboardGraph({ dispatch }) {
      try {
        lastVisibleDocForGlobalDashboard = await getNextGlobalGraph(
          lastVisibleDocForGlobalDashboard
        );
      } catch (error) {
        const notification = {
          type: "error",
          message: "There was a problem the next global graph: " + error
        };
        dispatch("addNotification", notification);
      }
    },
    async fetchPreviousGlobalDashboardGraph({ dispatch }) {
      try {
        lastVisibleDocForGlobalDashboard = await getPreviousGlobalGraph(
          lastVisibleDocForGlobalDashboard
        );
      } catch (error) {
        const notification = {
          type: "error",
          message:
            "There was a problem fetching the previous global graph: " + error
        };
        dispatch("addNotification", notification);
      }
    },
    async fetchNextUserDashboardGraph({ dispatch }, userId) {
      try {
        lastVisibleDocForUserDashboard = await getNextUserGraph(
          lastVisibleDocForUserDashboard,
          userId
        );
      } catch (error) {
        const notification = {
          type: "error",
          message: "There was a problem fetching the next user graph: " + error
        };
        dispatch("addNotification", notification);
      }
    },
    async fetchPreviousUserDashboardGraph({ dispatch }, userId) {
      try {
        lastVisibleDocForUserDashboard = await getPreviousUserGraph(
          lastVisibleDocForUserDashboard,
          userId
        );
      } catch (error) {
        const notification = {
          type: "error",
          message:
            "There was a problem fetching the previous user graph: " + error
        };
        dispatch("addNotification", notification);
      }
    },
    async fetchNextSearchGraph(
      { state, dispatch, commit },
      { cardiomyopathyTypeValue, mutatedGeneTypeValue }
    ) {
      try {
        let lastVisibleDocForSearch = await getNextSearchGraph(
          state.lastVisibleDocForSearch,
          cardiomyopathyTypeValue,
          mutatedGeneTypeValue
        );
        commit("SET_SEARCH_LAST_VISIBLE_DOC", lastVisibleDocForSearch);
      } catch (error) {
        const notification = {
          type: "error",
          message:
            "There was a problem fetching the next searched graph: " + error
        };
        dispatch("addNotification", notification);
      }
    },
    async fetchPreviousSearchGraph(
      { state, dispatch, commit },
      { cardiomyopathyTypeValue, mutatedGeneTypeValue }
    ) {
      try {
        let lastVisibleDocForSearch = await getPreviousSearchGraph(
          state.lastVisibleDocForSearch,
          cardiomyopathyTypeValue,
          mutatedGeneTypeValue
        );
        commit("SET_SEARCH_LAST_VISIBLE_DOC", lastVisibleDocForSearch);
      } catch (error) {
        const notification = {
          type: "error",
          message:
            "There was a problem fetching the previous searched graph: " + error
        };
        dispatch("addNotification", notification);
      }
    }
  },
  modules: {}
});
