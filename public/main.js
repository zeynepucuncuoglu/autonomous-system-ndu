
var profiles = []; //12
const p1 = [];
const p2 = [];
const p3 = [];
const p4 = [];
const p5 = [];
const p6 = [];
const p7 = [];
const p8 = [];
const p9 = [];
const p10 = [];
const p11 = [];
const p12 = [];

var table = [];




var clicks = 0;
var progressInterval;
var timeTotal = 0;
var profileNum = 1;
//var dataTable = document.getElementById('jsonTable1');
var setTable = '';
var time_switch_value;
var tabNum = 1;


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



var CHART = document.getElementById("lineChart");
    console.log(CHART)
    var lineChart = new Chart(CHART, {
        type: 'line',
        data: {
            //labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12'],
            labels: [],
            datasets: [
                 {
                    label: 'Power',
                    data: [],
                    fill: false,
                    borderColor: '#FF9CEE',
                    backgroundColor: '#FF9CEE',
                    borderWidth: 2,
                    pointStyle: 'Stars',
                    pointRadius: 6,
                 }
                ],
        },
        options: {}
    });

function setup() {
    //showProfile();
    $('.right').hide();
    $('.middle').hide();
    $('#alert1').hide();
    // $('#subAlert').hide();
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
        for(var i=1;i<tabNum;i++){
            document.getElementById('addPower' + i).placeholder="0-6";
            document.getElementById('addTime' + i).placeholder='0-60'; 
        }  
    } else {
        time_switch_value = 'SEC';
        setTimeTypeValue = time_switch_value;
        for(var i=1;i<tabNum;i++){
            document.getElementById('addPower' + i).placeholder="0-6";
            document.getElementById('addTime' + i).placeholder='0-240'; 
        }  
    }
});

function openProfile( evt,profileName, num) {
    console.log(profileName);
    console.log(num);
    $('#subAlert').hide();
    $('.right').show();
    profileNum = num;
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
    document.getElementById(profileName).style.display="block";
    evt.currentTarget.className += " active";
    if(num==2){
        showTableandChart(p2);
    }else if(num==1){     
        showTableandChart(p1); 
    }
    else if(num==3){
        showTableandChart(p3);
    }
    else if(num==4){
        showTableandChart(p4);
    }
    else if(num==5){
        showTableandChart(p5);
    }
    else if(num==6){
        showTableandChart(p6);
    }
    else if(num==7){
        showTableandChart(p8);
    }
    else if(num==9){
        showTableandChart(p9);
    }
    else if(num==10){
        showTableandChart(p10);
    }
    else if(num==11){
        showTableandChart(p11);
    }
    else if(num==12){
        showTableandChart(p12);
    }


};



