// import Vue from 'vue';
import SubMenu from '@/components/SubMenu';

Vue.component('SubMenu', SubMenu);
// Vue.component('Qiniu', (resolve) => require(['components/common/Qiniu'], resolve));
Vue.component('Chart', (resolve) => require(['@/components/Chart'], resolve));
// Vue.component('CodeEditor', (resolve) => require(['components/common/CodeEditor'], resolve));
Vue.component('RichTextEditor', (resolve) => require(['@/components/RichTextEditor'], resolve));
// Vue.component('MarkdownEditor', (resolve) => require(['components/common/MarkdownEditor'], resolve));