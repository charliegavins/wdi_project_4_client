angular
.module('tipJar')
.controller('TransactionsCompleteCtrl', TransactionsCompleteCtrl);

TransactionsCompleteCtrl.$inject = ['TipRecipient','API', '$http','CurrentTransaction', '$state'];

function TransactionsCompleteCtrl(TipRecipient, API, $http, CurrentTransaction, $state){
  const vm = this;
 vm.transactionData = CurrentTransaction.getTransaction();
  vm.walletAddress = vm.transactionData.data.wallet_address;
  vm.btcAmount = vm.transactionData.data.amount;
  vm.message = vm.transactionData.data.recipient;

  vm.qrImage = `https://chart.googleapis.com/chart?chs=300x300&chld=L|2&cht=qr&chl=bitcoin:${vm.walletAddress}?amount=${vm.btcAmount}%26label=tipjar.com%26message=${vm.message}`
}
