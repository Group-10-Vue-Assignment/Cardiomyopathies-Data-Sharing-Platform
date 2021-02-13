<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "NotificationBar",
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    let timeout = null;

    const notificationTypeClass = computed(() => `${props.notification.type}`);

    function removeNotification() {
      store.dispatch("removeNotification", props.notification);
    }

    onMounted(() => {
      // we assign a time to a variable to prevent memory leaks
      timeout = setTimeout(() => {
        removeNotification();
      }, 5000);
    });

    onBeforeUnmount(() => {
      clearTimeout(timeout);
    });

    return { notificationTypeClass, timeout };
  }
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
