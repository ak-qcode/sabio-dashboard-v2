import {defineStore} from 'pinia'
import axios from "axios";

export interface TradingAccount {
  login: bigint,
  sabioEmail: string,
  accountType: string,
  status: string,
  startingBalance: string,
  accountId: number,
  remainingDays: number,
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
    fetchShow(accountId: number | bigint) {
      axios.get('/trading-accounts/' + accountId)
          .then(res => res.data)
          .then(data => {
            this.dashboardData = data
          })
    },
    autoSelectAccount() {
      const selectedAccountId = localStorage.getItem('currentTradingAccountId')
      if (selectedAccountId) {
        this.selectAccount(+selectedAccountId)
      } else {
        this.selectAccount(this.tradingAccounts[0].accountId)
      }
    },
    setList(accounts: TradingAccount[]) {
      this.tradingAccounts = accounts

      this.autoSelectAccount()
    },
    selectAccount(accountId: number) {
      this.currentAccount = this.tradingAccounts.find(a => a.accountId === accountId)

      if (this.currentAccount) {
        localStorage.setItem('currentTradingAccountId', accountId.toString())
      }
    }
  }
})
