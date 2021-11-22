const chalk = require('chalk')
const total = {
  libraryName: '',
  pathTotal: 0,
  components: {},
  paths: [],
}
let cache = -1
let task = setInterval(() => {
  console.log(chalk.green('~~~~统计中～～～～'))
  if (total.pathTotal !== cache) {
    cache = total.pathTotal
  } else {
    clearInterval(task)
    console.log(total)
  }
}, 1000)
// const sortable = (obj) => Object.fromEntries(Object.entries(obj).sort(([, a], [, b]) => b - a))
module.exports = function (babel) {
  //   var t = babel.types

  return {
    visitor: {
      CallExpression(path, source) {
        const {
          opts: { libraryName = 'pay-components' },
        } = source
        total.libraryName = libraryName
        const {
          callee: { object = {}, property = {} },
        } = path.node
        const _arguments = Array.from(path.node.arguments)
        if (object.name === 'mod' && property.name === 'import') {
          const libIdx = _arguments.findIndex((item) => item.value === libraryName)
          if (libIdx >= 0 && _arguments[libIdx].start === undefined) {
            if (!total.paths.includes(source.filename)) {
              total.paths.push(source.filename)
            }
            total.pathTotal++
          }
        }
      },
    },
  }
}
