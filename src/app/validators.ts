import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_])(?=\S+$).{8,32}$/.test(control.value)
    return forbidden ? { invalidPassword: { value: control.value } } : null
  }
}

export const repeatPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const psw = control.get('password')
  const psw2 = control.get('repeatPassword')
  const good = !(psw && psw2 && psw.value === psw2.value)

  return good ? { invalidPassword: true } : null
}
