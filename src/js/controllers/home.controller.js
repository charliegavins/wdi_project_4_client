angular
.module('tipJar')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [
  '$state',
  '$resource',
  '$http',
  'API',
  'ActionCableChannel',
  'ActionCableSocketWrangler',
  '$window'
];

function HomeCtrl(
  $state,
  $resource,
  $http,
  API,
  ActionCableChannel,
  ActionCableSocketWrangler,
  $window
) {
  const vm = this;
  vm.currencyParams = 'GBP';
  vm.step3 = false;

  vm.getStarted = () => {
    vm.begin = true;
  };

  vm.selfTip = () => {
    vm.transaction = {};
    // vm.wholeAppMute = true;
    console.log('clicky working');
    vm.pendingTransaction = false;
    vm.complete = false;
    vm.artist = {};
    vm.artist.name = 'Charlie Gavins';
    vm.artist.image = 'https://s2.postimg.org/z13tlm83d/imgforbitip.png';
  };

  vm.reload = () => {
    $window.location.reload();
  };

//the below ensures that the server has a fresh token with which to access the search endpoint of the spotify api. At the moment it loads whenever someone loads the browser - assuming very low traffic and dynamo hosting. Will need to uncomment this
  vm.spotifyTokenLoad= () => {
    $http
      .get(`http://localhost:3000/spotify_token`)
      .then(data => {
        console.log(data);
      });
  };
  vm.spotifyTokenLoad();

  vm.spotifySearch = () => {
    // console.log(vm.spotifySearch.entry);
    $http({
      method: 'GET',
      url: `${API}/spotify_search`,
      params: {search: vm.spotifySearch.entry}
      //need to encode the typed in string so can be sent over params
    })
      .then(data => {
        console.log(data);
        const param = data.data.response.body[`artists`];
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
      email: vm.transaction.email,
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
