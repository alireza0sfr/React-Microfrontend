export interface IValidatorResponse {
  success: boolean
  errors: string[]
}

export enum ValidatorTypes {
  Required = 'Required',
  Unique = 'Unique',
  ValidFormat = 'ValidFormat'
}