module.exports = function getYupFields (schema) {
  const fields = []

  for (const k in schema.fields) {
    const field = schema.fields[k]

    const testMin = field.tests.find(test => test.OPTIONS.name === 'min')
    const testMax = field.tests.find(test => test.OPTIONS.name === 'max')

    const row = {
      name: k,
      type: field.type,
      required: !field.spec.optional,
      default: field.spec.default,
      nullable: field.spec.nullable,
      min: testMin && ('min' in testMin.OPTIONS.params) ? testMin.OPTIONS.params.min : null,
      max: testMax && ('max' in testMax.OPTIONS.params) ? testMax.OPTIONS.params.max : null,
      more: testMin && ('more' in testMin.OPTIONS.params) ? testMin.OPTIONS.params.more : null,
      less: testMax && ('less' in testMax.OPTIONS.params) ? testMax.OPTIONS.params.less : null,
      whitelist: null
    }

    if (field.internalTests.whiteList && field.internalTests.whiteList.OPTIONS.name === 'oneOf') {
      row.whitelist = []

      for (const value of field._whitelist) {
        if (value.constructor.name === 'Reference') {
          row.whitelist = null
          break
        }

        row.whitelist.push(value)
      }
    }

    fields.push(row)
  }

  return fields
}
