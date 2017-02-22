angular
  .module('tipJar')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$state', '$resource','$http','TipRecipient'];
function HomeCtrl($state, $resource, $http, TipRecipient) {

  const vm = this;
  vm.searchParams = ''

vm.spotifyAlbum = () => {
  vm.searchParams = 'album';
}
vm.spotifyArtist = () => {
  vm.searchParams = 'artist';
}
vm.spotifyTrack = () => {
  vm.searchParams = 'track';
}

vm.spotifySelection = function(id){
  vm.spotiId = id;
  TipRecipient.setRecipient(id);
    $state.go('transactionsCreate');
}

  vm.spotifySearch = () => {
    console.log(vm.spotifySearch.entry);
    console.log(vm.searchParams);
    $http.get(`https://api.spotify.com/v1/search?q=${vm.spotifySearch.entry}&type=${vm.searchParams}`).then((data, err) => {
      let param = data.data[`${vm.searchParams}s`];
      vm.SearchResults = param.items;
    });
  };
vm.spotifySearch

}
