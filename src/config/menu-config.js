const menuConfig = [
  {
    title: '系统信息',
    key: 'home',
    icon: 'icon-monitor',
    count: 1
  },
  {
    title: 'Icons',
    key: 'icons',
    icon: 'icon-heart'
  },
  {
    title: '列表应用',
    key: 'tablelist',
    icon: 'icon-grid-2',
    children: [
      {
        title: '基础表格',
        key: 'tableBasic'
      },
      {
        title: '查询列表',
        key: 'tableSearch'
      }
    ]
  },
  {
    title: '题库管理',
    key: 'questionManager',
    icon: 'icon-grid-2',
    children: [
      {
        title: '题库信息',
        key: 'questionInfo'
      },
      {
        title: '添加综合知识题',
        key: 'addChoice'
      },
      {
        title: '添加案例题',
        key: 'addCase'
      },
      {
        title: '添加论文题',
        key: 'addThesis'
      },

    ]
  },
  {
    title: '表单应用',
    key: 'form-folder',
    icon: 'icon-paper',
    children: [
      {
        title: '表单',
        key: 'form'
      }
    ]
  },
  {
    title: '模糊匹配',
    key: 'AutoComplete-folder',
    icon: 'icon-disc',
    children: [
      {
        title: '模糊搜索',
        key: 'autocomplete1'
      },
      {
        title: '场景应用',
        key: 'autocomplete2'
      },
      {
        title: '复杂场景',
        key: 'autocomplete3'
      }
    ]
  },
  {
    title: '扩展组件',
    key: 'Advance-folder',
    icon: 'icon-bar-graph-2',
    children: [
      {
        title: '图表',
        key: 'chart'
      },
      {
        title: '富文本编辑器',
        key: 'ricktextEditor'
      },
      {
        title: '代码编辑器',
        key: 'codeEditor'
      },
      {
        title: 'Markdown编辑器',
        key: 'markdownEditor'
      }
    ]
  },
  {
    title: '系统设置',
    key: 'sys-setting',
    icon: 'icon-cog',
    children: [
      {
        title: '个人中心',
        key: 'accountBasic'
      },
      {
        title: '安全设置',
        key: 'securitySetting'
      }
    ]
  },
  {
    title: '异常页面',
    key: 'error-pages',
    icon: 'icon-circle-cross',
    children: [
      {
        title: '403',
        key: 'permissionError'
      },
      {
        title: '404',
        key: 'notfoundError'
      },
      {
        title: '500',
        key: 'systemError'
      }
    ]
  }
];

export default menuConfig;
