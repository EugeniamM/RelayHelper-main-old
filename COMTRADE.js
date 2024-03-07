class COMTRADE{
    isEmpty = true
    configuration;
    data;
    readCfg = function(){

    }
    readDat = function(){

    }
    read(cfg, dat, encoder) {
        this.isEmpty = false;
        let COMTRADE = this;
        let cfgReader = new FileReader();
        cfgReader.onload = function(){
            let twoDimensionArray = function(a, b) {
                let arr = [];
            
            
                for (let i = 0; i< a; i++) {
                    for(let j = 0; j< b; j++) {
                        arr[i] = [];
                    }
                }
            
            
                for (let i = 0; i< a; i++) {
                    for(let j = 0; j< b; j++) {
                        arr[i][j] = "";
                    }
                }
                return arr;
            }
            let extractMention = function(text) {
                const pattern = /\@\[(.*?)\]/; // Regular expression pattern with capturing group
                const match = text.match(pattern); // Attempt to find a match
                
                if (match) {
                  return match[1]; // Return the text inside the @[] brackets
                } else {
                  return "none"; // Return "none" if no match is found
                }
              }
            COMTRADE.configuration = new COMTRADEConfiguration();
            COMTRADE.configuration.isPrimary = true;
            let lines = cfgReader.result.split("\r\n");
            
            let cfgArray = new Array(lines.length);
            for (let i = 0; i < lines.length; i++) {
                cfgArray[i] = lines[i].split(",");
            }
            /*
            let readOffset = 1;
            try{
                COMTRADE.configuration.stationName = cfgArray[0][0];
                COMTRADE.configuration.channels = Number(cfgArray[1][0]);
                COMTRADE.configuration.analogChannels = Number(cfgArray[1][1].replace("A", ""));
                COMTRADE.configuration.digitalChannels = Number(cfgArray[1][2].replace("D", ""));

                readOffset = Number(cfgArray[COMTRADE.configuration.channels + 3][0]);
                if(readOffset === 0){
                    readOffset = 1;
                }

                COMTRADE.configuration.startDate = cfgArray[COMTRADE.configuration.channels + 4 + readOffset][0];
                COMTRADE.configuration.startTime = cfgArray[COMTRADE.configuration.channels + 4 + readOffset][1];
                COMTRADE.configuration.circuitDate = cfgArray[COMTRADE.configuration.channels + 5 + readOffset][0];
                COMTRADE.configuration.circuitTime = cfgArray[COMTRADE.configuration.channels + 5 + readOffset][1];
                COMTRADE.configuration.dataType = cfgArray[COMTRADE.configuration.channels + 6 + readOffset][0];

                COMTRADE.configuration.frequency = Number(cfgArray[COMTRADE.configuration.channels + 2][0]);
                COMTRADE.configuration.samples = Number(cfgArray[COMTRADE.configuration.channels + 3 + readOffset][1]);
                COMTRADE.configuration.samplingFrequency = Number(cfgArray[COMTRADE.configuration.channels + 3 + readOffset][0]);
                COMTRADE.configuration.samplingTimePeriod = Number(1000000 / Number(cfgArray[COMTRADE.configuration.channels + 3 + readOffset][0]));
            }
            catch{}
            COMTRADE.configuration.analogFrequency = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.analogFrequency.fill(Number(cfgArray[COMTRADE.configuration.channels + 2][0]));
            COMTRADE.configuration.analogSamples = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.analogSamples.fill(Number(cfgArray[COMTRADE.configuration.channels + 3 + readOffset][1]));
            COMTRADE.configuration.analogSamplingFrequency = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.analogSamplingFrequency.fill(Number(cfgArray[COMTRADE.configuration.channels + 3 + readOffset][0]));
            COMTRADE.configuration.analogSamplingTimePeriod = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.analogSamplingTimePeriod.fill(Number(1000000 / Number(cfgArray[COMTRADE.configuration.channels + 3 + readOffset][0])));

            */
            try{
                COMTRADE.configuration.stationName = cfgArray[0][0];
                COMTRADE.configuration.channels = Number(cfgArray[1][0]);
                COMTRADE.configuration.analogChannels = Number(cfgArray[1][1].replace("A", ""));
                COMTRADE.configuration.digitalChannels = Number(cfgArray[1][2].replace("D", ""));

                COMTRADE.configuration.startDate = cfgArray[COMTRADE.configuration.channels + 5][0];
                COMTRADE.configuration.startTime = cfgArray[COMTRADE.configuration.channels + 5][1];
                COMTRADE.configuration.circuitDate = cfgArray[COMTRADE.configuration.channels + 6][0];
                COMTRADE.configuration.circuitTime = cfgArray[COMTRADE.configuration.channels + 6][1];
                COMTRADE.configuration.dataType = cfgArray[COMTRADE.configuration.channels + 7][0];

                COMTRADE.configuration.frequency = Number(cfgArray[COMTRADE.configuration.channels + 2][0]);
                COMTRADE.configuration.samples = Number(cfgArray[COMTRADE.configuration.channels + 4][1]);
                COMTRADE.configuration.samplingFrequency = Number(cfgArray[COMTRADE.configuration.channels + 4][0]);
                COMTRADE.configuration.samplingTimePeriod = Number(1000000 / Number(cfgArray[COMTRADE.configuration.channels + 4][0]));
            }
            catch{}


            COMTRADE.configuration.analogNames = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.phases = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.digitalNames = new Array(COMTRADE.configuration.digitalChannels);
            COMTRADE.configuration.analogNumbers = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.digitalNumbers = new Array(COMTRADE.configuration.digitalChannels);

            COMTRADE.configuration.canBeSecondary = new Array(COMTRADE.configuration.analogChannels);

            COMTRADE.configuration.analogAnnotation = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.analogAnnotation.fill("original");
            COMTRADE.configuration.digitalAnnotation = new Array(COMTRADE.configuration.digitalChannels);
            COMTRADE.configuration.digitalAnnotation.fill("original");

            COMTRADE.configuration.offset = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.scale = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.units = new Array(COMTRADE.configuration.analogChannels);

            COMTRADE.configuration.k1 = new Array(COMTRADE.configuration.analogChannels);
            COMTRADE.configuration.k2 = new Array(COMTRADE.configuration.analogChannels);

            for (let i = 0; i < COMTRADE.configuration.analogChannels; i++) {
                COMTRADE.configuration.analogNames[i] = cfgArray[i + 2][1];
                COMTRADE.configuration.analogNumbers[i] = Number(cfgArray[i + 2][0]);
                COMTRADE.configuration.units[i] = cfgArray[i + 2][4];
                if(cfgArray[i + 2].length == 13){
                    COMTRADE.configuration.k1[i] = Number(cfgArray[i + 2][10]);
                    COMTRADE.configuration.k2[i] = Number(cfgArray[i + 2][11]);
                }
                else{
                    COMTRADE.configuration.k1[i] = 1;
                    COMTRADE.configuration.k2[i] = 1;
                }
                COMTRADE.configuration.scale[i] = Number(cfgArray[i + 2][5]);
                COMTRADE.configuration.offset[i] = Number(cfgArray[i + 2][6]);
                COMTRADE.configuration.phases[i] = cfgArray[i + 2][2];
            }
            for (let i = 0; i < COMTRADE.configuration.digitalChannels; i++) {
                COMTRADE.configuration.digitalNames[i] = cfgArray[i + COMTRADE.configuration.analogChannels + 2][1];
                COMTRADE.configuration.digitalNumbers[i] = Number(cfgArray[i + COMTRADE.configuration.analogChannels + 2][0]);
            }

            for(let i = 0;i < COMTRADE.configuration.analogNames.length;i++){
                let annotation = extractMention(COMTRADE.configuration.analogNames[i]);
                if(annotation !== "none"){
                    COMTRADE.configuration.analogAnnotation[i] = annotation;
                    COMTRADE.configuration.analogNames[i] = COMTRADE.configuration.analogNames[i].replace(/\@\[.*\]/, "")
                }
            }
            for(let i = 0;i < COMTRADE.configuration.digitalNames.length;i++){
                let annotation = extractMention(COMTRADE.configuration.digitalNames[i]);
                if(annotation !== "none"){
                    COMTRADE.configuration.digitalAnnotation[i] = annotation;
                    COMTRADE.configuration.digitalNames[i] = COMTRADE.configuration.digitalNames[i].replace(/\@\[.*\]/, "")
                }
            }

            COMTRADE.configuration.configurationOriginal = cfgArray;
            COMTRADE.readCfg();
            let datReader = new FileReader();

            let datArray = twoDimensionArray(COMTRADE.configuration.samples, COMTRADE.configuration.channels + 2);
            COMTRADE.data = new COMTRADEData();
            COMTRADE.data.dataOriginal = datArray;
            COMTRADE.data.digitalData = twoDimensionArray(COMTRADE.configuration.digitalChannels, COMTRADE.configuration.samples);
            COMTRADE.data.analogData = twoDimensionArray(COMTRADE.configuration.analogChannels, COMTRADE.configuration.samples);
            COMTRADE.data.analogDataPrimary = twoDimensionArray(COMTRADE.configuration.analogChannels, COMTRADE.configuration.samples);
            COMTRADE.data.analogDataSecondary = twoDimensionArray(COMTRADE.configuration.analogChannels, COMTRADE.configuration.samples);
            COMTRADE.data.sampleNumber = new Array(COMTRADE.configuration.samples);
            COMTRADE.data.sampleTime = new Array(COMTRADE.configuration.samples);

            datReader.onload = function(){
                try{
                    if(COMTRADE.configuration.dataType === "ASCII"){
                        let lines = datReader.result.split("\r\n");
                        for (let i = 0; i < lines.length; i++) {
                            datArray[i] = lines[i].split(",");
                        }
                    }
                    else if(COMTRADE.configuration.dataType === "BINARY"){
                        const TWOINPOWEROF16 = 65536;
                        const TWOINPOWEROF32 = 4294967296;
                        let datBuffer = datReader.result;
                        let digitalSpace = COMTRADE.configuration.digitalChannels;
                        if(COMTRADE.configuration.digitalChannels % 16 !== 0){
                            digitalSpace = (16 - (COMTRADE.configuration.digitalChannels % 16)) + COMTRADE.configuration.digitalChannels;
                        }
                        let sampleBitLength = (32 * 2 + 16 * COMTRADE.configuration.analogChannels + 1 * digitalSpace) / 16;
                        let samples = new Array(COMTRADE.configuration.samples);
                        
                        for(let i = 0;i < COMTRADE.configuration.samples;i++){
                            samples[i] = new Int16Array(datBuffer.slice(i * sampleBitLength * 2, (i + 1) * sampleBitLength * 2))
                        }
                        for(let i = 0;i < COMTRADE.configuration.samples;i++){
                            let sampleInfo = new Int32Array(datBuffer.slice(i * sampleBitLength * 2, i * sampleBitLength * 2 + 8));
                            let sampleNumber = sampleInfo[0];
                            let sampleTime = sampleInfo[1];
                            if(sampleNumber < 0){
                                sampleNumber += TWOINPOWEROF32;
                            }
                            if(sampleTime < 0){
                                sampleTime += TWOINPOWEROF32;
                            }
                            datArray[i][0] = sampleNumber;
                            datArray[i][1] = sampleTime;
                            for(let j = 0;j < COMTRADE.configuration.analogChannels;j++){
                                datArray[i][j + 2] = samples[i][j + 4];
                            }
                            for(let j = 0;j < digitalSpace / 16;j++){
                                let currentChannel = Number(samples[i][4 + COMTRADE.configuration.analogChannels + j]);
                                if(currentChannel < 0){
                                    currentChannel += TWOINPOWEROF16;
                                }
                                let channelString = "";
                                let rawBinary = currentChannel.toString(2);
                                for(let q = 0;q < 16 - rawBinary.length;q++){
                                    channelString += "0";
                                }
                                channelString += rawBinary;
                                let utf8Encode = new TextEncoder();
                                let digitalDat = utf8Encode.encode(channelString);
                                for(let q = 0;q < digitalDat.length;q++){
                                    if(COMTRADE.configuration.analogChannels + q + j * 16 < COMTRADE.configuration.channels){
                                        datArray[i][COMTRADE.configuration.analogChannels + 2 + q + j * 16] = Number(String.fromCharCode(digitalDat[digitalDat.length - 1 - q]));
                                    }
                                }
                            }
                
                        }
                    }
    
                }catch{}
                try{
                    for (let i = 0; i < datArray.length; i++) {
    
                        COMTRADE.data.sampleNumber[i] = Number(datArray[i][0]);
                        COMTRADE.data.sampleTime[i] = Number(datArray[i][1]);
    
                        for (let q = 0; q < COMTRADE.configuration.analogChannels; q++) {
                            COMTRADE.data.analogData[q][i] = Number(datArray[i][q + 2] * COMTRADE.configuration.scale[q]) + Number(COMTRADE.configuration.offset[q]);
                            COMTRADE.configuration.canBeSecondary[q] = false;
                            COMTRADE.data.analogDataPrimary[q][i] = COMTRADE.data.analogData[q][i];
                            COMTRADE.data.analogDataSecondary[q][i] = COMTRADE.data.analogData[q][i];
                            if(cfgArray[q + 2].length === 13){
                                if(cfgArray[q + 2][12] === "S"){
                                    COMTRADE.data.analogData[q][i] = COMTRADE.data.analogData[q][i] * Number(cfgArray[q + 2][10]) / Number(cfgArray[q + 2][11])

                                }
                                COMTRADE.data.analogDataPrimary[q][i] = COMTRADE.data.analogData[q][i];
                                COMTRADE.data.analogDataSecondary[q][i] = COMTRADE.data.analogData[q][i] / Number(cfgArray[q + 2][10]) * Number(cfgArray[q + 2][11]);
                                COMTRADE.configuration.canBeSecondary[q] = true;
                            }
                        }
                        for (let q = 0; q < COMTRADE.configuration.digitalChannels; q++) {
                            COMTRADE.data.digitalData[q][i] = Number(datArray[i][q + 2 + COMTRADE.configuration.analogChannels]);
                        }
                    }
                    COMTRADE.data.dataOriginal = datArray;
                }catch{}
                if(COMTRADE.configuration.samplingFrequency === 0){
                    COMTRADE.configuration.samplingTimePeriod = (COMTRADE.data.sampleTime[COMTRADE.configuration.samples - 1] * Number(cfgArray[COMTRADE.configuration.channels + 8][0])) / (COMTRADE.configuration.samples - 1);
                    COMTRADE.configuration.samplingFrequency = 1000000 / COMTRADE.configuration.samplingTimePeriod;
                }
                COMTRADE.normalise();
                COMTRADE.readDat();
            }
            if(COMTRADE.configuration.dataType === "ASCII"){
                datReader.readAsText(dat);
            }
            if(COMTRADE.configuration.dataType === "BINARY"){
                datReader.readAsArrayBuffer(dat);
            }
        };
        //windows-1251
        cfgReader.readAsText(cfg, encoder);
    }
    write(analogChannels, writeDigital, writeEmpty){
        let canBeSecondary = true;
        for(let i = 0;i < this.configuration.analogChannels;i++){
            if(analogChannels[i]&&(!this.configuration.canBeSecondary[i])){
                canBeSecondary = false;
            }
        }
        this.data.analogData = this.data.analogDataPrimary;
        let toCOMTRADEanalog = function(number){
            let string = Math.abs(number).toString();
            while(string.length < 6){
                string = "0" + string;
            }
            return number >= 0 ? string : "-" + string;
        }
        let digitalChannels = new Array(this.configuration.digitalChannels)
        for(let i = 0;i < digitalChannels.length;i++){
            if(writeDigital){
                if(writeEmpty){
                    digitalChannels[i] = true;
                }
                else{
                    digitalChannels[i] = false;
                    for(let q = 0;q < this.configuration.samples;q++){
                        if(Number(this.data.digitalData[i][q]) === 1){
                            digitalChannels[i] = true;
                            break;
                        }
                    }
                }
            }
            else{
                digitalChannels[i] = false;
            }
        }
        let maxAnalog = new Array(this.configuration.analogChannels);
        let minAnalog = new Array(this.configuration.analogChannels);

        let maxAnalogAbs = new Array(this.configuration.analogChannels);

        let a = new Array(this.configuration.analogChannels);
        let b = new Array(this.configuration.analogChannels);
        a.fill(1);
        b.fill(0);

        maxAnalog.fill(0);
        minAnalog.fill(0);

        maxAnalogAbs.fill(0);

        for(let i = 0;i < this.configuration.analogChannels;i++){
            for(let q = 0;q < this.configuration.samples;q++){
                if(this.data.analogData[i][q] > maxAnalog[i]){
                    maxAnalog[i] = this.data.analogData[i][q];
                }
                if(this.data.analogData[i][q] < minAnalog[i]){
                    minAnalog[i] = this.data.analogData[i][q];
                }
            }
        }
        for(let i = 0;i < this.configuration.analogChannels;i++){
            b[i] = (Math.abs(maxAnalog[i]) - Math.abs(minAnalog[i])) / 2;
            maxAnalogAbs[i] = maxAnalog[i] - b[i];
            a[i] = 1 / (900000 / maxAnalogAbs[i] === Infinity ? 1 : 900000 / maxAnalogAbs[i]);
        }
        let cfgString = "";
        let datString = "";

        let analogChannelsNumber = 0;
        let digitalChannelsNumber = 0;

        for(let i = 0;i < analogChannels.length;i++){
            if(analogChannels[i]){
                analogChannelsNumber++;
            }
        }

        for(let i = 0;i < digitalChannels.length;i++){
            if(digitalChannels[i]){
                digitalChannelsNumber++;
            }
        }

        cfgString += this.configuration.stationName;
        cfgString +=",";
        cfgString += "1";
        cfgString += "\r\n";

        cfgString += analogChannelsNumber + digitalChannelsNumber;
        cfgString += ",";
        cfgString += analogChannelsNumber + "A";
        cfgString += ",";
        cfgString += digitalChannelsNumber + "D";
        cfgString += "\r\n";

        let analogCount = 0;
        for(let i = 0;i < analogChannels.length;i++){
            if(analogChannels[i]){
                analogCount++;
                cfgString += analogCount;
                cfgString += ",";
                cfgString += this.configuration.analogNames[i] + "@[" + this.configuration.analogAnnotation[i] + "]";
                cfgString += ",";
                cfgString += this.configuration.phases[i];
                cfgString += ",";
                cfgString += ",";
                cfgString += this.configuration.units[i]
                cfgString += ",";
                cfgString += a[i];
                cfgString += ",";
                cfgString += b[i];
                cfgString += ",";
                cfgString += "0";
                cfgString += ",";
                cfgString += "-999999";
                cfgString += ",";
                cfgString += "999999";
                if(canBeSecondary){
                    cfgString += ",";
                    cfgString += this.configuration.k1[i];
                    cfgString += ",";
                    cfgString += this.configuration.k2[i];
                    cfgString += ",";
                    cfgString += this.configuration.isPrimary ? "P" : "S";
                }
                cfgString += "\r\n";
            }
        }
        let digitalCount = 0;
        for(let i = 0;i < digitalChannels.length;i++){
            if(digitalChannels[i]){
                digitalCount++;
                cfgString += digitalCount;
                cfgString += ",";
                cfgString += this.configuration.digitalNames[i] + "@[" + this.configuration.digitalAnnotation[i] + "]";
                cfgString += ",";
                cfgString += "0";
                cfgString += "\r\n";
            }
        }
        cfgString += this.configuration.frequency;
        cfgString += "\r\n";

        cfgString += "1";
        cfgString += "\r\n";

        cfgString += this.configuration.samplingFrequency;
        cfgString += ",";
        cfgString += this.configuration.samples;
        cfgString += "\r\n";

        cfgString += this.configuration.startDate;
        cfgString += ",";
        cfgString += this.configuration.startTime;
        cfgString += "\r\n";

        cfgString += this.configuration.circuitDate;
        cfgString += ",";
        cfgString += this.configuration.circuitTime;
        cfgString += "\r\n";

        cfgString += "ASCII";
        for(let i = 0;i < this.configuration.samples;i++){
            datString += this.data.sampleNumber[i];
            datString += ",";
            datString += this.data.sampleTime[i];
            for(let q = 0;q < this.configuration.analogChannels;q++){

                if(analogChannels[q]){
                    datString += ",";
                    datString += isNaN(this.data.analogData[q][i]) ? toCOMTRADEanalog(Math.round((0 - b[q]) / a[q])) : toCOMTRADEanalog(Math.round((this.data.analogData[q][i] - b[q]) / a[q]));
                }
            }
            for(let q = 0;q < this.configuration.digitalChannels;q++){
                if(digitalChannels[q]){
                    datString += ",";
                    datString += isNaN(this.data.digitalData[q][i]) ? 0 : this.data.digitalData[q][i];
                }
            }
            datString += "\r\n";
        }
        const windows1251Map = new Map([
            ['\x00', 0x00], ['\x01', 0x01], ['\x02', 0x02], ['\x03', 0x03],
            ['\x04', 0x04], ['\x05', 0x05], ['\x06', 0x06], ['\x07', 0x07],
            ['\x08', 0x08], ['\x09', 0x09], ['\x0A', 0x0A], ['\x0B', 0x0B],
            ['\x0C', 0x0C], ['\x0D', 0x0D], ['\x0E', 0x0E], ['\x0F', 0x0F],
            ['\x10', 0x10], ['\x11', 0x11], ['\x12', 0x12], ['\x13', 0x13],
            ['\x14', 0x14], ['\x15', 0x15], ['\x16', 0x16], ['\x17', 0x17],
            ['\x18', 0x18], ['\x19', 0x19], ['\x1A', 0x1A], ['\x1B', 0x1B],
            ['\x1C', 0x1C], ['\x1D', 0x1D], ['\x1E', 0x1E], ['\x1F', 0x1F],
            [' ', 0x20],    ['!', 0x21],    ['"', 0x22],    ['#', 0x23],
            ['$', 0x24],    ['%', 0x25],    ['&', 0x26],    ["'", 0x27],
            ['(', 0x28],    [')', 0x29],    ['*', 0x2A],    ['+', 0x2B],
            [',', 0x2C],    ['-', 0x2D],    ['.', 0x2E],    ['/', 0x2F],
            ['0', 0x30],    ['1', 0x31],    ['2', 0x32],    ['3', 0x33],
            ['4', 0x34],    ['5', 0x35],    ['6', 0x36],    ['7', 0x37],
            ['8', 0x38],    ['9', 0x39],    [':', 0x3A],    [';', 0x3B],
            ['<', 0x3C],    ['=', 0x3D],    ['>', 0x3E],    ['?', 0x3F],
            ['@', 0x40],    ['A', 0x41],    ['B', 0x42],    ['C', 0x43],
            ['D', 0x44],    ['E', 0x45],    ['F', 0x46],    ['G', 0x47],
            ['H', 0x48],    ['I', 0x49],    ['J', 0x4A],    ['K', 0x4B],
            ['L', 0x4C],    ['M', 0x4D],    ['N', 0x4E],    ['O', 0x4F],
            ['P', 0x50],    ['Q', 0x51],    ['R', 0x52],    ['S', 0x53],
            ['T', 0x54],    ['U', 0x55],    ['V', 0x56],    ['W', 0x57],
            ['X', 0x58],    ['Y', 0x59],    ['Z', 0x5A],    ['[', 0x5B],
            ['\\', 0x5C],   [']', 0x5D],    ['^', 0x5E],    ['_', 0x5F],
            ['`', 0x60],    ['a', 0x61],    ['b', 0x62],    ['c', 0x63],
            ['d', 0x64],    ['e', 0x65],    ['f', 0x66],    ['g', 0x67],
            ['h', 0x68],    ['i', 0x69],    ['j', 0x6A],    ['k', 0x6B],
            ['l', 0x6C],    ['m', 0x6D],    ['n', 0x6E],    ['o', 0x6F],
            ['p', 0x70],    ['q', 0x71],    ['r', 0x72],    ['s', 0x73],
            ['t', 0x74],    ['u', 0x75],    ['v', 0x76],    ['w', 0x77],
            ['x', 0x78],    ['y', 0x79],    ['z', 0x7A],    ['{', 0x7B],
            ['|', 0x7C],    ['}', 0x7D],    ['~', 0x7E],    ['\x7F', 0x7F],
            ['Ђ', 0x80],    ['Ѓ', 0x81],    ['‚', 0x82],    ['ѓ', 0x83],
            ['„', 0x84],    ['…', 0x85],    ['†', 0x86],    ['‡', 0x87],
            ['€', 0x88],    ['‰', 0x89],    ['Љ', 0x8A],    ['‹', 0x8B],
            ['Њ', 0x8C],    ['Ќ', 0x8D],    ['Ћ', 0x8E],    ['Џ', 0x8F],
            ['ђ', 0x90],    ['‘', 0x91],    ['’', 0x92],    ['“', 0x93],
            ['”', 0x94],    ['•', 0x95],    ['–', 0x96],    ['—', 0x97],
            [' ', 0x98],    ['™', 0x99],    ['љ', 0x9A],    ['›', 0x9B],
            ['њ', 0x9C],    ['ќ', 0x9D],    ['ћ', 0x9E],    ['џ', 0x9F],
            [' ', 0xA0],    ['Ў', 0xA1],    ['ў', 0xA2],    ['Ј', 0xA3],
            ['¤', 0xA4],    ['Ґ', 0xA5],    ['¦', 0xA6],    ['§', 0xA7],
            ['Ё', 0xA8],    ['©', 0xA9],    ['Є', 0xAA],    ['«', 0xAB],
            ['¬', 0xAC],    ['\xAD', 0xAD], ['®', 0xAE],    ['Ї', 0xAF],
            ['°', 0xB0],    ['±', 0xB1],    ['І', 0xB2],    ['і', 0xB3],
            ['ґ', 0xB4],    ['µ', 0xB5],    ['¶', 0xB6],    ['·', 0xB7],
            ['ё', 0xB8],    ['№', 0xB9],    ['є', 0xBA],    ['»', 0xBB],
            ['ј', 0xBC],    ['Ѕ', 0xBD],    ['ѕ', 0xBE],    ['ї', 0xBF],
            ['А', 0xC0],    ['Б', 0xC1],    ['В', 0xC2],    ['Г', 0xC3],
            ['Д', 0xC4],    ['Е', 0xC5],    ['Ж', 0xC6],    ['З', 0xC7],
            ['И', 0xC8],    ['Й', 0xC9],    ['К', 0xCA],    ['Л', 0xCB],
            ['М', 0xCC],    ['Н', 0xCD],    ['О', 0xCE],    ['П', 0xCF],
            ['Р', 0xD0],    ['С', 0xD1],    ['Т', 0xD2],    ['У', 0xD3],
            ['Ф', 0xD4],    ['Х', 0xD5],    ['Ц', 0xD6],    ['Ч', 0xD7],
            ['Ш', 0xD8],    ['Щ', 0xD9],    ['Ъ', 0xDA],    ['Ы', 0xDB],
            ['Ь', 0xDC],    ['Э', 0xDD],    ['Ю', 0xDE],    ['Я', 0xDF],
            ['а', 0xE0],    ['б', 0xE1],    ['в', 0xE2],    ['г', 0xE3],
            ['д', 0xE4],    ['е', 0xE5],    ['ж', 0xE6],    ['з', 0xE7],
            ['и', 0xE8],    ['й', 0xE9],    ['к', 0xEA],    ['л', 0xEB],
            ['м', 0xEC],    ['н', 0xED],    ['о', 0xEE],    ['п', 0xEF],
            ['р', 0xF0],    ['с', 0xF1],    ['т', 0xF2],    ['у', 0xF3],
            ['ф', 0xF4],    ['х', 0xF5],    ['ц', 0xF6],    ['ч', 0xF7],
            ['ш', 0xF8],    ['щ', 0xF9],    ['ъ', 0xFA],    ['ы', 0xFB],
            ['ь', 0xFC],    ['э', 0xFD],    ['ю', 0xFE],    ['я', 0xFF],
        ]);     
        function stringToWindows1251(inputString, map) {
            let encodedBytes = [];
        
            for (let i = 0; i < inputString.length; i++) {
                const char = inputString.charAt(i);
                if (map.has(char)) {
                    const byteValue = map.get(char);
                    encodedBytes.push(byteValue);
                } else {
                    encodedBytes.push(inputString.charCodeAt(i))
                }
            }
        
            return new Uint8Array(encodedBytes);
        }   
        if(!this.configuration.isPrimary){
            this.secondary();
        }
        else{
            this.primary();
        }
        return [new Blob([stringToWindows1251(cfgString, windows1251Map)], { type: 'text/plain' }), new Blob([stringToWindows1251(datString, windows1251Map)], { type: 'text/plain' })]
    }
    secondary(){
        this.data.analogData = this.data.analogDataSecondary;
        this.configuration.isPrimary = false;
    }
    primary(){
        this.data.analogData = this.data.analogDataPrimary;
        this.configuration.isPrimary = true;
    }
    offsetAdditional(timeOffset){
        this.data.analogData = this.data.analogDataPrimary;
        let offset = Math.round(timeOffset / this.configuration.samplingTimePeriod);
        let toCOMTRADEtime = function(time){
            let timeHours = (time - (time % 3600000000)) / 3600000000;
            time = time % 3600000000;
            let timeMinuts = (time - (time % 60000000)) / 60000000;
            time = time % 60000000;
            let timeSeconds = time / 1000000;
            return timeHours + ":" + timeMinuts + ":" + timeSeconds;
        }
        let normaliseTime = function(timeString){
            let timeMs = 0;
            let timeArray = timeString.split(":");
            timeMs += timeArray[0] * 3600000000;
            timeMs += timeArray[1] * 60000000;
            timeMs += timeArray[2] * 1000000;
            return timeMs;
        }
        if(offset > 0){
            for(let i = 0;i < this.configuration.analogChannels;i++){
                if(this.configuration.analogAnnotation[i] === "additional"){
                    this.offsetAnalogChannel(i, offset);
                }
            }
            for(let i = 0;i < this.configuration.digitalChannels;i++){
                if(this.configuration.digitalAnnotation[i] === "additional"){
                    this.offsetDigitalChannel(i, offset);
                }
            }
        }
        if(offset < 0){
            for(let i = 0;i < this.configuration.analogChannels;i++){
                if(this.configuration.analogAnnotation[i] !== "additional"){
                    this.offsetAnalogChannel(i,  Math.abs(offset));
                }
            }
            for(let i = 0;i < this.configuration.digitalChannels;i++){
                if(this.configuration.digitalAnnotation[i] !== "additional"){
                    this.offsetDigitalChannel(i,  Math.abs(offset));
                }
            }
            this.configuration.startTime = toCOMTRADEtime(normaliseTime(this.configuration.startTime) + timeOffset);
        }
        if(!this.configuration.isPrimary){
            this.secondary();
        }
        else{
            this.primary();
        }
        this.normalise();
    }
    combine(COMTRADEAdd, isConsistent, maxDiff){
        this.data.analogData = this.data.analogDataPrimary;
        let normaliseTime = function(timeString){
            let timeMs = 0;
            let timeArray = timeString.split(":");
            timeMs += timeArray[0] * 3600000000;
            timeMs += timeArray[1] * 60000000;
            timeMs += timeArray[2] * 1000000;
            return timeMs;
        }
        let normaliseDate = function(dateString){
            let dateArray = dateString.split("/");
            if(dateArray[2].length === 2){
                dateArray[2] = "20" + dateArray[2];
            }
            return dateArray.join("/");
        }
        let timeOffset = normaliseTime(COMTRADEAdd.configuration.startTime) - normaliseTime(this.configuration.startTime);
        let offset = Math.round(timeOffset / this.configuration.samplingTimePeriod);
        if(isConsistent){
            if(this.configuration.analogChannels !== COMTRADEAdd.configuration.analogChannels||this.configuration.digitalChannels !== COMTRADEAdd.configuration.digitalChannels){
                throw new Error('Files can\'t be consistent');
            }
            if((normaliseDate(this.configuration.startDate) !== normaliseDate(COMTRADEAdd.configuration.startDate))||Math.abs(timeOffset) > maxDiff * 1000000){
                throw new Error('Time diffrence is too big');
            }
            for(let q = 0;q < this.configuration.analogChannels;q++){
                //console.log(Math.round(COMTRADEAdd.data.analogData[q].length * COMTRADEAdd.configuration.analogSamplingTimePeriod[q] / this.configuration.samplingTimePeriod))
                let channelData = new Array(Math.round(COMTRADEAdd.data.analogData[q].length * COMTRADEAdd.configuration.samplingTimePeriod / this.configuration.samplingTimePeriod));
                let channelDataSecondary = new Array(Math.round(COMTRADEAdd.data.analogData[q].length * COMTRADEAdd.configuration.samplingTimePeriod / this.configuration.samplingTimePeriod));
                try{
                    for(let i = 0;i < channelData.length;i++){
                        let index = i / COMTRADEAdd.configuration.samplingTimePeriod * this.configuration.samplingTimePeriod;
                        //console.log(index)
                        let val = 0;
                        let valSec = 0;
                        let roundIndex = Math.round(index);
                        if(index === roundIndex){
                            try{
                                val = COMTRADEAdd.data.analogDataPrimary[q][index];
                                valSec = COMTRADEAdd.data.analogDataSecondary[q][index];
                            }catch{}
                        }else{
                            if(index > roundIndex){
                                try{
                                    val = COMTRADEAdd.data.analogDataPrimary[q][roundIndex] * (1 - (index - roundIndex)) + COMTRADEAdd.data.analogDataPrimary[q][roundIndex + 1] * (index - roundIndex);
                                    valSec = COMTRADEAdd.data.analogDataSecondary[q][roundIndex] * (1 - (index - roundIndex)) + COMTRADEAdd.data.analogDataSecondary[q][roundIndex + 1] * (index - roundIndex);
                                }catch{}
                            }
                            else if(index < roundIndex){
                                try{
                                    val = COMTRADEAdd.data.analogDataPrimary[q][roundIndex] * (1 - (roundIndex - index)) + COMTRADEAdd.data.analogDataPrimary[q][roundIndex - 1] * (roundIndex - index);
                                    valSec = COMTRADEAdd.data.analogDataSecondary[q][roundIndex] * (1 - (roundIndex - index)) + COMTRADEAdd.data.analogDataSecondary[q][roundIndex - 1] * (roundIndex - index);
                                }catch{}
                            }
                        }
                        if(val !== undefined&&valSec !== undefined){
                            channelData[i] = val;
                            channelDataSecondary[i] = valSec;
                        }else{
                            channelData[i] = NaN;
                            channelDataSecondary[i] = NaN;
                        }
                    }
                }catch{

                }
                if(offset >= 0){
                    let resultChannelData = new Array((offset + channelData.length) > this.configuration.samples ? (offset + channelData.length) : this.configuration.samples);
                    resultChannelData.fill(NaN);
                    let resultChannelDataSecondary = new Array((offset + channelData.length) > this.configuration.samples ? (offset + channelData.length) : this.configuration.samples);
                    resultChannelDataSecondary.fill(NaN);
                    for(let i = 0;i < this.data.analogData[q].length;i++){
                        resultChannelData[i] = this.data.analogDataPrimary[q][i];
                        resultChannelDataSecondary[i] = this.data.analogDataSecondary[q][i];
                    }
                    for(let i = 0;i < channelData.length;i++){
                        resultChannelData[i + offset] = channelData[i];
                        resultChannelDataSecondary[i + offset] = channelDataSecondary[i];
                    }
                    this.data.analogData[q] = resultChannelData;
                    this.data.analogDataPrimary[q] = resultChannelData;
                    this.data.analogDataSecondary[q] = resultChannelDataSecondary;
                }
                else {
                    let resultChannelData = new Array((Math.abs(offset) + this.configuration.samples) > channelData.length ? (Math.abs(offset) + this.configuration.samples) : channelData.length);
                    resultChannelData.fill(NaN);
                    let resultChannelDataSecondary = new Array((Math.abs(offset) + this.configuration.samples) > channelData.length ? (Math.abs(offset) + this.configuration.samples) : channelData.length);
                    resultChannelDataSecondary.fill(NaN);
                    for(let i = 0;i < channelData.length;i++){
                        resultChannelData[i] = channelData[i];
                        resultChannelDataSecondary[i] = channelDataSecondary[i];
                    }
                    for(let i = 0;i < this.data.analogData[q].length;i++){
                        resultChannelData[i + Math.abs(offset)] = this.data.analogData[q][i];
                        resultChannelData[i + Math.abs(offset)] = this.data.analogDataPrimary[q][i];
                    }
                    this.data.analogData[q] = resultChannelData;
                    this.data.analogDataPrimary[q] = resultChannelData;
                    this.data.analogDataSecondary[q] = resultChannelDataSecondary;
                }              
            }
            for(let q = 0;q < this.configuration.digitalChannels;q++){
                //console.log(Math.round(COMTRADEAdd.data.analogData[q].length * COMTRADEAdd.configuration.analogSamplingTimePeriod[q] / this.configuration.samplingTimePeriod))
                let channelData = new Array(Math.round(COMTRADEAdd.data.digitalData[q].length * COMTRADEAdd.configuration.samplingTimePeriod / this.configuration.samplingTimePeriod));
                try{
                    for(let i = 0;i < channelData.length;i++){
                        let index = i / COMTRADEAdd.configuration.samplingTimePeriod * this.configuration.samplingTimePeriod;
                        //console.log(index)
                        let val = 0;
                        let roundIndex = Math.round(index);
                        if(index === roundIndex){
                            try{
                                val = COMTRADEAdd.data.digitalData[q][index];
                            }catch{}
                        }else{
                            if(index > roundIndex){
                                try{
                                    val = COMTRADEAdd.data.digitalData[q][roundIndex] * (1 - (index - roundIndex)) + COMTRADEAdd.data.digitalData[q][roundIndex + 1] * (index - roundIndex);
                                }catch{}
                            }
                            else if(index < roundIndex){
                                try{
                                    val = COMTRADEAdd.data.digitalData[q][roundIndex] * (1 - (roundIndex - index)) + COMTRADEAdd.data.digitalData[q][roundIndex - 1] * (roundIndex - index);
                                }catch{}
                            }
                        }
                        if(val !== undefined){
                            channelData[i] = Math.round(val);
                        }else{
                            channelData[i] = NaN;
                        }
                    }
                }catch{

                }
                if(offset >= 0){
                    let resultChannelData = new Array((offset + channelData.length) > this.configuration.samples ? (offset + channelData.length) : this.configuration.samples);
                    resultChannelData.fill(NaN);
                    for(let i = 0;i < this.data.digitalData[q].length;i++){
                        resultChannelData[i] = this.data.digitalData[q][i];
                    }
                    for(let i = 0;i < channelData.length;i++){
                        resultChannelData[i + offset] = channelData[i];
                    }
                    this.data.digitalData[q] = resultChannelData;
                }
                else {
                    let resultChannelData = new Array((Math.abs(offset) + this.configuration.samples) > channelData.length ? (Math.abs(offset) + this.configuration.samples) : channelData.length);
                    resultChannelData.fill(NaN);
                    for(let i = 0;i < channelData.length;i++){
                        resultChannelData[i] = channelData[i];
                    }
                    for(let i = 0;i < this.data.digitalData[q].length;i++){
                        resultChannelData[i + Math.abs(offset)] = this.data.digitalData[q][i];
                    }
                    this.data.digitalData[q] = resultChannelData;
                }              
            }
        }
        else {
            if((normaliseDate(this.configuration.startDate) !== normaliseDate(COMTRADEAdd.configuration.startDate))||Math.abs(timeOffset) > maxDiff * 1000000){
                offset = 0;
            }
            for(let q = 0;q < this.configuration.analogChannels;q++){
                if(this.configuration.analogAnnotation[q] === "additional"){
                    this.configuration.analogAnnotation[q] = "original";
                }
            }
            for(let q = 0;q < this.configuration.digitalChannels;q++){
                if(this.configuration.digitalAnnotation[q] === "additional"){
                    this.configuration.digitalAnnotation[q] = "original";
                }
            }
            let currentAnalogChannels = this.configuration.analogChannels;
            let currentDigitalChannels = this.configuration.digitalChannels;
            for(let q = 0;q < COMTRADEAdd.configuration.analogChannels;q++){
                //console.log(Math.round(COMTRADEAdd.data.analogData[q].length * COMTRADEAdd.configuration.analogSamplingTimePeriod[q] / this.configuration.samplingTimePeriod))
                let channelData = new Array(Math.round(COMTRADEAdd.data.analogData[q].length * COMTRADEAdd.configuration.samplingTimePeriod / this.configuration.samplingTimePeriod));
                let channelDataSecondary = new Array(Math.round(COMTRADEAdd.data.analogData[q].length * COMTRADEAdd.configuration.samplingTimePeriod / this.configuration.samplingTimePeriod));
                try{
                    for(let i = 0;i < channelData.length;i++){
                        let index = i / COMTRADEAdd.configuration.samplingTimePeriod * this.configuration.samplingTimePeriod;
                        //console.log(index)
                        let val = 0;
                        let valSec = 0;
                        let roundIndex = Math.round(index);
                        if(index === roundIndex){
                            try{
                                val = COMTRADEAdd.data.analogDataPrimary[q][index];
                                valSec = COMTRADEAdd.data.analogDataSecondary[q][index];
                            }catch{}
                        }else{
                            if(index > roundIndex){
                                try{
                                    val = COMTRADEAdd.data.analogDataPrimary[q][roundIndex] * (1 - (index - roundIndex)) + COMTRADEAdd.data.analogDataPrimary[q][roundIndex + 1] * (index - roundIndex);
                                    valSec = COMTRADEAdd.data.analogDataSecondary[q][roundIndex] * (1 - (index - roundIndex)) + COMTRADEAdd.data.analogDataSecondary[q][roundIndex + 1] * (index - roundIndex);
                                }catch{}
                            }
                            else if(index < roundIndex){
                                try{
                                    val = COMTRADEAdd.data.analogDataPrimary[q][roundIndex] * (1 - (roundIndex - index)) + COMTRADEAdd.data.analogDataPrimary[q][roundIndex - 1] * (roundIndex - index);
                                    valSec = COMTRADEAdd.data.analogDataSecondary[q][roundIndex] * (1 - (roundIndex - index)) + COMTRADEAdd.data.analogDataSecondary[q][roundIndex - 1] * (roundIndex - index);
                                }catch{}
                            }
                        }
                        if(val !== undefined&&valSec !== undefined){
                            channelData[i] = val;
                            channelDataSecondary[i] = valSec;
                        }else{
                            channelData[i] = NaN;
                            channelDataSecondary[i] = NaN;
                        }
                    }
                }catch{

                }
                if(COMTRADEAdd.configuration.canBeSecondary[q] === true){
                    this.addAnalogChannelWithIndex_Secondary(channelData, channelDataSecondary, COMTRADEAdd.configuration.k1[q], COMTRADEAdd.configuration.k2[q], COMTRADEAdd.configuration.analogNumbers[q], COMTRADEAdd.configuration.analogNames[q], COMTRADEAdd.configuration.phases[q], COMTRADEAdd.configuration.units[q], "additional", this.configuration.analogChannels);
                }
                else if(COMTRADEAdd.configuration.canBeSecondary[q] === false){
                    this.addAnalogChannelWithIndex(channelData, COMTRADEAdd.configuration.analogNumbers[q], COMTRADEAdd.configuration.analogNames[q], COMTRADEAdd.configuration.phases[q], COMTRADEAdd.configuration.units[q], "additional", this.configuration.analogChannels);
                }
            }
            for(let q = 0;q < COMTRADEAdd.configuration.digitalChannels;q++){
                //console.log(Math.round(COMTRADEAdd.data.analogData[q].length * COMTRADEAdd.configuration.analogSamplingTimePeriod[q] / this.configuration.samplingTimePeriod))
                let channelData = new Array(Math.round(COMTRADEAdd.data.digitalData[q].length * COMTRADEAdd.configuration.samplingTimePeriod / this.configuration.samplingTimePeriod));
                try{
                    for(let i = 0;i < channelData.length;i++){
                        let index = i / COMTRADEAdd.configuration.samplingTimePeriod * this.configuration.samplingTimePeriod;
                        //console.log(index)
                        let val = 0;
                        let roundIndex = Math.round(index);
                        if(index === roundIndex){
                            try{
                                val = COMTRADEAdd.data.digitalData[q][index];
                            }catch{}
                        }else{
                            if(index > roundIndex){
                                try{
                                    val = COMTRADEAdd.data.digitalData[q][roundIndex] * (1 - (index - roundIndex)) + COMTRADEAdd.data.digitalData[q][roundIndex + 1] * (index - roundIndex);
                                }catch{}
                            }
                            else if(index < roundIndex){
                                try{
                                    val = COMTRADEAdd.data.digitalData[q][roundIndex] * (1 - (roundIndex - index)) + COMTRADEAdd.data.digitalData[q][roundIndex - 1] * (roundIndex - index);
                                }catch{}
                            }
                        }
                        if(val !== undefined){
                            channelData[i] = Math.round(val);
                        }else{
                            channelData[i] = NaN;
                        }
                    }
                }catch{

                }
                this.addDigitalChannelWithIndex(channelData, COMTRADEAdd.configuration.digitalNumbers[q], COMTRADEAdd.configuration.digitalNames[q], "additional", this.configuration.digitalChannels);                        
            }
            if(offset > 0){
                for(let i = currentAnalogChannels;i < this.configuration.analogChannels;i++){
                    this.offsetAnalogChannel(i, offset);
                }
                for(let i = currentDigitalChannels;i < this.configuration.digitalChannels;i++){
                    this.offsetDigitalChannel(i, offset);
                }
            }
            if(offset < 0){
                for(let i = 0;i < currentAnalogChannels;i++){
                    this.offsetAnalogChannel(i, Math.abs(offset));
                }
                for(let i = 0;i < currentDigitalChannels;i++){
                    this.offsetDigitalChannel(i, Math.abs(offset));
                }
            }
        }
        if(offset !== 0){
            this.configuration.startTime = offset > 0 ? this.configuration.startTime : COMTRADEAdd.configuration.startTime;
        }
        if(!this.configuration.isPrimary){
            this.secondary();
        }
        else{
            this.primary();
        }
        this.normalise();
    }
    normalise(){
        this.data.analogData = this.data.analogDataPrimary;
        let toCOMTRADEtime = function(time){
            let timeHours = (time - (time % 3600000000)) / 3600000000;
            time = time % 3600000000;
            let timeMinuts = (time - (time % 60000000)) / 60000000;
            time = time % 60000000;
            let timeSeconds = (time / 1000000).toFixed(6);
            return timeHours + ":" + timeMinuts + ":" + timeSeconds;
        }
        let normaliseTime = function(timeString){
            let timeMs = 0;
            let timeArray = timeString.split(":");
            timeMs += timeArray[0] * 3600000000;
            timeMs += timeArray[1] * 60000000;
            timeMs += timeArray[2] * 1000000;
            return timeMs;
        }
        let maxLength = 0;
        for(let i = 0;i < this.data.analogData.length;i++){
            if(this.data.analogData[i].length > maxLength){
                maxLength = this.data.analogData[i].length;
            }
        }
        for(let i = 0;i < this.data.digitalData.length;i++){
            if(this.data.digitalData[i].length > maxLength){
                maxLength = this.data.digitalData[i].length;
            }
        }
        for(let i = 0;i < this.data.analogData.length;i++){
            if(this.data.analogData[i].length < maxLength){
                this.extendAnalogChannel(i, maxLength - this.data.analogData[i].length);
            }
        }
        for(let i = 0;i < this.data.digitalData.length;i++){
            if(this.data.digitalData[i].length < maxLength){
                this.extendDigitalChannel(i, maxLength - this.data.digitalData[i].length);
            }
        }

        let cutLengthLeft = this.configuration.samples;
        let cutLengthRight = this.configuration.samples;
        for(let i = 0;i < this.data.analogData.length;i++){
            for(let q = 0;q < this.data.analogData[i].length;q++){
                if(!isNaN(this.data.analogData[i][q])){
                    if(q < cutLengthLeft){
                        cutLengthLeft = q;
                    }
                    if(this.data.analogData[i].length - q < cutLengthRight){
                        cutLengthRight = this.data.analogData[i].length - q;
                    }
                }
                if(cutLengthLeft === 0&&cutLengthRight === 0){
                    break;
                }
            }
            if(cutLengthLeft === 0&&cutLengthRight === 0){
                break;
            }
        }
        for(let i = 0;i < this.data.digitalData.length;i++){
            for(let q = 0;q < this.data.digitalData[i].length;q++){
                if(!isNaN(this.data.digitalData[i][q])){
                    if(q < cutLengthLeft){
                        cutLengthLeft = q;
                    }
                    if(this.data.digitalData[i].length - q < cutLengthRight){
                        cutLengthRight = this.data.digitalData[i].length - q;
                    }
                }
                if(cutLengthLeft === 0&&cutLengthRight === 0){
                    break;
                }
            }
            if(cutLengthLeft === 0&&cutLengthRight === 0){
                break;
            }
        }
        for(let i = 0;i < this.data.analogData.length;i++){
            this.cutAnalogChannel(cutLengthLeft, cutLengthRight, i);
        }
        for(let i = 0;i < this.data.digitalData.length;i++){
            this.cutDigitalChannel(cutLengthLeft, cutLengthRight, i);
        }
        this.configuration.samples = this.data.analogData[0].length;

        this.configuration.startTime = toCOMTRADEtime(normaliseTime(this.configuration.startTime) + cutLengthLeft * this.configuration.samplingTimePeriod);

        this.data.sampleTime = new Array(this.configuration.samples);
        this.data.sampleNumber = new Array(this.configuration.samples);
        for(let i = 0;i < this.configuration.samples;i++){
            this.data.sampleTime[i] = Math.round(i * this.configuration.samplingTimePeriod);
            this.data.sampleNumber[i] = i + 1;
        }
        if(!this.configuration.isPrimary){
            this.secondary();
        }
    }
    cutAnalogChannel(cutLeft, cutRight, index){
        let result = new Array(this.data.analogData[index].length - cutLeft - cutRight);
        let resultSec = new Array(this.data.analogData[index].length - cutLeft - cutRight);
        for(let i = 0;i < result.length;i++){
            result[i] = this.data.analogDataPrimary[index][i + cutLeft];
            resultSec[i] = this.data.analogDataSecondary[index][i + cutLeft];
        }
        this.data.analogDataPrimary[index] = result;
        this.data.analogDataSecondary[index] = resultSec;
    }
    cutDigitalChannel(cutLeft, cutRight, index){
        let result = new Array(this.data.digitalData[index].length - cutLeft - cutRight)
        for(let i = 0;i < result.length;i++){
            result[i] = this.data.digitalData[index][i + cutLeft];
        }
        this.data.digitalData[index] = result;
    }
    offsetAnalogChannel(index, offset){
        if(offset > 0){
            let result = new Array(this.data.analogData[index].length + offset);
            let resultSec = new Array(this.data.analogData[index].length + offset);
            result.fill(NaN);
            resultSec.fill(NaN);
            for(let i = 0;i < this.data.analogData[index].length; i++){
                result[i + offset] = this.data.analogDataPrimary[index][i];
                resultSec[i + offset] = this.data.analogDataSecondary[index][i];
            }
            this.data.analogDataPrimary[index] = result;
            this.data.analogDataSecondary[index] = resultSec;
        }
    }
    offsetDigitalChannel(index, offset){
        if(offset > 0){
            let result = new Array(this.data.digitalData[index].length + offset);
            result.fill(NaN);
            for(let i = 0;i < this.data.digitalData[index].length; i++){
                result[i + offset] = this.data.digitalData[index][i];
            }
            this.data.digitalData[index] = result;
        }
    }
    extendAnalogChannel(index, offset){
        if(offset > 0){
            let result = new Array(this.data.analogData[index].length + offset);
            let resultSec = new Array(this.data.analogData[index].length + offset);
            result.fill(NaN);
            resultSec.fill(NaN);
            for(let i = 0;i < this.data.analogData[index].length; i++){
                result[i] = this.data.analogDataPrimary[index][i];
                resultSec[i] = this.data.analogDataSecondary[index][i];
            }
            this.data.analogDataPrimary[index] = result;
            this.data.analogDataSecondary[index] = resultSec;
        }
    }
    extendDigitalChannel(index, offset){
        if(offset > 0){
            let result = new Array(this.data.digitalData[index].length + offset);
            result.fill(NaN);
            for(let i = 0;i < this.data.digitalData[index].length; i++){
                result[i] = this.data.digitalData[index][i];
            }
            this.data.digitalData[index] = result;
        }
    }
    getPointCalculations(analogChannelIndex, timeIndex, baseAngle, isBase, restoreChannelsType){
        let COMTRADE = this;
        let pointData = new COMTRADEPointData();
        pointData.Name = COMTRADE.configuration.analogNames[analogChannelIndex];
        pointData.Units = COMTRADE.configuration.units[analogChannelIndex];
        pointData.Phase = COMTRADE.configuration.phases[analogChannelIndex];
        pointData.Number = COMTRADE.configuration.analogNumbers[analogChannelIndex];
        pointData.valArray = COMTRADE.data.analogData[analogChannelIndex];
        let twoDimensionArray = function(a, b) {
            let arr = [];
        
        
            for (let i = 0; i< a; i++) {
                for(let j = 0; j< b; j++) {
                    arr[i] = [];
                }
            }
        
        
            for (let i = 0; i< a; i++) {
                for(let j = 0; j< b; j++) {
                    arr[i][j] = "";
                }
            }
            return arr;
        }
        let sum = function(array){
            let result = 0;
            for (let i = 0;i < array.length;i++){
                result += Number(array[i]);
            }
            return result;
        }
        try{
            let number = Math.round(COMTRADE.configuration.samplingFrequency / COMTRADE.configuration.frequency);
            let valArray = new Array(number);
            let degArray = new Array(number);
    
            let garmonicNumber = 10;
    
            let relSum = 0;
            let imgSum = 0;
    
            let a0 = 0;
    
            let aCent = 0;
    
            let f = 0;
            let aArray = new Array(garmonicNumber);
    
            let relArray = twoDimensionArray(garmonicNumber, number);
            let imgArray = twoDimensionArray(garmonicNumber, number);
    
    
            let adArray = new Array(garmonicNumber);
    
            for (let q = 0; q < garmonicNumber; q++) {
                relArray[q] = new Array(number);
                imgArray[q] = new Array(number);
            }
            let amplitude = 0;
            let isSinusoidal = false;
            for (let q = 0; q < number; q++) {
                valArray[q] = COMTRADE.data.analogData[analogChannelIndex][timeIndex + q];
                degArray[q] = (q + 0.5) * 2 * Math.PI / number;
                if(Math.abs(valArray[q]) > amplitude){
                    amplitude = Math.abs(valArray[q]);
                }
                if(valArray[q] < 0){
                    isSinusoidal = true;
                }
                for (let j = 1; j <= garmonicNumber; j++) {
                    relArray[j - 1][q] = valArray[q] * Math.cos(degArray[q] * j);
                    imgArray[j - 1][q] = valArray[q] * Math.sin(degArray[q] * j);
                }
            }

            pointData.isSinusoidal = isSinusoidal;
    
            a0 = sum(valArray) / number;
    
            relSum = 2 * sum(relArray[0]) / number;
            imgSum = 2 * sum(imgArray[0]) / number;
    
            f = Math.atan2(relSum, imgSum);
    
            for (let q = 0; q < garmonicNumber; q++) {
                relSum = 2 * sum(relArray[q]) / number;
                imgSum = 2 * sum(imgArray[q]) / number;
    
                aArray[q] = Math.sqrt((relSum * relSum) + (imgSum * imgSum));
                adArray[q] = aArray[q] / Math.sqrt(2);
            }
                
    
            aCent += a0;
    
            for (let q = 0; q < garmonicNumber; q++) {
                aCent += adArray[q] * adArray[q];
            }
            aCent = Math.sqrt(aCent);
    
            let iRestoreVal1 = 0;
            let iRestoreVal2 = 0;
    
            let zeroDetector = valArray[0] > 0;
    
            let iRestoreStartPoint = 0;
            //valArray[q] > 0 !== zeroDetector
            if(restoreChannelsType === "MP"||restoreChannelsType === "AMP"){
                for(let q = 0;q < valArray.length;q++){
                    if(valArray[q] > 0 !== zeroDetector){
                        iRestoreStartPoint = q;
        
                        iRestoreVal1 = valArray[q - 1];
                        iRestoreVal2 = valArray[q];
                        break;
                    }
                }
            }
            else if(restoreChannelsType === "PP"){
                iRestoreStartPoint = 0;
                iRestoreVal1 = valArray[0];
                iRestoreVal2 = valArray[1];
            }
            
            let iRestoreF = -Math.atan(1 / ((Math.cos(2 * Math.PI / number) - iRestoreVal2 / iRestoreVal1) / Math.sin(2 * Math.PI / number)));
            let iRestoreA;
            if(restoreChannelsType === "AMP"){
                iRestoreA = (iRestoreVal1 / Math.sin(iRestoreF)) > 0 ? amplitude : -amplitude;
            }
            else{
                iRestoreA = (iRestoreVal1 / Math.sin(iRestoreF));
            } 

            pointData.instVal = Number((valArray[0])).toFixed(4);
            pointData.ampVal = Number(amplitude).toFixed(4);
            if(isBase){
                pointData.angle = 0;
                pointData.baseAngle = Number(f * 180 / Math.PI);
            }else{
                pointData.angle = Number((f * 180 / Math.PI) - baseAngle).toFixed(2);
                pointData.baseAngle = baseAngle;
            }
            pointData.f = f;
            pointData.RMS = Number(aCent).toFixed(2);
            pointData.RMS1 = Number(adArray[0]).toFixed(2);
            pointData.RMS2 = Number(adArray[1] / adArray[0] * 100).toFixed(2);
            pointData.RMS3 = Number(adArray[2] / adArray[0] * 100).toFixed(2);
            pointData.RMS5 = Number(adArray[4] / adArray[0] * 100).toFixed(2);
            pointData.ValRestore = Number(iRestoreA);
            pointData.RMSRestore = Math.abs(Number((iRestoreA) / Math.sqrt(2)).toFixed(2));
            pointData.AngleRestore = Number(iRestoreF);
            pointData.RestoreStartPoint = iRestoreStartPoint;
            
        }catch{
        }
        return pointData;
    }
    addAnalogChannel(channelArray, number, name, phase, unit, annotation){
        this.configuration.analogChannels++;
        this.configuration.channels++;
        this.data.analogDataPrimary.splice(0, 0, channelArray);
        this.data.analogDataSecondary.splice(0, 0, channelArray);
        this.configuration.analogNumbers.splice(0, 0, number);
        this.configuration.canBeSecondary.splice(0, 0, false);
        this.configuration.analogNames.splice(0, 0, name);
        this.configuration.phases.splice(0, 0, phase);
        this.configuration.units.splice(0, 0, unit);
        this.configuration.k1.splice(0, 0, 1);
        this.configuration.k2.splice(0, 0, 1);
        this.configuration.analogAnnotation.splice(0, 0, annotation);
    }
    addAnalogChannelWithIndex(channelArray, number, name, phase, unit, annotation, index){
        this.configuration.analogChannels++;
        this.configuration.channels++;
        this.data.analogDataPrimary.splice(index, 0, channelArray);
        this.data.analogDataSecondary.splice(index, 0, channelArray);
        this.configuration.analogNumbers.splice(index, 0, number);
        this.configuration.canBeSecondary.splice(index, 0, false);
        this.configuration.analogNames.splice(index, 0, name);
        this.configuration.phases.splice(index, 0, phase);
        this.configuration.units.splice(index, 0, unit);
        this.configuration.k1.splice(index, 0, 1);
        this.configuration.k2.splice(index, 0, 1);
        this.configuration.analogAnnotation.splice(index, 0, annotation);
    }
    addAnalogChannel_Secondary(channelArrayPrimary, channelArraySecondary, k1, k2, number, name, phase, unit, annotation){
        this.configuration.analogChannels++;
        this.configuration.channels++;
        this.data.analogDataPrimary.splice(0, 0, channelArrayPrimary);
        this.data.analogDataSecondary.splice(0, 0, channelArraySecondary);
        this.configuration.analogNumbers.splice(0, 0, number);
        this.configuration.canBeSecondary.splice(0, 0, true);
        this.configuration.analogNames.splice(0, 0, name);
        this.configuration.phases.splice(0, 0, phase);
        this.configuration.units.splice(0, 0, unit);
        this.configuration.k1.splice(0, 0, k1);
        this.configuration.k2.splice(0, 0, k2);
        this.configuration.analogAnnotation.splice(0, 0, annotation);
    }
    addAnalogChannelWithIndex_Secondary(channelArrayPrimary, channelArraySecondary, k1, k2, number, name, phase, unit, annotation, index){
        this.configuration.analogChannels++;
        this.configuration.channels++;
        this.data.analogDataPrimary.splice(index, 0, channelArrayPrimary);
        this.data.analogDataSecondary.splice(index, 0, channelArraySecondary);
        this.configuration.analogNumbers.splice(index, 0, number);
        this.configuration.canBeSecondary.splice(index, 0, true);
        this.configuration.analogNames.splice(index, 0, name);
        this.configuration.phases.splice(index, 0, phase);
        this.configuration.units.splice(index, 0, unit);
        this.configuration.k1.splice(index, 0, k1);
        this.configuration.k2.splice(index, 0, k2);
        this.configuration.analogAnnotation.splice(index, 0, annotation);
    }
    addDigitalChannel(channelArray, number, name, annotation){
        this.configuration.digitalChannels++;
        this.configuration.channels++;
        this.data.digitalData.splice(0, 0, channelArray);
        this.configuration.digitalNumbers.splice(0, 0, number);
        this.configuration.digitalNames.splice(0, 0, name);
        this.configuration.digitalAnnotation.splice(0, 0, annotation);
    }
    addDigitalChannelWithIndex(channelArray, number, name, annotation, index){
        this.configuration.digitalChannels++;
        this.configuration.channels++;
        this.data.digitalData.splice(index, 0, channelArray);
        this.configuration.digitalNumbers.splice(index, 0, number);
        this.configuration.digitalNames.splice(index, 0, name);
        this.configuration.digitalAnnotation.splice(index, 0, annotation);
    }
    removeAnalogChannel(index){
        this.configuration.analogChannels--;
        this.configuration.channels--;
        this.data.analogDataPrimary.splice(index, 1);
        this.data.analogDataSecondary.splice(index, 1);
        this.configuration.analogNumbers.splice(index, 1);
        this.configuration.canBeSecondary.splice(index, 1);
        this.configuration.analogNames.splice(index, 1);
        this.configuration.phases.splice(index, 1);
        this.configuration.units.splice(index, 1);
        this.configuration.k1.splice(index, 1);
        this.configuration.k2.splice(index, 1);
        this.configuration.analogAnnotation.splice(index, 1);
    }
    static changeSampleFrequency(channelArray, fromTimePeriod, toTimePeriod){
        let result = new Array(Math.round(channelArray.length * fromTimePeriod / toTimePeriod));

        for(let i = 0;i < result.length;i++){
            let index = i / fromTimePeriod * toTimePeriod;
            let val = 0;
            let roundIndex = Math.round(index);
            if(index === roundIndex){
                try{
                    val = channelArray[index];
                }catch{}
            }else{
                if(index > roundIndex){
                    try{
                        val = channelArray[roundIndex] * (1 - (index - roundIndex)) + channelArray[roundIndex + 1] * (index - roundIndex);
                    }catch{}
                }
                else if(index < roundIndex){
                    try{
                        val = channelArray[roundIndex] * (1 - (roundIndex - index)) + channelArray[roundIndex - 1] * (roundIndex - index);
                    }catch{}
                }
            }
            if(val !== undefined){
                result[i] = val;
            }else{
                result[i] = 0;
            }
        }
        
        return result;
    }
    static frequencyAnalogChannel(channelArray, timePeriod, baseFrequency){
        if(!baseFrequency){
            baseFrequency = 50;
        }
        let result = new Array(channelArray.length);
        result.fill(NaN);

        let max = 0;
        for (let q = 0; q < channelArray.length; q++) {
            if (Math.abs(channelArray[q]) > max) {
                max = Math.abs(channelArray[q]);
            }
        }

        try{
            for(let i = 0;i < result.length;i++){
                let zeroTime1 = 0;
                let zeroTime2 = 0;
                let zeroDetector = channelArray[i] >= 0;
                let q = 0;

                let isNotNoise = false;
                while(i + q < channelArray.length){
                    if(Math.abs(channelArray[i + q]) > max / 100 * 2){
                        isNotNoise = true;
                    }
                    if((channelArray[i + q] >= 0) !== zeroDetector){
                        break;
                    }
                    q++;
                }
                if(i + q >= channelArray.length){
                    break;
                }
                let plusTime = 0;
                if(Math.abs(channelArray[i + q]) > 0){
                    let distance = Math.abs(channelArray[i + q - 1] - channelArray[i + q]);
                    plusTime = timePeriod / (distance / Math.abs(channelArray[i + q]));
                }
                zeroTime1 = q * timePeriod - plusTime;

                
                zeroDetector = channelArray[i + q] >= 0;
                while(i + q < channelArray.length){
                    if(Math.abs(channelArray[i + q]) > max / 100 * 2){
                        isNotNoise = true;
                    }
                    if((channelArray[i + q] >= 0) !== zeroDetector){
                        break;
                    }
                    q++;
                }
                if(i + q >= channelArray.length){
                    break;
                }
                plusTime = 0;
                if(Math.abs(channelArray[i + q]) > 0){
                    let distance = Math.abs(channelArray[i + q - 1] - channelArray[i + q]);
                    plusTime = timePeriod / (distance / Math.abs(channelArray[i + q]));
                }
                zeroTime2 = q * timePeriod - plusTime;
                if(isNotNoise === false){
                    result[i] = 0;
                    continue;
                }
                result[i] = 1000000 / (zeroTime2 - zeroTime1) / 2;
                if(result[i] === Infinity){
                    result[i] = NaN;
                }
                if(result[i] > baseFrequency * 2||result[i] < 0){
                    result[i] = 0;
                }
            }
        }catch{}

        return result;
        //this.addAnalogChannel(result, "", name, "", "Hz", "calculation", index);
    }
    static dF_dt(channel, samplesPerPeriod){
        let result = new Array(channel.length);
        result.fill(0);
        for(let i = 0;i < result.length - 1;i++){
            result[i] = Math.abs(channel[i + 1] - channel[i]) / Math.abs((i * samplesPerPeriod / 1000000) - ((i + 1) * samplesPerPeriod / 1000000));
        }
        return result;
    }
    static zeroSequenceAnalogChannel(channelArrayA, channelArrayB, channelArrayC){
        let result = new Array(channelArrayA.length);
        for(let i = 0;i < result.length;i++){
            result[i] = channelArrayA[i] + channelArrayB[i] + channelArrayC[i];
        }
        return result;
        /*let resultTimePeriod = COMTRADE1.configuration.samplingTimePeriod;
        let resultSampleFrequency = COMTRADE1.configuration.samplingFrequency;
        let resultFrequensy = COMTRADE1.configuration.frequency;

        let array1;
        let array2;
        let array3;
        try{
            array1 = COMTRADE1.data.analogData[channelIndex1];
        }catch{}
        try{
            array2 = COMTRADE2.data.analogData[channelIndex2];
        }catch{}
        try{
            array3 = COMTRADE3.data.analogData[channelIndex3];
        }catch{}
        
        let maxLength = 0;
        try{
            if(maxLength < Math.round((offset1 + COMTRADE1.data.analogData[channelIndex1].length)* COMTRADE1.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset1 + COMTRADE1.data.analogData[channelIndex1].length)* COMTRADE1.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}
        try{
            if(maxLength < Math.round((offset2 + COMTRADE2.data.analogData[channelIndex2].length)* COMTRADE2.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset2 + COMTRADE2.data.analogData[channelIndex2].length)* COMTRADE2.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}
        try{
            if(maxLength < Math.round((offset3 + COMTRADE3.data.analogData[channelIndex3].length)* COMTRADE3.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset3 + COMTRADE3.data.analogData[channelIndex3].length)* COMTRADE3.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}

        let result = new Array(maxLength);
        result.fill(0);
        let CHANNELA = new Array(maxLength);
        CHANNELA.fill(0);
        let CHANNELB = new Array(maxLength);
        CHANNELB.fill(0);
        let CHANNELC = new Array(maxLength);
        CHANNELC.fill(0);
        try {
            for(let i = 0;i < CHANNELA.length;i++){
                let index = i / COMTRADE1.configuration.samplingTimePeriod * resultTimePeriod - offset1;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array1[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array1[roundIndex] * (1 - (index - roundIndex)) + array1[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array1[roundIndex] * (1 - (roundIndex - index)) + array1[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELA[i] = val;
                }else{
                    CHANNELA[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < CHANNELB.length;i++){
                let index = i / COMTRADE2.configuration.samplingTimePeriod * resultTimePeriod - offset2;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array2[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array2[roundIndex] * (1 - (index - roundIndex)) + array2[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array2[roundIndex] * (1 - (roundIndex - index)) + array2[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELB[i] = val;
                }else{
                    CHANNELB[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < CHANNELC.length;i++){
                let index = i / COMTRADE3.configuration.samplingTimePeriod * resultTimePeriod - offset3;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array3[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array3[roundIndex] * (1 - (index - roundIndex)) + array3[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array3[roundIndex] * (1 - (roundIndex - index)) + array3[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELC[i] = val;
                }else{
                    CHANNELC[i] = 0;
                }
            }
        } catch {}
        for(let i = 0;i < result.length;i++){
            result[i] = CHANNELA[i] + CHANNELB[i] + CHANNELC[i];
        }
        let index = 0;
        if(COMTRADE1 === COMTRADE2&&COMTRADE2 === COMTRADE3&&COMTRADE1 === this){
            index = channelIndex3 + 1;
        }
        else{
            index = this.configuration.analogChannels;
        }
        this.addAnalogChannel(result, "", name, "", COMTRADE1.configuration.units[channelIndex1], "calculation", index);
    */
    }
    static positiveSequenceAnalogChannel(channelArrayA, channelArrayB, channelArrayC, samplesPerPeriod){
        let angleToSamples = function(angle){
            return Math.round(samplesPerPeriod * (angle / 360));
        }
        let result = new Array(channelArrayA.length);
        for(let i = 0;i < result.length;i++){
            result[i] = (channelArrayA[i] + channelArrayB[i + angleToSamples(120)] + channelArrayC[i + angleToSamples(240)]) / 3;
        }
        return result;
    }
    static negativeSequenceAnalogChannel(channelArrayA, channelArrayB, channelArrayC, samplesPerPeriod){
        let angleToSamples = function(angle){
            return Math.round(samplesPerPeriod * (angle / 360));
        }
        let result = new Array(channelArrayA.length);
        for(let i = 0;i < result.length;i++){
            result[i] = (channelArrayA[i] + channelArrayB[i + angleToSamples(240)] + channelArrayC[i + angleToSamples(120)]) / 3;
        }
        return result;
    }
    //addPositiveSequenceAnalogChannel(COMTRADE1, channelIndex1, offset1, COMTRADE2, channelIndex2, offset2, COMTRADE3, channelIndex3, offset3, name){
        /*
        let resultTimePeriod = COMTRADE1.configuration.samplingTimePeriod;
        let resultSampleFrequency = COMTRADE1.configuration.samplingFrequency;
        let resultFrequensy = COMTRADE1.configuration.frequency;

        let array1;
        let array2;
        let array3;
        try{
            array1 = COMTRADE1.data.analogData[channelIndex1];
        }catch{}
        try{
            array2 = COMTRADE2.data.analogData[channelIndex2];
        }catch{}
        try{
            array3 = COMTRADE3.data.analogData[channelIndex3];
        }catch{}
        
        let maxLength = 0;
        try{
            if(maxLength < Math.round((offset1 + COMTRADE1.data.analogData[channelIndex1].length)* COMTRADE1.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset1 + COMTRADE1.data.analogData[channelIndex1].length)* COMTRADE1.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}
        try{
            if(maxLength < Math.round((offset2 + COMTRADE2.data.analogData[channelIndex2].length)* COMTRADE2.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset2 + COMTRADE2.data.analogData[channelIndex2].length)* COMTRADE2.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}
        try{
            if(maxLength < Math.round((offset3 + COMTRADE3.data.analogData[channelIndex3].length)* COMTRADE3.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset3 + COMTRADE3.data.analogData[channelIndex3].length)* COMTRADE3.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}

        let result = new Array(maxLength);
        result.fill(0);
        let CHANNELA = new Array(maxLength);
        CHANNELA.fill(0);
        let CHANNELB = new Array(maxLength);
        CHANNELB.fill(0);
        let CHANNELC = new Array(maxLength);
        CHANNELC.fill(0);
        try {
            for(let i = 0;i < CHANNELA.length;i++){
                let index = i / COMTRADE1.configuration.samplingTimePeriod * resultTimePeriod - offset1;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array1[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array1[roundIndex] * (1 - (index - roundIndex)) + array1[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array1[roundIndex] * (1 - (roundIndex - index)) + array1[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELA[i] = val;
                }else{
                    CHANNELA[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < CHANNELB.length;i++){
                let index = i / COMTRADE2.configuration.samplingTimePeriod * resultTimePeriod - offset2;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array2[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array2[roundIndex] * (1 - (index - roundIndex)) + array2[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array2[roundIndex] * (1 - (roundIndex - index)) + array2[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELB[i] = val;
                }else{
                    CHANNELB[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < CHANNELC.length;i++){
                let index = i / COMTRADE3.configuration.samplingTimePeriod * resultTimePeriod - offset3;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array3[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array3[roundIndex] * (1 - (index - roundIndex)) + array3[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array3[roundIndex] * (1 - (roundIndex - index)) + array3[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELC[i] = val;
                }else{
                    CHANNELC[i] = 0;
                }
            }
        } catch {}
        
        let DEGTOSAMP = function(angle){
            return Math.round((resultSampleFrequency / resultFrequensy) / (360 / angle));
        }
        for(let i = 0;i < result.length;i++){
            result[i] = (CHANNELA[i] + CHANNELB[i + DEGTOSAMP(120)] + CHANNELC[i + DEGTOSAMP(240)]) / 3;
        }
        let index = 0;
        if(COMTRADE1 === COMTRADE2&&COMTRADE2 === COMTRADE3&&COMTRADE1 === this){
            index = channelIndex3 + 1;
        }
        else{
            index = this.configuration.analogChannels;
        }
        this.addAnalogChannel(result, "", name, "", COMTRADE1.configuration.units[channelIndex1], "calculation", index);
    */
    //}
    /*addNegativeSequenceAnalogChannel(COMTRADE1, channelIndex1, offset1, COMTRADE2, channelIndex2, offset2, COMTRADE3, channelIndex3, offset3, name){
        let resultTimePeriod = COMTRADE1.configuration.samplingTimePeriod;
        let resultSampleFrequency = COMTRADE1.configuration.samplingFrequency;
        let resultFrequensy = COMTRADE1.configuration.frequency;

        let array1;
        let array2;
        let array3;
        try{
            array1 = COMTRADE1.data.analogData[channelIndex1];
        }catch{}
        try{
            array2 = COMTRADE2.data.analogData[channelIndex2];
        }catch{}
        try{
            array3 = COMTRADE3.data.analogData[channelIndex3];
        }catch{}
        
        let maxLength = 0;
        try{
            if(maxLength < Math.round((offset1 + COMTRADE1.data.analogData[channelIndex1].length)* COMTRADE1.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset1 + COMTRADE1.data.analogData[channelIndex1].length)* COMTRADE1.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}
        try{
            if(maxLength < Math.round((offset2 + COMTRADE2.data.analogData[channelIndex2].length)* COMTRADE2.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset2 + COMTRADE2.data.analogData[channelIndex2].length)* COMTRADE2.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}
        try{
            if(maxLength < Math.round((offset3 + COMTRADE3.data.analogData[channelIndex3].length)* COMTRADE3.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset3 + COMTRADE3.data.analogData[channelIndex3].length)* COMTRADE3.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}

        let result = new Array(maxLength);
        result.fill(0);
        let CHANNELA = new Array(maxLength);
        CHANNELA.fill(0);
        let CHANNELB = new Array(maxLength);
        CHANNELB.fill(0);
        let CHANNELC = new Array(maxLength);
        CHANNELC.fill(0);
        try {
            for(let i = 0;i < CHANNELA.length;i++){
                let index = i / COMTRADE1.configuration.samplingTimePeriod * resultTimePeriod - offset1;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array1[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array1[roundIndex] * (1 - (index - roundIndex)) + array1[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array1[roundIndex] * (1 - (roundIndex - index)) + array1[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELA[i] = val;
                }else{
                    CHANNELA[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < CHANNELB.length;i++){
                let index = i / COMTRADE2.configuration.samplingTimePeriod * resultTimePeriod - offset2;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array2[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array2[roundIndex] * (1 - (index - roundIndex)) + array2[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array2[roundIndex] * (1 - (roundIndex - index)) + array2[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELB[i] = val;
                }else{
                    CHANNELB[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < CHANNELC.length;i++){
                let index = i / COMTRADE3.configuration.samplingTimePeriod * resultTimePeriod - offset3;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array3[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array3[roundIndex] * (1 - (index - roundIndex)) + array3[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array3[roundIndex] * (1 - (roundIndex - index)) + array3[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELC[i] = val;
                }else{
                    CHANNELC[i] = 0;
                }
            }
        } catch {}
        let DEGTOSAMP = function(angle){
            return Math.round((resultSampleFrequency / resultFrequensy) / (360 / angle));
        }
        for(let i = 0;i < result.length;i++){
            result[i] = (CHANNELA[i] + CHANNELB[i + DEGTOSAMP(240)] + CHANNELC[i + DEGTOSAMP(120)]) / 3;
        }
        let index = 0;
        if(COMTRADE1 === COMTRADE2&&COMTRADE2 === COMTRADE3&&COMTRADE1 === this){
            index = channelIndex3 + 1;
        }
        else{
            index = this.configuration.analogChannels;
        }
        this.addAnalogChannel(result, "", name, "", COMTRADE1.configuration.units[channelIndex1], "calculation", index);
    }*/
    static customAnalogChannel(channelArrayA, channelArrayB, channelArrayC, samplesPerPeriod, formula){
        let twoDimensionArray = function(a, b) {
            let arr = [];
        
        
            for (let i = 0; i< a; i++) {
                for(let j = 0; j< b; j++) {
                    arr[i] = [];
                }
            }
        
        
            for (let i = 0; i< a; i++) {
                for(let j = 0; j< b; j++) {
                    arr[i][j] = "";
                }
            }
            return arr;
        }
        let sum = function(array){
            let result = 0;
            for (let i = 0;i < array.length;i++){
                result += Number(array[i]);
            }
            return result;
        }
        let result = new Array(channelArrayA.length);
        result.fill(0);
        let CHANNELA = channelArrayA;
        let CHANNELB = channelArrayB;
        let CHANNELC = channelArrayC;

        let ANGLEA = new Array(channelArrayA.length);
        ANGLEA.fill(0);
        let ANGLEB = new Array(channelArrayA.length);
        ANGLEB.fill(0);
        let ANGLEC = new Array(channelArrayA.length);
        ANGLEC.fill(0);

        let RMSA = new Array(channelArrayA.length);
        RMSA.fill(0);
        let RMSB = new Array(channelArrayA.length);
        RMSB.fill(0);
        let RMSC = new Array(channelArrayA.length);
        RMSC.fill(0);

        try {
            for(let i = 0;i < channelArrayA.length;i++){
                let number = Math.round(samplesPerPeriod);

                let valArray = new Array(number);
                let degArray = new Array(number);
        
                let garmonicNumber = 10;
        
                let relSum = 0;
                let imgSum = 0;
        
                let a0 = 0;
        
                let aCent = 0;
        
                let f = 0;
                let aArray = new Array(garmonicNumber);
        
                let relArray = twoDimensionArray(garmonicNumber, number);
                let imgArray = twoDimensionArray(garmonicNumber, number);
        
        
                let adArray = new Array(garmonicNumber);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relArray[q] = new Array(number);
                    imgArray[q] = new Array(number);
                }
                for (let q = 0; q < number; q++) {
                    valArray[q] = CHANNELA[i + q];
                    degArray[q] = (q + 0.5) * 2 * Math.PI / number;
                    for (let j = 1; j <= garmonicNumber; j++) {
                        relArray[j - 1][q] = valArray[q] * Math.cos(degArray[q] * j);
                        imgArray[j - 1][q] = valArray[q] * Math.sin(degArray[q] * j);
                    }
                }
        
                a0 = sum(valArray) / number;
        
                relSum = 2 * sum(relArray[0]) / number;
                imgSum = 2 * sum(imgArray[0]) / number;
        
                f = Math.atan2(relSum, imgSum);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relSum = 2 * sum(relArray[q]) / number;
                    imgSum = 2 * sum(imgArray[q]) / number;
        
                    aArray[q] = Math.sqrt((relSum * relSum) + (imgSum * imgSum));
                    adArray[q] = aArray[q] / Math.sqrt(2);
                }
                    
        
                aCent += a0;
        
                for (let q = 0; q < garmonicNumber; q++) {
                    aCent += adArray[q] * adArray[q];
                }
                aCent = Math.sqrt(aCent);

                ANGLEA[i] = f;
                RMSA[i] = aCent;
            }
        } catch  {
            
        }
        try {
            for(let i = 0;i < channelArrayA.length;i++){
                let number = Math.round(samplesPerPeriod);;

                let valArray = new Array(number);
                let degArray = new Array(number);
        
                let garmonicNumber = 10;
        
                let relSum = 0;
                let imgSum = 0;
        
                let a0 = 0;
        
                let aCent = 0;
        
                let f = 0;
                let aArray = new Array(garmonicNumber);
        
                let relArray = twoDimensionArray(garmonicNumber, number);
                let imgArray = twoDimensionArray(garmonicNumber, number);
        
        
                let adArray = new Array(garmonicNumber);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relArray[q] = new Array(number);
                    imgArray[q] = new Array(number);
                }
                for (let q = 0; q < number; q++) {
                    valArray[q] = CHANNELB[i + q];
                    degArray[q] = (q + 0.5) * 2 * Math.PI / number;
                    for (let j = 1; j <= garmonicNumber; j++) {
                        relArray[j - 1][q] = valArray[q] * Math.cos(degArray[q] * j);
                        imgArray[j - 1][q] = valArray[q] * Math.sin(degArray[q] * j);
                    }
                }
        
                a0 = sum(valArray) / number;
        
                relSum = 2 * sum(relArray[0]) / number;
                imgSum = 2 * sum(imgArray[0]) / number;
        
                f = Math.atan2(relSum, imgSum);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relSum = 2 * sum(relArray[q]) / number;
                    imgSum = 2 * sum(imgArray[q]) / number;
        
                    aArray[q] = Math.sqrt((relSum * relSum) + (imgSum * imgSum));
                    adArray[q] = aArray[q] / Math.sqrt(2);
                }
                    
        
                aCent += a0;
        
                for (let q = 0; q < garmonicNumber; q++) {
                    aCent += adArray[q] * adArray[q];
                }
                aCent = Math.sqrt(aCent);

                ANGLEB[i] = f;
                RMSB[i] = aCent;
            }
        } catch  {
            
        }
        try {
            for(let i = 0;i < channelArrayA.length;i++){
                let number = Math.round(samplesPerPeriod);;

                let valArray = new Array(number);
                let degArray = new Array(number);
        
                let garmonicNumber = 10;
        
                let relSum = 0;
                let imgSum = 0;
        
                let a0 = 0;
        
                let aCent = 0;
        
                let f = 0;
                let aArray = new Array(garmonicNumber);
        
                let relArray = twoDimensionArray(garmonicNumber, number);
                let imgArray = twoDimensionArray(garmonicNumber, number);
        
        
                let adArray = new Array(garmonicNumber);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relArray[q] = new Array(number);
                    imgArray[q] = new Array(number);
                }
                for (let q = 0; q < number; q++) {
                    valArray[q] = CHANNELC[i + q];
                    degArray[q] = (q + 0.5) * 2 * Math.PI / number;
                    for (let j = 1; j <= garmonicNumber; j++) {
                        relArray[j - 1][q] = valArray[q] * Math.cos(degArray[q] * j);
                        imgArray[j - 1][q] = valArray[q] * Math.sin(degArray[q] * j);
                    }
                }
        
                a0 = sum(valArray) / number;
        
                relSum = 2 * sum(relArray[0]) / number;
                imgSum = 2 * sum(imgArray[0]) / number;
        
                f = Math.atan2(relSum, imgSum);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relSum = 2 * sum(relArray[q]) / number;
                    imgSum = 2 * sum(imgArray[q]) / number;
        
                    aArray[q] = Math.sqrt((relSum * relSum) + (imgSum * imgSum));
                    adArray[q] = aArray[q] / Math.sqrt(2);
                }
                    
        
                aCent += a0;
        
                for (let q = 0; q < garmonicNumber; q++) {
                    aCent += adArray[q] * adArray[q];
                }
                aCent = Math.sqrt(aCent);

                ANGLEC[i] = f;
                RMSC[i] = aCent;
            }
        } catch  {
            
        }

        let SIN = Math.sin;
        let COS = Math.cos;
        let TAN = Math.tan;
        let ASIN = Math.asin;
        let ACOS = Math.acos;
        let ATAN = Math.atan;
        let ATAN2 = Math.atan2;
        let ROUND = Math.round;
        let ABS = Math.abs;
        let SQRT = Math.sqrt;
        let CBRT = Math.cbrt;
        let DEGREES = function(angle){
            return angle / Math.PI * 180;
        }
        let RADIANS = function(angle){
            return angle / 180 * Math.PI;
        }
        let SQUARE = function(number){
            return number * number;
        }
        let CUBE = function(number){
            return number * number * number;
        }
        let RADTOSAMP = function(angle){
            return Math.round(samplesPerPeriod * (angle / Math.PI * 2));
        }
        let DEGTOSAMP = function(angle){
            return Math.round(samplesPerPeriod * (angle / 360));
        }

        let calculate = new Function("SIN, COS, TAN, ASIN, ACOS, ATAN, ATAN2, ROUND, ABS, SQRT, CBRT, DEGREES, RADIANS, SQUARE, CUBE, RADTOSAMP, DEGTOSAMP, CHANNELA, CHANNELB, CHANNELC, ANGLEA, ANGLEB, ANGLEC, RMSA, RMSB, RMSC, n","return " + formula);
        for(let i = 0;i < result.length;i++){
            result[i] = calculate(SIN, COS, TAN, ASIN, ACOS, ATAN, ATAN2, ROUND, ABS, SQRT, CBRT, DEGREES, RADIANS, SQUARE, CUBE, RADTOSAMP, DEGTOSAMP, CHANNELA, CHANNELB, CHANNELC, ANGLEA, ANGLEB, ANGLEC, RMSA, RMSB, RMSC, i);
        }

        return result;
        /*let twoDimensionArray = function(a, b) {
            let arr = [];
        
        
            for (let i = 0; i< a; i++) {
                for(let j = 0; j< b; j++) {
                    arr[i] = [];
                }
            }
        
        
            for (let i = 0; i< a; i++) {
                for(let j = 0; j< b; j++) {
                    arr[i][j] = "";
                }
            }
            return arr;
        }
        let sum = function(array){
            let result = 0;
            for (let i = 0;i < array.length;i++){
                result += Number(array[i]);
            }
            return result;
        }
        
        let resultTimePeriod = COMTRADE1.configuration.samplingTimePeriod;
        let resultSampleFrequency = COMTRADE1.configuration.samplingFrequency;
        let resultFrequensy = COMTRADE1.configuration.frequency;

        let array1;
        let array2;
        let array3;
        try{
            array1 = COMTRADE1.data.analogData[channelIndex1];
        }catch{}
        try{
            array2 = COMTRADE2.data.analogData[channelIndex2];
        }catch{}
        try{
            array3 = COMTRADE3.data.analogData[channelIndex3];
        }catch{}
        
        let maxLength = 0;
        try{
            if(maxLength < Math.round((offset1 + COMTRADE1.data.analogData[channelIndex1].length)* COMTRADE1.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset1 + COMTRADE1.data.analogData[channelIndex1].length)* COMTRADE1.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}
        try{
            if(maxLength < Math.round((offset2 + COMTRADE2.data.analogData[channelIndex2].length)* COMTRADE2.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset2 + COMTRADE2.data.analogData[channelIndex2].length)* COMTRADE2.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}
        try{
            if(maxLength < Math.round((offset3 + COMTRADE3.data.analogData[channelIndex3].length)* COMTRADE3.configuration.samplingTimePeriod / resultTimePeriod)){
                maxLength = Math.round((offset3 + COMTRADE3.data.analogData[channelIndex3].length)* COMTRADE3.configuration.samplingTimePeriod / resultTimePeriod);
            }
        }catch{}

        let result = new Array(maxLength);
        result.fill(0);
        let CHANNELA = new Array(maxLength);
        CHANNELA.fill(0);
        let CHANNELB = new Array(maxLength);
        CHANNELB.fill(0);
        let CHANNELC = new Array(maxLength);
        CHANNELC.fill(0);

        let ANGLEA = new Array(maxLength);
        ANGLEA.fill(0);
        let ANGLEB = new Array(maxLength);
        ANGLEB.fill(0);
        let ANGLEC = new Array(maxLength);
        ANGLEC.fill(0);

        let RMSA = new Array(maxLength);
        RMSA.fill(0);
        let RMSB = new Array(maxLength);
        RMSB.fill(0);
        let RMSC = new Array(maxLength);
        RMSC.fill(0);
        try {
            for(let i = 0;i < CHANNELA.length;i++){
                let index = i / COMTRADE1.configuration.samplingTimePeriod * resultTimePeriod - offset1;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array1[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array1[roundIndex] * (1 - (index - roundIndex)) + array1[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array1[roundIndex] * (1 - (roundIndex - index)) + array1[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELA[i] = val;
                }else{
                    CHANNELA[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < CHANNELB.length;i++){
                let index = i / COMTRADE2.configuration.samplingTimePeriod * resultTimePeriod - offset2;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array2[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array2[roundIndex] * (1 - (index - roundIndex)) + array2[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array2[roundIndex] * (1 - (roundIndex - index)) + array2[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELB[i] = val;
                }else{
                    CHANNELB[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < CHANNELC.length;i++){
                let index = i / COMTRADE3.configuration.samplingTimePeriod * resultTimePeriod - offset3;
                let val = 0;
                let roundIndex = Math.round(index);
                if(index === roundIndex){
                    try{
                        val = array3[index];
                    }catch{}
                }else{
                    if(index > roundIndex){
                        try{
                            val = array3[roundIndex] * (1 - (index - roundIndex)) + array3[roundIndex + 1] * (index - roundIndex);
                        }catch{}
                    }
                    else if(index < roundIndex){
                        try{
                            val = array3[roundIndex] * (1 - (roundIndex - index)) + array3[roundIndex - 1] * (roundIndex - index);
                        }catch{}
                    }
                }
                if(val !== undefined){
                    CHANNELC[i] = val;
                }else{
                    CHANNELC[i] = 0;
                }
            }
        } catch {}
        try {
            for(let i = 0;i < maxLength;i++){
                let number = resultSampleFrequency / resultFrequensy;

                let valArray = new Array(number);
                let degArray = new Array(number);
        
                let garmonicNumber = 10;
        
                let relSum = 0;
                let imgSum = 0;
        
                let a0 = 0;
        
                let aCent = 0;
        
                let f = 0;
                let aArray = new Array(garmonicNumber);
        
                let relArray = twoDimensionArray(garmonicNumber, number);
                let imgArray = twoDimensionArray(garmonicNumber, number);
        
        
                let adArray = new Array(garmonicNumber);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relArray[q] = new Array(number);
                    imgArray[q] = new Array(number);
                }
                for (let q = 0; q < number; q++) {
                    valArray[q] = CHANNELA[i + q];
                    degArray[q] = (q + 0.5) * 2 * Math.PI / number;
                    for (let j = 1; j <= garmonicNumber; j++) {
                        relArray[j - 1][q] = valArray[q] * Math.cos(degArray[q] * j);
                        imgArray[j - 1][q] = valArray[q] * Math.sin(degArray[q] * j);
                    }
                }
        
                a0 = sum(valArray) / number;
        
                relSum = 2 * sum(relArray[0]) / number;
                imgSum = 2 * sum(imgArray[0]) / number;
        
                f = Math.atan2(relSum, imgSum);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relSum = 2 * sum(relArray[q]) / number;
                    imgSum = 2 * sum(imgArray[q]) / number;
        
                    aArray[q] = Math.sqrt((relSum * relSum) + (imgSum * imgSum));
                    adArray[q] = aArray[q] / Math.sqrt(2);
                }
                    
        
                aCent += a0;
        
                for (let q = 0; q < garmonicNumber; q++) {
                    aCent += adArray[q] * adArray[q];
                }
                aCent = Math.sqrt(aCent);

                ANGLEA[i] = f;
                RMSA[i] = aCent;
            }
        } catch  {
            
        }
        try {
            for(let i = 0;i < maxLength;i++){
                let number = resultSampleFrequency / resultFrequensy;

                let valArray = new Array(number);
                let degArray = new Array(number);
        
                let garmonicNumber = 10;
        
                let relSum = 0;
                let imgSum = 0;
        
                let a0 = 0;
        
                let aCent = 0;
        
                let f = 0;
                let aArray = new Array(garmonicNumber);
        
                let relArray = twoDimensionArray(garmonicNumber, number);
                let imgArray = twoDimensionArray(garmonicNumber, number);
        
        
                let adArray = new Array(garmonicNumber);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relArray[q] = new Array(number);
                    imgArray[q] = new Array(number);
                }
                for (let q = 0; q < number; q++) {
                    valArray[q] = CHANNELB[i + q];
                    degArray[q] = (q + 0.5) * 2 * Math.PI / number;
                    for (let j = 1; j <= garmonicNumber; j++) {
                        relArray[j - 1][q] = valArray[q] * Math.cos(degArray[q] * j);
                        imgArray[j - 1][q] = valArray[q] * Math.sin(degArray[q] * j);
                    }
                }
        
                a0 = sum(valArray) / number;
        
                relSum = 2 * sum(relArray[0]) / number;
                imgSum = 2 * sum(imgArray[0]) / number;
        
                f = Math.atan2(relSum, imgSum);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relSum = 2 * sum(relArray[q]) / number;
                    imgSum = 2 * sum(imgArray[q]) / number;
        
                    aArray[q] = Math.sqrt((relSum * relSum) + (imgSum * imgSum));
                    adArray[q] = aArray[q] / Math.sqrt(2);
                }
                    
        
                aCent += a0;
        
                for (let q = 0; q < garmonicNumber; q++) {
                    aCent += adArray[q] * adArray[q];
                }
                aCent = Math.sqrt(aCent);

                ANGLEB[i] = f;
                RMSB[i] = aCent;
            }
        } catch  {
            
        }
        try {
            for(let i = 0;i < maxLength;i++){
                let number = resultSampleFrequency / resultFrequensy;

                let valArray = new Array(number);
                let degArray = new Array(number);
        
                let garmonicNumber = 10;
        
                let relSum = 0;
                let imgSum = 0;
        
                let a0 = 0;
        
                let aCent = 0;
        
                let f = 0;
                let aArray = new Array(garmonicNumber);
        
                let relArray = twoDimensionArray(garmonicNumber, number);
                let imgArray = twoDimensionArray(garmonicNumber, number);
        
        
                let adArray = new Array(garmonicNumber);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relArray[q] = new Array(number);
                    imgArray[q] = new Array(number);
                }
                for (let q = 0; q < number; q++) {
                    valArray[q] = CHANNELC[i + q];
                    degArray[q] = (q + 0.5) * 2 * Math.PI / number;
                    for (let j = 1; j <= garmonicNumber; j++) {
                        relArray[j - 1][q] = valArray[q] * Math.cos(degArray[q] * j);
                        imgArray[j - 1][q] = valArray[q] * Math.sin(degArray[q] * j);
                    }
                }
        
                a0 = sum(valArray) / number;
        
                relSum = 2 * sum(relArray[0]) / number;
                imgSum = 2 * sum(imgArray[0]) / number;
        
                f = Math.atan2(relSum, imgSum);
        
                for (let q = 0; q < garmonicNumber; q++) {
                    relSum = 2 * sum(relArray[q]) / number;
                    imgSum = 2 * sum(imgArray[q]) / number;
        
                    aArray[q] = Math.sqrt((relSum * relSum) + (imgSum * imgSum));
                    adArray[q] = aArray[q] / Math.sqrt(2);
                }
                    
        
                aCent += a0;
        
                for (let q = 0; q < garmonicNumber; q++) {
                    aCent += adArray[q] * adArray[q];
                }
                aCent = Math.sqrt(aCent);

                ANGLEC[i] = f;
                RMSC[i] = aCent;
            }
        } catch  {
            
        }

        let SIN = Math.sin;
        let COS = Math.cos;
        let TAN = Math.tan;
        let ASIN = Math.asin;
        let ACOS = Math.acos;
        let ATAN = Math.atan;
        let ATAN2 = Math.atan2;
        let ROUND = Math.round;
        let ABS = Math.abs;
        let SQRT = Math.sqrt;
        let CBRT = Math.cbrt;
        let DEGREES = function(angle){
            return angle / Math.PI * 180;
        }
        let RADIANS = function(angle){
            return angle / 180 * Math.PI;
        }
        let SQUARE = function(number){
            return number * number;
        }
        let CUBE = function(number){
            return number * number * number;
        }
        let RADTOSAMP = function(angle){
            return Math.round((resultSampleFrequency / resultFrequensy) / (Math.PI * 2 / angle));
        }
        let DEGTOSAMP = function(angle){
            return Math.round((resultSampleFrequency / resultFrequensy) / (360 / angle));
        }

        let calculate = new Function("SIN, COS, TAN, ASIN, ACOS, ATAN, ATAN2, ROUND, ABS, SQRT, CBRT, DEGREES, RADIANS, SQUARE, CUBE, RADTOSAMP, DEGTOSAMP, CHANNELA, CHANNELB, CHANNELC, ANGLEA, ANGLEB, ANGLEC, RMSA, RMSB, RMSC, n","return " + formula);
        for(let i = 0;i < result.length;i++){
            result[i] = calculate(SIN, COS, TAN, ASIN, ACOS, ATAN, ATAN2, ROUND, ABS, SQRT, CBRT, DEGREES, RADIANS, SQUARE, CUBE, RADTOSAMP, DEGTOSAMP, CHANNELA, CHANNELB, CHANNELC, ANGLEA, ANGLEB, ANGLEC, RMSA, RMSB, RMSC, i);
        }
        let index = 0;
        if(COMTRADE1 === COMTRADE2&&COMTRADE2 === COMTRADE3&&COMTRADE1 === this){
            index = channelIndex3 + 1;
        }
        else{
            index = this.configuration.analogChannels;
        }
        this.addAnalogChannel(result, "", name, "", "", "calculation", index);*/
    }
    defineAsEmpty(){
        let twoDimensionArray = function(a, b) {
            let arr = [];
        
        
            for (let i = 0; i< a; i++) {
                for(let j = 0; j< b; j++) {
                    arr[i] = [];
                }
            }
        
        
            for (let i = 0; i< a; i++) {
                for(let j = 0; j< b; j++) {
                    arr[i][j] = "";
                }
            }
            return arr;
        }
        this.configuration = new COMTRADEConfiguration();
        this.data = new COMTRADEData();
        this.configuration.stationName = "";
        this.configuration.channels = 0;
        this.configuration.analogChannels = 0;
        this.configuration.digitalChannels = 0;
        this.configuration.analogNames = new Array();
        this.configuration.analogNumbers = new Array();
        this.configuration.analogAnnotation = new Array();
        this.configuration.digitalAnnotation = new Array();
        this.configuration.phases = new Array();
        this.configuration.digitalNames = new Array();
        this.configuration.digitalNumbers = new Array();
        this.configuration.offset = new Array();
        this.configuration.scale = new Array();
        this.configuration.units = new Array();
        this.configuration.k1 = new Array();
        this.configuration.k2 = new Array();
        this.configuration.frequency = 0;//50;
        this.configuration.samples = 0;//0;
        this.configuration.samplingFrequency = 0;//1000;
        this.configuration.samplingTimePeriod = 0;//1000;
        this.configuration.startDate = "";
        this.configuration.startTime = "";
        this.configuration.circuitDate = "";
        this.configuration.circuitTime = "";
        this.configuration.dataType = "";
        this.configuration.configurationOriginal = twoDimensionArray(0, 0);
        this.data.sampleNumber = new Array();
        this.data.sampleTime = new Array();
        this.data.analogData = twoDimensionArray(0, 0);
        this.data.analogDataPrimary = twoDimensionArray(0, 0);
        this.data.analogDataSecondary = twoDimensionArray(0, 0);
        this.data.digitalData = twoDimensionArray(0, 0);
        this.data.dataOriginal = twoDimensionArray(0, 0);
    }
}
class COMTRADEConfiguration{
    stationName;
    channels;
    analogChannels;
    digitalChannels;
    analogNames;
    analogNumbers;
    phases;
    digitalNames;
    digitalNumbers;
    offset;
    scale;
    units;
    k1;
    k2;
    frequency;
    samples;
    samplingFrequency;
    samplingTimePeriod;
    startDate;
    startTime;
    circuitDate;
    circuitTime;
    dataType;
    analogAnnotation;
    digitalAnnotation;
    configurationOriginal;
    isPrimary;
    canBeSecondary;
}
class COMTRADEData{
    sampleNumber;
    sampleTime;
    analogData;
    analogDataPrimary;
    analogDataSecondary;  
    digitalData;
    dataOriginal;
}
class COMTRADEPointData{
    instVal = 0;
    ampVal = 0;
    angle = 0;
    f;
    RMS = 0;
    RMS1 = 0;
    RMS2 = 0;
    RMS3 = 0;
    RMS5 = 0;
    RMSRestore = 0;
    ValRestore = 0;
    AngleRestore = 0;
    baseAngle = 0;
    Name;
    Phase;
    Units;
    Number;
    RestoreStartPoint = 0;
    valArray;
    isSinusoidal;
}
