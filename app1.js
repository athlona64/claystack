const ethers = require('ethers');
const mnemonic = "";

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/apikeyfromalchemyapi");
let path1 = "m/44'/60'/0'/0/0";
const wallet1 = ethers.Wallet.fromMnemonic(mnemonic, path1);
const signer1 = wallet1.connect(provider);


main();

async function main() {
    let nonce = await provider.getTransactionCount(wallet1.address);

    for(var i=174;i<300;i++) {
        let path = "m/44'/60'/0'/0/"+i;
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
        const signer = wallet.connect(provider);
    
        const tx = await signer1.sendTransaction({
            to: wallet.address,
            value: ethers.utils.parseEther("0.03"),
            nonce: nonce
        });
        console.log(i);
        console.log(tx.hash);
        nonce += 1;
        console.log(wallet.address);
    }
}



