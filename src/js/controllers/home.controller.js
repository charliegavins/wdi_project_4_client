angular
.module('tipJar')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$state', '$resource','$http','API'];
function HomeCtrl($state, $resource, $http, API) {

  const vm = this;

  vm.spotifySearch = () => {
    $http
      .get(`https://api.spotify.com/v1/search?q=${vm.spotifySearch.entry}&type=${vm.searchParams}`)
      .then(data => {
        const param = data.data[`${vm.searchParams}s`];
        vm.SearchResults = param.items;
      }, err => {
        console.error(err);
      });
  };

  vm.spotifySelection = (artist) => {
    vm.artist = artist;
    vm.artist.image = vm.artist.images[0].url;
  };

  vm.createTransaction = () => {
    const transaction = {
      recipient_url: vm.artist.href,
      recipient_name: vm.artist.name,
      recipient_img: vm.artist.image,
      payment_status: 'pending',
      amount: vm.transaction.amount,
      message: vm.transaction.message
    };

    return $http({
      method: 'POST',
      url: `${API}/transactions`,
      data: transaction
    })
    .then(function success(response){
      vm.pendingTransaction = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  };
}
