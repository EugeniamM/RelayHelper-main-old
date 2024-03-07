

document.querySelector(".background").style.setProperty("background-image", "url(Background/" + (Math.round(Math.random() * 76) + 1) + ".jpeg)");

setInterval(Update);

let submitButton = document.getElementById("submit_form");
let form = document.getElementById("email_form");
form.addEventListener("submit", function (e) {
    setTimeout(function() {
        submitButton.disabled = true;
    }, 1);
});


/*window.onscroll = function showHeader(){
    if(window.pageYOffset > 80){
        document.getElementById("header").className = "fixedHeader";
    }else {
        document.getElementById("header").className = "header";
    }
}*/
document.getElementById("headerSpacer").style.marginTop = (document.getElementById("header").getBoundingClientRect().height + 5) + "px";

document.getElementById("header").onclick = function(){
    document.getElementById("Home").className = document.getElementById("b-Home").checked ? "shown" : "hidden";
    document.getElementById("RZA").className = document.getElementById("b-RZA").checked ? "shown" : "hidden";
    document.getElementById("Calc").className = document.getElementById("b-Calc").checked ? "shown" : "hidden";
    document.getElementById("VD").className = document.getElementById("b-VD").checked ? "shown" : "hidden";
    document.getElementById("COMTRADE").className = document.getElementById("b-COMTRADE").checked ? "shown" : "hidden";
    document.getElementById("Rate").className = document.getElementById("b-Rate").checked ? "shown" : "hidden";
    document.getElementById("Don").className = document.getElementById("b-Don").checked ? "shown" : "hidden";
    document.getElementById("Help").className = document.getElementById("b-Help").checked ? "shown" : "hidden";

    document.getElementById("HomeMenu").className = document.getElementById("b-Home").checked ? "shown" : "hidden";
    document.getElementById("RZAMenu").className = document.getElementById("b-RZA").checked ? "shown" : "hidden";
    document.getElementById("CalcMenu").className = document.getElementById("b-Calc").checked ? "shown" : "hidden";
    document.getElementById("VDMenu").className = document.getElementById("b-VD").checked ? "shown" : "hidden";
    document.getElementById("COMTRADEMenu").className = document.getElementById("b-COMTRADE").checked ? "shown" : "hidden";
    document.getElementById("RateMenu").className = document.getElementById("b-Rate").checked ? "shown" : "hidden";
    document.getElementById("DonMenu").className = document.getElementById("b-Don").checked ? "shown" : "hidden";
    document.getElementById("HelpMenu").className = document.getElementById("b-Help").checked ? "shown" : "hidden";

    document.getElementById("headerSpacer").style.marginTop = (document.getElementById("header").getBoundingClientRect().height + 5) + "px";
}
document.getElementById("RZAMenu").onclick = function(){
    document.getElementById("DistanseP").className = document.getElementById("b-DistanseP").checked ? "shown" : "hidden";
    document.getElementById("DifferentialP").className = document.getElementById("b-DifferentialP").checked ? "shown" : "hidden";

    document.getElementById("DistancePMenu").className = document.getElementById("b-DistanseP").checked ? "inline" : "hidden";
    document.getElementById("DifferentialPMenu").className = document.getElementById("b-DifferentialP").checked ? "inline" : "hidden";
    updateCOMTRADE();
}

document.getElementById("themePicker").onclick = function(){
    if(document.getElementById("i-darkBlue").checked){
        document.querySelector(":root").style.setProperty("--header", "#000000");
        document.querySelector(":root").style.setProperty("--text", "#FFFFFF");
        document.querySelector(":root").style.setProperty("--button", "#000080");
        document.querySelector(":root").style.setProperty("--button-hover", "#000040");
        document.querySelector(":root").style.setProperty("--button-active", "#000000");
        document.querySelector(":root").style.setProperty("--input-text-background", "#000000");
        document.querySelector(":root").style.setProperty("--outer", "#000040");
        document.querySelector(":root").style.setProperty("--inner", "#000080");
        document.querySelector(":root").style.setProperty("--border", "1px #FFFFFF solid");
        document.querySelector(":root").style.setProperty("--checkbox", "lightgray");
        document.querySelector(":root").style.setProperty("--checkbox-checked", "#000000");
        document.querySelector(":root").style.setProperty("--list-color", "#444444");
        document.querySelector(":root").style.setProperty("--message-color", "#444444");
    }
    if(document.getElementById("i-lightBlue").checked){
        document.querySelector(":root").style.setProperty("--header", "#5F9EA0");
        document.querySelector(":root").style.setProperty("--text", "#000000");
        document.querySelector(":root").style.setProperty("--button", "#ADD8E6");
        document.querySelector(":root").style.setProperty("--button-hover", "#81CCE6");
        document.querySelector(":root").style.setProperty("--button-active", "#5F9EA0");
        document.querySelector(":root").style.setProperty("--input-text-background", "#FFFFFF");
        document.querySelector(":root").style.setProperty("--outer", "#81CCE6");
        document.querySelector(":root").style.setProperty("--inner", "#5F9EA0");
        document.querySelector(":root").style.setProperty("--border", "1px #000000 solid");
        document.querySelector(":root").style.setProperty("--checkbox", "lightgray");
        document.querySelector(":root").style.setProperty("--checkbox-checked", "#000000");
        document.querySelector(":root").style.setProperty("--list-color", "#5F9EA0");
        document.querySelector(":root").style.setProperty("--message-color", "#5F9EA0");             
    }
    if(document.getElementById("i-orange").checked){
        document.querySelector(":root").style.setProperty("--header", "#FFA500");
        document.querySelector(":root").style.setProperty("--text", "#FFFFFF");
        document.querySelector(":root").style.setProperty("--button", "#FFA500");
        document.querySelector(":root").style.setProperty("--button-hover", "#FF8000");
        document.querySelector(":root").style.setProperty("--button-active", "#FF4500");
        document.querySelector(":root").style.setProperty("--input-text-background", "#FFA500");
        document.querySelector(":root").style.setProperty("--outer", "#FF8000");
        document.querySelector(":root").style.setProperty("--inner", "#FFA500");
        document.querySelector(":root").style.setProperty("--border", "1px #FFFFFF solid");
        document.querySelector(":root").style.setProperty("--checkbox", "lightgray");
        document.querySelector(":root").style.setProperty("--checkbox-checked", "#FFA500");
        document.querySelector(":root").style.setProperty("--list-color", "#FFA07A");
        document.querySelector(":root").style.setProperty("--message-color", "#FFA07A");                   
    }
}
/*document.getElementById("b-addZeroSequence").onclick = function(){
    
}*/
let clientY = 0;
const dpInfo = 50;


let bufferA = 0;
let bufferF = 0;

const analogHeight = 300;
const digitalHeight = 40;

const infoWidth = 200;

const leftInfoWidth = 0;

const topInfoWidth = 50;

const infoHeight = 20;

const timeGrid = 0.5;
/*let cursor1;
let cursor2;*/
let fileInfoHeight;

const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

const deviceType = getDeviceType();

if(deviceType === "mobile"){
    document.getElementById("i-COMTVecSiz").value = 200;

    document.getElementById("c-3").width = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-3").height = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-4").width = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-4").height = document.getElementById("i-COMTVecSiz").value;
    
    
    document.getElementById("i-COMTVisWid").value = window.innerWidth - 260;
    
    document.getElementById("c-2").width = document.getElementById("i-COMTVisWid").value;
    document.getElementById("c-5").width = document.getElementById("i-COMTVisWid").value;
    document.querySelector('.range').style.width = (document.getElementById("i-COMTVisWid").value - infoWidth + 15) + "px";
    document.querySelector('.blueRange').style.width = (document.getElementById("i-COMTVisWid").value - infoWidth + 15) + "px";
}
if(deviceType === "tablet"){
    document.getElementById("i-COMTVecSiz").value = 300;

    document.getElementById("c-3").width = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-3").height = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-4").width = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-4").height = document.getElementById("i-COMTVecSiz").value;
    
    
    document.getElementById("i-COMTVisWid").value = window.innerWidth - 360;
    
    document.getElementById("c-2").width = document.getElementById("i-COMTVisWid").value;
    document.getElementById("c-5").width = document.getElementById("i-COMTVisWid").value;
    document.querySelector('.range').style.width = (document.getElementById("i-COMTVisWid").value - infoWidth + 15) + "px";
    document.querySelector('.blueRange').style.width = (document.getElementById("i-COMTVisWid").value - infoWidth + 15) + "px";
}
if(deviceType === "desktop"){
    document.getElementById("i-COMTVecSiz").value = 380;

    document.getElementById("c-3").width = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-3").height = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-4").width = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-4").height = document.getElementById("i-COMTVecSiz").value;
    
    
    document.getElementById("i-COMTVisWid").value = window.innerWidth - 480;
    
    document.getElementById("c-2").width = document.getElementById("i-COMTVisWid").value;
    document.getElementById("c-5").width = document.getElementById("i-COMTVisWid").value;
    document.querySelector('.range').style.width = (document.getElementById("i-COMTVisWid").value - infoWidth + 15) + "px";
    document.querySelector('.blueRange').style.width = (document.getElementById("i-COMTVisWid").value - infoWidth + 15) + "px";
}
document.getElementById("c-2").height = Number(document.getElementById("i-COMTVecSiz").value);
let tempCtx = document.getElementById("c-2").getContext("2d");
let image = new Image(Number(document.getElementById("i-COMTVecSiz").value), Number(document.getElementById("i-COMTVecSiz").value));
image.onload = function(){
    tempCtx.drawImage(image, (Number(document.getElementById("i-COMTVisWid").value) - Number(document.getElementById("i-COMTVecSiz").value)) / 2, 0, Number(document.getElementById("i-COMTVecSiz").value), Number(document.getElementById("i-COMTVecSiz").value));
}
image.src = "drop_files.png";


//let countCalc = 0;
//let currentValues;
let startX;

let allX = 0;

let centXVect = 200;

let centYVect = 200;

let multVect = 1;


let chanelsData = new Array();
let usedSpace;

let distanseProtection = new Array();

let differentialProtection = new Array();

let cfgFile;
let datFile;
let cfgFileAdd;
let datFileAdd;

let tempComtrade = new COMTRADE();
let vdGroup = new VDGroup("vdContainer", "isVDSum");
vdGroup.addVd();

distanseProtection.push(new RelayProtection("ic2-", "REX670 IC"));
distanseProtection[distanseProtection.length - 1].ABBIC();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isCalc1ABB", document.getElementById("iCalculationsContainer"));

distanseProtection.push(new RelayProtection("ic1-", "ДЗ2, КРС 1 (2, 3) IC"));
distanseProtection[distanseProtection.length - 1].DZ2KPS123IC();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isCalc1dz", document.getElementById("iCalculationsContainer"));

distanseProtection.push(new RelayProtection("ic3-", "7SA IC"));
distanseProtection[distanseProtection.length - 1].SIMIC();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isCalc1Sim", document.getElementById("iCalculationsContainer"));

distanseProtection.push(new RelayProtection("ic4-", "L60 IC"));
distanseProtection[distanseProtection.length - 1].L60IC();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isCalc1L60", document.getElementById("iCalculationsContainer"));

distanseProtection.push(new RelayProtection("ic5-", "ПМ РЗА L0XX IC"));
distanseProtection[distanseProtection.length - 1].HARIC();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isCalc1Har", document.getElementById("iCalculationsContainer"));

distanseProtection.push(new RelayProtection("ic6-", "RIO IC"));
distanseProtection[distanseProtection.length - 1].RIOIC();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isCalcRIO", document.getElementById("iCalculationsContainer"));

distanseProtection.push(new RelayProtection("ic7-", "ШДЕ 280X IC"));
distanseProtection[distanseProtection.length - 1].SHDEIC();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isCalc1SHDE", document.getElementById("iCalculationsContainer"));


distanseProtection.push(new RelayProtection("rp1-", "Z 1"));
distanseProtection[distanseProtection.length - 1].DZ2KPS123ZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isC1", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp2-", "Z 2"));
distanseProtection[distanseProtection.length - 1].DZ2KPS123ZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isC2", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp3-", "Z 3"));
distanseProtection[distanseProtection.length - 1].DZ2KPS123ZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isC3", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp4-", "ZM 1"));
distanseProtection[distanseProtection.length - 1].ABBZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isZM1", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp5-", "ZM 2"));
distanseProtection[distanseProtection.length - 1].ABBZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isZM2", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp6-", "ZM 3"));
distanseProtection[distanseProtection.length - 1].ABBZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isZM3", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp7-", "ZM 4"));
distanseProtection[distanseProtection.length - 1].ABBZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isZM4", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp8-", "ZM 5"));
distanseProtection[distanseProtection.length - 1].ABBZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isZM5", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp9-", "LE"));
distanseProtection[distanseProtection.length - 1].ABBLE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isLC", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp10-", "Z 1"));
distanseProtection[distanseProtection.length - 1].SIMZONE1();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isSimZ1", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp11-", "Z 2"));
distanseProtection[distanseProtection.length - 1].SIMZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isSimZ2", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp12-", "Z 3"));
distanseProtection[distanseProtection.length - 1].SIMZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isSimZ3", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp13-", "Z 4"));
distanseProtection[distanseProtection.length - 1].SIMZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isSimZ4", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp14-", "Z 5"));
distanseProtection[distanseProtection.length - 1].SIMZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isSimZ5", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp15-", "Z 1B"));
distanseProtection[distanseProtection.length - 1].SIMZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isSimZ1B", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp16-", "LE"));
distanseProtection[distanseProtection.length - 1].SIMLE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isSimLC", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp17-", "Z 1"));
distanseProtection[distanseProtection.length - 1].L60ZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isL60Z1", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp18-", "Z 2"));
distanseProtection[distanseProtection.length - 1].L60ZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isL60Z2", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp19-", "Z 3"));
distanseProtection[distanseProtection.length - 1].L60ZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isL60Z3", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp20-", "LE"));
distanseProtection[distanseProtection.length - 1].L60LE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isL60LC", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp21-", "LI"));
distanseProtection[distanseProtection.length - 1].LI();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isSimLI", document.getElementById("zonesContainer"));

differentialProtection.push(new RelayProtection("rp22-", "RET670"));
differentialProtection[differentialProtection.length - 1].RET670();
differentialProtection[differentialProtection.length - 1].enablingWithCheckbox("i-isRET670", document.getElementById("differentialContainer"));

distanseProtection.push(new RelayProtection("rp23-", "RIO"));
distanseProtection[distanseProtection.length - 1].RIO();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isRIO", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp24-", "Z 1"));
distanseProtection[distanseProtection.length - 1].HARZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isHarZ1", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp25-", "Z 2"));
distanseProtection[distanseProtection.length - 1].HARZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isHarZ2", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp26-", "Z 3"));
distanseProtection[distanseProtection.length - 1].HARZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isHarZ3", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp27-", "Z 4"));
distanseProtection[distanseProtection.length - 1].HARZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isHarZ4", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp28-", "Z 5"));
distanseProtection[distanseProtection.length - 1].HARZONE();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isHarZ5", document.getElementById("zonesContainer"));

