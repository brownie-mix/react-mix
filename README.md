# Brownie React Mix

This mix comes with everything you need to start using [React](https://reactjs.org/) with a Brownie project.
The react template is a very basic, minimum viable "functional component" style static-page that allows the user to 
execute two contract functions - a public view "getter" and a "setter" that updates the state of the blockchain.

## Installation

1. [Install Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html), if you haven't already. You must be using version `1.9.0` or newer.

2. Download the mix.

    ```bash
    brownie bake react-mix
    ```

3. Install the React client dependencies.

    ```bash
    cd ./client
    npm install 
    ```

4. If you want to be able to deploy to testnets, do the following.

    Set your WEB3_INFURA_PROJECT_ID, and PRIVATE_KEY environment variables.

    You can get a WEB3_INFURA_PROJECT_ID by getting a free trial of Infura. At the moment, it does need to be infura with brownie. If you get lost, follow the instructions at https://ethereumico.io/knowledge-base/infura-api-key-guide/. You can find your PRIVATE_KEY from your ethereum wallet like metamask.

    You'll also need testnet ETH. You can get ETH into your wallet by using the faucet for the appropriate
    testnet. For Kovan, a faucet is available at https://linkfaucet.protofire.io/kovan.

    You can add your environment variables to a .env file. You can use the .env_example in this repo 
    as a template, just fill in the values and rename it to '.env'. 

    Here is what your .env should look like:

    ```bash
    export WEB3_INFURA_PROJECT_ID=<PROJECT_ID>
    export PRIVATE_KEY=<PRIVATE_KEY>
    ```
   
5. Create brownie account(s) following instructions here:
       https://eth-brownie.readthedocs.io/en/stable/account-management.html

6. Import the brownie account to MetaMask using their private key(s)



## Usage

1. Open the Brownie console. Starting the console without a --network flag launches a fresh [Ganache](https://www.trufflesuite.com/ganache) instance in the background.

    ```bash
    $ brownie console
    Brownie v1.9.0 - Python development framework for Ethereum

    ReactMixProject is the active project.
    Launching 'ganache-cli'...
    Brownie environment is ready.
    ```

    Alternatively, to run on a testnet, set the network flag to e.g. kovan

    ```bash
    $ brownie console --network kovan
    Brownie v1.14.6 - Python development framework for Ethereum

    ReactMixProject is the active project.
    Brownie environment is ready.
    ```

2. Run the [deployment script](scripts/deploy.py) to deploy the project's smart contracts.

    ```python
    >>> run("deploy")
    Running 'scripts.deploy.main'...
    Transaction sent: 0xd1000d04fe99a07db864bcd1095ddf5cb279b43be8e159f94dbff9d4e4809c70
    Gas price: 0.0 gwei   Gas limit: 6721975
    SolidityStorage.constructor confirmed - Block: 1   Gas used: 110641 (1.65%)
    SolidityStorage deployed at: 0xF104A50668c3b1026E8f9B0d9D404faF8E42e642

    Transaction sent: 0xee112392522ed24ac6ab8cc8ba09bfe51c5d699d9d1b39294ba87e5d2a56212c
    Gas price: 0.0 gwei   Gas limit: 6721975
    VyperStorage.constructor confirmed - Block: 2   Gas used: 134750 (2.00%)
    VyperStorage deployed at: 0xB8485421abC325D172652123dBd71D58b8117070
    ```

3. While Brownie is still running, start the React app in a different terminal.

    The first time this app is used, the node modules have to be installed in /src.
    To do this, navigate to ./client/src and run

    ```bash
    # make sure to use a different terminal, not the brownie console
    npm install
    npm audit fix
    ```
    if all dependencies are installed start the app using

    ```bash
    npm run start
    ```

4. Connect Metamask to the local Ganache network or testnet. To do this open MetaMask then in the upper right corner, click the network dropdown menu. Select `Localhost 8545`, or `Kovan test network`:



5. Interact with the smart contracts using the web interface or via the Brownie console.

<img src="./assets/screen1.jpg" width=1500>

To connect Metamask to the app, click "connect wallet". To view simple diagnostics open the browser inspector - the account, network, chainID etc
are printed to the console there.

Grab the value currently stored in the contract by clicking "get value from contract". 

Setting a new value updates the state of the blockchain and therefore costs gas. Type a new value in the box and click "Set New Value". Metamask will pop up and ask you to confirm the transaction. You will only be able to execute this function if you have sufficient ETH to cover the gas.

<img src="./assets/screen2.jpg" width=1500>

Now click "get value from contract" again to retrieve the updated value.

## Ending a Session

When you close the Brownie console, the Ganache instance also terminates and the deployment artifacts are deleted.

To retain your deployment artifacts (and their functionality) you can launch Ganache yourself prior to launching Brownie. Brownie automatically attaches to the ganache instance where you can deploy the contracts. After closing Brownie, the chain and deployment artifacts will persist.



## Resources

This mix provides a bare-bones implementation of [Create React App](https://create-react-app.dev/), configured to work with Brownie.

To get started with React and building a front-end for your dApps:

* [Rimble](https://rimble.consensys.design/) is an open-source library of React components and guides to help you make dApps. Along with components they provide guides and tutorials to help you get started.
* For more in-depth information, read the [Create React App documentation](https://create-react-app.dev/docs/getting-started)


To get started with Brownie:

* Check out the other [Brownie mixes](https://github.com/brownie-mix/) that can be used as a starting point for your own contracts. They also provide example code to help you get started.
* ["Getting Started with Brownie"](https://medium.com/@iamdefinitelyahuman/getting-started-with-brownie-part-1-9b2181f4cb99) is a good tutorial to help you familiarize yourself with Brownie
* For more in-depth information, read the [Brownie documentation](https://eth-brownie.readthedocs.io/en/stable/)


Any questions? Join our [Gitter](https://gitter.im/eth-brownie/community) channel to chat and share with others in the community.
