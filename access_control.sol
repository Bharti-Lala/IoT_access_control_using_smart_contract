pragma solidity ^0.4.24;
contract access_control {
    struct access_token{
        bytes32 agentName;
        bytes32 organisation;
        bytes32 password;
        uint cost;
        uint timestamp;
        uint duration;
        uint validity;
        uint index;
    }

    mapping(address=>access_token) private agentToken;

    address[] private agentIndex;

    address public owner =msg.sender;
    uint public tokenCost;
    event requestAccess(address indexed agentAddress, bytes32 agentName, bytes32 organisation, uint cost, uint timestamp, uint validity);
    event costChanged (uint tokenCost, uint timeStamp);

    function setAccessToken (uint newCost) public returns (bool success) {
        if (msg.sender != owner)
            revert();
        tokenCost = newCost;
        emit costChanged(tokenCost, block.timestamp);
        return true;
    }   
    function isValidAgent (address agentAddress) public constant returns (bool isValid) {
        if(agentIndex.length == 0)
            return false;
        return (agentIndex[agentToken[agentAddress].index] == agentAddress);
    }

    function addAgent(
        address agentAddress,
        bytes32 agentName,
        bytes32 password) public returns (uint index) 
    {
            agentToken[agentAddress].agentName = agentName;
            agentToken[agentAddress].password = password;
            agentToken[agentAddress].index = agentIndex.push(agentAddress)-1;

            return agentIndex.length -1;
    }

    function login (address agentAddress, bytes32 pass)public view returns (bool){ 
            if(agentToken[agentAddress].password == pass){
                return true;
            }
    }

    function allowAccess(
        address agentAddress,
        bytes32 agentName,
        bytes32 organisation,
        bytes32 password,
        uint duration) payable public returns (bool success)
    {
        if (isValidAgent(agentAddress) || msg.sender.balance < msg.value) {
            revert();
        } else{

            uint tokenValue = msg.value;
            agentToken[agentAddress].agentName = agentName;
            agentToken[agentAddress].organisation = organisation;
            agentToken[agentAddress].password = password;
            agentToken[agentAddress].cost = tokenValue;
            agentToken[agentAddress].timestamp = now;
            agentToken[agentAddress].duration = duration;
            agentToken[agentAddress].validity = now + duration;
            agentToken[agentAddress].index = agentIndex.push(agentAddress)-1;

            emit requestAccess (
                agentAddress,
                agentName,
                organisation,
                agentToken[agentAddress].cost,
                agentToken[agentAddress].timestamp,
                agentToken[agentAddress].validity);

            return true;
        }
    }

    function getAgent (address agentAddress) public constant returns (bytes32 agentName, bytes32 organisation, uint cost, uint timestamp, uint duration, uint validity) {

        if (!isValidAgent(agentAddress)) 
            revert();
        return (
            agentToken[agentAddress].agentName ,
            agentToken[agentAddress].organisation,
            agentToken[agentAddress].cost,
            agentToken[agentAddress].timestamp,
            agentToken[agentAddress].duration,
            agentToken[agentAddress].validity);
    }

    
    function getAgentCount() public constant returns (uint count){
        return agentIndex.length;
    }
    

}