distanseProtection.push(new RelayProtection("rp29-", "Z 1"));
distanseProtection[distanseProtection.length - 1].SHDEZONE1();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isShde1", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp30-", "Z 2"));
distanseProtection[distanseProtection.length - 1].SHDEZONE2();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isShde2", document.getElementById("zonesContainer"));
distanseProtection.push(new RelayProtection("rp31-", "Z 3"));
distanseProtection[distanseProtection.length - 1].SHDEZONE3();
distanseProtection[distanseProtection.length - 1].enablingWithCheckbox("i-isShde3", document.getElementById("zonesContainer"));

let visualisers = new Array(new COMTRADEVisualiser(new COMTRADE()));

document.getElementById("addVDSample").onclick = function(){vdGroup.addVd()}

document.getElementById("c-1").addEventListener("mousedown", function (e){
    document.getElementById("i-X").value = e.offsetX;
    document.getElementById("i-Y").value = e.offsetY;
});
document.getElementById("c-3").addEventListener("mousedown", function (e){
    centXVect = e.offsetX;
    centYVect = e.offsetY;
});
document.getElementById("c-4").addEventListener("mousedown", function (e){
    document.getElementById("i-X").value = e.offsetX * document.getElementById("c-1").width / document.getElementById("c-4").width;
    document.getElementById("i-Y").value = e.offsetY * document.getElementById("c-1").height / document.getElementById("c-4").height;
});
let initialDistance0;
document.getElementById("c-2").addEventListener("mousedown", function (e){
    initialDistance0 = e.offsetX;
});
document.getElementById("c-2").addEventListener("mouseup", function (e){
    allX = allX + e.offsetX - initialDistance0;
    if(e.offsetX === initialDistance0){
        document.querySelector(".range").style.top = (e.pageY - 150) + "px";
        document.querySelector(".blueRange").style.top = (e.pageY - 150) + "px";
        clientY = e.offsetY;
    }
    setCOMTRADEImageData();
});
document.getElementById("c-1").addEventListener("wheel",function(e) {
    if (e.offsetX > dpInfo) {
        e = e || window.event;


        let delta = e.deltaY || e.detail || e.wheelDelta;

        let info = document.getElementById('delta');


        document.getElementById("i-Mult").value = + Number(document.getElementById("i-Mult").value) - delta/1000;

        document.getElementById("i-Mult").value = Number(document.getElementById("i-Mult").value).toFixed(1);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
});
// Get the element to be zoomed
let initialDistance1 = 0;
let currentDistance1 = 0;

let wasTwo1 = false;

document.getElementById("c-1").addEventListener('touchstart', function (event) {
  const touches = event.touches;
  if (touches.length === 2) {
    initialDistance1 = Math.hypot(
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    );
    wasTwo1 = true;
      event.preventDefault();

  }
});

document.getElementById("c-1").addEventListener('touchmove', function (event) {
    wasTwo1 = false;
  const touches = event.touches;
  if (touches.length === 2) {
    currentDistance1 = Math.hypot(
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    );
    wasTwo1 = true;
    event.preventDefault();

    // You can use the change in distance (currentDistance - initialDistance) to implement zoom functionality
    // For example, adjust the scale of the element based on the change in distance.
  }
});
document.getElementById("c-1").addEventListener('touchend', function (event) {
    if(wasTwo1){
        document.getElementById("i-Mult").value = document.getElementById("i-Mult").value * (currentDistance1 / initialDistance1);
    }
    wasTwo1 = false;
});

document.getElementById("c-3").addEventListener("wheel",function(e) {
    if (e.offsetX > dpInfo) {
        e = e || window.event;


        let delta = e.deltaY || e.detail || e.wheelDelta;

        let info = document.getElementById('delta');


        multVect = + Number(multVect) - delta/1000;

        multVect = Number(multVect).toFixed(1);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
});
let initialDistance3 = 0;
let currentDistance3 = 0;

let wasTwo3 = false;

document.getElementById("c-3").addEventListener('touchstart', function (event) {
  const touches = event.touches;
  if (touches.length === 2) {
    initialDistance3 = Math.hypot(
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    );
    wasTwo3 = true;
      event.preventDefault();

  }
});

document.getElementById("c-3").addEventListener('touchmove', function (event) {
    wasTwo3 = false;
  const touches = event.touches;
  if (touches.length === 2) {
    currentDistance3 = Math.hypot(
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    );
    wasTwo3 = true;
    event.preventDefault();

    // You can use the change in distance (currentDistance - initialDistance) to implement zoom functionality
    // For example, adjust the scale of the element based on the change in distance.
  }
});
document.getElementById("c-3").addEventListener('touchend', function (event) {
    if(wasTwo3){
        multVect = multVect * (currentDistance3 / initialDistance3);
    }
    wasTwo3 = false;
});
document.getElementById("c-4").addEventListener("wheel",function(e) {
    if (e.offsetX > dpInfo) {
        e = e || window.event;


        let delta = e.deltaY || e.detail || e.wheelDelta;

        let info = document.getElementById('delta');


        document.getElementById("i-Mult").value = + Number(document.getElementById("i-Mult").value) - delta/1000;

        document.getElementById("i-Mult").value = Number(document.getElementById("i-Mult").value).toFixed(1);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
});

let initialDistance4 = 0;
let currentDistance4 = 0;

let wasTwo4 = false;

document.getElementById("c-4").addEventListener('touchstart', function (event) {
  const touches = event.touches;
  if (touches.length === 2) {
    initialDistance4 = Math.hypot(
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    );
    wasTwo4 = true;
      event.preventDefault();

  }
});

document.getElementById("c-4").addEventListener('touchmove', function (event) {
    wasTwo4 = false;
  const touches = event.touches;
  if (touches.length === 2) {
    currentDistance4 = Math.hypot(
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    );
    wasTwo4 = true;
    event.preventDefault();

    // You can use the change in distance (currentDistance - initialDistance) to implement zoom functionality
    // For example, adjust the scale of the element based on the change in distance.
  }
});
document.getElementById("c-4").addEventListener('touchend', function (event) {
    if(wasTwo4){
        document.getElementById("i-Mult").value = document.getElementById("i-Mult").value * (currentDistance4 / initialDistance4);
    }
    wasTwo4 = false;
});
document.getElementById("pasteArea1").ondblclick = function(e) {
    new Toast({
        title: false,
        text: "Paste",
        theme: "light",
        autohide: true,
        interval: 5000
    });
    let result = new Complex();
    document.getElementById("i-calcN1F1").value = bufferA;
    document.getElementById("i-calcN2F1").value = bufferF;
    result.setExponntial(
        document.getElementById("i-calcN1F1").value,
        document.getElementById("i-calcN2F1").value
    );
    document.getElementById("i-calcN1F2").value = result.r.toFixed(4);
    document.getElementById("i-calcN2F2").value = result.i.toFixed(4);
}
document.getElementById("pasteArea2").ondblclick = function(e) {
    new Toast({
        title: false,
        text: "Paste",
        theme: "light",
        autohide: true,
        interval: 5000
    });
    let result = new Complex();
    document.getElementById("i-calcN3F1").value = bufferA;
    document.getElementById("i-calcN4F1").value = bufferF;
    result.setExponntial(
        document.getElementById("i-calcN3F1").value,
        document.getElementById("i-calcN4F1").value
    );
    document.getElementById("i-calcN3F2").value = result.r.toFixed(4);
    document.getElementById("i-calcN4F2").value = result.i.toFixed(4);
}
document.getElementById("AlignAdditional").onclick = function(e) {
    let cursor1 = Number(document.getElementById("i-range1").value) / 100;
    let cursor2 = Number(document.getElementById("i-range2").value) / 100;
    let visualiserCanvas = document.getElementById("c-2");
    let time = Number(document.getElementById("i-COMTTime").value) / 1000;
    let offset = (((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor1) - ((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor2)) / time;
    visualisers[0].COMTRADE.offsetAdditional(offset);
    setCOMTRADEImageData();
}
document.getElementById("c-2").addEventListener("wheel",function(e) {
    if (e.offsetX > infoWidth&&e.offsetX < document.getElementById("c-2").width - leftInfoWidth) {
        /*if(e.ctrlKey){
            e = e || window.event;

            // wheelDelta не даёт возможность узнать количество пикселей
            let delta = e.deltaY || e.detail || e.wheelDelta;
    
            let info = document.getElementById('delta');
            if(visualisers[0].COMTRADE.configuration.analogChannels === 0){
                for(let i = 0;i < chanelsData.length;i++){
                    if(e.offsetY > chanelsData[i].startY&&e.offsetY < chanelsData[i].endY){
                        for(let q = 0;q < visualisers.length;q++){
                            if(chanelsData[i].COMTRADE === visualisers[q].COMTRADE){
                                visualisers[q].startX -= delta / 100;
                                visualisers[q].startX = Math.round(visualisers[q].startX);
                                break;
                            }
                        }
                        break;
                    }
                }
            }else{
                new Toast({
                    title: false,
                    text: "Sorry, you can\'t move files now",
                    theme: "warning",
                    autohide: true,
                    interval: 5000
                });
            }

            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
        else */if(e.shiftKey){
            e = e || window.event;

            // wheelDelta не даёт возможность узнать количество пикселей
            let delta = e.deltaY || e.detail || e.wheelDelta;
    
            let info = document.getElementById('delta');


            allX -= delta / 10;
    
            allX = Math.round(allX);
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
        else{
            e = e || window.event;

            // wheelDelta не даёт возможность узнать количество пикселей
            let delta = e.deltaY || e.detail || e.wheelDelta;

            let cursor1ScreenPos = (((document.getElementById("c-2").width - infoWidth - leftInfoWidth) * Number(document.getElementById("i-range1").value) / 100) - allX) / Number(document.getElementById("i-COMTTime").value);
    
            let info = document.getElementById('delta');

            document.getElementById("i-COMTTime").value = +Number(document.getElementById("i-COMTTime").value) - delta / 1000;
    
            document.getElementById("i-COMTTime").value = Number(document.getElementById("i-COMTTime").value);

            if(Number(document.getElementById("i-COMTTime").value) < 0.1){
                document.getElementById("i-COMTTime").value = 0.1;
            }
            let cursor1ScreenPos2 = (((document.getElementById("c-2").width - infoWidth - leftInfoWidth) * Number(document.getElementById("i-range1").value) / 100) - allX) / Number(document.getElementById("i-COMTTime").value);

            allX = allX - (cursor1ScreenPos - cursor1ScreenPos2) * Number(document.getElementById("i-COMTTime").value);
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
        setCOMTRADEImageData();
    }
    /*else if(e.shiftKey){

    }*/
});
let initialDistance2 = 0;
let currentDistance2 = 0;
let initalX2 = 0;
let currentX2 = 0;

let wasTwo2 = false;

document.getElementById("c-2").addEventListener('touchstart', function (event) {
  const touches = event.touches;
  if (touches.length === 2) {
    initialDistance2 = Math.hypot(
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    );
    wasTwo2 = true;
      event.preventDefault();

  }else{
    initalX2 = touches[0].pageX;
    currentX2 = touches[0].pageX;
  }
});

document.getElementById("c-2").addEventListener('touchmove', function (event) {
  const touches = event.touches;
  if(touches[0].pageX > infoWidth){
    wasTwo2 = false;
    if (touches.length === 2) {
      currentDistance2 = Math.hypot(
        touches[0].pageX - touches[1].pageX,
        touches[0].pageY - touches[1].pageY
      );
      wasTwo2 = true;
  
      // You can use the change in distance (currentDistance - initialDistance) to implement zoom functionality
      // For example, adjust the scale of the element based on the change in distance.
    }else{
        currentX2 = touches[0].pageX;
    }
    event.preventDefault();
  }
  else{
    currentX2 = initalX2;
  }
});
document.getElementById("c-2").addEventListener('touchend', function (event) {
    if(wasTwo2){
        let cursor1ScreenPos = (((document.getElementById("c-2").width - infoWidth - leftInfoWidth) * Number(document.getElementById("i-range1").value) / 100) - allX) / Number(document.getElementById("i-COMTTime").value);
    
        let info = document.getElementById('delta');

        document.getElementById("i-COMTTime").value = Number(document.getElementById("i-COMTTime").value) * (currentDistance2 / initialDistance2);
    
        document.getElementById("i-COMTTime").value = Number(document.getElementById("i-COMTTime").value);

        if(Number(document.getElementById("i-COMTTime").value) < 0.1){
            document.getElementById("i-COMTTime").value = 0.1;
        }
        let cursor1ScreenPos2 = (((document.getElementById("c-2").width - infoWidth - leftInfoWidth) * Number(document.getElementById("i-range1").value) / 100) - allX) / Number(document.getElementById("i-COMTTime").value);

        allX = allX - (cursor1ScreenPos - cursor1ScreenPos2) * Number(document.getElementById("i-COMTTime").value);
        setCOMTRADEImageData();
    
    }
    else{
        allX -= (initalX2 - currentX2);
        setCOMTRADEImageData();
    }
    wasTwo2 = false;
});
document.getElementById("i-calcN1F1").onchange = other1;
document.getElementById("i-calcN2F1").onchange = other1;
function other1(){
    let result = new Complex();
    result.setExponntial(
        document.getElementById("i-calcN1F1").value,
        document.getElementById("i-calcN2F1").value
    );
    document.getElementById("i-calcN1F2").value = result.r.toFixed(4);
    document.getElementById("i-calcN2F2").value = result.i.toFixed(4);
}

document.getElementById("i-calcN3F1").onchange = other2;
document.getElementById("i-calcN4F1").onchange = other2;

function other2(){
    let result = new Complex();
    result.setExponntial(
        document.getElementById("i-calcN3F1").value,
        document.getElementById("i-calcN4F1").value
    );
    document.getElementById("i-calcN3F2").value = result.r.toFixed(4);
    document.getElementById("i-calcN4F2").value = result.i.toFixed(4);
}

document.getElementById("i-calcN1F2").onchange = other3;
document.getElementById("i-calcN2F2").onchange = other3;

function other3(){
    let result = new Complex();
    result.setRectangular(
        document.getElementById("i-calcN1F2").value,
        document.getElementById("i-calcN2F2").value
    );
    document.getElementById("i-calcN1F1").value = result.a.toFixed(4);
    document.getElementById("i-calcN2F1").value = result.f.toFixed(4);
}


document.getElementById("i-calcN3F2").onchange = other4;
document.getElementById("i-calcN4F2").onchange = other4;


function other4(){
    let result = new Complex();
    result.setRectangular(
        document.getElementById("i-calcN3F2").value,
        document.getElementById("i-calcN4F2").value
    );
    document.getElementById("i-calcN3F1").value = result.a.toFixed(4);
    document.getElementById("i-calcN4F1").value = result.f.toFixed(4);
}

document.getElementById("b-calcFr1").onclick = function fr1(){
    document.getElementById("i-calcN1F1").value = document.getElementById("t-calcA").innerHTML;
    document.getElementById("i-calcN2F1").value = document.getElementById("t-calcF").innerHTML;
}
document.getElementById("b-calcFr2").onclick = function fr2(){
    document.getElementById("i-calcN1F2").value = document.getElementById("t-calcR").innerHTML;
    document.getElementById("i-calcN2F2").value = document.getElementById("t-calcI").innerHTML;
}
document.getElementById("b-calcFr3").onclick = function fr3(){
    document.getElementById("i-calcN3F1").value = document.getElementById("t-calcA").innerHTML;
    document.getElementById("i-calcN4F1").value = document.getElementById("t-calcF").innerHTML;
}
document.getElementById("b-calcFr4").onclick = function fr4(){
    document.getElementById("i-calcN3F2").value = document.getElementById("t-calcR").innerHTML;
    document.getElementById("i-calcN4F2").value = document.getElementById("t-calcI").innerHTML;
}
document.getElementById("b-calcInc").onclick = function increase(){
    let a = new Complex();
    a.setExponntial(
        document.getElementById("i-calcN1F1").value,
        document.getElementById("i-calcN2F1").value
    );
    let b = new Complex();
    b.setExponntial(
        document.getElementById("i-calcN3F1").value,
        document.getElementById("i-calcN4F1").value
    );
    let result = new Complex();
    result.increase(a, b);
    document.getElementById("t-calcA").innerHTML = result.a.toFixed(4);
    document.getElementById("t-calcF").innerHTML = result.f.toFixed(4);
    document.getElementById("t-calcR").innerHTML = result.r.toFixed(4);
    document.getElementById("t-calcI").innerHTML = result.i.toFixed(4);
}
document.getElementById("b-calcDec").onclick = function decrease(){
    let a = new Complex();
    a.setExponntial(
        document.getElementById("i-calcN1F1").value,
        document.getElementById("i-calcN2F1").value
    );
    let b = new Complex();
    b.setExponntial(
        document.getElementById("i-calcN3F1").value,
        document.getElementById("i-calcN4F1").value
    );
    let result = new Complex();
    result.decrease(a, b);
    document.getElementById("t-calcA").innerHTML = result.a.toFixed(4);
    document.getElementById("t-calcF").innerHTML = result.f.toFixed(4);
    document.getElementById("t-calcR").innerHTML = result.r.toFixed(4);
    document.getElementById("t-calcI").innerHTML = result.i.toFixed(4);
}
document.getElementById("b-calcPlus").onclick = function plus(){
    let a = new Complex();
    a.setRectangular(
        document.getElementById("i-calcN1F2").value,
        document.getElementById("i-calcN2F2").value
    );
    let b = new Complex();
    b.setRectangular(
        document.getElementById("i-calcN3F2").value,
        document.getElementById("i-calcN4F2").value
    );
    let result = new Complex();
    result.plus(a, b);
    document.getElementById("t-calcA").innerHTML = result.a.toFixed(4);
    document.getElementById("t-calcF").innerHTML = result.f.toFixed(4);
    document.getElementById("t-calcR").innerHTML = result.r.toFixed(4);
    document.getElementById("t-calcI").innerHTML = result.i.toFixed(4);
}
document.getElementById("b-calcMinus").onclick = function minus(){
    let a = new Complex();
    a.setRectangular(
        document.getElementById("i-calcN1F2").value,
        document.getElementById("i-calcN2F2").value
    );
    let b = new Complex();
    b.setRectangular(
        document.getElementById("i-calcN3F2").value,
        document.getElementById("i-calcN4F2").value
    );
    let result = new Complex();
    result.minus(a, b);
    document.getElementById("t-calcA").innerHTML = result.a.toFixed(4);
    document.getElementById("t-calcF").innerHTML = result.f.toFixed(4);
    document.getElementById("t-calcR").innerHTML = result.r.toFixed(4);
    document.getElementById("t-calcI").innerHTML = result.i.toFixed(4);
}
document.getElementById("b-calcDel").onclick = function earze(){
    document.getElementById("i-calcN1F1").value = "";
    document.getElementById("i-calcN2F1").value = "";
    document.getElementById("i-calcN3F1").value = "";
    document.getElementById("i-calcN4F1").value = "";

    document.getElementById("i-calcN1F2").value = "";
    document.getElementById("i-calcN2F2").value = "";
    document.getElementById("i-calcN3F2").value = "";
    document.getElementById("i-calcN4F2").value = "";

    document.getElementById("t-calcA").innerHTML = "";
    document.getElementById("t-calcF").innerHTML = "";
    document.getElementById("t-calcR").innerHTML = "";
    document.getElementById("t-calcI").innerHTML = "";
}



let isRightFrames = true;

function Update(){
    if(!document.getElementById("i-isC-3").checked&&!document.getElementById("i-isC-4").checked&&isRightFrames){
        document.getElementById("i-COMTVisWid").value = Number(document.getElementById("i-COMTVisWid").value) + document.getElementById("c-3").width;
        document.getElementById("i-COMTVisWid").onchange();
        isRightFrames = false;
    }
    if(document.getElementById("i-isC-3").checked||document.getElementById("i-isC-4").checked){
        if(!isRightFrames){
            document.getElementById("i-COMTVisWid").value = Number(document.getElementById("i-COMTVisWid").value) - document.getElementById("c-3").width;
            document.getElementById("i-COMTVisWid").onchange();
            isRightFrames = true;
        }
    }
    if(!(document.getElementById("VD").className === "hidden")) {
        vdGroup.Update();
    }
    if(!(document.getElementById("COMTRADE").className === "hidden")) {
        renderCOMTRADE();
    }
    updateDistanceProtection();
    //if(!(document.getElementById("Calc").className === "hidden")) {}
}
document.getElementById("i-isC-4").onchange = function(){
    if(document.getElementById("i-isC-4").checked){
        document.getElementById("c-4").className = "relativeCanvas";
    }else{
        document.getElementById("c-4").className = "hidden";
    }
}
document.getElementById('c-2').ondrop = function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
                if(type === "cfg"){
                    cfgFile = file;
                }
                else if(type === "dat"){
                    datFile = file;
                }
            }
        });
        try{
            document.getElementById('dropCFG').innerHTML = cfgFile.name;
        }catch{}
        try{
            document.getElementById('dropDAT').innerHTML = datFile.name;
        }catch{}
        try{
            visualisers[0].COMTRADE.readCfg = function(){
                visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
                updateCOMTRADE();
                rescale()
                setCOMTRADEImageData();
            }
        }catch{}
        try{
            visualisers[0].COMTRADE.readDat = function(){
                visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
                updateCOMTRADE();
                rescale()
                setCOMTRADEImageData();
            }
        }catch{}
        let encoder = document.getElementById('i-windows').checked === true ? "windows-1251" : "CP866";
        visualisers[0].COMTRADE.read(cfgFile, datFile, encoder);
    }
}
document.getElementById('c-2').ondragover =  function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}
/*document.getElementById('dropCOMTRADEAdd').ondrop = function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
                if(type === "cfg"){
                    cfgFileAdd = file;
                }
                else if(type === "dat"){
                    datFileAdd = file;
                }
            }
        });
        try{
            document.getElementById('dropCFGAdd').innerHTML = cfgFileAdd.name;
        }catch{}
        try{
            document.getElementById('dropDATAdd').innerHTML = datFileAdd.name;
        }catch{}
        try{
            visualisers[2].COMTRADE.readCfg = function(){
                visualisers[2].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth, "rgba(0, 255, 0, 0.1)");
                updateCOMTRADE();
                setCOMTRADEImageData();
            }
        }catch{}
        try{
            visualisers[2].COMTRADE.readDat = function(){
                visualisers[2].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth, "rgba(0, 255, 0, 0.1)");
                updateCOMTRADE();
                setCOMTRADEImageData();
            }
        }catch{}
        let encoder = document.getElementById('i-windows').checked === true ? "windows-1251" : "CP866";
        visualisers[2].COMTRADE.read(cfgFileAdd, datFileAdd, encoder);
    }
}
document.getElementById('dropCOMTRADEAdd').ondragover =  function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}
*/
document.getElementById('COMTRADEopen').onclick = function(e){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(e){
        let file = e.target.files[0];
        let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
        if(type === "cfg"){
            cfgFile = file;
        }
        else if(type === "dat"){
            datFile = file;
        }
        try{
            document.getElementById('dropCFG').innerHTML = cfgFile.name;
        }catch{}
        try{
            document.getElementById('dropDAT').innerHTML = datFile.name;
        }catch{}
        try{
            visualisers[0].COMTRADE.readCfg = function(){
                visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
                updateCOMTRADE();
                rescale()
                setCOMTRADEImageData();
            }
        }catch{}
        try{
            visualisers[0].COMTRADE.readDat = function(){
                visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
                updateCOMTRADE();
                rescale()
                setCOMTRADEImageData();
            }
        }catch{}
        let encoder = document.getElementById('i-windows').checked === true ? "windows-1251" : "CP866";
        visualisers[0].COMTRADE.read(cfgFile, datFile, encoder);
    }
    input.click();
}
/*
document.getElementById('COMTRADEopenAdd').onclick = function(e){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(e){
        let file = e.target.files[0];
        let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
        if(type === "cfg"){
            cfgFileAdd = file;
        }
        else if(type === "dat"){
            datFileAdd = file;
        }
        try{
            document.getElementById('dropCFGAdd').innerHTML = cfgFileAdd.name;
        }catch{}
        try{
            document.getElementById('dropDATAdd').innerHTML = datFileAdd.name;
        }catch{}
        try{
            visualisers[2].COMTRADE.readCfg = function(){
                visualisers[2].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth, "rgba(0, 255, 0, 0.1)");
                updateCOMTRADE();
                setCOMTRADEImageData();
            }
        }catch{}
        try{
            visualisers[2].COMTRADE.readDat = function(){
                visualisers[2].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth, "rgba(0, 255, 0, 0.1)");
                updateCOMTRADE();
                setCOMTRADEImageData();
            }
        }catch{}
        let encoder = document.getElementById('i-windows').checked === true ? "windows-1251" : "CP866";
        visualisers[2].COMTRADE.read(cfgFileAdd, datFileAdd, encoder);
    }
    input.click();
}
*/
document.getElementById("rescale").onclick = rescale;
function rescale(){
    allX = 0;
    try{
        document.getElementById("i-COMTTime").value = (document.getElementById("c-2").width - infoWidth - leftInfoWidth) / (visualisers[0].COMTRADE.configuration.samples * visualisers[0].COMTRADE.configuration.samplingTimePeriod / 1000);
    }catch{}
    setCOMTRADEImageData();
}
document.getElementById("c-2").ondblclick = function(e){
    for(let i = 0;i < chanelsData.length;i++){
        if(e.offsetY > chanelsData[i].startY&&e.offsetY < chanelsData[i].endY){
            if(chanelsData[i].isAnalog){
                bufferA = chanelsData[i].pointData.RMS1;
                bufferF = chanelsData[i].pointData.angle;
                new Toast({
                    title: false,
                    text: "Copy from " + chanelsData[i].pointData.Name,
                    theme: "light",
                    autohide: true,
                    interval: 5000
                });
            }
        }
    }
}
document.getElementById("i-lineWidth").onchange = function(){
    setCOMTRADEImageData();
}

document.getElementById("encoder").onchange = function(){
    let encoder = document.getElementById('i-windows').checked === true ? "windows-1251" : "CP866";
    visualisers[0].COMTRADE.read(cfgFile, datFile, encoder);
}
document.getElementById("DownloadCOMTRADE").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Download COMTRADE file</h1>
            <hr class="innerHr">
            <p class="text">Name</p>
            <input type="text" id="i-calculationName" class="textBox" value="RH-COMTRADE">
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li><a>Analog Channnels</a>
                        <ul id="calculationAnalogChannels" class = "scrollable">
                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <a><input type = "checkbox" id = "i-calculationWriteDigital" checked> Write digital channels</a>
            <hr class="innerHr">
            <a><input type = "checkbox" id = "i-calculationWriteEmpty"> Write empty digital channels</a>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Download</button>
        </div>
    `;
    //document.getElementById("zsMessage").style.top = window.innerHeight / 2;
    //document.getElementById("zsMessage").style.left = window.innerWidth / 2;
    let channelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    channelHTML +=("<li><a><input id = \"i-calculationAnalogChannels" + i + "-" + q + "\" type = \"checkbox\" " + (document.getElementById("i-visualisation" + i + "-" + q).checked ? "checked" : "") + "> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            channelHTML += ("<hr class = \"innerHr\">");;
        }catch{}
    }
    document.getElementById("calculationAnalogChannels").innerHTML = channelHTML;

    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let analogChannels = new Array(visualisers[0].COMTRADE.configuration.analogChannels);
        for(let q = 0;q < visualisers[0].COMTRADE.configuration.analogChannels;q++){
            try{
                analogChannels[q] = document.getElementById("i-calculationAnalogChannels" + 0 + "-" + q).checked
            }catch{}
        }
        try{
            let files = visualisers[0].COMTRADE.write(analogChannels, document.getElementById("i-calculationWriteDigital").checked, document.getElementById("i-calculationWriteEmpty").checked);

            let downloadLink = document.createElement('a');

            downloadLink.href = URL.createObjectURL(files[0]);
            downloadLink.download = document.getElementById("i-calculationName").value + '.cfg';
            downloadLink.click();

            downloadLink.href = URL.createObjectURL(files[1]);
            downloadLink.download = document.getElementById("i-calculationName").value + '.dat';
            downloadLink.click();

            new Toast({
                title: false,
                text: "Writing complete",
                theme: "success",
                autohide: true,
                interval: 5000
            });
            document.getElementById("promtContainer").innerHTML = "";
        }catch{
            new Toast({
                title: false,
                text: "Failed to download",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("OpenCOMTRADEAdd").onclick = function(){
    document.getElementById("promtContainer").innerHTML =`
        <div id="calculationMessage" class="message">
            <h1 class="text">Open additional COMTRADE file</h1>
            <hr class="innerHr">
            <div class="direction">
                <label>
                    <input type="checkbox" id="i-calculationIsConsistent" value="1">
                    <span>Consistent</span>
                    Parallel
                </label>
            </div>
            <hr class="innerHr">
            <p class="text">Max time difference, seconds</p>
            <input type="number" id="i-calculationMTD" class="textBox" value="3">
            <hr class="innerHr">
            <div class = "outerBox">
                <div class = "drop" id = "dropCOMTRADEAdd">
                    <p>Drag additional COMTRADE files here or</p>
                    <div id = "dropCFGAdd"></div>
                    <div id = "dropDATAdd"></div>
                    <button class = "openButton" id = "COMTRADEopenAdd">Open</button>
                </div>
            </div>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    document.getElementById('dropCOMTRADEAdd').ondrop = function dropHandler(ev) {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
      
        if (ev.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
                    if(type === "cfg"){
                        cfgFileAdd = file;
                    }
                    else if(type === "dat"){
                        datFileAdd = file;
                    }
                }
            });
            try{
                document.getElementById('dropCFGAdd').innerHTML = cfgFileAdd.name;
            }catch{}
            try{
                document.getElementById('dropDATAdd').innerHTML = datFileAdd.name;
            }catch{}
            let encoder = document.getElementById('i-windows').checked === true ? "windows-1251" : "CP866";
            tempComtrade.read(cfgFileAdd, datFileAdd, encoder);
        }
    }
    document.getElementById('dropCOMTRADEAdd').ondragover =  function dragOverHandler(ev) {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }
    document.getElementById('COMTRADEopenAdd').onclick = function(e){
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = function(e){
            let file = e.target.files[0];
            let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
            if(type === "cfg"){
                cfgFileAdd = file;
            }
            else if(type === "dat"){
                datFileAdd = file;
            }
            try{
                document.getElementById('dropCFGAdd').innerHTML = cfgFileAdd.name;
            }catch{}
            try{
                document.getElementById('dropDATAdd').innerHTML = datFileAdd.name;
            }catch{}
            let encoder = document.getElementById('i-windows').checked === true ? "windows-1251" : "CP866";
            tempComtrade.read(cfgFileAdd, datFileAdd, encoder);
        }
        input.click();
    }

    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
        tempComtrade = new COMTRADE();
        cfgFileAdd = null;
        datFileAdd = null;
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        try{
            visualisers[0].COMTRADE.combine(tempComtrade, document.getElementById("i-calculationIsConsistent").checked, Number(document.getElementById("i-calculationMTD").value))
            visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
            tempComtrade = new COMTRADE();
            cfgFileAdd = null;
            datFileAdd = null;
            new Toast({
                title: false,
                text: "Added additional COMTRADE file",
                theme: "success",
                autohide: true,
                interval: 5000
            });
            document.getElementById("promtContainer").innerHTML = "";
            updateCOMTRADE();
            rescale()
            setCOMTRADEImageData();
        }catch(e){
            if(e.message === "Time diffrence is too big"){
                new Toast({
                    title: false,
                    text: "Time diffrence is too big",
                    theme: "danger",
                    autohide: true,
                    interval: 5000
                });
            }
            else if(e.message === "Files can\'t be consistent"){
                new Toast({
                    title: false,
                    text: "Files can\'t be consistent",
                    theme: "danger",
                    autohide: true,
                    interval: 5000
                });
            }
            else {
                new Toast({
                    title: false,
                    text: "Failed to add an additional file",
                    theme: "danger",
                    autohide: true,
                    interval: 5000
                });
            }
        }
    }
}
function clickIndicator(e, indicatorID, message){
    document.getElementById(indicatorID).innerHTML = message;
}
document.getElementById("AddZS").onclick = function(){
    document.getElementById("promtContainer").innerHTML =`
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new zero sequence analog channel</h1>
            <hr class="innerHr">
            <p class="text">Name</p>
            <input type="text" id="i-calculationName" class="textBox" value="New channel">
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel A<a id="calculationIndA">Channel A</a>
                        <ul id="calculationPhaseA" class = "scrollable">

                        </ul>
                    </li>
                    <li>Channel B<a id="calculationIndB">Channel B</a>
                        <ul id="calculationPhaseB" class = "scrollable">

                        </ul>
                    </li>
                    <li>Channel C<a id="calculationIndC">Channel C</a>
                        <ul id="calculationPhaseC" class = "scrollable">

                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    //document.getElementById("zsMessage").style.top = window.innerHeight / 2;
    //document.getElementById("zsMessage").style.left = window.innerWidth / 2;
    let phaseAHTML = "";
    let phaseBHTML = "";
    let phaseCHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    phaseAHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndA', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseA" + i + "-" + q + "\" name = \"phaseA\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                    phaseBHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndB', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseB" + i + "-" + q + "\" name = \"phaseB\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                    phaseCHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndC', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseC" + i + "-" + q + "\" name = \"phaseC\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            phaseAHTML += ("<hr class = \"innerHr\">");
            phaseBHTML += ("<hr class = \"innerHr\">");
            phaseCHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    document.getElementById("calculationPhaseA").innerHTML = phaseAHTML;
    document.getElementById("calculationPhaseB").innerHTML = phaseBHTML;
    document.getElementById("calculationPhaseC").innerHTML = phaseCHTML;

    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let COMTRADEA = new COMTRADE();
        let COMTRADEB = new COMTRADE();
        let COMTRADEC = new COMTRADE();

        let indexA = 0;
        let indexB = 0;
        let indexC = 0;

        let offsetA = 0;
        let offsetB = 0;
        let offsetC = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationPhaseA" + i + "-" + q).checked){
                            COMTRADEA = visualisers[i].COMTRADE;
                            indexA = q;
                            offsetA = visualisers[i].startX;
                        }
                        if(document.getElementById("i-calculationPhaseB" + i + "-" + q).checked){
                            COMTRADEB = visualisers[i].COMTRADE;
                            indexB = q;
                            offsetB = visualisers[i].startX;
                        }
                        if(document.getElementById("i-calculationPhaseC" + i + "-" + q).checked){
                            COMTRADEC = visualisers[i].COMTRADE;
                            indexC = q;
                            offsetC = visualisers[i].startX;
                        }
                    }catch{}
                }
            }catch{}
        }
        try{
            //visualisers[0].COMTRADE.addZeroSequenceAnalogChannel(COMTRADEA, indexA, offsetA, COMTRADEB, indexB, offsetB, COMTRADEC, indexC, offsetC, document.getElementById("i-calculationName").value);
            visualisers[0].COMTRADE.addAnalogChannel_Secondary(
                COMTRADE.zeroSequenceAnalogChannel(COMTRADE.changeSampleFrequency(COMTRADEA.data.analogDataPrimary[indexA], COMTRADEA.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEB.data.analogDataPrimary[indexB], COMTRADEB.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEC.data.analogDataPrimary[indexC], COMTRADEC.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod)),
                COMTRADE.zeroSequenceAnalogChannel(COMTRADE.changeSampleFrequency(COMTRADEA.data.analogDataSecondary[indexA], COMTRADEA.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEB.data.analogDataSecondary[indexB], COMTRADEB.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEC.data.analogDataSecondary[indexC], COMTRADEC.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod)),
                1,
                1,
                "",
                document.getElementById("i-calculationName").value,
                "",
                COMTRADEA.configuration.units[indexA],
                "calculation"
            );
            visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
            new Toast({
                title: false,
                text: "Added " + document.getElementById("i-calculationName").value,
                theme: "success",
                autohide: true,
                interval: 5000
            });
            document.getElementById("promtContainer").innerHTML = "";
            updateCOMTRADE(1);
            setCOMTRADEImageData();
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new channel",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("AddSS").onclick = function(){
    document.getElementById("promtContainer").innerHTML =`
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new positive sequence analog channel</h1>
            <hr class="innerHr">
            <p class="text">Name</p>
            <input type="text" id="i-calculationName" class="textBox" value="New channel">
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel A<a id="calculationIndA">Channel A</a>
                        <ul id="calculationPhaseA" class = "scrollable">

                        </ul>
                    </li>
                    <li>Channel B<a id="calculationIndB">Channel B</a>
                        <ul id="calculationPhaseB" class = "scrollable">

                        </ul>
                    </li>
                    <li>Channel C<a id="calculationIndC">Channel C</a>
                        <ul id="calculationPhaseC" class = "scrollable">

                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    //document.getElementById("zsMessage").style.top = window.innerHeight / 2;
    //document.getElementById("zsMessage").style.left = window.innerWidth / 2;
    let phaseAHTML = "";
    let phaseBHTML = "";
    let phaseCHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    phaseAHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndA', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseA" + i + "-" + q + "\" name = \"phaseA\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                    phaseBHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndB', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseB" + i + "-" + q + "\" name = \"phaseB\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                    phaseCHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndC', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseC" + i + "-" + q + "\" name = \"phaseC\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            phaseAHTML += ("<hr class = \"innerHr\">");
            phaseBHTML += ("<hr class = \"innerHr\">");
            phaseCHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    document.getElementById("calculationPhaseA").innerHTML = phaseAHTML;
    document.getElementById("calculationPhaseB").innerHTML = phaseBHTML;
    document.getElementById("calculationPhaseC").innerHTML = phaseCHTML;

    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let COMTRADEA = new COMTRADE();
        let COMTRADEB = new COMTRADE();
        let COMTRADEC = new COMTRADE();

        let indexA = 0;
        let indexB = 0;
        let indexC = 0;

        let offsetA = 0;
        let offsetB = 0;
        let offsetC = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationPhaseA" + i + "-" + q).checked){
                            COMTRADEA = visualisers[i].COMTRADE;
                            indexA = q;
                            offsetA = visualisers[i].startX;
                        }
                        if(document.getElementById("i-calculationPhaseB" + i + "-" + q).checked){
                            COMTRADEB = visualisers[i].COMTRADE;
                            indexB = q;
                            offsetB = visualisers[i].startX;
                        }
                        if(document.getElementById("i-calculationPhaseC" + i + "-" + q).checked){
                            COMTRADEC = visualisers[i].COMTRADE;
                            indexC = q;
                            offsetC = visualisers[i].startX;
                        }
                    }catch{}
                }
            }catch{}
        }
        try{
            visualisers[0].COMTRADE.addAnalogChannel_Secondary(
                COMTRADE.positiveSequenceAnalogChannel(COMTRADE.changeSampleFrequency(COMTRADEA.data.analogDataPrimary[indexA], COMTRADEA.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEB.data.analogDataPrimary[indexB], COMTRADEB.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEC.data.analogDataPrimary[indexC], COMTRADEC.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingFrequency / visualisers[0].COMTRADE.configuration.frequency),
                COMTRADE.positiveSequenceAnalogChannel(COMTRADE.changeSampleFrequency(COMTRADEA.data.analogDataSecondary[indexA], COMTRADEA.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEB.data.analogDataSecondary[indexB], COMTRADEB.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEC.data.analogDataSecondary[indexC], COMTRADEC.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingFrequency / visualisers[0].COMTRADE.configuration.frequency),
                1,
                1,
                "",
                document.getElementById("i-calculationName").value,
                "",
                COMTRADEA.configuration.units[indexA],
                "calculation"
            );
            visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
            new Toast({
                title: false,
                text: "Added " + document.getElementById("i-calculationName").value,
                theme: "success",
                autohide: true,
                interval: 5000
            });
            document.getElementById("promtContainer").innerHTML = "";
            updateCOMTRADE(1);
            setCOMTRADEImageData();
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new channel",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("AddRS").onclick = function(){
    document.getElementById("promtContainer").innerHTML =`
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new negative sequence analog channel</h1>
            <hr class="innerHr">
            <p class="text">Name</p>
            <input type="text" id="i-calculationName" class="textBox" value="New channel">
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel A<a id="calculationIndA">Channel A</a>
                        <ul id="calculationPhaseA" class = "scrollable">

                        </ul>
                    </li>
                    <li>Channel B<a id="calculationIndB">Channel B</a>
                        <ul id="calculationPhaseB" class = "scrollable">

                        </ul>
                    </li>
                    <li>Channel C<a id="calculationIndC">Channel C</a>
                        <ul id="calculationPhaseC" class = "scrollable">

                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    //document.getElementById("zsMessage").style.top = window.innerHeight / 2;
    //document.getElementById("zsMessage").style.left = window.innerWidth / 2;
    let phaseAHTML = "";
    let phaseBHTML = "";
    let phaseCHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    phaseAHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndA', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseA" + i + "-" + q + "\" name = \"phaseA\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                    phaseBHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndB', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseB" + i + "-" + q + "\" name = \"phaseB\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                    phaseCHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndC', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseC" + i + "-" + q + "\" name = \"phaseC\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            phaseAHTML += ("<hr class = \"innerHr\">");
            phaseBHTML += ("<hr class = \"innerHr\">");
            phaseCHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    document.getElementById("calculationPhaseA").innerHTML = phaseAHTML;
    document.getElementById("calculationPhaseB").innerHTML = phaseBHTML;
    document.getElementById("calculationPhaseC").innerHTML = phaseCHTML;

    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let COMTRADEA = new COMTRADE();
        let COMTRADEB = new COMTRADE();
        let COMTRADEC = new COMTRADE();

        let indexA = 0;
        let indexB = 0;
        let indexC = 0;

        let offsetA = 0;
        let offsetB = 0;
        let offsetC = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationPhaseA" + i + "-" + q).checked){
                            COMTRADEA = visualisers[i].COMTRADE;
                            indexA = q;
                            offsetA = visualisers[i].startX;
                        }
                        if(document.getElementById("i-calculationPhaseB" + i + "-" + q).checked){
                            COMTRADEB = visualisers[i].COMTRADE;
                            indexB = q;
                            offsetB = visualisers[i].startX;
                        }
                        if(document.getElementById("i-calculationPhaseC" + i + "-" + q).checked){
                            COMTRADEC = visualisers[i].COMTRADE;
                            indexC = q;
                            offsetC = visualisers[i].startX;
                        }
                    }catch{}
                }
            }catch{}
        }
        try{
            visualisers[0].COMTRADE.addAnalogChannel_Secondary(
                COMTRADE.negativeSequenceAnalogChannel(COMTRADE.changeSampleFrequency(COMTRADEA.data.analogDataPrimary[indexA], COMTRADEA.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEB.data.analogDataPrimary[indexB], COMTRADEB.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEC.data.analogDataPrimary[indexC], COMTRADEC.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingFrequency / visualisers[0].COMTRADE.configuration.frequency),
                COMTRADE.negativeSequenceAnalogChannel(COMTRADE.changeSampleFrequency(COMTRADEA.data.analogDataSecondary[indexA], COMTRADEA.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEB.data.analogDataSecondary[indexB], COMTRADEB.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency(COMTRADEC.data.analogDataSecondary[indexC], COMTRADEC.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingFrequency / visualisers[0].COMTRADE.configuration.frequency),
                1,
                1,
                "",
                document.getElementById("i-calculationName").value,
                "",
                COMTRADEA.configuration.units[indexA],
                "calculation"
            );
            visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
            new Toast({
                title: false,
                text: "Added " + document.getElementById("i-calculationName").value,
                theme: "success",
                autohide: true,
                interval: 5000
            });
            document.getElementById("promtContainer").innerHTML = "";
            updateCOMTRADE(1);
            setCOMTRADEImageData();
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new channel",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("AddCC").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new custom calculation analog channel</h1>
            <hr class="innerHr">
            <p class="text">Name</p>
            <input type="text" id="i-calculationName" class="textBox" value="New channel">
            <hr class="innerHr">
            <p class="text">Formula</p>
            <textarea id="i-calculationFormula" style="width: 500px" class="textBox">CHANNELA[n] + CHANNELB[n] + CHANNELC[n]</textarea>
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel A<a id="calculationIndA">Channel A</a>
                        <ul id="calculationPhaseA" class = "scrollable">

                        </ul>
                    </li>
                    <li>Channel B<a id="calculationIndB">Channel B</a>
                        <ul id="calculationPhaseB" class = "scrollable">

                        </ul>
                    </li>
                    <li>Channel C<a id="calculationIndC">Channel C</a>
                        <ul id="calculationPhaseC" class = "scrollable">

                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    //document.getElementById("zsMessage").style.top = window.innerHeight / 2;
    //document.getElementById("zsMessage").style.left = window.innerWidth / 2;
    let phaseAHTML = "";
    let phaseBHTML = "";
    let phaseCHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    phaseAHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndA', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseA" + i + "-" + q + "\" name = \"phaseA\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                    phaseBHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndB', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseB" + i + "-" + q + "\" name = \"phaseB\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                    phaseCHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndC', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationPhaseC" + i + "-" + q + "\" name = \"phaseC\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            phaseAHTML += ("<hr class = \"innerHr\">");
            phaseBHTML += ("<hr class = \"innerHr\">");
            phaseCHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    document.getElementById("calculationPhaseA").innerHTML = phaseAHTML;
    document.getElementById("calculationPhaseB").innerHTML = phaseBHTML;
    document.getElementById("calculationPhaseC").innerHTML = phaseCHTML;

    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let tempChannelZero = new Array(visualisers[0].COMTRADE.configuration.samples);
        tempChannelZero.fill(NaN);

        let COMTRADEA;
        let COMTRADEB;
        let COMTRADEC;

        let indexA = 0;
        let indexB = 0;
        let indexC = 0;

        let offsetA = 0;
        let offsetB = 0;
        let offsetC = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationPhaseA" + i + "-" + q).checked){
                            COMTRADEA = visualisers[i].COMTRADE;
                            indexA = q;
                            offsetA = visualisers[i].startX;
                        }
                        if(document.getElementById("i-calculationPhaseB" + i + "-" + q).checked){
                            COMTRADEB = visualisers[i].COMTRADE;
                            indexB = q;
                            offsetB = visualisers[i].startX;
                        }
                        if(document.getElementById("i-calculationPhaseC" + i + "-" + q).checked){
                            COMTRADEC = visualisers[i].COMTRADE;
                            indexC = q;
                            offsetC = visualisers[i].startX;
                        }
                    }catch{}
                }
            }catch{}
        }
        
        try{
            visualisers[0].COMTRADE.addAnalogChannel_Secondary(
                COMTRADE.customAnalogChannel(COMTRADE.changeSampleFrequency((COMTRADEA ? COMTRADEA.data.analogDataPrimary[indexA] : tempChannelZero), (COMTRADEA ? COMTRADEA.configuration.samplingTimePeriod : 0), visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency((COMTRADEB ? COMTRADEB.data.analogDataPrimary[indexB] : tempChannelZero), (COMTRADEB ? COMTRADEB.configuration.samplingTimePeriod : 0), visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency((COMTRADEC ? COMTRADEC.data.analogDataPrimary[indexC] : tempChannelZero), (COMTRADEC ? COMTRADEC.configuration.samplingTimePeriod : 0), visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingFrequency / visualisers[0].COMTRADE.configuration.frequency, document.getElementById("i-calculationFormula").value),
                COMTRADE.customAnalogChannel(COMTRADE.changeSampleFrequency((COMTRADEA ? COMTRADEA.data.analogDataSecondary[indexA] : tempChannelZero), (COMTRADEA ? COMTRADEA.configuration.samplingTimePeriod : 0), visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency((COMTRADEB ? COMTRADEB.data.analogDataSecondary[indexB] : tempChannelZero), (COMTRADEB ? COMTRADEB.configuration.samplingTimePeriod : 0), visualisers[0].COMTRADE.configuration.samplingTimePeriod), COMTRADE.changeSampleFrequency((COMTRADEC ? COMTRADEC.data.analogDataSecondary[indexC] : tempChannelZero), (COMTRADEC ? COMTRADEC.configuration.samplingTimePeriod : 0), visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingFrequency / visualisers[0].COMTRADE.configuration.frequency, document.getElementById("i-calculationFormula").value),
                1,
                1,
                "",
                document.getElementById("i-calculationName").value,
                "",
                COMTRADEA.configuration.units[indexA],
                "calculation"
            );
            visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
            new Toast({
                title: false,
                text: "Added " + document.getElementById("i-calculationName").value,
                theme: "success",
                autohide: true,
                interval: 5000
            });
            document.getElementById("promtContainer").innerHTML = "";
            updateCOMTRADE(1);
            setCOMTRADEImageData();
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new channel",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}

document.getElementById("AddFC").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new frequency analog channel</h1>
            <hr class="innerHr">
            <p class="text">Name</p>
            <input type="text" id="i-calculationName" class="textBox" value="New channel">
            <hr class="innerHr" hidden>
            <p><input type="checkbox" id="i-calculationDFDT" hidden> Df/dt</p>
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel<a id = "calculationInd">Channel</a>
                        <ul id="calculationChannel" class = "scrollable">
                            <!-- Add channel options here -->
                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    //document.getElementById("zsMessage").style.top = window.innerHeight / 2;
    //document.getElementById("zsMessage").style.left = window.innerWidth / 2;
    let channelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    channelHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationInd', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationChannel" + i + "-" + q + "\" name = \"calculationChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            channelHTML += ("<hr class = \"innerHr\">");;
        }catch{}
    }
    document.getElementById("calculationChannel").innerHTML = channelHTML;

    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let COMTRADEF;

        let index = 0;

        let offset = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationChannel" + i + "-" + q).checked){
                            COMTRADEF = visualisers[i].COMTRADE;
                            index = q;
                            offset = visualisers[i].startX;
                        }
                    }catch{}
                }
            }catch{}
        }
        try{
            visualisers[0].COMTRADE.addAnalogChannel_Secondary(
                COMTRADE.frequencyAnalogChannel(COMTRADE.changeSampleFrequency(COMTRADEF.data.analogDataPrimary[index], COMTRADEF.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingTimePeriod, COMTRADEF.configuration.frequency),
                COMTRADE.frequencyAnalogChannel(COMTRADE.changeSampleFrequency(COMTRADEF.data.analogDataSecondary[index], COMTRADEF.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingTimePeriod, COMTRADEF.configuration.frequency),
                1,
                1,
                "",
                document.getElementById("i-calculationName").value,
                "",
                "Hz",
                "calculation"
            );
            if(document.getElementById("i-calculationDFDT").checked){
                visualisers[0].COMTRADE.addAnalogChannel_Secondary(
                    COMTRADE.dF_dt(COMTRADE.changeSampleFrequency(COMTRADEF.data.analogDataPrimary[index], COMTRADEF.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingTimePeriod),
                    COMTRADE.dF_dt(COMTRADE.changeSampleFrequency(COMTRADEF.data.analogDataSecondary[index], COMTRADEF.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.samplingTimePeriod), visualisers[0].COMTRADE.configuration.samplingTimePeriod),
                    1,
                    1,
                    "",
                    document.getElementById("i-calculationName").value + ", dF/dt",
                    "",
                    "Hz/s",
                    "calculation"
                );
            }
            visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
            new Toast({
                title: false,
                text: "Added " + document.getElementById("i-calculationName").value,
                theme: "success",
                autohide: true,
                interval: 5000
            });
            document.getElementById("promtContainer").innerHTML = "";
            updateCOMTRADE(1);
            setCOMTRADEImageData();
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new channel",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("ClearMarksForChannel").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Clear marks for channel</h1>
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel<a id = "calculationInd">Channel</a>
                        <ul id="calculationChannel" class = "scrollable">
                            <!-- Add channel options here -->
                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Close</button>
            <button id="b-calculationAdd" class="headerButton">Clear</button>
        </div>
    `;
    let channelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    channelHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationInd', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationChannel" + i + "-" + q + "\" name = \"calculationChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            channelHTML += ("<hr class = \"innerHr\">");;
        }catch{}
    }
    document.getElementById("calculationChannel").innerHTML = channelHTML;
    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let index = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationChannel" + i + "-" + q).checked){
                            index = q;
                        }
                    }catch{}
                }
            }catch{}
        }
        visualisers[0].valueMarks[index] = new Array();
        visualisers[0].textMarks[index] = new Array();
        visualisers[0].timePeriodMarks[index] = new Array();
        visualisers[0].digitalChannelOverprint[index] = new Array();
        new Toast({
            title: false,
            text: "Cleared all marks from " + visualisers[0].COMTRADE.configuration.analogNames[index],
            theme: "success",
            autohide: true,
            interval: 5000
        });
    }
}
document.getElementById("AddValueMark").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new value mark</h1>
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel<a id = "calculationInd">Channel</a>
                        <ul id="calculationChannel" class = "scrollable">
                            <!-- Add channel options here -->
                        </ul>
                    </li>
                    <li>Value Type<a>Value Type</a>
                        <ul>
                            <li><a><input type="checkbox" id="i-calculationIsInst" > Instant value</li></a>
                            <li><a><input type="checkbox" id="i-calculationIsAmp" > Amplitude value</li></a>
                            <li><a><input type="checkbox" id="i-calculationIsRMS1" checked> RMS1</li></a>
                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <p class="text">Color</p>
            <input type="color" id="calculationColor" class="colorBox">
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    let channelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    channelHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationInd', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationChannel" + i + "-" + q + "\" name = \"calculationChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            channelHTML += ("<hr class = \"innerHr\">");;
        }catch{}
    }
    document.getElementById("calculationChannel").innerHTML = channelHTML;
    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let index = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationChannel" + i + "-" + q).checked){
                            index = q;
                        }
                    }catch{}
                }
            }catch{}
        }
        try{
            let time = Number(document.getElementById("i-COMTTime").value) / 1000;
            let cursor1 = Number(document.getElementById("i-range1").value) / 100;
            let sample = Math.round((((document.getElementById("c-2").width - infoWidth - leftInfoWidth) * cursor1) - allX) / (time * visualisers[0].COMTRADE.configuration.samplingTimePeriod) - visualisers[0].startX);
            visualisers[0].addValueMark(index, sample, document.getElementById("calculationColor").value, document.getElementById("i-calculationIsInst").checked, document.getElementById("i-calculationIsAmp").checked, document.getElementById("i-calculationIsRMS1").checked);
            document.getElementById("promtContainer").innerHTML = "";
            new Toast({
                title: false,
                text: "Added new value mark",
                theme: "success",
                autohide: true,
                interval: 5000
            });
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new value mark",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("AddTextComment").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new text comment</h1>
            <hr class="innerHr">
            <p class="text">Text</p>
            <textarea id="i-calculationText" class="textBox"></textarea>
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel<a id = "calculationInd">Channel</a>
                        <ul id="calculationChannel" class = "scrollable">
                            <!-- Add channel options here -->
                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <p class="text">Color</p>
            <input type="color" id="calculationColor" class="colorBox">
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    let channelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    channelHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationInd', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationChannel" + i + "-" + q + "\" name = \"calculationChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            channelHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    document.getElementById("calculationChannel").innerHTML = channelHTML;
    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let index = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationChannel" + i + "-" + q).checked){
                            index = q;
                        }
                    }catch{}
                }
            }catch{}
        }
        try{
            let time = Number(document.getElementById("i-COMTTime").value) / 1000;
            let cursor1 = Number(document.getElementById("i-range1").value) / 100;
            let sample = Math.round((((document.getElementById("c-2").width - infoWidth - leftInfoWidth) * cursor1) - allX) / (time * visualisers[0].COMTRADE.configuration.samplingTimePeriod) - visualisers[0].startX);
            visualisers[0].addTextMark(index, document.getElementById("i-calculationText").value, sample, document.getElementById("calculationColor").value);
            document.getElementById("promtContainer").innerHTML = "";
            new Toast({
                title: false,
                text: "Added new text comment",
                theme: "success",
                autohide: true,
                interval: 5000
            });
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new text comment",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("AddTimePeriodMark").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new time period mark</h1>
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel<a id = "calculationInd">Channel</a>
                        <ul id="calculationChannel" class = "scrollable">
                            <!-- Add channel options here -->
                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <p class="text">Color</p>
            <input type="color" id="calculationColor" class="colorBox">
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    let channelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    channelHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationInd', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationChannel" + i + "-" + q + "\" name = \"calculationChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            channelHTML += ("<hr class = \"innerHr\">");;
        }catch{}
    }
    document.getElementById("calculationChannel").innerHTML = channelHTML;
    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let index = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationChannel" + i + "-" + q).checked){
                            index = q;
                        }
                    }catch{}
                }
            }catch{}
        }
        try{
            let time = Number(document.getElementById("i-COMTTime").value) / 1000;
            let cursor1 = Number(document.getElementById("i-range1").value) / 100;
            let cursor2 = Number(document.getElementById("i-range2").value) / 100;
            let sample1 = Math.round((((document.getElementById("c-2").width - infoWidth - leftInfoWidth) * cursor1) - allX) / (time * visualisers[0].COMTRADE.configuration.samplingTimePeriod) - visualisers[0].startX);
            let sample2 = Math.round((((document.getElementById("c-2").width - infoWidth - leftInfoWidth) * cursor2) - allX) / (time * visualisers[0].COMTRADE.configuration.samplingTimePeriod) - visualisers[0].startX);
            visualisers[0].addTimePeriodMark(index, sample1, sample2, document.getElementById("calculationColor").value);
            document.getElementById("promtContainer").innerHTML = "";
            new Toast({
                title: false,
                text: "Added new time period mark",
                theme: "success",
                autohide: true,
                interval: 5000
            });
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new time period mark",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("AddDigitalChannelOverprint").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Add new digital channel overprint</h1>
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel<a id = "calculationInd">Channel</a>
                        <ul id="calculationChannel" class = "scrollable">
                            <!-- Add channel options here -->
                        </ul>
                    </li>
                    <li>Digital Channel<a id = "calculationIndD">Digital Channel</a>
                        <ul id="calculationDigitalChannel" class = "scrollable">
                            <!-- Add channel options here -->
                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <p class="text">Color</p>
            <input type="color" id="calculationColor" class="colorBox">
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Add</button>
        </div>
    `;
    let channelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    channelHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationInd', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationChannel" + i + "-" + q + "\" name = \"calculationChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            channelHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    let digitalChannelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.digitalChannels;q++){
                try{
                    let isEmpty = true;
                    for(let p = 0;p < visualisers[i].COMTRADE.configuration.samples;p++){
                        if(Number(visualisers[i].COMTRADE.data.digitalData[q][p]) === 1){
                            isEmpty = false;
                        }
                    }
                    if(isEmpty){
                        digitalChannelHTML +=("<li hidden><a><input onclick = \"clickIndicator(event, 'calculationIndD', '" + visualisers[i].COMTRADE.configuration.digitalNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.digitalNames[q] + "')\" id = \"i-calculationDigitalChannel" + i + "-" + q + "\" name = \"calculationDigitalChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.digitalNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.digitalNames[q] + "</li></a>");
                    }
                    else{
                        digitalChannelHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationIndD', '" + visualisers[i].COMTRADE.configuration.digitalNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.digitalNames[q] + "')\" id = \"i-calculationDigitalChannel" + i + "-" + q + "\" name = \"calculationDigitalChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.digitalNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.digitalNames[q] + "</li></a>");
                    }
                    
                }catch{}
            }
            digitalChannelHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    document.getElementById("calculationChannel").innerHTML = channelHTML;
    document.getElementById("calculationDigitalChannel").innerHTML = digitalChannelHTML;
    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let index = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationChannel" + i + "-" + q).checked){
                            index = q;
                        }
                    }catch{}
                }
            }catch{}
        }
        
        let digitalIndex = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.digitalChannels;q++){
                    try{
                        if(document.getElementById("i-calculationDigitalChannel" + i + "-" + q).checked){
                            digitalIndex = q;
                        }
                    }catch{}
                }
            }catch{}
        }
        try{
            visualisers[0].addDigitalChannelOverptrint(index, digitalIndex, document.getElementById("calculationColor").value);
            document.getElementById("promtContainer").innerHTML = "";
            new Toast({
                title: false,
                text: "Added new digital channel overprint",
                theme: "success",
                autohide: true,
                interval: 5000
            });
        }catch{
            new Toast({
                title: false,
                text: "Failed to add new digital channel overprint",
                theme: "danger",
                autohide: true,
                interval: 5000
            });
        }
    }
}
document.getElementById("saveVDDocument").onclick = function(){
    //vdGroup.toImage("Hlow world bla blabl bla mu ga ga", "Sign ________________ derector jon smit", "A", true)
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Save document</h1>
            <hr class="innerHr">
            <p class="text">Units</p>
            <input type="text" id="calculationUnits" class="textBox" value = "A">
            <hr class="innerHr">
            <p class="text">Header text</p>
            <textarea id="calculationTopText" class="textBox"></textarea>
            <hr class="innerHr">
            <p class="text">Bottom text</p>
            <textarea id="calculationBottomText" class="textBox"></textarea>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Download</button>
        </div>
    `;
    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let templLink = document.createElement("a");
        templLink.download = document.getElementById("calculationTopText").value + "-VD-test.jpeg"
        templLink.href = vdGroup.toImage(document.getElementById("calculationTopText").value, document.getElementById("calculationBottomText").value, document.getElementById("calculationUnits").value).toDataURL({ format: 'jpeg', quality: 1 });
        templLink.click();
        document.getElementById("promtContainer").innerHTML = "";
    }
}
// Returns Uint8Array of WAV bytes
function getWavBytes(buffer, options, sR) {
    const type = options.isFloat ? Float32Array : Uint16Array
    const numFrames = buffer.byteLength / type.BYTES_PER_ELEMENT
  
    const headerBytes = getWavHeader(Object.assign({}, options, { numFrames }), sR)
    const wavBytes = new Uint8Array(headerBytes.length + buffer.byteLength);
  
    // prepend header, then add pcmBytes
    wavBytes.set(headerBytes, 0)
    wavBytes.set(new Uint8Array(buffer), headerBytes.length)
  
    return wavBytes
  }
  
  // adapted from https://gist.github.com/also/900023
  // returns Uint8Array of WAV header bytes
  function getWavHeader(options, sR) {
    const numFrames =      options.numFrames
    const numChannels =    options.numChannels || 1
    const sampleRate =     options.sampleRate || 3000
    const bytesPerSample = options.isFloat? 4 : 2
    const format =         options.isFloat? 3 : 1
  
    const blockAlign = numChannels * bytesPerSample
    const byteRate = sampleRate * blockAlign
    const dataSize = numFrames * blockAlign
  
    const buffer = new ArrayBuffer(44)
    const dv = new DataView(buffer)
  
    let p = 0
  
    function writeString(s) {
      for (let i = 0; i < s.length; i++) {
        dv.setUint8(p + i, s.charCodeAt(i))
      }
      p += s.length
    }
  
    function writeUint32(d) {
      dv.setUint32(p, d, true)
      p += 4
    }
  
    function writeUint16(d) {
      dv.setUint16(p, d, true)
      p += 2
    }
  
    writeString('RIFF')              // ChunkID
    writeUint32(dataSize + 36)       // ChunkSize
    writeString('WAVE')              // Format
    writeString('fmt ')              // Subchunk1ID
    writeUint32(16)                  // Subchunk1Size
    writeUint16(format)              // AudioFormat https://i.stack.imgur.com/BuSmb.png
    writeUint16(numChannels)         // NumChannels
    writeUint32(sampleRate)          // SampleRate
    writeUint32(byteRate)            // ByteRate
    writeUint16(blockAlign)          // BlockAlign
    writeUint16(bytesPerSample * 8)  // BitsPerSample
    writeString('data')              // Subchunk2ID
    writeUint32(dataSize)            // Subchunk2Size
  
    return new Uint8Array(buffer)
  }
