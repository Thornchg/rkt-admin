<template>
    <div class="frame-page">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">添加试卷</span>
            </div>
            <div class="h-panel-body">
                <Form :label-width="110" :model="data" mode="single" ref="form">
                    <FormItem label="科目" prop="subjectId">
                        <Select v-model="data.subjectId" autosize :datas="subjectParams" keyName="id"
                                titleName="name"></Select>
                    </FormItem>
                    <FormItem label="标题" prop="title">
                        <input type="text" v-model="data.title"/>
                    </FormItem>
                    <FormItem label="试卷" prop="paperType">
                        <Radio v-model="data.paperTypeId" :datas="paperTypeParams"></Radio>
                    </FormItem>
                    <FormItem label="题型" prop="questionType">
                        <SwitchList v-model="data.questionType" :datas="questionTypeParams"></SwitchList>
                    </FormItem>
                    <FormItem label="题数" prop="count" v-width="300">
                        <NumberInput v-model="data.count" :useOperate="true"></NumberInput>
                    </FormItem>
                    <FormItem label="总分" prop="total" v-width="300">
                        <NumberInput v-model="data.total" :useOperate="true"></NumberInput>
                    </FormItem>
                    <FormItem>
                        <Button color="primary" @click="submit">添加试卷</Button>
                    </FormItem>
                    <div class="h-panel">
                        <div class="h-panel-bar">
                            <div class="h-panel-title">
                                <Badge :count="data.questions.length" :showZero="true">
                                    <div class="text-center">题目</div>
                                </Badge>
                            </div>
                        </div>
                        <div ref="questionContainer" class="h-panel-body"
                             style="overflow: hidden;position: relative;min-height: 100px">
                            <Affix :fixedOffsetTop="80" :offset-top="20" :offset-bottom="20" class="affix-demo-3"
                                   :container="getContainer">
                                <button class="h-btn h-btn-blue add-question" @click="wangToAddQuestion"><i
                                        class="h-icon-plus"></i></button>
                            </Affix>
                            <Modal v-model="questionAdding" :closeOnMask="false">
                                <div slot="header">Vue</div>
                                <div>
                                    <div class="h-panel">
                                        <div class="h-panel-bar">
                                            <SearchFilter v-model="knowledgeParams" :datas="knowledges"
                                                          prop="knowledgeId"
                                                          title="知识点" keyName="id" titleName="name"
                                                          @change="searchFilterChange"></SearchFilter>
                                        </div>
                                        <div class="h-panel-body">
                                            <Table ref="questionLibTable" :datas="questionLib" stripe selectRow checkbox @trdblclick="trclick">
                                                <!--<TableItem title="序号"><template slot-scope="{index}">{{index}}</template></TableItem>-->
                                                <TableItem :width="200">
                                                    <template slot-scope="{data}">
                                                        <span class="font-bold">{{data.questionType===3?'科目':'知识点'}}:</span>
                                                        {{data.questionType===3?data.subjectName:data.knowledgeName}}
                                                    </template>
                                                </TableItem>
                                                <TableItem title="题型" :width="100">
                                                    <template slot-scope="{data}">
                                                        {{getQuestionType(data.questionType)}}
                                                    </template>
                                                </TableItem>
                                                <TableItem title="题目" :width="410">
                                                    <template slot-scope="{data}">
                                                        <Tooltip theme="white" placement="bottom">
                                                            <!--<span class="text-hover">Component调用</span>-->
                                                            <TextEllipsis class="text-hover"
                                                                          :text="getTextForHtml(data.topic)"
                                                                          :height="40"
                                                                          v-width="400">
                                                                <template slot="more">...</template>
                                                            </TextEllipsis>
                                                            <div slot="content">
                                                                <div v-html="data.topic">
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </template>
                                                </TableItem>
                                                <!--<TableItem title="修改时间" prop="updateTime"></TableItem>-->
                                                <!--<TableItem title="修改者" prop="updater"></TableItem>-->
                                                <TableItem title="操作" :width="60">
                                                    <template slot-scope="{data}">
                                                        <Button size="s" color="primary" @click="trclick(data)">
                                                            {{data._expand?'收起':'展开'}}
                                                        </Button>
                                                    </template>
                                                </TableItem>
                                                <template slot="expand" slot-scope="{index, data}">
                                                    <Form readonly mode="single" class="choiceInfo">
                                                        <FormItem label="题目">
                                                            <div v-html="data.topic"></div>
                                                        </FormItem>
                                                        <FormItem label="选项" v-if="data.questionType===1">
                                                            <div class="box-select" v-for="(item,index) in data.selects"
                                                                 :key="item.index">
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
                                <div slot="footer">
                                    <button class="h-btn" @click="addQuestions">添加到试卷</button>
                                    <button class="h-btn" @click="questionAdding=false">取消</button>
                                </div>
                            </Modal>
                            <div class="questions">
                                <p v-if="data.questions.length===0" class="text-center">
                                    暂未添加试卷题目！
                                </p>
                                <section v-for="(question,questionIndex) in questions" class="question">
                                    <div class="question-topic d-flex">
                                        <span class="question-index font-bold">第{{questionIndex+1}}题.</span>
                                        <div class="" v-html="question.topic"></div>
                                    </div>
                                    <div class="choice-selects">
                                        <div class="select" v-for="(select,index) in question.selects">
                                            <div class="select-index">问题{{index+1}}选项：</div>
                                            <div class="item">
                                                <label>A.</label>
                                                <div v-html="select.choiceA"></div>
                                            </div>
                                            <div class="item">
                                                <label>B.</label>
                                                <div v-html="select.choiceB"></div>
                                            </div>
                                            <div class="item">
                                                <label>C.</label>
                                                <div v-html="select.choiceC"></div>
                                            </div>
                                            <div class="item">
                                                <label>D.</label>
                                                <div v-html="select.choiceD"></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <!--<div class="questions">
                                <Table :datas="data.questions" stripe selectRow @trdblclick="trclick">
                                    &lt;!&ndash;<TableItem title="序号"><template slot-scope="{index}">{{index}}</template></TableItem>&ndash;&gt;
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
                                                &lt;!&ndash;<span class="text-hover">Component调用</span>&ndash;&gt;
                                                <TextEllipsis class="text-hover" :text="getTextForHtml(data.topic)"
                                                              :height="40"
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
                                    &lt;!&ndash;<TableItem title="修改时间" prop="updateTime"></TableItem>&ndash;&gt;
                                    &lt;!&ndash;<TableItem title="修改者" prop="updater"></TableItem>&ndash;&gt;
                                    <TableItem title="操作" :width="140">
                                        <template slot-scope="{data}">
                                            <Button size="s" color="primary" @click="trclick(data)">
                                                {{data._expand?'收起':'展开'}}
                                            </Button>
                                            &lt;!&ndash;<Button size="s" color="red" @click="remove(data)">删除</Button>&ndash;&gt;
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
                                                <div class="box-select" v-for="(item,index) in data.selects"
                                                     :key="item.index">
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
                            </div>-->
                            <FormItem v-if="data.questions.length>0">
                                <Button color="primary" @click="submit">添加试卷</Button>
                            </FormItem>
                        </div>
                    </div>
                </Form>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddPaper",
        data() {
            return {
                questionAdding: false,
                subjectParams: [],
                paperTypeParams: {2: '模拟试卷', 3: '历年真题试卷'},
                questionTypeParams: {1: '综合知识', 2: '案例分析', 3: '论文'},
                questions: [],
                questionLib: [],
                data: {
                    count: 0,
                    total: 0,
                    questionType: null,
                    title: '',

                    paperTypeId: null,
                    subjectId: null,
                    questions: [],
                },
                validationRules: {
                    required: [
                        'subjectId',
                        'questionType',
                        'paperType',
                    ],
                },
                knowledges: [{id: '1', name: '综合知识'}],
                knowledgeParams: {
                    knowledgeId: null,
                }
            }
        },
        methods: {
            getSubjects() {
                axios.get("/subject/list")
                    .then(response => {
                        // this.setSubjectParams();
                        let params = [];
                        let level = 0;
                        for (let subject of response.data) {
                            if (subject.level !== level) {
                                let labelName = ['软考初级', '软考中级', '软考高级'];
                                params.push({
                                    // id:'level'+subject.level,
                                    name: labelName[subject.level - 1],
                                    isLabel: true
                                });
                                level = subject.level;
                            }
                            params.push(subject);
                        }
                        this.subjectParams = params;
                    })
                    .catch(() => {
                    })
            },
            getContainer() {
                return this.$refs.questionContainer;
            },
            getQuestionType(questionType) {
                switch (questionType) {
                    case 1:
                        return "综合知识";
                    case 2:
                        return "案例分析";
                    case 3:
                        return "论文";

                }
            },
            trclick(data) {
                this.$set(data, '_expand', !data._expand);
            },
            getTextForHtml(html) {
                let div = document.createElement('div');
                div.innerHTML = html;
                return div.innerText;
            },
            submit() {
                axios.post("/paper/addPaper",
                    JSON.stringify(this.data),
                    {headers: {'Content-Type': 'application/json'}})
                    .then(response => {
                        this.$Message("添加试卷成功！");
                    })
                    .catch(error => {
                        console.error(error);
                    })
            },
            wangToAddQuestion() {
                if (!this.data.subjectId || !this.data.questionType) {
                    this.$Message("请先选择科目与题型");
                } else {
                    this.questionAdding = true;
                    console.log("科目：" + this.data.subjectId);
                    console.log("题型：" + this.data.questionType);
                    axios.get('/knowledge/listBySubjectKnowledge', {
                            params: {
                                subjectId: this.data.subjectId,
                                questionType: this.data.questionType
                            }
                        })
                        .then(response => {
                            // console.log(response.data)
                            this.knowledges = response.data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    this.getQuestionLib();
                }
            },
            searchFilterChange() {
                this.getQuestionLib();


            },
            getQuestionLib() {
                axios.get('question/listbySubjectKnowledge', {
                    params: {
                        subjectId: this.data.subjectId,
                        questionType: this.data.questionType,
                        knowledgeId: this.knowledgeParams.knowledgeId
                    }
                })
                    .then(response => {
                        // console.log(JSON.parse(response.data.records));
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
                        this.questionLib=datas;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            addQuestions(){
                let datas=this.$refs.questionLibTable.getSelection();
                console.log(datas);
                for (let data of datas){
                    console.log("add");
                    this.questions.push(data);
                    this.data.questions.push(data.id);
                }
                this.questionAdding=false;

            }
        },
        mounted() {
            this.getSubjects();
        }
    }
</script>

<style scoped lang="less">
    .add-question {
        border-radius: 50%;
        height: 60px;
        width: 60px;
        font-size: 24px;
        font-weight: 800;
        opacity: .6;
        transition: all .3s;

        &:hover {
            opacity: 1;
        }
    }

    .questions {
        margin-left: 80px;

        .question {
            border-bottom: 1px solid #CCCCCC;
            margin-bottom: 15px;
            /deep/ p{
                margin: 0;
            }
        }

        .question-index {
            color: @primary-color;
            display: block;
            margin-right: 5px;
        }

        .choice-selects {
            margin-left: 60px;

            .select {
                margin: 15px 0;

                .item {
                    display: flex;
                }
            }
        }
    }

</style>