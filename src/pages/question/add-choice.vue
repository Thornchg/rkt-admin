<template>
    <div class="app-form frame-page">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">添加综合知识题</span>
            </div>
            <div class="h-panel-body" style="padding: 40px;">
                <Form :label-width="110" :mode="mode" :model="data" :rules="validationRules" ref="form">
                    <FormItem label="知识点" prop="knowledgeId">
                        <Select v-model="data.knowledgeId" :datas="knowledgeParams"
                        keyName="id" titleName="name"></Select>
                    </FormItem>
                    <FormItem label="题目" :single="true" prop="topic">
                        <!--<textarea rows="3" v-autosize v-model="data.topic"></textarea>-->
                        <RichTextEditor v-model="data.topic" cacheName="choiceTopicEditor"></RichTextEditor>
                    </FormItem>
                    <div class="box-select" v-for="(item,index) in data.selects" :key="item.index">
                        <FormItem :label="'问题'+(index+1)+'选项：'">
                            <Poptip @confirm="remove(index)" content="确定删除？" v-if="index>0">
                                <Button text-color="red" :no-border="true" icon="h-icon-trash">删除</Button>
                            </Poptip>
                        </FormItem>
                        <FormItem label="选项A" :prop="'selects['+index+'].choiceA'">
                            <input type="text" v-model="item.choiceA" placeholder="选项A"/>
                        </FormItem>
                        <FormItem label="选项B" :prop="'selects['+index+'].choiceB'">
                            <input type="text" v-model="item.choiceB" placeholder="选项B"/>
                        </FormItem>
                        <FormItem label="选项C" :prop="'selects['+index+'].choiceC'">
                            <input type="text" v-model="item.choiceC" placeholder="选项C" />
                        </FormItem>
                        <FormItem label="选项D" :prop="'selects['+index+'].choiceD'">
                            <input type="text"  v-model="item.choiceD" placeholder="选项D"/>
                        </FormItem>
                        <FormItem label="正确答案" :prop="'selects['+index+'].key'">
                            <Select :datas="choiceParams" v-model="item.key" ></Select>
                        </FormItem>
                    </div>
                    <div class="box-select">
                        <FormItem><Button color="primary" @click="add">添加选项</Button></FormItem>
                    </div>
                    <FormItem label="解析" :single="true">
                        <!--<textarea rows="3" v-autosize v-model="data.topic"></textarea>-->
                        <RichTextEditor v-model="data.resolve" cacheName="choiceResolveEditor"></RichTextEditor>
                    </FormItem>
                    <FormItem :no-padding="true">
                        <Button color="primary" :loading="isLoading" @click="submit">添加题目</Button>&nbsp;&nbsp;&nbsp;
                        <Button @click="reset">重置验证</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'addChoice',
        data() {

            let that = this;
            return {
                select:{
                    index:null,
                    choiceA:'',
                    choiceB:'',
                    choiceC:'',
                    choiceD:'',
                    key:''
                },
                choiceParams:['A','B','C','D'],
                knowledgeParams:[
                    {title:'软件工程',key:0},
                    {title:'计算机网络',key:1},
                    {title:'操作系统',key:2}
                ],
                selectCount:1,
                mode: 'single',
                data: {
                    knowledgeId:null,
                    topic:'',
                    resolve:'',
                    selects:[
                        {
                            index:1,
                            choiceA:'',
                            choiceB:'',
                            choiceC:'',
                            choiceD:'',
                            key:''
                        }
                    ]
                },
                isLoading: false,
                validationRules: {
                    rules: {
                        textarea: {},
                        input: {
                            //做异步处理判断(原则上所有的异步判断在提交后同样需要验证)
                            //这里的判断不会影响最终的valid结果，所以也可以作为一些验证提示
                            validAsync(value, next, parent, data) {
                                setTimeout(() => {
                                    if (value.length == 15 || value.length == 18) {
                                        next();
                                    } else {
                                        next("字段长度非15/18位，可能不符合规定");
                                    }
                                }, 10);
                            }
                        }
                    },
                    required: [
                        'topic',
                        'knowledgeId',
                        'selects[].choiceA',
                        'selects[].choiceB',
                        'selects[].choiceC',
                        'selects[].choiceD',
                        'selects[].key',
                    ],
                }
            }
        },
        methods: {
            submit() {
                let validResult = this.$refs.form.valid();
                // log(validResult.messages);
                if (validResult.result) {
                    // this.$Message("验证成功");
                    this.isLoading = true;
                    axios.post('/question/addChoiceQuestion',
                        JSON.stringify(this.data),
                        {headers: {'Content-Type': 'application/json'}})
                        .then(response=>{
                            console.log(response);
                            this.isLoading = false;
                            this.$Message.success('成功添加综合知识题！');
                        }).catch(error=>{});
                } else {
                    this.$Message.error(`还有${validResult.messages.length}个错误未通过验证。`);
                }
            },
            reset() {
                this.isLoading = false;
                this.$refs.form.reset();
            },
            add() {
                let temp=Utils.copy(this.select);
                temp.index=this.data.selects.length+1;
                this.data.selects.push(temp);
            },
            remove(index) {
                this.data.selects.splice(index, 1);
            }
        },
        mounted() {
            axios.get("/knowledge/list")
                .then(response=>{
                    // this.setSubjectParams(response.data);
                    // console.log(response.data)
                    this.knowledgeParams=response.data;
                })
                .catch(()=>{})
        }
    };
</script>
<style lang="less">
    .border-1 {
        border: 1px solid #eeeeee;
    }
    .box-select{
        margin-left: 50px;
        .h-form-item:nth-child(1){
            .h-form-item-label{
                color: @blue-color;
            }
        }
    }
</style>