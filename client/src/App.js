import React, {Component} from "react"
import './App.css'
import {ethers} from 'ethers'
import map from "./artifacts/deployments/map.json"
import {getEthereum} from "./getEthereum"

class App extends Component {

    state = {
        provider: null,
        signer: null,
        isAccountsUnlocked: null,
        chainid: null,
        vyperStorage: null,
        vyperValue: 0,
        vyperInput: 0,
        solidityStorage: null,
        solidityValue: 0,
        solidityInput: 0,
    }

    componentDidMount = async () => {
        // Get provider
        const ethereum = await getEthereum()
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        let isAccountsUnlocked = true
        try {
            await signer.getAddress()
        } catch (e) {
            isAccountsUnlocked = false
        }


        // Get chainid
        const chainid = (await provider.getNetwork()).chainId

        // Try and enable accounts (connect metamask)
        try {
            ethereum.enable()
        } catch (e) {
            console.log(`Could not enable accounts. Interaction with contracts not available.
            Use a modern browser with a Web3 plugin to fix this issue.`)
            console.log(e)
        }

        this.setState({
            provider,
            chainid,
            signer: signer,
            isAccountsUnlocked
        }, await this.loadInitialContracts)

    }

    loadInitialContracts = async () => {
        if (this.state.chainid <= 42) {
            // Wrong Network!
            return
        }

        const vyperStorage = await this.loadContract("dev", "VyperStorage")
        const solidityStorage = await this.loadContract("dev", "SolidityStorage")

        if (!vyperStorage || !solidityStorage) {
            return
        }

        const vyperValue = parseInt(await vyperStorage.get())
        const solidityValue = parseInt(await solidityStorage.get())

        this.setState({
            vyperStorage,
            vyperValue,
            solidityStorage,
            solidityValue,
        })
    }

    loadContract = async (chain, contractName) => {
        // Load a deployed contract instance into a web3 contract object
        const {provider, isAccountsUnlocked, signer} = this.state

        // Get the address of the most recent deployment from the deployment map
        let address
        try {
            address = map[chain][contractName][0]
        } catch (e) {
            console.log(`Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`)
            return undefined
        }

        // Load the artifact with the specified address
        let contractArtifact
        try {
            contractArtifact = await import(`./artifacts/deployments/${chain}/${address}.json`)
        } catch (e) {
            console.log(`Failed to load contract artifact "./artifacts/deployments/${chain}/${address}.json"`)
            return undefined
        }

        let contract = new ethers.Contract(address, contractArtifact.abi, provider)
        if (isAccountsUnlocked) {
            contract = contract.connect(signer)
        }
        return contract

    }

    changeVyper = async (e) => {
        const {vyperStorage, vyperInput} = this.state
        e.preventDefault()
        const value = parseInt(vyperInput)
        if (isNaN(value)) {
            alert("invalid value")
            return
        }
        const tx = await vyperStorage.set(value)
        await tx.wait()
        this.setState({
            vyperValue: parseInt(await vyperStorage.get())
        })
    }

    changeSolidity = async (e) => {
        const {solidityStorage, solidityInput} = this.state
        e.preventDefault()
        const value = parseInt(solidityInput)
        if (isNaN(value)) {
            alert("invalid value")
            return
        }
        const tx = await solidityStorage.set(value)
        await tx.wait()
        this.setState({
            solidityValue: parseInt(await solidityStorage.get())
        })
    }

    render() {
        const {
            provider, isAccountsUnlocked, chainid,
            vyperStorage, vyperValue, vyperInput,
            solidityStorage, solidityValue, solidityInput
        } = this.state

        if (!provider) {
            return <div>Loading Web3, accounts, and contracts...</div>
        }

        if (isNaN(chainid) || chainid <= 42) {
            return <div>Wrong Network! Switch to your local RPC "Localhost: 8545" in your Web3
                provider (e.g. Metamask)</div>
        }

        if (!vyperStorage || !solidityStorage) {
            return <div>Could not find a deployed contract. Check console for details.</div>
        }

        return (
            <div className="App">
                <h1>Your Brownie Mix is installed and ready.</h1>
                <p>
                    If your contracts compiled and deployed successfully, you can see the current
                    storage values below.
                </p>
                {
                    !isAccountsUnlocked ?
                        <p><strong>Connect with Metamask and refresh the page to
                            be able to edit the storage fields.</strong>
                        </p>
                        : null
                }
                <h2>Vyper Storage Contract</h2>

                <div>The stored value is: {vyperValue}</div>
                <br/>
                <form onSubmit={(e) => this.changeVyper(e)}>
                    <div>
                        <label>Change the value to: </label>
                        <br/>
                        <input
                            name="vyperInput"
                            type="text"
                            value={vyperInput}
                            onChange={(e) => this.setState({vyperInput: e.target.value})}
                        />
                        <br/>
                        <button type="submit" disabled={!isAccountsUnlocked}>Submit</button>
                    </div>
                </form>

                <h2>Solidity Storage Contract</h2>
                <div>The stored value is: {solidityValue}</div>
                <br/>
                <form onSubmit={(e) => this.changeSolidity(e)}>
                    <div>
                        <label>Change the value to: </label>
                        <br/>
                        <input
                            name="solidityInput"
                            type="text"
                            value={solidityInput}
                            onChange={(e) => this.setState({solidityInput: e.target.value})}
                        />
                        <br/>
                        <button type="submit" disabled={!isAccountsUnlocked}>Submit</button>

                    </div>
                </form>
            </div>
        )
    }
}

export default App
