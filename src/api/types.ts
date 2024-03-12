export interface Plan {
  id: number,
  name: string,
  initialBalance: number | string,
  price: number,
  specs: PlanSpec[]
}

export interface PlanSpec {
  key: string,
  value: string | number,
}
