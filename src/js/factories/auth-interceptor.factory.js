angular
  .module('tipJar')
  .factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['API', 'TokenService'];
function AuthInterceptor(API, TokenService){
  return {
    request(config){
      const token = TokenService.getToken();
      //if API is in the URL and we have a token then we attach the token to the headers as an authorization token and return config
      if (config.url.indexOf(API) === 0 && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      //the http provider sends this to the back end as part of how the package works
      return config;
    },
    response(res) {
            // console.log(res);
      //if the url has the api url and there is a token, then save the token to localstorage using the TokenService cont
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        TokenService.setToken(res.data.token);
      }
      return res;
    }
  };
}
