import { Field, FieldDto } from '../models'

export default class Form<FormDto extends object> {
  private formFields: FieldDto<FormDto> = {}

  private keys: string[]

  private initialValues: FormDto

  get fields() {
    return this.formFields
  }

  get values() {
    return this.keys.reduce((acc: any, key: keyof FieldDto<FormDto>) => {
      acc[key] = this.formFields[key].input.value
      return acc
    }, {})
  }

  get canSubmit() {
    const hasChanges = this.keys.some((key) => this.formFields[key].changed)

    return hasChanges ? !this.keys.some((key) => !this.canSubmitField(key)) : false
  }

  constructor(initialValues: FormDto) {
    this.initialValues = initialValues
    this.keys = Object.keys(initialValues)
    this.setupFields()
  }

  setField = (key: keyof FieldDto<FormDto>, payload: Partial<Field<FormDto>>) => {
    this.formFields[key] = { ...this.formFields[key], ...payload }
  }

  setupFields = () => {
    this.formFields = Object.keys(this.initialValues).reduce((acc: any, key: any) => {
      acc[key] = {
        input: this.setupInput(this.initialValues[key as keyof FormDto], key),
        initialized: false,
      }
      return acc
    }, {}) as FieldDto<FormDto>
  }

  setupInput = (value: any, key: any) => ({
    value,
    name: key,
    onBlur: (e: any) => e,
    onChange: (e: any) => e,
  })

  handleChangeField = (key: keyof FormDto, value: any) => {
    const config = this.formFields[key as keyof FieldDto<FormDto>]?.config
    const validate = config?.validate ? config.validate(value, key) : null
    const initValue = this.initialValues[key]

    this.setField(key as keyof FieldDto<FormDto>, {
      input: this.setupInput(value, key),
      error: validate,
      filled: this.isFilled(value),
      changed: this.wasChanged(value, initValue),
    })
  }

  canSubmitField = (key: keyof FieldDto<FormDto>): boolean => {
    const field = this.formFields[key]

    return field.required ? field.filled && !field.error : true
  }

  wasChanged = (value: any, oldValue: any): boolean => {
    const valueType = checkValueType(oldValue)

    switch (valueType) {
      case 'array':
        return !arraysAreEqual(value, oldValue)
      case 'object':
        return !objectsAreEqual(value, oldValue)
      default:
        return value !== oldValue
    }
  }

  isFilled = (value: any): boolean => {
    const valueType = checkValueType(value)

    switch (valueType) {
      case 'array':
        return !!value.length
      case 'object':
        return !!Object.keys(value).length
      case 'boolean':
        return true
      default:
        return !!value
    }
  }

  clearForm = () => this.setupFields()
}

export const checkValueType = (value: any) => {
  if (value === undefined || value === null) return 'empty'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'object') return 'object'

  return 'string-number'
}

export const arraysAreEqual = (a: any[], b: any[]) =>
  a.length === b.length && a.every((aEl, i) => aEl === b[i])

export const objectsAreEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)
