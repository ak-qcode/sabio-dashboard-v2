import {defineStore} from 'pinia'
import axios from "axios";
import {notify} from "notiwind";

export interface TradingAccount {
  id: number,
  account_id: number,
  login: bigint,
  sabio_user_id: bigint,
  sabio_email: string,
  display_name: string | null,
}

export interface DashboardData {
  hasMetric: boolean;
  accountBalance: string;
  accountEquity: string;
  accountPriorBalance: string;
  accountPriorEquity: string;
  isBalanceDown: boolean;
  isEquityDown: boolean;
  challengeRemaining: number;
  diffHours: number;
  profitProgressValue: number;
  dailyLossesProgressValue: number;
  maximumLossesProgressValue: number;
  maximumDrawdownPnlLevelProgressValue: number;
  activeTradingDaysProgressValue: number;
  rules: any[];
  numberOfTradesPlaced: number;
  profitFactor: string;
  projectedCycleProfitLabel: string;
  projectedAnualProfit: string;
  averageRrr: string;
  averageWinningTrade: string;
  averageLosingTrade: string;
  challengeRemainingFinish: string;
  serverTime: string;
  challangeEnd: boolean;
  makeDrawdownStatic: boolean;
  timeProgressValue: number;
  tradesWon: number;
  tradesLost: number;
  balance: {
    values: any[];
    dates: string[];
  };
  equity: {
    values: any[];
    dates: string[];
  };
  profitTargetHistory: any[];
  dailyLossesTargetHistory: any[];
  maxLossesTargetHistory: any[];
  mostTraded: {
    values: any[];
    symbols: string[];
  };
  tradeHistory: any[];
  startTradeDate: string;
  endTradeDate: string;
  isLive: boolean;
  profitSharePct: string;
  maxWithdrawal: string;
  maxProfitedWithdrawal: string;
  isWithdrawalAllowed: boolean;
}

export const useTradingAccountStore = defineStore('tradingAccount', {
  state: () => ({
    tradingAccounts: [] as TradingAccount[],
    currentAccount: null as TradingAccount | null | undefined,
    dashboardData: null as DashboardData | null | undefined,
  }),
  actions: {
    fetchList() {
      axios.get('/trading-accounts')
          .then(res => res.data)
          .then(data => {
            this.tradingAccounts = data

            this.autoSelectAccount()
          })
    },
    fetchShow(id: number) {
      axios.get('/trading-accounts/' + id)
          .then(res => res.data)
          .then(data => {
            this.dashboardData = data
          })
    },
    async getLink(id: number): Promise<string> {
      return new Promise((resolve, reject) => {
        axios.get('/trading-accounts/' + id + '/link')
            .then(res => res.data)
            .then(data => {
              if (data.traderoom_url) {
                resolve(data.traderoom_url)
              } else {
                reject("traderoom_url is empty")
              }
            }).catch(error => reject(error))
      })
    },
    setName(id: number, newName: string) {
      if (!newName.match(/^[a-zA-Z0-9\s]+$/)) {
        notify({
          title: "You can use letters, numbers, and spaces only",
          text: "No special symbols or punctuation allowed",
          type: "warning",
        }, 5000)

        return;
      }

      let oldName: string | null = null

      const account = this.tradingAccounts.find(a => a.id === id)
      if (account) {
        oldName = account.display_name
        account.display_name = newName
      }

      axios.patch('/trading-accounts/' + id, {
        display_name: newName,
      }).then(() => {
        notify({
          title: "Trading account name has been updated",
          type: "success",
        }, 2500)
      }).catch((error) => {
        if (account) {
          account.display_name = oldName
        }

        throw error
      })
    },
    autoSelectAccount() {
      const selectedAccountId = localStorage.getItem('currentTradingAccountId')
      if (selectedAccountId) {
        this.selectAccount(+selectedAccountId)
      } else {
        this.selectAccount(this.tradingAccounts[0].id)
      }
    },
    setList(accounts: TradingAccount[]) {
      this.tradingAccounts = accounts

      this.autoSelectAccount()
    },
    selectAccount(id: number) {
      this.currentAccount = this.tradingAccounts.find(a => a.id === id)

      if (this.currentAccount) {
        localStorage.setItem('currentTradingAccountId', id.toString())
      }
    }
  }
})