function openNewTab(){
  if(tabNum<11){
        tabNum ++;
        let newTab = document.createElement('a');
        newTab.classList = "nav-item nav-link profile but";
        newTab.id = "p" + tabNum ;
        newTab.innerHTML = "p" + tabNum;
        
        //creating profile part
        var newProfile = document.createElement('div');
        newProfile.id="Profile" + tabNum;
        newProfile.classList = "tabcontent";
        newProfile.setAttribute("role","tabpanel");
        newProfile.setAttribute("aria-labelledby", "p" + tabNum);
        //container for bootstrap
        var container = document.createElement('div');
        container.className="container-fluid";
        
        //form for boot
        var form = document.createElement('form');
        form.className="form-inline";
        //creating labels and inputs
        //power Label
        var powLabel = document.createElement('label');
        powLabel.className="m-2";
        powLabel.setAttribute("for","addPower" + tabNum);
        powLabel.innerHTML = "Add power";
        form.appendChild(powLabel);
        //power input
        var inpPow = document.createElement('input');
        inpPow.type = "text";
        inpPow.classList="form-control m-2 col-sm-1";
        inpPow.id="addPower" + tabNum ;
        inpPow.addEventListener("onchange",function(event){
            var sendTabnum = event.target.id.split("addPower")[1];
            checkPower(sendTabnum)});
        form.appendChild(inpPow);
        //Time label
        var timeLabel = document.createElement('label');
        timeLabel.className="m-2";
        timeLabel.setAttribute("for","addTime" + tabNum);
        timeLabel.innerHTML = "Add Time";
        form.appendChild(timeLabel);
        //time input
        var inpTime = document.createElement('input');
        inpTime.type="text";
        inpTime.classList="form-control m-2 col-sm-1";
        inpTime.id="addTime" + tabNum ;
        inpTime.addEventListener("onchange",function(event){
            var sendTabnum = event.target.id.split("addTime")[1];
            checkTime(sendTabnum)});
        form.appendChild(inpTime);
        //button 
        var buttoncontainer = document.createElement('div');
        buttoncontainer.classList="d-grid gap-2 col-sm-1 mx-auto";
        var addButton = document.createElement('button');
        addButton.type="button";
        addButton.id="addButton"+tabNum;
        addButton.classList="btn btn-primary btn-sm";
        addButton.innerHTML="<i class='fa fa-plus'></i>";
        addButton.addEventListener("click",function(event){
            var sendTabnum = event.currentTarget.id.split("addButton")[1];
            addToArray(sendTabnum);
        });
        buttoncontainer.appendChild(addButton);
        form.appendChild(buttoncontainer);
        
        container.appendChild(form);
        newProfile.appendChild(container);
        document.getElementById("nav-tabContent").appendChild(newProfile);

        newTab.addEventListener("click",function(event) {
            var sendTabnum = event.target.id.split("p")[1];
            openProfile(event,"Profile" + sendTabnum,sendTabnum)
           });       
        document.getElementById("nav-tab").appendChild(newTab);

           //numofprofile++;
    }else{
        document.getElementById('profileAlert').innerHTML = "Number of profile can be maximum 12";
         $('#profileAlert').show();
    }
   
};

function deleteTab(){
    
    if(tabNum > 1){
        document.getElementById('p'+tabNum).remove();
        document.getElementById('Profile' + tabNum).remove();
        tabNum--;
 }
    
}

function addToChart(chart, power, time,x, temptime) {

    chart.data.datasets[0].data[x] = power;
    chart.data.labels[x] = temptime
    chart.update();
}


