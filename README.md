# Brownie React Mix

This mix comes with everything you need to get Brownie and React (create-react-app) working.

## Installation

1. [Install Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html), if you haven't already.

2. Download the mix.

```bash
brownie bake react-mix
```

3. Download the client dependencies

```bash
cd client
yarn install
```

4. In your MetaMask (or different web3 provider), load the mnemonic (seed phrase):
```bash
hill law jazz limb penalty escape public dish stand bracket blue jar
```
These accounts will automatically be funded.

## Usage

1. Deploy the smart contracts using the brownie console. Starting the console will launch a fresh Ganache instance in the background.

```bash
brownie console
>>> run("deploy")
```

2. In a different terminal, start the React app.
```bash
## make sure to use a different terminal, not the brownie console
cd client
yarn start
```
3. Connect your metamask to the local ganache network

Select `Localhost 8545` from the network dropdown

or

```
New Custom RPC
http://localhost:8545 
```


4. Interact with the smart contract via the web interface or via the brownie console
```bash
## In the brownie console
>>> vyper_storage = VyperStorage[-1]  # get the newest vyper storage contract
>>> vyper_storage.set(1337)  # the default sender of the transaction is the contract creator
```
Any changes to the contracts from the console should show on the website after a refresh, and vice versa.

4. Ending a session

As soon as you close the brownie console, the ganache instance will shut down and the deployment artifacts will be deleted.

To retain your deployment artifacts (and their functionality), run a ganache instance outside of brownie. Brownie will then automatically attach to that ganache instance where you can deploy the contracts.

After closing the console, the chain and the deployment artifacts will persist.

## Further Possibilities
1. From a fresh terminal, run the brownie tests
```bash
brownie test
```

2. Deploying on live networks

Change the `scripts/deploy.py` script to [use funded accounts](https://eth-brownie.readthedocs.io/en/stable/account-management.html).

Then:
```bash
brownie console --network kovan
>>> run("deplpoy")
```

For contracts deployed on a live network (main net or any official test net), the deployment information will be stored permanently unless you:

* Delete or rename the contract file or
* Manually remove the `client/src/artifacts/` directory

 3. Explore smart contract development with Brownie
 
 * [Try out other mixes](https://github.com/brownie-mix/)
 * [Read the documentation](https://eth-brownie.readthedocs.io/en/stable/)
 * [Join our Gitter!](https://gitter.im/eth-brownie/community)