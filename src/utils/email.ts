const EMAIL_REGEXP_V2 = /^[\w+.-]+[@\w+-]+\.\w{2,}(?:\.\w{2,})?$/

export const validateEmail = (email: string) => {
  if (!email) return false

  const onlyOneAhoba = email.split('@').length === 2
  // @ts-ignore
  const minOneCaracterAfterAhoba = email.split('@').at(-1).split('.').at(0).length > 0

  if (!onlyOneAhoba) return false
  if (!minOneCaracterAfterAhoba) return false

  return EMAIL_REGEXP_V2.test(email)
}
