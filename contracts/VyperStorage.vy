stored_data: public(uint256)

@public
def __init__():
    self.stored_data = 10

@public
def set(_x: uint256):
    self.stored_data = _x

@public
@constant
def get() -> uint256:
    return self.stored_data