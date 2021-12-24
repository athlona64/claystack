const ethers = require('ethers');
const mnemonic = "your_mnemonic";

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/apikeyfromalchemyapi");

let contractAddr = "0xf1869edab2c3ab3461f2a2bc521a016c75e90553";

main();
async function main() {
    let aloop = 107;
    let bloop = aloop+5;
    let invite = 25;
    for(let k=invite;k<67;k++){
        console.log(`k loop is ${k}`);
        let path = "m/44'/60'/0'/0/"+invite;
        const wallet1 = ethers.Wallet.fromMnemonic(mnemonic, path);
        const signer1 = wallet1.connect(provider);    
        for(let i=aloop;i<bloop;i++) {
            let path = "m/44'/60'/0'/0/"+i;
            const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
            const signer = wallet.connect(provider);
            console.log(wallet.address);
            console.log('address ' + i);
            // console.log("0x65b8e5240000000000000000000000000"+wallet.address.split("0x")[1]);
            const tx = await signer1.sendTransaction({
                to: contractAddr,
                value: 0,
                data: "0x65b8e524000000000000000000000000"+wallet.address.split("0x")[1],
                gasPrice: "0xD09DC300",
                gasLimit: 500000
            });  
            console.log(tx.hash);
        }
        aloop = bloop;
        bloop = aloop + 5;
    }

}
//0x1799A58230D8bC48C51B494e639FC3DCC0F17978
