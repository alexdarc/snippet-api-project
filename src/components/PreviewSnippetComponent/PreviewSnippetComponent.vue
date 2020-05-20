<template>
  <div>
    <div v-html="contentHtml"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class PreviewSnippetComponent extends Vue {
    @Prop({
      type: String,
      required: true,
    }) contentHtml!: string;

  }
</script>

<style scoped>

</style>
