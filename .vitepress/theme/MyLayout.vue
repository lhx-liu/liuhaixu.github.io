<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
  
import GiscusComment from './components/GiscusComment.vue' // 评论模块

</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-after>
      <GiscusComment />
    </template>
  </DefaultTheme.Layout>
</template>