<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/header/Header.vue';
import Aside from '@/components/aside/Aside.vue';
import Main from '@/components/main/Main.vue';
import { useStore } from 'vuex';

@Options({
  components: {
    Header,
    Aside,
    Main,
  },
})
export default class HomeView extends Vue {

  mounted() {
    const store = useStore();
    console.log('Authenticated:', store.state.isAuthenticated);

    if (!store.state.isAuthenticated) {
      this.$router.push('/login');
    }
  }

}
</script>

<template>
  <Header>
  </Header>

  <div class="container">
    <Aside>
    </Aside>

    <Main>
    </Main>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex: 1;
}
</style>
