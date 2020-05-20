<template>
  <div class="list-group">
    <div
      v-for="snippetModel in snippetModelList"
      v-bind:key="snippetModel.id"
      class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{snippetModel.description}}</h5>
        <small>
          <time title="Created date">{{snippetModel.createdDate}}</time>
        </small>
      </div>
      <p class="mb-1 list-content">{{snippetModel.content}}</p>
      <div class="d-flex w-100 justify-content-between align-items-end">
        <small class="text-muted">{{snippetModel.id}}</small>
        <div class="btn-group btn-group-sm"
             role="group"
             aria-label="Control buttons">
          <button
            v-on:click="onPreview(snippetModel.id)"
            v-bind:class="{ active: viewableSnippetId === snippetModel.id }"
            type="button"
            class="btn btn-outline-primary">
            Preview
          </button>
          <button
            v-on:click="onEdit(snippetModel.id)"
            v-bind:class="{ active: editableSnippetId === snippetModel.id }"
            type="button"
            class="btn btn-outline-primary">
            Edit
          </button>
          <button
            v-on:click="confirmDelete(snippetModel.id)"
            type="button"
            class="btn btn-outline-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { SnippetListItem } from '@/components/SnippetListComponent/models/SnippetListItem';

  @Component({})
  export default class SnippetListComponent extends Vue {
    @Prop({
      type: Array as () => SnippetListItem[],
      required: true,
    }) snippetModelList!: SnippetListItem[];
    @Prop({
      type: String,
      required: false,
    }) viewableSnippetId!: string;
    @Prop({
      type: String,
      required: false,
    }) editableSnippetId!: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    @Emit() onEdit(id: string) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    @Emit() onDelete(id: string) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    @Emit() onPreview(id: string) {
    }

    confirmDelete(id: string) {
      if (confirm('Are you sure?')) {
        this.onDelete(id);
      }
    }
  }
</script>

<style scoped>
  .list-content {
    max-height: 10.5em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