function convertAudioBufferToBlob(audioBuffer, sR) {

    var channelData = [],
      totalLength = 0,
      channelLength = 0;

    for (var i = 0; i < audioBuffer.numberOfChannels; i++) {
      channelData.push(audioBuffer.getChannelData(i));
      totalLength += channelData[i].length;
      if (i == 0) channelLength = channelData[i].length;
    }

    // interleaved
    const interleaved = new Float32Array(totalLength);

    for (
      let src = 0, dst = 0;
      src < channelLength;
      src++, dst += audioBuffer.numberOfChannels
    ) {
      for (var j = 0; j < audioBuffer.numberOfChannels; j++) {
        interleaved[dst + j] = channelData[j][src];
      }
      //interleaved[dst] = left[src];
      //interleaved[dst + 1] = right[src];
    }

    // get WAV file bytes and audio params of your audio source
    const wavBytes = getWavBytes(interleaved.buffer, {
      isFloat: true, // floating point or 16-bit integer
      numChannels: audioBuffer.numberOfChannels,
      sampleRate: sR,
    }, sR);
    const wav = new Blob([wavBytes], { type: "audio/wav" });
    return wav;
  }
document.getElementById("channelSound").onclick = function(){
    document.getElementById("promtContainer").innerHTML = `
        <div id="calculationMessage" class="message">
            <h1 class="text">Save channel as sound file</h1>
            <hr class="innerHr">
            <nav class="menu">
                <ul>
                    <li>Channel<a id = "calculationInd">Channel</a>
                        <ul id="calculationChannel" class = "scrollable">
                            <!-- Add channel options here -->
                        </ul>
                    </li>
                </ul>
            </nav>
            <hr class="innerHr">
            <button id="b-calculationCancel" class="headerButton">Cancel</button>
            <button id="b-calculationAdd" class="headerButton">Download</button>
        </div>
    `;
    let channelHTML = "";
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    channelHTML +=("<li><a><input onclick = \"clickIndicator(event, 'calculationInd', '" + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "')\" id = \"i-calculationChannel" + i + "-" + q + "\" name = \"calculationChannel\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</li></a>");
                }catch{}
            }
            channelHTML += ("<hr class = \"innerHr\">");;
        }catch{}
    }
    document.getElementById("calculationChannel").innerHTML = channelHTML;
    document.getElementById("b-calculationCancel").onclick = function(){
        document.getElementById("promtContainer").innerHTML = "";
    }
    document.getElementById("b-calculationAdd").onclick = function(){
        let index = 0;

        for(let i = 0;i < visualisers.length; i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    try{
                        if(document.getElementById("i-calculationChannel" + i + "-" + q).checked){
                            index = q;
                        }
                    }catch{}
                }
            }catch{}
        }
        //try{
            //const wavEncoder = new WavEncoder();

            // Set the audio data using the samples array.
            let maxVal = 0;
            for(let i = 0;i < visualisers[0].COMTRADE.data.analogData[index].length;i++){
                if(Math.abs(visualisers[0].COMTRADE.data.analogData[index][i]) > maxVal){
                    maxVal = Math.abs(visualisers[0].COMTRADE.data.analogData[index][i]);
                }
            }
            let samples = visualisers[0].COMTRADE.data.analogData[index];//COMTRADE.changeSampleFrequency(visualisers[0].COMTRADE.data.analogData[index], visualisers[0].COMTRADE.configuration.samplingTimePeriod, 1000/3);
            for(let i = 0;i < samples.length;i++){
                samples[i] = samples[i] / maxVal;
            }
            //console.log(samples)
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const arrayBuffer = audioCtx.createBuffer(
                1,
                samples.length,
                3000,
              );
              for (let i = 0; i < arrayBuffer.length; i++) {
                // Math.random() is in [0; 1.0]
                // audio needs to be in [-1.0; 1.0]
                arrayBuffer.getChannelData(0)[i] = samples[i];
              }

              var downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(convertAudioBufferToBlob(arrayBuffer, visualisers[0].COMTRADE.configuration.samplingFrequency));
            downloadLink.download = visualisers[0].COMTRADE.configuration.analogNames[index] + ".wav";
            downloadLink.click();
            document.getElementById("promtContainer").innerHTML = "";
            /*wavEncoder.setBuffer(samples);

            // Specify the sample rate (e.g., 44100 Hz).
            const sampleRate = visualisers[0].COMTRADE.configuration.samplingFrequency;

            // Specify the number of channels (1 for mono, 2 for stereo).
            const numChannels = 1;

            // Encode the audio data into a WAV file.
            const wavFileData = wavEncoder.encode({
            sampleRate: sampleRate,
            numChannels: numChannels,
            });

            // Convert the WAV file data to a Blob.
            const wavBlob = new Blob([wavFileData], { type: 'audio/wav' });

            // Optionally, you can create a download link for the generated WAV file.
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(wavBlob);
            downloadLink.download = 'output.wav';
            downloadLink.click();
            document.getElementById("promtContainer").innerHTML = "";*/

        //}catch{
        //}
    }
}

