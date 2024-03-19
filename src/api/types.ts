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

export interface PaymentMethodWithSupportedCountries {
  key: string,
  countries: string[],
}

export interface Country {
  code: string,
  name: string | null,
}
