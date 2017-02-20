angular
.module('tipJar')
.controller('TransactionsCreateCtrl', TransactionsCreateCtrl);

TransactionsCreateCtrl.$inject = ['TipRecipient'];

function TransactionsCreateCtrl(TipRecipient){
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
    console.log(vm.transaction);
  }

  function transactionCreate(){
    return $http({
      method: 'POST',
      url: 'http://localhost:4000/transactions',
      data: vm.transaction
    })
    .$promise
    .then((response) => {
      console.log(response);
  });
  };
}
