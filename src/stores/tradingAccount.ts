import {defineStore} from 'pinia'
import axios from "axios";

interface TradingAccount {
  login: bigint,
  sabioEmail: string,
  accountType: string,
  status: string,
  startingBalance: string,
  accountId: number,
  remainingDays: number,
}

export const useTradingAccountStore = defineStore('tradingAccount', {
  state: () => ({
    tradingAccounts: [] as TradingAccount[],
    currentAccount: null as TradingAccount | null,
  }),
  actions: {
    fetchList() {
      axios.get('/trading-accounts')
          .then(res => res.data)
          .then(data => {
            this.tradingAccounts = data
          })
    },
    setList(accounts: TradingAccount[]) {
      this.tradingAccounts = accounts
    },
    selectAccount(accountId: number) {
      this.currentAccount = this.tradingAccounts.find(a => a.accountId === accountId)
    }
  }
})
