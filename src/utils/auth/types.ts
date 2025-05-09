export type LoginFormValues = {
  email: string
  password: string
}

export type SignUpFormValues = {
  email: string
  password: string
  name: string
}

export type FormErrors = {
  email?: string
  password?: string  
  name?: string
}