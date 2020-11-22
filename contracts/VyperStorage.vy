# @version >=0.2.7 <0.3.0

stored_data: public(uint256)

@external
def __init__():
    self.stored_data = 10

@external
def set(_x: uint256):
    self.stored_data = _x

@external
@view
def get() -> uint256:
    return self.stored_data
