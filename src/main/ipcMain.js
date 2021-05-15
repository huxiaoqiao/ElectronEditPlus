const { Menu, BrowserWindow, shell, ipcMain } = require('electron');

/**
 * 顶部菜单列表数组
 */
const template = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建',
                click: () => {

                }
            },
            {
                label: '打开',
                click: () => {

                }
            },
            {
                label: '保存',
                click: () => {

                }
            },
            {
                type: 'separator'
            },
            {
                label: '打印',
                click: () => {

                }
            },
            {
                label: '退出',
                click: () => {

                }
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                role: 'undo',
            },
            {
                label: '恢复',
                role: 'redo',
            },
            {
                type: 'separator'
            },
            {
                label: '剪切',
                role: 'cut'
            },
            {
                label: '复制',
                role: 'copy'
            },
            {
                label: '粘贴',
                role: 'paste'
            },
            {
                label: '删除',
                role: 'delete'
            },
            {
                label: '全选',
                role: 'selectall'
            }
        ]
    },
    {
        label: '视图',
        submenu: [
            {
                label: '缩小',
                role: 'zoomout'
            },
            {
                label: '放大',
                role: 'zoomin'
            },
            {
                label: '重置缩放',
                role: 'resetzoom'
            },
            {
                type: 'separator'
            },
            {
                label: '全屏',
                role: 'togglefullscreen'
            }
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '关于',
                click: () => {
                    shell.openExternal('http://www.ubkz.net');
                }
            }
        ]
    }
];
//创建顶部菜单
const menu = Menu.buildFromTemplate(template);
//应用菜单
Menu.setApplicationMenu(menu);

//右键菜单模板
const contextMenuTemplate = [
    {
        label: '撤销',
        role: 'undo'
    },
    {
        label: '恢复',
        role: 'redo'
    },
    {
        type: 'separator'
    },
    {
        label: '剪切',
        role: 'cut'
    },
    {
        label: '复制',
        role: 'copy'
    },
    {
        label: '粘贴',
        role: 'paste'
    },
    {
        type: 'separator'
    },  //分隔线
    {
        label: '全选',
        role: 'selectall'
    }   //Select All菜单项 
]

const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);

ipcMain.on('contextMenu', () => {
    contextMenu.popup(BrowserWindow.getFocusedWindow());
})
