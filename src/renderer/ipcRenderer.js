const { ipcRenderer } = require('electron');

window.onload = () => {
    window.addEventListener('contextmenu', (e) => {
        //阻止默认事件
        e.preventDefault();
        //通知主线程响应右键
        ipcRenderer.send('contextMenu');
    })
}