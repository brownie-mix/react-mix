from brownie import SolidityStorage, VyperStorage, accounts


def main():
    accounts[0].deploy(SolidityStorage)
    accounts[0].deploy(VyperStorage)
