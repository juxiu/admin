<template>
  <div class="dashboard-container">
    <h1>啦啦啦</h1>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
export default defineComponent({
  components: {
  },
  setup() {
    const store = useStore();
    const currentRole = ref("admin-dashboard");
    const roles = computed(() => {
      return store.state.user.roles;
    });
    onBeforeMount(() => {
      if (!roles.value.includes("admin")) {
        currentRole.value = "editor-dashboard";
      }
    });

    return {
      currentRole,
    };
  },
});
</script>
