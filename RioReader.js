class RioReader{
    rioData;
    zones;
    device;
    substation;
    feeder;
    unom;
    unomPrimary;
    inom;
    inomPrimary;
    Kr;
    Kx;
    KLANG;
    KLMAG
    Z0Z1ANG;
    Z0Z1MAG;
    //starpoint;
    readRio = function(){

    }
    read(rio){
        let RIO = this;
        let rioReader = new FileReader();

        rioReader.onload = function(){
            let removeSpaces = function(array){
                let result = new Array();
                for(let i = 0;i < array.length;i++){
                    if(array[i] !== ""){
                        result.push(array[i]);
                    }
                }
                return result;
            }
            let rio = rioReader.result;
            RIO.rioData = rio.split("\r\n");

            /*let argStr = `canvas, mult, centX, centY, is1F, is2F, is3F`;
            let bodStr = `
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;
                ctx.strokeStyle = document.getElementById(this.id + "Color").value;

            `;*/
            /*let tripcharStr = ``;
            let tripchar_earthStr = ``;
            let isDrawing = "none";
            let startString;*/

            RIO.zones = new Array();

            let isZone = false;
            let isDevice = false;
            let isDistance = false;
            let isShape = false;
            let isMhoShape = false;
            let isNinety = false;
            let isARCP = false;
            let isLine = false;         
            let currentZone;
            let zoneFunctionName = "none";
            let tripcharFunction = "";
            let tripchar_earthFunction = "";
            let tempcharFunction = "";
            let zoneStartString;
            let count=0; 
            let k0,b0,r0,x0,k1,b1,k2,b2,r1,x1,r2,x2,r0ARCP,x0ARCP, mhoReach, mhoOffset, mhoRotation, starpoint,beginArc,endArc;
            let elipsB = 1;
            let chekString = removeSpaces(RIO.rioData[0].split(" "));
            if (chekString[0] === "BEGIN"&&chekString[1]==="PROTECTIONDEVICE"){

                for(let i = 0;i < RIO.rioData.length;i++){
                    RIO.rioData[i]=RIO.rioData[i].replaceAll(',', ' ');
                    let currentString = removeSpaces(RIO.rioData[i].split(" "));
                        if(currentString[0] === "BEGIN"&&(currentString[1] === "ZONE" || currentString[1] === "ZONE-OVERREACH")){
                            isZone = true;
                            currentZone = new RioZone();
                            continue;
                        }
                        if(currentString[0] === "END"&&currentString[1] === "ZONE"){
                            isZone = false;
                            currentZone.drawTripchar = tripcharFunction;
                            currentZone.drawTripchar_earth = tripchar_earthFunction;
                            tripcharFunction = "";
                            tripchar_earthFunction = "";
                            RIO.zones.push(currentZone);
                            continue;
                        }
                        if(currentString[0] === "DEVICE"){
                            RIO.device = currentString[1];
                            continue;
                        }
                        if(currentString[0] === "SUBSTATION"){
                            RIO.substation = currentString[1];
                            continue;
                        }
                        if(currentString[0] === "FEEDER"){
                            RIO.feeder = currentString[1];
                            continue;
                        }
                        if(currentString[0] === "RATING"){
                            RIO.inom = Number(currentString[2]);
                            RIO.unom = Number(currentString[1]);
                            continue;
                        }
                        if(currentString[0] === "XE/XL"){
                            RIO.Kx = Number(currentString[1]);                    
                            continue;
                        }
                        if(currentString[0] === "RE/RL"){
                            RIO.Kr = Number(currentString[1]);                    
                            continue;
                        }
                        if(currentString[0] === "CURRGROUND"){
                            if(currentString[1] === "LINE"){
                                starpoint = 1;
                            }
                            else{
                                starpoint = -1;
                            }                      
                            
                            continue;
                        }
                        
                        if(isZone){
                            if(currentString[0] === "NAME"){
                                currentZone.name = currentString[1];
                                continue;
                            }
                            if(currentString[0] === "TIME1"){
                                currentZone.time1 = currentString[1];
                                continue;
                            }
                            if(currentString[0] === "TIMEM"){
                                currentZone.timem = currentString[1];
                                continue;
                            }
                            if(currentString[0] === "BEGIN"&&(currentString[1] === "TRIPCHAR")){
                                zoneFunctionName = "tripchar";
                                continue;
                            }
                            if(currentString[0] === "BEGIN"&&(currentString[1] === "TRIPCHAR-EARTH")){
                                zoneFunctionName = "tripchar-earth";
                                continue;
                            }
                            if(currentString[0] === "END"&&(currentString[1] === "TRIPCHAR"||currentString[1] === "TRIPCHAR-EARTH")){
                                zoneFunctionName = "none";
                                continue;
                            }
                            if(currentString[0] === "START"&&zoneFunctionName === "tripchar"){
                                tripcharFunction += `
                                    ctx.beginPath();
                                    ctx.moveTo(centX + (${currentString[1].replace(",", "")} * mult*${starpoint}), centY - (${currentString[2]} * mult*${starpoint}));
                                `;
                                zoneStartString = currentString;
                                continue;
                            }
                            if(currentString[0] === "START"&&zoneFunctionName === "tripchar-earth"){
                                tripchar_earthFunction += `
                                    ctx.beginPath();
                                    ctx.moveTo(centX + (${currentString[1].replace(",", "")} * mult*${starpoint}), centY - (${currentString[2]} * mult*${starpoint}));
                                `;
                                zoneStartString = currentString;                                
                                continue;
                            }
                            if(currentString[0] === "LINE"&&currentString.length === 3&&zoneFunctionName === "tripchar"){
                                tripcharFunction += `
                                    ctx.lineTo(centX + (${currentString[1].replace(",", "")} * mult*${starpoint}), centY - (${currentString[2]} * mult*${starpoint}));
                                `;
                                continue;
                            }
                            if(currentString[0] === "LINE"&&currentString.length === 3&&zoneFunctionName === "tripchar-earth"){
                                tripchar_earthFunction += `
                                    ctx.lineTo(centX + (${currentString[1].replace(",", "")} * mult*${starpoint}), centY - (${currentString[2]} * mult*${starpoint}));
                                `;
                                continue;
                            }
                            if(currentString[0] === "CLOSE"&&zoneFunctionName === "tripchar"){
                                tripcharFunction += `
                                    ctx.lineTo(centX + (${zoneStartString[1].replace(",", "")} * mult*${starpoint}), centY - (${zoneStartString[2]} * mult*${starpoint}));
                                    ctx.stroke();
                                `;
                                continue;
                            }
                            if(currentString[0] === "CLOSE"&&zoneFunctionName == "tripchar-earth"){
                                tripchar_earthFunction += `
                                    ctx.lineTo(centX + (${zoneStartString[1].replace(",", "")} * mult*${starpoint}), centY - (${zoneStartString[2]} * mult*${starpoint}));
                                    ctx.stroke();
                                `;
                                continue;
                            }
                    }
                    /*if(currentString[0] === "BEGIN"&&(currentString[1] === "TRIPCHAR")){
                        isDrawing = "tripchar";
                        continue;
                    }
                    if(currentString[0] === "BEGIN"&&(currentString[1] === "TRIPCHAR-EARTH")){
                        isDrawing = "tripchar-earth";
                        continue;
                    }
                    if(currentString[0] === "END"&&(currentString[1] === "TRIPCHAR"||currentString[1] === "TRIPCHAR-EARTH")){
                        isDrawing = "none";
                        continue;
                    }
                    if(isDrawing === "tripchar"){
                        if(currentString[0] === "START"){
                            tripcharStr += `
                                ctx.beginPath();
                                ctx.moveTo(centX + (${currentString[1].replace(",", "")} * mult), centY - (${currentString[2]} * mult));
                            `;
                            startString = currentString;
                            continue;
                        }
                        if(currentString[0] === "CLOSE"){
                            tripcharStr += `
                                ctx.lineTo(centX + (${startString[1].replace(",", "")} * mult), centY - (${startString[2]} * mult));
                                ctx.stroke();
                            `;
                            continue;
                        }
                        if(currentString[0] === "LINE"&&currentString.length === 3){
                            tripcharStr += `
                                ctx.lineTo(centX + (${currentString[1].replace(",", "")} * mult), centY - (${currentString[2]} * mult));
                            `;
                            continue;
                        }
                    }
                    if(isDrawing === "tripchar-earth"){
                        if(currentString[0] === "START"){
                            tripchar_earthStr += `
                                ctx.beginPath();
                                ctx.moveTo(centX + (${currentString[1].replace(",", "")} * mult), centY - (${currentString[2]} * mult));
                            `;
                            startString = currentString;
                            continue;
                        }
                        if(currentString[0] === "CLOSE"){
                            tripchar_earthStr += `
                                ctx.lineTo(centX + (${startString[1].replace(",", "")} * mult), centY - (${startString[2]} * mult));
                                ctx.stroke();
                            `;
                            continue;
                        }
                        if(currentString[0] === "LINE"&&currentString.length === 3){
                            tripchar_earthStr += `
                                ctx.lineTo(centX + (${currentString[1].replace(",", "")} * mult), centY - (${currentString[2]} * mult));
                            `;
                            continue;
                        }
                    }*/
                }
                /*bodStr += `
                    if(is1F){
                        ${tripchar_earthStr}
                    }
                `;
                bodStr += `
                    if(is2F||is3F){
                        ${tripcharStr}
                    }
                `;
                RIO.visualise = new Function(argStr, bodStr);*/
               
            }
            else if (chekString[0] === "BEGIN"&&chekString[1]==="TESTOBJECT"){
            for(let i = 0;i < RIO.rioData.length;i++){
                RIO.rioData[i]=RIO.rioData[i].replaceAll(/\t/g, ' ');
                RIO.rioData[i]=RIO.rioData[i].replaceAll(',', ' ');
                RIO.rioData[i]=RIO.rioData[i].replaceAll('"', ' ');
                let currentString = removeSpaces(RIO.rioData[i].split(" ")); 
                if(currentString[0] === "BEGIN"&&currentString[1] === "DEVICE"){
                    isDevice = true;
                }
                if(currentString[0] === "END"&&currentString[1] === "DEVICE"){
                    isDevice = false;
                }
                if(isDevice){

                        if(currentString[0] === "NAME"){
                            currentString.shift();                            
                            RIO.device = currentString.join(' ');                                                      
                            continue;
                        }
                        if(currentString[0] === "SUBSTATION"){
                            currentString.shift();  
                            RIO.substation = currentString.join(' ');   
                            continue;
                        }
                        if(currentString[0] === "BAY"){
                            currentString.shift(); 
                            RIO.feeder = currentString.join(' ');   
                            continue;
                        }
                        if(currentString[0] === "VNOM"){
                            RIO.unom = Number(currentString[1]);
                            continue;
                        }
                        if(currentString[0] === "INOM"){
                            RIO.inom = Number(currentString[1]);
                            continue;
                        }
                        if(currentString[0] === "VPRIM-LL"){
                            RIO.unomPrimary = Number(currentString[1]);
                            continue;
                        }
                        if(currentString[0] === "IPRIM"){
                            RIO.inomPrimary = Number(currentString[1]);
                            continue;
                        }
                }
                if(currentString[0] === "BEGIN"&&currentString[1] === "DISTANCE"){
                    isDistance = true;
                }
                if(currentString[0] === "END"&&currentString[1] === "DISTANCE"){
                    isDistance = false;
                }
                if(isDistance)   {
                    if(currentString[0] === "RERL_XEXL"){
                        RIO.Kr = Number(currentString[1]);
                        RIO.Kx = Number(currentString[2]);                                         
                        continue;
                    }
                    if(currentString[0] === "KL"){                        
                        RIO.KLMAG = Number(currentString[1]); 
                        RIO.KLANG = Number(currentString[2]);                                               
                        continue;
                    }
                    if(currentString[0] === "Z0Z1"){
                        RIO.Z0Z1MAG = Number(currentString[1]); 
                        RIO.Z0Z1ANG = Number(currentString[2]);                         
                        continue;
                    }
                    if(currentString[0] === "BEGIN"&&currentString[1] === "ZONE"){
                        isZone = true;
                        currentZone = new RioZone();
                        continue;
                    }
                    if(currentString[0] === "CTSTARPOINT"){
                        if(currentString[1] === "LINE"){
                            starpoint = 1;
                        }
                        if(currentString[1] === "BUS"){
                            starpoint = -1;
                        }                      
                        
                        continue;
                    }
                    if(currentString[0] === "END"&&currentString[1] === "ZONE"){
                        isZone = false;
                        currentZone.drawTripchar = tripcharFunction;
                        currentZone.drawTripchar_earth = tripchar_earthFunction;
                        tripcharFunction = "";
                        tripchar_earthFunction = "";
                        tempcharFunction = "";
                        RIO.zones.push(currentZone);
                        continue;
                    }
                } 
                    
                    if(isZone){
                        if(currentString[0] === "LABEL"){
                            currentString.shift();                            
                            currentZone.name = currentString.join(' ');                            
                            continue;
                        }
                        // if(currentString[0] === "INDEX"){
                        //     currentZone.name = currentString[1];
                        //     continue;
                        // }

                        if(currentString[0] === "FAULTLOOP"&&(currentString[1] === "LL")){
                            zoneFunctionName = "tripchar";
                            continue;
                        }
                        if(currentString[0] === "FAULTLOOP"&&(currentString[1] === "LN")){
                            zoneFunctionName = "tripchar-earth";
                            continue;
                        }
                        if(currentString[0] === "TRIPTIME"&&zoneFunctionName === "tripchar"){
                            currentZone.timem = currentString[1];
                            continue;
                        }
                        if(currentString[0] === "TRIPTIME"&&zoneFunctionName === "tripchar-earth"){
                            currentZone.time1 = currentString[1];
                            continue;
                        }                       
                        if(currentString[0] === "END"&&currentString[1] === "ZONE"){
                            zoneFunctionName = "none";
                            continue;
                        }
                        if(currentString[0] === "BEGIN"&&currentString[1] === "SHAPE"){                            
                            isShape = true;
                            tempcharFunction += `
                                    ctx.beginPath();
                                    `;
                            continue;
                        }
                        if(currentString[0] === "BEGIN"&&currentString[1] === "MHOSHAPE"){                            
                            isMhoShape = true;                            
                            continue;
                        }
                        if(currentString[0] === "END"&&currentString[1] === "SHAPE"){                            
                            isShape = false;
                            isNinety = false;
                            isARCP =false;
                            isLine = false;                            
                            k0=0;
                            b0=0;
                            r0=0;
                            x0=0;
                            k1=0;
                            b1=0;
                            k2=0;
                            b2=0;
                            r1=0;
                            x1=0;
                            r2=0;
                            x2=0;
                            r0ARCP=0;
                            x0ARCP=0;
                            count=0;
                            continue;
                        }
                        if(currentString[0] === "END"&&currentString[1] === "MHOSHAPE"){
                            isMhoShape=false;
                            continue;
                        }
                        if(currentString[0] === "AUTOCLOSE"){
                            if(isLine){
                                if(isNinety){                                
                                    x2=r2*k0+b0;                                
                                    }  
                                else {      
                                    r2=(b2-b0)/(k0-k2);
                                    x2=r2*k2+b2;
                                }    
                                tempcharFunction += `  
                                    ctx.lineTo(centX + (${r2} * mult *${starpoint}), centY - (${x2} * mult *${starpoint}));  
                                    ctx.lineTo(centX + (${r0} * mult *${starpoint}), centY - (${x0} * mult *${starpoint}));  
                                    ctx.stroke();
                                `;
                            }
                            if(isARCP){
                                tempcharFunction += `                                                                                                             
                                    ctx.stroke();
                                `;        
                            }
                            continue;
                        }
                        if(isShape){
                            if((currentString[0] === "LINE"||currentString[0] === "LINEP")&&count==0){  
                                if(currentString[0] === "LINEP"){
                                    r1=currentString[1]*Math.cos(currentString[2]* Math.PI / 180);
                                    x1=currentString[1]*Math.sin(currentString[2]* Math.PI / 180);
                                }
                                else {
                                    r1=currentString[1];
                                    x1=currentString[2];
                                }
                                k1=Math.tan(currentString[3] * Math.PI / 180);
                                b1=x1-r1 * k1;
                                r0=r1;
                                x0=x1;
                                k0=k1;
                                b0=b1;
                                tempcharFunction += `                                    
                                    ctx.moveTo(centX + (${r1} * mult*${starpoint}), centY - (${x1} * mult*${starpoint}));
                                    ctx.lineTo(centX + (${r1} * mult*${starpoint}), centY - (${x1} * mult*${starpoint})); 
                                `;
                                count +=1;
                                isARCP=false; 
                                isLine = true;
                                continue;
                            }
                            if(currentString[0] === "LINE"&&count>0){  
                                if(currentString[3]==90||currentString[3]==-270){
                                r2= currentString[1];
                                x2=r2*k1+b1;
                                isNinety = true;
                                }                            
                                else{
                                     //расчет коэффициентов текущей линии 
                                k2=Math.tan(currentString[3] * Math.PI / 180);                                
                                b2=currentString[2]-currentString[1] * k2;  
                                    if(isNinety){
                                        x2=r2*k2+b2;
                                        isNinety = false;
                                    }
                                    else {
                                        //точка пересечения предидущей и текущей прямой
                                        r2=(b2-b1)/(k1-k2);
                                        x2=r2*k2+b2;   
                                    }
                                }
                                //линия от первой точки до точки пересечения и линия до точки через которую проходит текущая прямая
                                //ctx.lineTo(centX + (${currentString[1]} * mult), centY - (${currentString[2]} * mult));
                                        k1=k2;
                                        b1=b2;
                                        r1=r2;
                                        x1=x2;
                                    tempcharFunction += `                                    
                                    ctx.lineTo(centX + (${r2} * mult*${starpoint}), centY - (${x2} * mult*${starpoint})); 
                                `;  
                                isARCP=false;
                                isLine = true;                                               
                                continue;
                            } 
                            if(currentString[0] === "LINEP"&&count>0){  
                                if(currentString[3]==90||currentString[3]==-270){
                                r2= currentString[1]*Math.cos(currentString[2]* Math.PI / 180);
                                x2=r2*k1+b1;
                                isNinety = true;
                                }                            
                                else{
                                     //расчет коэффициентов текущей линии 
                                k2=Math.tan(currentString[3] * Math.PI / 180); 
                                b2=currentString[1]*Math.sin(currentString[2]* Math.PI / 180) - currentString[1]*Math.cos(currentString[2]* Math.PI / 180) * k2;  
                                    
                                    if(isNinety){
                                        x2=r2*k2+b2;
                                        isNinety = false;
                                    }
                                    else {
                                        //точка пересечения предидущей и текущей прямой
                                        r2=(b2-b1)/(k1-k2);
                                        x2=r2*k2+b2;   
                                    }
                                }
                                //линия от первой точки до точки пересечения и линия до точки через которую проходит текущая прямая
                                //ctx.lineTo(centX + (${currentString[1]} * mult), centY - (${currentString[2]} * mult));
                                        k1=k2;
                                        b1=b2;
                                        r1=r2;
                                        x1=x2;
                                    tempcharFunction += `                                    
                                    ctx.lineTo(centX + (${r2} * mult*${starpoint}), centY - (${x2} * mult*${starpoint})); 
                                `;  
                                isARCP=false;
                                isLine = true;                                               
                                continue;
                            } 
                            if(currentString[0] === "ARCP"){     
                                                
                                r2 = currentString[1]*Math.cos(currentString[2]* Math.PI / 180) +currentString[3]*Math.cos(currentString[5]* Math.PI / 180);
                                x2 = currentString[1]*Math.sin(currentString[2]* Math.PI / 180) +currentString[3]*Math.sin(currentString[5]* Math.PI / 180);  
                                r0ARCP = currentString[1]*Math.cos(currentString[2]* Math.PI / 180) +currentString[3]*Math.cos(currentString[4]* Math.PI / 180);
                                x0ARCP = currentString[1]*Math.sin(currentString[2]* Math.PI / 180) +currentString[3]*Math.sin(currentString[4]* Math.PI / 180);                                                    
                                if(starpoint===1){
                                    beginArc=-currentString[5] * Math.PI / 180;
                                    endArc=-currentString[4] * Math.PI / 180;
                                }
                                else {
                                    beginArc=Math.PI-currentString[5] * Math.PI / 180;
                                    endArc=Math.PI-currentString[4] * Math.PI / 180;
                                }
                                if(isLine){
                                    tempcharFunction += `                                    
                                    ctx.lineTo(centX + (${r0ARCP} * mult*${starpoint}), centY - (${x0ARCP} * mult*${starpoint})); 
                                `; 
                                }                               
                                tempcharFunction += `  
                                ctx.moveTo(centX + (${r2} * mult*${starpoint}), centY - (${x2} * mult*${starpoint}));
                                ctx.ellipse(centX + (${currentString[1]*Math.cos(currentString[2]* Math.PI / 180)} * mult*${starpoint}), centY - (${currentString[1] * Math.sin(currentString[2] * Math.PI / 180)} * mult*${starpoint}), ${currentString[3]}* mult, ${currentString[3]}* mult, 0,  ${beginArc},  ${endArc});                                 
                                `; 
                                isARCP=true;  
                                isLine = false;  
                                isNinety=true;
                                count=0;  
                                continue;
                            }
                            if(zoneFunctionName === "tripchar"){
                                tripcharFunction += tempcharFunction;
                            }
                           
                            if(zoneFunctionName === "tripchar-earth"){
                                tripchar_earthFunction += tempcharFunction;
                            }
                        }
                        if(isMhoShape){
                            if(currentString[0] === "ANGLE"){
                                mhoRotation = Number(currentString[1]);
                                continue;
                            }
                            if(currentString[0] === "OFFSET"){
                                mhoOffset = Number(currentString[1]);                               
                                continue;
                            }
                            if(currentString[0] === "REACH"){
                                mhoReach = Number(currentString[1]);
                                elipsB = mhoReach/2;
                                continue;
                            }
                            if(currentString[0] === "WIDTH"){
                                elipsB = Number(currentString[1])/2;
                                continue;
                            }
                            if(currentString[0] === "AB"){
                                elipsB = Number(currentString[1])*mhoReach/2;
                                continue;
                            }
                            
                                tempcharFunction += ` 
                                    ctx.beginPath();
                                    ctx.ellipse(centX + (${(mhoOffset+mhoReach)/2*Math.cos(mhoRotation* Math.PI / 180)} * mult*${starpoint}), centY - (${(mhoOffset+mhoReach)/2*Math.sin(mhoRotation* Math.PI / 180)} * mult*${starpoint}), ${(mhoOffset+mhoReach)/2}* mult, ${elipsB}* mult, ${-mhoRotation* Math.PI / 180 },  0,  2 * Math.PI); 
                                    ctx.stroke();
                                `;  
                            if(zoneFunctionName === "tripchar"){
                                tripcharFunction += tempcharFunction;
                            }
                           
                            if(zoneFunctionName === "tripchar-earth"){
                                tripchar_earthFunction += tempcharFunction;
                            }
                            
                            mhoRotation = 0;
                            mhoOffset = 0; 
                            mhoReach = 0;
                            elipsB = 1;
                            isMhoShape = false;
                        }
                }                
            } 
            }
            RIO.readRio();

        }
        rioReader.readAsText(rio);
    }
}
class RioZone{
    name = "-unnamed-";
    timem = "";
    time1 = "";
    drawTripchar;
    drawTripchar_earth;
}