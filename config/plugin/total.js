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
// libraryName 支持传 字符串 或者 数组
module.exports = function (babel) {
  //   var t = babel.types
  return {
    visitor: {
      ImportDeclaration(path, source) {
        const {
          opts: { libraryName = 'antd' },
        } = source
        const _libraryName = Array.isArray(libraryName) ? libraryName : [libraryName]
        const libName = _libraryName.find((item) => item === path.node.source.value)

        if (libName) {
          const { specifiers = [] } = path.node
          total.pathTotal = total.pathTotal + 1

          for (let s of specifiers) {
            if (s.imported) {
              const { name } = s.imported
              if (components[libName]) {
                components[libName][name] = components[libName][name] ? components[libName][name] + 1 : 1

                if (!components[libName].paths.includes(source.filename)) {
                  components[libName].paths.push(source.filename)
                }
              } else {
                components[libName] = {
                  paths: [source.filename],
                  [name]: 1,
                }
              }
            }
          }
        }
      },
    },
  }
}
