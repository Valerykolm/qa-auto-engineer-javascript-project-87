const buildDiff = (data1, data2) => {
  const keys = [...new Set([
    ...Object.keys(data1),
    ...Object.keys(data2),
  ])].sort((a, b) => a.localeCompare(b))

  return keys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { type: 'removed', key, value: data1[key] }
    }

    if (!Object.hasOwn(data1, key)) {
      return { type: 'added', key, value: data2[key] }
    }

    if (data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        oldValue: data1[key],
        newValue: data2[key],
      }
    }

    return { type: 'unchanged', key, value: data1[key] }
  })
}

export default buildDiff
