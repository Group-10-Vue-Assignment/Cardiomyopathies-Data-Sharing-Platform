import { createStore } from "vuex";

let nextNotificationId = 1;
export default createStore({
  state: {
    notifications: []
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
    }
  },
  actions: {
    removeNotification({ commit }, notificationToRemove) {
      commit("DELETE_NOTIFICATION", notificationToRemove);
    },
    addNotification({ commit }, notificationToAdd) {
      commit("ADD_NOTIFICATION", notificationToAdd);
      console.log(nextNotificationId);
    }
  },
  modules: {}
});
