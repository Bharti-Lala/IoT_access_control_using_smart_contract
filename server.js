var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var express = require('express');
var app = express();
var cors = require('cors');
var Web3 = require('web3');
var web3 = new Web3();
var path = require('path'); 

var http = require('http');
    
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8085"));

var abi = [{"constant":true,"inputs":[{"name":"agentAddress","type":"address"}],"name":"isValidAgent","outputs":[{"name":"isValid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"agentAddress","type":"address"},{"name":"agentName","type":"bytes32"},{"name":"organisation","type":"bytes32"},{"name":"password","type":"bytes32"},{"name":"duration","type":"uint256"}],"name":"allowAccess","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"agentAddress","type":"address"},{"name":"pass","type":"bytes32"}],"name":"login","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenCost","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAgentCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newCost","type":"uint256"}],"name":"setAccessToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"agentAddress","type":"address"},{"name":"agentName","type":"bytes32"},{"name":"password","type":"bytes32"}],"name":"addAgent","outputs":[{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"agentAddress","type":"address"}],"name":"getAgent","outputs":[{"name":"agentName","type":"bytes32"},{"name":"organisation","type":"bytes32"},{"name":"cost","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"validity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"agentAddress","type":"address"},{"indexed":false,"name":"agentName","type":"bytes32"},{"indexed":false,"name":"organisation","type":"bytes32"},{"indexed":false,"name":"cost","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"validity","type":"uint256"}],"name":"requestAccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenCost","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"costChanged","type":"event"}]
var contadd = "0x9df84350bf9c7912aef8ea04f6941cde2affab96"; 

var con = web3.eth.contract(abi).at(contadd);

app.use(cors());  
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

// API for the functions in the Smart Contract.
app.post('/addAgent',function(req,res){
    // try{
        var name = req.body.agentname;
        var pass = req.body.password; 
        var addr =web3.personal.newAccount("qwerty");
        var t = con.addAgent.call(addr,name,pass,{from:web3.eth.accounts[0],gas:0x493E0});
        var p = con.addAgent(addr,name,pass,{from:web3.eth.accounts[0],gas:0x493E0});
        web3.eth.sendTransaction({from:addr, to:coinbase, value: web3.toWei(20, "ether")})
        alert(con);
        console.log("N:", name,":", pass,":", addr,":",org,":",dur);
        var test; 
        web3.eth.filter("latest").watch(function (error, result) {
            if (web3.eth.getTransaction(p).blockNumber!==null) {
                test = t;   
            }
        });
       
        res.send("Registeration Successful " + " Note Your agent-ID: " + t+ "addrs: "+ addr);

    // }catch(error){
    //  res.send("Some Error Occured ! :(");
    // }
});

app.post('/loginagent', function(req, res){
    try{
        var agtaddr = parseInt(req.body.agtaddr)
        var password = req.body.pass;
        var p = con.login.call(agtaddr,pass);
        console.log("T:"," :", agtaddr," ", password, "P: ", p);
        if(p == true){
            let a = "Login Successful. " + "Please Note Your Address: "+web3.eth.accounts[0];
            res.send(a);            
        }else{
            res.send("Login Failed. Please try again.");
        }

    }catch(error){
        res.send("Some error occured. :(");
    }
});

app.post('/reqtoken', function(req, res){
    try {
        let addr = parseInt(req.body.agentaddr);
        let name = req.body.agentname;
        let org = req.body.agentorg;
        let gas = req.body.gasunit;
        let dur = req.body.duration;
        let ind = req.body.index;
        // console.log(web3.personal.unlockAccount(address1, "qwerty"));
        
        var p = con.allowAccess.call(addr,name,org,dur,ind,{from:web3.eth.accounts[0],gas:0x493E0});
        var t = con.allowAccess(addr,name,org,dur,ind,{from:web3.eth.accounts[0],gas:0x493E0});

        if(p){
            res.send("Access has been allowed" );
        }else{
            res.send("Access Denied")
        }
    } catch (error) {
        res.send("Some error occured.")
    }
});


app.post('/agent', (req, res) => {
    let _addr = parseInt(req.body.agentaddr);
    let a = con.getAgent.call(_addr);
    let agent = [];
    agent.push(web3.toAscii(a[0]).replace(/\0/g , ''));
    agent.push(web3.toAscii(a[1]).replace(/\0/g , ''));
    agent.push(a[2]);
    agent.push(a[3]);
    agent.push(a[4]);
    agent.push(a[5]);
    
    res.send( agent);
});


app.post('/count', (req,res) => {

    let p = con.getAgentCount.call();   

    res.send(p);
});


// Server
var server = app.listen(5000, function(){
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('the sever is running');   
  
  });
