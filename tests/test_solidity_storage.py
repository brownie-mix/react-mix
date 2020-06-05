
def test_solidity_storage_deploy(solidity_storage):
    """
    Test if the contract is correctly deployed.
    """
    assert solidity_storage.get() == 5


def test_solidity_storage_set(accounts, solidity_storage):
    """
    Test if the storage variable can be changed.
    """
    solidity_storage.set(20, {'from': accounts[0]})
    assert solidity_storage.get() == 20
