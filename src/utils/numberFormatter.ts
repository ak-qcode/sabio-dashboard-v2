import type {Ref} from "vue";

const makeNumberFormatter = (locale: string) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,

    // @ts-ignore
    trailingZeroDisplay: 'stripIfInteger',
  })
}

let numberFormatter: Intl.NumberFormat;

export const setNumberFormatter = (locale: Ref<string> | string) => {
  numberFormatter = makeNumberFormatter(typeof locale === "string" ? locale : locale.value)
}

export const formatMoney = (value: number | undefined) => {
  if (!value) {
    return "-"
  }

  return numberFormatter.format(value)
}
