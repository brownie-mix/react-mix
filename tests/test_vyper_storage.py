
def test_vyper_storage_deploy(vyper_storage):
    """
    Test if the contract is correctly deployed.
    """
    assert vyper_storage.get() == 10


def test_vyper_storage_set(accounts, vyper_storage):
    """
    Test if the storage variable can be changed.
    """
    vyper_storage.set(30, {'from': accounts[0]})
    assert vyper_storage.get() == 30
