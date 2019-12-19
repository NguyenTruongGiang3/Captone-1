pragma solidity ^0.4.22;

contract Ballot {
    struct Voter {
        uint weight ; // weight is accumulated by delegation
        uint indexVote;   // index of the voted proposal
    }

    struct Proposal {
        address pAddress;
        bytes32 name;
        uint voteCount;
    }

    address public chairperson;
    uint public numberOfCandidate;
    uint public numberOfVoter;
    mapping(address => Voter) public voters;
    uint public startDate;
    uint public endDate;
    Proposal[] public proposals;
    address[] public winnerAddresses;
    bool public isFinish ;
    string public contractName;

    constructor(string _name,address[] proposalAddresses,bytes32[] proposalNames,address[] voterAddresses,uint _startDate,uint _endDate) public {
        chairperson = msg.sender;
        numberOfCandidate = proposalAddresses.length;
        numberOfVoter = voterAddresses.length;
        for (uint i = 0; i < numberOfCandidate; i++) {
            proposals.push(Proposal({
                pAddress: proposalAddresses[i],
                name: proposalNames[i],
                voteCount: 0
            }));
        }
        for(uint j = 0;j<voterAddresses.length;j++) {
            voters[voterAddresses[j]].weight = 1;
        }
        startDate = _startDate;
        contractName = _name;
        endDate = _endDate;
    }

    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight > 0, "Already voted.");
        require(endDate > now,"This voting was closed");
        // sender.voted = true;
        sender.indexVote = proposal;
        sender.weight--;
        proposals[proposal].voteCount ++;
    }

    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function setWinnerAddresses() public{
//        require(endDate <= now,"Can't finish at this moment");
//        require(!isFinish,"This contract was closed");
        uint index = winningProposal();
        for (uint p = 0; p < proposals.length; p++) {
            if(proposals[p].voteCount == proposals[index].voteCount)
                winnerAddresses.push(proposals[p].pAddress);
        }
        isFinish = true;

    }
    function getWinnerAddresses() public view returns(address[]){
        return winnerAddresses;
    }
    function getWeightOf(address person) public view returns(uint){
        return voters[person].weight;
    }
    function getYourVoteResult(address _addr) public view returns(uint){
        return voters[_addr].indexVote;
    }
}
