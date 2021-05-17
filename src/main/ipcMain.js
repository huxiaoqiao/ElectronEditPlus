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
                accelerator: 'Ctrl+N',
                click: () => {
                    //通知渲染进程新建文件
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'new');
                }
            },
            {
                label: '打开',
                accelerator: 'Ctrl+O',
                click: () => {
                    //通知渲染进程弹出打开文件弹框
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'open');
                }
            },
            {
                label: '保存',
                accelerator: 'Ctrl+S',
                click: () => {
                    //通知渲染进程弹出保存文件弹框
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'save');
                }
            },
            {
                type: 'separator'
            },
            {
                label: '打印',
                accelerator: 'Ctrl+P',
                click: () => {
                    //https://www.electronjs.org/docs/api/web-contents#webcontents
                    BrowserWindow.getFocusedWindow().webContents.print();
                }
            },
            {
                label: '退出',
                accelerator: 'Ctrl+Q',
                click: () => {
                    //如果没有保存文件，需要询问是否保存文件再退出
                    //主进程通知渲染进程
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'exit');
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
            },
            {
                type: 'separator'
            },
            {
                label: '重载(reload)',//!用于调试,打包前去掉
                role: 'reload'
            },
            {
                label: '调试窗口',//!用于调试,打包前去掉
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.openDevTools();
                }
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
});
