export const currencyFormatter = (name: string, formRef: any) => {
  var value = formRef.getFieldValue(name)

  value = value + ''
  value = parseInt(value.replace(/[\D]+/g, ''))
  value = value + ''
  value = value.replace(/([0-9]{2})$/g, ',$1')

  if (value.length > 6) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }
  formRef.setFieldValue(name, value)
  if (value == 'NaN') formRef.setFieldValue(name, '')
}
