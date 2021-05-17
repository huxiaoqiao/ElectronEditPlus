const { ipcRenderer, remote } = require('electron');
const fs = require('fs');
/***
 * 1、新建，打开判断文件是否保存
 * 2、如果已经保存 第二次保存的时候不提示，直接保存
 * 3、判断文件是否已经保存 改变软件左上角的标题
 */
document.title = '无标题';
//获取文本框dom
const textAreaDom = document.querySelector('#textArea');
var isSave = true;//文件是否已经保存
var currentFile = '';//当前的文件路径
textAreaDom.oninput = () => {
    isSave = false;
    if (currentFile.length > 0) {
        document.title = currentFile + ' *';
    } else {
        document.title = '无标题' + ' *';
    }
}
window.addEventListener('contextmenu', (e) => {
    //阻止默认事件
    e.preventDefault();
    //通知主线程响应右键
    ipcRenderer.send('contextMenu');
});
ipcRenderer.on('action', (event, action) => {
    switch (action) {
        case 'new':
            //判断文件是否保存 如果没有则提示并保存
            askSaveDialog();
            textAreaDom.value = '';
            currentFile = '';
            document.title = "无标题";
            break;
        case 'open':
            //判断文件是否保存 如果没有则提示并保存
            askSaveDialog();
            //通过dialog打开文件
            remote.dialog.showOpenDialog({
                title: '打开文件',
                properties: ['openFile']
            }).then(result => {
                if (!result.canceled) {
                    let fsData = fs.readFileSync(result.filePaths[0]);
                    //保存当前路径
                    currentFile = result.filePaths[0];
                    document.title = currentFile;
                    textAreaDom.value = fsData;
                }
            })
            break;
        case 'save'://保存文件
            saveCurrentDoc();
            break;
        case 'exit'://退出
            askSaveDialog();//同步操作
            remote.app.quit();
            break;
    }
});
//判断文件是否保存并执行保存功能
function askSaveDialog() {
    if (!isSave) {
        const result = remote.dialog.showMessageBoxSync({
            type: 'question',
            message: currentFile.length > 0 ? '你想将更改保存到\n' + currentFile + '吗？' : "要保存此文件吗？",
            buttons: ['ok', 'no']
        });
        if (result == 0) {
            saveCurrentDoc();
        } else {
            //不保存的话 isSave = true
            isSave = true;
        }
    }
}

function saveCurrentDoc() {
    if (currentFile.length <= 0) {
        var result = remote.dialog.showSaveDialogSync({
            title: '保存文件',
            filters: [
                {
                    name: 'All Files', extensions: ['*']
                }
            ],
            defaultPath: '无标题.txt'
        });
        if (result) {
            currentFile = result;
        }
    }
    //点击确定,则保存文件
    if (currentFile.length > 0) {
        fs.writeFileSync(currentFile, textAreaDom.value);
        isSave = true;
        document.title = currentFile;
    }
}


