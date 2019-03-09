<template>
    <div class="app-form frame-page">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">添加案例题</span>
            </div>
            <div class="h-panel-bar">
                <div class="search-picker">
                    <!--<SearchFilter v-model="params" :datas="dicts.type" prop="type" title="试卷类型"
                    @change="searchFilterChange"></SearchFilter>-->
                    <SearchFilter v-model="params" :datas="dicts.questionType" prop="questionType"
                                  title="题型" @change="searchFilterChange"></SearchFilter>
                    <!--<SearchFilter v-model="params" :datas="dicts.status" prop="status" title="状态"
                                  @change="searchFilterChange"></SearchFilter>-->
                </div>
            </div>
            <div class="h-panel-body" style="padding: 40px;">
                <Loading :loading="loading"></Loading>
                <!--<p><Button @click="packUpAll" color="primary">收起所有项</Button></p>-->
                <Table :datas="datas" stripe selectRow @trdblclick="trclick">
                    <!--<TableItem title="序号"><template slot-scope="{index}">{{index}}</template></TableItem>-->
                    <TableItem>
                        <template slot-scope="{data}">
                            <span class="font-bold">{{data.questionType===3?'科目':'知识点'}}:</span>
                            {{data.questionType===3?data.subjectName:data.knowledgeName}}
                        </template>
                    </TableItem>
                    <TableItem title="题型">
                        <template slot-scope="{data}">
                            {{getQuestionType(data.questionType)}}
                        </template>
                    </TableItem>
                    <TableItem title="题目" :width="310">
                        <template slot-scope="{data}">
                            <Tooltip theme="white" placement="bottom">
                                <!--<span class="text-hover">Component调用</span>-->
                                <TextEllipsis class="text-hover" :text="getTextForHtml(data.topic)" :height="40"
                                              v-width="300">
                                    <template slot="more">...</template>
                                </TextEllipsis>
                                <div slot="content">
                                    <div v-html="data.topic">
                                    </div>
                                </div>
                            </Tooltip>
                        </template>
                    </TableItem>
                    <TableItem title="创建时间" prop="createTime"></TableItem>
                    <TableItem title="创建者" prop="creator"></TableItem>
                    <!--<TableItem title="修改时间" prop="updateTime"></TableItem>-->
                    <!--<TableItem title="修改者" prop="updater"></TableItem>-->
                    <TableItem title="操作" :width="140">
                        <template slot-scope="{data}">
                            <Button size="s" color="primary" @click="trclick(data)">{{data._expand?'收起':'展开'}}</Button>
                            <!--<Button size="s" color="red" @click="remove(data)">删除</Button>-->
                            <Poptip content="确定删除这道题？" @confirm="remove(data)" style="margin-left: 5px">
                                <Button size="s" color="red">删除</Button>
                            </Poptip>
                        </template>
                    </TableItem>
                    <template slot="expand" slot-scope="{index, data}">
                        <Form readonly mode="single" class="choiceInfo">
                            <FormItem label="题目">
                                <div v-html="data.topic"></div>
                            </FormItem>
                            <FormItem label="选项" v-if="data.questionType===1">
                                <div class="box-select" v-for="(item,index) in data.selects" :key="item.index">
                                    <FormItem :label="'问题'+(index+1)+'选项：'">
                                    </FormItem>
                                    <FormItem label="选项A">
                                        {{item.choiceA}}
                                    </FormItem>
                                    <FormItem label="选项B">
                                        {{item.choiceB}}
                                    </FormItem>
                                    <FormItem label="选项C">
                                        {{item.choiceC}}
                                    </FormItem>
                                    <FormItem label="选项D">
                                        {{item.choiceD}}
                                    </FormItem>
                                    <FormItem label="正确答案">
                                        {{item.key}}
                                    </FormItem>
                                </div>
                            </FormItem>
                            <FormItem>
                                <Button color="green">编辑修改</Button>
                            </FormItem>
                        </Form>
                        <Loading :loading="data.loading"></Loading>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'addThesis',
        data() {
            return {
                datas: [
                    {
                        id: 1,
                        knowledgeId: '1',
                        topic: '就发的肌肤阿时间的将<br><img src="/5572b049b17bc132.png"/><br/>阿斯顿副驾驶剪短发三（）fasdjkfjskdjf发色好撒谎剪短发时间好地方就啊好受点肌肤会撒娇的回复就撒好地方就啊还是oasidfoasidnfoasndfiojasidjfosd',
                        selects: [
                            {
                                index: '1',
                                choiceA: '范德萨短发',
                                choiceB: '阿斯顿发阿斯顿发手动',
                                choiceC: '撒风阿斯顿',
                                choiceD: '过热而',
                                key: 'B'
                            }, {
                                index: '2',
                                choiceA: '范德萨短发',
                                choiceB: '阿斯顿发阿斯顿发手动',
                                choiceC: '撒风阿斯顿',
                                choiceD: '过热而',
                                key: 'C'
                            },
                        ],
                        key: 'B',
                        createTime: '2014-5-6 12:13',
                        creator: 'thornchg',
                        updateTime: '2018-12-29 16:59',
                        updater: 'thornchg',
                        _expand: false
                    },
                    {
                        id: 1,
                        knowledgeId: '1',
                        topic: '就发 is 的肌肤阿时间的if 将阿斯顿副驾驶剪短发 i三（）',
                        selects: [
                            {
                                choiceA: '',
                                choiceB: '',
                                choiceC: '',
                                choiceD: '',
                                key: ''
                            },
                        ],
                        key: 'B',
                        createTime: '2014-5-6 12:13',
                        creator: 'thornchg',
                        updateTime: '2018-12-29 16:59',
                        updater: 'thornchg',
                        _expand: false
                    },
                    {
                        id: 1,
                        knowledgeId: '1',
                        topic: '就发 is 的肌肤阿时间的if 将阿斯顿副驾驶剪短发 i三（）',
                        selects: [
                            {
                                choiceA: '',
                                choiceB: '',
                                choiceC: '',
                                choiceD: '',
                                key: ''
                            },
                        ],
                        key: 'B',
                        createTime: '2014-5-6 12:13',
                        creator: 'thornchg',
                        updateTime: '2018-12-29 16:59',
                        updater: 'thornchg',
                        _expand: false
                    },
                ],
                dicts: {
                    type: [{key: 1, title: '每日一练'}, {key: 2, title: '历年真题'}, {key: 3, title: '全真模拟'}],
                    questionType: [{key: '1', title: '综合知识'}, {key: '2', title: '案例分析'}, {
                        key: '3',
                        title: '论文'
                    }],
                    status: [{key: '10', title: '未发布'}, {
                        key: '20',
                        title: '已发布'
                    }]
                },
                pagination: {
                    page: 1,
                    size: 20,
                    total: 0
                },
                loading: false,
                params: {
                    questionType: null,
                    type: null,
                    status: null
                }
            }
        },
        methods: {
            remove(data) {
                this.datas.splice(this.datas.indexOf(data), 1);
                console.log(data);
                axios.post('/question/delete',
                    {
                        id:data.id
                    },
                    {headers: {'Content-Type': 'application/json'}})
                    .then(response => {
                        // console.log(response);
                        this.$Message.success('删除成功！');
                    }).catch(error => {
                    console.error(error);
                    this.$Message.error('删除失败！');
                });

            },
            add(datas) {
                datas.push({id: 7, name: '添加', age: 12, address: "然后添加的"});
            },
            onselect(data) {
                log(data);
            },
            getTextForHtml(html) {
                let div = document.createElement('div');
                div.innerHTML = html;
                return div.innerText;
            },
            trclick(data) {
                this.$set(data, '_expand', !data._expand);
            },
            packUpAll() {
                for (let item of this.datas) {
                    this.$set(item, '_expand', false);
                }
            },
            searchFilterChange(){
                console.log(this.params.questionType);
                this.loading=true;
                axios.get('/question/list',{
                    params: this.params
                })
                    .then(response => {
                        let datas=response.data.records;
                        // this.datas = response.data.records;
                        for (let data of datas) {
                            // data['_expand'] = false;
                            data.selects = JSON.parse(data.selects);
                            if (!data.updater) {
                                data.updateTime = '-';
                                data.updater = '-';
                            }
                        }
                        this.datas=datas;
                        this.loading=false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading=false;
                    })
            },
            getQuestionType(questionType){
                switch (questionType) {
                    case 1:return "综合知识";
                    case 2:return "案例分析";
                    case 3:return "论文";

                }
            }
        },
        mounted() {
            this.loading=true;
            axios.get('/question/list')
                .then(response => {
                    let datas=response.data.records;
                    // this.datas = response.data.records;
                    for (let data of datas) {
                        // data['_expand'] = false;
                        data.selects = JSON.parse(data.selects);
                        if (!data.updater) {
                            data.updateTime = '-';
                            data.updater = '-';
                        }
                    }
                    this.datas=datas;
                    this.loading=false;
                })
                .catch(error => {
                    console.log(error)
                    this.loading=false;
                })
        }
    };
</script>
<style scoped>
    .choiceInfo >>> .h-form-item-label {
        font-weight: 800;
    }
</style>
<style lang="less">
    .h-tooltip .h-tooltip-inner {
        max-width: 750px;
    }

    .box-select {
        .h-form-item:nth-child(1) {
            .h-form-item-label {
                color: @blue-color;
            }
        }
    }
</style>
