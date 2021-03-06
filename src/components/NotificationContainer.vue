<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    NotificationBar
  },
  setup() {
    const store = useStore();
    const notifications = computed(() => store.state.notifications);

    return { notifications };
  }
};
</script>
