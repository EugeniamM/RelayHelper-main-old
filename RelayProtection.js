class RelayProtection{
    id = "newRelayProtectionZone";
    name = "newRelayProtectionZone";
    innerHTML = "<div></div>";
    element = document.createElement("div");
    isEnable;
    links = new Array(0);

    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){}
    drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){}
    enable = function(isEnable, parent){
        this.isEnable = isEnable;
        if(isEnable){
            parent.appendChild(this.element);
        }
        else {
            parent.removeChild(this.element);
        }
    }
    enablingWithCheckbox = function(id, parent){
        let RP = this;
        document.getElementById(id).onchange = function(){
            RP.isEnable = document.getElementById(id).checked;
            //console.log(parent, element)
            if(RP.isEnable){
                parent.appendChild(RP.element);
            }
            else {
                parent.removeChild(RP.element);
            }
        }
    }
    defineElement(){
        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(this.innerHTML, 'text/html');
        this.element = parsedDoc.getElementById(this.id + "Container");
    }

    //Distanse Protection
    DZ2KPS123ZONE(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">Z</p>
                <input type="number" id="${this.id}Z" class="textBox">
                <p class="text">Deg</p>
                <input type="number" id="${this.id}Deg" class="textBox">
                <p class="text">Offset %</p>
                <input type="number" id="${this.id}Offset" class="textBox">
                <p class="text">Eccentricity</p>
                <input type="number" id="${this.id}Eccentricity" class="textBox" value="1">
                <hr class="innerHr">
                <p class="text">Dir</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>Reverse</span>
                        Forward
                    </label>
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let c1z = Number(document.getElementById(this.id + "Z").value);
                let c1Deg = document.getElementById(this.id + "Dir").checked ? -Number(document.getElementById(this.id + "Deg").value) + 180 : -Number(document.getElementById(this.id + "Deg").value);
                let c1Cm = Number(document.getElementById(this.id + "Offset").value);
                let c1Ex = Number(document.getElementById(this.id + "Eccentricity").value);

            
                let elX1 = ((c1z - (c1z * c1Cm / 100)) / 2) * Math.cos(c1Deg * Math.PI / 180);
                let elY1 = ((c1z - (c1z * c1Cm / 100)) / 2) * Math.sin(c1Deg * Math.PI / 180);
            
                let mainR1 = (c1z + (c1z * c1Cm / 100)) / 2;
                let otherR1 = c1Ex * mainR1;
            
                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.ellipse(centX + (mult * elX1), centY + (mult * elY1), mult * mainR1, mult * otherR1, c1Deg * Math.PI / 180, 0, Math.PI * 2);
                //ctx.ellipse()
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    ABBZONE(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">X1</p>
                <input type="number" id="${this.id}X1" class="textBox">
                <p class="text">R1</p>
                <input type="number" id="${this.id}R1" class="textBox">
                <hr class="innerHr">
                <p class="text">X0</p>
                <input type="number" id="${this.id}X0" class="textBox">
                <p class="text">R0</p>
                <input type="number" id="${this.id}R0" class="textBox">
                <hr class="innerHr">
                <p class="text">RFPP</p>
                <input type="number" id="${this.id}RFPP" class="textBox">
                <p class="text">RFPE</p>
                <input type="number" id="${this.id}RFPE" class="textBox">
                <hr class="innerHr">
                <p class="text">Dir</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>Reverse</span>
                        Forward
                    </label>
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let zm1X1 = Number(document.getElementById(this.id + "X1").value);
                let zm1R1 = Number(document.getElementById(this.id + "R1").value);
                let zm1X0 = Number(document.getElementById(this.id + "X0").value);
                let zm1R0 = Number(document.getElementById(this.id + "R0").value);
                let zm1RFPP = Number(document.getElementById(this.id + "RFPP").value);
                let zm1RFPE = Number(document.getElementById(this.id + "RFPE").value);
                let zm1Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;

                let zm1x1;
                let zm1y1;
                let zm1x2;
                let zm1y2;
                let zm1x3;
                let zm1y3;
                let zm1x4;
                let zm1y4;
                let zm1x5;
                let zm1y5;

                if(is2F||is3F) {
                    zm1x2 = module(-zm1Dir * zm1RFPP / 2) < module(-zm1Dir * zm1X1 * Math.tan(25 / 180 * Math.PI)) ? -zm1Dir * zm1RFPP / 2 : -zm1Dir * zm1X1 * Math.tan(25 / 180 * Math.PI);
                    zm1y2 = zm1Dir * zm1X1;

                    zm1x1 = module(-zm1Dir * zm1RFPP / 2) > module(zm1x2) ? zm1x2 : -zm1Dir * zm1RFPP / 2;
                    zm1y1 = module(zm1Dir * Math.tan(zm1Dir * 115 / 180 * Math.PI) * zm1x1) > module(zm1y2) ? zm1y2 : zm1Dir * Math.tan(zm1Dir * 115 / 180 * Math.PI) * zm1x1;

                    zm1x3 = zm1Dir * (zm1R1 + zm1RFPP / 2);
                    zm1y3 = zm1Dir * zm1X1;
                    zm1x4 = zm1Dir * zm1RFPP / 2;
                    zm1y4 = 0;
                    zm1x5 = zm1Dir * zm1RFPP / 2;
                    zm1y5 = -zm1Dir * Math.tan(15 * Math.PI / 180) * zm1RFPP / 2;
                }

                if(is1F) {
                    zm1x2 = module(-zm1Dir * zm1RFPE) < module(-zm1Dir * (zm1X1 + (zm1X0 - zm1X1) / 3) * Math.tan(25 / 180 * Math.PI)) ? -zm1Dir * zm1RFPE : -zm1Dir * (zm1X1 + (zm1X0 - zm1X1) / 3) * Math.tan(25 / 180 * Math.PI);
                    zm1y2 = zm1Dir * (zm1X1 + (zm1X0 - zm1X1) / 3);

                    zm1x1 = module(-zm1Dir * zm1RFPE) > module(zm1x2) ? zm1x2 : -zm1Dir * zm1RFPE;
                    zm1y1 = module(zm1Dir * Math.tan(zm1Dir * 115 / 180 * Math.PI) * zm1x1) > module(zm1y2) ? zm1y2 : zm1Dir * Math.tan(zm1Dir * 115 / 180 * Math.PI) * zm1x1;

                    zm1x3 = zm1Dir * (zm1RFPE + zm1R1 + (zm1R0 - zm1R1) / 3);
                    zm1y3 = zm1Dir * (zm1X1 + (zm1X0 - zm1X1) / 3);
                    zm1x4 = zm1Dir * zm1RFPE;
                    zm1y4 = 0;
                    zm1x5 = zm1Dir * zm1RFPE;
                    zm1y5 = -zm1Dir * Math.tan(15 * Math.PI / 180) * zm1RFPE;
                }

                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.moveTo(centX, centY);
                ctx.lineTo(centX + (zm1x1 * mult), centY - (zm1y1 * mult));
                ctx.lineTo(centX + (zm1x2 * mult), centY - (zm1y2 * mult));
                ctx.lineTo(centX + (zm1x3 * mult), centY - (zm1y3 * mult));
                ctx.lineTo(centX + (zm1x4 * mult), centY - (zm1y4 * mult));
                ctx.lineTo(centX + (zm1x5 * mult), centY - (zm1y5 * mult));
                ctx.lineTo(centX, centY);

                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    ABBLE(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">RLdFw</p>
                <input type="number" id="${this.id}RLdFw" class="textBox">
                <p class="text">RLdRv</p>
                <input type="number" id="${this.id}RLdRv" class="textBox">
                <hr class="innerHr">
                <p class="text">ArgLd</p>
                <input type="number" id="${this.id}ArgLd" class="textBox">
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let lcRldFw = Number(document.getElementById(this.id + "RLdFw").value);
                let lcRldRv = Number(document.getElementById(this.id + "RLdRv").value);
                let lcArgLd = Number(document.getElementById(this.id + "ArgLd").value);

                let alcx1;
                let alcy1;
                let alcx2;
                let alcy2;
                let alcx3;
                let alcy3;
                let alcx4;
                let alcy4;
            
                let blcx1;
                let blcy1;
                let blcx2;
                let blcy2;
                let blcx3;
                let blcy3;
                let blcx4;
                let blcy4;

                if(is1F||is3F){
                    alcx1 = -(canvas.width / mult);
                    alcy1 = alcx1 * Math.tan(lcArgLd * Math.PI / 180);
                    alcx2 = -lcRldRv;
                    alcy2 = alcx2 * Math.tan(lcArgLd * Math.PI / 180);
                    alcx3 = -lcRldRv;
                    alcy3 = -alcx2 * Math.tan(lcArgLd * Math.PI / 180);
                    alcx4 = -(canvas.width / mult);
                    alcy4 = -alcx4 * Math.tan(lcArgLd * Math.PI / 180);
                
                    blcx1 = (canvas.width / mult);
                    blcy1 = -blcx1 * Math.tan(lcArgLd * Math.PI / 180);
                    blcx2 = lcRldFw;
                    blcy2 = -blcx2 * Math.tan(lcArgLd * Math.PI / 180);
                    blcx3 = lcRldFw;
                    blcy3 = blcx2 * Math.tan(lcArgLd * Math.PI / 180);
                    blcx4 = (canvas.width / mult);
                    blcy4 = blcx4 * Math.tan(lcArgLd * Math.PI / 180);
                }
                else if(is2F){
                    alcx1 = -(canvas.width / mult);
                    alcy1 = alcx1 * Math.tan((180 + lcArgLd - 30) * Math.PI / 180);
                    alcx2 = (lcRldRv * (Math.sin(150  * Math.PI / 180) - Math.tan(60  * Math.PI / 180) * Math.cos(150  * Math.PI / 180)) / (-Math.tan(60  * Math.PI / 180) + Math.tan((180 + lcArgLd - 30) * Math.PI / 180)));
                    alcy2 = alcx2 * Math.tan((180 + lcArgLd - 30) * Math.PI / 180);
                    alcx3 = (lcRldRv * (Math.sin(150  * Math.PI / 180) - Math.tan(60  * Math.PI / 180) * Math.cos(150  * Math.PI / 180)) / (-Math.tan(60  * Math.PI / 180) + Math.tan((180 - lcArgLd - 30) * Math.PI / 180)));
                    alcy3 = alcx3 * Math.tan((180 - lcArgLd - 30) * Math.PI / 180);
                    alcx4 = -(canvas.width / mult);
                    alcy4 = alcx4 * Math.tan((180 - lcArgLd - 30) * Math.PI / 180);
                
                    blcx1 = (canvas.width / mult);
                    blcy1 = blcx1 * Math.tan((360 - lcArgLd - 30) * Math.PI / 180);
                    blcx2 = -lcRldFw * (Math.sin(-30  * Math.PI / 180) - Math.tan(60  * Math.PI / 180) * Math.cos(-30  * Math.PI / 180)) / (Math.tan(60  * Math.PI / 180) - Math.tan((360 - lcArgLd - 30) * Math.PI / 180));
                    blcy2 = blcx2 * Math.tan(60  * Math.PI / 180) + lcRldFw * (Math.sin(-30  * Math.PI / 180) - Math.tan(60  * Math.PI / 180) * Math.cos(-30 * Math.PI / 180));
                    blcx3 = -lcRldFw * (Math.sin(-30  * Math.PI / 180) - Math.tan(60  * Math.PI / 180) * Math.cos(-30  * Math.PI / 180)) / (Math.tan(60  * Math.PI / 180) - Math.tan((360 + lcArgLd - 30) * Math.PI / 180));
                    blcy3 = blcx3 * Math.tan(60  * Math.PI / 180) + lcRldFw * (Math.sin(-30  * Math.PI / 180) - Math.tan(60  * Math.PI / 180) * Math.cos(-30 * Math.PI / 180));
                    blcx4 = (canvas.width / mult);
                    blcy4 = blcx4 * Math.tan((360 + lcArgLd - 30) * Math.PI / 180);
                }
            
                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
            
                ctx.moveTo(centX + (alcx1 * mult), centY - (alcy1 * mult));
                ctx.lineTo(centX + (alcx2 * mult), centY - (alcy2 * mult));
                ctx.lineTo(centX + (alcx3 * mult), centY - (alcy3 * mult));
                ctx.lineTo(centX + (alcx4 * mult), centY - (alcy4 * mult));
            
                ctx.moveTo(centX + (blcx1 * mult), centY - (blcy1 * mult));
                ctx.lineTo(centX + (blcx2 * mult), centY - (blcy2 * mult));
                ctx.lineTo(centX + (blcx3 * mult), centY - (blcy3 * mult));
                ctx.lineTo(centX + (blcx4 * mult), centY - (blcy4 * mult));
            
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    SIMZONE1(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">X</p>
                <input type="number" id="${this.id}X" class="textBox">
                <p class="text">R</p>
                <input type="number" id="${this.id}R" class="textBox">
                <hr class="innerHr">
                <p class="text">RE</p>
                <input type="number" id="${this.id}RE" class="textBox">
                <hr class="innerHr">
                <p class="text">Deg</p>
                <input type="number" id="${this.id}Deg" class="textBox">
                <hr class="innerHr">
                <p class="text">Dir</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>Reverse</span>
                        Forward
                    </label>
                </div>
                <hr class="innerHr">
                <p class="text">α</p>
                <input type="number" id="${this.id}A" class="textBox">
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let zm1X = Number(document.getElementById(this.id + "X").value);
                let zm1R = Number(document.getElementById(this.id + "R").value);
                let zm1RE = Number(document.getElementById(this.id + "RE").value);
                let zm1Deg = Number(document.getElementById(this.id + "Deg").value);
                let zm1Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;
                let zm1A = Number(document.getElementById(this.id + "A").value);
        
                let zm1x1;
                let zm1y1;
                let zm1x2;
                let zm1y2;
                let zm1x3;
                let zm1y3;
                let zm1x4;
                let zm1y4;
            
                if(is1F) {
                    zm1x1 = zm1Dir * zm1X / Math.tan(120 * Math.PI / 180);
                    zm1y1 = zm1Dir * zm1X;
                    zm1x2 = zm1Dir * zm1X / Math.tan(zm1Deg * Math.PI / 180);
                    zm1y2 = zm1Dir * zm1X;
                    zm1x3 = zm1Dir * (Math.tan(zm1Deg * Math.PI / 180) * zm1RE + Math.tan(zm1A * Math.PI / 180) * zm1x2 + zm1X) / (Math.tan(zm1A * Math.PI / 180) + Math.tan(zm1Deg * Math.PI / 180));
                    zm1y3 = zm1Dir * (-(zm1Dir * zm1x3 - zm1x2) * Math.tan(zm1A * Math.PI / 180) + zm1X);
                    zm1x4 = zm1Dir * zm1RE * Math.tan(zm1Deg * Math.PI / 180) / (Math.tan(zm1Deg * Math.PI / 180) - Math.tan(338 * Math.PI / 180));
                    zm1y4 = -zm1Dir * module(Math.tan(338 * Math.PI / 180) * zm1x4);
                }
                else if(is2F||is3F) {
                    zm1x1 = zm1Dir * zm1X / Math.tan(120 * Math.PI / 180);
                    zm1y1 = zm1Dir * zm1X;
                    zm1x2 = zm1Dir * zm1X / Math.tan(zm1Deg * Math.PI / 180);
                    zm1y2 = zm1Dir * zm1X;
                    zm1x3 = zm1Dir * (Math.tan(zm1Deg * Math.PI / 180) * zm1R + Math.tan(zm1A * Math.PI / 180) * zm1x2 + zm1X) / (Math.tan(zm1A * Math.PI / 180) + Math.tan(zm1Deg * Math.PI / 180));
                    zm1y3 = zm1Dir * (-(zm1Dir * zm1x3 - zm1x2) * Math.tan(zm1A * Math.PI / 180) + zm1X);
                    zm1x4 = zm1Dir * zm1R * Math.tan(zm1Deg * Math.PI / 180) / (Math.tan(zm1Deg * Math.PI / 180) - Math.tan(338 * Math.PI / 180));
                    zm1y4 = -zm1Dir * module(Math.tan(338 * Math.PI / 180) * zm1x4);
                }
        
                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.moveTo(centX, centY);
                ctx.lineTo(centX + (zm1x1 * mult), centY - (zm1y1 * mult));
                ctx.lineTo(centX + (zm1x2 * mult), centY - (zm1y2 * mult));
                ctx.lineTo(centX + (zm1x3 * mult), centY - (zm1y3 * mult));
                ctx.lineTo(centX + (zm1x4 * mult), centY - (zm1y4 * mult));
                ctx.lineTo(centX, centY);
            
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    SIMZONE(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">X</p>
                <input type="number" id="${this.id}X" class="textBox">
                <p class="text">R</p>
                <input type="number" id="${this.id}R" class="textBox">
                <hr class="innerHr">
                <p class="text">RE</p>
                <input type="number" id="${this.id}RE" class="textBox">
                <hr class="innerHr">
                <p class="text">Deg</p>
                <input type="number" id="${this.id}Deg" class="textBox">
                <hr class="innerHr">
                <p class="text">Dir</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>Reverse</span>
                        Forward
                    </label>
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let zm2X = Number(document.getElementById(this.id + "X").value);
                let zm2R = Number(document.getElementById(this.id + "R").value);
                let zm2RE = Number(document.getElementById(this.id + "RE").value);
                let zm2Deg = Number(document.getElementById(this.id + "Deg").value);
                let zm2Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;

                let zm2x1;
                let zm2y1;
                let zm2x2;
                let zm2y2;
                let zm2x3;
                let zm2y3;
            
                if(is1F) {
                    zm2x1 = zm2Dir * zm2X / Math.tan(120 * Math.PI / 180);
                    zm2y1 = zm2Dir * zm2X;
                    zm2x2 = zm2Dir * (zm2X / Math.tan(zm2Deg * Math.PI / 180) + zm2RE);
                    zm2y2 = zm2Dir * zm2X;
                    zm2x3 = zm2Dir * zm2RE * Math.tan(zm2Deg * Math.PI / 180) / (Math.tan(zm2Deg * Math.PI / 180) - Math.tan(338 * Math.PI / 180));
                    zm2y3 = -zm2Dir * module(Math.tan(338 * Math.PI / 180) * zm2x3);
                }
                if(is2F||is3F) {
                    zm2x1 = zm2Dir * zm2X / Math.tan(120 * Math.PI / 180);
                    zm2y1 = zm2Dir * zm2X;
                    zm2x2 = zm2Dir * (zm2X / Math.tan(zm2Deg * Math.PI / 180) + zm2R);
                    zm2y2 = zm2Dir * zm2X;
                    zm2x3 = zm2Dir * zm2R * Math.tan(zm2Deg * Math.PI / 180) / (Math.tan(zm2Deg * Math.PI / 180) - Math.tan(338 * Math.PI / 180));
                    zm2y3 = -zm2Dir * module(Math.tan(338 * Math.PI / 180) * zm2x3);
                }

                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.moveTo(centX, centY);
                ctx.lineTo(centX + (zm2x1 * mult), centY - (zm2y1 * mult));
                ctx.lineTo(centX + (zm2x2 * mult), centY - (zm2y2 * mult));
                ctx.lineTo(centX + (zm2x3 * mult), centY - (zm2y3 * mult));
                ctx.lineTo(centX, centY);
            
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    SIMLE(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">R Load ph-e</p>
                <input type="number" id="${this.id}LoadPhe" class="textBox">
                <p class="text">PHI ph-e</p>
                <input type="number" id="${this.id}PHIPhe" class="textBox">
                <hr class="innerHr">
                <p class="text">R Load ph-ph</p>
                <input type="number" id="${this.id}LoadPhph" class="textBox">
                <p class="text">PHI ph-ph</p>
                <input type="number" id="${this.id}PHIPhph" class="textBox">
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let lcLPhe = Number(document.getElementById(this.id + "LoadPhe").value);
                let lcPPhe = Number(document.getElementById(this.id + "PHIPhe").value);
        
                let lcLPhph = Number(document.getElementById(this.id + "LoadPhph").value);
                let lcPPhph = Number(document.getElementById(this.id + "PHIPhph").value);
        
                let alcx1;
                let alcy1;
                let alcx2;
                let alcy2;
                let alcx3;
                let alcy3;
                let alcx4;
                let alcy4;
        
                let blcx1;
                let blcy1;
                let blcx2;
                let blcy2;
                let blcx3;
                let blcy3;
                let blcx4;
                let blcy4;
        
                if(is1F) {
                    alcx1 = -(canvas.width / mult);
                    alcy1 = alcx1 * Math.tan(lcPPhe * Math.PI / 180);
                    alcx2 = -lcLPhe;
                    alcy2 = alcx2 * Math.tan(lcPPhe * Math.PI / 180);
                    alcx3 = -lcLPhe;
                    alcy3 = -alcx2 * Math.tan(lcPPhe * Math.PI / 180);
                    alcx4 = -(canvas.width / mult);
                    alcy4 = -alcx1 * Math.tan(lcPPhe * Math.PI / 180);
            
                    blcx1 = (canvas.width / mult);
                    blcy1 = -blcx1 * Math.tan(lcPPhe * Math.PI / 180);
                    blcx2 = lcLPhe;
                    blcy2 = -blcx2 * Math.tan(lcPPhe * Math.PI / 180);
                    blcx3 = lcLPhe;
                    blcy3 = blcx2 * Math.tan(lcPPhe * Math.PI / 180);
                    blcx4 = (canvas.width / mult);
                    blcy4 = blcx4 * Math.tan(lcPPhe * Math.PI / 180);
                }
                else if(is2F||is3F) {
                    alcx1 = -(canvas.width / mult);
                    alcy1 = alcx1 * Math.tan(lcPPhph * Math.PI / 180);
                    alcx2 = -lcLPhph;
                    alcy2 = alcx2 * Math.tan(lcPPhph * Math.PI / 180);
                    alcx3 = -lcLPhph;
                    alcy3 = -alcx2 * Math.tan(lcPPhph * Math.PI / 180);
                    alcx4 = -(canvas.width / mult);
                    alcy4 = -alcx1 * Math.tan(lcPPhph * Math.PI / 180);
            
                    blcx1 = (canvas.width / mult);
                    blcy1 = -blcx1 * Math.tan(lcPPhph * Math.PI / 180);
                    blcx2 = lcLPhph;
                    blcy2 = -blcx2 * Math.tan(lcPPhph * Math.PI / 180);
                    blcx3 = lcLPhph;
                    blcy3 = blcx2 * Math.tan(lcPPhph * Math.PI / 180);
                    blcx4 = (canvas.width / mult);
                    blcy4 = blcx4 * Math.tan(lcPPhph * Math.PI / 180);
                }
        
        
                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                
            
        
                ctx.moveTo(centX + (alcx1 * mult), centY - (alcy1 * mult));
                ctx.lineTo(centX + (alcx2 * mult), centY - (alcy2 * mult));
                ctx.lineTo(centX + (alcx3 * mult), centY - (alcy3 * mult));
                ctx.lineTo(centX + (alcx4 * mult), centY - (alcy4 * mult));
        
                ctx.moveTo(centX + (blcx1 * mult), centY - (blcy1 * mult));
                ctx.lineTo(centX + (blcx2 * mult), centY - (blcy2 * mult));
                ctx.lineTo(centX + (blcx3 * mult), centY - (blcy3 * mult));
                ctx.lineTo(centX + (blcx4 * mult), centY - (blcy4 * mult));
        
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    L60ZONE(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <div class="innerBox">
                    <h1 class="text">Phase</h1>
                    <hr class="innerHr">
                    <p class="text">REACH</p>
                    <input type="number" id="${this.id}REACH-2+" class="textBox">
                    <hr class="innerHr">
                    <p class="text">RCA</p>
                    <input type="number" id="${this.id}RCA-2+" value = "90" class="textBox">
                    <hr class="innerHr">
                    <p class="text">COMP LIMIT</p>
                    <input type="number" id="${this.id}COMPLIMIT-2+" value = "90" class="textBox">
                    <hr class="innerHr">
                    <p class="text">DIR RCA</p>
                    <input type="number" id="${this.id}DIRRCA-2+" value = "49" class="textBox">
                    <hr class="innerHr">
                    <p class="text">DIR COMP LIMIT</p>
                    <input type="number" id="${this.id}DIRCOMPLIMIT-2+" value = "71" class="textBox">
                    <hr class="innerHr">
                    <p class="text">RGT BLD</p>
                    <input type="number" id="${this.id}RGTBLD-2+" class="textBox">
                    <hr class="innerHr">
                    <p class="text">RGT BLD RCA</p>
                    <input type="number" id="${this.id}RGTBLDRCA-2+" value = "80" class="textBox">
                    <hr class="innerHr">
                    <p class="text">LFT BLD</p>
                    <input type="number" id="${this.id}LFTBLD-2+" class="textBox">
                    <hr class="innerHr">
                    <p class="text">LFT BLD RCA</p>
                    <input type="number" id="${this.id}LFTBLDRCA-2+" value = "90" class="textBox">
                    <hr class="innerHr">                    
                </div>
                <div class="innerBox">
                    <h1 class="text">Ground</h1>
                    <hr class="innerHr">
                    <p class="text">REACH</p>
                    <input type="number" id="${this.id}REACH-1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">RCA</p>
                    <input type="number" id="${this.id}RCA-1" value = "90" class="textBox">
                    <hr class="innerHr">
                    <p class="text">COMP LIMIT</p>
                    <input type="number" id="${this.id}COMPLIMIT-1" value = "90" class="textBox">
                    <hr class="innerHr">
                    <p class="text">DIR RCA</p>
                    <input type="number" id="${this.id}DIRRCA-1" value = "49" class="textBox">
                    <hr class="innerHr">
                    <p class="text">DIR COMP LIMIT</p>
                    <input type="number" id="${this.id}DIRCOMPLIMIT-1" value = "71" class="textBox">
                    <hr class="innerHr">
                    <p class="text">RGT BLD</p>
                    <input type="number" id="${this.id}RGTBLD-1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">RGT BLD RCA</p>
                    <input type="number" id="${this.id}RGTBLDRCA-1" value = "80" class="textBox">
                    <hr class="innerHr">
                    <p class="text">LFT BLD</p>
                    <input type="number" id="${this.id}LFTBLD-1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">LFT BLD RCA</p>
                    <input type="number" id="${this.id}LFTBLDRCA-1" value = "90" class="textBox">
                    <hr class="innerHr">                    
                </div>
                <p class="text">Dir</p>
                    <div class="direction">
                        <label>
                            <input type="checkbox" id="${this.id}Dir" value="1">
                            <span>Reverse</span>
                            Forward
                        </label>
                    </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let REACH = is1F ? Number(document.getElementById(this.id + "REACH-1").value) : Number(document.getElementById(this.id + "REACH-2+").value);
                let RCA = is1F ? Number(document.getElementById(this.id + "RCA-1").value) : Number(document.getElementById(this.id + "RCA-2+").value);
                let COMP_LIMIT = is1F ? Number(document.getElementById(this.id + "COMPLIMIT-1").value) : Number(document.getElementById(this.id + "COMPLIMIT-2+").value);
                let DIR_RCA = is1F ? Number(document.getElementById(this.id + "DIRRCA-1").value) : Number(document.getElementById(this.id + "DIRRCA-2+").value);
                let DIR_COMP_LIMIT = is1F ? Number(document.getElementById(this.id + "DIRCOMPLIMIT-1").value) : Number(document.getElementById(this.id + "DIRCOMPLIMIT-2+").value);
                let RGT_BLD = is1F ? Number(document.getElementById(this.id + "RGTBLD-1").value) : Number(document.getElementById(this.id + "RGTBLD-2+").value);
                let RGT_BLD_RCA = is1F ? Number(document.getElementById(this.id + "RGTBLDRCA-1").value) : Number(document.getElementById(this.id + "RGTBLDRCA-2+").value);
                let LFT_BLD = is1F ? Number(document.getElementById(this.id + "LFTBLD-1").value) : Number(document.getElementById(this.id + "LFTBLD-2+").value);
                let LFT_BLD_RCA = is1F ? Number(document.getElementById(this.id + "LFTBLDRCA-1").value) : Number(document.getElementById(this.id + "LFTBLDRCA-2+").value);

                let Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;


                let X1;
                let Y1;
                let X2;
                let Y2;
                let X3;
                let Y3;
                let X4;
                let Y4;
                let X5;
                let Y5;
            
                X3 = Dir * REACH * Math.cos(RCA / 180 * Math.PI);
                Y3 = Dir * REACH * Math.sin(RCA / 180 * Math.PI);
                let C1 = Dir * Math.tan(LFT_BLD_RCA / 180 * Math.PI) * LFT_BLD / (Math.tan((DIR_RCA + DIR_COMP_LIMIT) / 180 * Math.PI) - Math.tan(LFT_BLD_RCA / 180 * Math.PI));
                let C2 = Dir * (-Math.tan((RCA - COMP_LIMIT) / 180 * Math.PI) * X3 + Dir * Y3) / (Math.tan((DIR_RCA + DIR_COMP_LIMIT) / 180 * Math.PI) - Math.tan((RCA - COMP_LIMIT) / 180 * Math.PI));
                X1 = Math.abs(C2) < Math.abs(C1) ? C2 : C1;
                let C3 = Dir * Math.abs(C1 * Math.tan((DIR_RCA + DIR_COMP_LIMIT) / 180 * Math.PI));
                let C4 = Dir * (Math.tan((RCA - COMP_LIMIT) / 180 * Math.PI) * (C2 - C1) + Dir * Y3);
                Y1 = Math.abs(C4) < Math.abs(C3) ? C4 : C3;
                let C5 = Dir * (Math.tan((LFT_BLD_RCA) / 180 * Math.PI) * LFT_BLD + Math.tan((RCA - COMP_LIMIT) / 180 * Math.PI) * X3 - Dir * Y3) / (Math.tan((RCA - COMP_LIMIT) / 180 * Math.PI) -Math.tan((LFT_BLD_RCA) / 180 * Math.PI));
                X2 = Math.abs(C5) > Math.abs(X1) ? X1 : C5;
                Y2 = Dir * Math.abs((Math.tan((RCA - COMP_LIMIT) / 180 * Math.PI) * (X2 - X3) + Y3));
                X4 = Dir * (Math.tan((RGT_BLD_RCA) / 180 * Math.PI) * RGT_BLD + Math.tan((180 - RCA - COMP_LIMIT) / 180 * Math.PI) * X3 + Dir * Y3) / (Math.tan((180 - RCA - COMP_LIMIT) / 180 * Math.PI) + Math.tan((RGT_BLD_RCA) / 180 * Math.PI));
                let C6 = COMP_LIMIT < DIR_RCA ? -1 : 1;
                Y4 = Dir * Math.abs((-(Dir * X4 - X3) * Math.tan((180 - C6 * RCA - COMP_LIMIT) / 180 * Math.PI) + Dir * Y3));
                X5 = Dir * RGT_BLD * Math.tan((RGT_BLD_RCA) / 180 * Math.PI) / (Math.tan((RGT_BLD_RCA) / 180 * Math.PI) - Math.tan((360 - (DIR_COMP_LIMIT - DIR_RCA)) / 180 * Math.PI));
                let C7 = -Dir * Math.abs(Math.tan((180 - (DIR_COMP_LIMIT - DIR_RCA)) / 180 * Math.PI) * X5);
                Y5 = DIR_RCA > DIR_COMP_LIMIT ? -C7 : C7;

                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.moveTo(centX, centY);
                ctx.lineTo(centX + (X1 * mult), centY - (Y1 * mult));
                ctx.lineTo(centX + (X2 * mult), centY - (Y2 * mult));
                ctx.lineTo(centX + (X3 * mult), centY - (Y3 * mult));
                ctx.lineTo(centX + (X4 * mult), centY - (Y4 * mult));
                ctx.lineTo(centX + (X5 * mult), centY - (Y5 * mult));
                ctx.lineTo(centX, centY);
            
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    L60LE(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">Reach</p>
                <input type="number" id="${this.id}Reach" class="textBox">
                <hr class="innerHr">
                <p class="text">Angle</p>
                <input type="number" id="${this.id}Angle" class="textBox">
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let Reach = Number(document.getElementById(this.id + "Reach").value);
                let Angle = Number(document.getElementById(this.id + "Angle").value);

                let AX1 = -(canvas.width / mult);
                let AY1 = AX1 * Math.tan(Angle * Math.PI / 180);
                let AX2 = -Reach * Math.cos(Angle * Math.PI / 180);
                let AY2 = -Reach * Math.sin(Angle * Math.PI / 180);

                let A1 = new Complex();
                A1.setRectangular(AX2, AY2);

                let AX3 = -Reach * Math.cos(Angle * Math.PI / 180);
                let AY3 = Reach * Math.sin(Angle * Math.PI / 180);
                let AX4 = -(canvas.width / mult);
                let AY4 = -AX1 * Math.tan(Angle * Math.PI / 180);

                let A2 = new Complex();
                A2.setRectangular(AX4, AY4);

                let BX1 = (canvas.width / mult);
                let BY1 = -AX1 * Math.tan(Angle * Math.PI / 180);
                let BX2 = Reach * Math.cos(Angle * Math.PI / 180);
                let BY2 = Reach * Math.sin(Angle * Math.PI / 180);

                let B1 = new Complex();
                B1.setRectangular(BX2, BY2);

                let BX3 = Reach * Math.cos(Angle * Math.PI / 180);
                let BY3 = -Reach * Math.sin(Angle * Math.PI / 180);
                let BX4 = (canvas.width / mult);
                let BY4 = AX1 * Math.tan(Angle * Math.PI / 180);

                let B2 = new Complex();
                B2.setRectangular(BX4, BY4);
            
                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
            
                ctx.moveTo(centX + (AX1 * mult), centY - (AY1 * mult));
                ctx.lineTo(centX + (AX2 * mult), centY - (AY2 * mult));
                ctx.arc(centX, centY, Reach * mult, (A2.f) / 180 * Math.PI, (A1.f) / 180 * Math.PI)
                ctx.lineTo(centX + (AX3 * mult), centY - (AY3 * mult));
                ctx.lineTo(centX + (AX4 * mult), centY - (AY4 * mult));

                ctx.moveTo(centX + (BX4 * mult), centY - (BY4 * mult));
                ctx.lineTo(centX + (BX3 * mult), centY - (BY3 * mult));
                ctx.arc(centX, centY, Reach * mult, (B1.f) / 180 * Math.PI, (B2.f) / 180 * Math.PI, true)
                ctx.lineTo(centX + (BX2 * mult), centY - (BY2 * mult));
                ctx.lineTo(centX + (BX1 * mult), centY - (BY1 * mult));
            
                ctx.stroke();
                //document.getElementById(this.id + "Angle").value = Number(document.getElementById(this.id + "Angle").value) + 0.1
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    LI(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">Ω</p>
                <input type="number" id="${this.id}Om" class="textBox">
                <p class="text">Deg</p>
                <input type="number" id="${this.id}Deg" class="textBox">
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let liOm = Number(document.getElementById(this.id + "Om").value);
                let liDeg = Number(document.getElementById(this.id + "Deg").value);

                let liR = liOm * Math.cos(liDeg / 180 * Math.PI);
                let liX = liOm * Math.sin(liDeg / 180 * Math.PI);
        
                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.moveTo(centX, centY);
                ctx.lineTo(centX + (liR * mult), centY - (liX * mult));
            
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    HARZONE(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <div class="innerBox">
                    <h1 class="text">Phase</h1>
                    <hr class="innerHr">
                    <p class="text">R1</p>
                    <input type="number" id="${this.id}R1_2" class="textBox">
                    <hr class="innerHr">
                    <p class="text">X1</p>
                    <input type="number" id="${this.id}X1_2" class="textBox">
                    <hr class="innerHr">
                    <p class="text">R2</p>
                    <input type="number" id="${this.id}R2_2" class="textBox">
                    <hr class="innerHr">
                    <p class="text">X2</p>
                    <input type="number" id="${this.id}X2_2" class="textBox">
                    <hr class="innerHr">
                    <p class="text">R3</p>
                    <input type="number" id="${this.id}R3_2"class="textBox">
                    <hr class="innerHr">
                    <p class="text">X3</p>
                    <input type="number" id="${this.id}X3_2" class="textBox">
                    <hr class="innerHr">
                    <p class="text">R4</p>
                    <input type="number" id="${this.id}R4_2" class="textBox">
                    <hr class="innerHr">
                    <p class="text">X4</p>
                    <input type="number" id="${this.id}X4_2" class="textBox">
                                        <hr class="innerHr">                    
                </div>
                <div class="innerBox">
                    <h1 class="text">Ground</h1>
                    <hr class="innerHr">
                    <p class="text">R1</p>
                    <input type="number" id="${this.id}R1_1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">X1</p>
                    <input type="number" id="${this.id}X1_1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">R2</p>
                    <input type="number" id="${this.id}R2_1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">X2</p>
                    <input type="number" id="${this.id}X2_1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">R3</p>
                    <input type="number" id="${this.id}R3_1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">X3</p>
                    <input type="number" id="${this.id}X3_1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">R4</p>
                    <input type="number" id="${this.id}R4_1" class="textBox">
                    <hr class="innerHr">
                    <p class="text">X4</p>
                    <input type="number" id="${this.id}X4_1" class="textBox">
                    <hr class="innerHr">                    
                </div>
                <p class="text">Dir</p>
                    <div class="direction">
                        <label>
                            <input type="checkbox" id="${this.id}Dir" value="1">
                            <span>Reverse</span>
                            Forward
                        </label>
                    </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;
//
                let Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;

                let X1 = is1F ? Number(document.getElementById(this.id + "R1_1").value) : Number(document.getElementById(this.id + "R1_2").value);
                let Y1 = is1F ? Number(document.getElementById(this.id + "X1_1").value) : Number(document.getElementById(this.id + "X1_2").value);
                let X2 = is1F ? Number(document.getElementById(this.id + "R2_1").value) : Number(document.getElementById(this.id + "R2_2").value);
                let Y2 = is1F ? Number(document.getElementById(this.id + "X2_1").value) : Number(document.getElementById(this.id + "X2_2").value);
                let X3 = is1F ? Number(document.getElementById(this.id + "R3_1").value) : Number(document.getElementById(this.id + "R3_2").value);
                let Y3 = is1F ? Number(document.getElementById(this.id + "X3_1").value) : Number(document.getElementById(this.id + "X3_2").value);
                let X4 = is1F ? Number(document.getElementById(this.id + "R4_1").value) : Number(document.getElementById(this.id + "R4_2").value);
                let Y4 = is1F ? Number(document.getElementById(this.id + "X4_1").value) : Number(document.getElementById(this.id + "X4_2").value);
             
               X1 = X1 * Dir;
               Y1 = Y1 * Dir;
               X2 = X2 * Dir;
               Y2 = Y2 * Dir;
               X3 = X3 * Dir;
               Y3 = Y3 * Dir;
               X4 = X4 * Dir;
               Y4 = Y4 * Dir;

                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.lineTo(centX + (X1 * mult), centY - (Y1 * mult));
                ctx.lineTo(centX + (X2 * mult), centY - (Y2 * mult));
                ctx.lineTo(centX + (X3 * mult), centY - (Y3 * mult));
                ctx.lineTo(centX + (X4 * mult), centY - (Y4 * mult));
                ctx.lineTo(centX + (X1 * mult), centY - (Y1 * mult));
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    DZ2KPS123IC(){
        this.links.push(new ExponentialLink(this.id + "UAkV", this.id + "UADeg", "UA", "kV"));
        this.links.push(new ExponentialLink(this.id + "UBkV", this.id + "UBDeg", "UB", "kV"));
        this.links.push(new ExponentialLink(this.id + "UCkV", this.id + "UCDeg", "UC", "kV"));

        this.links.push(new ExponentialLink(this.id + "IAkA", this.id + "IADeg", "IA", "kA"));
        this.links.push(new ExponentialLink(this.id + "IBkA", this.id + "IBDeg", "IB", "kA"));
        this.links.push(new ExponentialLink(this.id + "ICkA", this.id + "ICDeg", "IC", "kA"));

        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
            <h1 class="text">${this.name}</h1>
            <div class="innerBox">
                <h1 class="text">A</h1>
                <div id="${this.id}UA">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UAkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UADeg" class="textBox">
                </div>
                <div id="${this.id}IA">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IAkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IADeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}AColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}AR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}AX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">B</h1>
                <div id="${this.id}UB">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UBkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UBDeg" class="textBox">
                </div>
                <div id="${this.id}IB">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IBkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IBDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}BColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}BR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}BX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">C</h1>
                <div id="${this.id}UC">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UCkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UCDeg" class="textBox">
                </div>
                <div id="${this.id}IC">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}ICkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}ICDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}CColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}CR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}CX" class="textBox"></div>
            </div>
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                document.getElementById(this.id + "UA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                let uaKv = Number(document.getElementById(this.id + "UAkV").value);
                let ubKv = Number(document.getElementById(this.id + "UBkV").value);
                let ucKv = Number(document.getElementById(this.id + "UCkV").value);
                
                let uaDeg = Number(document.getElementById(this.id + "UADeg").value);
                let ubDeg = Number(document.getElementById(this.id + "UBDeg").value);
                let ucDeg = Number(document.getElementById(this.id + "UCDeg").value);
                
                let iaKv = Number(document.getElementById(this.id + "IAkA").value);
                let ibKv = Number(document.getElementById(this.id + "IBkA").value);
                let icKv = Number(document.getElementById(this.id + "ICkA").value);
                
                let iaDeg = Number(document.getElementById(this.id + "IADeg").value);
                let ibDeg = Number(document.getElementById(this.id + "IBDeg").value);
                let icDeg = Number(document.getElementById(this.id + "ICDeg").value);
                
                
                let ua = new Complex();
                let ub = new Complex();
                let uc = new Complex();
                
                ua.setExponntial(uaKv, uaDeg);
                ub.setExponntial(ubKv, ubDeg);
                uc.setExponntial(ucKv, ucDeg);
                
                let uab = new Complex();
                let ubc = new Complex();
                let uac = new Complex();
                
                uab.minus(ua, ub);
                ubc.minus(ub, uc);
                uac.minus(ua, uc);
                
                let ia = new Complex();
                let ib = new Complex();
                let ic = new Complex();
                
                ia.setExponntial(iaKv, iaDeg);
                ib.setExponntial(ibKv, ibDeg);
                ic.setExponntial(icKv, icDeg);
                
                let iab = new Complex();
                let ibc = new Complex();
                let iac = new Complex();
                
                iab.minus(ia, ib);
                ibc.minus(ib, ic);
                iac.minus(ia, ic);
                
                let zab = new Complex();
                let zbc = new Complex();
                let zac = new Complex();
                
                zab.decrease(uab, iab);
                zbc.decrease(ubc, ibc);
                zac.decrease(uac, iac);
                
                let zabOm = zab.a;
                let zabDeg = zab.f;
                
                let zbcOm = zbc.a;
                let zbcDeg = zbc.f;
                
                let zacOm = zac.a;
                let zacDeg = zac.f;
                
                let ax;
                let ay;
                
                let bx;
                let by;
                
                let cx;
                let cy;


                if(is1F){
                    ax = za.r;
                    ay = za.i;
                    
                    bx = zb.r;
                    by = zb.i;
                    
                    cx = zc.r;
                    cy = zc.i;
                            
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                if(is2F||is3F){
                    ax = zab.r;
                    ay = zab.i;
                    
                    bx = zbc.r;
                    by = zbc.i;
                    
                    cx = zac.r;
                    cy = zac.i;
                            
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                document.getElementById(this.id + "AR").innerHTML = ax;
                document.getElementById(this.id + "AX").innerHTML = ay;

                document.getElementById(this.id + "BR").innerHTML = bx;
                document.getElementById(this.id + "BX").innerHTML = by;

                document.getElementById(this.id + "CR").innerHTML = cx;
                document.getElementById(this.id + "CX").innerHTML = cy;
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            let ctx = canvas.getContext("2d");

            if(this.isEnable){
                ctx.font = "15px Arial";
                if(is1F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za0", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb0", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc0", 10, startY + 40, maxWidth - 10);
                }
                if(is2F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Zab", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zbc", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zac", 10, startY + 40, maxWidth - 10);
                }
                if(is3F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc", 10, startY + 40, maxWidth - 10);
                }
                return 60;
            }
            return 0;
        }
        this.defineElement();
    }
    ABBIC(){
        this.links.push(new ExponentialLink(this.id + "UAkV", this.id + "UADeg", "UA", "kV"));
        this.links.push(new ExponentialLink(this.id + "UBkV", this.id + "UBDeg", "UB", "kV"));
        this.links.push(new ExponentialLink(this.id + "UCkV", this.id + "UCDeg", "UC", "kV"));

        this.links.push(new ExponentialLink(this.id + "IAkA", this.id + "IADeg", "IA", "kA"));
        this.links.push(new ExponentialLink(this.id + "IBkA", this.id + "IBDeg", "IB", "kA"));
        this.links.push(new ExponentialLink(this.id + "ICkA", this.id + "ICDeg", "IC", "kA"));

        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
            <h1 class="text">${this.name}</h1>
            <div class="innerBox">
                <h1 class="text">A</h1>
                <div id="${this.id}UA">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UAkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UADeg" class="textBox">
                </div>
                <div id="${this.id}IA">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IAkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IADeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}AColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}AR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}AX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">B</h1>
                <div id="${this.id}UB">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UBkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UBDeg" class="textBox">
                </div>
                <div id="${this.id}IB">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IBkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IBDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}BColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}BR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}BX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">C</h1>
                <div id="${this.id}UC">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UCkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UCDeg" class="textBox">
                </div>
                <div id="${this.id}IC">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}ICkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}ICDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}CColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}CR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}CX" class="textBox"></div>
            </div>
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                document.getElementById(this.id + "UA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                let uaKv = Number(document.getElementById(this.id + "UAkV").value);
                let ubKv = Number(document.getElementById(this.id + "UBkV").value);
                let ucKv = Number(document.getElementById(this.id + "UCkV").value);
                
                let uaDeg = Number(document.getElementById(this.id + "UADeg").value);
                let ubDeg = Number(document.getElementById(this.id + "UBDeg").value);
                let ucDeg = Number(document.getElementById(this.id + "UCDeg").value);
                
                let iaKv = Number(document.getElementById(this.id + "IAkA").value);
                let ibKv = Number(document.getElementById(this.id + "IBkA").value);
                let icKv = Number(document.getElementById(this.id + "ICkA").value);
                
                let iaDeg = Number(document.getElementById(this.id + "IADeg").value);
                let ibDeg = Number(document.getElementById(this.id + "IBDeg").value);
                let icDeg = Number(document.getElementById(this.id + "ICDeg").value);
                
                
                let ua = new Complex();
                let ub = new Complex();
                let uc = new Complex();
                
                ua.setExponntial(uaKv, uaDeg);
                ub.setExponntial(ubKv, ubDeg);
                uc.setExponntial(ucKv, ucDeg);
                
                let uab = new Complex();
                let ubc = new Complex();
                let uac = new Complex();
                
                uab.minus(ua, ub);
                ubc.minus(ub, uc);
                uac.minus(ua, uc);
                
                let ia = new Complex();
                let ib = new Complex();
                let ic = new Complex();
                
                ia.setExponntial(iaKv, iaDeg);
                ib.setExponntial(ibKv, ibDeg);
                ic.setExponntial(icKv, icDeg);
                
                let iab = new Complex();
                let ibc = new Complex();
                let iac = new Complex();
                
                iab.minus(ia, ib);
                ibc.minus(ib, ic);
                iac.minus(ia, ic);
                
                let zab = new Complex();
                let zbc = new Complex();
                let zac = new Complex();
                
                zab.decrease(uab, iab);
                zbc.decrease(ubc, ibc);
                zac.decrease(uac, iac);
                
                let zabOm = zab.a;
                let zabDeg = zab.f;
                
                let zbcOm = zbc.a;
                let zbcDeg = zbc.f;
                
                let zacOm = zac.a;
                let zacDeg = zac.f;

                let za = new Complex();
                let zb = new Complex();
                let zc = new Complex();
                
                za.decrease(ua, ia);
                zb.decrease(ub, ib);
                zc.decrease(uc, ic);

                let ax;
                let ay;
                
                let bx;
                let by;
                
                let cx;
                let cy;


                if(is1F){
                    ax = za.r;
                    ay = za.i;
                    
                    bx = zb.r;
                    by = zb.i;
                    
                    cx = zc.r;
                    cy = zc.i;
                            
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                if(is2F||is3F){
                    ax = zab.r;
                    ay = zab.i;
                    
                    bx = zbc.r;
                    by = zbc.i;
                    
                    cx = zac.r;
                    cy = zac.i;
                            
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }

                document.getElementById(this.id + "AR").innerHTML = ax;
                document.getElementById(this.id + "AX").innerHTML = ay;

                document.getElementById(this.id + "BR").innerHTML = bx;
                document.getElementById(this.id + "BX").innerHTML = by;

                document.getElementById(this.id + "CR").innerHTML = cx;
                document.getElementById(this.id + "CX").innerHTML = cy;
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            let ctx = canvas.getContext("2d");

            if(this.isEnable){
                ctx.font = "15px Arial";
                if(is1F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za0", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb0", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc0", 10, startY + 40, maxWidth - 10);
                }
                if(is2F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Zab", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zbc", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zac", 10, startY + 40, maxWidth - 10);
                }
                if(is3F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc", 10, startY + 40, maxWidth - 10);
                }
                return 60;
            }
            return 0;
        }
        this.defineElement();
    }
    SIMIC(){
        this.links.push(new ExponentialLink(this.id + "UAkV", this.id + "UADeg", "UA", "kV"));
        this.links.push(new ExponentialLink(this.id + "UBkV", this.id + "UBDeg", "UB", "kV"));
        this.links.push(new ExponentialLink(this.id + "UCkV", this.id + "UCDeg", "UC", "kV"));

        this.links.push(new ExponentialLink(this.id + "IAkA", this.id + "IADeg", "IA", "kA"));
        this.links.push(new ExponentialLink(this.id + "IBkA", this.id + "IBDeg", "IB", "kA"));
        this.links.push(new ExponentialLink(this.id + "ICkA", this.id + "ICDeg", "IC", "kA"));

        this.links.push(new ExponentialLink(this.id + "3I0kA", this.id + "3I0Deg", "3I0", "kA"));

        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
            <h1 class="text">${this.name}</h1>
            <div class="innerBox">
                <h1 class="text">A</h1>
                <div id="${this.id}UA">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UAkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UADeg" class="textBox">
                </div>
                <div id="${this.id}IA">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IAkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IADeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}AColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}AR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}AX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">B</h1>
                <div id="${this.id}UB">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UBkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UBDeg" class="textBox">
                </div>
                <div id="${this.id}IB">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IBkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IBDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}BColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}BR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}BX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">C</h1>
                <div id="${this.id}UC">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UCkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UCDeg" class="textBox">
                </div>
                <div id="${this.id}IC">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}ICkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}ICDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}CColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}CR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}CX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">3I0</h1>
                <div id="${this.id}3I0">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}3I0kA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}3I0Deg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Kr</p>
                <input type="number" id="${this.id}Kr" class="textBox">
                <p class="text">Kx</p>
                <input type="number" id="${this.id}Kx" class="textBox">
                <hr class="innerHr">
                <p class="text">Inverse</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>-1</span>
                        1
                    </label>
                </div>
            </div>
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");  
                ctx.lineWidth = 3;

                document.getElementById(this.id + "UA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                document.getElementById(this.id + "3I0").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                let uaKv = Number(document.getElementById(this.id + "UAkV").value);
                let ubKv = Number(document.getElementById(this.id + "UBkV").value);
                let ucKv = Number(document.getElementById(this.id + "UCkV").value);
                
                let uaDeg = Number(document.getElementById(this.id + "UADeg").value);
                let ubDeg = Number(document.getElementById(this.id + "UBDeg").value);
                let ucDeg = Number(document.getElementById(this.id + "UCDeg").value);
                
                let iaKv = Number(document.getElementById(this.id + "IAkA").value);
                let ibKv = Number(document.getElementById(this.id + "IBkA").value);
                let icKv = Number(document.getElementById(this.id + "ICkA").value);
                
                let iaDeg = Number(document.getElementById(this.id + "IADeg").value);
                let ibDeg = Number(document.getElementById(this.id + "IBDeg").value);
                let icDeg = Number(document.getElementById(this.id + "ICDeg").value);
        
                let ka3I0 = Number(document.getElementById(this.id + "3I0kA").value);
                let Deg3I0 = Number(document.getElementById(this.id + "3I0Deg").value);
                let Source3I0 = document.getElementById(this.id + "Dir").checked ? -1 : 1;
                let Kr3I0 = Number(document.getElementById(this.id + "Kr").value);
                let Kx3I0 = Number(document.getElementById(this.id + "Kx").value);
                
                
                let ua = new Complex();
                let ub = new Complex();
                let uc = new Complex();
                
                ua.setExponntial(uaKv, uaDeg);
                ub.setExponntial(ubKv, ubDeg);
                uc.setExponntial(ucKv, ucDeg);
        
                let ia = new Complex();
                let ib = new Complex();
                let ic = new Complex();
                
                ia.setExponntial(iaKv, iaDeg);
                ib.setExponntial(ibKv, ibDeg);
                ic.setExponntial(icKv, icDeg);
        
                let za = new Complex();
                let zb = new Complex();
                let zc = new Complex();
                
                za.decrease(ua, ia);
                zb.decrease(ub, ib);
                zc.decrease(uc, ic);
        
                        
                let uab = new Complex();
                let ubc = new Complex();
                let uac = new Complex();
                
                uab.minus(ua, ub);
                ubc.minus(ub, uc);
                uac.minus(ua, uc);
                
                let iab = new Complex();
                let ibc = new Complex();
                let iac = new Complex();
                
                iab.minus(ia, ib);
                ibc.minus(ib, ic);
                iac.minus(ia, ic);
                
                let zab = new Complex();
                let zbc = new Complex();
                let zac = new Complex();
                
                zab.decrease(uab, iab);
                zbc.decrease(ubc, ibc);
                zac.decrease(uac, iac);
                
                let zabOm = zab.a;
                let zabDeg = zab.f;
                
                let zbcOm = zbc.a;
                let zbcDeg = zbc.f;
                
                let zacOm = zac.a;
                let zacDeg = zac.f;
                
                let ax;
                let ay; 
        
                let bx;
                let by;
        
                let cx;
                let cy;
                if(is1F){
                    ax = uaKv * (Math.cos((uaDeg - iaDeg) / 180 * Math.PI) + Source3I0 * Kx3I0 * ka3I0 * Math.cos((uaDeg - Deg3I0) / 180 * Math.PI) / iaKv) / (iaKv * (1 + Source3I0 * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((iaDeg - Deg3I0) / 180 * Math.PI) / iaKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (iaKv * iaKv)));
                    ay = uaKv * (Math.sin((uaDeg - iaDeg) / 180 * Math.PI) + Source3I0 * Kr3I0 * ka3I0 * Math.sin((uaDeg - Deg3I0) / 180 * Math.PI) / iaKv) / (iaKv * (1 + Source3I0 * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((iaDeg - Deg3I0) / 180 * Math.PI) / iaKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (iaKv * iaKv)));
                    
                    bx = ubKv * (Math.cos((ubDeg - ibDeg) / 180 * Math.PI) + Source3I0 * Kx3I0 * ka3I0 * Math.cos((ubDeg - Deg3I0) / 180 * Math.PI) / ibKv) / (ibKv * (1 + Source3I0 * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((ibDeg - Deg3I0) / 180 * Math.PI) / ibKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (ibKv * ibKv)));
                    by = ubKv * (Math.sin((ubDeg - ibDeg) / 180 * Math.PI) + Source3I0 * Kr3I0 * ka3I0 * Math.sin((ubDeg - Deg3I0) / 180 * Math.PI) / ibKv) / (ibKv * (1 + Source3I0 * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((ibDeg - Deg3I0) / 180 * Math.PI) / ibKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (ibKv * ibKv)));
        
                    cx = ucKv * (Math.cos((ucDeg - icDeg) / 180 * Math.PI) + Source3I0 * Kx3I0 * ka3I0 * Math.cos((ucDeg - Deg3I0) / 180 * Math.PI) / icKv) / (icKv * (1 + Source3I0 * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((icDeg - Deg3I0) / 180 * Math.PI) / icKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (icKv * icKv)));
                    cy = ucKv * (Math.sin((ucDeg - icDeg) / 180 * Math.PI) + Source3I0 * Kr3I0 * ka3I0 * Math.sin((ucDeg - Deg3I0) / 180 * Math.PI) / icKv) / (icKv * (1 + Source3I0 * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((icDeg - Deg3I0) / 180 * Math.PI) / icKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (icKv * icKv)));
                    
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                else if(is2F){
                    ax = zab.r;
                    ay = zab.i;
                    
                    bx = zbc.r;
                    by = zbc.i;
                    
                    cx = zac.r;
                    cy = zac.i;
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                else if(is3F){
                    ax = za.r;
                    ay = za.i;
                    
                    bx = zb.r;
                    by = zb.i;
                    
                    cx = zc.r;
                    cy = zc.i;
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                document.getElementById(this.id + "AR").innerHTML = ax;
                document.getElementById(this.id + "AX").innerHTML = ay;

                document.getElementById(this.id + "BR").innerHTML = bx;
                document.getElementById(this.id + "BX").innerHTML = by;

                document.getElementById(this.id + "CR").innerHTML = cx;
                document.getElementById(this.id + "CX").innerHTML = cy;
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            let ctx = canvas.getContext("2d");

            if(this.isEnable){
                ctx.font = "15px Arial";
                if(is1F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za0", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb0", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc0", 10, startY + 40, maxWidth - 10);
                }
                if(is2F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Zab", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zbc", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zac", 10, startY + 40, maxWidth - 10);
                }
                if(is3F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc", 10, startY + 40, maxWidth - 10);
                }
                return 60;
            }
            return 0;
        }
        this.defineElement();
    }
    L60IC(){
        this.links.push(new ExponentialLink(this.id + "UAkV", this.id + "UADeg", "UA", "kV"));
        this.links.push(new ExponentialLink(this.id + "UBkV", this.id + "UBDeg", "UB", "kV"));
        this.links.push(new ExponentialLink(this.id + "UCkV", this.id + "UCDeg", "UC", "kV"));

        this.links.push(new ExponentialLink(this.id + "IAkA", this.id + "IADeg", "IA", "kA"));
        this.links.push(new ExponentialLink(this.id + "IBkA", this.id + "IBDeg", "IB", "kA"));
        this.links.push(new ExponentialLink(this.id + "ICkA", this.id + "ICDeg", "IC", "kA"));

        this.links.push(new ExponentialLink(this.id + "3I0kA", this.id + "3I0Deg", "3I0", "kA"));

        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
            <h1 class="text">${this.name}</h1>
            <div class="innerBox">
                <h1 class="text">A</h1>
                <div id="${this.id}UA">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UAkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UADeg" class="textBox">
                </div>
                <div id="${this.id}IA">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IAkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IADeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}AColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}AR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}AX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">B</h1>
                <div id="${this.id}UB">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UBkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UBDeg" class="textBox">
                </div>
                <div id="${this.id}IB">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IBkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IBDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}BColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}BR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}BX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">C</h1>
                <div id="${this.id}UC">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UCkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UCDeg" class="textBox">
                </div>
                <div id="${this.id}IC">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}ICkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}ICDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}CColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}CR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}CX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">3I0</h1>
                <div id="${this.id}3I0">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}3I0kA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}3I0Deg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Z1/Z0 MAG</p>
                <input type="number" id="${this.id}Z1/Z0MAG" class="textBox">
                <p class="text">Z1/Z0 ANG</p>
                <input type="number" id="${this.id}Z1/Z0ANG" class="textBox">
                <hr class="innerHr">
                <p class="text">Inverse</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>-1</span>
                        1
                    </label>
                </div>
            </div>
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");  
                ctx.lineWidth = 3;

                document.getElementById(this.id + "UA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                document.getElementById(this.id + "3I0").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                let uaKv = Number(document.getElementById(this.id + "UAkV").value);
                let ubKv = Number(document.getElementById(this.id + "UBkV").value);
                let ucKv = Number(document.getElementById(this.id + "UCkV").value);
                
                let uaDeg = Number(document.getElementById(this.id + "UADeg").value);
                let ubDeg = Number(document.getElementById(this.id + "UBDeg").value);
                let ucDeg = Number(document.getElementById(this.id + "UCDeg").value);
                
                let iaKv = Number(document.getElementById(this.id + "IAkA").value);
                let ibKv = Number(document.getElementById(this.id + "IBkA").value);
                let icKv = Number(document.getElementById(this.id + "ICkA").value);
                
                let iaDeg = Number(document.getElementById(this.id + "IADeg").value);
                let ibDeg = Number(document.getElementById(this.id + "IBDeg").value);
                let icDeg = Number(document.getElementById(this.id + "ICDeg").value);
        
                let ka3I0 = Number(document.getElementById(this.id + "3I0kA").value);
                let Deg3I0 = Number(document.getElementById(this.id + "3I0Deg").value);
                let Z1Z0MAG = Number(document.getElementById(this.id + "Z1/Z0MAG").value);
                let Z1Z0ANG = Number(document.getElementById(this.id + "Z1/Z0ANG").value);

                let Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;
                
                
                let ua = new Complex();
                let ub = new Complex();
                let uc = new Complex();
                
                ua.setExponntial(uaKv, uaDeg);
                ub.setExponntial(ubKv, ubDeg);
                uc.setExponntial(ucKv, ucDeg);
        
                let ia = new Complex();
                let ib = new Complex();
                let ic = new Complex();
                
                ia.setExponntial(iaKv, iaDeg);
                ib.setExponntial(ibKv, ibDeg);
                ic.setExponntial(icKv, icDeg);
        
                let za = new Complex();
                let zb = new Complex();
                let zc = new Complex();
                
                za.decrease(ua, ia);
                zb.decrease(ub, ib);
                zc.decrease(uc, ic);
        
                        
                let uab = new Complex();
                let ubc = new Complex();
                let uac = new Complex();
                
                uab.minus(ua, ub);
                ubc.minus(ub, uc);
                uac.minus(ua, uc);
                
                let iab = new Complex();
                let ibc = new Complex();
                let iac = new Complex();
                
                iab.minus(ia, ib);
                ibc.minus(ib, ic);
                iac.minus(ia, ic);
                
                let zab = new Complex();
                let zbc = new Complex();
                let zac = new Complex();
                
                zab.decrease(uab, iab);
                zbc.decrease(ubc, ibc);
                zac.decrease(uac, iac);
                
                let zabOm = zab.a;
                let zabDeg = zab.f;
                
                let zbcOm = zbc.a;
                let zbcDeg = zbc.f;
                
                let zacOm = zac.a;
                let zacDeg = zac.f;

                let _3I0 = new Complex();

                _3I0.setExponntial(ka3I0, Deg3I0);

                let Z1Z0 = new Complex();
                Z1Z0.setExponntial(Z1Z0MAG, Z1Z0ANG);
                Z1Z0.setRectangular((Z1Z0.r - 1) / 3, Z1Z0.i / 3);
                Z1Z0.increase(Z1Z0, _3I0);
                Z1Z0.setRectangular(Z1Z0.r * Dir, Z1Z0.i * Dir);

                let iaZ1Z0 = new Complex();
                let ibZ1Z0 = new Complex();
                let icZ1Z0 = new Complex();

                iaZ1Z0.plus(ia, Z1Z0);
                ibZ1Z0.plus(ib, Z1Z0);
                icZ1Z0.plus(ic, Z1Z0);

                let zaZ1Z0 = new Complex();
                let zbZ1Z0 = new Complex();
                let zcZ1Z0 = new Complex();

                zaZ1Z0.decrease(ua, iaZ1Z0);
                zbZ1Z0.decrease(ub, ibZ1Z0);
                zcZ1Z0.decrease(uc, icZ1Z0);
                
                let ax;
                let ay; 
        
                let bx;
                let by;
        
                let cx;
                let cy;
                if(is1F){
                    ax = zaZ1Z0.r;
                    ay = zaZ1Z0.i;
                    
                    bx = zbZ1Z0.r;
                    by = zbZ1Z0.i;
                    
                    cx = zcZ1Z0.r;
                    cy = zcZ1Z0.i;
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                else if(is2F||is3F){
                    ax = zab.r;
                    ay = zab.i;
                    
                    bx = zbc.r;
                    by = zbc.i;
                    
                    cx = zac.r;
                    cy = zac.i;
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                /*
                else if(is3F){
                    ax = za.r;
                    ay = za.i;
                    
                    bx = zb.r;
                    by = zb.i;
                    
                    cx = zc.r;
                    cy = zc.i;
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                */
                document.getElementById(this.id + "AR").innerHTML = ax;
                document.getElementById(this.id + "AX").innerHTML = ay;

                document.getElementById(this.id + "BR").innerHTML = bx;
                document.getElementById(this.id + "BX").innerHTML = by;

                document.getElementById(this.id + "CR").innerHTML = cx;
                document.getElementById(this.id + "CX").innerHTML = cy;
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            let ctx = canvas.getContext("2d");

            if(this.isEnable){
                ctx.font = "15px Arial";
                if(is1F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za0", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb0", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc0", 10, startY + 40, maxWidth - 10);
                }
                if(is2F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Zab", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zbc", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zac", 10, startY + 40, maxWidth - 10);
                }
                if(is3F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc", 10, startY + 40, maxWidth - 10);
                }
                return 60;
            }
            return 0;
        }
        this.defineElement();
    }
    HARIC(){
        this.links.push(new ExponentialLink(this.id + "UAkV", this.id + "UADeg", "UA", "kV"));
        this.links.push(new ExponentialLink(this.id + "UBkV", this.id + "UBDeg", "UB", "kV"));
        this.links.push(new ExponentialLink(this.id + "UCkV", this.id + "UCDeg", "UC", "kV"));

        this.links.push(new ExponentialLink(this.id + "IAkA", this.id + "IADeg", "IA", "kA"));
        this.links.push(new ExponentialLink(this.id + "IBkA", this.id + "IBDeg", "IB", "kA"));
        this.links.push(new ExponentialLink(this.id + "ICkA", this.id + "ICDeg", "IC", "kA"));

        this.links.push(new ExponentialLink(this.id + "3I0kA", this.id + "3I0Deg", "3I0", "kA"));

        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
            <h1 class="text">${this.name}</h1>
            <div class="innerBox">
                <h1 class="text">A</h1>
                <div id="${this.id}UA">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UAkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UADeg" class="textBox">
                </div>
                <div id="${this.id}IA">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IAkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IADeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}AColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}AR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}AX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">B</h1>
                <div id="${this.id}UB">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UBkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UBDeg" class="textBox">
                </div>
                <div id="${this.id}IB">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IBkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IBDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}BColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}BR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}BX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">C</h1>
                <div id="${this.id}UC">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UCkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UCDeg" class="textBox">
                </div>
                <div id="${this.id}IC">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}ICkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}ICDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}CColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}CR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}CX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">3I0</h1>
                <div id="${this.id}3I0">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}3I0kA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}3I0Deg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">K</p>
                <input type="number" id="${this.id}K" class="textBox">

                <p class="text">Inverse</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>-1</span>
                        1
                    </label>
                </div>
            </div>
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");  
                ctx.lineWidth = 3;

                document.getElementById(this.id + "UA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                document.getElementById(this.id + "3I0").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                let uaKv = Number(document.getElementById(this.id + "UAkV").value);
                let ubKv = Number(document.getElementById(this.id + "UBkV").value);
                let ucKv = Number(document.getElementById(this.id + "UCkV").value);
                
                let uaDeg = Number(document.getElementById(this.id + "UADeg").value);
                let ubDeg = Number(document.getElementById(this.id + "UBDeg").value);
                let ucDeg = Number(document.getElementById(this.id + "UCDeg").value);
                
                let iaKv = Number(document.getElementById(this.id + "IAkA").value);
                let ibKv = Number(document.getElementById(this.id + "IBkA").value);
                let icKv = Number(document.getElementById(this.id + "ICkA").value);
                
                let iaDeg = Number(document.getElementById(this.id + "IADeg").value);
                let ibDeg = Number(document.getElementById(this.id + "IBDeg").value);
                let icDeg = Number(document.getElementById(this.id + "ICDeg").value);
        
                let ka3I0 = Number(document.getElementById(this.id + "3I0kA").value);
                let Deg3I0 = Number(document.getElementById(this.id + "3I0Deg").value);
                let K = Number(document.getElementById(this.id + "K").value);

                let Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;
                
                
                let ua = new Complex();
                let ub = new Complex();
                let uc = new Complex();
                
                ua.setExponntial(uaKv, uaDeg);
                ub.setExponntial(ubKv, ubDeg);
                uc.setExponntial(ucKv, ucDeg);
        
                let ia = new Complex();
                let ib = new Complex();
                let ic = new Complex();
                
                ia.setExponntial(iaKv, iaDeg);
                ib.setExponntial(ibKv, ibDeg);
                ic.setExponntial(icKv, icDeg);
        
                let za = new Complex();
                let zb = new Complex();
                let zc = new Complex();
                
                za.decrease(ua, ia);
                zb.decrease(ub, ib);
                zc.decrease(uc, ic);
        
                        
                let uab = new Complex();
                let ubc = new Complex();
                let uac = new Complex();
                
                uab.minus(ua, ub);
                ubc.minus(ub, uc);
                uac.minus(ua, uc);
                
                let iab = new Complex();
                let ibc = new Complex();
                let iac = new Complex();
                
                iab.minus(ia, ib);
                ibc.minus(ib, ic);
                iac.minus(ia, ic);
                
                let zab = new Complex();
                let zbc = new Complex();
                let zac = new Complex();
                
                zab.decrease(uab, iab);
                zbc.decrease(ubc, ibc);
                zac.decrease(uac, iac);
                
                let zabOm = zab.a;
                let zabDeg = zab.f;
                
                let zbcOm = zbc.a;
                let zbcDeg = zbc.f;
                
                let zacOm = zac.a;
                let zacDeg = zac.f;

                let _3I0 = new Complex();

                _3I0.setExponntial(ka3I0, Deg3I0);

                let Z1Z0 = new Complex();
                //Z1Z0.setExponntial(Z1Z0MAG, Z1Z0ANG);
                Z1Z0.setRectangular(K/3, 0);
                Z1Z0.increase(Z1Z0, _3I0);
                Z1Z0.setRectangular(Z1Z0.r * Dir, Z1Z0.i * Dir);

                let iaZ1Z0 = new Complex();
                let ibZ1Z0 = new Complex();
                let icZ1Z0 = new Complex();

                iaZ1Z0.plus(ia, Z1Z0);
                ibZ1Z0.plus(ib, Z1Z0);
                icZ1Z0.plus(ic, Z1Z0);

                let zaZ1Z0 = new Complex();
                let zbZ1Z0 = new Complex();
                let zcZ1Z0 = new Complex();

                zaZ1Z0.decrease(ua, iaZ1Z0);
                zbZ1Z0.decrease(ub, ibZ1Z0);
                zcZ1Z0.decrease(uc, icZ1Z0);
                
                let ax;
                let ay; 
        
                let bx;
                let by;
        
                let cx;
                let cy;
                if(is1F){
                    ax = zaZ1Z0.r;
                    ay = zaZ1Z0.i;
                    
                    bx = zbZ1Z0.r;
                    by = zbZ1Z0.i;
                    
                    cx = zcZ1Z0.r;
                    cy = zcZ1Z0.i;
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                else if(is2F||is3F){
                    ax = zab.r;
                    ay = zab.i;
                    
                    bx = zbc.r;
                    by = zbc.i;
                    
                    cx = zac.r;
                    cy = zac.i;
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                document.getElementById(this.id + "AR").innerHTML = ax;
                document.getElementById(this.id + "AX").innerHTML = ay;

                document.getElementById(this.id + "BR").innerHTML = bx;
                document.getElementById(this.id + "BX").innerHTML = by;

                document.getElementById(this.id + "CR").innerHTML = cx;
                document.getElementById(this.id + "CX").innerHTML = cy;
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            let ctx = canvas.getContext("2d");

            if(this.isEnable){
                ctx.font = "15px Arial";
                if(is1F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za0", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb0", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc0", 10, startY + 40, maxWidth - 10);
                }
                if(is2F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Zab", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zbc", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zac", 10, startY + 40, maxWidth - 10);
                }
                if(is3F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc", 10, startY + 40, maxWidth - 10);
                }
                return 60;
            }
            return 0;
        }
        this.defineElement();
    }
    SHDEIC(){
        this.links.push(new ExponentialLink(this.id + "UAkV", this.id + "UADeg", "UA", "kV"));
        this.links.push(new ExponentialLink(this.id + "UBkV", this.id + "UBDeg", "UB", "kV"));
        this.links.push(new ExponentialLink(this.id + "UCkV", this.id + "UCDeg", "UC", "kV"));

        this.links.push(new ExponentialLink(this.id + "IAkA", this.id + "IADeg", "IA", "kA"));
        this.links.push(new ExponentialLink(this.id + "IBkA", this.id + "IBDeg", "IB", "kA"));
        this.links.push(new ExponentialLink(this.id + "ICkA", this.id + "ICDeg", "IC", "kA"));

        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
            <h1 class="text">${this.name}</h1>
            <div class="innerBox">
                <h1 class="text">A</h1>
                <div id="${this.id}UA">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UAkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UADeg" class="textBox">
                </div>
                <div id="${this.id}IA">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IAkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IADeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}AColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}AR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}AX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">B</h1>
                <div id="${this.id}UB">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UBkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UBDeg" class="textBox">
                </div>
                <div id="${this.id}IB">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IBkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IBDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}BColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}BR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}BX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">C</h1>
                <div id="${this.id}UC">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UCkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UCDeg" class="textBox">
                </div>
                <div id="${this.id}IC">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}ICkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}ICDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}CColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}CR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}CX" class="textBox"></div>
            </div>
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                document.getElementById(this.id + "UA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                let uaKv = Number(document.getElementById(this.id + "UAkV").value);
                let ubKv = Number(document.getElementById(this.id + "UBkV").value);
                let ucKv = Number(document.getElementById(this.id + "UCkV").value);
                
                let uaDeg = Number(document.getElementById(this.id + "UADeg").value);
                let ubDeg = Number(document.getElementById(this.id + "UBDeg").value);
                let ucDeg = Number(document.getElementById(this.id + "UCDeg").value);
                
                let iaKv = Number(document.getElementById(this.id + "IAkA").value);
                let ibKv = Number(document.getElementById(this.id + "IBkA").value);
                let icKv = Number(document.getElementById(this.id + "ICkA").value);
                
                let iaDeg = Number(document.getElementById(this.id + "IADeg").value);
                let ibDeg = Number(document.getElementById(this.id + "IBDeg").value);
                let icDeg = Number(document.getElementById(this.id + "ICDeg").value);
                
                
                let ua = new Complex();
                let ub = new Complex();
                let uc = new Complex();
                
                ua.setExponntial(uaKv, uaDeg);
                ub.setExponntial(ubKv, ubDeg);
                uc.setExponntial(ucKv, ucDeg);
                
                let uab = new Complex();
                let ubc = new Complex();
                let uac = new Complex();
                
                uab.minus(ua, ub);
                ubc.minus(ub, uc);
                uac.minus(ua, uc);
                
                let ia = new Complex();
                let ib = new Complex();
                let ic = new Complex();
                
                ia.setExponntial(iaKv, iaDeg);
                ib.setExponntial(ibKv, ibDeg);
                ic.setExponntial(icKv, icDeg);
                
                let iab = new Complex();
                let ibc = new Complex();
                let iac = new Complex();
                
                iab.minus(ia, ib);
                ibc.minus(ib, ic);
                iac.minus(ia, ic);
                
                let zab = new Complex();
                let zbc = new Complex();
                let zac = new Complex();
                
                zab.decrease(uab, iab);
                zbc.decrease(ubc, ibc);
                zac.decrease(uac, iac);
                
                let zabOm = zab.a;
                let zabDeg = zab.f;
                
                let zbcOm = zbc.a;
                let zbcDeg = zbc.f;
                
                let zacOm = zac.a;
                let zacDeg = zac.f;
                
                let ax;
                let ay;
                
                let bx;
                let by;
                
                let cx;
                let cy;
               
                if(is1F||is2F||is3F){
                    ax = zab.r;
                    ay = zab.i;
                    
                    bx = zbc.r;
                    by = zbc.i;
                    
                    cx = zac.r;
                    cy = zac.i;
                            
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                document.getElementById(this.id + "AR").innerHTML = ax;
                document.getElementById(this.id + "AX").innerHTML = ay;

                document.getElementById(this.id + "BR").innerHTML = bx;
                document.getElementById(this.id + "BX").innerHTML = by;

                document.getElementById(this.id + "CR").innerHTML = cx;
                document.getElementById(this.id + "CX").innerHTML = cy;
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            let ctx = canvas.getContext("2d");

            if(this.isEnable){
                ctx.font = "15px Arial";
                
                if(is1F||is2F||is3F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Zab", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zbc", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zac", 10, startY + 40, maxWidth - 10);
                }
                
                return 60;
            }
            return 0;
        }
        this.defineElement();
    }
    SHDEZONE1(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">Z</p>
                <input type="number" id="${this.id}Z" class="textBox">
                
                <hr class="innerHr">
                <p class="text">Dir</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>Reverse</span>
                        Forward
                    </label>
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;

                let c1z = Number(document.getElementById(this.id + "Z").value);
                let c1Deg = document.getElementById(this.id + "Dir").checked ? 105 : -75;
                let c1Cm = 0;
                let c1Ex = 1;

            
                let elX1 = ((c1z - (c1z * c1Cm / 100)) / 2) * Math.cos(c1Deg * Math.PI / 180);
                let elY1 = ((c1z - (c1z * c1Cm / 100)) / 2) * Math.sin(c1Deg * Math.PI / 180);
            
                let mainR1 = (c1z + (c1z * c1Cm / 100)) / 2;
                let otherR1 = c1Ex * mainR1;
            
                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.ellipse(centX + (mult * elX1), centY + (mult * elY1), mult * mainR1, mult * otherR1, c1Deg * Math.PI / 180, 0, Math.PI * 2);                
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    SHDEZONE2(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">Z</p>
                <input type="number" id="${this.id}Z" class="textBox">
                <hr class="innerHr"><p class="text">b/a</p>
                <input type="number" id="${this.id}ba" class="textBox">
                <hr class="innerHr">
                <p class="text">Dir</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>Reverse</span>
                        Forward
                    </label>
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;
//
                let Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;
                let Z=document.getElementById(this.id + "Z").value;
                let ba=document.getElementById(this.id + "ba").value;
                
                
                let X1 = Z* Math.cos(75 * Math.PI / 180);
                let Y1 = Z* Math.sin(75 * Math.PI / 180);
                let X2 = 0.85*Z;
                let Y2 = X2*Math.tan(175 * Math.PI / 180)+Y1-X1*Math.tan(175 * Math.PI / 180);
                let X3 = Z*ba/2;
                let Y3 = 0;
                let tga = (Y2-Y3)/(X2-X3);
                let b1 = Y2-X2*tga;
                let X5 = -0.3*Z;
                let Y5 = 0;
                let b2 = Y5-X5*Math.tan(175 * Math.PI / 180);
                let X4 = (b2-b1)/(tga-Math.tan(175 * Math.PI / 180));
                let Y4 = X4*Math.tan(175 * Math.PI / 180)+b2;
                let X6 = -0.5*Z;
                let Y6 = X6*Math.tan(175 * Math.PI / 180) + Y1-X1*Math.tan(175 * Math.PI / 180);
             
               X1 = X1 * Dir;
               Y1 = Y1 * Dir;
               X2 = X2 * Dir;
               Y2 = Y2 * Dir;
               X3 = X3 * Dir;
               Y3 = Y3 * Dir;
               X4 = X4 * Dir;
               Y4 = Y4 * Dir;
               X5 = X5 * Dir;
               Y5 = Y5 * Dir;
               X6 = X6 * Dir;
               Y6 = Y6 * Dir;

                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.lineTo(centX + (X1 * mult), centY - (Y1 * mult));
                ctx.lineTo(centX + (X2 * mult), centY - (Y2 * mult));
                ctx.lineTo(centX + (X3 * mult), centY - (Y3 * mult));
                ctx.lineTo(centX + (X4 * mult), centY - (Y4 * mult));
                ctx.lineTo(centX + (X5 * mult), centY - (Y5 * mult));
                ctx.lineTo(centX + (X6 * mult), centY - (Y6 * mult));
                ctx.lineTo(centX + (X1 * mult), centY - (Y1 * mult));
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }
    SHDEZONE3(){
        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <hr class="innerHr">
                <p class="text">Z</p>
                <input type="number" id="${this.id}Z" class="textBox">
                <hr class="innerHr"><p class="text">ɣ</p>
                <input type="number" id="${this.id}ɣ" class="textBox">
                <hr class="innerHr">
                <p class="text">Dir</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>Reverse</span>
                        Forward
                    </label>
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
                ctx.lineWidth = 3;
//
                let Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;
                let Z=document.getElementById(this.id + "Z").value;
                let Y=document.getElementById(this.id + "ɣ").value;
                
                
                let X1 = Z* Math.cos(75 * Math.PI / 180);
                let Y1 = Z* Math.sin(75 * Math.PI / 180);
                let tga = Math.tan(175 * Math.PI / 180);
                let b1 = Y1-X1*tga;
                let X2 = b1/(Math.tan(115 * Math.PI / 180)-tga);
                let Y2 = X2*Math.tan(115 * Math.PI / 180);
                let X3 = b1/(Math.tan(Y * Math.PI / 180)-tga);
                let Y3 = X3*Math.tan(Y * Math.PI / 180);                
                let X4 = 0;
                let Y4 = 0;
                
             
               X1 = X1 * Dir;
               Y1 = Y1 * Dir;
               X2 = X2 * Dir;
               Y2 = Y2 * Dir;
               X3 = X3 * Dir;
               Y3 = Y3 * Dir;
               X4 = X4 * Dir;
               Y4 = Y4 * Dir;
               

                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.beginPath();
                ctx.lineTo(centX + (X1 * mult), centY - (Y1 * mult));
                ctx.lineTo(centX + (X2 * mult), centY - (Y2 * mult));
                ctx.lineTo(centX + (X3 * mult), centY - (Y3 * mult));
                ctx.lineTo(centX + (X4 * mult), centY - (Y4 * mult));                
                ctx.lineTo(centX + (X2 * mult), centY - (Y2 * mult));
                ctx.stroke();
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");
    
                ctx.font = "15px Arial";
                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);
                
                return 20;
            }
            return 0;
        }
        this.defineElement();
    }

    RIOIC(){
        this.links.push(new ExponentialLink(this.id + "UAkV", this.id + "UADeg", "UA", "kV"));
        this.links.push(new ExponentialLink(this.id + "UBkV", this.id + "UBDeg", "UB", "kV"));
        this.links.push(new ExponentialLink(this.id + "UCkV", this.id + "UCDeg", "UC", "kV"));

        this.links.push(new ExponentialLink(this.id + "IAkA", this.id + "IADeg", "IA", "kA"));
        this.links.push(new ExponentialLink(this.id + "IBkA", this.id + "IBDeg", "IB", "kA"));
        this.links.push(new ExponentialLink(this.id + "ICkA", this.id + "ICDeg", "IC", "kA"));

        this.links.push(new ExponentialLink(this.id + "3I0kA", this.id + "3I0Deg", "3I0", "kA"));

        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
            <h1 class="text">${this.name}</h1>
            <div class="innerBox">
                <h1 class="text">A</h1>
                <div id="${this.id}UA">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UAkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UADeg" class="textBox">
                </div>
                <div id="${this.id}IA">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IAkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IADeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}AColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}AR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}AX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">B</h1>
                <div id="${this.id}UB">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UBkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UBDeg" class="textBox">
                </div>
                <div id="${this.id}IB">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}IBkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}IBDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}BColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}BR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}BX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">C</h1>
                <div id="${this.id}UC">
                    <hr class="innerHr">
                    <p class="text">kV</p>
                    <input type="number" id="${this.id}UCkV" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}UCDeg" class="textBox">
                </div>
                <div id="${this.id}IC">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}ICkA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}ICDeg" class="textBox">
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}CColor" class="colorBox">
                <hr class="innerHr">
                <p class="text">R</p>
                <div id="${this.id}CR" class="textBox"></div>
                <p class="text">X</p>
                <div id="${this.id}CX" class="textBox"></div>
            </div>
            <div class="innerBox">
                <h1 class="text">3I0</h1>
                <div id="${this.id}3I0">
                    <hr class="innerHr">
                    <p class="text">kA</p>
                    <input type="number" id="${this.id}3I0kA" class="textBox">
                    <p class="text">Deg</p>
                    <input type="number" id="${this.id}3I0Deg" class="textBox">
                </div>
                
                <hr class="innerHr">  
                <p class="text">Kr</p>
                <input type="number" id="${this.id}Kr" class="textBox">
                <p class="text">Kx</p>
                <input type="number" id="${this.id}Kx" class="textBox">
                <hr class="innerHr">              
                <p class="text">Z1/Z0 MAG</p>
                <input type="number" id="${this.id}Z1/Z0MAG" class="textBox">
                <p class="text">Z1/Z0 ANG</p>
                <input type="number" id="${this.id}Z1/Z0ANG" class="textBox">
                <hr class="innerHr">
                <p class="text">KL MAG</p>
                <input type="number" id="${this.id}KLMAG" class="textBox">
                <p class="text">KL ANG</p>
                <input type="number" id="${this.id}KLANG" class="textBox">

                <p class="text">Inverse</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}Dir" value="1">
                        <span>-1</span>
                        1
                    </label>
                </div>
            </div>
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY, is1F, is2F, is3F){
            if(this.isEnable){
                let ctx = canvas.getContext("2d");  
                ctx.lineWidth = 3;

                document.getElementById(this.id + "UA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "UC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kV").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "IC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                document.getElementById(this.id + "3I0").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }

                let uaKv = Number(document.getElementById(this.id + "UAkV").value);
                let ubKv = Number(document.getElementById(this.id + "UBkV").value);
                let ucKv = Number(document.getElementById(this.id + "UCkV").value);
                
                let uaDeg = Number(document.getElementById(this.id + "UADeg").value);
                let ubDeg = Number(document.getElementById(this.id + "UBDeg").value);
                let ucDeg = Number(document.getElementById(this.id + "UCDeg").value);
                
                let iaKv = Number(document.getElementById(this.id + "IAkA").value);
                let ibKv = Number(document.getElementById(this.id + "IBkA").value);
                let icKv = Number(document.getElementById(this.id + "ICkA").value);
                
                let iaDeg = Number(document.getElementById(this.id + "IADeg").value);
                let ibDeg = Number(document.getElementById(this.id + "IBDeg").value);
                let icDeg = Number(document.getElementById(this.id + "ICDeg").value);
        
                let ka3I0 = Number(document.getElementById(this.id + "3I0kA").value);
                let Deg3I0 = Number(document.getElementById(this.id + "3I0Deg").value);
                let KLMAG = Number(document.getElementById(this.id + "KLMAG").value);
                let KLANG = Number(document.getElementById(this.id + "KLANG").value);
                let Z1Z0MAG = Number(document.getElementById(this.id + "Z1/Z0MAG").value);
                let Z1Z0ANG = Number(document.getElementById(this.id + "Z1/Z0ANG").value);
                let Kr3I0 = Number(document.getElementById(this.id + "Kr").value);
                let Kx3I0 = Number(document.getElementById(this.id + "Kx").value);

                let Dir = document.getElementById(this.id + "Dir").checked ? -1 : 1;
                
                
                let ua = new Complex();
                let ub = new Complex();
                let uc = new Complex();
                
                ua.setExponntial(uaKv, uaDeg);
                ub.setExponntial(ubKv, ubDeg);
                uc.setExponntial(ucKv, ucDeg);
        
                let ia = new Complex();
                let ib = new Complex();
                let ic = new Complex();
                
                ia.setExponntial(iaKv, iaDeg);
                ib.setExponntial(ibKv, ibDeg);
                ic.setExponntial(icKv, icDeg);
        
                let za = new Complex();
                let zb = new Complex();
                let zc = new Complex();
                
                za.decrease(ua, ia);
                zb.decrease(ub, ib);
                zc.decrease(uc, ic);
        
                        
                let uab = new Complex();
                let ubc = new Complex();
                let uac = new Complex();
                
                uab.minus(ua, ub);
                ubc.minus(ub, uc);
                uac.minus(ua, uc);
                
                let iab = new Complex();
                let ibc = new Complex();
                let iac = new Complex();
                
                iab.minus(ia, ib);
                ibc.minus(ib, ic);
                iac.minus(ia, ic);
                
                let zab = new Complex();
                let zbc = new Complex();
                let zac = new Complex();
                
                zab.decrease(uab, iab);
                zbc.decrease(ubc, ibc);
                zac.decrease(uac, iac);
                
                // let zabOm = zab.a;
                // let zabDeg = zab.f;
                
                // let zbcOm = zbc.a;
                // let zbcDeg = zbc.f;
                
                // let zacOm = zac.a;
                // let zacDeg = zac.f;
          
                let ax;
                let ay; 
        
                let bx;
                let by;
        
                let cx;
                let cy;
                if(is1F){
                    if(KLMAG&&KLANG) {
                        let _3I0 = new Complex();
                        let KL = new Complex();
                        _3I0.setExponntial(ka3I0, Deg3I0);
                        KL.setExponntial(KLMAG, KLANG);
                        //KL.setRectangular((Z1Z0.r - 1) / 3, Z1Z0.i / 3);
                        KL.increase(KL, _3I0);
                        KL.setRectangular(KL.r * Dir, KL.i * Dir);

                        let iaKL = new Complex();
                        let ibKL = new Complex();
                        let icKL = new Complex();

                        iaKL.plus(ia, KL);
                        ibKL.plus(ib, KL);
                        icKL.plus(ic, KL);

                        let zaKL = new Complex();
                        let zbKL = new Complex();
                        let zcKL = new Complex();

                        zaKL.decrease(ua, iaKL);
                        zbKL.decrease(ub, ibKL);
                        zcKL.decrease(uc, icKL);  

                        ax = zaKL.r;
                        ay = zaKL.i;
                        
                        bx = zbKL.r;
                        by = zbKL.i;
                        
                        cx = zcKL.r;
                        cy = zcKL.i;
                    }
                    if(Z1Z0MAG&&Z1Z0ANG) {
                        let _3I0 = new Complex();
                        let Z1Z0 = new Complex();
                        _3I0.setExponntial(ka3I0, Deg3I0);
                        Z1Z0.setExponntial(Z1Z0MAG, Z1Z0ANG);
                        Z1Z0.setRectangular((Z1Z0.r - 1) / 3, Z1Z0.i / 3);
                        Z1Z0.increase(Z1Z0, _3I0);
                        Z1Z0.setRectangular(Z1Z0.r * Dir, Z1Z0.i * Dir);

                        let iaZ1Z0 = new Complex();
                        let ibZ1Z0 = new Complex();
                        let icZ1Z0 = new Complex();

                        iaZ1Z0.plus(ia, Z1Z0);
                        ibZ1Z0.plus(ib, Z1Z0);
                        icZ1Z0.plus(ic, Z1Z0);

                        let zaZ1Z0 = new Complex();
                        let zbZ1Z0 = new Complex();
                        let zcZ1Z0 = new Complex();

                        zaZ1Z0.decrease(ua, iaZ1Z0);
                        zbZ1Z0.decrease(ub, ibZ1Z0);
                        zcZ1Z0.decrease(uc, icZ1Z0);  

                        ax = zaZ1Z0.r;
                        ay = zaZ1Z0.i;
                        
                        bx = zbZ1Z0.r;
                        by = zbZ1Z0.i;
                        
                        cx = zcZ1Z0.r;
                        cy = zcZ1Z0.i;
                    }
                    if(Kr3I0&&Kx3I0) {
                        ax = uaKv * (Math.cos((uaDeg - iaDeg) / 180 * Math.PI) + Dir * Kx3I0 * ka3I0 * Math.cos((uaDeg - Deg3I0) / 180 * Math.PI) / iaKv) / (iaKv * (1 + Dir * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((iaDeg - Deg3I0) / 180 * Math.PI) / iaKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (iaKv * iaKv)));
                        ay = uaKv * (Math.sin((uaDeg - iaDeg) / 180 * Math.PI) + Dir * Kr3I0 * ka3I0 * Math.sin((uaDeg - Deg3I0) / 180 * Math.PI) / iaKv) / (iaKv * (1 + Dir * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((iaDeg - Deg3I0) / 180 * Math.PI) / iaKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (iaKv * iaKv)));
                        
                        bx = ubKv * (Math.cos((ubDeg - ibDeg) / 180 * Math.PI) + Dir * Kx3I0 * ka3I0 * Math.cos((ubDeg - Deg3I0) / 180 * Math.PI) / ibKv) / (ibKv * (1 + Dir * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((ibDeg - Deg3I0) / 180 * Math.PI) / ibKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (ibKv * ibKv)));
                        by = ubKv * (Math.sin((ubDeg - ibDeg) / 180 * Math.PI) + Dir * Kr3I0 * ka3I0 * Math.sin((ubDeg - Deg3I0) / 180 * Math.PI) / ibKv) / (ibKv * (1 + Dir * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((ibDeg - Deg3I0) / 180 * Math.PI) / ibKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (ibKv * ibKv)));
            
                        cx = ucKv * (Math.cos((ucDeg - icDeg) / 180 * Math.PI) + Dir * Kx3I0 * ka3I0 * Math.cos((ucDeg - Deg3I0) / 180 * Math.PI) / icKv) / (icKv * (1 + Dir * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((icDeg - Deg3I0) / 180 * Math.PI) / icKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (icKv * icKv)));
                        cy = ucKv * (Math.sin((ucDeg - icDeg) / 180 * Math.PI) + Dir * Kr3I0 * ka3I0 * Math.sin((ucDeg - Deg3I0) / 180 * Math.PI) / icKv) / (icKv * (1 + Dir * ka3I0 * (Kr3I0 + Kx3I0) * Math.cos((icDeg - Deg3I0) / 180 * Math.PI) / icKv + Kr3I0 * Kx3I0 * ka3I0 * ka3I0 / (icKv * icKv)));
                        
                    }


                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                else if(is2F||is3F){
                    ax = zab.r;
                    ay = zab.i;
                    
                    bx = zbc.r;
                    by = zbc.i;
                    
                    cx = zac.r;
                    cy = zac.i;
                    ctx.strokeStyle = document.getElementById(this.id + "AColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (ax * mult), centY - (ay * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "BColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (bx * mult), centY - (by * mult));
                
                    ctx.stroke();
                
                    ctx.strokeStyle = document.getElementById(this.id + "CColor").value;
                    ctx.beginPath();
                    ctx.moveTo(centX, centY);
                    ctx.lineTo(centX + (cx * mult), centY - (cy * mult));
                
                    ctx.stroke();
                }
                document.getElementById(this.id + "AR").innerHTML = ax;
                document.getElementById(this.id + "AX").innerHTML = ay;

                document.getElementById(this.id + "BR").innerHTML = bx;
                document.getElementById(this.id + "BX").innerHTML = by;

                document.getElementById(this.id + "CR").innerHTML = cx;
                document.getElementById(this.id + "CX").innerHTML = cy;
            }
        }
        this.drawName = function(canvas, startY, maxWidth, is1F, is2F, is3F){
            let ctx = canvas.getContext("2d");

            if(this.isEnable){
                ctx.font = "15px Arial";
                if(is1F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za0", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb0", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc0", 10, startY + 40, maxWidth - 10);
                }
                if(is2F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Zab", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zbc", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zac", 10, startY + 40, maxWidth - 10);
                }
                if(is3F){
                    ctx.fillStyle = document.getElementById(this.id + "AColor").value;
                    ctx.fillText("Za", 10, startY, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "BColor").value;
                    ctx.fillText("Zb", 10, startY + 20, maxWidth - 10);
                
                    ctx.fillStyle = document.getElementById(this.id + "CColor").value;
                    ctx.fillText("Zc", 10, startY + 40, maxWidth - 10);
                }
                return 60;
            }
            return 0;
        }
        this.defineElement();
    }
    //Differential Protection

    RET670(){
        this.links.push(new ExponentialLink(this.id + "HighAkA", this.id + "HighADeg", "Winding 1 A", "A"));
        this.links.push(new ExponentialLink(this.id + "HighBkA", this.id + "HighBDeg", "Winding 1 B", "A"));
        this.links.push(new ExponentialLink(this.id + "HighCkA", this.id + "HighCDeg", "Winding 1 C", "A"));

        this.links.push(new ExponentialLink(this.id + "MediumAkA", this.id + "MediumADeg", "Winding 2 A", "A"));
        this.links.push(new ExponentialLink(this.id + "MediumBkA", this.id + "MediumBDeg", "Winding 2 B", "A"));
        this.links.push(new ExponentialLink(this.id + "MediumCkA", this.id + "MediumCDeg", "Winding 2 C", "A"));

        this.links.push(new ExponentialLink(this.id + "LowAkA", this.id + "LowADeg", "Winding 3 A", "A"));
        this.links.push(new ExponentialLink(this.id + "LowBkA", this.id + "LowBDeg", "Winding 3 B", "A"));
        this.links.push(new ExponentialLink(this.id + "LowCkA", this.id + "LowCDeg", "Winding 3 C", "A"));

        this.links.push(new DynamikLink(this.id + "iDiffA", "iDiff A", "A"));
        this.links.push(new DynamikLink(this.id + "iDiffB", "iDiff B", "A"));
        this.links.push(new DynamikLink(this.id + "iDiffC", "iDiff C", "A"));

        this.links.push(new DynamikLink(this.id + "iBias", "iBias", "A"));



        this.innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <h1 class="text">${this.name}</h1>
                <div class="innerBox">
                    <h1 class="text">Winding 1</h1>
                    <div id="${this.id}HighA">
                        <hr class="innerHr">
                        <p class="text">A A</p>
                        <input type="number" id="${this.id}HighAkA" class="textBox">
                        <p class="text">A Deg</p>
                        <input type="number" id="${this.id}HighADeg" class="textBox">
                    </div>
                    <div id="${this.id}HighB">
                        <hr class="innerHr">
                        <p class="text">B A</p>
                        <input type="number" id="${this.id}HighBkA" class="textBox">
                        <p class="text">B Deg</p>
                        <input type="number" id="${this.id}HighBDeg" class="textBox">
                    </div>
                    <div id="${this.id}HighC">
                        <hr class="innerHr">
                        <p class="text">C A</p>
                        <input type="number" id="${this.id}HighCkA" class="textBox">
                        <p class="text">C Deg</p>
                        <input type="number" id="${this.id}HighCDeg" class="textBox">
                    </div>
                    <hr class="innerHr">
                    <p class="text">Rated Voltage</p>
                    <input type="number" id="${this.id}HighUnom" class="textBox">
                    <hr class="innerHr">
                    <nav class = "menu">
                        <ul>
                            <li><a>Matrix</a>
                                <ul>
                                    <li><a><input id = "${this.id}HighReferenceWindingMatrix" type = "radio" name = "${this.id}HighMatrix"> Winding with 0°</a></li>
                                    <li><a><input id = "${this.id}HighWinding30LeadingMatrix" type = "radio" name = "${this.id}HighMatrix"> Winding with 30° leading</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <hr class="innerHr">
                    <p class="text">Inverse</p>
                    <div class="direction">
                        <label>
                            <input type="checkbox" id="${this.id}HighDir" value="1">
                            <span>-1</span>
                            1
                        </label>
                    </div>
                </div>
                <div class="innerBox">
                    <h1 class="text">Winding 2</h1>
                    <div id="${this.id}MediumA">
                        <hr class="innerHr">
                        <p class="text">A A</p>
                        <input type="number" id="${this.id}MediumAkA" class="textBox">
                        <p class="text">A Deg</p>
                        <input type="number" id="${this.id}MediumADeg" class="textBox">
                    </div>
                    <div id="${this.id}MediumB">
                        <hr class="innerHr">
                        <p class="text">B A</p>
                        <input type="number" id="${this.id}MediumBkA" class="textBox">
                        <p class="text">B Deg</p>
                        <input type="number" id="${this.id}MediumBDeg" class="textBox">
                    </div>
                    <div id="${this.id}MediumC">
                        <hr class="innerHr">
                        <p class="text">C A</p>
                        <input type="number" id="${this.id}MediumCkA" class="textBox">
                        <p class="text">C Deg</p>
                        <input type="number" id="${this.id}MediumCDeg" class="textBox">
                    </div>
                    <hr class="innerHr">
                    <p class="text">Rated Voltage</p>
                    <input type="number" id="${this.id}MediumUnom" class="textBox">
                    <hr class="innerHr">
                    <nav class="menu">
                        <ul>
                            <li><a>Matrix</a>
                                <ul>
                                <li><a><input id = "${this.id}MediumReferenceWindingMatrix" type = "radio" name = "${this.id}MediumMatrix"> Winding with 0°</a></li>
                                <li><a><input id = "${this.id}MediumWinding30LeadingMatrix" type = "radio" name = "${this.id}MediumMatrix"> Winding with 30° leading</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <hr class="innerHr">
                    <p class="text">Inverse</p>
                    <div class="direction">
                        <label>
                            <input type="checkbox" id="${this.id}MediumDir" value="1">
                            <span>-1</span>
                            1
                        </label>
                    </div>
                </div>
                <div class="innerBox">
                    <h1 class="text">Winding 3</h1>
                    <div id="${this.id}LowA">
                        <hr class="innerHr">
                        <p class="text">A A</p>
                        <input type="number" id="${this.id}LowAkA" class="textBox">
                        <p class="text">A Deg</p>
                        <input type="number" id="${this.id}LowADeg" class="textBox">
                    </div>
                    <div id="${this.id}LowB">
                        <hr class="innerHr">
                        <p class="text">B A</p>
                        <input type="number" id="${this.id}LowBkA" class="textBox">
                        <p class="text">B Deg</p>
                        <input type="number" id="${this.id}LowBDeg" class="textBox">
                    </div>
                    <div id="${this.id}LowC">
                        <hr class="innerHr">
                        <p class="text">C A</p>
                        <input type="number" id="${this.id}LowCkA" class="textBox">
                        <p class="text">C Deg</p>
                        <input type="number" id="${this.id}LowCDeg" class="textBox">
                    </div>
                    <hr class="innerHr">
                    <p class="text">Rated Voltage</p>
                    <input type="number" id="${this.id}LowUnom" class="textBox">
                    <hr class="innerHr">
                    <nav class="menu">
                        <ul>
                            <li><a>Matrix</a>
                                <ul>
                                <li><a><input id = "${this.id}LowReferenceWindingMatrix" type = "radio" name = "${this.id}LowMatrix"> Winding with 0°</a></li>
                                <li><a><input id = "${this.id}LowWinding30LeadingMatrix" type = "radio" name = "${this.id}LowMatrix"> Winding with 30° leading</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <hr class="innerHr">
                    <p class="text">Inverse</p>
                    <div class="direction">
                        <label>
                            <input type="checkbox" id="${this.id}LowDir" value="1">
                            <span>-1</span>
                            1
                        </label>
                    </div>
                </div>
                <div class="innerBox">
                <h1 class="text">Settings</h1>
                <hr class="innerHr">

                <p class="text">Rated Current W1</p>
                <input type="number" id="${this.id}RCW1" class="textBox">
                <hr class="innerHr">

                <p class="text">idMin</p>
                <input type="number" id="${this.id}idNin" class="textBox">
                <hr class="innerHr">

                <p class="text">End Section 1</p>
                <input type="number" id="${this.id}ES1" class="textBox">
                <p class="text">End Section 2</p>
                <input type="number" id="${this.id}ES2" class="textBox">

                <p class="text">Slope Section 2</p>
                <input type="number" id="${this.id}SS2" class="textBox">
                <hr class="innerHr">
                <p class="text">Slope Section 3</p>
                <input type="number" id="${this.id}SS3" class="textBox">
                <hr class="innerHr">

                <p class="text">idUnre</p>
                <input type="number" id="${this.id}idUnre" class="textBox">
                <hr class="innerHr">

                <p class="text">Zero Seq Reduction</p>
                <div class="direction">
                    <label>
                        <input type="checkbox" id="${this.id}ZSR" value="1">
                        <span>Off</span>
                        On
                    </label>
                </div>
                <hr class="innerHr">
                <p class="text">Color</p>
                <input type="color" id="${this.id}Color" class="colorBox">

                </div>
                <div class="innerBox">
                    <h1 class="text">Calculations</h1>
                    <hr class="innerHr">

                    <p class="text">iDiff A</p>
                    <div id="${this.id}iDiffA" class="textBox"></div>
                    <hr class="innerHr">

                    <input hidden type="number" id="${this.id}iDiffA" class="textBox">

                    <p class="text">iDiff B</p>
                    <div id="${this.id}iDiffB" class="textBox"></div>
                    <hr class="innerHr">

                    <input hidden type="number" id="${this.id}iDiffB" class="textBox">

                    <p class="text">iDiff C</p>
                    <div id="${this.id}iDiffC" class="textBox"></div>
                    <hr class="innerHr">

                    <input hidden type="number" id="${this.id}iDiffC" class="textBox">

                    <p class="text">iBias</p>
                    <div id="${this.id}iBias" class="textBox"></div>
                    <hr class="innerHr">

                    <input hidden type="number" id="${this.id}iBias" class="textBox">

                    <p class="text">iBias & iDiff source</p>
                    <div class="direction">
                        <label>
                            <input type="checkbox" id="${this.id}Calculated" checked value="1">
                            <span>Link from COMTRADE</span>
                            Calculate
                        </label>
                    </div>

                </div>
            </div>
        `;
        this.drawVisualisation = function(canvas, mult, centX, centY){
            let ctx = canvas.getContext("2d");

            if(this.isEnable){
                document.getElementById(this.id + "HighA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "HighB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "HighC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
    
                document.getElementById(this.id + "MediumA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "MediumB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "MediumC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                
    
                document.getElementById(this.id + "LowA").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "LowB").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                document.getElementById(this.id + "LowC").ondblclick = function(e) {
                    new Toast({
                        title: false,
                        text: "Paste",
                        theme: "light",
                        autohide: true,
                        interval: 5000
                    });
                    document.getElementById(this.id + "kA").value = bufferA;
                    document.getElementById(this.id + "Deg").value = bufferF;
                }
                const referenceWindingMatrixOn = [
                    [2 / 3, -1 / 3, -1 / 3],
                    [-1 / 3, 2 / 3, -1 / 3],
                    [-1 / 3, -1 / 3, 2 / 3]
                ];

                const referenceWindingMatrixOff = [
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ];

                const winding30LeadingMatrix = [
                    [1 / Math.sqrt(3), 0, -1 / Math.sqrt(3)],
                    [-1 / Math.sqrt(3), 1 / Math.sqrt(3), 0],
                    [0, -1 / Math.sqrt(3), 1 / Math.sqrt(3)]
                ];


                let RCW1 = Number(document.getElementById(this.id + "RCW1").value);

                let idNin = Number(document.getElementById(this.id + "idNin").value);

                let ES1 = Number(document.getElementById(this.id + "ES1").value);
                let ES2 = Number(document.getElementById(this.id + "ES2").value);

                let SS2 = Number(document.getElementById(this.id + "SS2").value);
                let SS3 = Number(document.getElementById(this.id + "SS3").value);

                let idUnre = Number(document.getElementById(this.id + "idUnre").value);

                let iDiffA;
                let iDiffB;
                let iDiffC;

                let iBias;

                if(!document.getElementById(this.id + "Calculated").checked){

                    let highAkA = Number(document.getElementById(this.id + "HighAkA").value);
                    let highADeg = Number(document.getElementById(this.id + "HighADeg").value);

                    let highBkA = Number(document.getElementById(this.id + "HighBkA").value);
                    let highBDeg = Number(document.getElementById(this.id + "HighBDeg").value);

                    let highCkA = Number(document.getElementById(this.id + "HighCkA").value);
                    let highCDeg = Number(document.getElementById(this.id + "HighCDeg").value);

                    let highUnom = Number(document.getElementById(this.id + "HighUnom").value);

                    let highMatrix = [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0]
                    ];
                    if(document.getElementById(this.id + "HighReferenceWindingMatrix").checked){
                        highMatrix = !document.getElementById(this.id + "ZSR").checked ? referenceWindingMatrixOn : referenceWindingMatrixOff;
                    }
                    else if(document.getElementById(this.id + "HighWinding30LeadingMatrix").checked){
                        highMatrix = winding30LeadingMatrix;
                    }

                    let highDir = document.getElementById(this.id + "HighDir").checked ? -1 : 1;


                    let mediumAkA = Number(document.getElementById(this.id + "MediumAkA").value);
                    let mediumADeg = Number(document.getElementById(this.id + "MediumADeg").value);

                    let mediumBkA = Number(document.getElementById(this.id + "MediumBkA").value);
                    let mediumBDeg = Number(document.getElementById(this.id + "MediumBDeg").value);

                    let mediumCkA = Number(document.getElementById(this.id + "MediumCkA").value);
                    let mediumCDeg = Number(document.getElementById(this.id + "MediumCDeg").value);

                    let mediumUnom = Number(document.getElementById(this.id + "MediumUnom").value);

                    let mediumMatrix = [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0]
                    ];

                    if(document.getElementById(this.id + "MediumReferenceWindingMatrix").checked){
                        mediumMatrix = !document.getElementById(this.id + "ZSR").checked ? referenceWindingMatrixOn : referenceWindingMatrixOff;
                    }
                    else if(document.getElementById(this.id + "MediumWinding30LeadingMatrix").checked){
                        mediumMatrix = winding30LeadingMatrix;
                    }

                    let mediumDir = document.getElementById(this.id + "MediumDir").checked ? -1 : 1;


                    let lowAkA = Number(document.getElementById(this.id + "LowAkA").value);
                    let lowADeg = Number(document.getElementById(this.id + "LowADeg").value);

                    let lowBkA = Number(document.getElementById(this.id + "LowBkA").value);
                    let lowBDeg = Number(document.getElementById(this.id + "LowBDeg").value);

                    let lowCkA = Number(document.getElementById(this.id + "LowCkA").value);
                    let lowCDeg = Number(document.getElementById(this.id + "LowCDeg").value);

                    let lowUnom = Number(document.getElementById(this.id + "LowUnom").value);

                    let lowMatrix = [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0]
                    ];

                    if(document.getElementById(this.id + "LowReferenceWindingMatrix").checked){
                        lowMatrix = !document.getElementById(this.id + "ZSR").checked ? referenceWindingMatrixOn : referenceWindingMatrixOff;
                    }
                    else if(document.getElementById(this.id + "LowWinding30LeadingMatrix").checked){
                        lowMatrix = winding30LeadingMatrix;
                    }

                    let lowDir = document.getElementById(this.id + "LowDir").checked ? -1 : 1;


                    let highA = new Complex();
                    let highB = new Complex();
                    let highC = new Complex();

                    highA.setExponntial(highAkA * highDir, highADeg);
                    highB.setExponntial(highBkA * highDir, highBDeg);
                    highC.setExponntial(highCkA * highDir, highCDeg);

                    let mediumA = new Complex();
                    let mediumB = new Complex();
                    let mediumC = new Complex();

                    mediumA.setExponntial(mediumAkA * mediumDir, mediumADeg);
                    mediumB.setExponntial(mediumBkA * mediumDir, mediumBDeg);
                    mediumC.setExponntial(mediumCkA * mediumDir, mediumCDeg);

                    let lowA = new Complex();
                    let lowB = new Complex();
                    let lowC = new Complex();

                    lowA.setExponntial(lowAkA * lowDir, lowADeg);
                    lowB.setExponntial(lowBkA * lowDir, lowBDeg);
                    lowC.setExponntial(lowCkA * lowDir, lowCDeg);

                    let mediumKT = mediumUnom / highUnom;

                    let lowKT = lowUnom / highUnom;

                    let highAmatrixRel = (highA.r * highMatrix[0][0] + highB.r * highMatrix[0][1] + highC.r * highMatrix[0][2]);
                    let highBmatrixRel = (highA.r * highMatrix[1][0] + highB.r * highMatrix[1][1] + highC.r * highMatrix[1][2]);
                    let highCmatrixRel = (highA.r * highMatrix[2][0] + highB.r * highMatrix[2][1] + highC.r * highMatrix[2][2]);

                    let highAmatrixImg = (highA.i * highMatrix[0][0] + highB.i * highMatrix[0][1] + highC.i * highMatrix[0][2]);
                    let highBmatrixImg = (highA.i * highMatrix[1][0] + highB.i * highMatrix[1][1] + highC.i * highMatrix[1][2]);
                    let highCmatrixImg = (highA.i * highMatrix[2][0] + highB.i * highMatrix[2][1] + highC.i * highMatrix[2][2]);
                    

                    let mediumAmatrixRel = mediumKT * (mediumA.r * mediumMatrix[0][0] + mediumB.r * mediumMatrix[0][1] + mediumC.r * mediumMatrix[0][2]);
                    let mediumBmatrixRel = mediumKT * (mediumA.r * mediumMatrix[1][0] + mediumB.r * mediumMatrix[1][1] + mediumC.r * mediumMatrix[1][2]);
                    let mediumCmatrixRel = mediumKT * (mediumA.r * mediumMatrix[2][0] + mediumB.r * mediumMatrix[2][1] + mediumC.r * mediumMatrix[2][2]);

                    let mediumAmatrixImg = mediumKT * (mediumA.i * mediumMatrix[0][0] + mediumB.i * mediumMatrix[0][1] + mediumC.i * mediumMatrix[0][2]);
                    let mediumBmatrixImg = mediumKT * (mediumA.i * mediumMatrix[1][0] + mediumB.i * mediumMatrix[1][1] + mediumC.i * mediumMatrix[1][2]);
                    let mediumCmatrixImg = mediumKT * (mediumA.i * mediumMatrix[2][0] + mediumB.i * mediumMatrix[2][1] + mediumC.i * mediumMatrix[2][2]);


                    let lowAmatrixRel = lowKT * (lowA.r * lowMatrix[0][0] + lowB.r * lowMatrix[0][1] + lowC.r * lowMatrix[0][2]);
                    let lowBmatrixRel = lowKT * (lowA.r * lowMatrix[1][0] + lowB.r * lowMatrix[1][1] + lowC.r * lowMatrix[1][2]);
                    let lowCmatrixRel = lowKT * (lowA.r * lowMatrix[2][0] + lowB.r * lowMatrix[2][1] + lowC.r * lowMatrix[2][2]);

                    let lowAmatrixImg = lowKT * (lowA.i * lowMatrix[0][0] + lowB.i * lowMatrix[0][1] + lowC.i * lowMatrix[0][2]);
                    let lowBmatrixImg = lowKT * (lowA.i * lowMatrix[1][0] + lowB.i * lowMatrix[1][1] + lowC.i * lowMatrix[1][2]);
                    let lowCmatrixImg = lowKT * (lowA.i * lowMatrix[2][0] + lowB.i * lowMatrix[2][1] + lowC.i * lowMatrix[2][2]);

                    let maxCurrent = Math.max(highAkA, highBkA, highCkA, mediumAkA * mediumKT, mediumBkA * mediumKT, mediumCkA * mediumKT, lowAkA * lowKT, lowBkA * lowKT, lowCkA * lowKT);

                    let sumA = new Complex();
                    let sumB = new Complex();
                    let sumC = new Complex();

                    sumA.setRectangular(highAmatrixRel + mediumAmatrixRel + lowAmatrixRel, highAmatrixImg + mediumAmatrixImg + lowAmatrixImg);
                    sumB.setRectangular(highBmatrixRel + mediumBmatrixRel + lowBmatrixRel, highBmatrixImg + mediumBmatrixImg + lowBmatrixImg);
                    sumC.setRectangular(highCmatrixRel + mediumCmatrixRel + lowCmatrixRel, highCmatrixImg + mediumCmatrixImg + lowCmatrixImg);

                    iDiffA = sumA.a;
                    iDiffB = sumB.a;
                    iDiffC = sumC.a;
    
                    iBias = maxCurrent;
                }
                else{
                    iDiffA = document.getElementById(this.id + "iDiffA").value;
                    iDiffB = document.getElementById(this.id + "iDiffB").value;
                    iDiffC = document.getElementById(this.id + "iDiffC").value;
    
                    iBias = document.getElementById(this.id + "iBias").value;
                }

                let x1 = 0;
                let y1 = RCW1 * idNin;

                let x2 = RCW1 * ES1;
                let y2 = RCW1 * idNin;

                let x3 = RCW1 * ES2;
                let y3 = Math.atan((SS2 * 0.45) / 180 * Math.PI) * (x3 - RCW1 * ES1) + RCW1 * idNin;

                let y4 = RCW1 * idUnre;
                let x4 = x3 + (y4 - y3) / Math.atan((SS3 * 0.45) / 180 * Math.PI);

                let x5 = canvas.width / mult;
                let y5 = y4;

                ctx.fillStyle = "yellow";
                let pointA = new Path2D();
                pointA.arc(centX + (iBias * mult), centY - (iDiffA * mult), 4, 0, 2 * Math.PI);
                pointA.closePath();
                ctx.fill(pointA);

                ctx.fillStyle = "green";
                let pointB = new Path2D();
                pointB.arc(centX + (iBias * mult), centY - (iDiffB * mult), 4, 0, 2 * Math.PI);
                pointB.closePath();
                ctx.fill(pointB);


                ctx.fillStyle = "red";
                let pointC = new Path2D();
                pointC.arc(centX + (iBias * mult), centY - (iDiffC * mult), 4, 0, 2 * Math.PI);
                pointC.closePath();
                ctx.fill(pointC);

                ctx.strokeStyle = document.getElementById(this.id + "Color").value;
                ctx.lineWidth = 3;
                ctx.beginPath();

                ctx.lineTo(centX + (x1 * mult), centY - (y1 * mult));
                ctx.lineTo(centX + (x2 * mult), centY - (y2 * mult));
                ctx.lineTo(centX + (x3 * mult), centY - (y3 * mult));
                ctx.lineTo(centX + (x4 * mult), centY - (y4 * mult));
                ctx.lineTo(centX + (x5 * mult), centY - (y5 * mult));

                ctx.stroke();

                document.getElementById(this.id + "iDiffA").innerHTML = iDiffA;
                document.getElementById(this.id + "iDiffB").innerHTML = iDiffB;
                document.getElementById(this.id + "iDiffC").innerHTML = iDiffC;

                document.getElementById(this.id + "iBias").innerHTML = iBias;
            }
        }
        this.drawName = function(canvas, startY, maxWidth){
            let ctx = canvas.getContext("2d");
            if(this.isEnable){
                ctx.font = "15px Arial";

                ctx.fillStyle = document.getElementById(this.id + "Color").value;
                ctx.fillText(this.name, 10, startY, maxWidth - 10);

                ctx.fillStyle = "yellow";
                ctx.fillText("A", 10, startY + 20, maxWidth - 10);

                ctx.fillStyle = "green";
                ctx.fillText("B", 10, startY + 40, maxWidth - 10);

                ctx.fillStyle = "red";
                ctx.fillText("C", 10, startY + 60, maxWidth - 10);

                return 80;
            }
            return 0;
        }
        this.defineElement();
    }

    //RIO
    RIO(){
        this.innerHTML = `
        <div id="${this.id}Container" class = "inline">
            
            <div class="outerBox">
            <div class = "drop" id = "${this.id}RIO">
                <p>Drag RIO file here or</p>
                <div id = "${this.id}dropRIO"></div>
                <button class = "openButton" id = "${this.id}openRIO">Open</button>
            </div>
            </div>
            <hr class = "outerHr">
            <div class="class = "inline"">
                <div id = "${this.id}zones"><</div>
            </div>
        </div>
        `;
        this.defineElement();
        //this.eneble не используется, здесь ничего не менять
        this.enable = function(isEnable, parent){
            let RP = this;
            //console.log(parent, element)
            if(isEnable){
                parent.appendChild(RP.element);
                document.getElementById(RP.id + "RIO").ondrop = function dropHandler(ev) {
                    let rioFile;
                    // Prevent default behavior (Prevent file from being opened)
                    ev.preventDefault();
                  
                    if (ev.dataTransfer.items) {
                      // Use DataTransferItemList interface to access the file(s)
                        [...ev.dataTransfer.items].forEach((item, i) => {
                        // If dropped items aren't files, reject them
                            if (item.kind === "file") {
                                const file = item.getAsFile();
                                let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
                                if(type === "rio"){
                                    rioFile = file;
                                }
                            }
                        });
                        try{
                            document.getElementById(RP.id + "dropRIO").innerHTML = rioFile.name;
                        }catch{}
                        try{
                            let rio = new RioReader();
                            rio.readRio = function(){
                                let zonesInnerHTML = `
                                <hr class="innerHr">
                                <div class = "innerBox">
                                <p class="info">Device: ${rio.device}</p>                                     
                                <p class="info">Substation: ${rio.substation}</p>
                                <p class="info">Feeder: ${rio.feeder}</p>
                                <p class="info">Kr: ${rio.Kr}</p>
                                <p class="info">Kx: ${rio.Kx}</p>
                                <p class="info">ZO/Z1 MAG: ${rio.Z0Z1MAG}</p>
                                <p class="info">ZO/Z1 ANG: ${rio.Z0Z1ANG}</p>
                                <p class="info">KL MAG: ${rio.KLMAG}</p>
                                <p class="info">KL ANG: ${rio.KLANG}</p>

                                    <hr class="innerHr">
                                    <p class="text">U Secondary</p>
                                    <input type="number" id="${RP.id}UNom" class="textBox" value = "${rio.unom}">
                                    <p class="text">I Secondary</p>
                                    <input type="number" id="${RP.id}INom" class="textBox" value = "${rio.inom}">
                                    <hr class="innerHr">
                                    <p class="text">U Primary</p>
                                    <input type="number" id="${RP.id}UPrim" class="textBox" value = "${rio.unomPrimary}">
                                    <p class="text">I Primary</p>
                                    <input type="number" id="${RP.id}IPrim" class="textBox" value = "${rio.inomPrimary}">
                                    <hr class="innerHr">
                                
                                
                                <p class="text">Values type</p>
                                    <div class="direction">
                                        <label>
                                            <input type="checkbox" id="${RP.id}ValuesType" value="1">
                                            <span>Primary</span>
                                            Secondary
                                        </label>
                                    </div>
                                    </div>
                                <hr class="innerHr">
                            `;
                                let drawVisualisationFunction = `
                                    let ctx = canvas.getContext("2d");
                                    ctx.lineWidth = 3;

                                    mult = document.getElementById(this.id + "ValuesType").checked ? (Number(document.getElementById(this.id + "UPrim").value) / Number(document.getElementById(this.id + "UNom").value)) / (Number(document.getElementById(this.id + "IPrim").value) / Number(document.getElementById(this.id + "INom").value))  * mult : mult;
                                    mult=mult*${rio.starpoint};
                                    console.log(mult);
                                `;
                                let drawNameFunction = `
                                    let ctx = canvas.getContext("2d");
                                    ctx.font = "15px Arial";
                                    let counter = 0;
                                `;
                                for(let i = 0;i < rio.zones.length;i++){
                                    zonesInnerHTML += 
                                    `
                                        <div class = "innerBox">
                                            <h1 class="text">${rio.zones[i].name}</h1>
                                            <hr class="innerHr">
                                            <p class="text">Draw</p>
                                            <div class="direction">
                                                <label>
                                                    <input type="checkbox" id="${RP.id}${i}Draw" value="1">
                                                    <span>No</span>
                                                    Yes
                                                </label>
                                            </div>
                                            <hr class="innerHr">
                                            <p class="text">Color</p>
                                            <input type="color" id="${RP.id}${i}Color" class="colorBox">
                                        </div>
                                    `;
                                    drawVisualisationFunction += `
                                        if(!document.getElementById(this.id + "${i}Draw").checked){
                                            ctx.strokeStyle = document.getElementById(this.id + "${i}Color").value;
                                            if(is2F||is3F){
                                                ${rio.zones[i].drawTripchar}
                                            }
                                            if(is1F){
                                                ${rio.zones[i].drawTripchar_earth}
                                            }
                                        }
                                    `;
                                    drawNameFunction += `
                                        if(!document.getElementById(this.id + "${i}Draw").checked){
                                            ctx.fillStyle = document.getElementById(this.id + "${i}Color").value;
                                            ctx.fillText("${rio.zones[i].name}", 10, startY + counter, maxWidth - 10);
                                            counter += 20;
                                        }
                                    `;
                                }
                                drawVisualisationFunction += ``;
                                drawNameFunction += 'return counter;';
                                document.getElementById(RP.id + "zones").innerHTML = zonesInnerHTML;
                                RP.drawVisualisation = new Function(`canvas, mult, centX, centY, is1F, is2F, is3F`, drawVisualisationFunction);
                                RP.drawName = new Function(`canvas, startY, maxWidth, is1F, is2F, is3F`, drawNameFunction);
                            }
                            rio.read(rioFile);
                        }catch{}
                    }
                }
                document.getElementById(RP.id + "RIO").ondragover =  function dragOverHandler(ev) {
                    // Prevent default behavior (Prevent file from being opened)
                    ev.preventDefault();
                }
                document.getElementById(RP.id + "openRIO").onclick = function(e){
                    let rioFile;
                    let input = document.createElement('input');
                    input.type = 'file';
                    input.onchange = function(e){
                        let file = e.target.files[0];
                        let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
                        if(type === "rio"){
                            rioFile = file;
                        }
                        try{
                            document.getElementById(RP.id + "dropRIO").innerHTML = rioFile.name;
                        }catch{}
                        try{
                            let rio = new RioReader();
                            rio.readRio = function(){
                                let zonesInnerHTML = `
                                    <hr class="innerHr">
                                    <div class = "innerBox">
                                        <h1 class="text">Information</h1>
                                        <hr class="innerHr">
                                        <p class="text">Device</p>
                                        <div class="textBox">${rio.device}</div>
                                        <hr class="innerHr">
                                        <p class="text">Substation</p>
                                        <div class="textBox">${rio.substation}</div>
                                        <hr class="innerHr">
                                        <p class="text">Feeder</p>
                                        <div class="textBox">${rio.feeder}</div>
                                    </div>

                                    <hr class="innerHr">
                                    <p class="text">U Secondary</p>
                                    <input type="number" id="${RP.id}UNom" class="textBox" value = "${rio.unom.replace(",", "")}">
                                    <p class="text">I Secondary</p>
                                    <input type="number" id="${RP.id}INom" class="textBox" value = "${rio.inom.replace(",", "")}">
                                    <hr class="innerHr">
                                    <p class="text">U Primary</p>
                                    <input type="number" id="${RP.id}UPrim" class="textBox" value = "1">
                                    <p class="text">I Primary</p>
                                    <input type="number" id="${RP.id}IPrim" class="textBox" value = "1">
                                    <hr class="innerHr">


                                    <p class="text">Values type</p>
                                        <div class="direction">
                                            <label>
                                                <input type="checkbox" id="${RP.id}ValuesType" value="1">
                                                <span>Primary</span>
                                                Secondary
                                            </label>
                                        </div>
                                    <hr class="innerHr">
                                `;
                                let drawVisualisationFunction = `
                                    let ctx = canvas.getContext("2d");
                                    ctx.lineWidth = 3;

                                    mult = document.getElementById(this.id + "ValuesType").checked ? (Number(document.getElementById(this.id + "IPrim").value) / Number(document.getElementById(this.id + "INom").value)) / (Number(document.getElementById(this.id + "UPrim").value) / Number(document.getElementById(this.id + "UNom").value)) * mult : mult;
                                    mult=mult*${rio.starpoint};
                                    console.log(mult);
                                `;
                                let drawNameFunction = `
                                    let ctx = canvas.getContext("2d");
                                    ctx.font = "15px Arial";
                                    let counter = 0;
                                `;
                                for(let i = 0;i < rio.zones.length;i++){
                                    zonesInnerHTML += 
                                    `
                                        <div class = "innerBox">
                                            <h1 class="text">${rio.zones[i].name}</h1>
                                            <hr class="innerHr">
                                            <p class="text">Draw</p>
                                            <div class="direction">
                                                <label>
                                                    <input type="checkbox" id="${RP.id}${i}Draw" value="1">
                                                    <span>No</span>
                                                    Yes
                                                </label>
                                            </div>
                                            <hr class="innerHr">
                                            <p class="text">Color</p>
                                            <input type="color" id="${RP.id}${i}Color" class="colorBox">
                                        </div>
                                    `;
                                    drawVisualisationFunction += `
                                        if(!document.getElementById(this.id + "${i}Draw").checked){
                                            ctx.strokeStyle = document.getElementById(this.id + "${i}Color").value;
                                            if(is2F||is3F){
                                                ${rio.zones[i].drawTripchar}
                                            }
                                            if(is1F){
                                                ${rio.zones[i].drawTripchar_earth}
                                            }
                                        }
                                    `;
                                    drawNameFunction += `
                                        if(!document.getElementById(this.id + "${i}Draw").checked){
                                            ctx.fillStyle = document.getElementById(this.id + "${i}Color").value;
                                            ctx.fillText("${rio.zones[i].name}", 10, startY + counter, maxWidth - 10);
                                            counter += 20;
                                        }
                                    `;
                                }
                                drawVisualisationFunction += ``;
                                drawNameFunction += 'return counter;';
                                document.getElementById(RP.id + "zones").innerHTML = zonesInnerHTML;
                                RP.drawVisualisation = new Function(`canvas, mult, centX, centY, is1F, is2F, is3F`, drawVisualisationFunction);
                                RP.drawName = new Function(`canvas, startY, maxWidth, is1F, is2F, is3F`, drawNameFunction);
                            }
                            rio.read(rioFile);
                        }catch{}
                    }
                    input.click();
                }
            }
            else {
                parent.removeChild(RP.element);
            }
        }
        //работает эта функция
        this.enablingWithCheckbox = function(id, parent){
            let RP = this;
            document.getElementById(id).onchange = function(){
                RP.isEnable = document.getElementById(id).checked;
                //console.log(parent, element)
                if(RP.isEnable){
                    parent.appendChild(RP.element);
                    document.getElementById(RP.id + "RIO").ondrop = function dropHandler(ev) {
                        let rioFile;
                        // Prevent default behavior (Prevent file from being opened)
                        ev.preventDefault();
                      
                        if (ev.dataTransfer.items) {
                          // Use DataTransferItemList interface to access the file(s)
                            [...ev.dataTransfer.items].forEach((item, i) => {
                            // If dropped items aren't files, reject them
                                if (item.kind === "file") {
                                    const file = item.getAsFile();
                                    let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
                                    if(type === "rio"){
                                        rioFile = file;
                                    }
                                }
                            });
                            try{
                                document.getElementById(RP.id + "dropRIO").innerHTML = rioFile.name;
                            }catch{}
                            try{
                                let rio = new RioReader();
                                rio.readRio = function(){
                                    let zonesInnerHTML = `
                                        
                                        <div class = "outerBox">
                                        <h1 class="text">INFO</h1>
                                        <div class = "innerBox">
                                            <p class="info">Device: ${rio.device}</p>                                     
                                            <p class="info">Substation: ${rio.substation}</p>
                                            <p class="info">Feeder: ${rio.feeder}</p>
                                            <p class="info">Kr: ${rio.Kr}</p>
                                            <p class="info">Kx: ${rio.Kx}</p>
                                            <p class="info">ZO/Z1 MAG: ${rio.Z0Z1MAG}</p>
                                            <p class="info">ZO/Z1 ANG: ${rio.Z0Z1ANG}</p>
                                            <p class="info">KL MAG: ${rio.KLMAG}</p>
                                            <p class="info">KL ANG: ${rio.KLANG}</p>

                                            <hr class="innerHr">
                                            <p class="text">U Secondary</p>
                                            <input type="number" id="${RP.id}UNom" class="textBox" value = "${rio.unom}">
                                            <p class="text">I Secondary</p>
                                            <input type="number" id="${RP.id}INom" class="textBox" value = "${rio.inom}">
                                            <hr class="innerHr">
                                            <p class="text">U Primary</p>
                                            <input type="number" id="${RP.id}UPrim" class="textBox" value = "${rio.unomPrimary}">
                                            <p class="text">I Primary</p>
                                            <input type="number" id="${RP.id}IPrim" class="textBox" value = "${rio.inomPrimary}">
                                            <hr class="innerHr">
                                        
                                        
                                        <p class="text">Values type</p>
                                            <div class="direction">
                                                <label>
                                                    <input type="checkbox" id="${RP.id}ValuesType" value="1">
                                                    <span>Primary</span>
                                                    Secondary
                                                </label>
                                            </div>
                                            </div>
                                            </div>
                                        <hr class="outerHr">
                                        <div class = "outerBox">
                                        <h1 class="text">ZONES</h1>
                                    `;
                                    let drawVisualisationFunction = `
                                        let ctx = canvas.getContext("2d");
                                        ctx.lineWidth = 3;

                                        mult = document.getElementById(this.id + "ValuesType").checked ? (Number(document.getElementById(this.id + "UPrim").value) / Number(document.getElementById(this.id + "UNom").value)) / (Number(document.getElementById(this.id + "IPrim").value) / Number(document.getElementById(this.id + "INom").value))  * mult : mult;
                                        
                                    `;
                                    let drawNameFunction = `
                                        let ctx = canvas.getContext("2d");
                                        ctx.font = "15px Arial";
                                        let counter = 0;
                                    `;
                                    for(let i = 0;i < rio.zones.length;i++){
                                        zonesInnerHTML += 
                                        `
                                            <div class = "innerBox">
                                                <h1 class="text">${rio.zones[i].name}</h1>
                                                <p class="info">TPE: ${rio.zones[i].time1}</p>
                                                <p class="info">TPP: ${rio.zones[i].timem}</p>
                                                <hr class="innerHr">
                                                <p class="text">Draw</p>
                                                <div class="direction">
                                                    <label>
                                                        <input type="checkbox" id="${RP.id}${i}Draw" value="1">
                                                        <span>No</span>
                                                        Yes
                                                    </label>
                                                </div>
                                                <hr class="innerHr">
                                                <p class="text">Color</p>
                                                <input type="color" id="${RP.id}${i}Color" class="colorBox">
                                            </div>
                                        `;
                                        drawVisualisationFunction += `
                                            if(!document.getElementById(this.id + "${i}Draw").checked){
                                                ctx.strokeStyle = document.getElementById(this.id + "${i}Color").value;
                                                if(is2F||is3F){
                                                    ${rio.zones[i].drawTripchar}
                                                }
                                                if(is1F){
                                                    ${rio.zones[i].drawTripchar_earth}
                                                }
                                            }
                                        `;
                                        drawNameFunction += `
                                            if(!document.getElementById(this.id + "${i}Draw").checked){
                                                ctx.fillStyle = document.getElementById(this.id + "${i}Color").value;
                                                ctx.fillText("${rio.zones[i].name}", 10, startY + counter, maxWidth - 10);
                                                counter += 20;
                                            }
                                        `;
                                    }
                                    zonesInnerHTML += 
                                        `
                                        </div>
                                        `;

                                    drawVisualisationFunction += ``;
                                    drawNameFunction += 'return counter;';
                                    document.getElementById(RP.id + "zones").innerHTML = zonesInnerHTML;
                                    RP.drawVisualisation = new Function(`canvas, mult, centX, centY, is1F, is2F, is3F`, drawVisualisationFunction);                                   
                                    RP.drawName = new Function(`canvas, startY, maxWidth, is1F, is2F, is3F`, drawNameFunction);
                                    
                                }
                                rio.read(rioFile);
                            }catch{}
                        }
                    }
                    document.getElementById(RP.id + "RIO").ondragover =  function dragOverHandler(ev) {
                        // Prevent default behavior (Prevent file from being opened)
                        ev.preventDefault();
                    }
                    document.getElementById(RP.id + "openRIO").onclick = function(e){
                        let rioFile;
                        let input = document.createElement('input');
                        input.type = 'file';
                        input.onchange = function(e){
                            let file = e.target.files[0];
                            let type = file.name.split('').reverse().join('').split('.')[0].split('').reverse().join('').toLowerCase();
                            if(type === "rio"){
                                rioFile = file;
                            }
                            try{
                                document.getElementById(RP.id + "dropRIO").innerHTML = rioFile.name;
                            }catch{}
                            try{
                                let rio = new RioReader();
                                rio.readRio = function(){
                                    let zonesInnerHTML = `
                                    
                                    <div class = "outerBox">
                                    <h1 class="text">INFO</h1>
                                    <div class = "innerBox">
                                    <p class="info">Device: ${rio.device}</p>                                     
                                    <p class="info">Substation: ${rio.substation}</p>
                                    <p class="info">Feeder: ${rio.feeder}</p>
                                    <p class="info">Kr: ${rio.Kr}</p>
                                    <p class="info">Kx: ${rio.Kx}</p>
                                    <p class="info">ZO/Z1 MAG: ${rio.Z0Z1MAG}</p>
                                    <p class="info">ZO/Z1 ANG: ${rio.Z0Z1ANG}</p>
                                    <p class="info">KL MAG: ${rio.KLMAG}</p>
                                    <p class="info">KL ANG: ${rio.KLANG}</p>

                                        <hr class="innerHr">
                                        <p class="text">U Secondary</p>
                                        <input type="number" id="${RP.id}UNom" class="textBox" value = "${rio.unom}">
                                        <p class="text">I Secondary</p>
                                        <input type="number" id="${RP.id}INom" class="textBox" value = "${rio.inom}">
                                        <hr class="innerHr">
                                        <p class="text">U Primary</p>
                                        <input type="number" id="${RP.id}UPrim" class="textBox" value = "${rio.unomPrimary}">
                                        <p class="text">I Primary</p>
                                        <input type="number" id="${RP.id}IPrim" class="textBox" value = "${rio.inomPrimary}">
                                        <hr class="innerHr">
                                    
                                    
                                    <p class="text">Values type</p>
                                        <div class="direction">
                                            <label>
                                                <input type="checkbox" id="${RP.id}ValuesType" value="1">
                                                <span>Primary</span>
                                                Secondary
                                            </label>
                                        </div>
                                        </div>
                                        </div>
                                    <hr class="outerHr">
                                    <div class = "outerBox">
                                    <h1 class="text">ZONES</h1>
                                `;
                                    let drawVisualisationFunction = `
                                        let ctx = canvas.getContext("2d");
                                        ctx.lineWidth = 3;

                                        mult = document.getElementById(this.id + "ValuesType").checked ? (Number(document.getElementById(this.id + "UPrim").value) / Number(document.getElementById(this.id + "UNom").value)) / (Number(document.getElementById(this.id + "IPrim").value) / Number(document.getElementById(this.id + "INom").value))  * mult : mult;
                                       
                                    `;
                                    let drawNameFunction = `
                                        let ctx = canvas.getContext("2d");
                                        ctx.font = "15px Arial";
                                        let counter = 0;
                                    `;
                                    for(let i = 0;i < rio.zones.length;i++){
                                        zonesInnerHTML += 
                                        `
                                            <div class = "innerBox">
                                                <h1 class="text">${rio.zones[i].name}</h1>
                                                <hr class="innerHr">
                                                <p class="text">Draw</p>
                                                <div class="direction">
                                                    <label>
                                                        <input type="checkbox" id="${RP.id}${i}Draw" value="1">
                                                        <span>No</span>
                                                        Yes
                                                    </label>
                                                </div>
                                                <hr class="innerHr">
                                                <p class="text">Color</p>
                                                <input type="color" id="${RP.id}${i}Color" class="colorBox">
                                            </div>
                                        `;
                                        drawVisualisationFunction += `
                                            if(!document.getElementById(this.id + "${i}Draw").checked){
                                                ctx.strokeStyle = document.getElementById(this.id + "${i}Color").value;
                                                if(is2F||is3F){
                                                    ${rio.zones[i].drawTripchar}
                                                }
                                                if(is1F){
                                                    ${rio.zones[i].drawTripchar_earth}
                                                }
                                            }
                                        `;
                                        drawNameFunction += `
                                            if(!document.getElementById(this.id + "${i}Draw").checked){
                                                ctx.fillStyle = document.getElementById(this.id + "${i}Color").value;
                                                ctx.fillText("${rio.zones[i].name}", 10, startY + counter, maxWidth - 10);
                                                counter += 20;
                                            }
                                        `;
                                    }
                                    zonesInnerHTML += 
                                        `
                                        </div>
                                        `;

                                    
                                    drawVisualisationFunction += ``;
                                    drawNameFunction += 'return counter;';
                                    document.getElementById(RP.id + "zones").innerHTML = zonesInnerHTML;
                                    RP.drawVisualisation = new Function(`canvas, mult, centX, centY, is1F, is2F, is3F`, drawVisualisationFunction);
                                    console.log(drawNameFunction);
                                    RP.drawName = new Function(`canvas, startY, maxWidth, is1F, is2F, is3F`, drawNameFunction);
                                    
                                }
                                rio.read(rioFile);
                            }catch{}
                        }
                        input.click();
                    }
                }
                else {
                    parent.removeChild(RP.element);
                }
            }
        }
    }

}
class ExponentialLink{
    unitID;
    degreeID;
    name;
    unit;
    constructor(unitID, degreeID, name, unit){
        this.unitID = unitID;
        this.degreeID = degreeID;
        this.name = name;
        this.unit = unit;
    }
}
class InstLink{
    valID;
    name;
    unit;
    constructor(valID, name, unit){
        this.valID = valID;
        this.name = name;
        this.unit = unit;
    }
}
class DynamikLink{
    valID;
    name;
    unit;
    constructor(valID, name, unit){
        this.valID = valID;
        this.name = name;
        this.unit = unit;
    }
}
class Complex{
    r = 0;
    i = 0;
    a = 0;
    f = 0;
    constructor(){
        this.r = 0;
        this.i = 0;
        this.a = 0;
        this.f = 0;
    }
    setExponntial(a, f){
        this.a = Number(a);
        this.f = Number(f);
        this.r = Number(a) * Math.cos(Number(f) * Math.PI / 180);
        this.i = Number(a) * Math.sin(Number(f) * Math.PI / 180);
    }
    setRectangular(r, i){
        this.r = Number(r);
        this.i = Number(i);
        this.a = Math.sqrt((Number(r) * Number(r)) + (Number(i) * Number(i)));
        this.f = Math.atan2(Number(i), Number(r)) * 180 / Math.PI;
    }
    setAll(a, f, r, i){
        this.a = Number(a);
        this.f = Number(f);
        this.r = Number(r);
        this.i = Number(i);
    }
    plus(x, y){
        this.setRectangular((x.r + y.r), (x.i + y.i));
    }
    minus(x, y){
        this.setRectangular((x.r - y.r), (x.i - y.i));
    }
    increase(x, y){
        this.setExponntial((x.a * y.a), (x.f + y.f));
    }
    decrease(x, y){
        this.setExponntial((x.a / y.a), (x.f - y.f));
    }
}
