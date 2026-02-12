const formatValue = (value) => {
  if (typeof value === 'boolean') {
    return value.toString()
  }
  return value
}

const stylish = (tree) => {
  const lines = tree.flatMap((node) => {
    switch (node.type) {
      case 'removed':
        return `  - ${node.key}: ${formatValue(node.value)}`
      case 'added':
        return `  + ${node.key}: ${formatValue(node.value)}`
      case 'changed':
        return [
          `  - ${node.key}: ${formatValue(node.oldValue)}`,
          `  + ${node.key}: ${formatValue(node.newValue)}`,
        ]
      case 'unchanged':
        return `    ${node.key}: ${formatValue(node.value)}`
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return `{\n${lines.join('\n')}\n}`
}

export default stylish
