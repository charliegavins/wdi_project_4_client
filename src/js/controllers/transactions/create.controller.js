angular
.module('tipJar')
.controller('TransactionsCreateCtrl', TransactionsCreateCtrl);

TransactionsCreateCtrl.$inject = ['TipRecipient','API', '$http','CurrentTransaction', '$state'];

function TransactionsCreateCtrl(TipRecipient, API, $http, CurrentTransaction, $state){
  const vm = this;
  vm.create = formCreate;

  // Get recipient from service and send name and URL data
  const tipRecipient = TipRecipient.getRecipient();
  vm.recipientImage = tipRecipient.images[0].url;
  vm.recipientName = tipRecipient.name;
  vm.recipientUrl = tipRecipient.href;

  function formCreate(){
    vm.transaction.recipient_url = tipRecipient.href;
    vm.transaction.recipient_name = tipRecipient.name;
    vm.transaction.recipient_img = tipRecipient.images[0].url;
    vm.transaction.payment_status = 'pending';
    transactionCreate();

  }

  function transactionCreate(){
      return $http({
      method: 'POST',
      url: `${API}/transactions`,
      data: vm.transaction
    })
    .then(function success(data){
      CurrentTransaction.setTransaction(data);
      $state.go('transactionsComplete');
    }, function errorCallback(response) {
      console.log(response);
    });
  }
}
