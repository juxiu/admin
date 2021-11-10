<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <Sidebar class="sidebar-container" />
    <div
      class="main-container hasTagsView"
    >
      <div>
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, } from 'vue'
import { AppMain, Navbar, TagsView, Sidebar } from './components'
import resize from './resize'
export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  setup() {
    const { sidebar,addEventListenerOnResize, resizeMounted, removeEventListenerResize, watchRouter } = resize()

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
      }
    })

    watchRouter()
    onBeforeMount(() => {
      addEventListenerOnResize()
    })

    onMounted(() => {
      resizeMounted()
    })

    onBeforeUnmount(() => {
      removeEventListenerResize()
    })
    return {
      classObj,
      sidebar,
    }
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background-color: #ffffff !important;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}

</style>
