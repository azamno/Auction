import { myContract, getAccount, showAddressAccount, web3, showLoading, hideLoading, refreshPage } from "./general-functions.js";

showAddressAccount();




const createPostBox = async (_sellerAddress, _name, _minBid, _postId, _max, _url) => {
    let buyer_address = document.getElementById('addres-buyer');

    let div_md_6 = document.createElement('div');
    div_md_6.setAttribute("class", 'col-md-6 mb-4');

    let card = document.createElement("div");
    card.setAttribute('class', 'card mx-2');

    card.setAttribute('id', 'card');
    div_md_6.appendChild(card);

    let card_body = document.createElement('div');
    card_body.setAttribute('class', 'card-body card-shadow');
    card.appendChild(card_body);

    let h5 = document.createElement('h5');
    h5.setAttribute('class', 'card-title fs-2');
    h5.innerText = "Detail Post ";
    card_body.appendChild(h5);


    let div_seller = document.createElement('div');
    div_seller.setAttribute("class", 'mb-3 row');
    card_body.appendChild(div_seller);

    let label_seller = document.createElement('label');
    label_seller.setAttribute('class', "col-sm-3 col-form-label fs-4");
    label_seller.setAttribute('for', 'inputAddressSeller');
    label_seller.innerText = "Seller's Address";
    div_seller.appendChild(label_seller);

    let div_sm_9 = document.createElement('div');
    div_sm_9.setAttribute('class', 'col-sm-9');
    div_seller.appendChild(div_sm_9);

    let input_seller = document.createElement('input');
    input_seller.setAttribute('class', 'form-control text-muted py-2 fs-4');
    input_seller.setAttribute('type', 'text');
    input_seller.setAttribute('id', 'inputAddressSeller');
    input_seller.setAttribute('readonly', true);
    input_seller.value = _sellerAddress;
    div_sm_9.appendChild(input_seller);


    let div_name = document.createElement('div');
    div_name.setAttribute("class", 'mb-3 row');
    card_body.appendChild(div_name);

    let label_name = document.createElement('label');
    label_name.setAttribute('class', "col-sm-3 col-form-label fs-4");
    label_name.setAttribute('for', 'input_Name');
    label_name.innerText = "Name Post";
    div_name.appendChild(label_name);

    let div_name_sm_9 = document.createElement('div');
    div_name_sm_9.setAttribute('class', 'col-sm-9');
    div_name.appendChild(div_name_sm_9);

    let input_name = document.createElement('input');
    input_name.setAttribute('class', 'form-control text-muted py-2 fs-4');
    input_name.setAttribute('type', 'text');
    input_name.setAttribute('id', 'input_Name');
    input_name.setAttribute('readonly', true);
    input_name.value = _name;
    div_name_sm_9.appendChild(input_name);

    let div_minBid = document.createElement('div');
    div_minBid.setAttribute("class", 'mb-3 row');
    card_body.appendChild(div_minBid);

    let label_minBid = document.createElement('label');
    label_minBid.setAttribute('class', "col-sm-3 col-form-label fs-4");
    label_minBid.setAttribute('for', 'input_MinBid');
    label_minBid.innerText = "Minimum Bid ";
    div_minBid.appendChild(label_minBid);

    let div_minBid_sm_9 = document.createElement('div');
    div_minBid_sm_9.setAttribute('class', 'col-sm-9');
    div_minBid.appendChild(div_minBid_sm_9);

    let input_minBid = document.createElement('input');
    input_minBid.setAttribute('class', 'form-control text-muted py-2 fs-4');
    input_minBid.setAttribute('type', 'text');
    input_minBid.setAttribute('id', 'input_MinBid');
    input_minBid.setAttribute('readonly', true);
    input_minBid.value = web3.utils.fromWei(_minBid, "ether");
    div_minBid_sm_9.appendChild(input_minBid);
    let div_maxBid = document.createElement('div');
    div_maxBid.setAttribute("class", 'mb-3 row');
    card_body.appendChild(div_maxBid);

    let label_maxBid = document.createElement('label');
    label_maxBid.setAttribute('class', "col-sm-3 col-form-label fs-4");
    label_maxBid.setAttribute('for', 'input_maxBid');
    label_maxBid.innerText = "Maximum Bid";
    div_maxBid.appendChild(label_maxBid);


    let div_bid_sm_9 = document.createElement('div');
    div_bid_sm_9.setAttribute('class', 'col-sm-9');
    div_maxBid.appendChild(div_bid_sm_9);

    let input_maxBid = document.createElement('input');
    input_maxBid.setAttribute('class', 'form-control text-muted py-2 fs-4');
    input_maxBid.setAttribute('type', 'text');
    input_maxBid.setAttribute('id', 'input_maxBid');
    input_maxBid.setAttribute('readonly', true);
    input_maxBid.value = web3.utils.fromWei(_max.toString(), "ether");
    div_bid_sm_9.appendChild(input_maxBid);

    // ****
    let div_createBid = document.createElement('div');
    div_createBid.setAttribute('class', 'row mb-3');
    card_body.appendChild(div_createBid);

    let div_create_md_12 = document.createElement('div');
    div_create_md_12.setAttribute('class', 'col-md-12 d-flex align-items-center');
    div_createBid.appendChild(div_create_md_12);

    let btn_createBid = document.createElement('button');
    btn_createBid.innerText = 'Create Bid';
    btn_createBid.setAttribute('class', 'btn btn-primary mx-5 py-2 fs-4');
    btn_createBid.setAttribute('type', 'button');
    btn_createBid.setAttribute('data-bs-toggle', 'modal');
    btn_createBid.setAttribute('data-bs-target', '#bidModal');
    btn_createBid.onclick = async function () {
        id.value = _postId;
        let account = getAccount();
        buyer_address.value = await account;
    };
    div_create_md_12.appendChild(btn_createBid);

    let label_totalBid = document.createElement('label');
    label_totalBid.setAttribute('class', 'mx-4 py-2 fs-4');
    label_totalBid.setAttribute('type', 'button');
    label_totalBid.innerText = 'Total Bid:';
    div_create_md_12.appendChild(label_totalBid);

    let input_totalBid = document.createElement('input');
    input_totalBid.value = await getTotalBids(_postId);
    input_totalBid.setAttribute('class', 'form-control me-4 py-2 fs-4');
    input_totalBid.setAttribute('type', 'text');
    input_totalBid.setAttribute('id', 'input_totalBid');
    input_totalBid.setAttribute('readonly', true);
    input_totalBid.setAttribute("style", "width: 6rem;display:inline-block;");
    div_create_md_12.appendChild(input_totalBid);


    let hr = document.createElement('hr');
    card_body.appendChild(hr);

    // ****** image *********************************************
    let div_img = document.createElement('div');
    div_img.setAttribute("class", 'd-flex justify-content-center mb-4');
    let img_images = document.createElement("img");
    img_images.setAttribute("src", _url);
    console.log(_url);
    img_images.setAttribute("class", 'rounded');
    div_img.append(img_images);
    card_body.appendChild(div_img);

    let hr_2 = document.createElement('hr');
    card_body.appendChild(hr_2);

    // ****** Winner Button **********
    let div_container_win = document.createElement('div');
    div_container_win.setAttribute("id", 'addressWinner');

    card_body.appendChild(div_container_win);


    let div_winner = document.createElement('div');
    div_winner.setAttribute("class", 'mb-3 row');
    div_container_win.appendChild(div_winner);

    let div_btn_win = document.createElement('div');
    div_btn_win.setAttribute('class', 'col-md-12 d-flex justify-content-center');
    div_winner.appendChild(div_btn_win);

    let btn_winner = document.createElement('button');
    btn_winner.setAttribute('class', 'btn btn-success w-50 py-2 fs-3');
    btn_winner.setAttribute('type', 'button');
    btn_winner.innerText = 'Determine the winner';


    btn_winner.onclick = async function () {
        let account = getAccount();
        let sender = await myContract.methods.getSender().call({
            from: await account
        });
        if (_sellerAddress !== sender) {
            let myModal = new bootstrap.Modal(document.getElementById('address-seller'));
            myModal.show();
        }
        await getMaxBidsForWinner(_postId);
    };
    div_btn_win.appendChild(btn_winner);


    let div_add_win = document.createElement('div');
    div_add_win.setAttribute("class", 'mb-3 row d-flex justify-content-center');
    div_container_win.appendChild(div_add_win);

    let label_add_win = document.createElement('label');
    label_add_win.setAttribute('class', "col-md-3 col-form-label ps-1 mb-3 fs-4");
    label_add_win.setAttribute('for', 'input_add_win');
    label_add_win.innerText = "Winner's Address";
    div_add_win.appendChild(label_add_win);

    let div_input_win = document.createElement('div');
    div_input_win.setAttribute('class', 'col-md-9 mb-3');
    div_add_win.appendChild(div_input_win);

    let input_add_win = document.createElement('input');
    input_add_win.setAttribute('class', 'form-control text-muted fs-4');
    input_add_win.setAttribute('type', 'text');
    input_add_win.setAttribute('id', 'input_add_win');
    input_add_win.setAttribute('readonly', true);
    div_input_win.appendChild(input_add_win);

    // ****** Accepte Bid Button **********

    let button_acc_win = document.createElement('button');
    button_acc_win.setAttribute('class', "col-md-3 btn btn-success me-5 py-2 fs-3");
    button_acc_win.innerText = "Accepte Bid";
    button_acc_win.onclick = async function () {
        let flag = true;
        if (flag) {
            showLoading();
        }
        let id = await getIndexMaxBid(_postId);
        let statusAccept = await accepteBid(_postId, id);
        if (statusAccept) {
            flag = false;
            hideLoading();
        }
    };
    div_add_win.appendChild(button_acc_win);

    // ****** Cancel Bid Button **********

    let button_can_win = document.createElement('button');
    button_can_win.setAttribute('class', "col-md-3 btn btn-danger py-2 fs-3");
    button_can_win.innerText = "Cancel Bid";
    button_can_win.onclick = async function () {
        let flag_cancel = true;
        if (flag_cancel) {
            showLoading();
        }
        let _bidId = await getBuyerAddressIndex(_postId);
        console.log("bidId : " + _bidId)
        let statusCancel = await cancelBid(_postId, _bidId);
        if (statusCancel) {
            flag_cancel = false;
            hideLoading();
        }
    };

    div_add_win.appendChild(button_can_win);

    document.querySelector('#showPosts').appendChild(div_md_6);
}


