<template>
    <div class="app-form frame-page">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">添加案例题</span>
            </div>
            <div class="h-panel-body" style="padding: 40px;">
                <Form :label-width="110" :mode="mode" :model="data" :rules="validationRules" ref="form">
                    <FormItem label="科目" prop="subjectId">
                        <Select v-model="data.subjectId" autosize :datas="subjectParams" keyName="id" titleName="name"></Select>
                    </FormItem>
                    <FormItem label="题目" :single="true" prop="topic">
                        <!--<textarea rows="3" v-autosize v-model="data.topic"></textarea>-->
                        <RichTextEditor v-model="data.topic" cacheName="caseTopicEditor"></RichTextEditor>
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
        name:'addThesis',
        data() {
            return {
                subjectParams:[
                    /*{title:'软考高级',isLabel:true},
                    {title:'系统分析师',key:14},
                    {title:'信息系统项目管理师',key:15},
                    {title:'网络规划设计师',key:16},
                    {title:'系统架构设计师',key:17},
                    {title:'系统规划与管理师',key:18},
                    {title:'软考中级',isLabel:true},
                    {title:'系统集成项目管理工程师',key:4},
                    {title:'软件设计师',key:5},
                    {title:'网络工程师',key:6},
                    {title:'信息系统监理师',key:7},
                    {title:'信息系统管理工程师',key:8},
                    {title:'电子商务设计师',key:9},
                    {title:'软件评测师',key:10},
                    {title:'信息安全工程师',key:11},
                    {title:'数据库系统工程师',key:12},
                    {title:'嵌入式系统设计师',key:13},
                    {title:'软考初级',isLabel:true},
                    {title:'程序员',key:0},
                    {title:'网络管理员',key:1},
                    {title:'信息处理技术员',key:2},
                    {title:'信息系统运行管理员',key:3},*/

                ],
                mode: 'single',
                data: {
                    subjectId:'',
                    topic:''
                },
                isLoading: false,
                validationRules: {
                    required: [
                        'topic',
                        'subjectId',
                    ],
                }
            }
        },
        methods: {
            submit() {
                let validResult = this.$refs.form.valid();
                // log(validResult.messages);
                if (validResult.result) {
                    this.isLoading = true;
                    axios.post('/question/addThesisQuestion',
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
            setSubjectParams(subjects){
                let params=[];
                let level=0;
                for (let subject of subjects){
                    if (subject.level!==level){
                        let labelName=['软考初级','软考中级','软考高级'];
                        params.push({
                            // id:'level'+subject.level,
                            name:labelName[subject.level-1],
                            isLabel:true
                        });
                        level=subject.level;
                    }
                    params.push(subject);
                }
                this.subjectParams=params;
            }
        },
        mounted() {
            axios.get("/subject/list")
                .then(response=>{
                    this.setSubjectParams(response.data);
                })
                .catch(()=>{})
        }
    };
</script>
<style lang="less">
    .border-1 {
        border: 1px solid #eeeeee;
    }
</style>