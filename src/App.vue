<template>
  <div id="app">
    <SnippetListComponent v-bind:snippet-service="snippetService" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SnippetListComponent from '@/components/SnippetListComponent.vue';
import { ISnippetsService } from '@/services/ISnippetsService';
import SnippetsService from '@/services/SnippetsService';
import { ApiService } from '@/services/ApiService';

@Component({
  components: {
    SnippetListComponent,
  },
})
export default class App extends Vue {
  snippetService: ISnippetsService = new SnippetsService(
    new ApiService('https://localhost:5001/api/v1/'),
  );

  snippetFalse = 5;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
