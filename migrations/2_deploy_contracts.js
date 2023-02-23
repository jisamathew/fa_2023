// var ConvertLib = artifacts.require("ConvertLib");
// var RiceCertificate = artifacts.require("RiceCertificate");
// var MyNFTokenContract = artifacts.require('./MyNFToken.sol');

// module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.link(ConvertLib, RiceCertificate);
//    deployer.deploy(MyNFTokenContract, 'GreenCoin', 'GCNFT').then(function () {
//     return deployer.deploy(RiceCertificate, MyNFTokenContract.address).then(function () {
//     });       
//   });

// };


  
var RiceCertificate = artifacts.require("./RiceCertificate.sol");
// var MyNFTokenContract = artifacts.require('./MyNFToken.sol');
var MyTokenContract = artifacts.require('./MyToken.sol');


module.exports = function(deployer) {
  deployer.deploy(RiceCertificate);
  deployer.deploy(MyTokenContract);

  //  deployer.deploy(MyNFTokenContract, 'GreenCoin', 'GCNFT');
};