const chalk = require('chalk')
const total = {
  components: {},
  pathTotal: 0,
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
const sortable = (obj) => Object.fromEntries(Object.entries(obj).sort(([, a], [, b]) => b - a))
module.exports = function (babel) {
  //   var t = babel.types
  return {
    visitor: {
      ImportDeclaration(path, source) {
        const {
          opts: { libraryName = 'antd' },
        } = source

        if (path.node.source.value.includes(libraryName)) {
          const { specifiers = [] } = path.node
          total.pathTotal = total.pathTotal + 1

          for (let s of specifiers) {
            if (s.imported) {
              const { name } = s.imported
              total.components[name] = total.components[name] ? total.components[name] + 1 : 1
              if (!total.paths.includes(source.filename)) {
                total.paths.push(source.filename)
              }
            }
          }
          total.components = sortable(total.components)
        }
      },
    },
  }
}
