export interface ConfigType<FormDto> {
  required?: boolean
  validate?: (value: any, key: any) => any
  getter?: (value: any) => any
  setter?: (key: keyof FormDto, value: any) => any
  parser?: (value: any) => any
}

export type ErrorType = {
  fields: { naField: string; dsDetail: string }[]
}

export type Field<FormDto> = {
  input: { [key: string]: any }
  error: any
  filled: boolean
  changed: boolean
  required: boolean | null
  config: ConfigType<FormDto> | null
  initialized: boolean
  onBlur: (e: any) => void
}

export type FieldDto<FormDto> = { [key: string]: Field<FormDto> }

export type Registered<FormDto> = {
  id: string
  name: string
  value: FormDto[keyof FormDto]
  required: boolean
  onChange: (e: any) => void
}

export type useFormType<FormDto> = {
  values: FormDto
  fields: FieldDto<FormDto>
  canSubmit: boolean
  register: (key: keyof FormDto, config?: ConfigType<FormDto>) => Registered<FormDto>
  setField: (key: keyof FormDto, value: any) => void
  setFormValue: (payload: Partial<FormDto>) => void
}