document.getElementById("COMTResCalc").onclick = function(){
    /*visualisers[0].COMTRADE.defineAsEmpty();
    visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);*/
    for(let i = 0;i < visualisers[0].COMTRADE.configuration.analogChannels;i++){
        if(visualisers[0].COMTRADE.configuration.analogAnnotation[i] === "calculation"){
            visualisers[0].COMTRADE.removeAnalogChannel(i);
            i--;
        }
    }
    updateCOMTRADE();
    resetCOMTRADELists();
    visualisers[0].setSizes(analogHeight, digitalHeight, infoHeight, infoWidth);
    setCOMTRADEImageData();
}
document.getElementById("i-COMTVecSiz").onchange = function(){
    document.getElementById("c-3").width = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-3").height = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-4").width = document.getElementById("i-COMTVecSiz").value;
    document.getElementById("c-4").height = document.getElementById("i-COMTVecSiz").value;
}
document.getElementById("i-isC-3").onchange = function(){
    if(document.getElementById("i-isC-3").checked){
        document.getElementById("c-3").className = "relativeCanvas";
    }
    else {
        document.getElementById("c-3").className = "hidden";
    }
}

document.getElementById("i-COMTVisWid").onchange = function(){
    if(document.getElementById("i-COMTVisWid").value > infoWidth){
        document.getElementById("c-2").width = document.getElementById("i-COMTVisWid").value;
        document.getElementById("c-5").width = document.getElementById("i-COMTVisWid").value;
        document.querySelector('.range').style.width = (document.getElementById("i-COMTVisWid").value - infoWidth + 15) + "px";
        document.querySelector('.blueRange').style.width = (document.getElementById("i-COMTVisWid").value - infoWidth + 15) + "px";
        setCOMTRADEImageData();
    }else{
        new Toast({
            title: false,
            text: "Sorry, width must be more than " + infoWidth,
            theme: "warning",
            autohide: true,
            interval: 5000
        }); 
    }
}
document.getElementById("i-primary").onchange = function(){
    try{
        if(document.getElementById("i-primary").checked){
            for(let i = 0;i < visualisers.length;i++){
                visualisers[i].COMTRADE.primary();
                visualisers[i].reSetScale();
                setCOMTRADEImageData();
            }
        }
        if(document.getElementById("i-secondary").checked){
            for(let i = 0;i < visualisers.length;i++){
                visualisers[i].COMTRADE.secondary();
                visualisers[i].reSetScale();
                setCOMTRADEImageData();
                let fullSecondary = true;
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.canBeSecondary.length;q++){
                    fullSecondary = !visualisers[i].COMTRADE.configuration.canBeSecondary[q] ? false : fullSecondary;
                }
                if(!fullSecondary){
                    new Toast({
                        title: false,
                        text: "Failed to convert some channels, because secondary data is not full",
                        theme: "warning",
                        autohide: true,
                        interval: 5000
                    }); 
                }
            }
        }
    }catch{}
}
document.getElementById("i-secondary").onchange = function(){
    try{
        if(document.getElementById("i-primary").checked){
            for(let i = 0;i < visualisers.length;i++){
                visualisers[i].COMTRADE.primary();
                visualisers[i].reSetScale();
                setCOMTRADEImageData();
            }
        }
        if(document.getElementById("i-secondary").checked){
            for(let i = 0;i < visualisers.length;i++){
                visualisers[i].COMTRADE.secondary();
                visualisers[i].reSetScale();
                setCOMTRADEImageData();
                let fullSecondary = true;
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.canBeSecondary.length;q++){
                    fullSecondary = !visualisers[i].COMTRADE.configuration.canBeSecondary[q] ? false : fullSecondary;
                }
                if(!fullSecondary){
                    new Toast({
                        title: false,
                        text: "Failed to convert some channels, because secondary data is missing, or not full",
                        theme: "warning",
                        autohide: true,
                        interval: 5000
                    }); 
                }
            }
        }
    }catch{}
}

