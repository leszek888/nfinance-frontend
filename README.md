## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)

# General info
nFinance is a personal accounting software inspired by commad line tool "ledger-cli"

## Technologies
Project is created using following technologies:
* JavaScript ES6
* HTML5
* CSS3
* Vue.js 3.1.2
* Vue-Router 4.0.10
* Vuex 4.0.2
* decimal.js 10.3.1

Testing is performed with following technologies:
* unit testing - jest
* e2e testing - cypress

## Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Usage
* [Introduction](#introduction)
* [Reports](#reports)
* [Transactions](#transactions)

### Introduction
nFinance is inspired by commad line tool ledger-cli, where book entries are simplified, and instead of using debits and credits, plus and minus sign is used to control direction of the money.

Example transaction:
```
2020-01-01 Payee's Name
Assets:Current:Cash     -50.00
Expenses:Groceries       50.00
```
In this example, Assets have decreased, and Expenses increased, since the money went from Assets to Expenses, this example is pretty intuitive.

Second example:
```
2020-01-01 Employer
Assets:Current:Bank     5000.00
Income:Salary           -5000.00
```
In this example we have received salary. Assets have increased, but the Income account decreased. It may seem not intuitive at first, why does Income "decrease", when we receive money, but the plus and minus signs are here to show the direction of the money.
Assets increased, but the money had to come from somewhere, and it comes from "Income:Salary" account, thats why Income account is negative.

### Reports
There are three basic reports available:
* Balance sheet - showing balances of all of the accounts, it always sums to 0
* Net worth - shows balances of assets and liabilities
* Cash flow - shows balances of income and expenses

### Transactions
Each transactions requires date, payee (who is paying us, or whom are we paying), and at least two entries, which balance out to 0.
Each entry has to contain account and amount, and each account has to start with one of the five basic accounts:
```
Assets
Liabilities
Equity
Expenses
Income
```
Sub accounts have to be separated with ':', and are created on the fly.
Example accounts:
```
Assets:Current:Bank
Assets:Current:Cash
Assets:Fixed:Home
Equity:Start capital
Liabilities:Credit Card
Expenses:Transportation:Car:Repairs
Income:Salary
```
