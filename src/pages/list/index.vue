<template>
    <div>列表</div>
    <router-link to="/list/profile">profile</router-link>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'list'
})
</script>