import { myContract,getAccount, showAddressAccount, showLoading, hideLoading, web3, refreshPage } from "./general-functions.js";




showAddressAccount();


// ================== Create Post ================

let create_post = document.getElementById('btn-create-post');
let seller_address = document.getElementById("seller-address");
if (create_post) {
    create_post.addEventListener('click', async (e) => {
        e.preventDefault(); // جلوگیری از رفرش صفحه
        if (localStorage.getItem("isConnected") !== "true") {
            let myModal = new bootstrap.Modal(document.getElementById('Connect-metamask'));
            myModal.show();
        }
        else {
            let myModal = new bootstrap.Modal(document.getElementById('post-modal'));
            myModal.show();
            seller_address.value = await getAccount();
        }
    })
}

let btn_create_post = document.getElementById('create-post-modal');

const createPost = async (_minBid, _name, _url) => {
    let account = await getAccount();
    try {
        const post = await myContract.methods.createPost(_minBid, _name, _url
        ).send({
            from: account
        });
        const status = post.status;
        console.log("status:", status);
        return status;
    } catch (err) {
        console.log("Error:", err);
    }
}


// ================== Upload in ipfs ================
let url;
const uploadToIPFS = async (event) => {
    let image = document.getElementById('upload-image');
    image.addEventListener('change', async (e) => {
        let node = await Ipfs.create();
        let file = await e.target.files[0]
        let imageUrl = URL.createObjectURL(file);
        let fileAdded = await (node.add(file))
        url = "https://ipfs.io/ipfs/" + fileAdded.cid;
        console.log(url);
        await node.stop();
    });
    return url;
};

uploadToIPFS();

// ================== Send to blockchain ================

btn_create_post.addEventListener('click', async () => {
    let postId = await myContract.methods.getLengthPosts().call();
    let name = document.getElementById("name-post").value;
    let minBid = document.getElementById("min-bid").value;
    let minBidToWei = web3.utils.toWei(minBid, "ether");


    let flagLoading = true;
    let result;
    try {
        showLoading();
        result = await createPost(minBidToWei, name, url);
        if (result) {
            flagLoading = false;
            document.getElementById("name-post").value = "";
            document.getElementById("min-bid").value = "";
            document.getElementById("upload-image").value = "";
            hideLoading();
            refreshPage();
        }
    } catch (error) {
        console.error("Error:", error);
    }

});