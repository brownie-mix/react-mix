import React, {useState} from 'react';
import "./App.css";
import Web3 from 'web3'
import background from "./logo.svg";
import SolidityStorage from './artifacts/contracts/SolidityStorage.json';
import map from "./artifacts/deployments/map.json"


// uses functional component syntax
function App(){

  // web3 is whatever is injected by metamask, else localhost
  // add deployed address for Solidity Storage contract
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
  // define vars and functions to update them, associated to react state
  
  const [account, setOwnerAccount] = useState()
  const [currentSolidityValue, getSolidityValue] = useState()
  const [newSolidityValue, setNewSolidityValue] = useState()
  const [chainID, setChainID] = useState()
  const [network, setNetwork] = useState()
  const [contractAddress, setContractAddress] = useState()
  const [contract, setContract] = useState()
  var connected = false;

  async function loadBlockChain(){
    
    const chain = await web3.eth.getChainId()
    const net = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    const acc = accounts[0]

    setNetwork(net)
    setChainID(chain)
    setOwnerAccount(acc)

    console.log(chain)
    var address = ''

    if (chain =='1337'){
      address = map["dev"]['SolidityStorage'][0]
    }
    else if(chain == '42'){
      address = map[42]['SolidityStorage'][0]
    }
    else if(chain=='3'){
      address = map[3]['SolidityStorage'][0]
    }
    else if(chain=='4'){
       address = map[4]['SolidityStorage'][0]
    }
    else{
      throw 'Please connect to a valid testnet'
    }

    setContractAddress(address)
    const _contract = new web3.eth.Contract(SolidityStorage.abi, address, account)

    setContract(_contract)
    console.log(address)
    console.log(_contract)
    console.log(chain)
    console.log("contract successfully loaded")
  }

   function checkVals(){
     console.log(chainID)
     console.log(contractAddress)
     console.log(contract)
   }

  // two async functions that interact with the deployed contract:
  // GETTER
  async function getValue(){

    let SolidityValue = await contract.methods.get().call()
    getSolidityValue(SolidityValue)
  }


  //SETTER
  async function setValue(){
    // instantiate contract

    // async call to contract's set() function
    await contract.methods.set(newSolidityValue).send({from: account})//.then(console.log("successfully set value"))

  }


// Now define how to render in the browser
return (
  
  <div 
  className="App" 
  style={{ backgroundImage: 'url(' + background + ')',
  backgroundPosition: '',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh',
  }}>
  
  <h1>BROWNIE-REACT-MIX </h1>
  <h2>React front-end template</h2>

  <br></br>
  
  {<button onClick={loadBlockChain} > Connect Wallet</button>}
  <br></br>
  <br></br>
  <br></br>
  {<button onClick={getValue}>Get Value From Contract</button>}
  <br></br>
  <br></br>

  <input 
      type="text"
      placeholder="Enter new value here"
      onChange={e => setNewSolidityValue(e.target.value)} />


  {<button onClick={setValue}>Set New Value </button>}

  <p>The stored value is: </p>
  {currentSolidityValue}



  <br></br>
  <br></br>

  </div>

);
}


export default App