async function setCOMTRADEImageData(){
    let time = Number(document.getElementById("i-COMTTime").value) / 1000;
    let visualiserCanvas = document.getElementById("c-5");
    let ctxVis = visualiserCanvas.getContext("2d");

    let tempraryUsedSpace = 0;

    for(let i = 0;i < visualisers.length;i++){
        try{
            if(!isNaN(visualisers[i].COMTRADE.configuration.analogChannels * visualisers[i].analogHeight)){
                tempraryUsedSpace += visualisers[i].COMTRADE.configuration.analogChannels * visualisers[i].analogHeight;
            }
        }catch{}
    }
    if(tempraryUsedSpace !== 0){
        visualiserCanvas.height = tempraryUsedSpace;
    }

    ctxVis.fillStyle = "white";
    ctxVis.fillRect(0, 0, visualiserCanvas.width, visualiserCanvas.height);

    tempraryUsedSpace = 0;

    for(let i = 0;i < visualisers.length;i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    tempraryUsedSpace += visualisers[i].setImageData(visualiserCanvas, tempraryUsedSpace, allX, time, timeGrid, q, document.getElementById("i-lineWidth").value);
                }catch{}
            }
        }catch{}
    }
}

function renderCOMTRADE(){
    if(!visualisers[0].COMTRADE.isEmpty){
//console.log(COMTRADE.frequencyCalculationAnalogChannel(visualisers[0].COMTRADE.data.analogData[0], visualisers[0].COMTRADE.configuration.samplingTimePeriod, visualisers[0].COMTRADE.configuration.frequency))
    //console.log(visualisers)
    //var rect = document.getElementById("c-2").getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);
    chanelsData = new Array();
    let time = Number(document.getElementById("i-COMTTime").value) / 1000;
    let cursor1 = Number(document.getElementById("i-range1").value) / 100;
    let cursor2 = Number(document.getElementById("i-range2").value) / 100;
    let showDigital = document.getElementById("i-showDigital").checked;
    let visualiserCanvas = document.getElementById("c-2");
    let ctxVis = visualiserCanvas.getContext("2d");
    let vectorCanvas = document.getElementById("c-3");
    let ctxVec = vectorCanvas.getContext("2d");
    let rotateDeg = Number(document.getElementById("i-COMTBase").value);
    let period3 = 50;
    let deg3 = 30;

    let restoreType = "";
    restoreType = document.getElementById("i-restoreTypeMP").checked ? "MP" : restoreType;
    restoreType = document.getElementById("i-restoreTypePP").checked ? "PP" : restoreType;
    restoreType = document.getElementById("i-restoreTypeAMP").checked ? "AMP" : restoreType;

    if(!document.getElementById("i-vectZoom").checked){
        multVect = 1;
    }
    if(!document.getElementById("i-vectOffset").checked){
        centXVect = vectorCanvas.width / 2;
        centYVect = vectorCanvas.height / 2;
    }

    ctxVec.fillStyle = "white";
    ctxVec.fillRect(0, 0, vectorCanvas.width, vectorCanvas.height);

    ctxVec.font = "10px Arial";
    ctxVec.strokeStyle = "black";
    ctxVec.lineWidth = 0.5;
    
    ctxVec.beginPath();
    for (let i = 0; i < 360 / deg3; i++) {
        ctxVec.moveTo(centXVect, centYVect);
        ctxVec.lineTo(centXVect + Math.hypot(vectorCanvas.width, vectorCanvas.width) * Math.cos((i * deg3 + 90) / 180 * Math.PI), centYVect - Math.hypot(vectorCanvas.height, vectorCanvas.height) * Math.sin((i * deg3 + 90) / 180 * Math.PI));
        if (i > 10000) {
            break;
        }
    }
    ctxVec.stroke();
    ctxVec.fillStyle = "black";
    ctxVec.beginPath();
    for (let i = 1; i < vectorCanvas.width / 2 / multVect / period3; i++) {
        ctxVec.moveTo(centXVect + i * period3 * multVect, centYVect);
        ctxVec.arc(centXVect, centYVect, i * period3 * multVect, 0, 2 * Math.PI);
        if (i > 10000) {
            break;
        }
    }
    ctxVec.stroke();
    if(usedSpace !== 0&&usedSpace !== undefined){
        visualiserCanvas.height = usedSpace;
    }

    ctxVis.fillStyle = "white";
    ctxVis.fillRect(0, 0, visualiserCanvas.width, visualiserCanvas.height);

    usedSpace = 0;
    for(let i = 0;i < visualisers.length;i++){
        try{
            usedSpace += visualisers[i].drawFileInfo(visualiserCanvas, usedSpace, cfgFile.name.replace("CFG", "cfg") + " & dat");
        }catch{}
    }
    fileInfoHeight = usedSpace;
    let baseAngle = 0;
    try{
        for(let i = 0;i < visualisers.length;i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                    if(document.getElementById("i-base" + i + "-" + q).checked){
                        let pointData = visualisers[i].COMTRADE.getPointCalculations(q, Math.round((((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor1) - allX) / (time * visualisers[i].COMTRADE.configuration.samplingTimePeriod) - visualisers[i].startX), 0, true, "AMP");
                        baseAngle = pointData.f / Math.PI * 180;
                        
                    }
                }
            }catch{}
        }
    }catch{}

    for(let i = 0;i < visualisers.length;i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    let restore = document.getElementById("i-restore" + i + "-" + q).checked;
                    let vector = document.getElementById("i-vector" + i + "-" + q).checked;
                    let visualisation = document.getElementById("i-visualisation" + i + "-" + q).checked;
                    let analogData = visualisers[i].drawAnalogChannelWithImageData(visualiserCanvas, vectorCanvas, rotateDeg, usedSpace, allX, time, timeGrid, centXVect, centYVect, multVect, q, cursor1, restore, vector, document.getElementById("i-vectLength").checked, visualisation, baseAngle, false, restoreType, document.getElementById("i-lineWidth").value);
                    chanelsData.push(analogData);
                    usedSpace += analogData.height;
                    if(document.getElementById("b-DistanseP").checked){
                        for(let j = 0;j < distanseProtection.length;j++){
                            try{
                                for(let r = 0;r < distanseProtection[j].links.length; r++){
                                    if(document.getElementById("i-link" + i + "-" + q + distanseProtection[j].id + distanseProtection[j].links[r].name).checked){
                                        if(distanseProtection[j].links[r].constructor.name === "ExponentialLink"){
                                            document.getElementById(distanseProtection[j].links[r].unitID).value = convertUnit(analogData.pointData.RMS1, visualisers[i].COMTRADE.configuration.units[q], distanseProtection[j].links[r].unit)
                                            document.getElementById(distanseProtection[j].links[r].degreeID).value = analogData.pointData.angle;
                                        }
                                        else if(distanseProtection[j].links[r].constructor.name === "InstLink"){
                                            document.getElementById(distanseProtection[j].links[r].valID).value = convertUnit(analogData.pointData.instVal, visualisers[i].COMTRADE.configuration.units[q], distanseProtection[j].links[r].unit)
                                        }
                                        else if(distanseProtection[j].links[r].constructor.name === "DynamikLink"){
                                            if(analogData.pointData.isSinusoidal){
                                                document.getElementById(distanseProtection[j].links[r].valID).value = convertUnit(analogData.pointData.RMS1, visualisers[i].COMTRADE.configuration.units[q], distanseProtection[j].links[r].unit)
                                            }
                                            else {
                                                document.getElementById(distanseProtection[j].links[r].valID).value = convertUnit(analogData.pointData.instVal, visualisers[i].COMTRADE.configuration.units[q], distanseProtection[j].links[r].unit)
                                            }
                                        }
                                    }
                                }
                            }catch{}
                        }
                    }
                    if(document.getElementById("b-DifferentialP").checked){
                        for(let j = 0;j < differentialProtection.length;j++){
                            try{
                                for(let r = 0;r < differentialProtection[j].links.length; r++){
                                    if(document.getElementById("i-link" + i + "-" + q + differentialProtection[j].id + differentialProtection[j].links[r].name).checked){
                                        if(differentialProtection[j].links[r].constructor.name === "ExponentialLink"){
                                            document.getElementById(differentialProtection[j].links[r].unitID).value = convertUnit(analogData.pointData.RMS1, visualisers[i].COMTRADE.configuration.units[q], differentialProtection[j].links[r].unit)
                                            document.getElementById(differentialProtection[j].links[r].degreeID).value = analogData.pointData.angle;
                                        }
                                        else if(differentialProtection[j].links[r].constructor.name === "InstLink"){
                                            document.getElementById(differentialProtection[j].links[r].valID).value = convertUnit(analogData.pointData.instVal, visualisers[i].COMTRADE.configuration.units[q], differentialProtection[j].links[r].unit)
                                        }
                                        else if(differentialProtection[j].links[r].constructor.name === "DynamikLink"){
                                            if(analogData.pointData.isSinusoidal){
                                                document.getElementById(differentialProtection[j].links[r].valID).value = convertUnit(analogData.pointData.RMS1, visualisers[i].COMTRADE.configuration.units[q], differentialProtection[j].links[r].unit)
                                            }
                                            else {
                                                document.getElementById(differentialProtection[j].links[r].valID).value = convertUnit(analogData.pointData.instVal, visualisers[i].COMTRADE.configuration.units[q], differentialProtection[j].links[r].unit)
                                            }
                                        }
                                    }
                                }
                            }catch{}
                        }
                    }
                }catch{}
            }
        }catch{}
    }
    if(showDigital){
        for(let i = 0;i < visualisers.length;i++){
            try{
                for(let q = 0;q < visualisers[i].COMTRADE.configuration.digitalChannels;q++){
                    digitalData = visualisers[i].drawDigitalChannel(visualiserCanvas, usedSpace, allX, time, timeGrid, q, document.getElementById("i-showEmpty").checked);
                    chanelsData.push(digitalData);
                    usedSpace += digitalData.height;
                }
            }catch{}
        }
    }
    ctxVis.lineWidth = 3;
    ctxVis.strokeStyle = "red";
    ctxVis.beginPath();
    ctxVis.moveTo(infoWidth + (visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor1, fileInfoHeight);
    ctxVis.lineTo(infoWidth + (visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor1, visualiserCanvas.height);
    ctxVis.stroke();
    ctxVis.strokeStyle = "black";
    ctxVis.beginPath();
    ctxVis.moveTo(infoWidth + (visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor2, fileInfoHeight);
    ctxVis.lineTo(infoWidth + (visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor2, visualiserCanvas.height);
    ctxVis.stroke();

    ctxVis.fillStyle = "red";
    ctxVis.font = "20px Arial";
    ctxVis.strokeStyle = "black";
    ctxVis.lineWidth = 2;

    ctxVis.beginPath();
    ctxVis.moveTo(((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor1) + infoWidth, clientY);
    ctxVis.lineTo(((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor2) + infoWidth, clientY);
    ctxVis.stroke();

    ctxVis.fillText(Math.round(module(((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor1) - ((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor2)) / time / 1000) + " ms", ((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor1) + infoWidth - (((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor1) - ((visualiserCanvas.width - infoWidth - leftInfoWidth) * cursor2)) / 2, clientY - 10);

    }
    function convertUnit(value, fromUnit, toUnit) {
        const unitPrefixes = {
          k: 1e3, // kilo
          M: 1e6, // mega
          G: 1e9, // giga
          m: 1e-3, // milli
          u: 1e-6, // micro
          n: 1e-9, // nano
          p: 1e-12, // pico
        };
      
        const fromPrefix = fromUnit.charAt(0);
        const toPrefix = toUnit.charAt(0);
      
        const conversionFactor = (unitPrefixes[toPrefix] || 1) / (unitPrefixes[fromPrefix] || 1);
        return value / conversionFactor;
      }
    }
function updateCOMTRADE(channelOffset) {
    if(!channelOffset){
        channelOffset = 0;
    }
    let visualisationHTML = "";
    let vectorHTML = "";
    let restoreHTML = "";
    let linkHTML = "";
    let baseHTML = "";
    for(let j = 0;j < distanseProtection.length;j++){
        if(distanseProtection[j].links.length !== 0){
            linkHTML += "<li " + (document.getElementById("b-DistanseP").checked ? "" : "hidden") + "><a>" + distanseProtection[j].name + "</a><ul>";
            for(let r = 0;r < distanseProtection[j].links.length; r++){
                linkHTML += "<li><a>" + distanseProtection[j].links[r].name + "</a><ul class = \"scrollable\">";
                for(let i = 0;i < visualisers.length; i++){
                    try{
                        for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                            try{(visualisers[i].COMTRADE.configuration.analogNumbers[q] + visualisers[i].COMTRADE.configuration.analogNames[q])
                                let linkChecked = false;try{linkChecked = document.getElementById("i-link" + i + "-" + (q - channelOffset) + distanseProtection[j].id + distanseProtection[j].links[r].name).checked}catch{}
                                linkHTML += ("<li><a><input id = \"i-link" + i + "-" + q + distanseProtection[j].id + distanseProtection[j].links[r].name + "\" " + (linkChecked ? "checked = \"true\"" : "") + " type = \"radio\" name = \"" + distanseProtection[j].id + distanseProtection[j].links[r].name + "\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                            }catch{}
                        }
                        linkHTML += ("<hr class = \"innerHr\">");
                    }catch{}
                }
                linkHTML +="</ul></li>";
            }
            linkHTML +="</ul></li>";
        }
    }

    for(let j = 0;j < differentialProtection.length;j++){
        if(differentialProtection[j].links.length !== 0){
            linkHTML += "<li " + (document.getElementById("b-DifferentialP").checked ? "" : "hidden") + "><a>" + differentialProtection[j].name + "</a><ul>";
            for(let r = 0;r < differentialProtection[j].links.length; r++){
                linkHTML += "<li><a>" + differentialProtection[j].links[r].name + "</a><ul class = \"scrollable\">";
                for(let i = 0;i < visualisers.length; i++){
                    try{
                        for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                            try{
                                let linkChecked = false;try{linkChecked = document.getElementById("i-link" + i + "-" + (q - channelOffset) + differentialProtection[j].id + differentialProtection[j].links[r].name).checked}catch{}
                                linkHTML += ("<li><a><input id = \"i-link" + i + "-" + q + differentialProtection[j].id + differentialProtection[j].links[r].name + "\" " + (linkChecked ? "checked = \"true\"" : "") + " type = \"radio\" name = \"" + differentialProtection[j].id + differentialProtection[j].links[r].name + "\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                            }catch{}
                        }
                        linkHTML += ("<hr class = \"innerHr\">");
                    }catch{}
                }
                linkHTML +="</ul></li>";
            }
            linkHTML +="</ul></li>";
        }
    }        

    let isBaseChosen = false;
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    let visualisationChecked = true;try{visualisationChecked = document.getElementById("i-visualisation" + i + "-" + (q - channelOffset)).checked}catch{}
                    let vectorChecked = false;try{vectorChecked = document.getElementById("i-vector" + i + "-" + (q - channelOffset)).checked}catch{}
                    let restoreChecked = false;try{restoreChecked = document.getElementById("i-restore" + i + "-" + (q - channelOffset)).checked}catch{}
                    let baseChecked = false;try{baseChecked = document.getElementById("i-base" + i + "-" + (q - channelOffset)).checked}catch{}
                    if(baseChecked){
                        isBaseChosen = true;
                    }
                    visualisationHTML +=("<li><a><input id = \"i-visualisation" + i + "-" + q + "\" " + (visualisationChecked ? "checked = \"true\"" : "") + " type = \"checkbox\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                    vectorHTML +=("<li><a><input id = \"i-vector" + i + "-" + q + "\" type = \"checkbox\" " + (vectorChecked ? "checked = \"true\"" : "") + "> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                    restoreHTML +=("<li><a><input id = \"i-restore" + i + "-" + q + "\" name = \"restore\" type = \"radio\" " + (restoreChecked ? "checked = \"true\"" : "") + "> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                    baseHTML +=("<li><a><input id = \"i-base" + i + "-" + q + "\" " + (baseChecked ? "checked = \"true\"" : "") + " name = \"base\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                }catch{}
            }
            visualisationHTML += ("<hr class = \"innerHr\">");
            vectorHTML += ("<hr class = \"innerHr\">");
            restoreHTML += ("<hr class = \"innerHr\">");
            baseHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    document.getElementById("channelsListShow").innerHTML = visualisationHTML;
    document.getElementById("channelsList").innerHTML = vectorHTML;
    document.getElementById("restoreChannelsList").innerHTML = restoreHTML;
    document.getElementById("linkChannelsList").innerHTML = linkHTML;
    document.getElementById("baseChannelsList").innerHTML = baseHTML;
    try{
        if(!isBaseChosen){
            document.getElementById("i-base0-0").checked = true;
        }
    }catch{

    }
}
function resetCOMTRADELists() {
    let restoreHTML = "";
    let linkHTML = "";
    let baseHTML = "";
    for(let j = 0;j < distanseProtection.length;j++){
        if(distanseProtection[j].links.length !== 0){
            linkHTML += "<li " + (document.getElementById("b-DistanseP").checked ? "" : "hidden") + "><a>" + distanseProtection[j].name + "</a><ul>";
            for(let r = 0;r < distanseProtection[j].links.length; r++){
                linkHTML += "<li><a>" + distanseProtection[j].links[r].name + "</a><ul class = \"scrollable\">";
                for(let i = 0;i < visualisers.length; i++){
                    try{
                        for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                            try{
                                linkHTML += ("<li><a><input id = \"i-link" + i + "-" + q + distanseProtection[j].id + distanseProtection[j].links[r].name + "\" type = \"radio\" name = \"" + distanseProtection[j].id + distanseProtection[j].links[r].name + "\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                            }catch{}
                        }
                        linkHTML += ("<hr class = \"innerHr\">");
                    }catch{}
                }
                linkHTML +="</ul></li>";
            }
            linkHTML +="</ul></li>";
        }
    }
    for(let j = 0;j < differentialProtection.length;j++){
        if(differentialProtection[j].links.length !== 0){
            linkHTML += "<li " + (document.getElementById("b-DifferentialP").checked ? "" : "hidden") + "><a>" + differentialProtection[j].name + "</a><ul>";
            for(let r = 0;r < differentialProtection[j].links.length; r++){
                linkHTML += "<li><a>" + differentialProtection[j].links[r].name + "</a><ul class = \"scrollable\">";
                for(let i = 0;i < visualisers.length; i++){
                    try{
                        for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                            try{
                                linkHTML += ("<li><a><input id = \"i-link" + i + "-" + q + differentialProtection[j].id + differentialProtection[j].links[r].name + "\" type = \"radio\" name = \"" + differentialProtection[j].id + differentialProtection[j].links[r].name + "\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                            }catch{}
                        }
                        linkHTML += ("<hr class = \"innerHr\">");
                    }catch{}
                }
                linkHTML +="</ul></li>";
            }
            linkHTML +="</ul></li>";
        }
    }
    for(let i = 0;i < visualisers.length; i++){
        try{
            for(let q = 0;q < visualisers[i].COMTRADE.configuration.analogChannels;q++){
                try{
                    restoreHTML +=("<li><a><input id = \"i-restore" + i + "-" + q + "\" name = \"restore\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                    if(i === 1&&q === 0){
                        baseHTML +=("<li><a><input id = \"i-base" + i + "-" + q + "\" checked = \"true\" name = \"base\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                    }else{
                        baseHTML +=("<li><a><input id = \"i-base" + i + "-" + q + "\" name = \"base\" type = \"radio\"> " + visualisers[i].COMTRADE.configuration.analogNumbers[q] + ")" + visualisers[i].COMTRADE.configuration.analogNames[q] + "</a></li>");
                    }
                }catch{}
            }
            restoreHTML += ("<hr class = \"innerHr\">");
            baseHTML += ("<hr class = \"innerHr\">");
        }catch{}
    }
    document.getElementById("restoreChannelsList").innerHTML = restoreHTML;
    document.getElementById("linkChannelsList").innerHTML = linkHTML;
    document.getElementById("baseChannelsList").innerHTML = baseHTML;
}
document.getElementById("a-download2").addEventListener('click', function (e) {
    try{
        document.getElementById("a-download2").download = visualisers[0].COMTRADE.configuration.startDate + "," + visualisers[0].COMTRADE.configuration.startTime + "-" + visualisers[0].COMTRADE.configuration.stationName + "-COMTRADE-visualisation.jpeg";
        document.getElementById("a-download2").href = document.getElementById("c-2").toDataURL({ format: 'jpeg', quality: 1 });
    }catch {

    }
});
document.getElementById("a-download3").addEventListener('click', function (e) {
    try{
        document.getElementById("a-download3").download = (visualisers[0].COMTRADE.configuration.startDate + "," + visualisers[0].COMTRADE.configuration.startTime + "-" + visualisers[0].COMTRADE.configuration.stationName + "-COMTRADE-vector-diagram.jpeg");
        document.getElementById("a-download3").href = document.getElementById("c-3").toDataURL({ format: 'jpeg', quality: 1 });
    }catch {

    }
});

let is1F = false;
let is2F = true;
let is3F = false;
/*
function record(canvas, time) {
    var recordedChunks = [];
    return new Promise(function (res, rej) {
        var stream = canvas.captureStream(25);
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        });
        
        //ondataavailable will fire in interval of `time || 4000 ms`
        mediaRecorder.start(time || 4000);

        mediaRecorder.ondataavailable = function (event) {
            recordedChunks.push(event.data);
             // after stop `dataavilable` event run one more time
            if (mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }

        }

        mediaRecorder.onstop = function (event) {
            var blob = new Blob(recordedChunks, {type: "video/webm" });
            var url = URL.createObjectURL(blob);
            res(url);
        }
    })
}
let canv = document.getElementById("c-1");
let canv2 = document.getElementById("c-4");
let ctx = canv.getContext("2d");
setTimeout(Record, 20000);
function Record(){
    const recording = record(canv, 100000)
    // play it on another video element
    var video$ = document.createElement('video')
    document.body.appendChild(video$)
    recording.then(url => video$.setAttribute('src', url) )
    
    // download it
    var link$ = document.createElement('a')
    link$.setAttribute('download','recordingVideo') 
    recording.then(url => {
     link$.setAttribute('href', url) 
     link$.click()
    })
}
*/

function updateDistanceProtection(){
    let count = 0;


    let canv = document.getElementById("c-1");
    let canv2 = document.getElementById("c-4");
    let ctx = canv.getContext("2d");

    let centX = canv.width / 2;

    let centY = canv.height / 2;

    if(document.getElementById("b-DistanseP").checked){
        centX = Number(document.getElementById("i-X").value);
        centY = Number(document.getElementById("i-Y").value);
    }

    if(document.getElementById("b-DifferentialP").checked){
        centX = Number(document.getElementById("i-X").value);
        centY = canv.height;
    }

    let mult = Number(document.getElementById("i-Mult").value);

    let period = Number(document.getElementById("i-Per").value);

    let ctx2 = canv2.getContext("2d");

    let centX2 = centX / canv.width * canv2.width; 
    let centY2 = centY / canv.height * canv2.height; 

    let mult2 = mult / canv.height * canv2.height

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.lineWidth = 2;

    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(centX, 0);
    ctx.lineTo(centX, canv.height);
    ctx.moveTo(0, centY);
    ctx.lineTo(canv.width, centY);
    ctx.stroke();

    ctx.lineWidth = 0.5;

    let maxX = 0;
    if (centX < canv.width / 2) {
        maxX = canv.width - centX;
    } else {
        maxX = centX;
    }
    ctx.font = "10px Arial";
    ctx.beginPath();
    for (let i = 1; i < (maxX / mult) / period; i++) {
        ctx.moveTo(centX + (i * period * mult), 0);
        ctx.lineTo(centX + (i * period * mult), canv.height);
        ctx.moveTo(centX - (i * period * mult), 0);
        ctx.lineTo(centX - (i * period * mult), canv.height);
        ctx.fillText(i * period, (centX + (i * period * mult)) - 20, centY - 5);
        ctx.fillText(-i * period, (centX - (i * period * mult)) - 20, centY - 5);
        if (i > 10000) {
            break;
        }
    }
    ctx.stroke();

    let maxY = 0;
    if (centY < canv.height / 2) {
        maxY = canv.height - centY;
    } else {
        maxY = centY;
    }

    ctx.beginPath();
    for (let i = 1; i < (maxY / mult) / period; i++) {
        ctx.moveTo(0, centY + (i * period * mult));
        ctx.lineTo(canv.width, centY + (i * period * mult));
        ctx.moveTo(0, centY - (i * period * mult));
        ctx.lineTo(canv.width, centY - (i * period * mult));
        ctx.fillText(-i * period, centX - 20, (centY + (i * period * mult)) - 5);
        ctx.fillText(i * period, centX - 20, (centY - (i * period * mult)) - 5);
        if (i > 10000) {
            break;
        }
    }
    ctx.stroke();

    ctx2.fillStyle = "white";
    ctx2.fillRect(0,0,canv2.width,canv2.height);

    ctx2.lineWidth = 2;

    ctx2.fillStyle = "black";
    ctx2.strokeStyle = "black";

    ctx2.beginPath();
    ctx2.moveTo(centX2, 0);
    ctx2.lineTo(centX2, canv2.height);
    ctx2.moveTo(0, centY2);
    ctx2.lineTo(canv2.width, centY2);
    ctx2.stroke();

    ctx2.lineWidth = 0.5;

    maxX = 0;
    if (centX2 < canv2.width / 2) {
        maxX = canv2.width - centX2;
    } else {
        maxX = centX2;
    }
    ctx2.font = "10px Arial";
    ctx2.beginPath();
    for (let i = 1; i < (maxX / mult2) / period; i++) {
        ctx2.moveTo(centX2 + (i * period * mult2), 0);
        ctx2.lineTo(centX2 + (i * period * mult2), canv2.height);
        ctx2.moveTo(centX2 - (i * period * mult2), 0);
        ctx2.lineTo(centX2 - (i * period * mult2), canv2.height);
        ctx2.fillText(i * period, (centX2 + (i * period * mult2)) - 20, centY2 - 5);
        ctx2.fillText(-i * period, (centX2 - (i * period * mult2)) - 20, centY2 - 5);
        if (i > 10000) {
            break;
        }
    }
    ctx2.stroke();

    maxY = 0;
    if (centY2 < canv2.height / 2) {
        maxY = canv2.height - centY2;
    } else {
        maxY = centY2;
    }

    ctx2.beginPath();
    for (let i = 1; i < (maxY / mult2) / period; i++) {
        ctx2.moveTo(0, centY2 + (i * period * mult2));
        ctx2.lineTo(canv2.width, centY2 + (i * period * mult2));
        ctx2.moveTo(0, centY2 - (i * period * mult2));
        ctx2.lineTo(canv2.width, centY2 - (i * period * mult2));
        ctx2.fillText(-i * period, centX2 - 20, (centY2 + (i * period * mult2)) - 5);
        ctx2.fillText(i * period, centX2 - 20, (centY2 - (i * period * mult2)) - 5);
        if (i > 10000) {
            break;
        }
    }
    ctx2.stroke();



    is1F = document.getElementById("i-is1f").checked;
    is2F = document.getElementById("i-is2f").checked;
    is3F = document.getElementById("i-is3f").checked;

    if(document.getElementById("b-DistanseP").checked){
        for(let i = 0;i < distanseProtection.length;i++){
            distanseProtection[i].drawVisualisation(canv, mult, centX, centY, is1F, is2F, is3F);
        }
    
        for(let i = 0;i < distanseProtection.length;i++){
            distanseProtection[i].drawVisualisation(canv2, mult2, centX2, centY2, is1F, is2F, is3F);
        }
    }
    else if(document.getElementById("b-DifferentialP").checked){
        for(let i = 0;i < differentialProtection.length;i++){
            differentialProtection[i].drawVisualisation(canv, mult, centX, centY, is1F, is2F, is3F);
        }
    
        for(let i = 0;i < differentialProtection.length;i++){
            differentialProtection[i].drawVisualisation(canv2, mult2, centX2, centY2, is1F, is2F, is3F);
        }
    }

    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, dpInfo, canv.height);

    let usedSpace = 20;
    if(document.getElementById("b-DistanseP").checked){
        for(let i = 0;i < distanseProtection.length;i++){
            usedSpace += distanseProtection[i].drawName(canv, usedSpace, dpInfo, is1F, is2F, is3F);
        }
    }
    else if(document.getElementById("b-DifferentialP").checked){
        for(let i = 0;i < differentialProtection.length;i++){
            usedSpace += differentialProtection[i].drawName(canv, usedSpace, dpInfo, is1F, is2F, is3F);
        }
    }

}

document.getElementById("a-download").addEventListener('click', function (e) {
    try{
        document.getElementById("a-download").download = "visualisationRelayProtection.jpeg";
        document.getElementById("a-download").href =  document.getElementById("c-1").toDataURL({ format: 'jpeg', quality: 1 });
    }catch {

    }
});
document.getElementById("a-download4").addEventListener('click', function (e) {
    try{
        document.getElementById("a-download4").download = "visualisationRelayProtection.jpeg";
        document.getElementById("a-download4").href =  document.getElementById("c-1").toDataURL({ format: 'jpeg', quality: 1 });
    }catch {

    }
});

function module(x){
    if(x < 0){
        x = -x;
    }
    return x;
}
function sum(array){
    let result = 0;
    for (let i = 0;i < array.length;i++){
        result += Number(array[i]);
    }
    return result;
}
class Toast{
    constructor(t){
        this._title=!1!==t.title&&(t.title||"Title"),
        this._text=t.text||"Message...",
        this._theme=t.theme||"default",
        this._autohide=t.autohide&&!0,
        this._interval=+t.interval||5e3,
        this._create(),
        this._el.addEventListener("click",
        t=>{
            t.target.classList.contains("toast__close")&&
            this._hide()
        }),
        this._show()
    }
    _show(){
        this._el.classList.add("toast_showing"),
        this._el.classList.add("toast_show"),
        window.setTimeout(()=>{this._el.classList.remove("toast_showing")}),
        this._autohide&&setTimeout(()=>{this._hide()},this._interval)
    }
    _hide(){
        this._el.classList.add("toast_showing"),
        this._el.addEventListener("transitionend",
        ()=>{
            this._el.classList.remove("toast_showing"),
            this._el.classList.remove("toast_show"),
            this._el.remove()
        },
        {once:!0});
        const t=new CustomEvent("hide.toast",{detail:{target:this._el}});
        document.dispatchEvent(t)}_create(){const t=document.createElement("div");
        t.classList.add("toast"),t.classList.add(`toast_${this._theme}`);
        let e='{header}<div class="toast__body"></div><button class="toast__close" type="button"></button>';
        const s=!1===this._title?"":'<div class="toast__header"></div>';
        if(e=e.replace("{header}",s),
        t.innerHTML=e,this._title?t.querySelector(".toast__header").textContent=this._title:t.classList.add("toast_message"),
        t.querySelector(".toast__body").textContent=this._text,this._el=t,!document.querySelector(".toast-container")){const t=document.createElement("div");
        t.classList.add("toast-container"),
        document.body.append(t)}document.querySelector(".toast-container").append(this._el)
    }
}
