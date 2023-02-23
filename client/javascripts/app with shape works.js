// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css';

// Import libraries we need.
import {
    default as Web3
} from 'web3';
import {
    default as contract
} from 'truffle-contract';
import * as d3 from 'd3';
var path = require('path');
var $ = require('jquery');

var Geohash = require('latlon-geohash')
const cryptoRandomString = require('crypto-random-string')
import * as jsPDF from 'jspdf';
// Import our contract artifacts and turn them into usable abstractions.
import ricecertificate_artifacts from '../../build/contracts/RiceCertificate.json'
import myNFT_artifacts from '../../build/contracts/MyNFToken.json'
import swal from 'sweetalert'
const GPS = require('gps-module');
 
const gps = new GPS();
var d3 = require("d3");
// RiceCertificate is our usable abstraction, which we'll use through the code below.
var RiceCertificate = contract(ricecertificate_artifacts)
var NFT = contract(myNFT_artifacts);
var marker0
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var tokenArr = [];
window.App = {
    start: function () {
        var self = this;

        // Bootstrap the RiceCertificate abstraction for Use.
        RiceCertificate.setProvider(web3.currentProvider);
        NFT.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert('There was an error fetching your accounts.');
                return;
            }

            if (accs.length == 0) {
                alert(
                    'Couldnt get any accounts! Make sure your Ethereum client is configured correctly.'
                );
                return;
            }

            accounts = accs;
            account = accounts[0];

gps.on('data', (location) => {
console.log("LOACTIO")
  console.log(location);
});
            //var mapq= 'http://www.mapquestapi.com/directions/v2/route?key=0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h';
            var mapq = 'http://www.mapquestapi.com/search/v2/corridor?key=0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h&line=40.078811,-76.730422,41.078811,-74.730422,40.078811,-74.730422,39.961879,-76.730422,39.961879,-76.730422&maxMatches=4';

            // var resultorgin = 'https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=' + org1 + '&app_id=V8PmOJ1eaDD5jv7pOH7x&app_code=o85LAzy5i0-pCv4tmvqwMA&gen=8';
            $.ajax({
                url: mapq,
                success: function (result1) {
console.log('sfds');
                    console.log(result1);
                    // console.log(result1.results[0].locations[0].displayLatLng.lng);

                }
            });


            $(document).ready(function () {


 
                jQuery('#indexpage').append(function () {

                    self.login(account);
                });
                
                    jQuery('#homepage1').append(function () {
                      console.log("loginPage");
                      var shapeArray = new Array();
                      $("#saveArray").click(function(){
                        console.log(document.getElementById('latit').value);
                        console.log(document.getElementById('longit').value);
                        console.log('save to Array')
                      
                        var lt = document.getElementById('latit').value;
                        var long = document.getElementById('longit').value;
                        var nd = new Array();
                    //   nd.lat = lt;
                    //   nd.lng = long;
                        nd.push(lt,long);
                        shapeArray = Array.prototype.concat.apply([nd], [shapeArray]);
                        console.log(shapeArray);
                      
                        document.getElementById('latlong').style.display="none"
                        alert("The paragraph was clicked.");

			
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
						center: [lat,lon],
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
					L.polygon(denverLatLngs, { color: 'black',stroke:true,weight:1}).addTo(map);

			

			

                      });
                      $("#addMore").click(function(){
                        alert("The plus was clicked.");
                        console.log('save to Array')
                        var lat = document.getElementById('latit').value;
                        var long = document.getElementById('longit').value;
                        var nd = new Array();
                    //   nd.lat = lat;
                    //   nd.lng = long;
                        nd.push(lat,long);
                        shapeArray = Array.prototype.concat.apply([nd], [shapeArray]);
                        console.log(shapeArray);
                      
                      });
                     
                    });
            })




        });
    },
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
        RiceCertificate.deployed().then(function (instance) {
            instance.savesignup(urole, account, {
                from: account,
                gas: 3000000,
                value: web3.toWei(1, 'ether')
            }) //savetoBC is a function to be defined in the contract
                .then(function (v) {
                    console.log('Done Signin')
                    console.log(v);
                    if (confirm('Registration successfull!!!!Saved to BC...')) {
                        window.location.href = 'index.html'
                        if(urole=='Farmer'){
                              //------------TOKENIZTION--------------//

                            for (var i = 0; i < 30; i++) {
                                tokenArr[i] = Math.floor(Math.random() * 100000);
                                console.log('Tokens:::' + tokenArr[i]);
                            }

                            // for (var i = 0; i < 30; i++) {
                            //   console.log(tokenArr[i]);
                            // }

                            NFT.deployed().then(function (instance) {
                                return instance.mint2(account, tokenArr, {
                                    from: account,
                                    gas: 4000000
                                }).then(function (result) {
                                    console.log(result);
                                    //console.log('Result = '+JSON.stringify(result));
                                })
                            });

                            RiceCertificate.deployed().then(function (instance) {
                                instance.saveTokenData(account, tokenArr, {
                                    from: account,
                                    gas: 4000000
                                })
                                    .then(function (v) {
                                        console.log(v);
                                        console.log("721 Token Data Saved for Org");
                                    });
                            });

                        }
                    }

                });
        }).catch(function (e) {
            console.log(e);
            console.log('some error in saving data to BC');
        });

    },

    //Login ({Phase})
    login: function (account) {
        // uname = document.getElementById('uname').value;
        // upass = document.getElementById('upass').value;
        // console.log('Entered user name:' + ' ' + uname + 'Entered password: ' + ' ' + upass);
        RiceCertificate.deployed().then(function (instance) {
            instance.logindata.call(account)
                .then(function (v) {
                    console.log('v from login' + v);
                    // console.log('Decrypted Password:' + ' ' + decrypted);
                    //var decrypted = aes256.decrypt(key, v[0]);
                    console.log('Data ret from BC!!!!');

                    if ((v == '')) {
                        alert(' No user found  SIgn Up for an Account');


                    } else {

                        if ((v == 'Farmer')) {
                          
                            console.log('Login Success');
                            alert('Welcome Farmer.');
                            //logn = false;
                            window.location.href = 'homepage1.html?urole=' + v;

                        } else if (v == 'Inspector') {
                            // App.viewApplication();
                            console.log('Login Success..');
                            alert('Welcome Inspector..');

                            window.location.href = 'homepage2.html?urole=' + v;
                        } else if (v == 'Certifier') {
                            console.log('Login Success');
                            alert('Welcome Certifier....');

                            window.location.href = 'homepage3.html?urole=' + v;
                        } else {
                            alert('Sorry No User Found Please Sign UP');
                            document.getElementById('signupPassword').value = account;
                        }
                    }
                });
        }).catch(function (e) {
            console.log('some error in getting data from BC');
        });
    },

    //----------------------------------FARMER---------------------------------------//
    ApplyForm: function () {
        document.getElementById('ApplicationForm').style.display = 'block'
        // document.getElementById('Scann').style.display = 'none'
        document.getElementById('services').style.display = 'none'
        RiceCertificate.deployed().then(function (instance) {
            console.log("Initializing pop one token function" + account);
            instance.popToken.call(account)
                .then(function (t) {
                    if (t == "" || t == "0x") {
                        swal("no token found");
                    } else {
                        console.log(t)
                        console.log(t.c[0]);
                        var farmid = t.c[0];
                        document.getElementById('farm').value = farmid;
                        console.log(farmid);
                    }

                });
        }).catch(function (e) {
            console.log(e);
        });


        /* document.getElementById('Certify').style.display = 'none'
    document.getElementById('ScanData').style.display = 'none'
*/
    },
    //Submits an application
    ApplicationDone: function () {
        console.log('**********************')
        console.log('Shape Array');
        console.log(shapeArray);
        var farmid = document.getElementById('farm').value;
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
            alert('please check all details are provided correctly')
        } else {

            var encodePlace = Geohash.encode(lat, lng, [9])
console.log('afwasf')
            console.log(encodePlace)
            console.log(farmid + ',' + fname + ',' + add + ' , ' + lat + ',' + lng + ',' + requirement + ',' + std)
            RiceCertificate.deployed().then(function (instance) {
                var extraInstance = instance;
                instance.addApplication(farmid, fname, add, encodePlace, requirement, std, account, status, {
                    from: account,
                    gas: 3000000,
                    value: web3.toWei(1, 'ether')
                }) // addApplication is a function to be defined in the contract
                    .then(function (v) {
                        extraInstance.addApplication2(farmid, crop, extent, previouscrop, protect, manure, seed, soiltype, account, {
                            from: account,
                            gas: 3000000,
                            value: web3.toWei(1, 'ether')
                        }) // addApplication is a function to be defined in the contract
                            .then(function (v1) {
                                console.log(v)
                                console.log(v1)
                                if (confirm(farmid)) {
                                    window.location.reload();
                                }
                            })
                    })
            }).catch(function (e) {
                console.log('some error in saving data to BC')
            })

        }
        //var farmid = cryptoRandomString(5)

    },
    //View applications in table format
    GetMyAppStatus: function () {
        console.log(account);

        RiceCertificate.deployed().then(function (instance) {
            var getstatusinstance = instance;
            instance.getFarm.call(account).then(function (v) {
                console.log(v)
                var statTable = $("#statTable");
                statTable.empty();

                for (var i = 0; i < v.length; i++) {
                    var faid = v[i];
                    // console.log(faid);

                    //get in table format for each farm_id
                    getstatusinstance.getApplication.call(faid).then(function (farm) {

                        // console.log(farm)

                        var id = farm[0].c;
                        var owner = farm[1];
                        var status = web3.toAscii(farm[2]).replace(/[^ -~]+/g, '');
                        console.log('id:' + id + 'OWNER:' + owner + 'Status:' + status);

                        document.getElementById('services').style.display = "none";

                        document.getElementById('showStatus').style.display = "block"

                        var statusTemplate = "<tr><th>" + id + "</th><td>" + owner + "</td><td>" + status + "</td><td><button value=" + id + " onclick=App.Print(this.value) ng-show=" + status + " == 'Certified'>PRINT</button></td></tr>"
                        statTable.append(statusTemplate);


                    })

                }


            })
        })

    },
    SearchStat: function () {
        document.getElementById('searchStat').style.display = "block";
        document.getElementById('services').style.display = "none";


    },
    //Searches id and get d3 visualization
    getStat: function () {
        var id = document.getElementById('farmid').value;
        RiceCertificate.deployed().then(function (instance) {

            instance.getInfo.call(id).then(function (info) {
                console.log(info);
                if (info[0] != "") {
                    var stat = web3.toAscii(info[6]).replace(/[^ -~]+/g, '')
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
                    if (confirm("id doesnt exist")) {
                        window.location.reload();
                    }
                }

            })
        })
    },

    //Once Certified Farmer can print their certificate
    Print: function (field) {
        RiceCertificate.deployed().then(function (instance) {
            var newInstance = instance;
            instance.getInfo.call(field).then(function (info) {

                console.log('GOT FROM BC')
                console.log(info);
                var farm_owner = info[0];
                var address = web3.toAscii(info[1]).replace(/[^ -~]+/g, '');
                var requirement = web3.toAscii(info[3]).replace(/[^ -~]+/g, '');
                var standard = web3.toAscii(info[4]).replace(/[^ -~]+/g, '');
                var account = info[5]
                var stat1 = web3.toAscii(info[6]).replace(/[^ -~]+/g, '');
                instance.getextraInfo.call(field).then(function (info2) {

                    var crop = info2[0];
                    var extent = web3.toAscii(info2[1]).replace(/[^ -~]+/g, '');
                    var previouscrop = web3.toAscii(info2[2]).replace(/[^ -~]+/g, '');
                    var protect = web3.toAscii(info2[3]).replace(/[^ -~]+/g, '');
                    var manure = web3.toAscii(info2[4]).replace(/[^ -~]+/g, '');
                    var seed = web3.toAscii(info2[5]).replace(/[^ -~]+/g, '');
                    var soiltype = web3.toAscii(info2[6]).replace(/[^ -~]+/g, '')
                    console.log(crop + "" + extent + "" + previouscrop + "" + protect + "" + manure + "" + seed + "" + soiltype);
                    //LOCATION DECODED
                    var farmloc = web3.toAscii(info[2]).replace(/[^ -~]+/g, '');
                    var location = Geohash.decode(farmloc);
                    var latitude = location.lat;
                    var longitude = location.lon;
                    console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                    if (stat1 == "Certified") {
                        document.getElementById('SingleApplication').style.display = "none";

                        document.getElementById('ApplicationForm').style.display = "none";

                        document.getElementById('showStatus').style.display = "none";

                        document.getElementById('viewApp').style.display = "none";
                        newInstance.getInspectedInfo.call(field).then(function (inspe) {
                            console.log(inspe);
                            //var idate = ins[0];
                            console.log(inspe[0].c)
                            // var idate = web3.toAscii(ins[0])
                            var ida = new Date(parseInt(inspe[0].c))
                            var idate = ida.toDateString()
                            var iname = inspe[1]

                            instance.getCertificationInfo.call(field).then(function (cert) {
                                var cname = cert[0]
                                var fromyr = cert[1].c
                                var toyr = cert[2].c
                                var validity = toyr - fromyr
                                //
                                //Here generate pdf but value doesent exist or we have to get value from bc one byone
                                // App.GeneratePDF();
                                document.getElementById('SingleApplication').style.display = "none";
                                document.getElementById('FinalCertificate').style.display = "block";
                                document.getElementById('farm').innerHTML = field;
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

                                document.getElementById('mapPrint').style.display = "block";
                                //  if (latitude && longitude) {
                                console.log('GOT BOTH');
                                console.log(latitude + ',' + longitude);
                                L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'
                                var map = L.mapquest.map('mapPrint', {
                                    center: [latitude, longitude],
                                    layers: L.mapquest.tileLayer('satellite'),
                                    zoom: 16
                                })

                                map.addControl(L.mapquest.control())
                                var customIcon = L.icon({
                                    iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
                                    iconSize: [20, 29],
                                    iconAnchor: [10, 29],
                                    popupAnchor: [0, -29]
                                })

                                marker0 = L.marker([latitude, longitude], {
                                    icon: customIcon,
                                    draggable: false
                                }).addTo(map)


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
                                // var certificateWindow = window.open("", "", 'width=700,height=700');



                                /* myWindow.document.write('<div><div style = "float:left;width:200px;height:50px;margin :30px;"><h3>Green Bonds</h3>Technopark Campus<br>Trivandrum<br>www.greenbonds.com</div><div style = "float:right;width:230px;height:50px;margin :5px;"><img src="../stylesheets/img/2.png" alt="logo" height="70" width="200"/></div></div>');
                                 */
                                /*  certificateWindow.document.write("<html><head><title>CERTIFICATE</title><script src='https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js'></script>")
                                  certificateWindow.document.write("<link type='text/css' rel='stylesheet' href='https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css' />")
                                   certificateWindow.document.write("<script>L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'")
                                   
                                   certificateWindow.document.write("var map = L.mapquest.map('mapShow', {center: ["+latitude+","+ longitude+"],layers: L.mapquest.tileLayer('satellite'),zoom: 16})")
                                  certificateWindow.document.write("map.addControl(L.mapquest.control())var customIcon = L.icon({iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',")
       
                                  certificateWindow.document.write(" iconSize: [20, 29],iconAnchor: [10, 29],popupAnchor: [0, -29]})marker0 = L.marker(["+latitude+", "+longitude+"], {icon: customIcon,draggable: false}).addTo(map)</script></head><body>");
       
                                  certificateWindow.document.write('<div style="left-margin:200px;">');
                            */
                                /* certificateWindow.document.write('<br><div id="mapShow" style="width: 600px; height:400px;"></div>');
                                 */
                                /*certificateWindow.document.write("<center><h1>FARM CERTIFICATION</h1>");
 
                                    var myTable2 = "<table><tr><td style='width: 100px; color: black;'>Field_id</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + field + "</td></tr>";
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Ownership</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + farm_owner + "</td></tr>";
                                    
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Address</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + address + "</td></tr>";
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Latitude</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + latitude + "</td></tr>";
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Longitude</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + longitude + "</td></tr>";
                                    
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Requirement </td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + requirement + "</td></tr>";
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Certification Standard</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + standard + "</td></tr>";
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Inspected By</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + iname + "</td></tr>";
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Date of Inscpection</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + idate + "</td></tr>";
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Certifying Authority</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + cname + "</td>";
                                    myTable2 += "<tr><td style='width: 100px; color: black;'>Validity</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + validity + " yrs</td>";
                                    myTable2 += "</table>";
                                    
                                    certificateWindow.document.write(myTable2);
                                    certificateWindow.document.write("</center>");
                                    certificateWindow.document.write('</div></body></html>');
                                    certificateWindow.document.close();
                                    
                                    certificateWindow.moveTo(0, 0);
                                    certificateWindow.resizeTo(screen.width, screen.height);
                                    certificateWindow.focus();
                                    
                                    setTimeout(function () {
                                    
                                    certificateWindow.print();
                                    certificateWindow.close();
                                    
                                    }, 400);
                                    */ // /windoe.location.reload();

                                   setTimeout(function () {

                                    window.print();
                                    // certificateWindow.close();

                                }, 5000);
                            })
                        })
                    } else {
                        alert('No Certificate Found')
                    }
                })
            })
        })
    },
