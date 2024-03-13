export interface Plan {
  id: number,
  name: string,
  initialBalance: number,
  price: number,
  specs: PlanSpec[]
}

export interface PlanSpec {
  key: string,
  value: string | number,
}
