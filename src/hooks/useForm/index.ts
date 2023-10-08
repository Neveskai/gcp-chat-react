import React from 'react'
import Form, { objectsAreEqual } from './repository/Form'
import { ConfigType, FieldDto, Registered, useFormType } from './models'

export function useForm<FormDto extends object>(initValues: FormDto) {
  const [_, reRender] = React.useReducer((i) => i + 1, 0)
  const [initialValues, setInitialValues] = React.useState(initValues)

  const form = React.useMemo(() => new Form<FormDto>(initialValues), [initialValues])
  const fields = form.fields

  React.useEffect(() => {
    if (!objectsAreEqual(initialValues, initValues)) setInitialValues(initValues)
  }, [initValues])

  const setFormValue = (payload: Partial<FormDto>) => {
    Object.keys(payload).forEach((key) => {
      const e = payload[key as keyof FormDto] as any

      form.handleChangeField(key as keyof FormDto, e)
    })

    reRender()
  }

  const handleChangeValue = (e: any, key: keyof FormDto) => {
    const config = fields[key as keyof FieldDto<FormDto>]?.config
    const parsedValue = config?.parser ? config?.parser(e) : e.target.value

    form.handleChangeField(key, parsedValue)

    reRender()
  }

  const register = (key: keyof FormDto, config?: ConfigType<FormDto>) => {
    const field = fields[key as keyof FieldDto<FormDto>]

    if (!field.initialized) fieldInitialize(key, config)

    const value = config?.getter ? config.getter(field.input.value) : field.input.value
    const onChange = config?.setter ? config.setter : handleChangeValue

    return {
      id: key,
      name: key,
      value,
      required: config?.required || false,
      onBlur: (e: any) => e,
      onChange: (e: any) => onChange(e, key),
    } as Registered<FormDto>
  }

  const fieldInitialize = (key: keyof FormDto, config?: ConfigType<FormDto>) => {
    const value = config?.getter ? config.getter(initialValues[key]) : initialValues[key]
    const onChange = config?.setter ? config.setter : handleChangeValue

    const validate = config?.validate ? config.validate(value, key) : null
    const required = config?.required || false

    form.setField(key as keyof FieldDto<FormDto>, {
      input: {
        ...form.setupInput(value, key),
        onChange: (e: any) => onChange(e, key),
      },
      error: validate,
      filled: form.isFilled(value),
      changed: false,
      config: config || null,
      initialized: true,
      required,
    })
  }

  return {
    values: form.values,
    fields,
    canSubmit: form.canSubmit,
    register,
    setField: form.handleChangeField,
    clearForm: form.clearForm,
    setFormValue,
  } as useFormType<FormDto>
}
