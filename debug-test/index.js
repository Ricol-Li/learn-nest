const os = require('os')
const homeDir = os.homedir()

const name = os.hostname()
console.log('🚀 ~ homeDir:', homeDir)

// node --inspect-brk index.js 首行断点，然后再chrome浏览器的inspect中打开 chrome://inspect
// 可以通过命令，或者vscode中的launch.json来启动调试