// ******************* Get max for bid ************************

const geMaxtBids = async (_postId) => {
    let bids = await myContract.methods.getBids(_postId).call();
    let countList = [];
    for (let i = 0; i < bids.length; i++) {
        let amount = bids[i].amount;
        countList.push(amount);
    }
    let max = await Math.max(...countList);
    console.log("max :" + max);
    console.log("bids :" + bids);
    return max;
}

const showPosts = async () => {
    let posts = await myContract.methods.getPosts().call();
    for (let i = 0; i < posts.length; i++) {
        const seller = posts[i].seller;
        const minBid = posts[i].minBid;
        const name = posts[i].name;
        const url = posts[i].hashCode;
        const postId = i;
        let max = await geMaxtBids(postId);
        let bids = await myContract.methods.getBids(postId).call();
        if (bids.length === 0) {
            max = 0;
        }
        createPostBox(seller, name, minBid, postId, max, url);
    }
    return true;
}

showPosts();



// ******************* Create Bid ****************************

let create_bid_modal = document.getElementById('create-bid');


const createBid = async (postId) => {
    let flag_bid = true;
    let account = await getAccount();
    let result;
    let amount = document.getElementById('suggested-bid').value;
    let amountToWei = web3.utils.toWei(amount, "ether");
    try {
        showLoading();
        result = await myContract.methods.createBid(postId).send({
            from: await account,
            value: await amountToWei
        });
        if (result) {
            flag_bid = false;
            document.getElementById('suggested-bid').value = "";
            hideLoading();
            refreshPage();
        }
    } catch (error) {
        console.error("Error:", error);
    }

}

