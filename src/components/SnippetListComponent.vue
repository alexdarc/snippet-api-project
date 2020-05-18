<template>
  <div>
    <dl>
      <template v-for="snippetModel in snippetModelList">
        <dt v-bind:key="snippetModel.id">
          {{snippetModel.description}} / {{snippetModel.id}}
          <button v-on:click="onEdit(snippetModel.id)">Edit</button>
          <button v-on:click="onDelete(snippetModel.id)">Delete</button>
        </dt>
        <dd v-bind:key="snippetModel.content">{{snippetModel.content}}</dd>
      </template>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { SnippetModel } from '@/models/SnippetModel';

@Component({})
export default class SnippetListComponent extends Vue {
  @Prop({
    type: Array as () => SnippetModel[],
    required: true,
  }) snippetModelList!: SnippetModel[];

  @Emit() onEdit(id: string) {}
  @Emit() onDelete(id: string) {}
}
</script>

<style scoped>

</style>
