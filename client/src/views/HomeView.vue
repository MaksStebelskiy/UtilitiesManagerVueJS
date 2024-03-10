<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/header/Header.vue';
import Aside from '@/components/aside/Aside.vue';
import Main from '@/components/main/Main.vue';

@Options({
  components: {
    Header,
    Aside,
    Main,
  },
})
export default class HomeView extends Vue { }
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

@mixin shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

Header, Main, Aside {
  @include shadow;
}

.container {
  display: flex;
  flex: 1;
}
</style>
