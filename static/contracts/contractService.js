let contractInstance;
let arrAddr = [];
let arrName = [];
let _arrVoterAddress = [];
let arrResult = [];
let byteCode;
let currentAccount;
// let getImg;
const CTABI = [{
    "constant": false,
    "inputs": [{"name": "proposal", "type": "uint256"}],
    "name": "vote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "proposals",
    "outputs": [{"name": "pAddress", "type": "address"}, {"name": "name", "type": "bytes32"}, {
        "name": "voteCount",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "winnerAddresses",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "startDate",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getWinnerAddresses",
    "outputs": [{"name": "", "type": "address[]"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "isFinish",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "chairperson",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "person", "type": "address"}],
    "name": "getWeightOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "winningProposal",
    "outputs": [{"name": "winningProposal_", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "contractName",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "numberOfVoter",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "voters",
    "outputs": [{"name": "weight", "type": "uint256"}, {"name": "indexVote", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "setWinnerAddresses",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "endDate",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_addr", "type": "address"}],
    "name": "getYourVoteResult",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "numberOfCandidate",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"name": "_name", "type": "string"}, {
        "name": "proposalAddresses",
        "type": "address[]"
    }, {"name": "proposalNames", "type": "bytes32[]"}, {
        "name": "voterAddresses",
        "type": "address[]"
    }, {"name": "_startDate", "type": "uint256"}, {"name": "_endDate", "type": "uint256"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}];
// const CTABI = [ { "constant": false, "inputs": [ { "name": "proposal", "type": "uint256" } ], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "proposals", "outputs": [ { "name": "pAddress", "type": "address" }, { "name": "name", "type": "bytes32" }, { "name": "voteCount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "winnerAddresses", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "startDate", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getWinnerAddresses", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isFinish", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "chairperson", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "person", "type": "address" } ], "name": "getWeightOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "winningProposal", "outputs": [ { "name": "winningProposal_", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "contractName", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numberOfVoter", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "voters", "outputs": [ { "name": "weight", "type": "uint256" }, { "name": "indexVote", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "setWinnerAddresses", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "endDate", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "getYourVoteResult", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numberOfCandidate", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_name", "type": "string" }, { "name": "proposalAddresses", "type": "address[]" }, { "name": "proposalNames", "type": "bytes32[]" }, { "name": "voterAddresses", "type": "address[]" }, { "name": "_startDate", "type": "uint256" }, { "name": "_endDate", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];
let dataInstance = async (_data) => {
    return new Promise((resolve, reject) => {
        BrowserSolc.getVersions(function (soljsonSources, soljsonReleases) {
            BrowserSolc.loadVersion("soljson-v0.4.25+commit.59dbf8f1.js", function (compiler) {
                source = _data;
                optimize = 1;
                result = compiler.compile(source, optimize);
                resolve(result);
            });
        });
    });
}

//get data in Ballot.sol
function getData(path) {
    return new Promise((resolve, reject) => {
        $.get(path, function (data) {
            // console.log(data);

            resolve(data);
        }, 'text');
    })
}

//get name of contract
const getContractName = (_con) => {
    return new Promise((resolve, reject) => {
        _con.contractName.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
//get name proposal[]
const getName = (_con, index) => {
    return new Promise((resolve, reject) => {
        _con.proposals.call(index, (err, data) => {
            if (err) resolve(err);
            resolve(web3.toAscii(data[1]));
        });
    });
}

//get vote of a proposal
const getVote = (_con, index) => {
    return new Promise((resolve, reject) => {
        _con.proposals.call(index, (err, data) => {
            if (err) resolve(err);
            resolve(data[2]);
        });
    });
}

const getWeight = (_con, person) => {
    return new Promise((resolve, reject) => {
        _con.getWeightOf.call(person, (err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}

//get chairperson address
const getChairPerson = (_con) => {
    return new Promise((resolve, reject) => {
        _con.chairperson.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
//check a contract is finish yet ?
const getFinish = (_con) => {
    return new Promise((resolve, reject) => {
        _con.isFinish.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}


const voteForCandidate = (_con, index) => {
    return new Promise((resolve, reject) => {
        _con.vote.sendTransaction(index, (err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}

//set winner of a contract
const setWinner = (_con) => {
    return new Promise((resolve, reject) => {
        _con.setWinnerAddresses.sendTransaction((err, data) => {
            if (err) resolve(err);
            // console.log(web3.toAscii(data));
            resolve(data);
        });
    })
}

//get winner names
const getWinName = (_con) => {
    // console.log("here");
    return new Promise((res, rej) => {
        _con.getWinnerAddresses.call((er, data) => {
            if (er) res(er);
            res(data);
        })
    })
}

//get number of Candidate in contract
const getNum = (_con) => {
    return new Promise((resolve, reject) => {
        _con.numberOfCandidate.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    })
}
//get number of Voter in contract
const getNumVoter = (_con) => {
    return new Promise((resolve, reject) => {
        _con.numberOfVoter.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    })
}
//get your vote result
const getYourVoteResult = (_con, _addr) => {
    return new Promise((resolve, reject) => {
        _con.getYourVoteResult.call(_addr, (err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    })
}

//get close Date
const getCloseDate = (_con) => {
    return new Promise((resolve, reject) => {
        _con.endDate.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    })
}
//get start Date
const getStartDate = (_con) => {
    return new Promise((resolve, reject) => {
        _con.startDate.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    })
}

const getAccounts = () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, res) => {
            resolve(res[0]);
        });
    })

}

function getParamFromUrl(paramName) {
    var url = new URL(window.location.href);
    var c = url.searchParams.get(paramName);
    return c;
}

window.onload = async function () {

    if (typeof web3 !== 'undefined') {

        web3 = new Web3(web3.currentProvider);
        // provider.enable();
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));
    }

    if (typeof BrowserSolc == 'undefined') {
        console.log("You have to load browser-solc.js in the page.  We recommend using a <script> tag.");
        throw new Error();
    }
    $(document).ready(function () {
        let myDate = new Date(getParamFromUrl("endDate"));
        $("#countdown").countdown(myDate, function (event) {
            $(this).html(
                event.strftime(
                    '<div class="timer-wrapper"><div class="time">%D</div><span class="text">days</span></div><div class="timer-wrapper"><div class="time">%H</div><span class="text">hrs</span></div><div class="timer-wrapper"><div class="time">%M</div><span class="text">mins</span></div><div class="timer-wrapper"><div class="time">%S</div><span class="text">sec</span></div>'
                )
            );
        });
    });
    currentAccount = await getAccounts();
    contractInstance = web3.eth.contract(CTABI).at(getParamFromUrl("votingaddr"));
    let testData = await getChairPerson(contractInstance);
    console.log(testData);
    let number = await getWeight(contractInstance, currentAccount);
    if (number > 0) {
        $("#alertcheck").text(`You have ${number} right to vote`);
    }
    else {
        let yourVote = await getYourVoteResult(contractInstance, currentAccount);
        $("#alertcheck").text(`You already vote for ${yourVote}`);
    }


    let num = await getNum(contractInstance);

    for (let i = 0; i < num; i++) {
        let linkImage = await getImage(i);
        let bdName = await getName(contractInstance, i);
        let bdVote = await getVote(contractInstance, i);
        let obj = {
            bdIndex: i,
            bdVote: bdVote
        }
        // arrResult.push(obj);
        // // console.log("before result ",arrResult);
        // arrResult.sort(function(a, b) {
        //     return b.bdVote- a.bdVote;
        // });
        // console.log("our result ",arrResult);
        // console.log("append ",arrResult[i].bdIndex);
        // getLinkImg(i, linkImage,bdName,bdVote);
        getLinkImg(i, linkImage, bdName, bdVote, false);
    }

};

async function clickFinish() {
    $(".frameProposals").empty();
    let num = await getNum(contractInstance);
    arrResult = [];
    for (let i = 0; i < num; i++) {
        let bdVote = await getVote(contractInstance, i);
        // console.log(bdVote);
        let obj = {
            bdIndex: i,
            bdVote: bdVote
        }
        arrResult.push(obj);
        // console.log("before result ",arrResult);

    }
    arrResult.sort(function (a, b) {
        return b.bdVote.c[0] - a.bdVote.c[0];
    });
    console.log("our result ", arrResult);
    let max= arrResult[0].bdVote.c[0];
    console.log("max ", max);
    arrResult.forEach(async function (item) {
        if(item.bdVote.c[0] == max){
             let linkImage = await getImage(item.bdIndex);
        let bdName = await getName(contractInstance, item.bdIndex);
        let bdVote = await getVote(contractInstance, item.bdIndex);
        getLinkImg(item.bdIndex, linkImage, bdName, bdVote, true);
        //$(`#btnVote${item.bdIndex}`).prop("disabled", true);
        //console.log(`#btnVote${item.bdIndex}`);
        }
    });

}

function getLinkImg(i, imageUrl, name, vote, hidden) {
    let html = `<div class="col-md-4 " >
			<div class="panel panel-default panel-painting">
                <div class="panel-body panel-body-custom" value="">
                  <div class="panel-heading">
											<table>
												<tr>
													<td class="col-md-2">
														<h3 class="panel-title">${name}</h3>
													</td>
													<td class="col-md-2">
														<h3 class="panel-title panel-title-custom">${vote}</h3>
													</td>
												</tr>
											</table>
										    </div>
				                            <ul class="thumbnails image_picker_selector">
												<li>
													<div class="thumbnail">
														<img class="image_picker_image"   id="imgElement${i}" src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-9/46830803_2230516317232159_7454426486833938432_n.jpg?_nc_cat=103&_nc_ht=scontent.fsgn5-7.fna&oh=1155a4d3e88e0bf71f73f5a0926883e6&oe=5C63F60E" data-holder-rendered="true">
													</div>
													<div class="medal ${!hidden ? "hidden" : ""}" style="top: 2px"><img src="../static/img/cup.png"></div>
												</li>
											</ul>
					<div class="col-md-12 form-group btn_vote_info">
					    <button class="button-medium button_vote_info ${hidden ? "hidden" : ""}" name="vote" onclick="clickVote(${i})">Vote</button>
				    </div>
				  </div>
			    </div>
			</div>`;

    $('.frameProposals').append(html);
    $(`#imgElement${i}`).attr("src", imageUrl);

}

async function getImage(i) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/api/getimage",
            type: "POST",
            datatype: "JSON",
            data: JSON.stringify({"id": i}),
            success: function (response) {
                resolve(response);

            }
        });
    })
}

async function clickVote(index) {
    await voteForCandidate(contractInstance, index);
}

async function clickLaunch() {
    // console.log(currentAccount);
    let fileContract = await getData('../../static/contracts/Ballot.sol');
    let contractCompile = await dataInstance(fileContract);
    byteCode = contractCompile.contracts[':Ballot'].bytecode;
    let votingName = $('#eName').val();
    let txtStart = $('#startDate').val();
    let txtEnd = $('#endDate').val();
    let strStart = new Date(txtStart);
    let _startDate = Date.parse(strStart);
    let strEnd = new Date(txtEnd);
    let _endDate = Date.parse(strEnd);

    var tableVoter = $("#data-table-voter tbody");
    tableVoter.find('tr').each(function (i, el) {
        var $tds = $(this).find('td'),
            tbVoterAddr = $tds.eq(1).text();
        _arrVoterAddress.push(tbVoterAddr);
    });

    var tableProposal = $("#data-table tbody");
    tableProposal.find('tr').each(function (i, el) {
        var $tds = $(this).find('td'),
            tbName = $tds.eq(0).text(),
            tbAddr = $tds.eq(1).text();
        arrName.push(tbName);
        arrAddr.push(tbAddr);
    });

    let contract = web3.eth.contract(CTABI);
    contract.new(
        votingName,
        arrAddr,
        arrName,
        _arrVoterAddress,
        _startDate,
        _endDate,
        {
            data: `0x${byteCode}`,
            from: currentAccount,
            gas: 4000000
        }, async (err, res) => {

            if (res.address) {
                $('#sendmessage').text(`Your voting has been created. Your Voting Address is: ${res.address}. Check out it right below!`)
                $("#sendmessage").show();
                postData = {
                    startDate: txtStart,
                    endDate: txtEnd,
                    votingAddress: res.address,
                    votingName: votingName,
                    creator: currentAccount,
                    isFinish: false
                };
                $.ajax({
                    type: 'POST',
                    url: '/createVoting',
                    data: JSON.stringify(postData),
                    dataType: "json",
                    success: function (resultData) {
                        resolve(resultData);
                    }
                });

            }
        });

    arrName = [];
    arrAddr = [];
    _arrVoterAddress = [];
}

