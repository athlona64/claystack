const ethers = require('ethers');
const mnemonic = "your_mnemonic";

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/OePDKEAtMy2lr5W5J8aBCML6qYmeCaFX");

let contractAddr = "0x7b067b776dec24cf0c2390e76dea20217e75d9f7";

main();
async function main() {
    for(let i=0;i<101;i++) {
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
            data: "0xaaac9718",
            gasPrice: "0xD09DC300",
            gasLimit: 500000
        });  
        console.log(tx.hash);
    }
}
