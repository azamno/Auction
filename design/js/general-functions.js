import contractJson from '../../build/contracts/Auction.json' assert { type: "json" };


export let myContract;
export let contractAddress = "";
export let contractABI = [];


export let web3 = new Web3(window.ethereum);

// ================== Install Metamask ================

export const installedMetamask = () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log("Metamask is installed!");
        return true;
    } else {
        console.log("Metamask is not installed!");
        return false;
    }
}

// ================== Get Account ========================

export const getAccount = async () => {

    const accounts = await ethereum.request({
        method: "eth_requestAccounts"
    });
    const account = await accounts[0];
    const checksumAddress = await web3.utils.toChecksumAddress(account);
    console.log(checksumAddress);
    return checksumAddress;
}



// ================== Show account user ================

export const showAddressAccount =()=>{
    let btn_wallet = document.querySelector('#connect-wallet');
    let span_wallet = document.querySelector('#connect-wallet span');
    
    btn_wallet.addEventListener('click', async () => {
        console.log("test...")
        const currentAddress = await shortenString(await getAccount(), 10, 4);
        localStorage.setItem("currentAddress", currentAddress);
        span_wallet.innerHTML = currentAddress;
        localStorage.setItem("isConnected", "true");
    })
    
    if (localStorage.getItem("currentAddress") !== null) {
        span_wallet.innerHTML = localStorage.getItem("currentAddress");
    }
    
    ethereum.on('accountsChanged', async () => {
        const currentAddress = await shortenString(await getAccount(), 10, 4);
        localStorage.setItem("currentAddress", currentAddress);
        span_wallet.innerHTML = currentAddress;
    });
}

// ================== Clear Local Storage ================

export const clearLocalStorage =()=>{
    localStorage.clear();
}

// clearLocalStorage();

// ================== Put ... in Address ================

export const shortenString = (str, startChars, endChars) => {
    if (str.length <= (startChars + endChars)) {
        return str;
    }
    var start = str.substr(0, startChars);
    var end = str.substr(str.length - endChars);
    return start + "..." + end;
}


//********* Loading   *******************/

let body = document.querySelector('body');
let cover = document.createElement('div');
cover.setAttribute("id", 'containerCover');
body.appendChild(cover);

let spinner = document.createElement('div');
spinner.setAttribute("id", 'spinner');
cover.appendChild(spinner);


export const showLoading = () => {
    cover.setAttribute('class', 'wrapper');
    spinner.setAttribute('class', 'spinner-border text-primary');
    spinner.setAttribute('role', 'status');
    spinner.style.width = "7rem";
    spinner.style.height = "7rem";
}


export const hideLoading = () => {
    cover.classList.remove('wrapper');
    cover.setAttribute('class', 'none');
    spinner.classList.remove('spinner-border', 'text-primary');
}

// ================== Refresh Page ============================

export const refreshPage = () => {
    location.reload();
}

// ================== Config Ganache ================

const networkId = '5777';
contractABI = contractJson.abi;
contractAddress = contractJson.networks[networkId].address;

console.log("contractAddress", contractAddress);
myContract = new web3.eth.Contract(contractABI, contractAddress);

