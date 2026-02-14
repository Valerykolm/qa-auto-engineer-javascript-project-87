const formatValue = (value) => {
  if (typeof value === 'boolean') {
    return value.toString()
  }
  return value
}

const signs = {
  added: '+',
  removed: '-',
  unchanged: ' ',
}

const stylish = (tree) => {
  const lines = tree.flatMap((node) => {
    if (node.type === 'changed') {
      return [
        `  - ${node.key}: ${formatValue(node.oldValue)}`,
        `  + ${node.key}: ${formatValue(node.newValue)}`,
      ]
    }

    if (!signs[node.type] && node.type !== 'changed') {
      throw new Error(`Unknown type: ${node.type}`)
    }

    const sign = signs[node.type]
    return `  ${sign} ${node.key}: ${formatValue(node.value)}`
  })

  return `{\n${lines.join('\n')}\n}`
}

export default stylish
