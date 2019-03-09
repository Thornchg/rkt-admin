<style lang='less'>
</style>
<template>
    <div class="search-list-vue frame-page h-panel">
        <div class="h-panel-bar"><span class="h-panel-title">查询列表</span></div>
        <div class="h-panel-bar">
            <div class="search-picker">
                <SearchFilter v-model="params" :datas="dicts.paperType" prop="paperTypeId" title="试卷类型"></SearchFilter>
                <SearchFilter v-model="params" :datas="dicts.questionType" prop="questionType"
                              title="题型"></SearchFilter>
                <SearchFilter v-model="params" :datas="dicts.status" prop="status" title="状态"></SearchFilter>
            </div>
        </div>
        <div class="h-panel-body">
            <Loading :loading="loading"></Loading>
            <p v-if="datas.length===0" class="text-center">
                暂未添加试卷！
            </p>
            <AItem v-for="(d,index) of datas" :key="d.id" :item="d" @remove="remove(index)"></AItem>
            <Pagination v-if="pagination.total>0" :size="pagination.size" :cur="pagination.page" align="right"
                        :total="pagination.total" @change="changePage"></Pagination>
        </div>
    </div>
</template>
<script>
    /*function initData() {
        let data = {
            title: 'HeyUI',
            tags: ['vue', 'ui', 'components', 'select'],
            desc: '一个基于Vue.js的高质量UI组件库，一个基于Vue.js的高质量UI组件库，一个基于Vue.js的高质量UI组件库，一个基于Vue.js的高质量UI组件库，一个基于Vue.js的高质量UI组件库'
        };
        let list = [];
        for (let i = 1; i < 10; i++) {
            list.push(Utils.extend({id: i}, data));
        }
        return list;
    }*/
    export default {
        name: 'paperManager',
        data() {
            return {
                dicts: {
                    // subject: [{key: 1, title: ''}, {key: 2, title: '全真模拟'}, {key: 3, title: '历年真题'}],
                    paperType: [{key: 1, title: '每日一练'}, {key: 2, title: '全真模拟'}, {key: 3, title: '历年真题'}],
                    questionType: [{key: '1', title: '综合知识'}, {key: '2', title: '案例分析'}, {
                        key: '3',
                        title: '论文'
                    }],
                    status: [{key: '0', title: '未发布'}, {
                        key: '1',
                        title: '已发布'
                    }]
                },
                pagination: {
                    page: 1,
                    size: 20,
                    total: 0
                },
                datas: [],
                loading: false,
                params: {
                    questionType: null,
                    paperTypeId: null,
                    status: null
                }
            }
        },
        mounted() {
            this.init()
        },
        watch: {
            params() {
                this.getData();
            }
        },
        methods: {
            changePage(page) {
                this.pagination.page = page.cur;
                this.pagination.size = page.size;
                this.getData();
            },
            init() {
                this.getData();
            },
            getData(reload = false) {
                if (reload) {
                    this.pagination.page = 1;
                }
                this.loading = true;
                axios.get("/paper/list", {
                    params: this.params
                })
                    .then(response => {
                        let datas = response.data.records;
                        for (let data of datas) {
                            data.questions = JSON.parse(data.questions);
                        }
                        this.datas = datas;
                    })
                    .catch(error => {
                        console.error(error);
                    })
            },
            remove(index){
                this.datas.splice(index,1);
            }
        },
        computed: {}
    }
</script>