const Web3 = require("web3");
var path = require('path');
var $ = require('jquery');
var ipfsAPI = require('ipfs-api');
//var ipfsAPI = require('ipfs-http-client');
var Geohash = require('latlon-geohash')
const cryptoRandomString = require('crypto-random-string')
var swal = require("sweetalert");
const axios = require('axios').default;
var ipfs, output;
var shapeArray1 = new Array();
var d3 = require("d3");
// RiceCertificate is our usable abstraction, which we'll use through the code below.
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
var metamaskAdd;
var marker0
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
// const GPS = require('gps-module');
// const gps = new GPS();

//var shapeArray = new Array();
var accounts;
var account;
var tokenArr = [];
window.App = {
    loading: false,
    contracts: {},

    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.bind();
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        var self = this;
        if (typeof web3 !== "undefined") {
            App.web3Provider = web3.currentProvider;
            window.web3 = new Web3(web3.currentProvider);
        } else {
            window.alert("Please connect to Metamask.");
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            // alert("going in  second if")
            window.web3 = new Web3(ethereum);
            try {
                // Request account access if needed
                await ethereum.enable();
                ethereum.autoRefreshOnNetworkChange = false;
                // Acccounts now exposed
                // web3.eth.sendTransaction({ /* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            // alert("goint in third if")
            console.log("some issue");
            App.web3Provider = web3.currentProvider;
            window.web3 = new Web3(web3.currentProvider);
            // Acccounts always exposed
            // web3.eth.sendTransaction({ /* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    },

    loadAccount: async () => {
        try {
            // Request account access if needed
            const accounts = await ethereum.send("eth_requestAccounts");
            console.log("accounts");
            console.log(accounts.result[0]);
            metamaskAdd = accounts.result[0];
            account = accounts.result[0];

            // Accounts now exposed, use them
        } catch (error) {
            // User denied account access
            console.log("user denied account access");
        }
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const RiceCertificate = await $.getJSON("RiceCertificate.json");
        App.contracts.RiceCertificate = TruffleContract(RiceCertificate);
        App.contracts.RiceCertificate.setProvider(App.web3Provider);
        App.RiceCertificate = await App.contracts.RiceCertificate.deployed();

        const MyToken = await $.getJSON("MyToken.json");
        App.contracts.MyToken = TruffleContract(MyToken);
        App.contracts.MyToken.setProvider(App.web3Provider);
        App.MyToken = await App.contracts.MyToken.deployed();
    },
    bind: async () => {
        // var v = await App.Registration.getUserHashType.call(metamaskAdd);    
        console.log("CALLING");
        $(document).ready(function () {

            $('#indexpage').append(function () {
                // metamaskAdd
                App.login(metamaskAdd);
            });

            $('#homepage1').append(function () {
                console.log("loginPage");
                var shapeArray = new Array();
                $("#saveArray").click(function () {
                    console.log(document.getElementById('latit').value);
                    console.log(document.getElementById('longit').value);
                    console.log('save to Array')
                    var farmid = document.getElementById('farm').value;
                    var lt = document.getElementById('latit').value;
                    var long = document.getElementById('longit').value;
                    var nd = new Array();
                    //   nd.lat = lt;
                    //   nd.lng = long;
                    nd.push(lt, long);
                    shapeArray = Array.prototype.concat.apply([nd], [shapeArray]);
                    console.log(shapeArray);

                    document.getElementById('latlong').style.display = "none"
                    swal("Field Location Saved");
                    swal({
                        title: "Save Field Location?",
                        text: "Field Coordinates will be saved",
                        icon: "info",
                        buttons: true,

                    })
                        .then((willSave) => {
                            if (willSave) {
                                swal("Farm location Saved in Array,Now Confirm Application!", {
                                    icon: "success",
                                });
                                //document.getElementById("sendBtn").style.display="block";

                                App.ApplicationDone(shapeArray);
                            } else {
                                swal("Location not Saved!");
                            }
                        });
                    //alert(farmid);

                    /* RiceCertificate.deployed().then(function (instance) {
                         instance.setShapeArray(farmid,shapeArray, {
                            from: account,
                            gas: 3000000,
                            value: web3.toWei(1, 'ether')
                        }) // addApplication is a function to be defined in the contract
                            .then(function (v) {
                           console.log('Shape Array Saved')
                                
                            }).catch(function(e){
                                console.log(e);
                            });
                        }) */
                    // //GET SHAPE ARRAY
                    // RiceCertificate.deployed().then(function (instance) {
                    //     instance.getShapeArray.call(farmid).then(function (v) {
                    //         console.log(v);
                    //     })
                    // });


                    document.getElementById('mapContainer').style.display = "block";
                    // console.log(NewArr.reduce(2));
                    //Get Lat long Array
                    var lat, lon, lat1, lon1;
                    // lat=9.366092
                    // lon =76.730862
                    lat = shapeArray[0][0];
                    lon = shapeArray[0][1];

                    // // lat1=9.366224
                    // //  lon1 =76.731281
                    console.log('NewArr')
                    console.log(lat)

                    console.log(lon)
                    //var h =  [];
                    //h.push(NewArr);
                    console.log(shapeArray);
                    //console.log(h[0][0]);
                    console.log(shapeArray.length)


                    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

                    var map = L.mapquest.map('mapContainer', {
                        center: [lat, lon],
                        layers: L.mapquest.tileLayer('satellite'),
                        zoom: 18
                    });

                    L.marker([lat, lon], {
                        icon: L.mapquest.icons.marker(),
                        draggable: false
                    }).bindPopup('Farm land').addTo(map);

                    //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                    //var denverLatLngs = NewArr;
                    var denverLatLngs = shapeArray;

                    //[9.364562, 76.731110],
                    console.log(denverLatLngs);
                    L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);





                });
                $("#addMore").click(function () {
                    swal("The plus was clicked.");
                    console.log('save to Array')
                    var lat = document.getElementById('latit').value;
                    var long = document.getElementById('longit').value;
                    var nd = new Array();
                    //   nd.lat = lat;
                    //   nd.lng = long;
                    nd.push(lat, long);
                    shapeArray = Array.prototype.concat.apply([nd], [shapeArray]);
                    console.log(shapeArray);

                });

            });
        })




    },


    // start: function () {
    //    ;

    //     // Bootstrap the RiceCertificate abstraction for Use.
    //     RiceCertificate.setProvider(web3.currentProvider);
    //     NFT.setProvider(web3.currentProvider);
    //     web3.currentProvider.enable();
    //     // Get the initial account balance so it can be displayed.
    //     web3.eth.getAccounts(function (err, accs) {
    //         if (err != null) {
    //             swal('There was an error fetching your accounts.');
    //             return;
    //         }

    //         if (accs.length == 0) {
    //             swal(
    //                 'Couldnt get any accounts! Make sure your Ethereum client is configured correctly.'
    //             );
    //             return;
    //         }

    //         accounts = accs;
    //         account = accounts[0];

    //         // gps.on('data', (location) => {
    //         //     console.log("LOACTIO")
    //         //     console.log(location);
    //         // });
    //         // //var mapq= 'http://www.mapquestapi.com/directions/v2/route?key=0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h';
    //         // var mapq = 'http://www.mapquestapi.com/search/v2/corridor?key=0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h&line=40.078811,-76.730422,41.078811,-74.730422,40.078811,-74.730422,39.961879,-76.730422,39.961879,-76.730422&maxMatches=4';

    //         // // var resultorgin = 'https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=' + org1 + '&app_id=V8PmOJ1eaDD5jv7pOH7x&app_code=o85LAzy5i0-pCv4tmvqwMA&gen=8';
    //         // $.ajax({
    //         //     url: mapq,
    //         //     success: function (result1) {
    //         //         console.log('sfds');
    //         //         console.log(result1);
    //         //         // console.log(result1.results[0].locations[0].displayLatLng.lng);

    //         //     }
    //         // });


    //         $(document).ready(function () {



    //     });
    // },





    //Registration Phase
    signup: function () {
        // var uname = document.getElementById('signupName').value;
        console.log('******');
        document.getElementById('signupPassword').value = account
        var urole = document.getElementById('urole').value;
        var Regdate = new Date(Date.now())
        //console.log('uname' + uname)
        console.log('urole' + urole)
        console.log('account' + account)
        console.log(Regdate)

        if (urole == 'Farmer') {
            for (var i = 0; i < 30; i++) {
                tokenArr[i] = Math.floor(Math.random() * 100000);
                console.log('Tokens:::' + tokenArr[i]);
            }

            App.RiceCertificate.savesignupfarmer(urole, account, tokenArr, {
                from: account

            }) //savetoBC is a function to be defined in the contract
                .then((v) => {



                    console.log('Done Signin')
                    console.log(v);
                    if (swal('Registration successfull')) {
                        window.location.href = 'index.html'
                        //------------TOKENIZTION--------------//

                        // App.MyNFToken.mint2(account, tokenArr, {
                        //         from: account
                        //     }).then(function (result) {
                        //         console.log(result);
                        //    })
                        console.log(v);
                        console.log("721 Token Data Saved for Org");
                    }

                });
        }
        else {
            App.RiceCertificate.savesignup(urole, account, {
                from: account
                // gas: 3000000,
                // value: web3.toWei(1, 'ether')
            }) //savetoBC is a function to be defined in the contract
                .then((v) => {



                    console.log('Done Signin')
                    console.log(v);

                    if (swal('Registration successfull')) {
                        window.location.href = 'index.html';
                    }
                });

        }


    },

    //Login ({Phase})
    login: function (account) {
        console.log('in login');
        console.log(account);
        // uname = document.getElementById('uname').value;
        // upass = document.getElementById('upass').value;
        // console.log('Entered user name:' + ' ' + uname + 'Entered password: ' + ' ' + upass);
        App.RiceCertificate.logindata.call(account).then((v) => {


            console.log('v from login' + v);
            // console.log('Decrypted Password:' + ' ' + decrypted);
            //var decrypted = aes256.decrypt(key, v[0]);
            console.log('Data ret from BC!!!!');

            if ((v == '')) {
                swal(' No user found  SIgn Up for an Account');


            } else {

                if ((v == 'Farmer')) {

                    console.log('Login Success');
                    swal('Welcome Farmer.');
                    //logn = false;
                    window.location.href = 'homepage1.html?urole=' + v;

                } else if (v == 'Inspector') {
                    // App.viewApplication();
                    console.log('Login Success..');
                    swal('Welcome Inspector..');

                    window.location.href = 'homepage2.html?urole=' + v;
                } else if (v == 'Certifier') {
                    console.log('Login Success');
                    swal('Welcome Certifier....');

                    window.location.href = 'homepage3.html?urole=' + v;
                } else {
                    swal('Sorry No User Found Please Sign UP');
                    document.getElementById('signupPassword').value = account;
                }
            }
        });

    },

    //----------------------------------FARMER---------------------------------------//
    ApplyForm: function () {
        console.log('Applyform')
        document.getElementById('ApplicationForm').style.display = 'block'
        // document.getElementById('Scann').style.display = 'none'
        document.getElementById('services').style.display = 'none'
        console.log('getting account', account);
        // direct Api call
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=20.5937&lon=78.9629&appid=9a256fd55777e16891a6ede86831f72b')
            .then((res) => {
                console.log('Data from Open Weather')
                console.log(res);
                console.log(res.data);

                // alert('check');
            })
            .catch((error) => {
                console.error(error);
            });

        axios({
            method: 'get',
            url: 'https://api.gleif.org/api/v1/lei-records?filter[lei]=529900W18LQJJN6SJ336',
        }).then((response) => {
            console.log('GEtting API Data')
            console.log(response.data);
            console.log(response.data.data[0])
            console.log(response.data.data[0].attributes)
            console.log(response.data.data[0].attributes.entity)
            console.log('data')
            console.log(response.data.data[0].attributes.entity.registeredAs)


            console.log('address')
            console.log(response.data.data[0].attributes.entity.legalAddress.addressLines[0])
            console.log('Name')
            console.log(response.data.data[0].attributes.entity.legalName)

            var fname = response.data.data[0].attributes.entity.legalName.name;
            var add = response.data.data[0].attributes.entity.legalAddress.addressLines[0];
            var crop = response.data.data[0].attributes.entity.registeredAs;
            App.RiceCertificate.popToken.call(account).then((t) => {
            // App.MyToken.getApplicationNo.call().then((t) => {
                console.log("Initializing pop one token function" + account);
                console.log("NFTTOKEN Getting", t);
                if (t == "" || t == "0x") {
                    swal("no token found");
                } else {
                    console.log('Token Value')
                    console.log(t)
                    console.log(t.c[0]);
                    var farmid = t.c[0];
                    document.getElementById('farm').value = farmid;
                    console.log(farmid);

                    document.getElementById('farmername').value = fname;
                    document.getElementById('farmeraddress').value = add;
                    document.getElementById('crop').value = crop;
                }
            });
        });






        /* document.getElementById('Certify').style.display = 'none'
    document.getElementById('ScanData').style.display = 'none'
*/
    },
    showLoc: function () {
        document.getElementById('latlong').style.display = "block";
        document.getElementById("sendBtn").style.display = "none";
    },
    //Submits an application
    ApplicationDone: function (shapeArray) {
        console.log('**********************')
        console.log('Shape Array');
        console.log(shapeArray);
        var farmid = document.getElementById('farm').value;
        //Array for shape saved in IPFS
        var files = {
            ID: farmid,
            array: shapeArray
        }
        var files_json = JSON.stringify(files);
        ipfs.add(new Buffer(files_json), function (err, res) {
            if (err || !res) return console.error("ipfs add error", err, res);
            var dataFileCoordinates = res[0].hash;
            console.log('hash of markers:' + dataFileCoordinates);
            console.log("qrcode id" + parseInt(farmid));
            console.log("array:");
            console.log(shapeArray);
            App.RiceCertificate.setShapeArray(parseInt(farmid), dataFileCoordinates, {
                from: account
                // gas: 3000000
            }).then((v) => {
                console.log(v);
                swal("Location Saved to IPFS");
            });
        });

        var fname = document.getElementById('farmername').value
        var add = document.getElementById('farmeraddress').value
        var lat = document.getElementById('latit').value
        var lng = document.getElementById('longit').value
        var requirement1 = document.getElementById('requirement1')
        var requirement2 = document.getElementById('requirement2')
        var requirement3 = document.getElementById('requirement3')
        var requirement4 = document.getElementById('requirement4')
        if (requirement1.checked) {
            var requirement = requirement1.value;
        } else if (requirement2.checked) {
            var requirement = requirement2.value;

        } else if (requirement3.checked) {
            var requirement = requirement3.value;

        } else if (requirement4.checked) {
            var requirement = requirement4.value;

        }
        var std1 = document.getElementById('standard1')
        var std2 = document.getElementById('standard2')
        var std3 = document.getElementById('standard3')
        var std4 = document.getElementById('standard4')
        if (std1.checked) {
            var std = std1.value;
        } else if (std2.checked) {
            var std = std2.value;

        } else if (std3.checked) {
            var std = std3.value;

        } else if (std4.checked) {
            var std = std4.value;

        }
        var crop = document.getElementById('crop').value
        var extent = document.getElementById('extent').value
        var previouscrop = document.getElementById('previouscrop').value
        var protect = document.getElementById('protect').value
        var manure = document.getElementById('manure').value
        var seed = document.getElementById('seed').value
        var soiltype = document.getElementById('soiltype').value
        //var irrigation = document.getElementById('irrigation').value
        var status = 'Pending'
        if (fname === '' || fname === 'null' || add === '' || add === 'null' || requirement === '' || requirement === 'null' || std === '' || std === 'null' || status === '' || status === 'null') {
            swal('please check all details are provided correctly')
        } else {

            var encodePlace = Geohash.encode(lat, lng, [9])
            console.log('afwasf')
            console.log(encodePlace)
            console.log(farmid + ',' + fname + ',' + add + ' , ' + lat + ',' + lng + ',' + requirement + ',' + std)
            App.RiceCertificate.addApplication(farmid, fname, add, encodePlace, requirement, std, account, status, {
                from: account,
                // gas: 3000000,
                // value: web3.toWei(1, 'ether')
            }) // addApplication is a function to be defined in the contract
                .then((v) => {
                    App.RiceCertificate.addApplication2(farmid, crop, extent, previouscrop, protect, manure, seed, soiltype, account, {
                        from: account,
                        // gas: 3000000,
                        // value: web3.toWei(1, 'ether')
                    }) // addApplication is a function to be defined in the contract
                        .then((v1) => {
                            console.log(v)
                            console.log(v1)
                            console.log('Tokenization');
                            // App.MyToken.mintToken.call(account, files_json).then((t) => {
                            //     console.log('token minted');
                            //     console.log(t);
                                if (swal("Successfully Applied and your ID is :" + farmid)) {
                                    window.location.reload();
                            //         // const ID = 1;
                            //         // console.log("ID : " + ID);
                            //         // App.RiceCertificate.ownerofToken.call(ID).then(function (v) {
                            //         //     console.log('ownerofMyToken');
                            //         //     console.log(v)

                            //         // })
                                }
                            // });
                        })
                })
        }


        //var farmid = cryptoRandomString(5)

    },

    //View applications in table format
    GetMyAppStatus: function () {
        console.log(account);

        App.RiceCertificate.getFarm.call(account).then(function (v) {
            console.log(v)
            var statTable = $("#statTable");
            statTable.empty();

            for (var i = 0; i < v.length; i++) {
                var faid = v[i].c;
                console.log(faid);

                //get in table format for each farm_id
                App.RiceCertificate.getApplication.call(faid).then(function (farm) {
                    console.log('farm')
                    console.log(farm)

                    var id = farm[0].c;
                    var owner = farm[1];
                    var status = web3.utils.toUtf8(farm[2]);
                    // var status =  web3.toAscii(farm[2]).replace(/[^ -~]+/g, '');
                    console.log('id:' + id + 'OWNER:' + owner + 'Status:' + status);

                    document.getElementById('services').style.display = "none";

                    document.getElementById('showStatus').style.display = "block"

                    var statusTemplate = "<tr><th>" + id + "</th><td>" + owner + "</td><td>" + status + "</td><td><button value=" + id + " onclick=App.Print(this.value) ng-show=" + status + " == 'Certified'>PRINT</button></td></tr>"
                    statTable.append(statusTemplate);


                })

            }


        })

    },
    SearchStat: function () {
        document.getElementById('searchStat').style.display = "block";
        document.getElementById('services').style.display = "none";


    },
    //Searches id and get d3 visualization
    getStat: function () {
        var id = document.getElementById('farmid').value;
        App.RiceCertificate.getInfo.call(id).then(function (info) {
            console.log(info);
            if (info[0] != "") {
                var stat = web3.utils.toUtf8(info[5]).replace(/[^ -~]+/g, '')
                console.log(stat)
                d3.select("#the_SVG_ID").remove();

                // the flat data
                var flatData = [{
                    "name": "Pending",
                    "parent": null,
                    "status": "pending"
                },
                {
                    "name": "Inspected",
                    "parent": "Pending",
                    "status": "inspected"
                },
                {
                    "name": "Certified",
                    "parent": "Inspected",
                    "status": "certified"
                },
                ];

                // convert the flat data into a hierarchy 
                var treeData = d3.stratify()
                    .id(function (d) {
                        return d.name;
                    })
                    .parentId(function (d) {
                        return d.parent;
                    })
                    (flatData);

                // assign the name to each node
                treeData.each(function (d) {
                    d.name = d.id;
                    d.stat = d.data.status
                    console.log(d.stat);
                });

                // set the dimensions and margins of the diagram
                var margin = {
                    top: 10,
                    right: 45,
                    bottom: 30,
                    left: 20
                },
                    width = 400 - margin.left - margin.right,
                    height = 150 - margin.top - margin.bottom;

                // declares a tree layout and assigns the size
                var treemap = d3.tree()
                    .size([height, width]);

                //  assigns the data to a hierarchy using parent-child relationships
                var nodes = d3.hierarchy(treeData, function (d) {
                    return d.children;
                });

                function responsivefy(svg) {
                    // get container + svg aspect ratio
                    var container = d3.select(svg.node().parentNode),
                        width = parseInt(svg.style("width")),
                        height = parseInt(svg.style("height")),
                        aspect = width / height;

                    // add viewBox and preserveAspectRatio properties,
                    // and call resize so that svg resizes on inital page load
                    svg.attr("viewBox", "0 0 " + width + " " + height)
                        .attr("preserveAspectRatio", "xMinYMid")
                        .call(resize);

                    // to register multiple listeners for same event type,
                    // you need to add namespace, i.e., 'click.foo'
                    // necessary if you call invoke this function for multiple svgs
                    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
                    d3.select(window).on("resize." + container.attr("id"), resize);

                    // get width of container and resize svg to fit it
                    function resize() {
                        var targetWidth = parseInt(container.style("width"));
                        svg.attr("width", targetWidth);
                        svg.attr("height", Math.round(targetWidth / aspect));
                    }
                }


                // maps the node data to the tree layout
                nodes = treemap(nodes);

                // append the svg object to the body of the page
                // appends a 'group' element to 'svg'
                // moves the 'group' element to the top left margin
                var svg = d3.select("#chart").append("svg")
                    .attr("id", "the_SVG_ID")

                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom),
                    g = svg.append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");

                // adds each node as a group
                var node = g.selectAll(".node")
                    .data(nodes.descendants())
                    .enter().append("g")
                    .attr("class", function (d) {
                        return "node" +
                            (d.children ? " node--internal" : " node--leaf");
                    })
                    .attr("transform", function (d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });
                // adds the text to the node

                node.append("text")
                    .attr("y", ".35em")
                    .attr("dy", function (d) {
                        return d.children ? 20 : 20;
                    })
                    .style("text-anchor", function (d) {
                        return d.children ? "start" : "start";
                        //    return d.children ? "end" : "start";

                    })
                    .text(function (d) {
                        return d.data.name;
                    });

                if (stat == "Pending") {

                    // adds the links between the nodes
                    var link = g.selectAll(".link")
                        .data(nodes.descendants().slice(1))
                        .enter().append("path")
                        .attr("class", "link")
                        .style("stroke", 'green')
                        .style("stroke-dasharray", function (d) {
                            if (d.data.name == "Pending")
                                return 0;
                            else
                                return 5;
                        })
                        .attr("d", function (d) {
                            console.log(d.status)
                            return "M" + d.y + "," + d.x +
                                "C" + (d.y + d.parent.y) / 2 + "," + d.x +
                                " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
                                " " + d.parent.y + "," + d.parent.x;
                        });

                    // adds the circle to the node
                    node.append("circle")
                        .attr("r", 7)
                        .style("fill", function (d) {
                            if (d.data.name == "Pending")
                                return 'green'
                        });

                } else if (stat == "Inspected") {
                    var link = g.selectAll(".link")
                        .data(nodes.descendants().slice(1))
                        .enter().append("path")
                        .attr("class", "link")
                        .style("stroke", function (d) {
                            if (d.data.name == "Pending" || d.data.name == "Inspected")
                                return "green"
                            else
                                return "red"
                        })
                        .style("stroke-dasharray", function (d) {
                            if (d.data.name == "Pending" || d.data.name == "Inspected")
                                return 0;
                            else
                                return 5;
                        })

                        .attr("d", function (d) {
                            console.log(d.status)
                            return "M" + d.y + "," + d.x +
                                "C" + (d.y + d.parent.y) / 2 + "," + d.x +
                                " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
                                " " + d.parent.y + "," + d.parent.x;
                        });
                    // adds the circle to the node
                    node.append("circle")
                        .attr("r", 10)
                        .style("fill", function (d) {
                            if (d.data.name == "Inspected" || d.data.name == "Pending")
                                return 'green'
                        });

                } else if (stat == "Certified") {
                    var link = g.selectAll(".link")
                        .data(nodes.descendants().slice(1))
                        .enter().append("path")
                        .attr("class", "link")
                        .style("stroke", "green")
                        .attr("d", function (d) {
                            console.log(d.status)
                            return "M" + d.y + "," + d.x +
                                "C" + (d.y + d.parent.y) / 2 + "," + d.x +
                                " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
                                " " + d.parent.y + "," + d.parent.x;
                        });

                    // adds the circle to the node
                    node.append("circle")
                        .attr("r", 10)
                        .style("fill", 'green')

                }


            } else {
                if (swal("id doesnt exist")) {
                    window.location.reload();
                }
            }

        })

    },

    //Once Certified Farmer can print their certificate
    Print: function (field) {
        App.RiceCertificate.getInfo.call(field).then(function (info) {

            console.log('GOT FROM BC')
            console.log(info);
            var farm_owner = info[0];
            var address = web3.utils.toUtf8(info[1]).replace(/[^ -~]+/g, '');
            var requirement = web3.utils.toUtf8(info[3]).replace(/[^ -~]+/g, '');
            var standard = web3.utils.toUtf8(info[4]).replace(/[^ -~]+/g, '');
            // var account = info[5]
            var stat1 = web3.utils.toUtf8(info[5]).replace(/[^ -~]+/g, '');
            App.RiceCertificate.getextraInfo.call(field).then(function (info2) {

                var crop = info2[0];
                var extent = web3.utils.toUtf8(info2[1]).replace(/[^ -~]+/g, '');
                var previouscrop = web3.utils.toUtf8(info2[2]).replace(/[^ -~]+/g, '');
                var protect = web3.utils.toUtf8(info2[3]).replace(/[^ -~]+/g, '');
                var manure = web3.utils.toUtf8(info2[4]).replace(/[^ -~]+/g, '');
                var seed = web3.utils.toUtf8(info2[5]).replace(/[^ -~]+/g, '');
                var soiltype = web3.utils.toUtf8(info2[6]).replace(/[^ -~]+/g, '')
                console.log(crop + "" + extent + "" + previouscrop + "" + protect + "" + manure + "" + seed + "" + soiltype);
                //LOCATION DECODED
                var farmloc = web3.utils.toUtf8(info[2]).replace(/[^ -~]+/g, '');
                var location = Geohash.decode(farmloc);
                var latitude = location.lat;
                var longitude = location.lon;
                console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                if (stat1 == "Certified") {
                    document.getElementById('SingleApplication').style.display = "none";

                    document.getElementById('ApplicationForm').style.display = "none";

                    document.getElementById('showStatus').style.display = "none";

                    document.getElementById('viewApp').style.display = "none";
                    App.RiceCertificate.getInspectedInfo.call(field).then(function (inspe) {
                        console.log(inspe);
                        //var idate = ins[0];
                        console.log(inspe[0].c)
                        // var idate =  web3.utils.toUtf8(ins[0])
                        var ida = new Date(parseInt(inspe[0].c))
                        var idate = ida.toDateString()
                        var iname = inspe[1]

                        App.RiceCertificate.getCertificationInfo.call(field).then(function (cert) {
                            var cname = cert[0]
                            var fromyr = cert[1].c
                            var toyr = cert[2].c
                            var validity = toyr - fromyr
                            //
                            //Here generate pdf but value doesent exist or we have to get value from bc one byone
                            // App.GeneratePDF();
                            document.getElementById('SingleApplication').style.display = "none";
                            document.getElementById('FinalCertificate').style.display = "block";
                            document.getElementById('mapPrint').style.display = "block";

                            App.RiceCertificate.getShapeArray.call(field)
                                .then(function (v) {
                                    console.log("getting hash for markers. if and else condition. check v");
                                    console.log(v);
                                    var b = web3.utils.toUtf8(v);
                                    console.log("b");
                                    console.log(b);
                                    if (b) {
                                        App.convert(b).then((val) => {
                                            //console.log(latMarker);
                                            //console.log(lonMarker);
                                            console.log('Got:', val)
                                            output = JSON.parse(val);
                                            console.log('GOT SHAPE ARRAY FROM IPFS')
                                            console.log(output.array);
                                            // swal(output)
                                            shapeArray1 = output.array;
                                            document.getElementById('mapPrint').style.display = "block";

                                            // console.log(NewArr.reduce(2));
                                            //Get Lat long Array
                                            var lat, lon, lat1, lon1;
                                            // lat=9.366092
                                            // lon =76.730862
                                            lat = shapeArray1[0][0];
                                            lon = shapeArray1[0][1];

                                            // // lat1=9.366224
                                            // //  lon1 =76.731281
                                            console.log('NewArr')
                                            console.log(lat)

                                            console.log(lon)
                                            //var h =  [];
                                            //h.push(NewArr);
                                            console.log(shapeArray1);
                                            //console.log(h[0][0]);
                                            console.log(shapeArray1.length)


                                            L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h';

                                            var map = L.mapquest.map('mapPrint', {
                                                center: [lat, lon],
                                                layers: L.mapquest.tileLayer('satellite'),
                                                zoom: 18
                                            });

                                            L.marker([lat, lon], {
                                                icon: L.mapquest.icons.marker(),
                                                draggable: false
                                            }).bindPopup('Farm land').addTo(map);

                                            //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                                            //var denverLatLngs = NewArr;
                                            var denverLatLngs = shapeArray1;

                                            //[9.364562, 76.731110],
                                            console.log(denverLatLngs);
                                            L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);

                                            // });
                                        });
                                    }
                                })

                            document.getElementById('fieldID').innerHTML = field;
                            document.getElementById('owns').innerHTML = farm_owner;
                            document.getElementById('add').innerHTML = address;
                            document.getElementById('la').innerHTML = latitude;
                            document.getElementById('long').innerHTML = longitude;
                            document.getElementById('re').innerHTML = requirement;
                            document.getElementById('stnd').innerHTML = standard;
                            document.getElementById('seedsource').innerHTML = seed;
                            document.getElementById('soil').innerHTML = soiltype;
                            document.getElementById('iby').innerHTML = iname;
                            document.getElementById('ida').innerHTML = idate;
                            document.getElementById('cby').innerHTML = cname;
                            document.getElementById('cval').innerHTML = validity + 'years';

                            var size = 100;
                            var data = field;
                            var imgqr = "http://chart.googleapis.com/chart?cht=qr&chs=" + size + "x" + size + "&choe=UTF-8&chld=L|0&chl=" + data;
                            console.log(imgqr)
                            document.getElementById("qr").src = imgqr;

                            if (standard == 'NPOP') {
                                var imgurl = "images/logo.jpg";
                                document.getElementById("logo").src = imgurl;

                            } else {
                                var imgurl = "images/logo2.png";
                                document.getElementById("logo").src = imgurl;

                            }

                            // setTimeout(function () {

                            //     window.print();

                            // }, 7000);
                        })
                    })
                } else {
                    swal('No Certificate Found')
                }
            })
        })

    },
    //------------NOT USED..check??
    viewApplication: function () {
        //application viewed by a farmer
        console.log(account)
        document.getElementById('viewApp').style.display = "block";
        // var fieldInstance;
        App.RiceCertificate.getApplicationCount.call()
            .then(function (v) {
                console.log('GOT FROM BC')
                console.log(v.c)
                var appCount = v;
                var candidatesResults = $("#candidatesResults");
                candidatesResults.empty();
                for (var i = 0; i < appCount; i++) {
                    App.RiceCertificate.myStructs(i).then(function (rice) {
                        console.log(rice);

                        var farm_id = rice[0].c;
                        var farm_owner = rice[1];
                        var address = web3.utils.toUtf8(rice[2]).replace(/[^ -~]+/g, '');

                        //LOCATION DECODED
                        var farmloc = web3.utils.toUtf8(rice[3]).replace(/[^ -~]+/g, '');
                        var location = Geohash.decode(farmloc);
                        var latitude = location.lat;
                        var longitude = location.lon;
                        console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                        var requirement = web3.utils.toUtf8(rice[4]).replace(/[^ -~]+/g, '');
                        var standard = web3.utils.toUtf8(rice[5]).replace(/[^ -~]+/g, '');
                        var account = rice[6]
                        var stat = web3.utils.toUtf8(rice[7]).replace(/[^ -~]+/g, '')
                        console.log(stat);
                        console.log('ID : ' + farm_id + ' , FARMER : ' + farm_owner + ' ,ADDRESS : ' + address + ',REQUIREMENT : ' + requirement + ',STANDARD:' + standard + ',ACCOUNT' + account);
                        // Render candidate Result
                        var candidateTemplate = "<tr><th>" + farm_id + "</th><td>" + farm_owner + "</td><td>" + address + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td>" + requirement + "</td><td>" + standard + "</td><td>" + account + "</td><td>" + stat + "</td></tr>"
                        candidatesResults.append(candidateTemplate);

                        //     // Render candidate ballot option
                        /*        var candidateOption = "<option value='" + farm_id + "' >" + farm_owner + "</ option>"
                                 candidatesSelect.append(candidateOption);
                        */
                    });
                }
            })


    },


    //------------------------------------INSPECTOR-------------------------------------//
    //Displays all appplication as table
    inspectView: function () {

        document.getElementById('searchFarm').style.display = "none";
        document.getElementById('services').style.display = "none";
        document.getElementById('viewApp').style.display = "block";

        App.RiceCertificate.getApplicationCount.call().then(function (v) {
            console.log('GOT FROM BC')
            console.log(v.c)
            var appCount = v;
            var candidatesResults = $("#candidatesResults");
            candidatesResults.empty();
            for (var i = 0; i < appCount; i++) {
                App.RiceCertificate.myStructs(i).then(function (rice) {
                    console.log(rice);

                    var farm_id = rice[0].c;
                    var farm_owner = rice[1];
                    var address = web3.utils.toUtf8(rice[2]).replace(/[^ -~]+/g, '');

                    //LOCATION DECODED
                    var farmloc = web3.utils.toUtf8(rice[3]).replace(/[^ -~]+/g, '');

                    console.log('ID : ' + farm_id + ' , FARMER : ' + farm_owner + ' ,ADDRESS : ' + address);
                    console.log('Farmloc' + farmloc)

                    var requirement = web3.utils.toUtf8(rice[4]).replace(/[^ -~]+/g, '');
                    var standard = web3.utils.toUtf8(rice[5]).replace(/[^ -~]+/g, '');
                    var account = rice[6]
                    var stat = web3.utils.toUtf8(rice[7]).replace(/[^ -~]+/g, '');
                    console.log(',REQUIREMENT : ' + requirement + ',STANDARD:' + standard + ',ACCOUNT' + account + 'STATUS' + stat);
                    // var location = Geohash.decode(farmloc);
                    // var latitude = location.lat;
                    // var longitude = location.lon;
                    // console.log('Latitude : ' + latitude + ',Longitude:' + longitude)
                    //Only pending application viewed to inspector
                    document.getElementById('SingleApplication').style.display = "none";
                    document.getElementById('searchFarm').style.display = "none"
                    // Render applications Submitted
                    var candidateTemplate = "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td>" + requirement + "</td><td>" + standard + "</td><td>" + account + "</td><td><button id='accept' value='" + farm_id + "'  onclick='App.Accept(this.value)'>ACCEPT</button></td></tr>"
                    //<td><button id='reject' value='" + farm_id + "' onclick='App.Reject(this.value)'>REJECT</button></td>
                    candidatesResults.append(candidateTemplate);



                });
            }
        })


    },
    Accept: function (id) {
        console.log('***********************************')
        console.log(id);
        var marker0;
        document.getElementById('services').style.display = "none";
        document.getElementById('viewApp').style.display = "none";
        document.getElementById('searchFarm').style.display = "none";
        document.getElementById('fieldid').value = id;
        //based on id get lat long and details and shw map
        App.RiceCertificate.getInfo.call(id).then(function (info) {
            //    for(var i= 0;i<v.length;i++)
            //      {
            App.RiceCertificate.getextraInfo.call(id).then(function (inf) {
                console.log(inf)
                console.log('GOT FROM BC')
                console.log(info);
                // var farm_id =  web3.utils.toUtf8(rice[0]).replace(/[^ -~]+/g, '');
                var farm_owner = info[0];
                var address = web3.utils.toUtf8(info[1]).replace(/[^ -~]+/g, '');
                var requirement = web3.utils.toUtf8(info[3]).replace(/[^ -~]+/g, '');
                var standard = web3.utils.toUtf8(info[4]).replace(/[^ -~]+/g, '');
                // var account =
                var stat = web3.utils.toUtf8(info[5]).replace(/[^ -~]+/g, '')

                var crop = inf[0];
                var extent = web3.utils.toUtf8(inf[1]).replace(/[^ -~]+/g, '');
                var previouscrop = web3.utils.toUtf8(inf[2]).replace(/[^ -~]+/g, '');
                var protect = web3.utils.toUtf8(inf[3]).replace(/[^ -~]+/g, '');
                var manure = web3.utils.toUtf8(inf[4]).replace(/[^ -~]+/g, '');
                var seed = web3.utils.toUtf8(inf[5]).replace(/[^ -~]+/g, '');
                var soiltype = web3.utils.toUtf8(inf[6]).replace(/[^ -~]+/g, '')
                console.log(crop + "" + extent + "" + previouscrop + "" + protect + "" + manure + "" + seed + "" + soiltype);

                document.getElementById('owner').value = farm_owner;
                document.getElementById('addr').value = address;
                document.getElementById('production').value = requirement;
                document.getElementById('std').value = standard;
                document.getElementById('acc').value = account;
                document.getElementById('stat1').value = stat;
                document.getElementById('crop').value = crop;
                document.getElementById('extent').value = extent;
                document.getElementById('precrop').value = previouscrop;
                document.getElementById('protect').value = protect;
                document.getElementById('manure').value = manure;
                document.getElementById('seed').value = seed;
                document.getElementById('soil').value = soiltype;

                // console.log(info);
                console.log(info[2]);
                //LOCATION DECODED
                var farmloc = web3.utils.toUtf8(info[2]).replace(/[^ -~]+/g, '');
                var location = Geohash.decode(farmloc);
                var latitude = location.lat;
                var longitude = location.lon;
                document.getElementById('latit').value = latitude;
                document.getElementById('longit').value = longitude;
                console.log('Latitude : ' + latitude + ',Longitude:' + longitude)
                if (stat === "Pending") {
                    document.getElementById('SingleApplication').style.display = "block";
                    //Shape in Inspector Page
                    App.RiceCertificate.getShapeArray.call(id)
                        .then(function (v) {
                            console.log("getting hash for markers. if and else condition. check v");
                            console.log(v);
                            var b = web3.utils.toUtf8(v);
                            console.log("b");
                            console.log(b);
                            if (b) {
                                App.convert(b).then((val) => {
                                    //console.log(latMarker);
                                    //console.log(lonMarker);
                                    console.log('Got:', val)
                                    output = JSON.parse(val);
                                    console.log('GOT SHAPE ARRAY FROM IPFS')
                                    console.log(output.array);
                                    // swal(output)
                                    shapeArray1 = output.array;
                                    document.getElementById('mapFrame').style.display = "block";

                                    // console.log(NewArr.reduce(2));
                                    //Get Lat long Array
                                    var lat, lon, lat1, lon1;
                                    // lat=9.366092
                                    // lon =76.730862
                                    lat = shapeArray1[0][0];
                                    lon = shapeArray1[0][1];

                                    // // lat1=9.366224
                                    // //  lon1 =76.731281
                                    console.log('NewArr')
                                    console.log(lat)

                                    console.log(lon)
                                    //var h =  [];
                                    //h.push(NewArr);
                                    console.log(shapeArray1);
                                    //console.log(h[0][0]);
                                    console.log(shapeArray1.length)


                                    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

                                    var map = L.mapquest.map('mapFrame', {
                                        center: [lat, lon],
                                        layers: L.mapquest.tileLayer('satellite'),
                                        zoom: 18
                                    });

                                    L.marker([lat, lon], {
                                        icon: L.mapquest.icons.marker(),
                                        draggable: false
                                    }).bindPopup('Farm land').addTo(map);

                                    //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                                    //var denverLatLngs = NewArr;
                                    var denverLatLngs = shapeArray1;

                                    //[9.364562, 76.731110],
                                    console.log(denverLatLngs);
                                    L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);

                                });
                            }
                        })
                    document.getElementById('addinspect').style.display = "block"


                } else if (stat === "Inspected") {
                    document.getElementById('SingleApplication').style.display = "block";
                    App.RiceCertificate.getShapeArray.call(id)
                        .then(function (v) {
                            console.log("getting hash for markers. if and else condition. check v");
                            console.log(v);
                            var b = web3.utils.toUtf8(v);
                            console.log("b");
                            console.log(b);
                            if (b) {
                                App.convert(b).then((val) => {
                                    //console.log(latMarker);
                                    //console.log(lonMarker);
                                    console.log('Got:', val)
                                    output = JSON.parse(val);
                                    console.log('GOT SHAPE ARRAY FROM IPFS')
                                    console.log(output.array);
                                    // swal(output)
                                    shapeArray1 = output.array;
                                    document.getElementById('mapFrame').style.display = "block";

                                    // console.log(NewArr.reduce(2));
                                    //Get Lat long Array
                                    var lat, lon, lat1, lon1;
                                    // lat=9.366092
                                    // lon =76.730862
                                    lat = shapeArray1[0][0];
                                    lon = shapeArray1[0][1];

                                    // // lat1=9.366224
                                    // //  lon1 =76.731281
                                    console.log('NewArr')
                                    console.log(lat)

                                    console.log(lon)
                                    //var h =  [];
                                    //h.push(NewArr);
                                    console.log(shapeArray1);
                                    //console.log(h[0][0]);
                                    console.log(shapeArray1.length)


                                    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

                                    var map = L.mapquest.map('mapFrame', {
                                        center: [lat, lon],
                                        layers: L.mapquest.tileLayer('satellite'),
                                        zoom: 18
                                    });

                                    L.marker([lat, lon], {
                                        icon: L.mapquest.icons.marker(),
                                        draggable: false
                                    }).bindPopup('Farm land').addTo(map);

                                    //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                                    //var denverLatLngs = NewArr;
                                    var denverLatLngs = shapeArray1;

                                    //[9.364562, 76.731110],
                                    console.log(denverLatLngs);
                                    L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);

                                });
                            }
                        })

                    document.getElementById('inspect').style.display = "block"
                    App.RiceCertificate.getInspectedInfo.call(id).then(function (ins) {
                        console.log(ins);
                        var ida = new Date(parseInt(ins[0].c))
                        var idate = ida.toDateString()
                        // var idate =  web3.utils.toUtf8(ins[0])
                        var iname = ins[1];
                        document.getElementById('idate3').value = idate
                        document.getElementById('iname3').value = iname
                    });


                } else if (stat === "Certified") {
                    App.RiceCertificate.getInspectedInfo.call(id).then(function (ins) {
                        console.log(ins);
                        var ida = new Date(parseInt(ins[0].c))
                        var idate = ida.toDateString()
                        // var idate =  web3.utils.toUtf8(ins[0])
                        var iname = ins[1];
                        App.RiceCertificate.getCertificationInfo.call(id).then(function (cert) {
                            var cname = cert[0]
                            var fromyr = cert[1].c
                            var toyr = cert[2].c
                            var validity = toyr - fromyr


                            document.getElementById('SingleApplication').style.display = "none";
                            if (swal('Certification Done')) {

                                document.getElementById('inspect').style.display = "none"
                                document.getElementById('addinspect').style.display = "block"

                                document.getElementById('FinalCertificate').style.display = "block"
                                document.getElementById('farm').innerHTML = id;
                                document.getElementById('owns').innerHTML = farm_owner;
                                document.getElementById('add').innerHTML = address;
                                document.getElementById('la').innerHTML = latitude;
                                document.getElementById('long').innerHTML = longitude;
                                document.getElementById('re').innerHTML = requirement;
                                document.getElementById('stnd').innerHTML = standard;
                                document.getElementById('seedsource').innerHTML = seed;
                                document.getElementById('soil').innerHTML = soiltype;
                                document.getElementById('iby').innerHTML = iname;
                                document.getElementById('ida').innerHTML = idate;
                                document.getElementById('cby').innerHTML = cname;
                                document.getElementById('cval').innerHTML = validity + 'years';

                                //document.getElementById('mapSh').style.display = "block";
                                document.getElementById('contentqr').style.display = "block";

                                var size = 100;
                                var data = id;
                                var imgqr = "http://chart.googleapis.com/chart?cht=qr&chs=" + size + "x" + size + "&choe=UTF-8&chld=L|0&chl=" + data;
                                console.log(imgqr)
                                document.getElementById("qr").src = imgqr;

                                if (standard == 'NPOP') {
                                    var imgurl = "images/logo.jpg";
                                    document.getElementById("logo").src = imgurl;

                                } else {
                                    var imgurl = "images/logo2.png";
                                    document.getElementById("logo").src = imgurl;

                                }
                                App.RiceCertificate.getShapeArray.call(id)
                                    .then(function (v) {
                                        console.log("getting hash for markers. if and else condition. check v");
                                        console.log(v);
                                        var b = web3.utils.toUtf8(v);
                                        console.log("b");
                                        console.log(b);
                                        if (b) {
                                            App.convert(b).then((val) => {
                                                console.log('Got:', val)
                                                output = JSON.parse(val);
                                                console.log('GOT SHAPE ARRAY FROM IPFS')
                                                console.log(output.array);
                                                // swal(output)
                                                shapeArray1 = output.array;
                                                document.getElementById('mapSh').style.display = "block";

                                                // console.log(NewArr.reduce(2));
                                                //Get Lat long Array
                                                var lat, lon, lat1, lon1;
                                                // lat=9.366092
                                                // lon =76.730862
                                                lat = shapeArray1[0][0];
                                                lon = shapeArray1[0][1];

                                                // // lat1=9.366224
                                                // //  lon1 =76.731281
                                                console.log('NewArr')
                                                console.log(lat)

                                                console.log(lon)
                                                //var h =  [];
                                                //h.push(NewArr);
                                                console.log(shapeArray1);
                                                //console.log(h[0][0]);
                                                console.log(shapeArray1.length)


                                                L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

                                                var map = L.mapquest.map('mapSh', {
                                                    center: [lat, lon],
                                                    layers: L.mapquest.tileLayer('satellite'),
                                                    zoom: 18
                                                });

                                                L.marker([lat, lon], {
                                                    icon: L.mapquest.icons.marker(),
                                                    draggable: false
                                                }).bindPopup('Farm land').addTo(map);

                                                //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                                                //var denverLatLngs = NewArr;
                                                var denverLatLngs = shapeArray1;

                                                //[9.364562, 76.731110],
                                                console.log(denverLatLngs);
                                                L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);

                                            });
                                        }
                                    })

                            }
                        })
                    })
                }


                // }
                //SET status as inspected
                // }
            })
        })




    },
    //Not Done
    Reject: function (id) {
        console.log('Set Status:REJECTED');
        console.log(id);
        // var fieldID =  web3.utils.toUtf8(id).replace(/[^ -~]+/g, '');
        // console.log(fieldID);
        // App.inspectView();
    },
    //AFTER Accepting inspect details added
    InspectDetails: function () {
        var id = document.getElementById('fieldid').value;
        var idate = document.getElementById('idate').value;
        var inspectdate = Date.parse(idate);
        console.log(inspectdate);
        var inspector = document.getElementById('iname').value;
        console.log(id + ',' + inspectdate + ',' + inspector);
        var status = 'Inspected'
        var owner = document.getElementById('owner').value;
        var addr = document.getElementById('addr').value;
        var production = document.getElementById('production').value;
        var std = document.getElementById('std').value;
        var acc = document.getElementById('acc').value;
        var crop = document.getElementById('crop').value;
        var extent = document.getElementById('extent').value;
        var precrop = document.getElementById('precrop').value;
        var protect = document.getElementById('protect').value;
        var manure = document.getElementById('manure').value;
        var seed = document.getElementById('seed').value;
        var soiltype = document.getElementById('soil').value;

        console.log(status);
        var lat = document.getElementById('latit').value
        var lng = document.getElementById('longit').value
        var encodePlace = Geohash.encode(lat, lng, [9])

        //ADD to BC new struct
        App.RiceCertificate.addInspectDetails(id, inspectdate, inspector, {
            from: account
        }) // addApplication is a function to be defined in the contract
            .then(function (v) {
                console.log(v)
                console.log('added inspector details')
                App.RiceCertificate.updateFarm(id, owner, addr, encodePlace, production, std, status, {
                    from: account
                }) // addApplication is a function to be defined in the contract
                    .then(function (v) {
                        console.log(v)

                        if (swal('added status update ..INSPECTED')) {
                            window.location.reload();
                        }

                    })
            })
    },
    //Search an id and find details not necessary
    Inspection: function () {
        document.getElementById('searchFarm').style.display = "block"
        document.getElementById('services').style.display = "none"

    },
    InspectorSearchFound: function () {
        var fid = document.getElementById('farmid').value;
        //GET SHAPE ARRAY
        console.log(fid);
        App.RiceCertificate.getInfo.call(fid).then(function (info) {
            //    for(var i= 0;i<v.length;i++)
            //      {

            document.getElementById('farmDetails').style.display = "block"
            console.log('GOT FROM BC')
            console.log(info);
            // var farm_id =  web3.utils.toUtf8(rice[0]).replace(/[^ -~]+/g, '');
            var farm_owner = info[0];
            var address = web3.utils.toUtf8(info[1]).replace(/[^ -~]+/g, '');
            var requirement = web3.utils.toUtf8(info[3]).replace(/[^ -~]+/g, '');
            var standard = web3.utils.toUtf8(info[4]).replace(/[^ -~]+/g, '');
            // var account = info[5]
            var stat = web3.utils.toUtf8(info[5]).replace(/[^ -~]+/g, '')
            document.getElementById('owner1').value = farm_owner;
            document.getElementById('addr1').value = address;
            document.getElementById('production1').value = requirement;
            document.getElementById('std1').value = standard;
            document.getElementById('acc1').value = account;
            console.log(stat)
            document.getElementById('stat2').value = stat;

            // document.getElementById('fieldid').value = id;
            // console.log(info);
            console.log(info[2]);
            //LOCATION DECODED
            var farmloc = web3.utils.toUtf8(info[2]).replace(/[^ -~]+/g, '');
            var location = Geohash.decode(farmloc);
            var latitude = location.lat;
            var longitude = location.lon;
            console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

            document.getElementById('latit1').value = latitude
            document.getElementById('longit1').value = longitude
            if (stat == "Inspected") {
                document.getElementById('inspectionDetails').style.display = "block";
                //  document.getElementById('mapFrame2').style.display = "block";
                App.RiceCertificate.getShapeArray.call(fid)
                    .then(function (v) {
                        console.log("getting hash for markers. if and else condition. check v");
                        console.log(v);
                        var b = web3.utils.toUtf8(v);
                        console.log("b");
                        console.log(b);
                        if (b) {
                            App.convert(b).then((val) => {
                                //console.log(latMarker);
                                //console.log(lonMarker);
                                console.log('Got:', val)
                                output = JSON.parse(val);
                                console.log('GOT SHAPE ARRAY FROM IPFS')
                                console.log(output.array);
                                // swal(output)
                                shapeArray1 = output.array;
                                document.getElementById('mapFrame2').style.display = "block";

                                // console.log(NewArr.reduce(2));
                                //Get Lat long Array
                                var lat, lon, lat1, lon1;
                                // lat=9.366092
                                // lon =76.730862
                                lat = shapeArray1[0][0];
                                lon = shapeArray1[0][1];

                                // // lat1=9.366224
                                // //  lon1 =76.731281
                                console.log('NewArr')
                                console.log(lat)

                                console.log(lon)
                                //var h =  [];
                                //h.push(NewArr);
                                console.log(shapeArray1);
                                //console.log(h[0][0]);
                                console.log(shapeArray1.length)


                                L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

                                var map = L.mapquest.map('mapFrame2', {
                                    center: [lat, lon],
                                    layers: L.mapquest.tileLayer('satellite'),
                                    zoom: 18
                                });

                                L.marker([lat, lon], {
                                    icon: L.mapquest.icons.marker(),
                                    draggable: false
                                }).bindPopup('Farm land').addTo(map);

                                //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                                //var denverLatLngs = NewArr;
                                var denverLatLngs = shapeArray1;

                                //[9.364562, 76.731110],
                                console.log(denverLatLngs);
                                L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);

                            });
                        }
                    })


                App.RiceCertificate.getInspectedInfo.call(fid).then(function (ins) {
                    console.log(ins);
                    var ida = new Date(parseInt(ins[0].c))
                    var idate = ida.toDateString()
                    // var idate =  web3.utils.toUtf8(ins[0])
                    var iname = ins[1];
                    document.getElementById('idate1').value = idate
                    document.getElementById('iname1').value = iname


                })
            } else if (stat == "Certified") {
                //get certification from bc
                console.log("certified")
            }


        })


        // view farm details once again along with inspection details and set status of farmer to verified
    },
    /*-----------------------------------Certifier-------------------------------------*/
    //Show all applications in table format
    viewFinalApplication: function () {
        // document.getElementById('Certify').style.display = "block"

        document.getElementById('services').style.display = "none"
        document.getElementById('viewApp').style.display = "block";

        App.RiceCertificate.getApplicationCount.call().then(function (v) {
            console.log('GOT FROM BC')
            console.log(v.c)
            var appCount = v;
            var candidatesResults = $("#candidatesResults");
            candidatesResults.empty();
            for (var i = 0; i < appCount; i++) {
                App.RiceCertificate.myStructs(i).then(function (rice) {
                    console.log(rice);

                    var farm_id = rice[0].c;
                    var farm_owner = rice[1];
                    var address = web3.utils.toUtf8(rice[2]).replace(/[^ -~]+/g, '');

                    //LOCATION DECODED
                    // var farmloc =  web3.utils.toUtf8(rice[3]).replace(/[^ -~]+/g, '');
                    // var location = Geohash.decode(farmloc);
                    // var latitude = location.lat;
                    // var longitude = location.lon;
                    // console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                    var requirement = web3.utils.toUtf8(rice[4]).replace(/[^ -~]+/g, '');
                    var standard = web3.utils.toUtf8(rice[5]).replace(/[^ -~]+/g, '');
                    var account = rice[6]
                    var stat = web3.utils.toUtf8(rice[7]).replace(/[^ -~]+/g, '');
                    console.log('ID : ' + farm_id + ' , FARMER : ' + farm_owner + ' ,ADDRESS : ' + address + ',REQUIREMENT : ' + requirement + ',STANDARD:' + standard + ',ACCOUNT' + account);
                    // if (stat == 'Inspected') {
                    //Only pending application viewed to inspector
                    document.getElementById('services').style.display = "none";
                    // Render applications Submitted
                    var candidateTemplate = "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td>" + requirement + "</td><td>" + standard + "</td><td>" + account + "</td><td><button value='" + farm_id + "'  onclick='App.Approve(this.value)' id='accept'>APPROVE</button></td></tr>"
                    // <td><button id='reject' value='" + farm_id + "' onclick='App.Rejected(this.value)'>REJECT</button></td>   var candidateTemplate  =  "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td><button class ='btn-adm' onclick = 'App.Accept("+farm_id+','+farm_owner+")'</button>Buy<button class ='btn-adm' onclick = 'App.accept("+farm_id+")'</button>Sell</td></tr>"

                    candidatesResults.append(candidateTemplate);

                });
            }
        })





    },
    Approve: function (id) {
        console.log('***********************************')
        console.log(id);
        var marker0;
        document.getElementById('services').style.display = "none";
        document.getElementById('viewApp').style.display = "none";
        document.getElementById('fieldid').value = id;
        App.RiceCertificate.getInfo.call(id).then(function (info) {
            console.log('GOT FROM BC')
            console.log(info);
            var farm_owner = info[0];
            var address = web3.utils.toUtf8(info[1]).replace(/[^ -~]+/g, '');
            var requirement = web3.utils.toUtf8(info[3]).replace(/[^ -~]+/g, '');
            var standard = web3.utils.toUtf8(info[4]).replace(/[^ -~]+/g, '');
            var stat1 = web3.utils.toUtf8(info[5]).replace(/[^ -~]+/g, '')
            App.RiceCertificate.getextraInfo.call(id).then(function (inf) {

                var crop = inf[0];
                var extent = web3.utils.toUtf8(inf[1]).replace(/[^ -~]+/g, '');
                var previouscrop = web3.utils.toUtf8(inf[2]).replace(/[^ -~]+/g, '');
                var protect = web3.utils.toUtf8(inf[3]).replace(/[^ -~]+/g, '');
                var manure = web3.utils.toUtf8(inf[4]).replace(/[^ -~]+/g, '');
                var seed = web3.utils.toUtf8(inf[5]).replace(/[^ -~]+/g, '');
                var soiltype = web3.utils.toUtf8(inf[6]).replace(/[^ -~]+/g, '')
                console.log('Farm Details');
                console.log(crop + "" + extent + "" + previouscrop + "" + protect + "" + manure + "" + seed + "" + soiltype);
                console.log('SoilType:' + soiltype);
                document.getElementById('owner').value = farm_owner;
                document.getElementById('addr').value = address;
                document.getElementById('production').value = requirement;
                document.getElementById('std').value = standard;
                document.getElementById('acc').value = account;
                document.getElementById('stat1').value = stat1;

                document.getElementById('crop').value = crop;
                document.getElementById('extent').value = extent;
                document.getElementById('precrop').value = previouscrop;
                document.getElementById('protect').value = protect;
                document.getElementById('manure').value = manure;
                document.getElementById('seed').value = seed;
                document.getElementById('soil1').value = soiltype;

                // document.getElementById('fieldid').value = id;
                // console.log(info);
                console.log(info[2]);
                //LOCATION DECODED
                var farmloc = web3.utils.toUtf8(info[2]).replace(/[^ -~]+/g, '');
                var location = Geohash.decode(farmloc);
                var latitude = location.lat;
                var longitude = location.lon;
                document.getElementById('latit').value = latitude;
                document.getElementById('longit').value = longitude;
                console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                if (stat1 == "Inspected") {
                    document.getElementById('SingleApplication1').style.display = "block";

                    App.RiceCertificate.getShapeArray.call(id)
                        .then(function (v) {
                            console.log("getting hash for markers. if and else condition. check v");
                            console.log(v);
                            var b = web3.utils.toUtf8(v);
                            console.log("b");
                            console.log(b);
                            if (b) {
                                App.convert(b).then((val) => {
                                    //console.log(latMarker);
                                    //console.log(lonMarker);
                                    console.log('Got:', val)
                                    output = JSON.parse(val);
                                    console.log('GOT SHAPE ARRAY FROM IPFS')
                                    console.log(output.array);
                                    // swal(output)
                                    shapeArray1 = output.array;
                                    document.getElementById('mapFrame').style.display = "block";

                                    // console.log(NewArr.reduce(2));
                                    //Get Lat long Array
                                    var lat, lon, lat1, lon1;
                                    // lat=9.366092
                                    // lon =76.730862
                                    lat = shapeArray1[0][0];
                                    lon = shapeArray1[0][1];

                                    // // lat1=9.366224
                                    // //  lon1 =76.731281
                                    console.log('NewArr')
                                    console.log(lat)

                                    console.log(lon)
                                    //var h =  [];
                                    //h.push(NewArr);
                                    console.log(shapeArray1);
                                    //console.log(h[0][0]);
                                    console.log(shapeArray1.length)


                                    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

                                    var map = L.mapquest.map('mapFrame', {
                                        center: [lat, lon],
                                        layers: L.mapquest.tileLayer('satellite'),
                                        zoom: 18
                                    });

                                    L.marker([lat, lon], {
                                        icon: L.mapquest.icons.marker(),
                                        draggable: false
                                    }).bindPopup('Farm land').addTo(map);

                                    //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                                    //var denverLatLngs = NewArr;
                                    var denverLatLngs = shapeArray1;

                                    //[9.364562, 76.731110],
                                    console.log(denverLatLngs);
                                    L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);

                                });
                            }
                        })



                    App.RiceCertificate.getInspectedInfo.call(id).then(function (ins) {
                        console.log(ins);
                        console.log(ins[0].c)
                        var ida = new Date(parseInt(ins[0].c))
                        var idate = ida.toDateString()
                        var iname = ins[1]
                        document.getElementById('idate2').value = idate
                        document.getElementById('iname2').value = iname

                        document.getElementById('Certify').style.display = "block";
                        var d = new Date()
                        var yr = d.getFullYear()
                        console.log(yr)
                        var select1 = document.getElementById('fromyr')
                        var opt1 = document.createElement('option')
                        opt1.value = yr
                        opt1.innerHTML = yr
                        select1.appendChild(opt1)
                        // var max = yr + 2
                        var min = yr + 1
                        var max = 2035
                        var select = document.getElementById('toyr')
                        for (var i = min; i <= max; i++) {
                            var opt = document.createElement('option')
                            opt.value = i
                            opt.innerHTML = i
                            select.appendChild(opt)
                        }


                    })
                } else if (stat1 == "Certified") {

                    //document.getElementById('SingleApplication1').style.display = "none";

                    if (swal('CERTIFICATION Already DONE')) {

                        App.RiceCertificate.getInspectedInfo.call(id).then(function (inspe) {
                            console.log(inspe);
                            //var idate = ins[0];
                            console.log(inspe[0].c)
                            // var idate =  web3.utils.toUtf8(ins[0])
                            var ida = new Date(parseInt(inspe[0].c))
                            var idate = ida.toDateString()
                            var iname = inspe[1]

                            App.RiceCertificate.getCertificationInfo.call(id).then(function (cert) {
                                var cname = cert[0]
                                var fromyr = cert[1].c
                                var toyr = cert[2].c
                                var validity = toyr - fromyr
                                //
                                //Here generate pdf but value doesent exist or we have to get value from bc one byone
                                // App.GeneratePDF();
                                //document.getElementById('SingleApplication1').style.display = "none";

                                document.getElementById('FinalCertificate').style.display = "block";
                                document.getElementById('farm').innerHTML = id;
                                document.getElementById('owns').innerHTML = farm_owner;
                                document.getElementById('add').innerHTML = address;
                                // document.getElementById('la').innerHTML = latitude;
                                // document.getElementById('long').innerHTML = longitude;
                                document.getElementById('re').innerHTML = requirement;
                                document.getElementById('stnd').innerHTML = standard;
                                document.getElementById('iby').innerHTML = iname;
                                document.getElementById('ida').innerHTML = idate;
                                document.getElementById('cby').innerHTML = cname;
                                document.getElementById('cval').innerHTML = validity + 'years';

                                document.getElementById('mapSh').style.display = "block";
                                document.getElementById('seedsource').innerHTML = seed;
                                document.getElementById('soiltype2').innerHTML = soiltype;


                                document.getElementById('contentqr').style.display = "block";
                                var size = 100;
                                var data = id;
                                // https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example
                                var imgqr = "http://chart.googleapis.com/chart?cht=qr&chs=" + size + "x" + size + "&choe=UTF-8&chld=L|0&chl=" + data;
                                console.log(imgqr)
                                document.getElementById("qr").src = imgqr;
                                if (standard == 'NPOP') {
                                    var imgurl = "images/logo.jpg";
                                    document.getElementById("logo").src = imgurl;

                                } else {
                                    var imgurl = "images/logo2.png";
                                    document.getElementById("logo").src = imgurl;

                                }

                                App.RiceCertificate.getShapeArray.call(id)
                                    .then(function (v) {
                                        console.log("getting hash for markers. if and else condition. check v");
                                        console.log(v);
                                        var b = web3.utils.toUtf8(v);
                                        console.log("b");
                                        console.log(b);
                                        if (b) {
                                            App.convert(b).then((val) => {
                                                //console.log(latMarker);
                                                //console.log(lonMarker);
                                                console.log('Got:', val)
                                                output = JSON.parse(val);
                                                console.log('GOT SHAPE ARRAY FROM IPFS')
                                                console.log(output.array);
                                                // swal(output)
                                                shapeArray1 = output.array;
                                                document.getElementById('mapFrame').style.display = "block";

                                                // console.log(NewArr.reduce(2));
                                                //Get Lat long Array
                                                var lat, lon, lat1, lon1;
                                                // lat=9.366092
                                                // lon =76.730862
                                                lat = shapeArray1[0][0];
                                                lon = shapeArray1[0][1];

                                                // // lat1=9.366224
                                                // //  lon1 =76.731281
                                                console.log('NewArr')
                                                console.log(lat)

                                                console.log(lon)
                                                //var h =  [];
                                                //h.push(NewArr);
                                                console.log(shapeArray1);
                                                //console.log(h[0][0]);
                                                console.log(shapeArray1.length)


                                                L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

                                                var map = L.mapquest.map('mapFrame', {
                                                    center: [lat, lon],
                                                    layers: L.mapquest.tileLayer('satellite'),
                                                    zoom: 18
                                                });

                                                L.marker([lat, lon], {
                                                    icon: L.mapquest.icons.marker(),
                                                    draggable: false
                                                }).bindPopup('Farm land').addTo(map);

                                                //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                                                //var denverLatLngs = NewArr;
                                                var denverLatLngs = shapeArray1;

                                                //[9.364562, 76.731110],
                                                console.log(denverLatLngs);
                                                L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);

                                            });
                                        }
                                    })
                            });


                            setTimeout(function () {

                                window.print();
                                //window.close();

                            }, 6000);

                        })

                    }
                } else {

                    document.getElementById('inspectDetails').style.display = "none";

                    if (swal('Not Inspected')) {
                        window.location.reload();
                    }
                }
            })
        })
    },
    certifyFarm: function () {
        //details,set status as certified and show pdf
        var farm_id = document.getElementById('fieldid').value
        var cname = document.getElementById('cname').value
        var fromyr = document.getElementById('fromyr').value
        var toyr = document.getElementById('toyr').value
        console.log(farm_id + ',' + cname + ',' + fromyr + ',' + toyr)
        var owner = document.getElementById('owner').value;
        var addr = document.getElementById('addr').value;
        var production = document.getElementById('production').value;
        var std = document.getElementById('std').value;
        var acc = document.getElementById('acc').value;
        var crop = document.getElementById('crop').value;
        var extent = document.getElementById('extent').value;
        var precrop = document.getElementById('precrop').value;
        var protect = document.getElementById('protect').value;
        var manure = document.getElementById('manure').value;
        var seed = document.getElementById('seed').value;
        var soiltype = document.getElementById('soil1').value;
        var idatef = document.getElementById('idate2').value;
        var inamef = document.getElementById('iname2').value;
        console.log(status);

        var lat = document.getElementById('latit').value
        var lng = document.getElementById('longit').value
        var encodePlace = Geohash.encode(lat, lng, [9])
        var validity = toyr - fromyr
        console.log(validity + 'years')

        //ADD to BC new struct
        App.RiceCertificate.addCertifierDetails(farm_id, cname, fromyr, toyr, {
            from: account
            // gas: 3000000,
            // value: web3.toWei(1, 'ether')
        }) // addApplication is a function to be defined in the contract
            .then(function (v) {
                console.log(v)
                console.log('added certification details')
                var status = 'Certified'
                App.RiceCertificate.updateFarm(farm_id, owner, addr, encodePlace, production, std, status, {
                    from: account
                    // gas: 3000000,
                    // value: web3.toWei(1, 'ether')
                }).then(function (v) {
                    console.log('Common Details and status updated')
                    console.log(v)

                    if (swal('CERTIFIED')) {

                        document.getElementById('SingleApplication1').style.display = "none";

                        document.getElementById('FinalCertificate').style.display = "block";
                        document.getElementById('farm').innerHTML = farm_id;
                        document.getElementById('owns').innerHTML = owner;
                        document.getElementById('add').innerHTML = addr;
                        // document.getElementById('la').innerHTML = lat;
                        // document.getElementById('long').innerHTML = lng;
                        document.getElementById('re').innerHTML = production;
                        document.getElementById('stnd').innerHTML = std;
                        document.getElementById('iby').innerHTML = inamef;
                        document.getElementById('ida').innerHTML = idatef;
                        document.getElementById('cby').innerHTML = cname;
                        document.getElementById('cval').innerHTML = validity + 'years';

                        document.getElementById('mapSh').style.display = "block";
                        document.getElementById('seedsource').innerHTML = seed;
                        document.getElementById('soiltype2').innerHTML = soiltype;

                        document.getElementById('contentqr').style.display = "block";
                        var size = 100;
                        var data = farm_id;
                        var imgqr = "http://chart.googleapis.com/chart?cht=qr&chs=" + size + "x" + size + "&choe=UTF-8&chld=L|0&chl=" + data;
                        console.log(imgqr)
                        document.getElementById("qr").src = imgqr;
                        if (std == 'NPOP') {
                            var imgurl = "images/logo.jpg";
                            document.getElementById("logo").src = imgurl;

                        } else {
                            var imgurl = "images/logo2.png";
                            document.getElementById("logo").src = imgurl;

                        }
                        App.RiceCertificate.getShapeArray.call(farm_id)
                            .then(function (v) {
                                console.log("getting hash for markers. if and else condition. check v");
                                console.log(v);
                                var b = web3.utils.toUtf8(v);
                                console.log("b");
                                console.log(b);
                                if (b) {
                                    App.convert(b).then((val) => {
                                        //         //console.log(latMarker);
                                        //console.log(lonMarker);
                                        console.log('Got:', val)
                                        output = JSON.parse(val);
                                        console.log('GOT SHAPE ARRAY FROM IPFS')
                                        console.log(output.array);
                                        // swal(output)
                                        shapeArray1 = output.array;
                                        document.getElementById('mapSh').style.display = "block";

                                        // console.log(NewArr.reduce(2));
                                        //Get Lat long Array
                                        var lat, lon, lat1, lon1;
                                        // lat=9.366092
                                        // lon =76.730862
                                        lat = shapeArray1[0][0];
                                        lon = shapeArray1[0][1];

                                        // // lat1=9.366224
                                        // //  lon1 =76.731281
                                        console.log('NewArr')
                                        console.log(lat)

                                        console.log(lon)
                                        //var h =  [];
                                        //h.push(NewArr);
                                        console.log(shapeArray1);
                                        //console.log(h[0][0]);
                                        console.log(shapeArray1.length)


                                        L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

                                        var map = L.mapquest.map('mapSh', {
                                            center: [lat, lon],
                                            layers: L.mapquest.tileLayer('satellite'),
                                            zoom: 18
                                        });

                                        L.marker([lat, lon], {
                                            icon: L.mapquest.icons.marker(),
                                            draggable: false
                                        }).bindPopup('Farm land').addTo(map);

                                        //L.circle([9.366092, 76.730862], { radius: 20000 }).addTo(map);
                                        //var denverLatLngs = NewArr;
                                        var denverLatLngs = shapeArray1;

                                        //[9.364562, 76.731110],
                                        console.log(denverLatLngs);
                                        L.polygon(denverLatLngs, { color: 'black', stroke: true, weight: 1 }).addTo(map);

                                    });
                                }
                            })



                        // setTimeout(function () {

                        //     window.print();
                        //     //window.close();

                        // }, 6000);
                    }
                    //})
                })
            })

    },
    convert: async (v) => {
        var d = await ipfs.cat(v);
        return d;
    },
    /*GeneratePDF: function () {

        var doc = new jsPDF()
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML($('#FinalCertificate').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.save('sample-file.pdf');

    }*/
    getBase64Image: function (img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
    },
    downloadAsPDF: function () {
        window.print();

        //images overlapp on pdf download so just commented
        // var data = document.getElementById('pdfTable');
        // html2canvas(data,{ letterRendering: 1, useCORS: true}).then(canvas => {
        //   var imgWidth = 208;
        //   var imgHeight = canvas.height * imgWidth / canvas.width;
        //   const contentDataURL = canvas.toDataURL('image/png')
        //   let pdf = new jsPDF('p', 'mm', 'a4');
        //   var position = 0;
        //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        //   pdf.save('Farm-Certification.pdf');
        // });
    }

};

window.addEventListener('load', function () {
    ipfs = ipfsAPI({
        // host: 'localhost',
        host: 'ipfs.infura.io',
        port: '5001',
        protocol: 'http'
    });
    // host: 'ipfs.infura.io'
    App.load();
});