<template>
  <div
    class="notification-bar"
    :class="notificationTypeClass"
    id="flashMessage"
  >
    {{ notification.message }}
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
      }, 3000);
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
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}
#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
</style>
