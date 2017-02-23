angular
.module('tipJar')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [
  '$state',
  '$resource',
  '$http',
  'API',
  'ActionCableChannel',
  'ActionCableSocketWrangler'
];

function HomeCtrl(
  $state,
  $resource,
  $http,
  API,
  ActionCableChannel,
  ActionCableSocketWrangler
) {
  const vm = this;
  vm.currencyParams = 'GBP';
  vm.step3 = false;

  vm.getStarted = () => {
    vm.begin = true;
  };

  vm.spotifySearch = () => {
    $http
      .get(`https://api.spotify.com/v1/search?q=${vm.spotifySearch.entry}&type=artist`)
      .then(data => {
        const param = data.data[`artists`];
        vm.SearchResults = param.items;
        console.log(param);
      }, err => {
        console.error(err);
      });
  };

  vm.spotifySelection = (artist) => {
    console.log(vm.pendingTransaction);
    vm.artist = artist;
    console.log(vm.artist);
    vm.artist.image = vm.artist.images[0].url;
  };

  vm.getBTCrates = () => {
    $http
    .get(`${API}/exchange`)
        .then(data => {
          vm.btcToGbp = data.data.response.body.GBP['15m'];
          vm.btcToUsd = data.data.response.body.USD['15m'];
          vm.btcToEur = data.data.response.body.EUR['15m'];
          vm.btcGbpXrate = (1/vm.btcToGbp);
          console.log(vm.btcGbpXrate);
          vm.btcUsdXrate = (1/vm.btcToUsd);
          vm.btcEurXrate = (1/vm.btcToEur);
        }, err => {
          console.error(err);
        });
  };
  vm.getBTCrates();



  vm.createTransaction = () => {
    if (vm.currencyParams === 'GBP'){
      console.log('here');
      vm.btcAmount = ((vm.btcGbpXrate)*(vm.transaction.amount)*100000000);
    } else if (vm.currencyParams === 'USD'){
      console.log('here');
      vm.btcAmount = (vm.btcUsdXrate)*(vm.transaction.amount)*100000000;
    } else if (vm.currencyParams === 'EUR'){
      console.log('here');
      vm.btcAmount = (vm.btcEurXrate)*(vm.transaction.amount)*100000000;
    }
    const transaction = {
      recipient_url: vm.artist.href,
      recipient_name: vm.artist.name,
      recipient_img: vm.artist.image,
      payment_status: 'pending',
      amount: vm.btcAmount,
      message: vm.transaction.message
    };

    return $http({
      method: 'POST',
      url: `${API}/transactions`,
      data: transaction
    })
    .then(function success(response){
      vm.pendingTransaction = response.data;

      // Connect to ActionCable - DRY UP LATER
      const consumer = new ActionCableChannel('TransactionsChannel', {
        id: vm.pendingTransaction.id
      });

      vm.status = ActionCableSocketWrangler;

      vm.checkConnection = () => {
        consumer.send('generic');
        consumer.send('Hello', 'pending_transaction_started');
      };

      function callback(message){
        console.log('RECEIVED', message);
        if (message.payment_status && message.payment_status === 'complete') {
          console.log('payment complete');
          vm.complete = true;
        }
      }

      consumer
      .subscribe(callback)
      .then(function(){
        // $scope.$on("$destroy", function(){
        //   consumer.unsubscribe().then(function(){
        //     $scope.sendToMyChannel = undefined;
        //   });
        // });
      });

    }, function errorCallback(response) {
      console.log(response);
    });
  };

}
