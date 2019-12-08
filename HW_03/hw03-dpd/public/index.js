function Computer(manufacturer, coreNumber, processorType, sizeRAM, typeRAM, hardDiskSize, hardDiskType) {
    this.manufacturer = manufacturer;
    this.coreNumber = coreNumber;
    this.processorType = processorType;
    this.sizeRAM = sizeRAM;
    this.typeRAM = typeRAM;
    this.hardDiskSize = hardDiskSize;
    this.hardDiskType = hardDiskType;
}

Computer.prototype.getManufacturer = function() {
    return this.manufacturer;
}
Computer.prototype.setManufacturer = function(manufacturer) {
    this.manufacturer = manufacturer;
}

Computer.prototype.getCoreNumber = function() {
    return this.coreNumber;
}
Computer.prototype.setCoreNumber = function(coreNumber) {
    this.coreNumber = coreNumber;
}

Computer.prototype.getProcessorType = function() {
    return this.processorType;
}
Computer.prototype.setProcessorType = function(processorType) {
    this.processorType = processorType;
}

Computer.prototype.getSizeRAM = function() {
    return this.sizeRAM;
}
Computer.prototype.setSizeRAM = function(sizeRAM) {
    this.sizeRAM = sizeRAM;
}

Computer.prototype.getTypeRAM = function() {
    return this.typeRAM;
}
Computer.prototype.setTypeRAM = function(typeRAM) {
    this.typeRAM = typeRAM;
}

Computer.prototype.getHardDiskSize = function() {
    return this.hardDiskSize;
}
Computer.prototype.setHardDiskSize = function(hardDiskSize) {
    this.hardDiskSize = hardDiskSize;
}

Computer.prototype.getHardDiskType = function() {
    return this.hardDiskType;
}
Computer.prototype.setHardDiskType = function(hardDiskType) {
    this.hardDiskType = hardDiskType;
}

function Ultrabook(manufacturer, coreNumber, processorType, sizeRAM, typeRAM, hardDiskSize, hardDiskType, screenSize) {
    Computer.apply(this, arguments);
    this.screenSize = screenSize;
}

Ultrabook.prototype = Object.create(Computer.prototype);

Ultrabook.prototype.getScreenSize = function() {
    return this.screenSize;
}

Ultrabook.prototype.setScreenSize = function(screenSize) {
    this.screenSize = screenSize;
}

function Server(manufacturer, coreNumber, processorType, sizeRAM, typeRAM, hardDiskSize, hardDiskType, numberOfHardDrives) {
    Computer.apply(this, arguments);
    this.numberOfHardDrives = numberOfHardDrives;
}

Server.prototype = Object.create(Computer.prototype);

Server.prototype.getNumberOfHardDrives = function() {
    return this.numberOfHardDrives;
}

Server.prototype.setNumberOfHardDrives = function(numberOfHardDrives) {
    this.numberOfHardDrives = numberOfHardDrives;
}

function onSelect(ev) {
    ev.preventDefault();

    var select = document.getElementById("cselect");
    var selVar = select.options[select.selectedIndex].text;
    switch (selVar) {
        case "Ultrabook":
            document.getElementById("lblcvariable").innerHTML = "Screen size";
            document.getElementById("cvariable").placeholder = "Enter Screen size"
            break;
        case "Server":
            document.getElementById("lblcvariable").innerHTML = "Number of Hard Drives";
            document.getElementById("cvariable").placeholder = "Enter Number of Hard Drives"
            break;
    }
}