create_bid_modal.addEventListener('click', async () => {
    let total = document.querySelectorAll('#input_maxBid');
    let flag_bid = true;
    if (flag_bid) {
        showLoading();
    }
    let postId = document.getElementById('id').value;
    await createBid(postId);
    let max = await geMaxtBids(postId);
    total[postId].value = max;
})


// ******************* Total Bid For Per Post ************************

const getTotalBids = async (postId) => {
    let account = getAccount();
    let total = await myContract.methods.totalBids(postId).call({
        from: await account
    });
    return total;
}

// *******************  Winner  ************************

const getMaxBidsForWinner = async (_postId) => {
    let account = getAccount();
    let len = await getTotalBids(_postId);
    console.log("len" + len);

    let amountList = [];
    let addressTotal = [];
    let countAddress = document.querySelectorAll('#input_add_win');
    for (let i = 0; i < len; i++) {
        let bids = await myContract.methods.getPostBid(_postId, i).call({
            from: await account
        });
        let amount = bids.amount;
        let address = bids.buyer;
        addressTotal.push(address);

        amountList.push(amount);
    }
    console.log(amountList);
    let max = await Math.max(...amountList);
    let index = await amountList.indexOf(max.toString());
    console.log("index: " + index);
    countAddress[_postId].value = addressTotal[index];
}

// ******************* Get Index Max Bid ************************************

const getIndexMaxBid = async (_postId) => {
    let bids = await myContract.methods.getBids(_postId).call();
    let amountList = [];
    for (let i = 0; i < bids.length; i++) {
        let amount = bids[i].amount;
        amountList.push(amount);
    }
    let max = await Math.max(...amountList);
    let index = await amountList.indexOf(max.toString());
    console.log("index: " + index);
    return index;
}

// ******************* Transfer money from contract to seller Aaddress ******************

const accepteBid = async (postId, bidId) => {
    let account = getAccount();
    let status;
    await myContract.methods.accepteBid(postId, bidId).send({
        from: await account
    }).then((result) => {
        status = result.status;
        console.log(result);
    });
    return status;
}

// ********** Transfer mony from contract to  buyer address **********

const cancelBid = async (postId, bidId) => {
    let account = getAccount();
    let status;
    await myContract.methods.cancelBid(postId, bidId).send({
        from: await account
    }).then((result) => {
        status = result.status;
    });
    return status;
}

// ******************* Get index buyer address **************

const getBuyerAddressIndex = async (postId) => {
    let account = getAccount();
    let bids = await myContract.methods.getBids(postId).call();
    let address = await myContract.methods.getSender().call({
        from: await account
    });
    let len = await bids.length;
    let buyersList = [];
    for (let i = 0; i < len; i++) {
        buyersList.push(bids[i].buyer);
    }
    let index = await buyersList.indexOf(address);
    return index;
}


