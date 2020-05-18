<template>
  <div id="app">
    <SnippetListComponent v-bind:snippetModelList="snippetModelList"
                          v-on:on-delete="deleteSnippet($event)"/>
    <AddSnippetComponent v-bind:snippet-service="snippetService"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SnippetListComponent from '@/components/SnippetListComponent.vue';
import { ISnippetsService } from '@/services/ISnippetsService';
import SnippetsService from '@/services/SnippetsService';
import { ApiService } from '@/services/ApiService';
import AddSnippetComponent from '@/components/AddSnippetComponent.vue';
import { SnippetModel } from '@/models/SnippetModel';

@Component({
  components: {
    AddSnippetComponent,
    SnippetListComponent,
  },
})
export default class App extends Vue {
  snippetService: ISnippetsService = new SnippetsService(
    new ApiService('https://localhost:5001/api/v1/'),
  );

  snippetModelList: SnippetModel[] = [];

  mounted() {
    this.snippetService
      .getSnippets(50, 0)
      .then((snippetModels: SnippetModel[]) => {
        this.snippetModelList = snippetModels;
      });
  }

  deleteSnippet(id: string) {
    this.snippetService.removeSnippet(id);
  }
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
