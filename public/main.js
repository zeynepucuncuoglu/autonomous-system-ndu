// const { Chart } = require("chart.js");





var profiles = [];
var profile = {
    id: 1,
    table: [{
        index: "Index",
        time: "Time",
        power: "Power"
    }],
    beginTime: "",
    endTime: "",
    timeType: "",
    methodType: 0,
    nextProfile: 0,
    repeatCount: 1
};

var clicks = 0;
var progressInterval;
var timeTotal = 0;
var profileNum = 1;
var dataTable = document.getElementById('jsonTable1');
var setTable = '';
var time_switch_value;
var tabNum = 0;

var result = "";
let setSwitchValue = '0';
let setProfileNum = '1';
let setRowNo = '0';
let setBeginTime = '00.00';
let setEndTime = '00.00'
let setRepeat = '1';
let setMethod = '1';
let setNextProfile = '0';
let setTimeTypeValue = 'SEC';

//$('.alert').hide();

function setup() {
    //showProfile();
    $('.right').hide();
    $('.middle').hide();
    $('#alert1').hide();
    $('#subAlert').hide();
    $('.alert').hide();

}


$('#auto_switch').on('change', function() {
    if ($(this).is(':checked')) {
        $('.alert').hide();
        auto_switch_value = '1';
        setSwitchValue = auto_switch_value;
        $('.middle').show();
        $('.right').show();

    } else {
        $('.alert').hide();
        $('.middle').hide();
        $('.right').hide();
        auto_switch_value = '0';
        setSwitchValue = auto_switch_value;
    }
});

$('#time_switch').on('change', function() {
    if ($(this).is(':checked')) {      
        time_switch_value = 'MIN';
        setTimeTypeValue = time_switch_value;
        for(var i=1;i<13;i++){
            document.getElementById('addPower' + i).placeholder="0-6";
            document.getElementById('addTime' + i).placeholder='0-60'; 
        }  
    } else {
        time_switch_value = 'SEC';
        setTimeTypeValue = time_switch_value;
        for(var i=1;i<13;i++){
            document.getElementById('addPower' + i).placeholder="0-6";
            document.getElementById('addTime' + i).placeholder='0-240'; 
        }  
    }
});



function openProfile( evt,profileName, num) {
    $('#subAlert').hide();
    $('.right').show();
    profileNum = num;
    //showProfile(profileNum);
    console.log("Entered Profile", num);
    setProfileNum = num;
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("profile");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(profileName).style.display = "block";
    evt.currentTarget.className += " active";

    //document.getElementById("p" + num).addClass("active");
};

function openNewTab1(){
    if(tabNum<11){
        tabNum ++;
        document.getElementsByClassName('profile')[tabNum].style.visibility = 'visible';
    }else{
        document.getElementById('profileAlert').innerHTML = "Number of profile can be maximum 12";
         $('#profileAlert').show();
    }

}

function openNewTab(){

    tabNum ++; 
    //creating new tab
    let newTab = document.createElement('a');
    newTab.classList = "nav-item nav-link active profile but";
    newTab.id = "p" + tabNum ;
    newTab.innerHTML = "p" + tabNum;
    //creating profile part
    var newProfile = document.createElement('div');
    newProfile.id="Profile" + tabNum;
    newProfile.classList = "tabcontent tab-pane fade show active";
    newProfile.setAttribute("role","tabpanel");
    newProfile.setAttribute("aria-labelledby", "p" + tabNum);
    //container for bootstrap
    var container = document.createElement('div');
    container.className="container-fluid";
    container.appendChild(newProfile);
    //form for boot
    var form = document.createElement('form');
    form.className="form-inline";
    newProfile.appendChild(form);
    //creating labels and inputs
    var powLabel = document.createElement('label');
    powLabel.className="m-2";
    powLabel.setAttribute("for","addPower" + newTab);
    powLabel.innerHTML = "Add pow";
    form.appendChild(powLabel);

   // newTab.addEventListener("click",openProfile(event,"Profile" + tabNum,tabNum));
       
    document.getElementById("nav-tab").appendChild(newTab);
};


