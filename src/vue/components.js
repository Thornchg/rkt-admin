// import Vue from 'vue';
import SubMenu from '@/components/SubMenu';
import SearchFilter from '@/components/SearchFilter';
import AItem from '@/components/AItem';
import BItem from '@/components/BItem';

Vue.component('SubMenu', SubMenu);
Vue.component('AItem', AItem);
Vue.component('BItem', BItem);
Vue.component('SearchFilter', SearchFilter);
Vue.component('Qiniu', (resolve) => require(['@/components/Qiniu'], resolve));

Vue.component('Chart', (resolve) => require(['@/components/Chart'], resolve));
// Vue.component('CodeEditor', (resolve) => require(['components/common/CodeEditor'], resolve));
Vue.component('RichTextEditor', (resolve) => require(['@/components/RichTextEditor'], resolve));
// Vue.component('MarkdownEditor', (resolve) => require(['components/common/MarkdownEditor'], resolve));