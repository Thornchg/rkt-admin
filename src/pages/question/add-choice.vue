<template>
    <div class="app-form frame-page">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">添加综合知识题</span>
            </div>
            <div class="h-panel-body" style="padding: 40px;">
                <Form :label-width="110" :mode="mode" :model="data" :rules="validationRules" ref="form">
                    <FormItem label="知识点" prop="knowledge">
                        <Select v-model="data.knowledge" :datas="knowledgeParams"></Select>
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
                        <FormItem label="选项A" :prop="'selects['+index+'].A'">
                            <input type="text" v-model="item.A" placeholder="选项A"/>
                        </FormItem>
                        <FormItem label="选项B" :prop="'selects['+index+'].B'">
                            <input type="text" v-model="item.B" placeholder="选项B"/>
                        </FormItem>
                        <FormItem label="选项C" :prop="'selects['+index+'].C'">
                            <input type="text" v-model="item.C" placeholder="选项C" />
                        </FormItem>
                        <FormItem label="选项D" :prop="'selects['+index+'].D'">
                            <input type="text"  v-model="item.D" placeholder="选项D"/>
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
                        <Button color="primary" :loading="isLoading" @click="submit">提交</Button>&nbsp;&nbsp;&nbsp;
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
                    index:0,
                    A:'',
                    B:'',
                    C:'',
                    D:'',
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
                    knowledge:'',
                    topic:'',
                    resolve:'',
                    selects:[
                        {
                            index:1,
                            A:'',
                            B:'',
                            C:'',
                            D:'',
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
                        'knowledge',
                        'selects[].A',
                        'selects[].B',
                        'selects[].C',
                        'selects[].D',
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
                    this.$Message("验证成功");
                    this.isLoading = true;
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
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