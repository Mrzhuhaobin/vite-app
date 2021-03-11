<template>
    <div>首页</div>
    <van-button type="primary">返回</van-button>
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
        [Button.name]: Button
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