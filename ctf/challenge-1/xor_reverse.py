key = 0xF3
with open('customerdata.csv.crypt', 'rb') as f_in, open('customerdata.csv', 'wb') as f_out:
    data = f_in.read()
    decrypted = bytearray()
    for byte in data:
        decrypted.append(byte ^ key) #reverse each byte
    f_out.write(decrypted)