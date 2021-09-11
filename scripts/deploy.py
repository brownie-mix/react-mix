from brownie import SolidityStorage, VyperStorage, accounts


def main():

    # add these accounts to metamask by importing private key
    owner = accounts[0]
    SolidityStorage.deploy({'from':accounts[0]})
    VyperStorage.deploy({'from':accounts[0]})

