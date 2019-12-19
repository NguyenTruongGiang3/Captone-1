import sha3
from ecdsa import SigningKey, SECP256k1
import binascii
import os
from cryptos import mnemonic

# Initialize ETH address
def Initialize():
    keccak = sha3.keccak_256()
    private = SigningKey.generate(curve=SECP256k1)
    public = private.get_verifying_key().to_string()
    keccak.update(public)
    address = "0x{}".format(keccak.hexdigest()[24:])
    return private.to_string().hex(), binascii.hexlify(public).decode(), address

def seed():
    return mnemonic.entropy_to_words(os.urandom(16))