function onCreate(ev) {
    ev.preventDefault();

    var select = document.getElementById("cselect");
    var selVar = select.options[select.selectedIndex].text;
    switch (selVar) {
        case "Ultrabook":
            var data = JSON.stringify({
                "manufacturer": String(document.getElementById("cmanufacturer").value),
                "coreNumber": String(document.getElementById("ccoreNumber").value),
                "processorType": String(document.getElementById("cprocessorType").value),
                "sizeRAM": String(document.getElementById("csizeRAM").value),
                "typeRAM": String(document.getElementById("ctypeRAM").value),
                "hardDiskSize": String(document.getElementById("chardDiskSize").value),
                "hardDiskType": String(document.getElementById("chardDiskType").value),
                "screenSize": String(document.getElementById("cvariable").value)
            });
            break;
        case "Server":
            var data = JSON.stringify({
                "manufacturer": String(document.getElementById("cmanufacturer").value),
                "coreNumber": String(document.getElementById("ccoreNumber").value),
                "processorType": String(document.getElementById("cprocessorType").value),
                "sizeRAM": String(document.getElementById("csizeRAM").value),
                "typeRAM": String(document.getElementById("ctypeRAM").value),
                "hardDiskSize": String(document.getElementById("chardDiskSize").value),
                "hardDiskType": String(document.getElementById("chardDiskType").value),
                "numberOfHardDrives": String(document.getElementById("cvariable").value)
            });
            break;
    }

    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //alert(this.responseText);
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
        }
    });

    switch (selVar) {
        case "Ultrabook":
            var link = "http://localhost:2403/ultrabook";
            break;
        case "Server":
            var link = "http://localhost:2403/server";
            break;
    }

    xhr.open("POST", link);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

    document.getElementById("cmanufacturer").value = "";
    document.getElementById("ccoreNumber").value = "";
    document.getElementById("cprocessorType").value = "";
    document.getElementById("csizeRAM").value = "";
    document.getElementById("ctypeRAM").value = "";
    document.getElementById("chardDiskSize").value = "";
    document.getElementById("chardDiskType").value = "";
    document.getElementById("cvariable").value = "";
}


