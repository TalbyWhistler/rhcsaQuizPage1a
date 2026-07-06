function recordsInit()
{
    console.log("Records");
    attachStylesheet();
    fetchRecord();
}


function callBackend(functionName,functionParams,callback)
{
    const fetchTarget='php/record_controller.php';
    let inputPackage={function:functionName,params:functionParams};
    inputPackage=JSON.stringify(inputPackage);
    fetch(fetchTarget,
        {
            method:'POST',
            headers:{'Content-Type':'Application/json'},
            body:inputPackage
        }
    )
    .then(response=>response.json())
    .then(data=>callback(data));
}

function fetchRecord()
{
    console.log("Fetch record");
    let functionName='fetchRecord';
    callBackend(functionName,'',printRecord);
}

function printRecord(data)
{
    console.log(data);
    let tableOpener=
    `
        <table id="recordTable" class="table"><tbody>
    `;
    let tableCloser=
    `
        </tbody></table>
    `;
    let tableHeaders=
    `
        <tr>    
                <th>Chapter</th><th>Title</th><th>Code</th><th>Score</th><th>Max</th><th>%</th>
        </tr>
    `;
    let tableRows='';
    for (let i=0;i<data.length;i++)
    {
        let date=data[i]["dateof"];
        let time=data[i]["timeof"];
        let chapter=data[i]["chapter"];
        let title=data[i]["figuretitle"];
        let code=data[i]["code"];
        let score=data[i]["score"];
        let outof=data[i]["outof"];
        let percentage=Number(score)/Number(outof)*100??0;
        percentage=Math.round(percentage,2);
        tableRows+=
        `
            <tr>
                    <td>${chapter}</td><td>${title}</td><td>${code}</td><td>${score}</td><td>${outof}</td><td>${percentage}</td>
            </tr>
        `;
    }
    let table=tableOpener+tableHeaders+tableRows+tableCloser;
    document.getElementById("recordOutputArea").innerHTML=table;
}


function attachStylesheet()
{
    loc='css/recordStyles.css';
    el=document.createElement('link');
    el.type='text/css';
    el.rel='stylesheet';
    el.href=loc;
    document.body.appendChild(el);
}

function writeToSubmitIpIndicator(message)
{
    document.getElementById("ipStatusIndicator").innerHTML=message;
}


function handleIpInputButton()
{
    let ipInput=document.getElementById("ipInput").value;
    console.log("Ip input",ipInput);
    if(ipInput)
    {
        console.log("We have input");
        writeToSubmitIpIndicator("Input Accepted");
        transmitIpInput(ipInput);
    }
    else 
    {
        console.log("the box is blank");
        writeToSubmitIpIndicator("Invalid Input");
        setTimeout(writeToSubmitIpIndicator,3000,"Ready");
    }
}

function transmitIpInput(inputIpAddress)
{
    let functionName='checkForIp';
    let params={'inputAddress':inputIpAddress};
    callBackend(functionName,params,afterIpInput);
}

function afterIpInput(data)
{
    let ipInput=document.getElementById("ipInput").value;
    console.log(data);
    if(data)
    {
        console.log("Yes we have a record of that ip address confirm");
        let confirmContents=
        `
            <p>Okay are you sure you'd like to upload today's progress to match ${ipInput}?</p>
            <div class="row"><button onclick="handleCancel()">Cancel</button><button onclick="handleConfirm('${ipInput}')">Confirm</button></div>
        `;
        document.getElementById("confirmOutput").innerHTML=confirmContents;
    }
    else 
    {
        console.log("Here's where the error message should ");
        writeToSubmitIpIndicator(`Invalid IP Address`);
    }
}

function handleConfirm()
{
    console.log("Handle confirm");
    // must still write the confirm that changes the ip address over ot the other one 
}

function handleCancel()
{
    console.log("Handle cancel");
    document.getElementById("confirmOutput").innerHTML='';
}

recordsInit();