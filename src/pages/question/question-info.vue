<template>
    <div class="app-form frame-page">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">添加案例题</span>
            </div>
            <div class="h-panel-body" style="padding: 40px;">
                <p><Button @click="packUpAll" color="primary">收起所有项</Button></p>
                <Table :datas="datas" stripe selectRow @trdblclick="trclick">
                    <!--<TableItem title="序号"><template slot-scope="{index}">{{index}}</template></TableItem>-->
                    <TableItem title="知识点" prop="knowledgeId"></TableItem>
                    <TableItem title="题目" :width="310">
                        <template slot-scope="{data}">
                            <Tooltip theme="white" placement="bottom">
                                <!--<span class="text-hover">Component调用</span>-->
                                <TextEllipsis class="text-hover"  :text="getTextForHtml(data.topic)" :height="40" v-width="300">
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
                    <TableItem title="创建时间" prop="createTime"></TableItem>
                    <TableItem title="创建者" prop="creator"></TableItem>
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
                            <FormItem label="选项">
                                <div class="box-select" v-for="(item,index) in data.selects" :key="item.index">
                                    <FormItem :label="'问题'+(index+1)+'选项：'">
                                    </FormItem>
                                    <FormItem label="选项A">
                                        {{item.A}}
                                    </FormItem>
                                    <FormItem label="选项B">
                                        {{item.B}}
                                    </FormItem>
                                    <FormItem label="选项C">
                                        {{item.C}}
                                    </FormItem>
                                    <FormItem label="选项D">
                                        {{item.D}}
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
                                index:'1',
                                A: '范德萨短发',
                                B: '阿斯顿发阿斯顿发手动',
                                C: '撒风阿斯顿',
                                D: '过热而',
                                key:'B'
                            },{
                                index:'2',
                                A: '范德萨短发',
                                B: '阿斯顿发阿斯顿发手动',
                                C: '撒风阿斯顿',
                                D: '过热而',
                                key:'C'
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
                                A: '',
                                B: '',
                                C: '',
                                D: '',
                                key:''
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
                                A: '',
                                B: '',
                                C: '',
                                D: '',
                                key:''
                            },
                        ],
                        key: 'B',
                        createTime: '2014-5-6 12:13',
                        creator: 'thornchg',
                        updateTime: '2018-12-29 16:59',
                        updater: 'thornchg',
                        _expand: false
                    },
                ]
            }
        },
        methods: {
            remove(data) {
                this.datas.splice(this.datas.indexOf(data), 1);
                this.$Message.success('删除成功！');
            },
            add(datas) {
                datas.push({id: 7, name: '添加', age: 12, address: "然后添加的"});
            },
            onselect(data) {
                log(data);
            },
            getTextForHtml(html){
                let div = document.createElement('div');
                div.innerHTML=html;
                return div.innerText;
            },
            trclick(data){
                this.$set(data, '_expand', !data._expand);

            },
            packUpAll(){
                for(let item of this.datas){
                    this.$set(item, '_expand', false);
                }
            }
        }
    };
</script>
<style scoped>
    .choiceInfo >>>.h-form-item-label{
        font-weight: 800;
    }
</style>
<style lang="less">
    .h-tooltip .h-tooltip-inner{
        max-width: 750px;
    }
    .box-select{
        .h-form-item:nth-child(1){
            .h-form-item-label{
                color: @blue-color;
            }
        }
    }
</style>
