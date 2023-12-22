// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import {Context} from "./Context.sol";
import {Ownable} from "./Ownable.sol";

error NotPostSeller();
error InvalidAmount();
error PostMinBid();
error NotSellerPermission();
error AuctionHasExpired();
error BidHasExpired();
error NotbuyerrPermission();

/**
 * @title Auction Contract
 * @dev This contract implements a simple auction system with the ability to create posts and place bids.
 */

contract Auction is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    //*********** Declare Struct **************
    struct Post {
        address payable seller;
        uint256 minBid;
        string name;
        string hashCode;
    }

    struct Bid {
        address payable buyer;
        uint256 amount;
        uint256 blockNumber;
        bool isFinished;
    }
    //*********** Declare Event **************
    event postEvent(
        address indexed seller,
        uint256 minBid,
        string name,
        string hashCode
    );

    event bidEvent(
        address indexed buyer,
        uint256 amount,
        uint256 blockNumber,
        bool isFinished
    );
    //*********** Declare Array And Mapping **************

    Post[] posts;
    mapping(uint256 => Bid[]) bids;
    mapping(address => uint256) balances;

    //*********** Declare Functions **************

    /**
     * @dev Returns the owner of the contract.
     * @return The address of the contract owner.
     */
    function getOwnerContract() public view returns (address) {
        return owner();
    }

    /**
     * @dev Returns the balance of a specific address.
     * @param _addr The address to check the balance for.
     * @return The balance of the specified address.
     */
    function getBalance(address _addr) public view returns (uint256) {
        return balances[_addr];
    }

    /**
     * @dev Returns the balance of the contract.
     * @return The balance of the contract.
     */
    function getBalanceContract() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Creates a new post with details provided by the user.
     * @param _minBid The minimum bid required for the post.
     * @param _name The name of the post.
     * @param _hashCode The IPFS hash code associated with the image stored in IPFS.
     * @return A boolean indicating the success of the operation.
     */
    function createPost(
        uint256 _minBid,
        string memory _name,
        string memory _hashCode
    ) public returns (bool) {
        posts.push(Post(payable(msg.sender), _minBid, _name, _hashCode));
        emit postEvent(payable(msg.sender), _minBid, _name, _hashCode);
        return true;
    }

    /**
     * @dev Returns an array of all posts.
     * @return An array of Post structures representing all posts.
     */
    function getPosts() public view returns (Post[] memory) {
        return posts;
    }

    /**
     * @dev Returns a specific post by its ID.
     * @param _id The ID of the post to retrieve.
     * @return A Post structure representing the specified post.
     */
    function getPostsId(uint256 _id) public view returns (Post memory) {
        return posts[_id];
    }

    /**
     * @dev Returns the number of posts.
     * @return The number of posts.
     */
    function getLengthPosts() public view returns (uint256) {
        return posts.length;
    }

    /**
     * @dev Returns the sender's address.
     * @return The address of the sender.
     */
    function getSender() public view returns (address) {
        return Context._msgSender();
    }

    //*********** Bid **************

    /**
     * @dev Creates a bid for a specific post.
     * @param _postId The ID of the post to place a bid on.
     */
    function createBid(uint256 _postId) public payable {
        Post memory post = posts[_postId];
        if (msg.sender == post.seller) revert NotPostSeller();
        if (msg.value == 0) revert InvalidAmount();
        if (msg.value < post.minBid) revert PostMinBid();
        bids[_postId].push(
            Bid(payable(msg.sender), msg.value, block.number, false)
        );
        balances[address(this)] += msg.value;
        emit bidEvent(payable(msg.sender), msg.value, block.number, false);
    }

    /**
     * @dev Returns an array of bids for a specific post.
     * @param _id The ID of the post to retrieve bids for.
     * @return An array of Bid structures representing all bids for the specified post.
     */
    function getBids(uint256 _id) public view returns (Bid[] memory) {
        return bids[_id];
    }

    /**
     * @dev Returns information about a specific bid for a post.
     * @param _postId The ID of the post.
     * @param _bidId The ID of the bid.
     * @return buyer The address of the buyer.
     * @return amount The bid amount.
     * @return time The block number when the bid was placed.
     */
    function getPostBid(uint256 _postId, uint256 _bidId)
        public
        view
        returns (
            address buyer,
            uint256 amount,
            uint256 time
        )
    {
        Post memory post = posts[_postId];
        Bid memory bid = bids[_postId][_bidId];
        if (msg.sender != post.seller) revert NotSellerPermission();
        return (bid.buyer, bid.amount, bid.blockNumber);
    }

    /**
     * @dev Returns the total number of bids for a specific post.
     * @param _postId The ID of the post.
     * @return The total number of bids for the specified post.
     */
    function totalBids(uint256 _postId) public view returns (uint256) {
        return bids[_postId].length;
    }

    /**
     * @dev Accepts a bid for a specific post.
     * @param _postId The ID of the post.
     * @param _bidId The ID of the bid to accept.
     */
    function accepteBid(uint256 _postId, uint256 _bidId) public payable {
        Post memory post = posts[_postId];
        Bid storage bid = bids[_postId][_bidId];
        if (msg.sender != post.seller) revert NotSellerPermission();
        if (bid.isFinished != false) revert AuctionHasExpired();
        bid.isFinished = true;
        uint256 payment = bid.amount;
        bid.amount = 0;
        balances[address(this)] -= payment;
        post.seller.transfer(payment);
    }

    /**
     * @dev Cancels a bid for a specific post.
     * @param _postId The ID of the post.
     * @param _bidId The ID of the bid to cancel.
     */
    function cancelBid(uint256 _postId, uint256 _bidId) public payable {
        Bid storage bid = bids[_postId][_bidId];
        if (msg.sender != bid.buyer) revert NotbuyerrPermission();
        if (bid.isFinished != false) revert AuctionHasExpired();
        bid.isFinished = true;
        uint256 payment = bid.amount;
        bid.amount = 0;
        balances[address(this)] -= payment;
        bid.buyer.transfer(payment);
    }
}
