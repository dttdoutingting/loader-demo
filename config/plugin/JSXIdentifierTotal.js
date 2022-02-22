const chalk = require('chalk')
const total = {
  libraryName: '',
  pathTotal: 0,
}

let components = {
  lowerCaseTotal: 0,
  upperCaseTotal: 0,
  lowerCasePaths: [],
}

let cache = -1

function isLowerCasePrefix(str) {
  if (str) {
    return str[0] === str[0].toLowerCase()
  }
  return false
}
const sortable = (obj) => Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.charCodeAt() - b.charCodeAt()))
let task = setInterval(() => {
  if (total.pathTotal !== cache) {
    cache = total.pathTotal
  } else {
    clearInterval(task)
    console.log(chalk.green('~~~~JSX标签使用个数统计结果～～～～'))
    const { lowerCaseTotal, upperCaseTotal, lowerCasePaths, ...restComps } = components
    console.log({ lowerCaseTotal, upperCaseTotal, lowerCasePaths, ...sortable(restComps) })
  }
}, 1000)

module.exports = function (babel) {
  return {
    visitor: {
      JSXElement: {
        exit(path, source) {
          const { openingElement } = path.node

          if (openingElement) {
            if (openingElement.name.type === 'JSXIdentifier') {
              const tmp = openingElement.name.name
              if (tmp) {
                if (isLowerCasePrefix(tmp)) {
                  components.lowerCaseTotal++
                  if (!components.lowerCasePaths.includes(source.filename)) {
                    components.lowerCasePaths.push(source.filename)
                  }
                } else {
                  components.upperCaseTotal++
                }

                components[tmp] = components[tmp] ? components[tmp] + 1 : 1
              }
            }
          }
          total.pathTotal++
        },
      },
    },
  }
}
