<template>
  <div>
    <div v-html="previewSnippetModel.contentHtml"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PreviewSnippetModel } from '@/components/PreviewSnippetComponent/models/PreviewSnippetModel';

  @Component({})
  export default class PreviewSnippetComponent extends Vue {
    @Prop({
      type: PreviewSnippetModel,
      required: true,
    }) previewSnippetModel!: PreviewSnippetModel;

  }
</script>

<style scoped>

</style>
