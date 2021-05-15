const { ipcRenderer, remote } = require('electron');
const fs = require('fs');
window.onload = () => {
    window.addEventListener('contextmenu', (e) => {
        //阻止默认事件
        e.preventDefault();
        //通知主线程响应右键
        ipcRenderer.send('contextMenu');
    });
    const texAreaDom = document.querySelector('#textArea');
    ipcRenderer.on('action', (event, action) => {
        switch (action) {
            case 'open':
                remote.dialog.showOpenDialog({
                    title: '打开文件',
                    properties: ['openFile']
                }).then(result => {
                    if (!result.canceled) {
                        //点击确定
                        const filePath = result.filePaths[0];
                        fs.readFile(filePath, (err, data) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            texAreaDom.value = data;
                        })
                    }
                })
                break;
            case 'save':
                remote.dialog.showSaveDialog({
                    title: '保存文件',
                    filters: [
                        {
                            name: 'All Files', extensions: ['*']
                        }
                    ],
                    defaultPath: 'aaa.txt'
                }).then(result => {
                    if (!result.canceled) {
                        const filePath = result.filePath;
                        fs.writeFile(filePath, texAreaDom.value, err => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    }
                })
                break;
        }
    })
}