//------------NOT USED..check??
    viewApplication: function () {
        //application viewed by a farmer
        console.log(account)
        document.getElementById('viewApp').style.display = "block";
        var fieldInstance;
        RiceCertificate.deployed().then(function (instance) {
            fieldInstance = instance;
            instance.getApplicationCount.call()
                .then(function (v) {
                    console.log('GOT FROM BC')
                    console.log(v.c)
                    var appCount = v;
                    var candidatesResults = $("#candidatesResults");
                    candidatesResults.empty();
                    for (var i = 0; i < appCount; i++) {
                        fieldInstance.myStructs(i).then(function (rice) {
                            console.log(rice);

                            var farm_id = rice[0].c;
                            var farm_owner = rice[1];
                            var address = web3.toAscii(rice[2]).replace(/[^ -~]+/g, '');

                            //LOCATION DECODED
                            var farmloc = web3.toAscii(rice[3]).replace(/[^ -~]+/g, '');
                            var location = Geohash.decode(farmloc);
                            var latitude = location.lat;
                            var longitude = location.lon;
                            console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                            var requirement = web3.toAscii(rice[4]).replace(/[^ -~]+/g, '');
                            var standard = web3.toAscii(rice[5]).replace(/[^ -~]+/g, '');
                            var account = rice[6]
                            var stat = web3.toAscii(rice[7]).replace(/[^ -~]+/g, '')
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

        }).catch(function (e) {
            console.log(e);
            console.log('some error in saving data to BC');
        });



    },


    //------------------------------------INSPECTOR-------------------------------------//
    //Displays all appplication as table
    inspectView: function () {

        document.getElementById('searchFarm').style.display = "none";
        document.getElementById('services').style.display = "none";
        document.getElementById('viewApp').style.display = "block";

        var fieldInstance;
        RiceCertificate.deployed().then(function (instance) {
            fieldInstance = instance;
            instance.getApplicationCount.call().then(function (v) {
                console.log('GOT FROM BC')
                console.log(v.c)
                var appCount = v;
                var candidatesResults = $("#candidatesResults");
                candidatesResults.empty();
                for (var i = 0; i < appCount; i++) {
                    fieldInstance.myStructs(i).then(function (rice) {
                        console.log(rice);

                        var farm_id = rice[0].c;
                        var farm_owner = rice[1];
                        var address = web3.toAscii(rice[2]).replace(/[^ -~]+/g, '');

                        //LOCATION DECODED
                        var farmloc = web3.toAscii(rice[3]).replace(/[^ -~]+/g, '');
                        var location = Geohash.decode(farmloc);
                        var latitude = location.lat;
                        var longitude = location.lon;
                        console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                        var requirement = web3.toAscii(rice[4]).replace(/[^ -~]+/g, '');
                        var standard = web3.toAscii(rice[5]).replace(/[^ -~]+/g, '');
                        var account = rice[6]
                        //var stat = web3.toAscii(rice[7]).replace(/[^ -~]+/g, '');
                        console.log('ID : ' + farm_id + ' , FARMER : ' + farm_owner + ' ,ADDRESS : ' + address + ',REQUIREMENT : ' + requirement + ',STANDARD:' + standard + ',ACCOUNT' + account);

                        //Only pending application viewed to inspector
                        //  document.getElementById('services').style.display = "none";
                        document.getElementById('SingleApplication').style.display = "none";
                        document.getElementById('searchFarm').style.display = "none"
                        // Render applications Submitted
                        var candidateTemplate = "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td>" + requirement + "</td><td>" + standard + "</td><td>" + account + "</td><td><button id='accept' value='" + farm_id + "'  onclick='App.Accept(this.value)'>ACCEPT</button></td></tr>"
                        //<td><button id='reject' value='" + farm_id + "' onclick='App.Reject(this.value)'>REJECT</button></td>
                        //   var candidateTemplate  =  "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td><button class ='btn-adm' onclick = 'App.Accept("+farm_id+','+farm_owner+")'</button>Buy<button class ='btn-adm' onclick = 'App.accept("+farm_id+")'</button>Sell</td></tr>"





                        /* NOT GETTING FARMI_ID,error:invalid token
                         var candidateTemplate = "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td>" + requirement + "</td><td>" + standard + "</td><td>" + account + "</td><td><button onclick='App.Accept("+farm_id+")'>ACCEPT</button></td><td><button onclick='App.Reject("+farm_id[0]+")'>REJECT</button></td></tr>"
                        */
                        candidatesResults.append(candidateTemplate);



                    });
                }
            })

        }).catch(function (e) {
            console.log(e);
            console.log('some error in saving data to BC');
        });


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
        RiceCertificate.deployed().then(function (instance) {
            instance.getInfo.call(id).then(function (info) {
                //    for(var i= 0;i<v.length;i++)
                //      {
                instance.getextraInfo.call(id).then(function (inf) {
                    console.log(inf)
                    console.log('GOT FROM BC')
                    console.log(info);
                    // var farm_id = web3.toAscii(rice[0]).replace(/[^ -~]+/g, '');
                    var farm_owner = info[0];
                    var address = web3.toAscii(info[1]).replace(/[^ -~]+/g, '');
                    var requirement = web3.toAscii(info[3]).replace(/[^ -~]+/g, '');
                    var standard = web3.toAscii(info[4]).replace(/[^ -~]+/g, '');
                    var account = info[5]
                    var stat = web3.toAscii(info[6]).replace(/[^ -~]+/g, '')

                    var crop = inf[0];
                    var extent = web3.toAscii(inf[1]).replace(/[^ -~]+/g, '');
                    var previouscrop = web3.toAscii(inf[2]).replace(/[^ -~]+/g, '');
                    var protect = web3.toAscii(inf[3]).replace(/[^ -~]+/g, '');
                    var manure = web3.toAscii(inf[4]).replace(/[^ -~]+/g, '');
                    var seed = web3.toAscii(inf[5]).replace(/[^ -~]+/g, '');
                    var soiltype = web3.toAscii(inf[6]).replace(/[^ -~]+/g, '')
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
                    var farmloc = web3.toAscii(info[2]).replace(/[^ -~]+/g, '');
                    var location = Geohash.decode(farmloc);
                    var latitude = location.lat;
                    var longitude = location.lon;
                    document.getElementById('latit').value = latitude;
                    document.getElementById('longit').value = longitude;
                    console.log('Latitude : ' + latitude + ',Longitude:' + longitude)
                    if (stat === "Pending") {
                        document.getElementById('SingleApplication').style.display = "block";

                        document.getElementById('mapFrame').style.display = "block";

                        //  if (latitude && longitude) {
                        console.log('GOT BOTH');
                        console.log(latitude + ',' + longitude);
                        L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'
                        var map = L.mapquest.map('mapFrame', {
                            center: [latitude, longitude],
                            layers: L.mapquest.tileLayer('satellite'),
                            zoom: 16
                        })

                        map.addControl(L.mapquest.control())
                        var customIcon = L.icon({
                            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
                            iconSize: [20, 29],
                            iconAnchor: [10, 29],
                            popupAnchor: [0, -29]
                        })

                        marker0 = L.marker([latitude, longitude], {
                            icon: customIcon,
                            draggable: false
                        }).addTo(map)

                        document.getElementById('addinspect').style.display = "block"


                    } else if (stat === "Inspected") {
                        document.getElementById('SingleApplication').style.display = "block";

                        document.getElementById('mapFrame').style.display = "block";

                        //  if (latitude && longitude) {
                        console.log('GOT BOTH');
                        console.log(latitude + ',' + longitude);
                        L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'
                        var map = L.mapquest.map('mapFrame', {
                            center: [latitude, longitude],
                            layers: L.mapquest.tileLayer('satellite'),
                            zoom: 16
                        })

                        map.addControl(L.mapquest.control())
                        var customIcon = L.icon({
                            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
                            iconSize: [20, 29],
                            iconAnchor: [10, 29],
                            popupAnchor: [0, -29]
                        })

                        marker0 = L.marker([latitude, longitude], {
                            icon: customIcon,
                            draggable: false
                        }).addTo(map)

                        document.getElementById('inspect').style.display = "block"
                        instance.getInspectedInfo.call(id).then(function (ins) {
                            console.log(ins);
                            var ida = new Date(parseInt(ins[0].c))
                            var idate = ida.toDateString()
                            // var idate = web3.toAscii(ins[0])
                            var iname = ins[1];
                            document.getElementById('idate3').value = idate
                            document.getElementById('iname3').value = iname
                        });


                    } else if (stat === "Certified") {
                        instance.getInspectedInfo.call(id).then(function (ins) {
                            console.log(ins);
                            var ida = new Date(parseInt(ins[0].c))
                            var idate = ida.toDateString()
                            // var idate = web3.toAscii(ins[0])
                            var iname = ins[1];
                            instance.getCertificationInfo.call(id).then(function (cert) {
                                var cname = cert[0]
                                var fromyr = cert[1].c
                                var toyr = cert[2].c
                                var validity = toyr - fromyr


                                document.getElementById('SingleApplication').style.display = "none";
                                if (confirm('Certification Done')) {

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

                                    document.getElementById('mapSh').style.display = "block";
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
                                    //  if (latitude && longitude) {
                                    console.log('GOT BOTH');
                                    console.log(latitude + ',' + longitude);
                                    L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'
                                    var map = L.mapquest.map('mapSh', {
                                        center: [latitude, longitude],
                                        layers: L.mapquest.tileLayer('satellite'),
                                        zoom: 16
                                    })

                                    map.addControl(L.mapquest.control())
                                    var customIcon = L.icon({
                                        iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
                                        iconSize: [20, 29],
                                        iconAnchor: [10, 29],
                                        popupAnchor: [0, -29]
                                    })

                                    marker0 = L.marker([latitude, longitude], {
                                        icon: customIcon,
                                        draggable: false
                                    }).addTo(map)

                                }
                            })
                        })
                    }


                    // }
                    //SET status as inspected
                    // }
                })
            })
        }).catch(function (e) {
            console.log(e);
            console.log('some error in saving data to BC');
        });



    },
    //Not Done
    Reject: function (id) {
        console.log('Set Status:REJECTED');
        console.log(id);
        // var fieldID = web3.toAscii(id).replace(/[^ -~]+/g, '');
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
        RiceCertificate.deployed().then(function (instance) {
            var farminstance = instance
            var detailinstance = instance
            instance.addInspectDetails(id, inspectdate, inspector, {
                from: account,
                gas: 3000000,
                value: web3.toWei(1, 'ether')
            }) // addApplication is a function to be defined in the contract
                .then(function (v) {
                    console.log(v)
                    console.log('added inspector details')
                    farminstance.updateFarm(id, owner, addr, encodePlace, production, std, acc, status, {
                        from: account,
                        gas: 3000000,
                        value: web3.toWei(1, 'ether')
                    }) // addApplication is a function to be defined in the contract
                        .then(function (v) {
                            console.log(v)

                            if (confirm('added status update ..INSPECTED')) {
                                window.location.reload();
                            }

                        })
                })
        }).catch(function (e) {
            console.log('some error in saving data to BC')
        })
    },
    //Search an id and find details not necessary
    Inspection: function () {
        document.getElementById('searchFarm').style.display = "block"
        document.getElementById('services').style.display = "none"

    },
    InspectorSearchFound: function () {
        var fid = document.getElementById('farmid').value;
        console.log(fid);
        RiceCertificate.deployed().then(function (instance) {
            var newInst = instance;
            instance.getInfo.call(fid).then(function (info) {
                //    for(var i= 0;i<v.length;i++)
                //      {

                document.getElementById('farmDetails').style.display = "block"
                console.log('GOT FROM BC')
                console.log(info);
                // var farm_id = web3.toAscii(rice[0]).replace(/[^ -~]+/g, '');
                var farm_owner = info[0];
                var address = web3.toAscii(info[1]).replace(/[^ -~]+/g, '');
                var requirement = web3.toAscii(info[3]).replace(/[^ -~]+/g, '');
                var standard = web3.toAscii(info[4]).replace(/[^ -~]+/g, '');
                var account = info[5]
                var stat = web3.toAscii(info[6]).replace(/[^ -~]+/g, '')
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
                var farmloc = web3.toAscii(info[2]).replace(/[^ -~]+/g, '');
                var location = Geohash.decode(farmloc);
                var latitude = location.lat;
                var longitude = location.lon;
                console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                document.getElementById('latit1').value = latitude
                document.getElementById('longit1').value = longitude
                if (stat == "Inspected") {
                    document.getElementById('inspectionDetails').style.display = "block";
                    document.getElementById('mapFrame2').style.display = "block";

                    //  if (latitude && longitude) {
                    console.log('GOT BOTH');
                    console.log(latitude + ',' + longitude);
                    L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'
                    var map = L.mapquest.map('mapFrame2', {
                        center: [latitude, longitude],
                        layers: L.mapquest.tileLayer('satellite'),
                        zoom: 16
                    })

                    map.addControl(L.mapquest.control())
                    var customIcon = L.icon({
                        iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
                        iconSize: [20, 29],
                        iconAnchor: [10, 29],
                        popupAnchor: [0, -29]
                    })

                    marker0 = L.marker([latitude, longitude], {
                        icon: customIcon,
                        draggable: false
                    }).addTo(map)

                    newInst.getInspectedInfo.call(fid).then(function (ins) {
                        console.log(ins);
                        var ida = new Date(parseInt(ins[0].c))
                        var idate = ida.toDateString()
                        // var idate = web3.toAscii(ins[0])
                        var iname = ins[1];
                        document.getElementById('idate1').value = idate
                        document.getElementById('iname1').value = iname


                    })
                } else if (stat == "Certified") {
                    //get certification from bc
                    console.log("certified")
                }


            })
        }).catch(function (e) {
            console.log(e);
            console.log('some error in saving data to BC');
        });

        // view farm details once again along with inspection details and set status of farmer to verified
    },
    /*-----------------------------------Certifier-------------------------------------*/
    //Show all applications in table format
    viewFinalApplication: function () {
        // document.getElementById('Certify').style.display = "block"

        document.getElementById('services').style.display = "none"
        document.getElementById('viewApp').style.display = "block";

        var fieldInstance;
        RiceCertificate.deployed().then(function (instance) {
            fieldInstance = instance;
            instance.getApplicationCount.call().then(function (v) {
                console.log('GOT FROM BC')
                console.log(v.c)
                var appCount = v;
                var candidatesResults = $("#candidatesResults");
                candidatesResults.empty();
                for (var i = 0; i < appCount; i++) {
                    fieldInstance.myStructs(i).then(function (rice) {
                        console.log(rice);

                        var farm_id = rice[0].c;
                        var farm_owner = rice[1];
                        var address = web3.toAscii(rice[2]).replace(/[^ -~]+/g, '');

                        //LOCATION DECODED
                        var farmloc = web3.toAscii(rice[3]).replace(/[^ -~]+/g, '');
                        var location = Geohash.decode(farmloc);
                        var latitude = location.lat;
                        var longitude = location.lon;
                        console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                        var requirement = web3.toAscii(rice[4]).replace(/[^ -~]+/g, '');
                        var standard = web3.toAscii(rice[5]).replace(/[^ -~]+/g, '');
                        var account = rice[6]
                        var stat = web3.toAscii(rice[7]).replace(/[^ -~]+/g, '');
                        console.log('ID : ' + farm_id + ' , FARMER : ' + farm_owner + ' ,ADDRESS : ' + address + ',REQUIREMENT : ' + requirement + ',STANDARD:' + standard + ',ACCOUNT' + account);
                        // if (stat == 'Inspected') {
                        //Only pending application viewed to inspector
                        document.getElementById('services').style.display = "none";
                        //document.getElementById('SingleApplication').style.display = "none";
                        //document.getElementById('searchFarm').style.display = "none"
                        // Render applications Submitted
                        var candidateTemplate = "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td>" + requirement + "</td><td>" + standard + "</td><td>" + account + "</td><td><button value='" + farm_id + "'  onclick='App.Approve(this.value)' id='accept'>APPROVE</button></td></tr>"
                        // <td><button id='reject' value='" + farm_id + "' onclick='App.Rejected(this.value)'>REJECT</button></td>   var candidateTemplate  =  "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td><button class ='btn-adm' onclick = 'App.Accept("+farm_id+','+farm_owner+")'</button>Buy<button class ='btn-adm' onclick = 'App.accept("+farm_id+")'</button>Sell</td></tr>"





                        /* NOT GETTING FARMI_ID,error:invalid token
                         var candidateTemplate = "<tr><td>" + farm_id + "</td><td>" + farm_owner + "</td><td>" + address + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td>" + requirement + "</td><td>" + standard + "</td><td>" + account + "</td><td><button onclick='App.Accept("+farm_id+")'>ACCEPT</button></td><td><button onclick='App.Reject("+farm_id[0]+")'>REJECT</button></td></tr>"
                        */
                        candidatesResults.append(candidateTemplate);


                        // }
                    });
                }
            })

        }).catch(function (e) {
            console.log(e);
            console.log('some error in saving data to BC');
        });



    },
    Approve: function (id) {
        console.log('***********************************')
        console.log(id);
        var marker0;
        document.getElementById('services').style.display = "none";
        document.getElementById('viewApp').style.display = "none";
        // document.getElementById('searchFarm').style.display = "none";
        document.getElementById('fieldid').value = id;
        //based on id get lat long and details and shw map
        RiceCertificate.deployed().then(function (instance) {
            var newInstance = instance;
            instance.getInfo.call(id).then(function (info) {
                //    for(var i= 0;i<v.length;i++)
                //      {

                console.log('GOT FROM BC')
                console.log(info);
                // var farm_id = web3.toAscii(rice[0]).replace(/[^ -~]+/g, '');
                var farm_owner = info[0];
                var address = web3.toAscii(info[1]).replace(/[^ -~]+/g, '');
                var requirement = web3.toAscii(info[3]).replace(/[^ -~]+/g, '');
                var standard = web3.toAscii(info[4]).replace(/[^ -~]+/g, '');
                var account = info[5]
                var stat1 = web3.toAscii(info[6]).replace(/[^ -~]+/g, '')
                instance.getextraInfo.call(id).then(function (inf) {

                    var crop = inf[0];
                    var extent = web3.toAscii(inf[1]).replace(/[^ -~]+/g, '');
                    var previouscrop = web3.toAscii(inf[2]).replace(/[^ -~]+/g, '');
                    var protect = web3.toAscii(inf[3]).replace(/[^ -~]+/g, '');
                    var manure = web3.toAscii(inf[4]).replace(/[^ -~]+/g, '');
                    var seed = web3.toAscii(inf[5]).replace(/[^ -~]+/g, '');
                    var soiltype = web3.toAscii(inf[6]).replace(/[^ -~]+/g, '')
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
                    var farmloc = web3.toAscii(info[2]).replace(/[^ -~]+/g, '');
                    var location = Geohash.decode(farmloc);
                    var latitude = location.lat;
                    var longitude = location.lon;
                    document.getElementById('latit').value = latitude;
                    document.getElementById('longit').value = longitude;
                    console.log('Latitude : ' + latitude + ',Longitude:' + longitude)

                    if (stat1 == "Inspected") {
                        document.getElementById('SingleApplication1').style.display = "block";
                        document.getElementById('mapFrame').style.display = "block";

                        //  if (latitude && longitude) {
                        console.log('GOT BOTH');
                        console.log(latitude + ',' + longitude);
                        L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'
                        var map = L.mapquest.map('mapFrame', {
                            center: [latitude, longitude],
                            layers: L.mapquest.tileLayer('satellite'),
                            zoom: 16
                        })

                        map.addControl(L.mapquest.control())
                        var customIcon = L.icon({
                            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
                            iconSize: [20, 29],
                            iconAnchor: [10, 29],
                            popupAnchor: [0, -29]
                        })

                        marker0 = L.marker([latitude, longitude], {
                            icon: customIcon,
                            draggable: false
                        }).addTo(map)

                        newInstance.getInspectedInfo.call(id).then(function (ins) {
                            console.log(ins);
                            //var idate = ins[0];
                            console.log(ins[0].c)
                            // var idate = web3.toAscii(ins[0])
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

                        if (confirm('CERTIFICATION Already DONE')) {

                            newInstance.getInspectedInfo.call(id).then(function (inspe) {
                                console.log(inspe);
                                //var idate = ins[0];
                                console.log(inspe[0].c)
                                // var idate = web3.toAscii(ins[0])
                                var ida = new Date(parseInt(inspe[0].c))
                                var idate = ida.toDateString()
                                var iname = inspe[1]

                                instance.getCertificationInfo.call(id).then(function (cert) {
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
                                    document.getElementById('la').innerHTML = latitude;
                                    document.getElementById('long').innerHTML = longitude;
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
                                    //  if (latitude && longitude) {
                                    console.log('GOT BOTH');
                                    console.log(latitude + ',' + longitude);
                                    L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'
                                    var map = L.mapquest.map('mapSh', {
                                        center: [latitude, longitude],
                                        layers: L.mapquest.tileLayer('satellite'),
                                        zoom: 16
                                    })

                                    map.addControl(L.mapquest.control())
                                    var customIcon = L.icon({
                                        iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
                                        iconSize: [20, 29],
                                        iconAnchor: [10, 29],
                                        popupAnchor: [0, -29]
                                    })

                                    marker0 = L.marker([latitude, longitude], {
                                        icon: customIcon,
                                        draggable: false
                                    }).addTo(map)


                                    setTimeout(function () {

                                        window.print();
                                        //window.close();

                                    }, 6000);
                                    /*var certificateWindow = window.open("", "", 'width=700,height=700');
                                     */
                                    // myWindow.document.write('<div><div style = "float:left;width:200px;height:50px;margin :30px;"><h3>Green Bonds</h3>Technopark Campus<br>Trivandrum<br>www.greenbonds.com</div><div style = "float:right;width:230px;height:50px;margin :5px;"><img src="../stylesheets/img/2.png" alt="logo" height="70" width="200"/></div></div>');
                                    /* myWindow.document.write("<head><script src='https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js'></script>")
                                 myWindow.document.write("<link type='text/css' rel='stylesheet' href='https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css' />")
                                 myWindow.document.write("<script>L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'")
                                 
                                 myWindow.document.write("var map = L.mapquest.map('mapShow', {center: ["+latitude+","+ longitude+"],layers: L.mapquest.tileLayer('satellite'),zoom: 16})")
                                 myWindow.document.write("map.addControl(L.mapquest.control())var customIcon = L.icon({iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',")
     
                                myWindow.document.write(" iconSize: [20, 29],iconAnchor: [10, 29],popupAnchor: [0, -29]})marker0 = L.marker(["+latitude+", "+longitude+"], {icon: customIcon,draggable: false}).addTo(map)</script></head>");
     */
                                    /*                                certificateWindow.document.write('<div style="left-margin:200px;">');
                                                                    certificateWindow.document.write('<br>');
                                                                    certificateWindow.document.write("<center><h1>FARM CERTIFICATION</h1>");

                                                                    var myTable3 = "<table><tr><td style='width: 100px; color: black;'>Field_id</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + id + "</td></tr>";
                                                                    myTable3 += "<tr><td style='width: 100px; color: black;'>Ownership</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + farm_owner + "</td></tr>";

                                                                    myTable3 += "<tr><td style='width: 100px; color: black;'>Address</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + address + "</td></tr>";
                                                                    myTable3 += "<tr><td style='width: 100px; color: black;'>Requirement </td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + requirement + "</td></tr>";
                                                                    myTable3 += "<tr><td style='width: 100px; color: black;'>Certification Standard</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + standard + "</td></tr>";
                                                                    myTable3 += "<tr><td style='width: 100px; color: black;'>Inspected By</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + iname + "</td></tr>";
                                                                    myTable3 += "<tr><td style='width: 100px; color: black;'>Date of Inscpection</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + idate + "</td></tr>";
                                                                    myTable3 += "<tr><td style='width: 100px; color: black;'>Certifying Authority</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + cname + "</td>";
                                                                    myTable3 += "<tr><td style='width: 100px; color: black;'>Validity</td><td>:</td><td style='width: 100px; color: black;text-align: center;'>" + validity + " yrs</td>";
                                                                    myTable3 += "</table>";

                                                                    certificateWindow.document.write(myTable3);
                                                                    certificateWindow.document.write("</center>");
                                                                    certificateWindow.document.write('</div>');
                                                                    certificateWindow.document.close();

                                                                    certificateWindow.moveTo(0, 0);
                                                                    certificateWindow.resizeTo(screen.width, screen.height);
                                                                    certificateWindow.focus();

                                                                    setTimeout(function () {

                                                                        certificateWindow.print();
                                                                        certificateWindow.close();

                                                                    }, 250);
                                    */
                                })
                            })
                        }
                    } else {

                        document.getElementById('inspectDetails').style.display = "none";

                        if (confirm('Not Inspected')) {
                            window.location.reload();
                        }
                    }
                })
            })
        }).catch(function (e) {
            console.log(e);
            console.log('some error in saving data to BC');
        });



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
        RiceCertificate.deployed().then(function (instance) {
            var certifyinstance = instance
            var updinstance = instance
            instance.addCertifierDetails(farm_id, cname, fromyr, toyr, {
                from: account,
                gas: 3000000,
                value: web3.toWei(1, 'ether')
            }) // addApplication is a function to be defined in the contract
                .then(function (v) {
                    console.log(v)
                    console.log('added certification details')
                    var status = 'Certified'
                    certifyinstance.updateFarm(farm_id, owner, addr, encodePlace, production, std, acc, status, {
                        from: account,
                        gas: 3000000,
                        value: web3.toWei(1, 'ether')
                    }).then(function (v) {
                        console.log('Common Details and status updated')
                        console.log(v)
                        /*  updinstance.updateExtraFarmDetails(farm_id, crop, extent, precrop, protect, manure, seed, soiltype, {
                              from: account,
                              gas: 3000000,
                              value: web3.toWei(1, 'ether')
                          }).then(function (upd) {
                              console.log('crop info updated')
                              console.log(upd);*/
                        if (confirm('CERTIFIED')) {

                            document.getElementById('SingleApplication1').style.display = "none";

                            document.getElementById('FinalCertificate').style.display = "block";
                            document.getElementById('farm').innerHTML = farm_id;
                            document.getElementById('owns').innerHTML = owner;
                            document.getElementById('add').innerHTML = addr;
                            document.getElementById('la').innerHTML = lat;
                            document.getElementById('long').innerHTML = lng;
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
                            //  if (latitude && longitude) {
                            console.log('GOT BOTH');
                            console.log(lat + ',' + lng);
                            L.mapquest.key = '0iAi6Cp45QtBApkpmLCEyAcuG58rQi1h'
                            var map = L.mapquest.map('mapSh', {
                                center: [lat, lng],
                                layers: L.mapquest.tileLayer('satellite'),
                                zoom: 16
                            })

                            map.addControl(L.mapquest.control())
                            var customIcon = L.icon({
                                iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
                                iconSize: [20, 29],
                                iconAnchor: [10, 29],
                                popupAnchor: [0, -29]
                            })

                            marker0 = L.marker([lat, lng], {
                                icon: customIcon,
                                draggable: false
                            }).addTo(map)


                            setTimeout(function () {

                                window.print();
                                //window.close();

                            }, 6000);
                        }
                        //})
                    })
                })
        }).catch(function (e) {
            console.log('some error in saving data to BC')
        })
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

};

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn(
            'Using web3 detected from external source. If you find that your accounts dont appear or you have 0 RiceCertificate, ensure youve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider)
    } else {
        console.warn(
            'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as its inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(
            new Web3.providers.HttpProvider('http://localhost:8545')
        );
    }

    App.start();
});
