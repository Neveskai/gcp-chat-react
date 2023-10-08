import { Button as MuiButton, ButtonProps } from '@mui/material'

function Button({ children, ...otherProps }: ButtonProps) {
  return <MuiButton {...otherProps}>{children}</MuiButton>
}

export default Button
