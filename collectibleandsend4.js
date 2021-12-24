const ethers = require('ethers');
const mnemonic = "your_mnemonic";

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/apikeyfromalchemyapi");

let abi = require("./abi.json");
let mainAddr = "your_address_eth_holding";

let ontr = "0xe9c754207f2fb01debf8a1b3aa9f45c4aeb79637";
let urni = "0xC2c2fc434F2ab8D7eae92374dBc2F8E6cCf10EAb";
let nica = "0x786d9a54a0437c2d3bdb44ee6cf57dfff6484131";
let saim = "0x3E3A5efDc4AbA0D92D0A2F52d107E2D45DB6670a";
let oneg = "0x1167788F415A162e6016936F458FD92C32823630";
let erie = "0xfC4B76B567A9a17Cefd1D960C3478b16d9623f2a";
let albert = "0x4fe9670ed85ac6beadc0ce1dec131f1e86e717c0";
let balk = "0x85f0ca0045a96abde82363f9ba8426061fefd84c";
let MLWI = "0x41a1b53df60920cb4ca6beb6c1acc8d914f47067";
let MANI = "0xcc17c2da3dc8e480bd070740981d0b561fa39103";
let MERU = "0x3557042e5f74b85e6b807192a37e773f9d4be082";
let PEIP = "0xfd769a11a1ab3bdfd6fad3c9e20ba2ce322f8ae1";
let TANA = "0x335e2d611384193af84bfe949971eafcea5a7de1";
let TURK = "0xdd0895b6c6e50a2bf0625f1e2cd36cfabbd52a93";
let MELV = "0xf66bA729ce62F97DaD71BfFAe842925Ba629F741";
let TYMR = "0x013aadf384f67869af3de4e18d788d3ff3126238";
let VSTK = "0xe43cFea1F09b863D8061F792dc50e904903696cF";
let BAIK = "0x0617A90edF7F8412133C839cbDe409aAC589280C";

let contractList = [ontr, urni, nica, saim, oneg, erie, albert, balk, MLWI, MANI, MERU, PEIP, TANA, TURK, MELV, TYMR, VSTK, BAIK];


main();
async function main() {
    for(let i=0;i<101;i++) {
        let path = "m/44'/60'/0'/0/"+i;
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
        const signer = wallet.connect(provider);
        console.log(i);
        let balance1 = getBalance(ontr, wallet.address);
        let balance2 = getBalance(urni, wallet.address);
        let balance3 = getBalance(nica, wallet.address);
        let balance4 = getBalance(saim, wallet.address);
        let balance5 = getBalance(oneg, wallet.address);
        let balance6 = getBalance(erie, wallet.address);
        let balance7 = getBalance(albert, wallet.address);
        let balance8 = getBalance(balk, wallet.address);
        let balance9 = getBalance(MLWI, wallet.address);
        let balance10 = getBalance(MANI, wallet.address);
        let balance11 = getBalance(MERU, wallet.address);
        let balance12 = getBalance(PEIP, wallet.address);
        let balance13 = getBalance(TANA, wallet.address);
        let balance14 = getBalance(TURK, wallet.address);
        let balance15 = getBalance(MELV, wallet.address);
        let balance16 = getBalance(TYMR, wallet.address);
        let balance17 = getBalance(VSTK, wallet.address);
        let balance18 = getBalance(BAIK, wallet.address);

        // let balance5 = getBalance(erie, wallet.address);
        await Promise.all([
            balance1, balance2, balance3
            , balance4, balance5, balance6
            , balance7, balance8, balance9
            , balance10, balance11
            , balance12, balance13
            , balance14, balance15
            , balance16, balance17, balance18
        ]).then(async (values) => {
            
            let nonce = await provider.getTransactionCount(wallet.address);
            for(let k=0;k<18;k++){
                if(values[k]>0) {
                    const hash = await send(signer, contractList[k], nonce, values[k]);
                    nonce += 1;
                    console.log(hash);
                }
            }


        });
        console.log(wallet.address);

    }
}
async function send(signer, contractAddr, nonce, value) {
    return new Promise(async (resolve, reject) =>{
        const contract = new ethers.Contract(contractAddr, abi, signer);
        const tx = await contract.transfer(mainAddr, value, {nonce: nonce});
        resolve(tx.hash);
    })
}
async function getBalance(contractAddr, address) {
    return new Promise(async (resolve, reject) =>{
        const contract = new ethers.Contract(contractAddr, abi, provider);
        const balanceOf = await contract.balanceOf(address);
        resolve(balanceOf);
    });
}
