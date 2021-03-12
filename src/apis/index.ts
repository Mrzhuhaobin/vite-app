import service from '../service/axios'

export default {
    getList () {
        return service({
            url: '/getList',
            method: 'get',
        })
    }
}