function addToArray(num) {

    var rowElement = {
        profile:"profile",
        index: "Index",
        secMin : "type",
        time: "Time",
        power: "Power",
        
    }

    
    let timeAdded = document.getElementById("addTime" + num).value;
    console.log(timeAdded);
    let powerAdded = document.getElementById("addPower" + num).value;
    setTimeAdded = timeAdded;
    setPowerAdded = powerAdded;

    rowElement['type']=time_switch_value;
    console.log(time_switch_value);
    if(timeAdded <10){
        timeAdded = '00' + timeAdded;
    }else if(timeAdded <100 ){
        timeAdded = '0' + timeAdded;
    }
    rowElement['profile'] = 'p' + num;
    rowElement['time'] = parseInt(timeAdded);
    rowElement['power']=parseInt(powerAdded);
    console.log(rowElement);
    
   
    if(rowElement['profile'] === 'p1'){
        if(p1.length < 12){
            console.log(rowElement);
            console.log(p1);
            p1.push(rowElement);
            console.log(rowElement);
            console.log(p1);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }    
        showTableandChart(p1); 
    }else if(rowElement['profile']=== 'p2'){
        if(p2.length < 12){
            p2.push(rowElement);
            console.log(p2);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }
        showTableandChart(p2);     
    }else if(rowElement['profile']=== 'p3'){
        if(p3.length < 12){
            p3.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }   
        showTableandChart(p3);  
    }else if(rowElement['profile']=== 'p4'){
        if(p4.length < 12){
            p4.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }  
        showTableandChart(p4);   
    }else if(rowElement['profile']=== 'p5'){
        if(p5.length < 12){
            p5.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }    
        showTableandChart(p5); 
    }else if(rowElement['profile']=== 'p6'){
        if(p6.length < 12){
            p6.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }    
        showTableandChart(p6); 
    }else if(rowElement['profile']=== 'p7'){
        if(p7.length < 12){
            p7.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }    
        showTableandChart(p7); 
    }else if(rowElement['profile']=== 'p8'){
        if(p8.length < 12){
            p8.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }    
        showTableandChart(p8); 
    }else if(rowElement['profile']=== 'p9'){
        if(p9.length < 12){
            p9.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }  
        showTableandChart(p9);   
    }else if(rowElement['profile']=== 'p10'){
        if(p10.length < 12){
            p10.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }    
        showTableandChart(p10); 
    }else if(rowElement['profile']=== 'p11'){
        if(p11.length < 12){
            p11.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }    
        showTableandChart(p11); 
    }else if(rowElement['profile']=== 'p12'){
        if(p12.length < 12){
            p12.push(rowElement);
        }else{
            $('#alert').innerHTML = "Row Number must be between 0-12";
            $('#alert').show();
        }   
        showTableandChart(p12); 
    }

        document.getElementById('addPower' + num).value="";
        document.getElementById('addPower' + num).placeholder="0-6";
        document.getElementById('addTime' + num).value="";
        if(time_switch_value === 'MIN'){    
           document.getElementById('addTime' + num).placeholder='0-60'; 
        }else{
           document.getElementById('addTime' + num).placeholder='0-240';
        }   
}

function showTableandChart(obj){

    var table = document.getElementById('data');
    table.style.display ='block';
  // document.getElementById('proName').innerHTML=item['profile'];
    var btable = document.getElementById('bodyOfTable');
    var cols = btable.getElementsByTagName('td');
    var rows = btable.getElementsByTagName('tr');

    for(var i=0;i<60;i+=5){
        cols[i].textContent="";
        cols[i+1].textContent="";
        cols[i+2].textContent="";
        cols[i+3].textContent="";
        cols[i+4].textContent="";

    }
    var indx = 0;
    var row = 0;
    var temptime = 0;
    for(var item of obj){
        console.log(item);
        cols[indx].textContent=row + 1;
        cols[indx+1].textContent=item['profile'];
        cols[indx+2].textContent=item['type'];
        cols[indx+3].textContent=item['time'];
        temptime += item['time'];
        cols[indx+4].textContent=item['power'];
        let td = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.classList = "btn btn-danger btn-sm"
        deleteButton.id = "delete-btn"
        deleteButton.innerHTML = "<i class='fa fa-trash'></i>"
        deleteButton.onclick = function() {
            item.filter(function(){
                
            });
        };
        deleteButton.style = "margin:5px 0 0 4px";
        rows[row].appendChild(deleteButton);
        addToChart(lineChart,item['power'],item['time'], row, temptime);
        row++;
        indx+=5; 
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
        document.getElementById('subAlert').style.display = 'block';
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
        $document.getElementById('subAlert').style.display = 'block';
    }
}

var timeAdded = 0;
   function checkTime(num) {
      console.log(num);
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
        document.getElementById('subAlert').style.display = 'block';
        return false;
    } else if (totalMin < timeTotal) {
        document.getElementById('subAlert').innerHTML = "The total time cannot be longer than the profile period ";
        document.getElementById('subAlert').style.display = 'block';
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
        document.getElementById('subAlert').style.display = 'block';
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
        // const data = { profile };

        // const options = {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // };

        // const response = await fetch('/autonomous', options);
        // const json = await response.json();
        // console.log(json);

    } else {
        console.log("There are some problems with the values entered");
        document.getElementById('subAlert').innerHTML = "There are some problems with the values entered";
        document.getElementById('subAlert').style.display = 'block';
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



getProfile();

setup();