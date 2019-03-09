<template>
    <div class="app-form frame-page">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">添加案例题</span>
            </div>
            <div class="h-panel-body" style="padding: 40px;">
                <Form :label-width="110" :mode="mode" :model="data" :rules="validationRules" ref="form">
                    <FormItem label="知识点" prop="knowledgeId">
                        <Select v-model="data.knowledgeId" :datas="knowledgeParams"
                                keyName="id" titleName="name"></Select>
                    </FormItem>
                    <FormItem label="题目" :single="true" prop="topic">
                        <!--<textarea rows="3" v-autosize v-model="data.topic"></textarea>-->
                        <RichTextEditor v-model="data.topic" cacheName="caseTopicEditor"></RichTextEditor>
                    </FormItem>
                    <FormItem label="解析" :single="true">
                        <!--<textarea rows="3" v-autosize v-model="data.topic"></textarea>-->
                        <RichTextEditor v-model="data.resolve" cacheName="caseResolveEditor"></RichTextEditor>
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
        name: 'addChoice',
        data() {
            return {
                knowledgeParams: [
                    {title: '软件工程', key: 0},
                    {title: '计算机网络', key: 1},
                    {title: '操作系统', key: 2}
                ],
                selectCount: 1,
                mode: 'single',
                data: {
                    knowledgeId: '',
                    topic: '',
                    resolve: '',
                },
                isLoading: false,
                validationRules: {
                    required: [
                        'topic',
                        'knowledgeId',
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
                    axios.post('/question/addCaseQuestion',
                        JSON.stringify(this.data),
                        {headers: {'Content-Type': 'application/json'}})
                        .then(response => {
                            console.log(response);
                            this.isLoading = false;
                            this.$Message.success('成功添加案例分析题！');
                        }).catch(error => {
                        console.error(error);
                        this.isLoading = false;
                    });
                } else {
                    this.$Message.error(`还有${validResult.messages.length}个错误未通过验证。`);
                }
            },
            reset() {
                this.isLoading = false;
                this.$refs.form.reset();
            },
            getKnowledgeList(){
                axios.get("/knowledge/list")
                    .then(response=>{
                        // this.setSubjectParams(response.data);
                        // console.log(response.data)
                        this.knowledgeParams=response.data;
                    })
                    .catch(()=>{})
            }
        },
        mounted() {
            this.getKnowledgeList();
        }
    };
</script>
<style lang="less">
    .border-1 {
        border: 1px solid #eeeeee;
    }
</style>