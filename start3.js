const ethers = require('ethers');
const mnemonic = "your_mnemonic";

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/apikeyfrom");

let contractAddr = "0x7b067b776deC24CF0c2390e76Dea20217e75D9F7";

main();
async function main() {
    for(let i=101;i<300;i++) {
        let path = "m/44'/60'/0'/0/"+i;
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
        const signer = wallet.connect(provider);
        // const contract = new ethers.Contract(contractAddr, abi, signer);
        // const tx = await contract.Start();
        console.log(i);
        console.log(wallet.address);
        const tx =  await signer.sendTransaction({
            to: contractAddr,
            value: 0,
            data: "0xbe9a6555",
            gasPrice: "0xD09DC300",
            gasLimit: 500000
        });  
        console.log(tx.hash);
    }
}