function onRead() {
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            result = JSON.parse(this.response);
            var resultTBody = document.createElement('tbody');
            result.map(function (nthComputer) {
                resultTBody.appendChild(parseComputerToTableRow(nthComputer));
            });

            var table = document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody, document.getElementById('rTBody'));
            resultTBody.id = 'rTBody';
            console.log('success');
        }
    });

    var select = document.getElementById("cselect");
    var selVar = select.options[select.selectedIndex].text;
    switch (selVar) {
        case "Ultrabook":
            var link = "http://localhost:2403/ultrabook";
            break;
        case "Server":
            var link = "http://localhost:2403/server";
            break;
    }

    xhr.open("GET", link);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareUpdate(ev) {

    ev.preventDefault();

    var select = document.getElementById("cselect");
    var selVar = select.options[select.selectedIndex].text;
    switch (selVar) {
        case "Ultrabook":
            document.getElementById("lbluvariable").innerHTML = "Screen size"; //screenSize
            document.getElementById("uvariable").placeholder = "Enter Screen size"
            break;
        case "Server":
            document.getElementById("lbluvariable").innerHTML = "Number of Hard Drives"; //NumberOfHardDrives
            document.getElementById("uvariable").placeholder = "Enter number of Hard Drives"
            break;
    }

    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            result = JSON.parse(this.response);
            var ids = document.createElement('select');
            ids.className = 'form-control';
            result.map(function (nthComputer) {
                var id = document.createElement('option');
                id.innerHTML = nthComputer['id'];                
                ids.appendChild(id);
            });
            var form = document.getElementById('uid').parentElement;
            form.replaceChild(ids, document.getElementById('uid'));
            ids.id = 'uid';
        }
    });

    switch (selVar) {
        case "Ultrabook":
            var link = "http://localhost:2403/ultrabook/";
            break;
        case "Server":
            var link = "http://localhost:2403/server/";
            break;
    }

    xhrids.open("GET", link);
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onUpdate(ev) {
    ev.preventDefault();


    var select = document.getElementById("cselect");
    var selVar = select.options[select.selectedIndex].text;
    switch (selVar) {
        case "Ultrabook":
            var data = JSON.stringify({
                "manufacturer": String(document.getElementById("umanufacturer").value),
                "coreNumber": String(document.getElementById("ucoreNumber").value),
                "processorType": String(document.getElementById("uprocessorType").value),
                "sizeRAM": String(document.getElementById("usizeRAM").value),
                "typeRAM": String(document.getElementById("utypeRAM").value),
                "hardDiskSize": String(document.getElementById("uhardDiskSize").value),
                "hardDiskType": String(document.getElementById("uhardDiskType").value),
                "screenSize": String(document.getElementById("uvariable").value)
            });
            break;
        case "Server":
            var data = JSON.stringify({
                "manufacturer": String(document.getElementById("umanufacturer").value),
                "coreNumber": String(document.getElementById("ucoreNumber").value),
                "processorType": String(document.getElementById("uprocessorType").value),
                "sizeRAM": String(document.getElementById("usizeRAM").value),
                "typeRAM": String(document.getElementById("utypeRAM").value),
                "hardDiskSize": String(document.getElementById("uhardDiskSize").value),
                "hardDiskType": String(document.getElementById("uhardDiskType").value),
                "numberOfHardDrives": String(document.getElementById("uvariable").value)
            });
            break;
    }

    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    switch (selVar) {
        case "Ultrabook":
            var link = "http://localhost:2403/ultrabook/";
            break;
        case "Server":
            var link = "http://localhost:2403/server/";
            break;
    }

    xhr.open("PUT", link + document.getElementById("uid").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onPrepareDelete(ev) {

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            result = JSON.parse(this.response);
            var ids = document.createElement('select');
            ids.className = 'form-control';
            result.map(function (nthComputer) {
                var id = document.createElement('option');
                id.innerHTML = nthComputer['id'];
                ids.appendChild(id);
            });
            var form = document.getElementById('did').parentElement;
            form.replaceChild(ids, document.getElementById('did'));
            ids.id = 'did';
        }
    });

    var select = document.getElementById("cselect");
    var selVar = select.options[select.selectedIndex].text;
    switch (selVar) {
        case "Ultrabook":
            var link = "http://localhost:2403/ultrabook/";
            break;
        case "Server":
            var link = "http://localhost:2403/server/";
            break;
    }

    xhrids.open("GET", link);
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onDelete(ev) {
    ev.preventDefault();
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    var select = document.getElementById("cselect");
    var selVar = select.options[select.selectedIndex].text;
    switch (selVar) {
        case "Ultrabook":
            var link = "http://localhost:2403/ultrabook/";
            break;
        case "Server":
            var link = "http://localhost:2403/server/";
            break;
    }

    xhr.open("DELETE", link + document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function parseComputerToTableRow(comp) {
    var row = document.createElement('tr');

    id = document.createElement('th');
    id.innerText = comp['id'];
    row.appendChild(id);

    manufacturer = document.createElement('td');
    manufacturer.innerText = comp['manufacturer'];
    row.appendChild(manufacturer);

    coreNumber = document.createElement('td');
    coreNumber.innerText = comp['coreNumber'];
    row.appendChild(coreNumber);

    processorType = document.createElement('td');
    processorType.innerText = comp['processorType'];
    row.appendChild(processorType);

    sizeRAM = document.createElement('td');
    sizeRAM.innerText = comp['sizeRAM'];
    row.appendChild(sizeRAM);

    typeRAM = document.createElement('td');
    typeRAM.innerText = comp['typeRAM'];
    row.appendChild(typeRAM);

    hardDiskSize = document.createElement('td');
    hardDiskSize.innerText = comp['hardDiskSize'];
    row.appendChild(hardDiskSize);

    hardDiskType = document.createElement('td');
    hardDiskType.innerText = comp['hardDiskType'];
    row.appendChild(hardDiskType);

    var select = document.getElementById("cselect");
    var selVar = select.options[select.selectedIndex].text;
    switch (selVar) {
        case "Ultrabook":
            document.getElementById("tblvar").innerHTML = "Size of Screen";

            screenSize = document.createElement('td');
            screenSize.innerText = comp['screenSize'];
            row.appendChild(screenSize);
            break;
        case "Server":
            document.getElementById("tblvar").innerHTML = "Number of Hard Drives";

            numberOfHardDrives = document.createElement('td');
            numberOfHardDrives.innerText = comp['numberOfHardDrives'];
            row.appendChild(numberOfHardDrives);
            break;
    }

    return row;
}


(function () {

    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );
    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );
    document.getElementById('pdbutton').addEventListener(
        'click', onPrepareDelete
    );
    console.log('Handlers is set')
})()