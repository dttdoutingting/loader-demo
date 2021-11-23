const chalk = require('chalk')
const total = {
  libraryName: '',
  pathTotal: 0,
}

const components = {}

let cache = -1
let task = setInterval(() => {
  console.log(chalk.green('~~~~统计中～～～～'))
  if (total.pathTotal !== cache) {
    cache = total.pathTotal
  } else {
    clearInterval(task)
    console.log(components)
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
        const _libraryName = Array.isArray(libraryName) ? libraryName : [libraryName]
        const {
          callee: { object = {}, property = {} },
        } = path.node
        const _arguments = Array.from(path.node.arguments)
        if (object.name === 'mod' && property.name === 'import') {
          for (const item of _arguments) {
            if (_libraryName.includes(item.value) && item.start === undefined) {
              total.pathTotal = total.pathTotal + 1

              if (components[item.value]) {
                components[item.value].total++
                if (!components[item.value].paths.includes(source.filename)) {
                  components[item.value].paths.push(source.filename)
                }
              } else {
                components[item.value] = {
                  paths: [source.filename],
                  total: 1,
                }
              }
            }
          }
        }
      },
    },
  }
}
