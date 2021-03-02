<template>
    <div>首页</div>
    <div class="test-list">
        <div v-for="item in list" :ref="setItemRef">{{item}}</div>
    </div>
</template>

<script lang="ts">
import { ref, onBeforeUpdate, onUpdated } from 'vue'

export default {
    name: 'home',
    setup () {
        let itemRefs :Array<any> = [];
        let list = ['a', 'b', 'c']
        const setItemRef =  (el : any) => {
            itemRefs.push(el)
        }
        onBeforeUpdate (() => {
            itemRefs = []
        })
        onUpdated (() => {
            console.log(itemRefs)
        })
        return {
            itemRefs,
            setItemRef,
            list
        }
    }
}
</script>

<style>

</style>