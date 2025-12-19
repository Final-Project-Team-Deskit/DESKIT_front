<script setup lang="ts">
import PageContainer from './PageContainer.vue'
import PageHeader from './PageHeader.vue'

const props = defineProps<{
  title?: string
  subtitle?: string
  eyebrow?: string
  showHeader?: boolean
}>()
</script>

<template>
  <PageContainer>
    <PageHeader
      :title="props.title"
      :subtitle="props.subtitle"
      :eyebrow="props.eyebrow"
      :show-header="props.showHeader"
    >
      <template #headerRight>
        <slot name="headerRight" />
      </template>
    </PageHeader>

    <slot />
  </PageContainer>
</template>
