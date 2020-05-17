<template>
  <div>
    <dl>
      <template v-for="snippetModel in snippetModelList">
        <dt v-bind:key="snippetModel.description">
          {{snippetModel.description}} / {{snippetModel.id}}
          <button v-on:click="deleteSnippet()">Delete</button>
        </dt>
        <dd v-bind:key="snippetModel.content">{{snippetModel.content}}</dd>
      </template>
    </dl>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ISnippetsService } from '@/services/ISnippetsService';
  import { SnippetModel } from '@/models/SnippetModel';

  @Component({})
  export default class SnippetListComponent extends Vue {
    @Prop({
      type: Object as () => ISnippetsService,
      required: true,
    }) private snippetService!: ISnippetsService;

    snippetModelList: SnippetModel[] = [];

    mounted() {
      this.snippetService
        .getSnippets(50, 0)
        .then((snippetModels: SnippetModel[]) => {
          this.snippetModelList = snippetModels;
        });
    }

    deleteSnippet() {
    }
  }
</script>

<style scoped>

</style>
