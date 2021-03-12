<template>
    <div>首页</div>
    <van-button type="primary" @click="getList">返回</van-button>
    {{env}}
    <van-loading size="24px" type="spinner" color="#1989fa" v-show="showLoading">加载中...</van-loading>
    <div class="test-list">
        <div v-for="item in list" :ref="setItemRef">{{item}}</div>
    </div>
</template>

<script lang="ts">
import { Toast } from 'vant';
import { ref, defineComponent, onBeforeUpdate, onUpdated } from 'vue';
import apiService from '../apis'
import { Loading } from 'vant';

export default defineComponent({
    name: 'home',
    component: {
        Loading
    },
    setup () {
        let itemRefs :Array<any> = [];
        const env = import.meta.env.MODE;
        const setItemRef =  (el : any) => {
            itemRefs.push(el)
        }
        onBeforeUpdate (() => {
            itemRefs = []
        })
        onUpdated (() => {
            console.log(itemRefs)
        })
        const toast = () => {
            Toast('提示文案')
        }
        return {
            itemRefs,
            setItemRef,
            env,
            toast
        }
    },
    data () {
        return {
            list: [],
            showLoading: false
        }
    }, 
    methods: {
        async getList () {
            this.showLoading = true;
            const res =  await apiService.getList();
            this.list = res.list;
            this.showLoading = false;

        }
    },
    created () {
        enum Direction {
            up = "UP",
            down = "DOWN",
            left = "LEFT",
            right = "RIGHT",
        }
        let str = 'up'
        console.log('test', Direction['up']);
        
    }
})
</script>

<style>

</style>