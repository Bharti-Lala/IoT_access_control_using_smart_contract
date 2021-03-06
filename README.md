# IoT_access_control_using_smart_contract

The project is an attempt towards solving the data privacy issue in Tnyernet of Things network. The proposed architecture uses the Medical IoT infrastructure as an example, where the IoT devices (for example smart wearables to monitor general physical health conditions) used by a single person are connected to the same IoT gateway device which is used to post the data collected by the these devices onto the cloud. These IoT devices are connected to the gateway by short range P2P links ( like bluetooth, zigbeee, z-wave etc).

With the objective of insuring data privacy in an Internet of Medical Things network, all the nodes in the IoMT network ( which comparise of IoT gateways used by each patient / person using smart wearables, the health care providers, the medical reseach groups, server machines where some application might be runing, storage devices) are connected in a decentralized distributed network which runs an ethereum blockchain. The privacy of data is insured by the deploying smart contract over the blockchain for access control. It is proposed that each node on the blockchain network might deploy their own smart contract whose functions define the the rules of their data sharing or access to their data.

For simplicity, a decentralized application has been built on a private etherum network setup using geth. A smart contract "access_control.sol" as an example written in solidity is  deployed on the blockchain by one of the node. The feature of access_control has been included in form of a token purchase mechanism. If an agent (any node other than the contract owner) wants an access to the data generated by that node, he must pay a certain amount of Ether (or Wei) and get a token with a certain validity. 

The front end API for interacting with the contract functions haev been written using node.js

# Tech Stack Use:
1) Geth Ethereum Client ( for setting up the private ethereum contract)
2) Solidity ( for writting the smart contract)
3) Node.js
4) Javascript
5) HTML

# Install all the deoendencies 
1) geth
2) node
3) npm
4) web3

setup a private ethereum network with proof of work or proof of authority cansensus protocol - https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8
Compile the above smart contract in remix, and obtain the WEB3DEPLOY from output copy it in deploy.js and depoy it from geth  command line with loadScript("deploy.js") command , a contract address will be obtained upon sucess deployment and mining of the contract. Replace the contract address initialized in server.js with this new address.
