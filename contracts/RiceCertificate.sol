// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract RiceCertificate {

    //sign up or login
    struct reg {
        string role;
        address pass;
    }
    mapping(address => reg) public register;

    function savesignupfarmer(
        string memory urole,
        address account,
        uint256[] memory tArray
    ) public payable returns (bool) {
        register[account].role = urole;
        for (uint256 k = 0; k < tArray.length; k++) {
            TokenData[account].ERC721Tokens.push(tArray[k]);
        }
        return true;
    }

    function savesignup(string memory urole, address account)
        public
        payable
        returns (bool)
    {
        register[account].role = urole;
        return true;
    }

    function logindata(address account) public view returns (string memory) {
        return (register[account].role);
    }

    bytes32[] appTable;

    struct Tokens {
        uint256[] ERC721Tokens;
    }
    mapping(address => Tokens) TokenData;

    function saveTokenData(address acc, uint256[] memory tArray)
        public
        returns (bool)
    {
        for (uint256 k = 0; k < tArray.length; k++) {
            TokenData[acc].ERC721Tokens.push(tArray[k]);
        }
        return true;
    }

    function popToken(address acc) public view returns (uint256) {
        return TokenData[acc].ERC721Tokens[0];
    }

    struct ricefield {
        uint256 farm_id;
        string farm_owner;
        bytes32 farmeraddress;
        bytes32 place;
        bytes32 requirement;
        bytes32 standard;
        address acc;
        bytes32 status;
    }

    ricefield[] public myStructs;

    mapping(uint256 => ricefield) public RiceMap;

    struct extraInfo {
        uint256 farm_id;
        string crop;
        bytes32 extent;
        bytes32 previouscrop;
        bytes32 protect;
        bytes32 manure;
        bytes32 seed;
        bytes32 soiltype;
    }
    mapping(uint256 => extraInfo) public RiceInfo;

    uint256 public countApplication;

    function addApplication(
        uint256 _farmid,
        string memory _farmowner,
        bytes32 _farmeraddress,
        bytes32 _place,
        bytes32 _requirement,
        bytes32 _standard,
        address _account,
        bytes32 _status
    ) public payable returns (bool) {
        countApplication++;
        RiceMap[_farmid].farm_id = _farmid;
        RiceMap[_farmid].farm_owner = _farmowner;
        RiceMap[_farmid].farmeraddress = _farmeraddress;
        RiceMap[_farmid].place = _place;
        RiceMap[_farmid].requirement = _requirement;
        RiceMap[_farmid].standard = _standard;
        RiceMap[_farmid].acc = _account;
        RiceMap[_farmid].status = _status;
        //appTable.push(forCheckInspection);
        /*RiceMap[_farmid] = ricefield(_farmid,_farmowner,_farmeraddress,_place,_requirement,_standard,_account,_status);*/
        accountTable[_account].accountArray.push(_farmid);
        ricefield memory m;
        m.farm_id = _farmid;
        m.farm_owner = _farmowner;
        m.farmeraddress = _farmeraddress;
        //m.place = _place;
        m.requirement = _requirement;
        m.standard = _standard;
        m.acc = _account;
        m.status = _status;
        /*m.crop = _crop;
	m.extent = _extent;
	m.previouscrop = _previouscrop;
	m.protect = _protect;
	m.manure = _manure;
	m.seed = _seed;
	m.soiltype = _soiltype;*/
        myStructs.push(m);
        // RiceMap1[_farmid] = ricefield(_farmid,_farmowner,_farmeraddress,_place,_requirement,_standard,_account,_status);
    }

    function addApplication2(
        uint256 _farmid,
        string memory _crop,
        bytes32 _extent,
        bytes32 _previouscrop,
        bytes32 _protect,
        bytes32 _manure,
        bytes32 _seed,
        bytes32 _soiltype,
        address acco
    ) public payable returns (bool) {
        RiceInfo[_farmid] = extraInfo(
            _farmid,
            _crop,
            _extent,
            _previouscrop,
            _protect,
            _manure,
            _seed,
            _soiltype
        );
        delete TokenData[acco].ERC721Tokens[0];
        for (uint256 k = 0; k < TokenData[acco].ERC721Tokens.length - 1; k++) {
            TokenData[acco].ERC721Tokens[k] = TokenData[acco].ERC721Tokens[
                k + 1
            ];
        }
        return true;
    }

    struct mapB {
        uint256[] accountArray;
    }
    mapping(address => mapB) accountTable;

    //getfarmid for accounts
    function getFarm(address acc) public view returns (uint256[] memory) {
        return accountTable[acc].accountArray;
    }

    //for FARMER
    function getApplication(uint256 id)
        public
        view
        returns (
            uint256,
            string memory,
            bytes32
        )
    {
        return (
            RiceMap[id].farm_id,
            RiceMap[id].farm_owner,
            RiceMap[id].status
        );
    }

    struct inspection {
        uint256 id;
        uint256 idate;
        string iname;
    }
    mapping(uint256 => inspection) public Inspect;

    //for inspector applications table
    function getApplicationCount() public view returns (uint256) {
        return (myStructs.length);
    }

    function addInspectDetails(
        uint256 _id,
        uint256 idate,
        string memory iname
    ) public payable returns (bool) {
        Inspect[_id] = inspection(_id, idate, iname);
    }

    //for getting info based on farm_id
    function getInfo(uint256 farm_id)
        public
        view
        returns (
            string memory,
            bytes32,
            bytes32,
            bytes32,
            bytes32,
            bytes32,
            uint256
        )
    {
        return (
            RiceMap[farm_id].farm_owner,
            RiceMap[farm_id].farmeraddress,
            RiceMap[farm_id].place,
            RiceMap[farm_id].requirement,
            RiceMap[farm_id].standard,
            RiceMap[farm_id].status,
            farm_id
        );
    }

    function getextraInfo(uint256 farm_id)
        public
        view
        returns (
            string memory,
            bytes32,
            bytes32,
            bytes32,
            bytes32,
            bytes32,
            bytes32
        )
    {
        return (
            RiceInfo[farm_id].crop,
            RiceInfo[farm_id].extent,
            RiceInfo[farm_id].previouscrop,
            RiceInfo[farm_id].protect,
            RiceInfo[farm_id].manure,
            RiceInfo[farm_id].seed,
            RiceInfo[farm_id].soiltype
        );
    }

    //for getting inspection info based on farm_id
    function getInspectedInfo(uint256 farm_id)
        public
        view
        returns (uint256, string memory)
    {
        return (Inspect[farm_id].idate, Inspect[farm_id].iname);
    }

    //for inspector and certifier
    function updateFarm(
        uint256 farm_id,
        string memory _farmowner,
        bytes32 _farmeraddress,
        bytes32 _place,
        bytes32 _requirement,
        bytes32 _standard,
        bytes32 status
    ) public payable returns (bool) {
        RiceMap[farm_id].farm_owner = _farmowner;
        RiceMap[farm_id].farmeraddress = _farmeraddress;
        RiceMap[farm_id].place = _place;
        RiceMap[farm_id].requirement = _requirement;
        RiceMap[farm_id].standard = _standard;
        //	RiceMap[farm_id].acc = _account;
        RiceMap[farm_id].status = status;
    }

    struct certification {
        uint256 farm_id;
        string cname;
        uint256 fromyr;
        uint256 toyr;
    }

    mapping(uint256 => certification) public Certified;

    function addCertifierDetails(
        uint256 farm_id,
        string memory _cname,
        uint256 _fromyr,
        uint256 _toyr
    ) public payable returns (bool) {
        Certified[farm_id].cname = _cname;
        Certified[farm_id].fromyr = _fromyr;
        Certified[farm_id].toyr = _toyr;
    }

    function getCertificationInfo(uint256 farm_id)
        public
        view
        returns (
            string memory,
            uint256,
            uint256
        )
    {
        return (
            Certified[farm_id].cname,
            Certified[farm_id].fromyr,
            Certified[farm_id].toyr
        );
    }

    /// @dev used to return the list of application for inspector and certifier
    /// @return bytes32[] array
    function retApp() public view returns (bytes32[] memory) {
        return (appTable);
    }

    struct shapeStruct {
        bytes coordinateHash;
    }
    mapping(uint256 => shapeStruct) shapeTable;

    function setShapeArray(uint256 farm_id, bytes memory hashArray)
        public
        payable
        returns (bool)
    {
        shapeTable[farm_id].coordinateHash = hashArray;
    }

    function getShapeArray(uint256 farm_id) public view returns (bytes memory) {
        return (shapeTable[farm_id].coordinateHash);
    }
}
