const Auction = artifacts.require("Auction");

module.exports = function(deployer) {
  const parameter = "0xf278b301FB00CE4554842ECCEb6Eb57594Cc988a";
  deployer.deploy(Auction,parameter);
};

