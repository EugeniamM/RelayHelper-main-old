function compareValueMarks(a, b) {
    if (a.sampleNumber < b.sampleNumber) {
      return -1;
    } else if (a.sampleNumber > b.sampleNumber) {
      return 1;
    }
    // a must be equal to b
    return 0;
}
function compareTimePeriodMarks(a, b) {
    if (Math.abs(a.sampleNumber1 + a.sampleNumber2) < Math.abs(b.sampleNumber1 + b.sampleNumber2)) {
      return -1;
    } else if (Math.abs(a.sampleNumber1 + a.sampleNumber2) > Math.abs(b.sampleNumber1 + b.sampleNumber2)) {
      return 1;
    }
    // a must be equal to b
    return 0;
}
class COMTRADEVisualiser{
    analogHeight;
    digitalHeight;
    color;
    backgroundColor;
    scale;
    maximum;
    imageData;
    COMTRADE;
    infoHeight;
    infoWidth;
    topInfoWidth;
    leftInfoWidth;
    COMTRADE;
    startX = 0;
    analogFill = 0.6;

    valueMarks;
    textMarks;
    timePeriodMarks;
    digitalChannelOverprint;

    constructor(COMTRADE){
        this.COMTRADE = COMTRADE;
    }
    reSet(){
        this.setSizes(this.analogHeight, this.digitalHeight, this.infoHeight, this.infoWidth);
    }
    reSetScale(){
        this.scale = new Array(this.COMTRADE.configuration.analogChannels);
        this.maximum = new Array(this.COMTRADE.configuration.analogChannels);   
        for (let i = 0; i < this.COMTRADE.data.analogData.length; i++) {
            let max = 0;
            for (let q = 0; q < this.COMTRADE.data.analogData[0].length; q++) {
                if (Math.abs(this.COMTRADE.data.analogData[i][q]) > max) {
                    max = Math.abs(this.COMTRADE.data.analogData[i][q]);
                }
            }
            this.maximum[i] = max;
        }
        for (let i = 0; i < this.maximum.length; i++) {
            this.scale[i] = this.analogHeight / this.maximum[i] * this.analogFill / 2;
        }
    }
    setSizes(analogHeight, digitalHeight, infoHeight, infoWidth){
        this.infoWidth = infoWidth;
        this.infoHeight = infoHeight;
        this.leftInfoWidth = 0;
        this.analogHeight = analogHeight;
        this.digitalHeight = digitalHeight;
        let getRandomColor = function() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        let checkForWord = function(text, word){
            let utf8Encode = new TextEncoder();
            let textArray = utf8Encode.encode(text);
            let wordArray = utf8Encode.encode(word);
            for (let i = 0;i < textArray.length;i++){
                let check = "";
                for (let q = 0; q < wordArray.length; q++) {
                    check += String.fromCharCode(textArray[i + q]);
                }
                if (check === word){
                    return true;
                }
            }
            return false;
        }
        try{
            this.color = new Array(this.COMTRADE.configuration.channels);  
            this.backgroundColor = new Array(this.COMTRADE.configuration.channels);     
            for (let i = 0; i < this.color.length; i++){
                if(i < this.COMTRADE.configuration.analogChannels){
                    let channelName = this.COMTRADE.configuration.analogNames[i].toLowerCase();
                    if (checkForWord(channelName, "u1")||checkForWord(channelName, "i1")||checkForWord(channelName, "ua")||checkForWord(channelName, "ia")||checkForWord(channelName, "il1")||checkForWord(channelName, "ul1")){
                        this.color[i] = "#ffde0a";
                    }
                    else if (checkForWord(channelName, "u2")||checkForWord(channelName, "i2")||checkForWord(channelName, "ub")||checkForWord(channelName, "ib")||checkForWord(channelName, "il2")||checkForWord(channelName, "ul2")){
                        this.color[i] = "green";
                    }
                    else if (checkForWord(channelName, "u3")||checkForWord(channelName, "i3")||checkForWord(channelName, "uc")||checkForWord(channelName, "ic")||checkForWord(channelName, "il3")||checkForWord(channelName, "ul3")){
                        this.color[i] = "red";
                    }
                    else if (checkForWord(channelName, "3u0")||checkForWord(channelName, "3i0")||checkForWord(channelName, "3uo")||checkForWord(channelName, "3io")||checkForWord(channelName, "ie")||checkForWord(channelName, "ue")||checkForWord(channelName, "ig")){
                        this.color[i] = "blue";
                    }
                    else if(this.color[i] === undefined||this.color[i] === "#ffde0a"||this.color[i] === "green"||this.color[i] === "red"||this.color[i] === "blue"){
                        this.color[i] = getRandomColor();
                    }
                    if(this.COMTRADE.configuration.analogAnnotation[i] === "original"){
                        this.backgroundColor[i] = "rgba(0, 0, 0, 0)"
                    }
                    else if(this.COMTRADE.configuration.analogAnnotation[i] === "calculation"){
                        this.backgroundColor[i] = "rgba(0, 0, 255, 0.1)"
                    }
                    else if(this.COMTRADE.configuration.analogAnnotation[i] === "additional"){
                        this.backgroundColor[i] = "rgba(0, 255, 0, 0.1)"
                    }
                }else {
                    let channelName = this.COMTRADE.configuration.digitalNames[i - this.COMTRADE.configuration.analogChannels].toLowerCase();
                    if (checkForWord(channelName, "trip")){
                        this.color[i] = "red";
                    }
                    else {
                        this.color[i] = "brown";
                    }
                    if(this.COMTRADE.configuration.digitalAnnotation[i - this.COMTRADE.configuration.analogChannels] === "original"){
                        this.backgroundColor[i] = "rgba(0, 0, 0, 0)"
                    }
                    else if(this.COMTRADE.configuration.digitalAnnotation[i - this.COMTRADE.configuration.analogChannels] === "calculation"){
                        this.backgroundColor[i] = "rgba(0, 0, 255, 0.1)"
                    }
                    else if(this.COMTRADE.configuration.digitalAnnotation[i - this.COMTRADE.configuration.analogChannels] === "additional"){
                        this.backgroundColor[i] = "rgba(0, 255, 0, 0.1)"
                    }
                }
            }
            this.imageData = new Array(this.COMTRADE.configuration.channels);
            this.scale = new Array(this.COMTRADE.configuration.analogChannels);
            this.maximum = new Array(this.COMTRADE.configuration.analogChannels);
            if(this.valueMarks === undefined){
                this.valueMarks = new Array(this.COMTRADE.configuration.analogChannels);
                for(let i = 0;i < this.valueMarks.length;i++){
                    this.valueMarks[i] = new Array();
                }
            }
            else{
                if(this.valueMarks.length + 1 === this.COMTRADE.configuration.analogChannels){
                    this.valueMarks.splice(0, 0, new Array());
                }
                else if(this.valueMarks.length !== this.COMTRADE.configuration.analogChannels){
                    this.valueMarks = new Array(this.COMTRADE.configuration.analogChannels);
                    for(let i = 0;i < this.valueMarks.length;i++){
                        this.valueMarks[i] = new Array();
                    }
                }
            }
            if(this.textMarks === undefined){
                this.textMarks = new Array(this.COMTRADE.configuration.analogChannels);
                for(let i = 0;i < this.textMarks.length;i++){
                    this.textMarks[i] = new Array();
                }
            }
            else{
                if(this.textMarks.length + 1 === this.COMTRADE.configuration.analogChannels){
                    this.textMarks.splice(0, 0, new Array());
                }
                else if(this.textMarks.length !== this.COMTRADE.configuration.analogChannels){
                    this.textMarks = new Array(this.COMTRADE.configuration.analogChannels);
                    for(let i = 0;i < this.textMarks.length;i++){
                        this.textMarks[i] = new Array();
                    }
                }
            }
            if(this.timePeriodMarks === undefined){
                this.timePeriodMarks = new Array(this.COMTRADE.configuration.analogChannels);
                for(let i = 0;i < this.timePeriodMarks.length;i++){
                    this.timePeriodMarks[i] = new Array();
                }
            }
            else{
                if(this.timePeriodMarks.length + 1 === this.COMTRADE.configuration.analogChannels){
                    this.timePeriodMarks.splice(0, 0, new Array());
                }
                else if(this.timePeriodMarks.length !== this.COMTRADE.configuration.analogChannels){
                    this.timePeriodMarks = new Array(this.COMTRADE.configuration.analogChannels);
                    for(let i = 0;i < this.timePeriodMarks.length;i++){
                        this.timePeriodMarks[i] = new Array();
                    }
                }
            }
            if(this.digitalChannelOverprint === undefined){
                this.digitalChannelOverprint = new Array(this.COMTRADE.configuration.analogChannels);
                for(let i = 0;i < this.digitalChannelOverprint.length;i++){
                    this.digitalChannelOverprint[i] = new Array();
                }
            }
            else{
                if(this.digitalChannelOverprint.length + 1 === this.COMTRADE.configuration.analogChannels){
                    this.digitalChannelOverprint.splice(0, 0, new Array());
                }
                else if(this.digitalChannelOverprint.length !== this.COMTRADE.configuration.analogChannels){
                    this.digitalChannelOverprint = new Array(this.COMTRADE.configuration.analogChannels);
                    for(let i = 0;i < this.digitalChannelOverprint.length;i++){
                        this.digitalChannelOverprint[i] = new Array();
                    }
                }
            }
            for (let i = 0; i < this.COMTRADE.data.analogData.length; i++) {
                let max = 0;
                if(this.COMTRADE.configuration.units[i] === "Hz"){
                    max = this.COMTRADE.configuration.frequency;
                }
                for (let q = 0; q < this.COMTRADE.data.analogData[0].length; q++) {
                    if ((Math.abs(this.COMTRADE.data.analogData[i][q]) > max&&this.COMTRADE.configuration.units[i] !== "Hz")||(Math.abs(this.COMTRADE.data.analogData[i][q] - this.COMTRADE.configuration.frequency) > Math.abs(max - this.COMTRADE.configuration.frequency)&&this.COMTRADE.configuration.units[i] === "Hz")) {
                        max = Math.abs(this.COMTRADE.data.analogData[i][q]);
                    }
                }
                this.maximum[i] = max;
            }
            for (let i = 0; i < this.maximum.length; i++) {
                this.scale[i] = analogHeight / this.maximum[i] * this.analogFill / 2;
            }
        }catch{}
    }
    addValueMark(channelIndex, sampleNumber, color, isInst, isAmp, isRMS1){
        let mark = new COMTRADEValueMark();
        mark.sampleNumber = sampleNumber;
        mark.color = color;
        mark.isInst = isInst;
        mark.isAmp = isAmp;
        mark.isRMS1 = isRMS1;
        this.valueMarks[channelIndex].push(mark);
    }
    addTextMark(channelIndex, text, sampleNumber, color){
        let mark = new COMTRADETextMark();
        mark.text = text;
        mark.color = color;
        mark.sampleNumber = sampleNumber;
        this.textMarks[channelIndex].push(mark);
    }
    addDigitalChannelOverptrint(channelIndex, digitalIndex, color){
        let mark = new COMTRADEDigitalChannelOverprint();
        mark.digitalIndex = digitalIndex;
        mark.color = color;
        this.digitalChannelOverprint[channelIndex].push(mark);
    }
    addTimePeriodMark(channelIndex, sampleNumber1, sampleNumber2, color){
        let mark = new COMTRADETimePeriodMark();
        mark.sampleNumber1 = sampleNumber1;
        mark.sampleNumber2 = sampleNumber2;
        mark.color = color;
        this.timePeriodMarks[channelIndex].push(mark);
    }
    drawFileInfo(visualisationCanvas, startY, addition){
        try{
            let ctxVis = visualisationCanvas.getContext("2d");
            ctxVis.fillStyle = "gray";
    
            ctxVis.fillRect(0, startY, visualisationCanvas.width, this.infoHeight);
    
            ctxVis.fillStyle = "black";
            ctxVis.font = "15px Arial";
    
            ctxVis.fillText(this.COMTRADE.configuration.stationName + ": " + "File start time: " + this.COMTRADE.configuration.startDate + "," + this.COMTRADE.configuration.startTime + ", Short circuit time: " + this.COMTRADE.configuration.circuitDate + "," + this.COMTRADE.configuration.circuitTime + ", " + (this.COMTRADE.configuration.isPrimary ? "Primary values" : "Secondary values") + ", " + addition, 0, startY + 15, visualisationCanvas.width);
            return this.infoHeight;
        }catch{}
        return 0;

    }
    /*drawAnalogChannel(visualisationCanvas, vectorCanvas, rotateDeg, startY, allX, time, timeGrid, centX, centY, mult, channelID, cursor, isRestoring, drawVector, realLength, drawVisualisation, baseAngle, isBase, restoreChannelType, lineWidth){
        let analogData = new COMTRADEChannelData();
        let startX = this.startX;
        let pointData;
        if(drawVector||drawVisualisation){
            pointData = this.COMTRADE.getPointCalculations(channelID, Math.round((((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth) * cursor) - allX) / (time * this.COMTRADE.configuration.analogSamplingTimePeriod[channelID]) - startX), baseAngle, isBase, restoreChannelType); 
        }
        if(drawVector&&Number(pointData.RMS) !== 0){
            let ctxVec = vectorCanvas.getContext("2d");
            let vectorX;
            let vectorY;
            if(!realLength){
                vectorX = vectorCanvas.width / 2.5 / mult * Math.cos((Number(pointData.angle) + rotateDeg) / 180 * Math.PI);
                vectorY = vectorCanvas.height / 2.5 / mult * Math.sin((Number(pointData.angle) + rotateDeg) / 180 * Math.PI);
            }
            else{
                vectorX = (Math.log10(pointData.RMS) > 1 ? Math.log10(pointData.RMS) : 1) * 100 * Math.cos((Number(pointData.angle) + rotateDeg) / 180 * Math.PI);
                vectorY = (Math.log10(pointData.RMS) > 1 ? Math.log10(pointData.RMS) : 1) * 100 * Math.sin((Number(pointData.angle) + rotateDeg) / 180 * Math.PI);
            }
            let pointer1X = vectorX - 15 * Math.cos((Number(pointData.angle) + rotateDeg + 20) / 180 * Math.PI);
            let pointer1Y = vectorY - 15 * Math.sin((Number(pointData.angle) + rotateDeg + 20) / 180 * Math.PI);

            let pointer2X = vectorX - 15 * Math.cos((Number(pointData.angle) + rotateDeg - 20) / 180 * Math.PI);
            let pointer2Y = vectorY - 15 * Math.sin((Number(pointData.angle) + rotateDeg - 20) / 180 * Math.PI);

            ctxVec.font = "15px Arial";
            ctxVec.fillStyle = "black";
            ctxVec.strokeStyle = this.color[channelID];
            ctxVec.lineWidth = lineWidth;
            ctxVec.beginPath();
            ctxVec.moveTo(centX, centY);
            ctxVec.lineTo(centX + vectorX * mult, centY - vectorY * mult);

            ctxVec.moveTo(centX + vectorX * mult, centY - vectorY * mult);
            ctxVec.lineTo(centY + pointer1X * mult, centY - pointer1Y * mult);

            ctxVec.moveTo(centX + vectorX * mult, centY - vectorY * mult);
            ctxVec.lineTo(centY + pointer2X * mult, centY - pointer2Y * mult);

            ctxVec.stroke();
            ctxVec.fillText(this.COMTRADE.configuration.analogNames[channelID], centX + vectorX * mult, centY - vectorY * mult);
        }
        if(drawVisualisation){
            let ctxVis = visualisationCanvas.getContext("2d");

            ctxVis.fillStyle = this.backgroundColor[channelID];
            ctxVis.fillRect(this.infoWidth, startY, visualisationCanvas.width - this.infoWidth - this.leftInfoWidth, this.analogHeight);

            ctxVis.strokeStyle = "black";
            ctxVis.lineWidth = 2;
            ctxVis.beginPath();
            ctxVis.moveTo(0, startY + this.analogHeight / 2);
            ctxVis.lineTo(visualisationCanvas.width, startY + this.analogHeight / 2);
            ctxVis.moveTo(this.infoWidth + allX, startY);
            ctxVis.lineTo(this.infoWidth + allX, startY + this.analogHeight);
            ctxVis.stroke();
            ctxVis.lineWidth = 0.5;
            ctxVis.beginPath();
            ctxVis.moveTo(this.infoWidth + allX, startY + this.analogHeight / 2 + this.maximum[channelID] * this.scale[channelID]);
            ctxVis.lineTo(visualisationCanvas.width - this.leftInfoWidth, startY + this.analogHeight / 2 + this.maximum[channelID] * this.scale[channelID]);
            ctxVis.moveTo(this.infoWidth + allX, startY + this.analogHeight / 2 - this.maximum[channelID] * this.scale[channelID]);
            ctxVis.lineTo(visualisationCanvas.width - this.leftInfoWidth, startY + this.analogHeight / 2 - this.maximum[channelID] * this.scale[channelID]);
            ctxVis.stroke();

            ctxVis.fillStyle = "black";
            ctxVis.font = "10px Arial";
            if(this.COMTRADE.configuration.units[channelID] !== "Hz"){
                ctxVis.fillText(-this.maximum[channelID].toFixed(4) + " " + this.COMTRADE.configuration.units[channelID], this.infoWidth + 10 + allX, startY + this.analogHeight / 2 + this.maximum[channelID] * this.scale[channelID] + 10);
                ctxVis.fillText(this.maximum[channelID].toFixed(4) + " " + this.COMTRADE.configuration.units[channelID], this.infoWidth + 10 + allX, startY + this.analogHeight / 2 - this.maximum[channelID] * this.scale[channelID] - 5);
            }
            else{
                ctxVis.fillText((this.COMTRADE.configuration.frequency - Math.abs(this.maximum[channelID] - this.COMTRADE.configuration.frequency)).toFixed(4) + " " + this.COMTRADE.configuration.units[channelID], this.infoWidth + 10 + allX, startY + this.analogHeight / 2 + this.maximum[channelID] * this.scale[channelID] + 10);
                ctxVis.fillText((this.COMTRADE.configuration.frequency + Math.abs(this.maximum[channelID] - this.COMTRADE.configuration.frequency)).toFixed(4) + " " + this.COMTRADE.configuration.units[channelID], this.infoWidth + 10 + allX, startY + this.analogHeight / 2 - this.maximum[channelID] * this.scale[channelID] - 5);
            }
            ctxVis.lineWidth = 0.5;
            ctxVis.strokeStyle = "black";
            ctxVis.beginPath();
            for (let q = 1; q < ((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth - allX) / time * 1000000) / timeGrid; q++) {
                ctxVis.moveTo((q * time * 1000000) * timeGrid + this.infoWidth + allX, startY);
                ctxVis.lineTo((q * time * 1000000) * timeGrid + this.infoWidth + allX, startY + this.analogHeight);

                ctxVis.fillText((q * timeGrid).toFixed(2) + " s", (this.infoWidth + (q * timeGrid * time * 1000000) + allX) + 10, 10 + startY);

                if (q > 1000) {
                    break;
                }
            }
            ctxVis.stroke();
            try{
                ctxVis.strokeStyle = this.color[channelID];
                ctxVis.lineWidth = lineWidth;
                ctxVis.beginPath();
                for (let q = Math.round(-(allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX) - 1; q <= (visualisationCanvas.width - this.infoWidth - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX&&q < this.COMTRADE.configuration.samples; q ++) {
                    if(q < 0){
                        q = 0;
                    }
                    if(isNaN(this.COMTRADE.data.analogData[channelID][q])){
                        ctxVis.stroke();
                        ctxVis.beginPath();
                        continue;
                    }
                    let r;
                    if(this.COMTRADE.configuration.units[channelID] === "Hz"){
                        r = (this.COMTRADE.data.analogData[channelID][q] - this.COMTRADE.configuration.frequency) * Math.abs(this.analogHeight / (this.maximum[channelID] - this.COMTRADE.configuration.frequency) * this.analogFill / 2);
                    }else{
                        r = this.COMTRADE.data.analogData[channelID][q] * this.scale[channelID];
                    }
                    if (r > this.analogHeight / 2) {
                        r = this.analogHeight / 2;
                    }
                    if (r < -this.analogHeight / 2) {
                        r = -this.analogHeight / 2;
                    }
                    if (q === 0) {
                        ctxVis.moveTo((q + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - r);
                    } else if (q > 0) {
                        ctxVis.lineTo((q + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - r);
                    }
                }
                ctxVis.stroke();
            }catch{}
            //ctxVis.putImageData(this.imageData[channelID], 0, startY)
            try{
                let number = Math.round(this.COMTRADE.configuration.samplingFrequency / this.COMTRADE.configuration.frequency);
                if(isRestoring){
                    let iRestoreAngle = pointData.AngleRestore;
                    let iRestoreStartPoint = pointData.RestoreStartPoint;
                    let iRestoreA = pointData.ValRestore;
                    let iRestoreAnglePeriod = 2 * Math.PI / number;
                    ctxVis.strokeStyle = "black";
                    ctxVis.lineWidth = 2;
                    ctxVis.beginPath();
                    for(let q = 0;q <= number;q++){
                        let r = iRestoreA * Math.sin(iRestoreAngle) * this.scale[channelID];
                        if (r > this.analogHeight / 2) {
                            r = this.analogHeight / 2;
                        }
                        if (r < -this.analogHeight / 2) {
                            r = -this.analogHeight / 2;
                        }
                        let sample = Math.round((((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth) * cursor) - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX + q + iRestoreStartPoint);
                        if (q === 0) {
                            ctxVis.moveTo((sample + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - r);
                    
                        } else if (q > 0) {
                            ctxVis.lineTo((sample + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - r);
                        }
                        iRestoreAngle += iRestoreAnglePeriod;
                    }
                    ctxVis.stroke();
                    ctxVis.fillStyle = "rgba(255, 0, 0, .1)";
                    ctxVis.fillRect((Math.round((((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth) * cursor) - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) + iRestoreStartPoint)) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY, number * (time * this.COMTRADE.configuration.samplingTimePeriod), this.analogHeight);
                }
                ctxVis.fillStyle = "rgba(0, 0, 255, .1)";
                ctxVis.fillRect(this.infoWidth + (visualisationCanvas.width - this.infoWidth - this.leftInfoWidth) * cursor, startY, number * (time * this.COMTRADE.configuration.samplingTimePeriod), this.analogHeight);
                
                ctxVis.fillStyle = "gray";
                ctxVis.fillRect(0, startY, this.infoWidth, this.analogHeight);
    
                ctxVis.fillStyle = "black";
                ctxVis.font = "15px Arial";

                ctxVis.fillText("Number: " + pointData.Number, 0, startY + 20,this.infoWidth);
                ctxVis.fillText("Name: " + pointData.Name, 0, startY + 40,this.infoWidth);
                ctxVis.fillText("Phase: " + pointData.Phase, 0, startY + 60,this.infoWidth);
                ctxVis.fillText("Units: " + pointData.Units, 0, startY + 80,this.infoWidth);
                ctxVis.fillText("Angle: " + pointData.angle, 0, startY + 100,this.infoWidth);
                ctxVis.fillText("RMS: " + pointData.RMS, 0, startY + 120,this.infoWidth);
                ctxVis.fillText("RMS1: " + pointData.RMS1, 0, startY + 140,this.infoWidth);
                ctxVis.fillText("RMS2: " + pointData.RMS2 + "%", 0, startY + 160,this.infoWidth);
                ctxVis.fillText("RMS3: " + pointData.RMS3 + "%", 0, startY + 180,this.infoWidth);
                ctxVis.fillText("RMS5: " + pointData.RMS5 + "%", 0, startY + 200,this.infoWidth);
                ctxVis.fillText("InstVal: " + pointData.instVal, 0, startY + 220,this.infoWidth);
                ctxVis.fillText("Ktr: " + this.COMTRADE.configuration.k1[channelID].toFixed(2) + " / " + this.COMTRADE.configuration.k2[channelID].toFixed(2), 0, startY + 260,this.infoWidth);
                if(isRestoring){
                    ctxVis.fillText("RMSRestore: " + pointData.RMSRestore, 0, startY + 280,this.infoWidth);
                }
            }catch{}
            ctxVis.strokeStyle = "black";
            ctxVis.lineWidth = 3;
            ctxVis.beginPath();
            ctxVis.moveTo(0, startY);
            ctxVis.lineTo(visualisationCanvas.width, startY);
            ctxVis.moveTo(0, startY + this.analogHeight);
            ctxVis.lineTo(visualisationCanvas.width, startY + this.analogHeight);
            ctxVis.stroke();

            analogData.pointData = pointData;
            analogData.COMTRADE = this.COMTRADE;
            analogData.startY = startY;
            analogData.endY = startY + this.analogHeight;
            analogData.height = this.analogHeight;
            analogData.isAnalog = true;
            analogData.index = channelID;

            return analogData;
        }
        analogData.pointData = pointData;
        analogData.COMTRADE = this.COMTRADE;
        analogData.startY = startY;
        analogData.endY = startY;
        analogData.height = 0;
        analogData.isAnalog = true;
        analogData.index = channelID;

        return analogData;
    }*/
    setImageData(visualisationCanvas, startY, allX, time, timeGrid, channelID, lineWidth){
        let startX = this.startX;
        let ctxVis = visualisationCanvas.getContext("2d");

        ctxVis.fillStyle = this.backgroundColor[channelID];
        ctxVis.fillRect(this.infoWidth, startY, visualisationCanvas.width - this.infoWidth - this.leftInfoWidth, this.analogHeight);

        ctxVis.strokeStyle = "black";
        ctxVis.lineWidth = 2;
        ctxVis.beginPath();
        ctxVis.moveTo(0, startY + this.analogHeight / 2);
        ctxVis.lineTo(visualisationCanvas.width, startY + this.analogHeight / 2);
        ctxVis.moveTo(this.infoWidth + allX, startY);
        ctxVis.lineTo(this.infoWidth + allX, startY + this.analogHeight);
        ctxVis.stroke();
        ctxVis.lineWidth = 0.5;
        ctxVis.beginPath();
        ctxVis.moveTo(this.infoWidth + allX, startY + this.analogHeight / 2 + this.maximum[channelID] * this.scale[channelID]);
        ctxVis.lineTo(visualisationCanvas.width - this.leftInfoWidth, startY + this.analogHeight / 2 + this.maximum[channelID] * this.scale[channelID]);
        ctxVis.moveTo(this.infoWidth + allX, startY + this.analogHeight / 2 - this.maximum[channelID] * this.scale[channelID]);
        ctxVis.lineTo(visualisationCanvas.width - this.leftInfoWidth, startY + this.analogHeight / 2 - this.maximum[channelID] * this.scale[channelID]);
        ctxVis.stroke();

        ctxVis.fillStyle = "black";
        ctxVis.font = "10px Arial";

        if(this.COMTRADE.configuration.units[channelID] !== "Hz"){
            ctxVis.fillText(-this.maximum[channelID].toFixed(4) * 1 + " " + this.COMTRADE.configuration.units[channelID], this.infoWidth + 10 + allX, startY + this.analogHeight / 2 + this.maximum[channelID] * this.scale[channelID] + 10);
            ctxVis.fillText(this.maximum[channelID].toFixed(4) * 1 + " " + this.COMTRADE.configuration.units[channelID], this.infoWidth + 10 + allX, startY + this.analogHeight / 2 - this.maximum[channelID] * this.scale[channelID] - 5);
        }
        else{
            ctxVis.fillText((this.COMTRADE.configuration.frequency - Math.abs(this.maximum[channelID] - this.COMTRADE.configuration.frequency)).toFixed(4) + " " + this.COMTRADE.configuration.units[channelID], this.infoWidth + 10 + allX, startY + this.analogHeight / 2 + this.maximum[channelID] * this.scale[channelID] + 10);
            ctxVis.fillText((this.COMTRADE.configuration.frequency + Math.abs(this.maximum[channelID] - this.COMTRADE.configuration.frequency)).toFixed(4) + " " + this.COMTRADE.configuration.units[channelID], this.infoWidth + 10 + allX, startY + this.analogHeight / 2 - this.maximum[channelID] * this.scale[channelID] - 5);
        }
        ctxVis.lineWidth = 0.5;
        ctxVis.strokeStyle = "black";
        ctxVis.beginPath();
        for (let q = 1; q < ((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth - allX) / time * 1000000) / timeGrid; q++) {
            ctxVis.moveTo((q * time * 1000000) * timeGrid + this.infoWidth + allX, startY);
            ctxVis.lineTo((q * time * 1000000) * timeGrid + this.infoWidth + allX, startY + this.analogHeight);

            ctxVis.fillText((q * timeGrid).toFixed(2) + " s", (this.infoWidth + (q * timeGrid * time * 1000000) + allX) + 10, 10 + startY);

            if (q > 1000) {
                break;
            }
        }
        ctxVis.stroke();
        try{
            ctxVis.strokeStyle = this.color[channelID];
            ctxVis.lineWidth = lineWidth;
            ctxVis.beginPath();
            for (let q = Math.round(-(allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX) - 1; q <= (visualisationCanvas.width - this.infoWidth - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX&&q < this.COMTRADE.configuration.samples; q ++) {
                if(q < 0){
                    q = 0;
                }
                if(isNaN(this.COMTRADE.data.analogData[channelID][q])){
                    ctxVis.stroke();
                    ctxVis.beginPath();
                    continue;
                }
                let r;
                if(this.COMTRADE.configuration.units[channelID] === "Hz"){
                    r = (this.COMTRADE.data.analogData[channelID][q] - this.COMTRADE.configuration.frequency) * Math.abs(this.analogHeight / (this.maximum[channelID] - this.COMTRADE.configuration.frequency) * this.analogFill / 2);
                }else{
                    r = this.COMTRADE.data.analogData[channelID][q] * this.scale[channelID];
                }
                if (r > this.analogHeight / 2) {
                    r = this.analogHeight / 2;
                }
                if (r < -this.analogHeight / 2) {
                    r = -this.analogHeight / 2;
                }
                if (q === 0) {
                    ctxVis.moveTo((q + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - r);
                } else if (q > 0) {
                    ctxVis.lineTo((q + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - r);
                }
            }
            ctxVis.stroke();
        }catch{}
        this.imageData[channelID] = ctxVis.getImageData(0, startY, visualisationCanvas.width, this.analogHeight);
        return this.analogHeight;
    }
    drawAnalogChannelWithImageData(visualisationCanvas, vectorCanvas, rotateDeg, startY, allX, time, timeGrid, centX, centY, mult, channelID, cursor, isRestoring, drawVector, realLength, drawVisualisation, baseAngle, isBase, restoreChannelType, lineWidth){
        let analogData = new COMTRADEChannelData();
        let startX = this.startX;
        let pointData;
        if(drawVector||drawVisualisation){
            pointData = this.COMTRADE.getPointCalculations(channelID, Math.round((((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth) * cursor) - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX), baseAngle, isBase, restoreChannelType); 
        }
        if(drawVector&&Number(pointData.RMS) !== 0){
            let ctxVec = vectorCanvas.getContext("2d");
            let vectorX;
            let vectorY;
            if(!realLength){
                vectorX = vectorCanvas.width / 2.5 / mult * Math.cos((Number(pointData.angle) + rotateDeg) / 180 * Math.PI);
                vectorY = vectorCanvas.height / 2.5 / mult * Math.sin((Number(pointData.angle) + rotateDeg) / 180 * Math.PI);
            }
            else{
                vectorX = (Math.log10(pointData.RMS) > 1 ? Math.log10(pointData.RMS) : 1) * 100 * Math.cos((Number(pointData.angle) + rotateDeg) / 180 * Math.PI);
                vectorY = (Math.log10(pointData.RMS) > 1 ? Math.log10(pointData.RMS) : 1) * 100 * Math.sin((Number(pointData.angle) + rotateDeg) / 180 * Math.PI);
            }
            let pointer1X = vectorX - 15 * Math.cos((Number(pointData.angle) + rotateDeg + 20) / 180 * Math.PI);
            let pointer1Y = vectorY - 15 * Math.sin((Number(pointData.angle) + rotateDeg + 20) / 180 * Math.PI);

            let pointer2X = vectorX - 15 * Math.cos((Number(pointData.angle) + rotateDeg - 20) / 180 * Math.PI);
            let pointer2Y = vectorY - 15 * Math.sin((Number(pointData.angle) + rotateDeg - 20) / 180 * Math.PI);

            ctxVec.font = "15px Arial";
            ctxVec.fillStyle = "black";
            ctxVec.strokeStyle = this.color[channelID];
            ctxVec.lineWidth = lineWidth;
            ctxVec.beginPath();
            ctxVec.moveTo(centX, centY);
            ctxVec.lineTo(centX + vectorX * mult, centY - vectorY * mult);

            ctxVec.moveTo(centX + vectorX * mult, centY - vectorY * mult);
            ctxVec.lineTo(centY + pointer1X * mult, centY - pointer1Y * mult);

            ctxVec.moveTo(centX + vectorX * mult, centY - vectorY * mult);
            ctxVec.lineTo(centY + pointer2X * mult, centY - pointer2Y * mult);

            ctxVec.stroke();
            ctxVec.fillText(this.COMTRADE.configuration.analogNames[channelID], centX + vectorX * mult, centY - vectorY * mult);
        }
        if(drawVisualisation){
            let ctxVis = visualisationCanvas.getContext("2d");
            ctxVis.putImageData(this.imageData[channelID], 0, startY);
            try{
                let number = Math.round(this.COMTRADE.configuration.samplingFrequency / this.COMTRADE.configuration.frequency);
                if(isRestoring){
                    let iRestoreAngle = pointData.AngleRestore;
                    let iRestoreStartPoint = pointData.RestoreStartPoint;
                    let iRestoreA = pointData.ValRestore;
                    let iRestoreAnglePeriod = 2 * Math.PI / number;
                    ctxVis.strokeStyle = "black";
                    ctxVis.lineWidth = 2;
                    ctxVis.beginPath();
                    for(let q = 0;q <= number;q++){
                        let r = iRestoreA * Math.sin(iRestoreAngle) * this.scale[channelID];
                        if (r > this.analogHeight / 2) {
                            r = this.analogHeight / 2;
                        }
                        if (r < -this.analogHeight / 2) {
                            r = -this.analogHeight / 2;
                        }
                        let sample = Math.round((((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth) * cursor) - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX + q + iRestoreStartPoint);
                        if (q === 0) {
                            ctxVis.moveTo((sample + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - r);
                    
                        } else if (q > 0) {
                            ctxVis.lineTo((sample + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - r);
                        }
                        iRestoreAngle += iRestoreAnglePeriod;
                    }
                    ctxVis.stroke();
                    ctxVis.fillStyle = "rgba(255, 0, 0, .1)";
                    ctxVis.fillRect((Math.round((((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth) * cursor) - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) + iRestoreStartPoint)) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY, number * (time * this.COMTRADE.configuration.samplingTimePeriod), this.analogHeight);
                }
                try{
                    let tempMarks = new Array();
                    for(let i = 0;i < this.valueMarks[channelID].length;i++){
                        tempMarks.push(this.valueMarks[channelID][i]);
                    }
                    //tempMarks.sort(compareValueMarks);
                    
                    ctxVis.lineWidth = 2;
                    ctxVis.font = "12px Arial";
                    let markHeight = (this.analogHeight / 2) * this.analogFill + this.analogHeight / 2 + 15;
                    for(let i = 0;i < tempMarks.length;i++){
                        if(tempMarks[i + 1] === undefined||tempMarks[i].sampleNumber !== tempMarks[i + 1].sampleNumber){
                            //console.log("hi")
                            let currentHeight = 0;
                            let PData = this.COMTRADE.getPointCalculations(channelID, tempMarks[i].sampleNumber, baseAngle, isBase, restoreChannelType);
                            //console.log(PData);

                            if(tempMarks[i].isInst){currentHeight+=15}
                            if(tempMarks[i].isAmp){currentHeight+=15}
                            if(tempMarks[i].isRMS1){currentHeight+=15}

                            let markOffset = 0;
                            for(let q = 0;q < currentHeight;q+=15){
                                if(q + markHeight >= this.analogHeight){
                                    markOffset += 15;
                                }
                            }
                            ctxVis.strokeStyle = tempMarks[i].color;
                            ctxVis.fillStyle = tempMarks[i].color;
                            ctxVis.beginPath();
                            ctxVis.moveTo((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2);
                            ctxVis.lineTo((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + markHeight - markOffset);
                            ctxVis.stroke();
                            let q = 0;
                            if(tempMarks[i].isInst){
                                ctxVis.beginPath();
                                ctxVis.moveTo((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth - 40, startY + markHeight - markOffset + q);
                                ctxVis.lineTo((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth + 40, startY + markHeight - markOffset + q);
                                ctxVis.stroke();
                                ctxVis.fillText("INST:" + PData.instVal * 1 + " " + this.COMTRADE.configuration.units[channelID], (tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth - 40, startY + markHeight + 12 - markOffset + q, 80);
                                q += 15;
                            }
                            if(tempMarks[i].isAmp){
                                ctxVis.beginPath();
                                ctxVis.moveTo((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth - 40, startY + markHeight - markOffset + q);
                                ctxVis.lineTo((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth + 40, startY + markHeight - markOffset + q);
                                ctxVis.stroke();
                                ctxVis.fillText("AMP:" + PData.ampVal * 1 + " " + this.COMTRADE.configuration.units[channelID], (tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth - 40, startY + markHeight + 12 - markOffset + q, 80);
                                q += 15;
                            }
                            if(tempMarks[i].isRMS1){
                                ctxVis.beginPath();
                                ctxVis.moveTo((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth - 40, startY + markHeight - markOffset + q);
                                ctxVis.lineTo((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth + 40, startY + markHeight - markOffset + q);
                                ctxVis.stroke();
                                ctxVis.fillText("RMS1:" + PData.RMS1 * 1 + " " + this.COMTRADE.configuration.units[channelID]/* + " ∠" + PData.angle + "°"*/, (tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth - 40, startY + markHeight + 12 - markOffset + q, 80);
                                q += 15;
                            }
                            markHeight += q;
                            if(markHeight + 15 > this.analogHeight){
                                markHeight = (this.analogHeight / 2) * this.analogFill + this.analogHeight / 2 + 15;
                            }
                        }
                    }
                }catch{}
                try{
                    let tempMarks = new Array();
                    for(let i = 0;i < this.timePeriodMarks[channelID].length;i++){
                        tempMarks.push(this.timePeriodMarks[channelID][i]);
                    }
                    tempMarks.sort(compareTimePeriodMarks);
                    let points = new Map();
                    for(let i = 0;i < tempMarks.length;i++){
                        if(points.has(tempMarks[i].sampleNumber1)){
                            points.set(tempMarks[i].sampleNumber1, points.get(tempMarks[i].sampleNumber1) + 1);
                        }
                        else{
                            points.set(tempMarks[i].sampleNumber1, 1);
                        }

                        if(points.has(tempMarks[i].sampleNumber2)){
                            points.set(tempMarks[i].sampleNumber2, points.get(tempMarks[i].sampleNumber2) + 1);
                        }
                        else{
                            points.set(tempMarks[i].sampleNumber2, 1);
                        }
                    }
                    let maxFromOne = 3;
                    for (let key of points.keys()) {
                        if(points.get(key) > maxFromOne){
                            maxFromOne = points.get(key)
                        }
                    }
                    ctxVis.lineWidth = 2;
                    ctxVis.font = "12px Arial";
                    let markHeight = this.analogHeight - 15 * maxFromOne;
                    for(let i = 0;i < tempMarks.length;i++){
                        if(tempMarks[i + 1] === undefined||(tempMarks[i].sampleNumber1 !== tempMarks[i + 1].sampleNumber1||tempMarks[i].sampleNumber2 !== tempMarks[i + 1].sampleNumber2)){
                            ctxVis.strokeStyle = tempMarks[i].color;
                            ctxVis.fillStyle = tempMarks[i].color;
                            ctxVis.beginPath();
                            ctxVis.moveTo((tempMarks[i].sampleNumber1 + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2);
                            ctxVis.lineTo((tempMarks[i].sampleNumber1 + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight - markHeight);
                            ctxVis.lineTo((tempMarks[i].sampleNumber2 + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight - markHeight);
                            ctxVis.lineTo((tempMarks[i].sampleNumber2 + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2);
                            ctxVis.stroke();
                            ctxVis.fillText(Math.round(Math.abs(tempMarks[i].sampleNumber1 - tempMarks[i].sampleNumber2) * this.COMTRADE.configuration.samplingTimePeriod / 1000) + " ms", (Math.round((tempMarks[i].sampleNumber1 + tempMarks[i].sampleNumber2) / 2) + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth - 20, startY + this.analogHeight - markHeight - 2, 40);  
                            markHeight += 15;
                            if(markHeight + 15 > this.analogHeight){
                                markHeight = this.analogHeight - 15 * maxFromOne;
                            }
                        }
                    }
                }catch{}

                try{
                    ctxVis.globalAlpha = 0.5;
                    ctxVis.lineWidth = 10;
                    for(let i = 0;i < this.digitalChannelOverprint.length;i++){
                        //console.log(this.COMTRADE.data.digitalData[this.digitalChannelOverprint[channelID][i].digitalIndex])
                        try {
                            ctxVis.strokeStyle = this.digitalChannelOverprint[channelID][i].color;
                            for (let q = Math.round(-(allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX) - 1; q < (visualisationCanvas.width - this.infoWidth - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX&&q < this.COMTRADE.configuration.samples; q++) {
                                if(q < 0){
                                    q = 0;
                                }
                                if (Number(this.COMTRADE.data.digitalData[this.digitalChannelOverprint[channelID][i].digitalIndex][q]) === 1) {
                                    let j = 0;
                                    while (q + j < this.COMTRADE.data.digitalData[0].length) {
                                        if ((Number(this.COMTRADE.data.digitalData[this.digitalChannelOverprint[channelID][i].digitalIndex][q + j]) === 0)||isNaN(Number(this.COMTRADE.data.digitalData[this.digitalChannelOverprint[channelID][i].digitalIndex][q + j]))) {
                                            break;
                                        }
                                        j++;
                                    }
                                    ctxVis.beginPath();
                                    ctxVis.moveTo((q + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - i * 15);
                                    ctxVis.lineTo(((q + j) + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 - i * 15);
                                    ctxVis.stroke();

                                    q += j;
                                }
                            }
                        }catch {}
                    }
                    ctxVis.globalAlpha = 1;
                }catch{}
                try{
                    let tempMarks = new Array();
                    for(let i = 0;i < this.textMarks[channelID].length;i++){
                        tempMarks.push(this.textMarks[channelID][i]);
                    }
                    ctxVis.lineWidth = 2;
                    ctxVis.font = "12px Arial";
                    for(let i = 0;i < tempMarks.length;i++){
                        ctxVis.fillStyle = "rgb(230, 230, 230)";
                        let textLength = tempMarks[i].text.length * 6;
                        ctxVis.fillRect((tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 + 15 + i * 15, textLength, 15);
                        ctxVis.fillStyle = tempMarks[i].color;
                        ctxVis.fillText(tempMarks[i].text, (tempMarks[i].sampleNumber + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.analogHeight / 2 + 15 + i * 15 + 12, textLength)
                    }
                }catch{}

                ctxVis.fillStyle = "rgba(0, 0, 255, .1)";
                ctxVis.fillRect(this.infoWidth + (visualisationCanvas.width - this.infoWidth - this.leftInfoWidth) * cursor, startY, number * (time * this.COMTRADE.configuration.samplingTimePeriod), this.analogHeight);
                
                ctxVis.fillStyle = "gray";
                ctxVis.fillRect(0, startY, this.infoWidth, this.analogHeight);

                try{
                    for(let i = 0;i < this.digitalChannelOverprint.length;i++){
                        ctxVis.fillStyle = this.digitalChannelOverprint[channelID][i].color;
                        ctxVis.fillText(this.COMTRADE.configuration.digitalNames[this.digitalChannelOverprint[channelID][i].digitalIndex], this.infoWidth / 2 + 20, startY + this.analogHeight / 2 - i * 15 + 5, this.infoWidth / 2 - 20);
                    }
                }catch{}
    
                ctxVis.fillStyle = "black";
                ctxVis.font = "15px Arial";

                ctxVis.fillText("Number: " + pointData.Number, 0, startY + 20,this.infoWidth);
                ctxVis.fillText("Name: " + pointData.Name, 0, startY + 40,this.infoWidth);
                ctxVis.fillText("Phase: " + pointData.Phase, 0, startY + 60,this.infoWidth);
                ctxVis.fillText("Units: " + pointData.Units, 0, startY + 80,this.infoWidth);
                ctxVis.fillText("Angle: " + pointData.angle, 0, startY + 100,this.infoWidth);
                ctxVis.fillText("RMS: " + pointData.RMS, 0, startY + 120,this.infoWidth);
                ctxVis.fillText("RMS1: " + pointData.RMS1, 0, startY + 140,this.infoWidth);
                ctxVis.fillText("RMS2: " + pointData.RMS2 + "%", 0, startY + 160,this.infoWidth);
                ctxVis.fillText("RMS3: " + pointData.RMS3 + "% " + (pointData.RMS3 * pointData.RMS1 / 100).toFixed(4) + " " + Math.round(pointData.f / Math.PI * 180), 0, startY + 180,this.infoWidth);
                ctxVis.fillText("RMS5: " + pointData.RMS5 + "%", 0, startY + 200,this.infoWidth);
                ctxVis.fillText("InstVal: " + pointData.instVal, 0, startY + 220,this.infoWidth);
                ctxVis.fillText("MaxVal: " + pointData.ampVal, 0, startY + 240,this.infoWidth);
                ctxVis.fillText("Ktr: " + this.COMTRADE.configuration.k1[channelID] + " / " + this.COMTRADE.configuration.k2[channelID], 0, startY + 260,this.infoWidth);
                if(isRestoring){
                    ctxVis.fillText("RMSRestore: " + pointData.RMSRestore, 0, startY + 280,this.infoWidth);
                }
            }catch{}
            ctxVis.strokeStyle = "black";
            ctxVis.lineWidth = 3;
            ctxVis.beginPath();
            ctxVis.moveTo(0, startY);
            ctxVis.lineTo(visualisationCanvas.width, startY);
            ctxVis.moveTo(0, startY + this.analogHeight);
            ctxVis.lineTo(visualisationCanvas.width, startY + this.analogHeight);
            ctxVis.stroke();

            analogData.pointData = pointData;
            analogData.COMTRADE = this.COMTRADE;
            analogData.startY = startY;
            analogData.endY = startY + this.analogHeight;
            analogData.height = this.analogHeight;
            analogData.isAnalog = true;
            analogData.index = channelID;

            return analogData;
        }
        analogData.pointData = pointData;
        analogData.COMTRADE = this.COMTRADE;
        analogData.startY = startY;
        analogData.endY = startY;
        analogData.height = 0;
        analogData.isAnalog = true;
        analogData.index = channelID;

        return analogData;
    }
    drawDigitalChannel(visualisationCanvas, startY, allX, time, timeGrid, channelID, drawEmpty){
        let digitalData = new COMTRADEChannelData();
        if(!drawEmpty){
            let isEmpty = true;
            for(let i = 0;i < this.COMTRADE.configuration.samples;i++){
                if(Number(this.COMTRADE.data.digitalData[channelID][i]) === 1){
                    isEmpty = false;
                }
            }
            if(isEmpty){
                digitalData.COMTRADE = this.COMTRADE;
                digitalData.startY = startY;
                digitalData.endY = startY;
                digitalData.height = 0;
                digitalData.isAnalog = false;
                digitalData.index = channelID;

                return digitalData;
            }
        }
        let startX = this.startX;
        let ctxVis = visualisationCanvas.getContext("2d");

        ctxVis.fillStyle = this.backgroundColor[channelID + this.COMTRADE.configuration.analogChannels];
        ctxVis.fillRect(this.infoWidth, startY, visualisationCanvas.width - this.infoWidth - this.leftInfoWidth, this.digitalHeight);
        
        ctxVis.strokeStyle = "black";
        ctxVis.lineWidth = 2;
        ctxVis.beginPath();
        ctxVis.moveTo(0, startY + this.digitalHeight / 2);
        ctxVis.lineTo(visualisationCanvas.width, startY + this.digitalHeight / 2);
        ctxVis.moveTo(this.infoWidth + allX, startY);
        ctxVis.lineTo(this.infoWidth + allX, startY + this.digitalHeight);
        ctxVis.stroke();

        ctxVis.fillStyle = "black";
        ctxVis.font = "10px Arial";

        ctxVis.lineWidth = 0.5;
        ctxVis.strokeStyle = "black";
        ctxVis.beginPath();
        for (let q = 1; q <= ((visualisationCanvas.width - this.infoWidth - this.leftInfoWidth - allX) / time * 1000000) / timeGrid; q++) {
            ctxVis.moveTo((q * time * 1000000) * timeGrid + this.infoWidth + allX, startY);
            ctxVis.lineTo((q * time * 1000000) * timeGrid + this.infoWidth + allX, startY + this.digitalHeight);
            if (q > 1000) {
                break;
            }
        }
        ctxVis.stroke();
        try {
            for (let q = Math.round(-(allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX) - 1; q < (visualisationCanvas.width - this.infoWidth - allX) / (time * this.COMTRADE.configuration.samplingTimePeriod) - startX&&q < this.COMTRADE.configuration.samples; q++) {
                if(q < 0){
                    q = 0;
                }
                if (Number(this.COMTRADE.data.digitalData[channelID][q]) === 1) {
                    let j = 0;
                    while (q + j < this.COMTRADE.data.digitalData[0].length) {
                        if ((Number(this.COMTRADE.data.digitalData[channelID][q + j]) === 0)||isNaN(Number(this.COMTRADE.data.digitalData[channelID][q + j]))) {
                            break;
                        }
                        j++;
                    }
                    ctxVis.strokeStyle = this.color[channelID + this.COMTRADE.configuration.analogChannels];
                    ctxVis.lineWidth = this.digitalHeight / 2;
                    ctxVis.beginPath();
                    ctxVis.moveTo((q + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.digitalHeight / 2);
                    ctxVis.lineTo(((q + j) + startX) * time * this.COMTRADE.configuration.samplingTimePeriod + allX + this.infoWidth, startY + this.digitalHeight / 2);
                    ctxVis.stroke();
                    q += j;
                }
            }
        }
        catch {}
        try{
            ctxVis.fillStyle = "gray";
            ctxVis.fillRect(0, startY, this.infoWidth, this.digitalHeight);

            ctxVis.fillStyle = "black";
            ctxVis.font = "15px Arial";

            ctxVis.fillText(this.COMTRADE.configuration.digitalNumbers[channelID] + ")" + this.COMTRADE.configuration.digitalNames[channelID], 0, startY + 20, this.infoWidth);
        }catch{}

        ctxVis.strokeStyle = "black";
        ctxVis.lineWidth = 3;
        ctxVis.beginPath();
        ctxVis.moveTo(0, startY);
        ctxVis.lineTo(visualisationCanvas.width, startY);
        ctxVis.moveTo(0, startY + this.digitalHeight);
        ctxVis.lineTo(visualisationCanvas.width, startY + this.digitalHeight);
        ctxVis.stroke();

        digitalData.COMTRADE = this.COMTRADE;
        digitalData.startY = startY;
        digitalData.endY = startY + this.digitalHeight;
        digitalData.height = this.digitalHeight;
        digitalData.isAnalog = false;
        digitalData.index = channelID;

        return digitalData;
    }
    
}
class COMTRADEChannelData{
    pointData;
    COMTRADE;
    startY;
    endY;
    height;
    isAnalog;
    index;
}
class COMTRADEValueMark{
    sampleNumber;
    color;
    isInst;
    isAmp;
    isRMS1;
}
class COMTRADETimeMark{
    sampleNumber;
    color;
}
class COMTRADETimePeriodMark{
    sampleNumber1;
    sampleNumber2;
    color;
}
class COMTRADEDigitalChannelOverprint{
    digitalIndex;
    color;
}
class COMTRADETextMark{
    sampleNumber;
    text;
    color;
}
