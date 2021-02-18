import { createStore } from "vuex";
import { getAllGraphsPagination } from "@/firebaseFunctions/getGraph";

let nextNotificationId = 1;
let lastVisible = "";

export default createStore({
  state: {
    notifications: [],
    globalGraphs: []
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
    SET_GRAPHS(state, graphs) {
      console.log("testing", graphs);
      state.globalGraphs = graphs;
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
    async fetchGraphs({ dispatch }) {
      try {
        lastVisible = await getAllGraphsPagination(lastVisible);
      } catch (error) {
        const notification = {
          type: "error",
          message: "There was a problem fetching graphs: " + error
        };
        dispatch("addNotification", notification);
      }
    }
  },
  modules: {}
});
