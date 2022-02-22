const chalk = require('chalk')
const total = {
  libraryName: '',
  pathTotal: 0,
}

let components = {
  lowerCaseTotal: 0,
  upperCaseTotal: 0,
}

let cache = -1

function isLowerCasePrefix(str) {
  if (str) {
    return str[0] === str[0].toLowerCase()
  }
  return false
}

let task = setInterval(() => {
  console.log(chalk.green('~~~~JSX标签使用个数统计中～～～～'))

  if (total.pathTotal !== cache) {
    cache = total.pathTotal
  } else {
    clearInterval(task)
    console.log(components)
  }
}, 1000)
module.exports = function (babel) {
  return {
    visitor: {
      JSXElement: {
        exit(path, file) {
          const { openingElement } = path.node

          if (openingElement) {
            if (openingElement.name.type === 'JSXIdentifier') {
              const tmp = openingElement.name.name
              if (tmp) {
                if (isLowerCasePrefix(tmp)) {
                  components.lowerCaseTotal++
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
