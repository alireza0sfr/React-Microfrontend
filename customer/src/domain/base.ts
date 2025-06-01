export function idGenerator(n: number = 5): string {
  return Math.random().toString(36).substr(2, n)
}

export class BaseModel {
  id: string
  createdDate: string

  constructor() {
    this.id = ''
    this.createdDate = ''
  }
}