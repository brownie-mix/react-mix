import React, {useState} from 'react';
import "./App.css";
import Web3 from 'web3'
import background from "./logo.svg";
import SolidityStorage from './artifacts/contracts/SolidityStorage.json';
import VyperStorage from './artifacts/contracts/VyperStorage.json';
import map from "./artifacts/deployments/map.json"


// uses functional component syntax
function App(){

  // web3 is whatever is injected by metamask, else localhost
  // add deployed address for Solidity Storage contract
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

  // State variables (using state hook syntax)
  const [account, setAccount] = useState()
  const [SolidityValue, setSolidityValue] = useState()
  const [VyperValue, setVyperValue] = useState()
  const [SolidityValueUpdated, UpdateSolidityValue] = useState()
  const [VyperValueUpdated, UpdateVyperValue] = useState()
  const [SolidityContract, setSolidityContract] = useState()
  const [VyperContract, setVyperContract] = useState()
  const [connected, connect] = useState()


  // function to load blockchain data including
  // getting account, loading contracts etc
  async function loadBlockChain(){
    
    const chainID = await web3.eth.getChainId()
    const accounts = await web3.eth.getAccounts()
    const _account = accounts[0]
    setAccount(_account)

    // declare vars for the contract addresses
    var SolidityAddress = ''
    var VyperAddress =''

    // load contract from different path depending on
    // which network we are connected to
    if (chainID =='1337'){
      SolidityAddress = map["dev"]['SolidityStorage'][0]
      VyperAddress = map["dev"]['VyperStorage'][0]
    }
    else if(chainID == '42'){
      SolidityAddress = map[42]['SolidityStorage'][0]
      VyperAddress = map["dev"]['VyperStorage'][0]
    }
    else if(chainID =='3'){
      SolidityAddress = map[3]['SolidityStorage'][0]
      VyperAddress = map["dev"]['VyperStorage'][0]
    }
    else if(chainID =='4'){
      SolidityAddress = map[4]['SolidityStorage'][0]
      VyperAddress = map["dev"]['VyperStorage'][0]
    }
    else{
      throw(console.error('Please connect to a valid testnet'))
    }

    // then create a contract obj from contract address, 
    // then update state with the contract obj
    const _SolidityContract = new web3.eth.Contract(SolidityStorage.abi, SolidityAddress, account)
    setSolidityContract(_SolidityContract)

    // repeat for the Vyper contract
    const _VyperContract = new web3.eth.Contract(VyperStorage.abi, VyperAddress, account)
    setVyperContract(_VyperContract)

    // set "connected" state var to true
    // this allows us to show connection status in browser
    connect(true)

    //some helful console.log statements
    // open the inspector in the browser to see these
    console.log("Solidity contract address: ", SolidityAddress)
    console.log("Vyper contract address: ", VyperAddress)
    console.log(SolidityContract)
    console.log(chainID)
    console.log("contract successfully loaded")

  }

  // SOLIDITY GETTER
  async function getSolidityValueFromContract(){
    let _SolidityValue = await SolidityContract.methods.get().call()
    setSolidityValue(_SolidityValue)
  }

    // VYPER GETTER
    async function getVyperValueFromContract(){
      let _VyperValue = await VyperContract.methods.get().call()
      setVyperValue(_VyperValue)
    }

  // SOLIDITY SETTER
  async function setSolidityValueInContract(){
    // async call to contract's set() function
    await SolidityContract.methods.set(SolidityValueUpdated).send({from: account})
  }

  // VYPER SETTER
  async function setVyperValueInContract(){
    // async call to contract's set() function
    await VyperContract.methods.set(VyperValueUpdated).send({from: account})
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
  <li style={{ color: connected ? 'green' : 'white' }}>
      {<p>wallet connected</p>}
    </li>
  <br></br>
  {<button onClick={getSolidityValueFromContract}>Get Value From Solidity Contract</button>}
  <br></br>
  <br></br>
  {<button onClick={getVyperValueFromContract}>Get Value From Vyper Contract</button>}
  <br></br>
  <br></br>
  <input 
      type="text"
      placeholder="Enter new Solidity value here"
      onChange={e => UpdateSolidityValue(e.target.value)} />

  {<button onClick={setSolidityValueInContract}>Set New Solidity Value </button>}

  <br></br>
  <br></br>
  
  <input 
      type="text"
      placeholder="Enter new Vyper value here"
      onChange={e => UpdateVyperValue(e.target.value)} />

  {<button onClick={setVyperValueInContract}>Set New Vyper Value </button>}  
  
  <p>The stored value in the Solidity contract: </p>
    {SolidityValue}
  
  <br></br>
  <br></br>
  
  <p>The stored value in the Vyper contract: </p>
  {VyperValue}

  <br></br>
  <br></br>

  </div>

);
}

export default App