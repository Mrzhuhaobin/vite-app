<template>
    <div>首页</div>
    <vant-button type="primary">返回</vant-button>
    <div class="test-list">
        <div v-for="item in list" :ref="setItemRef">{{item}}</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, onBeforeUpdate, onUpdated } from 'vue';
import { Button } from 'vant';

export default defineComponent({
    name: 'home',
    component: {
        vantButton: Button
    },
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
})
</script>

<style>

</style>