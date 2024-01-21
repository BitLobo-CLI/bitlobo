const Binance = import('@binance/connector')
import '@binance/connector';
import input from '@inquirer/input';
import select, { Separator } from '@inquirer/select';
import {version, binance} from 'ccxt';

console.log("Welcome to BitLobo CLI. Here you can Buy or Sell CRYPTO COINS with your BINANCE API.")
const api_key = await input({ message: 'Enter your Api Key' });
const secret_key = await input({ message: 'Enter your Secret Key' });

const coin = await select({
  message: 'What coin do yo want trade?',
  choices: [
    {
      name: 'BTC',
      value: 'BTC/USDT',
      description: 'Do you want BITCOIN.',
    },
    {
      name: 'ETH',
      value: 'ETH/USDT',
      description: 'Do you want ETHEREUM.',
    },
    {
      name: 'BNB',
      value: 'BNB/USDT',
      description: 'Do you want BINANCE COIN.',
    },
    {
      name: 'LDO',
      value: 'LDO/USDT',
      description: 'Do you want LIDO DAO.',
    },
  ],
});

const buy_sell = await select({
    message: 'Perfect. Do you want to BUY or SELL.',
    choices: [
      {
        name: 'BUY',
        value: 'BUY',
        description: 'Do you want to BUY.',
      },
      {
        name: 'SELL',
        value: 'SELL',
        description: 'Do you want to SELL.',
      },
    ],
  });

const amount = await input({ message: 'Enter the amount. The exchange BTC/USDT.' });

const exchange = new binance ({
    apiKey: api_key,
    secret: secret_key,
})

const ticker = await exchange.fetchTicker(coin);

if (buy_sell == "BUY") {
    console.log (exchange, await exchange.createMarketBuyOrder (coin, amount))
} else if (buy_sell == "SELL") {
    console.log (exchange, await exchange.createMarketSellOrder (coin, amount))
}

console.log("Operacion realizada con exito.")