async function addToProfileTable(num) {
    let timeAdded = document.getElementById("addTime" + num).value;
    let powerAdded = document.getElementById("addPower" + num).value;
    setTimeAdded = timeAdded;
    setPowerAdded = powerAdded;
    if (setRowNo <= 12) {
        if(time_switch_value === 'MIN'){
            if (timeAdded <= 0 || timeAdded > 60) {
                document.getElementById('alert1').innerHTML = "Time Value must be between 0-60";
                $('#alert1').show();
            } else if (powerAdded <= 0 || powerAdded > 5) {
                document.getElementById('alert1').innerHTML = "Power Value must be between 0-6";
                $('#alert1').show();
            } else {
                $('#alert1').hide();

                let r1 = document.createElement('tr');

                let td1 = document.createElement('td');
                td1.textContent = 'P' + setProfileNum;
                r1.appendChild(td1);

                let td2 = document.createElement('td');
                //td1.textContent = data[i].todo;
                //td1.textContent = timePowerData[i].time;
                td2.textContent = setRowNo;
                r1.appendChild(td2);

                let td3 = document.createElement('td');
                td3.textContent='Minute';
                r1.appendChild(td3);

                let td4 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                if(timeAdded < 10){
                    td4.textContent = '00' + timeAdded;
                }else{
                    td4.textContent = timeAdded;
                }
                timeTotal += parseInt(td4.textContent);
                r1.appendChild(td4);

                let td5 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                td5.textContent = powerAdded;
                r1.appendChild(td5);

                let deleteButton = document.createElement('button');
                 deleteButton.classList = "btn btn-danger btn-sm"
                 deleteButton.id = "delete-btn"
                 deleteButton.innerHTML = "<i class='fa fa-trash'></i>"
                 deleteButton.onclick = function() {
                     $(this).closest("tr").remove();
                 };
                 deleteButton.style = "margin:5px 0 0 4px"
                r1.appendChild(deleteButton);

                document.getElementById('bodyOfTable').appendChild(r1); 
                setRowNo++;

            }
        }else{
            if (timeAdded <= 0 || timeAdded > 240) {
                document.getElementById('alert1').innerHTML = "Time Value must be between 0-60";
                $('#alert1').show();
            } else if (powerAdded <= 0 || powerAdded > 5) {
                document.getElementById('alert1').innerHTML = "Power Value must be between 0-6";
                $('#alert1').show();
            } else {
                $('#alert1').hide();

                let r1 = document.createElement('tr');

                let td1 = document.createElement('td');
                td1.textContent = 'P' + setProfileNum;
                r1.appendChild(td1);

                let td2 = document.createElement('td');
                //td1.textContent = data[i].todo;
                //td1.textContent = timePowerData[i].time;
                td2.textContent = setRowNo;
                r1.appendChild(td2);

                let td3 = document.createElement('td');
                td3.textContent='Second';
                r1.appendChild(td3);

                let td4 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                if(timeAdded < 10){
                    td4.textContent = '00' + timeAdded;
                }else if(timeAdded<100){
                    td4.textContent = '0' + timeAdded;
                }else{
                    td4.textContent = timeAdded;
                }
                timeTotal += parseInt(td4.textContent);
                r1.appendChild(td4);

                let td5 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                td5.textContent = powerAdded;
                r1.appendChild(td5);


                 let deleteButton = document.createElement('button');
                 deleteButton.classList = "btn btn-danger btn-sm"
                 deleteButton.id = "delete-btn"
                 deleteButton.innerHTML = "<i class='fa fa-trash'></i>"
                 deleteButton.onclick = function() {
                     $(this).closest("tr").remove();
                 };
                 deleteButton.style = "margin:5px 0 0 4px"
                r1.appendChild(deleteButton);
                    
                setRowNo++;
                document.getElementById('bodyOfTable').appendChild(r1); 
            }

        }
        document.getElementById('addPower' + num).value="";
        document.getElementById('addPower' + num).placeholder="0-6";
        document.getElementById('addTime' + num).value="";
        if(time_switch_value === 'MIN'){    
           document.getElementById('addTime' + num).placeholder='0-60'; 
        }else{
           document.getElementById('addTime' + num).placeholder='0-240';
        }   
        
        const CHART = document.getElementById("lineChart");
        console.log(CHART);
        let lineChart = new Chart(CHART, {
            type: 'line',
            data: {
                labels: ['0', '1', '2', '3', '4', '5', '6'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
          
    } else {
        $('#alert').innerHTML = "Row Number must be between 0-12";
        $('#alert').show();
    } 
}

var beginResult = 0,
    endResult = 0;

async function setForBegin() {
    let begin = document.getElementById("begin").value;
    let beginH = parseInt(begin[0] + begin[1]);
    let beginM = parseInt(begin[3] + begin[4]);
    if ((Number.isInteger(beginH))) {
        beginResult = beginH * 60 + beginM;
        $('#subAlert').hide();
    } else {
        document.getElementById('subAlert').innerHTML = "The beginning time is not valid";
        $('#subAlert').show();
    }
}

async function setForEnd() {
    let end = document.getElementById("end").value;
    let endH = parseInt(end[0] + end[1]);
    let endM = parseInt(end[3] + end[4]);
    if ((Number.isInteger(endH))) {
        endResult = endH * 60 + endM;
        $('#subAlert').hide();
    } else {
        document.getElementById('subAlert').innerHTML = "The beginning time is not valid";
        $('#subAlert').show();
    }
}

var timeAdded = 0;
  async function checkTime(num) {
    timeAdded = document.getElementById("addTime" + num).value;
        if(time_switch_value === 'MIN') {
            
            if (timeAdded <= 0 || timeAdded > 60) {
                document.getElementById('alert1').innerHTML = "Time Value must be between  0-60";
                $('#alert1').show();
            } else {
                $('#alert1').hide();
            }
        } else {
            if (timeAdded <= 0 || timeAdded > 240) {
                document.getElementById('alert1').innerHTML = "Time Value must be between  0-240";
                $('#alert1').show();
            } else {
                $('#alert1').hide();
            }
        }
}

var powerAdded = 0;
async function checkPower(num) {
    powerAdded = document.getElementById("addPower" + num).value;
    if (powerAdded < 0 || powerAdded > 5) {
        document.getElementById('alert1').innerHTML = "Power Value must be between 0-6";
        $('#alert1').show();
    } else {
        $('#alert1').hide();
    }
}

function controlForTime() {
    let totalMin = endResult - beginResult;
    if (endResult <= beginResult) {
        document.getElementById('subAlert').innerHTML = "The ending time cannot be earlier than or equal to the beginning time";
        $('#subAlert').show();
        return false;
    } else if (totalMin < timeTotal) {
        document.getElementById('subAlert').innerHTML = "The total time cannot be longer than the profile period ";
        $('#subAlert').show();
        return false;
    } else {
        $('#subAlert').hide();
        setBeginTime = document.getElementById("begin").value;
        setEndTime = document.getElementById("end").value;
        return true;
    }
}

function controlForTable() {
    setTable = '';
    let tableRowLength = dataTable.rows.length;
    for (let i = 1; i < tableRowLength; i++) {
        profile.table.push({
            index: i,
            time: tableValue = dataTable.rows[i].cells[1].innerHTML,
            power: tableValue = dataTable.rows[i].cells[2].innerHTML
        });
        for (let j = 0; j < 3; j++) {
            var tableValue = dataTable.rows[i].cells[j].innerHTML;
            setTable = setTable + tableValue + ":";
        }
        setTable += "#";
    }
}

async function setRepeatCount() {
    repeat = document.getElementById("repeatCount").value;
    if (repeat < 0 || repeat > 12) {
        document.getElementById('subAlert').innerHTML = "Repeat must be between 0-12";
        $('#subAlert').show();
    } else {
        $('#subAlert').hide();
        setRepeat = repeat;
    }
}

function getMethod() {
    let methodNo = document.getElementById("select").value;
    setMethod = methodNo;
}

function getNextProfile() {
    let nextProfileNo = document.getElementById("nextProfile").value;
    setNextProfile = nextProfileNo;
}

async function submitResult() {
    controlForTime();
    if (controlForTime()) {
        controlForTable();
        progress(timeTotal, $('#progressBar' + profileNum));
        result = '#AS';
        result = result.concat(setSwitchValue);
        result = result.concat('#P');
        result = result.concat(setProfileNum);
        profile.id = setProfileNum;
        result = result.concat('#ROW');
        result = result.concat(setRowNo - 1);
        result = result.concat('#DATA');
        result = result.concat(setTable);
        result = result.concat('B');
        result = result.concat(setBeginTime);
        profile.beginTime = setBeginTime;
        result = result.concat('#E');
        result = result.concat(setEndTime);
        profile.endTime = setEndTime;
        result = result.concat('#M');
        result = result.concat(setMethod);
        profile.methodType = setMethod;
        result = result.concat('#NP');
        result = result.concat(setNextProfile);
        profile.nextProfile = setNextProfile;
        result = result.concat('#R');
        result = result.concat(setRepeat);
        profile.repeatCount = setRepeat;
        result = result.concat('#');
        result = result.concat(setTimeTypeValue);
        profile.timeType = setTimeTypeValue;
        profiles.push(profile);
        console.log("ps", profiles);
        /* localStorage.setItem('profiles', JSON.stringify(profiles)); */
        const data = { profile };

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('/autonomous', options);
        const json = await response.json();
        console.log(json);

    } else {
        console.log("There are some problems with the values entered");
        document.getElementById('subAlert').innerHTML = "There are some problems with the values entered";
        $('#subAlert').show();
    }
}

async function getProfile() {
    const response = await fetch('/autonomous');
    const data = await response.json();
    console.log(data);

    document.getElementById("begin").value = data[0].profile.beginTime;
    document.getElementById("end").value = data[0].profile.endTime;
    document.getElementById("select").value = data[0].profile.methodType;
    document.getElementById("nextProfile").value = data[0].profile.nextProfile;
    document.getElementById("repeatCount").value = data[0].profile.repeatCount;
    document.getElementById('jsonTable1').value = data[0].profile.table;
    document.getElementById("time_switch").value = data[0].profile.timeType;
}

//getProfile();

/* async function getData() {
    const response = await fetch('/autonomous');
    const data = await response.json();

    const todoTable = document.createElement('table');
    const r0 = document.createElement('tr');
    const h1 = document.createElement('th');
    h1.textContent = 'AutoSwitch';
    r0.appendChild(h1);
    const h2 = document.createElement('th');
    h2.textContent = "ProfileNo";
    r0.appendChild(h2);
    const h25 = document.createElement('th');
    h25.textContent = "RowNo";
    r0.appendChild(h25);
    const h3 = document.createElement('th');
    h3.textContent = "TableValues";
    r0.appendChild(h3);
    const h4 = document.createElement('th');
    h4.textContent = "Begin";
    r0.appendChild(h4);
    const h5 = document.createElement('th');
    h5.textContent = "End";
    r0.appendChild(h5);
    const h6 = document.createElement('th');
    h6.textContent = "Method";
    r0.appendChild(h6);
    const h7 = document.createElement('th');
    h7.textContent = "NextProfile";
    r0.appendChild(h7);
    const h8 = document.createElement('th');
    h8.textContent = "RepeatCount";
    r0.appendChild(h8);
    const h9 = document.createElement('th');
    h9.textContent = "TimeType";
    r0.appendChild(h9);

    todoTable.appendChild(r0);

    console.log(data.length);

    for (let i = 0; i < data.length; i++) {
        let r1 = document.createElement('tr');

        let td1 = document.createElement('td');
        td1.textContent = data[i].setSwitchValue;
        r1.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = data[i].setProfileNum;
        r1.appendChild(td2);

        let td25 = document.createElement('td');
        td25.textContent = data[i].setRowNo;
        r1.appendChild(td25);

        let td3 = document.createElement('td');
        td3.textContent = data[i].setTable;
        r1.appendChild(td3);

        let td4 = document.createElement('td');
        td4.textContent = data[i].setBeginTime;
        r1.appendChild(td4);

        let td5 = document.createElement('td');
        td5.textContent = data[i].setEndTime;
        r1.appendChild(td5);

        let td6 = document.createElement('td');
        td6.textContent = data[i].setMethod;
        r1.appendChild(td6);

        let td7 = document.createElement('td');
        td7.textContent = data[i].setNextProfile;
        r1.appendChild(td7);

        let td8 = document.createElement('td');
        td8.textContent = data[i].setRepeat;
        r1.appendChild(td8);

        let td9 = document.createElement('td');
        td9.textContent = data[i].setTimeTypeValue;
        r1.appendChild(td9);

        todoTable.appendChild(r1);
    }

    document.getElementById('table2').appendChild(todoTable);
    //document.body.append(todoTable);
} */

getProfile();

setup();