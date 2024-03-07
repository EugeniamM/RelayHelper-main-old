function NormalizeAngle(angle){
    while(angle < 0){
        angle += 360;
    }
    while(angle > 360){
        angle -= 360;
    }
    return angle;
}
/*class PhaseColorSet{
    A = "#ffde0a";
    B = "green";
    C = "red";
    constructor(){}
    constructor(A, B, C){
        this.A = A;
        this.B = B;
        this.C = C;
    }
}*/
class VDGroup{
    vdParentID;
    vdList;
    idCounter = 0;
    a;
    b;
    c;
    isEnable = false;
    element;
    //colorSet;
    constructor(vdParentID, checkboxID){
        this.vdParentID = vdParentID;
        this.vdList = new Array();
        this.id = "vdGroup";
        this.isEnable;
        let innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <div class = "inline">
                    <div class = "innerBox">
                        <div class="textBox">Sum</div>
                        <hr class="innerHr">
                        <div id="${this.id}AVal" style = "background: #ffde0a;min-width:172" class="textBox"></div>
                        <div id="${this.id}ADeg" style = "background: #ffde0a;min-width:172" class="textBox"></div>
                        <div id="${this.id}AType" style = "background: #ffde0a" class="textBox"></div>
                        <div></div>
                        <div id="${this.id}BVal" style = "background: green;min-width:172" class="textBox"></div>
                        <div id="${this.id}BDeg" style = "background: green;min-width:172" class="textBox"></div>
                        <div id="${this.id}BType" style = "background: green" class="textBox"></div>
                        <div></div>
                        <div id="${this.id}CVal" style = "background: red;min-width:172" class="textBox"></div>
                        <div id="${this.id}CDeg" style = "background: red;min-width:172" class="textBox"></div>
                        <div id="${this.id}CType" style = "background: red" class="textBox"></div>
                    </div>
                </div>
                <div class = "innerBox">
                    <canvas width = "400" height = "400" id = "${this.id}Canvas" class = "canvas"></canvas>
                </div>
            </div>
        `;
        //this.colorSet = new PhaseColorSet();
        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(innerHTML, 'text/html');
        this.element = parsedDoc.getElementById(this.id + "Container");
        let _VD = this;
        document.getElementById(checkboxID).onchange = function(){
            _VD.isEnable = document.getElementById(checkboxID).checked;
            if(_VD.isEnable){
                document.getElementById(vdParentID).appendChild(_VD.element);
            }
            else {
                document.getElementById(vdParentID).removeChild(_VD.element);
            }
        }
    }
    Update(){
        let max = 0;
        for(let i = 0;i < this.vdList.length;i++){
            if(Number(document.getElementById(this.vdList[i].id + "AVal").value) > max){
                max = Number(document.getElementById(this.vdList[i].id + "AVal").value);
            }
            if(Number(document.getElementById(this.vdList[i].id + "BVal").value) > max){
                max = Number(document.getElementById(this.vdList[i].id + "BVal").value);
            }
            if(Number(document.getElementById(this.vdList[i].id + "CVal").value) > max){
                max = Number(document.getElementById(this.vdList[i].id + "CVal").value);
            }
        }
        let sumRA = 0;
        let sumIA = 0;

        let sumRB = 0;
        let sumIB = 0;

        let sumRC = 0;
        let sumIC = 0;

        for(let i = 0;i < this.vdList.length;i++){
            this.vdList[i].Update(max);
            sumRA += this.vdList[i].a.r;
            sumIA += this.vdList[i].a.i;

            sumRB += this.vdList[i].b.r;
            sumIB += this.vdList[i].b.i;

            sumRC += this.vdList[i].c.r;
            sumIC += this.vdList[i].c.i;
        }
        if(this.isEnable){    
            let canvas = document.getElementById(this.id + "Canvas");
            let ctx = canvas.getContext("2d");
    
            let a = new Complex();
            a.setRectangular(sumRA, sumIA);
    
            let b = new Complex();
            b.setRectangular(sumRB, sumIB);
    
            let c = new Complex();
            c.setRectangular(sumRC, sumIC);
    
            this.a = a;
            this.b = b;
            this.c = c;
    
            let scale = canvas.width / 2 / ((a.a > b.a ? a.a : b.a) > c.a ? (a.a > b.a ? a.a : b.a) : c.a) / 1.2;
    
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
    
            ctx.beginPath();
    
            ctx.moveTo(0, 0);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(canvas.width, 0);
            ctx.lineTo(0, 0);
    
            ctx.stroke();
    
            ctx.lineWidth = 0.5;
    
            ctx.beginPath();
    
            let deg = 30;
            for (let i = 0; i < 360 / deg; i++) {
                ctx.moveTo(canvas.width / 2, canvas.height / 2);
                ctx.lineTo(canvas.width / 2 + Math.hypot(canvas.width, canvas.width) * Math.cos((i * deg + 90) / 180 * Math.PI), canvas.height / 2 - Math.hypot(canvas.height, canvas.height) * Math.sin((i * deg + 90) / 180 * Math.PI));
                if (i > 1000) {
                    break;
                }
            }
    
            ctx.stroke();
    
            let period = 1;
            ctx.fillStyle = "black";
            ctx.beginPath();
            for (let i = 1; i < canvas.width / 2 / scale / period; i++) {
                ctx.moveTo(canvas.width / 2 + i * period * scale, canvas.height / 2);
                ctx.arc(canvas.width / 2,canvas.height / 2, i * period * scale, 0, 2 * Math.PI);
                if (i > 1000) {
                    break;
                }
            }
            ctx.stroke();
    
    
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#ffde0a";
            ctx.beginPath();
    
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + a.r * scale, canvas.width / 2 - a.i * scale);
    
            if(a.a > 0){
                ctx.moveTo(canvas.width / 2 + a.r * scale, canvas.width / 2 - a.i * scale);
                ctx.lineTo(canvas.width / 2 + a.r * scale - 15 * Math.cos((a.f + 20) / 180 * Math.PI), canvas.width / 2 - a.i * scale + 15 * Math.sin((a.f + 20) / 180 * Math.PI));
                
                ctx.moveTo(canvas.width / 2 + a.r * scale, canvas.width / 2 - a.i * scale);
                ctx.lineTo(canvas.width / 2 + a.r * scale - 15 * Math.cos((a.f - 20) / 180 * Math.PI), canvas.width / 2 - a.i * scale + 15 * Math.sin((a.f - 20) / 180 * Math.PI));    
            }
    
            ctx.stroke();
    
            ctx.strokeStyle = "green";
            ctx.beginPath();
    
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + b.r * scale, canvas.width / 2 - b.i * scale);
    
            if(b.a > 0){
                ctx.moveTo(canvas.width / 2 + b.r * scale, canvas.width / 2 - b.i * scale);
                ctx.lineTo(canvas.width / 2 + b.r * scale - 15 * Math.cos((b.f + 20) / 180 * Math.PI), canvas.width / 2 - b.i * scale + 15 * Math.sin((b.f + 20) / 180 * Math.PI));
                
                ctx.moveTo(canvas.width / 2 + b.r * scale, canvas.width / 2 - b.i * scale);
                ctx.lineTo(canvas.width / 2 + b.r * scale - 15 * Math.cos((b.f - 20) / 180 * Math.PI), canvas.width / 2 - b.i * scale + 15 * Math.sin((b.f - 20) / 180 * Math.PI));
            }
    
            ctx.stroke();
    
            ctx.strokeStyle = "red";
            ctx.beginPath();
    
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + c.r * scale, canvas.width / 2 - c.i * scale);
    
            if(c.a > 0){
                ctx.moveTo(canvas.width / 2 + c.r * scale, canvas.width / 2 - c.i * scale);
                ctx.lineTo(canvas.width / 2 + c.r * scale - 15 * Math.cos((c.f + 20) / 180 * Math.PI), canvas.width / 2 - c.i * scale + 15 * Math.sin((c.f + 20) / 180 * Math.PI));
                
                ctx.moveTo(canvas.width / 2 + c.r * scale, canvas.width / 2 - c.i * scale);
                ctx.lineTo(canvas.width / 2 + c.r * scale - 15 * Math.cos((c.f - 20) / 180 * Math.PI), canvas.width / 2 - c.i * scale + 15 * Math.sin((c.f - 20) / 180 * Math.PI));
            }
    
            ctx.stroke();

            let aDeg = NormalizeAngle(a.f);
            let bDeg = NormalizeAngle(b.f);
            let cDeg = NormalizeAngle(c.f);

            let aType = (aDeg >= 90 && aDeg < 270) ? "C" : "L";
            let bType = (bDeg >= 90 && bDeg < 270) ? "C" : "L";
            let cType = (cDeg >= 90 && cDeg < 270) ? "C" : "L";

            document.getElementById(this.id + "AVal").innerHTML = a.a.toFixed(4) * 1;
            document.getElementById(this.id + "ADeg").innerHTML = NormalizeAngle(Math.round((aDeg - 90) * ((aDeg >= 90 && aDeg < 270) ? 1 : -1))) + " °";
            document.getElementById(this.id + "AType").innerHTML = aType;

            document.getElementById(this.id + "BVal").innerHTML = b.a.toFixed(4) * 1;
            document.getElementById(this.id + "BDeg").innerHTML = NormalizeAngle(Math.round((bDeg - 90) * ((bDeg >= 90 && bDeg < 270) ? 1 : -1))) + " °";
            document.getElementById(this.id + "BType").innerHTML = bType;

            document.getElementById(this.id + "CVal").innerHTML = c.a.toFixed(4) * 1;
            document.getElementById(this.id + "CDeg").innerHTML = NormalizeAngle(Math.round((cDeg - 90) * ((cDeg >= 90 && cDeg < 270) ? 1 : -1))) + " °";
            document.getElementById(this.id + "CType").innerHTML = cType;
        }
    }
    addVd(){
        this.vdList.push(new VD("Vd-sample" + this.idCounter, this.vdParentID, this.vdList));
        this.idCounter++;
    }
    toImage(topText, bottomText, unit){
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        let topTextLength = topText.length * 10;
        let bottomTextLength = bottomText.length * 5;

        canvas.width = 700;
        canvas.height = 50 + this.vdList.length * 400 + (this.isEnable ? 400 : 0) + 50;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let usedSpace = 0;

        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(topText, (canvas.width - topTextLength) / 2, 30)

        usedSpace += 50;

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(0, usedSpace);
        ctx.lineTo(canvas.width, usedSpace);

        ctx.stroke();

        ctx.font = "15px Arial";

        for(let i = 0;i < this.vdList.length;i++){ 
            ctx.putImageData(document.getElementById(this.vdList[i].id + "Canvas").getContext("2d").getImageData(0, 0, 400, 400), 300, usedSpace);

            ctx.fillStyle = "rgb(220, 220, 220)";
            ctx.fillRect(0, usedSpace, 300, 40);

            ctx.fillStyle = "rgb(200, 200, 200)";
            ctx.fillRect(0, usedSpace + 40, 300, 40);

            ctx.fillStyle = "#ffde0a";
            ctx.fillRect(0, usedSpace + 80, 50, 40);

            ctx.fillStyle = "green";
            ctx.fillRect(0, usedSpace + 120, 50, 40);

            ctx.fillStyle = "red";
            ctx.fillRect(0, usedSpace + 160, 50, 40);

            ctx.beginPath();

            ctx.moveTo(50, usedSpace + 40);
            ctx.lineTo(50, usedSpace + 200);

            ctx.moveTo(150, usedSpace + 40);
            ctx.lineTo(150, usedSpace + 200);

            ctx.moveTo(250, usedSpace + 40);
            ctx.lineTo(250, usedSpace + 200);

            ctx.moveTo(300, usedSpace);
            ctx.lineTo(300, usedSpace + 400);


            ctx.moveTo(0, usedSpace + 40);
            ctx.lineTo(300, usedSpace + 40);

            ctx.moveTo(0, usedSpace + 80);
            ctx.lineTo(300, usedSpace + 80);

            ctx.moveTo(0, usedSpace + 120);
            ctx.lineTo(300, usedSpace + 120);

            ctx.moveTo(0, usedSpace + 160);
            ctx.lineTo(300, usedSpace + 160);


            ctx.moveTo(0, usedSpace + 40);
            ctx.lineTo(50, usedSpace + 80);

            ctx.fillStyle = "black";

            ctx.stroke();

            ctx.fillText(document.getElementById(this.vdList[i].id + "Name").value === "" ? "Measurment " + i : document.getElementById(this.vdList[i].id + "Name").value, 15, usedSpace + 25);

            ctx.fillText("A", 20, usedSpace + 25 + 80);
            ctx.fillText("B", 20, usedSpace + 25 + 120);
            ctx.fillText("C", 20, usedSpace + 25 + 160);

            ctx.fillText("Value", 30 + 50, usedSpace + 25 + 40);
            ctx.fillText("Angle", 30 + 150, usedSpace + 25 + 40);
            ctx.fillText("Type", 10 + 250, usedSpace + 25 + 40);

            ctx.fillText(document.getElementById(this.vdList[i].id + "AVal").value + " " + unit, 10 + 50, usedSpace + 25 + 80);
            ctx.fillText(document.getElementById(this.vdList[i].id + "BVal").value + " " + unit, 10 + 50, usedSpace + 25 + 120);
            ctx.fillText(document.getElementById(this.vdList[i].id + "CVal").value + " " + unit, 10 + 50, usedSpace + 25 + 160);

            ctx.fillText(document.getElementById(this.vdList[i].id + "ADeg").value + " °", 10 + 150, usedSpace + 25 + 80);
            ctx.fillText(document.getElementById(this.vdList[i].id + "BDeg").value + " °", 10 + 150, usedSpace + 25 + 120);
            ctx.fillText(document.getElementById(this.vdList[i].id + "CDeg").value + " °", 10 + 150, usedSpace + 25 + 160);

            ctx.fillText(document.getElementById(this.vdList[i].id + "AType").checked ? "C" : "L", 10 + 250, usedSpace + 25 + 80);
            ctx.fillText(document.getElementById(this.vdList[i].id + "BType").checked ? "C" : "L", 10 + 250, usedSpace + 25 + 120);
            ctx.fillText(document.getElementById(this.vdList[i].id + "CType").checked ? "C" : "L", 10 + 250, usedSpace + 25 + 160);

            ctx.beginPath();

            ctx.moveTo(0, usedSpace + 200);
            ctx.lineTo(300, usedSpace + 200);

            ctx.moveTo(0, usedSpace);
            ctx.lineTo(canvas.width, usedSpace);

            ctx.moveTo(0, usedSpace + 400);
            ctx.lineTo(canvas.width, usedSpace + 400);

            ctx.moveTo(0, usedSpace);
            ctx.lineTo(canvas.width, usedSpace);

            ctx.stroke();

            usedSpace += 400;
        }

        if(this.isEnable){
            let offset = 0;

            ctx.putImageData(document.getElementById(this.id + "Canvas").getContext("2d").getImageData(0, 0, 400, 400), 300 + offset, usedSpace);

            ctx.fillStyle = "rgb(220, 220, 220)";
            ctx.fillRect(offset, usedSpace, 300, 40);

            ctx.fillStyle = "rgb(200, 200, 200)";
            ctx.fillRect(offset, usedSpace + 40, 300, 40);

            ctx.fillStyle = "#ffde0a";
            ctx.fillRect(offset, usedSpace + 80, 50, 40);

            ctx.fillStyle = "green";
            ctx.fillRect(offset, usedSpace + 120, 50, 40);

            ctx.fillStyle = "red";
            ctx.fillRect(offset, usedSpace + 160, 50, 40);

            ctx.beginPath();

            ctx.moveTo(50 + offset, usedSpace + 40);
            ctx.lineTo(50 + offset, usedSpace + 200);

            ctx.moveTo(150 + offset, usedSpace + 40);
            ctx.lineTo(150 + offset, usedSpace + 200);

            ctx.moveTo(250 + offset, usedSpace + 40);
            ctx.lineTo(250 + offset, usedSpace + 200);

            ctx.moveTo(300 + offset, usedSpace);
            ctx.lineTo(300 + offset, usedSpace + 400);


            ctx.moveTo(offset, usedSpace + 40);
            ctx.lineTo(300 + offset, usedSpace + 40);

            ctx.moveTo(offset, usedSpace + 80);
            ctx.lineTo(300 + offset, usedSpace + 80);

            ctx.moveTo(offset, usedSpace + 120);
            ctx.lineTo(300 + offset, usedSpace + 120);

            ctx.moveTo(offset, usedSpace + 160);
            ctx.lineTo(300 + offset, usedSpace + 160);


            ctx.moveTo(offset, usedSpace + 40);
            ctx.lineTo(50 + offset, usedSpace + 80);

            ctx.fillStyle = "black";

            ctx.stroke();

            ctx.fillText("Sum", 15 + offset, usedSpace + 25);

            ctx.fillText("A", 20 + offset, usedSpace + 25 + 80);
            ctx.fillText("B", 20 + offset, usedSpace + 25 + 120);
            ctx.fillText("C", 20 + offset, usedSpace + 25 + 160);

            ctx.fillText("Value", 30 + 50 + offset, usedSpace + 25 + 40);
            ctx.fillText("Angle", 30 + 150 + offset, usedSpace + 25 + 40);
            ctx.fillText("Type", 10 + 250 + offset, usedSpace + 25 + 40);

            ctx.fillText(this.a.a.toFixed(4) * 1 + " " + unit, 10 + 50 + offset, usedSpace + 25 + 80);
            ctx.fillText(this.b.a.toFixed(4) * 1 + " " + unit, 10 + 50 + offset, usedSpace + 25 + 120);
            ctx.fillText(this.c.a.toFixed(4) * 1 + " " + unit, 10 + 50 + offset, usedSpace + 25 + 160);

            let aDeg = NormalizeAngle(this.a.f);
            let bDeg = NormalizeAngle(this.b.f);
            let cDeg = NormalizeAngle(this.c.f);

            let aType = (aDeg >= 90 && aDeg < 270) ? "C" : "L";
            let bType = (bDeg >= 90 && bDeg < 270) ? "C" : "L";
            let cType = (cDeg >= 90 && cDeg < 270) ? "C" : "L";

            ctx.fillText(NormalizeAngle(Math.round((aDeg - 90) * ((aDeg >= 90 && aDeg < 270) ? 1 : -1))) + " °", 10 + 150 + offset, usedSpace + 25 + 80);
            ctx.fillText(NormalizeAngle(Math.round((bDeg - 90) * ((bDeg >= 90 && bDeg < 270) ? 1 : -1))) + " °", 10 + 150 + offset, usedSpace + 25 + 120);
            ctx.fillText(NormalizeAngle(Math.round((cDeg - 90) * ((cDeg >= 90 && cDeg < 270) ? 1 : -1))) + " °", 10 + 150 + offset, usedSpace + 25 + 160);

            ctx.fillText(aType, 10 + 250 + offset, usedSpace + 25 + 80);
            ctx.fillText(bType, 10 + 250 + offset, usedSpace + 25 + 120);
            ctx.fillText(cType, 10 + 250 + offset, usedSpace + 25 + 160);

            ctx.beginPath();

            ctx.moveTo(0, usedSpace + 200);
            ctx.lineTo(300, usedSpace + 200);

            ctx.moveTo(0, usedSpace);
            ctx.lineTo(canvas.width, usedSpace);

            ctx.moveTo(0, usedSpace + 400);
            ctx.lineTo(canvas.width, usedSpace + 400);

            ctx.moveTo(0, usedSpace);
            ctx.lineTo(canvas.width, usedSpace);

            ctx.stroke();

            usedSpace += 400;
        }

        ctx.fillStyle = "black";
        ctx.font = "15px Arial";

        ctx.fillText(bottomText, 20, usedSpace + 30);

        return canvas;
    }
}
class VD{
    parentID;
    id;
    element;
    memberOf;
    a;
    b;
    c;
    constructor(id, parentID, memberOf){
        this.parentID = parentID;
        this.id = id;
        this.memberOf = memberOf;
        let innerHTML = `
            <div id="${this.id}Container" class="outerBox">
                <div class = "inline">
                    <div class = "innerBox">
                        <input type="text" id="${this.id}Name" class="textBox" placeholder = "Name">
                        <hr class="innerHr">
                        <input type="number" id="${this.id}AVal" style = "background: #ffde0a" class="textBox" placeholder = "A Val">
                        <input type="number" id="${this.id}ADeg" style = "background: #ffde0a" class="textBox" placeholder = "A Deg">
                        <div style = "display: inline-block;min-width: 50px">
                            <div class="direction">
                                <label>
                                    <input type="checkbox" id="${this.id}AType" value="1">
                                    <span>C</span>
                                    L
                                </label>
                            </div>
                        </div>
                        <div></div>
                        <input type="number" id="${this.id}BVal" style = "background: green" class="textBox" placeholder = "B Val">
                        <input type="number" id="${this.id}BDeg" style = "background: green" class="textBox" placeholder = "B Deg">
                        <div style = "display: inline-block;min-width: 50px">
                            <div class="direction">
                                <label>
                                    <input type="checkbox" id="${this.id}BType" value="1">
                                    <span>C</span>
                                    L
                                </label>
                            </div>
                        </div>
                        <div></div>
                        <input type="number" id="${this.id}CVal" style = "background: red" class="textBox" placeholder = "C Val">
                        <input type="number" id="${this.id}CDeg" style = "background: red" class="textBox" placeholder = "C Deg">
                        <div style = "display: inline-block;min-width: 50px">
                            <div class="direction">
                                <label>
                                    <input type="checkbox" id="${this.id}CType" value="1">
                                    <span>C</span>
                                    L
                                </label>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class = "innerBox">
                        <button class = "button" id = "${this.id}Delete">Delete</button>
                    </div>
                </div>
                <div class = "innerBox">
                    <canvas width = "400" height = "400" id = "${this.id}Canvas" class = "canvas"></canvas>
                </div>
            </div>
        `;

        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(innerHTML, 'text/html');
        this.element = parsedDoc.getElementById(this.id + "Container");
        document.getElementById(parentID).appendChild(this.element);
        let _VD = this;
        document.getElementById(this.id + "Delete").onclick = function(){
            document.getElementById(_VD.parentID).removeChild(_VD.element);
            for(let i = 0;i < _VD.memberOf.length;i++){
                if(_VD.memberOf[i].id === _VD.id){
                    _VD.memberOf.splice(i, 1); 
                    break;
                }
            }
        }
    }
    Update(max){
        let canvas = document.getElementById(this.id + "Canvas");
        let ctx = canvas.getContext("2d");

        let aVal = Number(document.getElementById(this.id + "AVal").value);
        let aDeg = Number(document.getElementById(this.id + "ADeg").value) * (document.getElementById(this.id + "AType").checked ? 1 : -1) + 90;

        let bVal = Number(document.getElementById(this.id + "BVal").value);
        let bDeg = Number(document.getElementById(this.id + "BDeg").value) * (document.getElementById(this.id + "BType").checked ? 1 : -1) + 90;

        let cVal = Number(document.getElementById(this.id + "CVal").value);
        let cDeg = Number(document.getElementById(this.id + "CDeg").value) * (document.getElementById(this.id + "CType").checked ? 1 : -1) + 90;

        let a = new Complex();
        a.setExponntial(aVal, aDeg);

        let b = new Complex();
        b.setExponntial(bVal, bDeg);

        let c = new Complex();
        c.setExponntial(cVal, cDeg);

        this.a = a;
        this.b = b;
        this.c = c;

        let scale = canvas.width / 2 / max / 1.2;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";

        ctx.beginPath();

        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(0, 0);

        ctx.stroke();

        ctx.lineWidth = 0.5;

        ctx.beginPath();

        let deg = 30;
        for (let i = 0; i < 360 / deg; i++) {
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + Math.hypot(canvas.width, canvas.width) * Math.cos((i * deg + 90) / 180 * Math.PI), canvas.height / 2 - Math.hypot(canvas.height, canvas.height) * Math.sin((i * deg + 90) / 180 * Math.PI));
            if (i > 1000) {
                break;
            }
        }

        ctx.stroke();

        let period = 1;
        ctx.fillStyle = "black";
        ctx.beginPath();
        for (let i = 1; i < canvas.width / 2 / scale / period; i++) {
            ctx.moveTo(canvas.width / 2 + i * period * scale, canvas.height / 2);
            ctx.arc(canvas.width / 2,canvas.height / 2, i * period * scale, 0, 2 * Math.PI);
            if (i > 1000) {
                break;
            }
        }
        ctx.stroke();


        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffde0a";
        ctx.beginPath();

        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + a.r * scale, canvas.width / 2 - a.i * scale);

        if(a.a > 0){
            ctx.moveTo(canvas.width / 2 + a.r * scale, canvas.width / 2 - a.i * scale);
            ctx.lineTo(canvas.width / 2 + a.r * scale - 15 * Math.cos((a.f + 20) / 180 * Math.PI), canvas.width / 2 - a.i * scale + 15 * Math.sin((a.f + 20) / 180 * Math.PI));
            
            ctx.moveTo(canvas.width / 2 + a.r * scale, canvas.width / 2 - a.i * scale);
            ctx.lineTo(canvas.width / 2 + a.r * scale - 15 * Math.cos((a.f - 20) / 180 * Math.PI), canvas.width / 2 - a.i * scale + 15 * Math.sin((a.f - 20) / 180 * Math.PI));    
        }
        
        ctx.stroke();

        ctx.strokeStyle = "green";
        ctx.beginPath();

        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + b.r * scale, canvas.width / 2 - b.i * scale);

        if(b.a > 0){
            ctx.moveTo(canvas.width / 2 + b.r * scale, canvas.width / 2 - b.i * scale);
            ctx.lineTo(canvas.width / 2 + b.r * scale - 15 * Math.cos((b.f + 20) / 180 * Math.PI), canvas.width / 2 - b.i * scale + 15 * Math.sin((b.f + 20) / 180 * Math.PI));
            
            ctx.moveTo(canvas.width / 2 + b.r * scale, canvas.width / 2 - b.i * scale);
            ctx.lineTo(canvas.width / 2 + b.r * scale - 15 * Math.cos((b.f - 20) / 180 * Math.PI), canvas.width / 2 - b.i * scale + 15 * Math.sin((b.f - 20) / 180 * Math.PI));
        }
        
        ctx.stroke();

        ctx.strokeStyle = "red";
        ctx.beginPath();

        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + c.r * scale, canvas.width / 2 - c.i * scale);

        if(c.a > 0){
            ctx.moveTo(canvas.width / 2 + c.r * scale, canvas.width / 2 - c.i * scale);
            ctx.lineTo(canvas.width / 2 + c.r * scale - 15 * Math.cos((c.f + 20) / 180 * Math.PI), canvas.width / 2 - c.i * scale + 15 * Math.sin((c.f + 20) / 180 * Math.PI));
            
            ctx.moveTo(canvas.width / 2 + c.r * scale, canvas.width / 2 - c.i * scale);
            ctx.lineTo(canvas.width / 2 + c.r * scale - 15 * Math.cos((c.f - 20) / 180 * Math.PI), canvas.width / 2 - c.i * scale + 15 * Math.sin((c.f - 20) / 180 * Math.PI));
        }

        ctx.stroke();
    }
}