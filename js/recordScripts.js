let globalIp='';

function recordsInit()
{
    console.log("Records");
    
    attachStylesheet();
    fetchRecord();
   // 
    fetchIp();
}

function fetchProgressList()
{
    console.log("/// Fetch Progress //// ");
    let functionName="fetchProgressList";
    callBackend(functionName,'',printProgressList);
}

function printProgressList(data)
{
    console.log(data);
    let tableOpen=
    `
        <table><tbody>
    `;
    let tableClose=
    `
        </tbody></table>
    `;
    let tableHeaders=
    `
        <tr>
            <th>Accounts</th>
        </tr>
    `;
    let tableRows='';
    for(const i of data)
    {
        let ip=i["ip"];
        let progressId=i["progressId"];
        console.log(ip);
        console.log(progressId);
        tableRows+=
        `
            <tr>
                <td>
                    <button class="progButton" onclick="uploadProgress('${ip}','${progressId}')">${progressId}</button>
                </td>
            </tr>
        `;
    }
    let table=tableOpen+tableHeaders+tableRows+tableClose;
    document.getElementById("progressListOut").innerHTML=table;
}

function uploadProgress(destinationIp,progressId)
{
    console.log("IP ALONE",destinationIp)
    console.log(destinationIp,progressId);
    let output=
    `
        <p> Upload today's progress to ${progressId} account?</p>
        <button onclick="handleUploadCancel()">Cancel</button><button onclick="handleUploadConfirm('${destinationIp}','${progressId}')">Confirm</button>
    `;
    document.getElementById("uploadConfirmOut").innerHTML=output;
    
}

function handleUploadCancel()
{
    console.log("Handle upload cancel");
    document.getElementById("uploadConfirmOut").innerHTML='';
    document.getElementById("progressListOut").innerHTML='';
    document.getElementById("uploadDailyIndicator").innerHTML='Cancelled';
    setTimeout(()=>{document.getElementById("uploadDailyIndicator").innerHTML='Ready'},3000);

}

function handleUploadConfirm(destinationIp,progressId)
{
    console.log("UPload confirm to ",progressId);
    console.log("Handle upload confirm to ip",destinationIp);
    handleConfirm(destinationIp);
    document.getElementById("uploadConfirmOut").innerHTML='';
    document.getElementById("progressListOut").innerHTML='';
}

function fetchIp()
{
    console.log("Fetch ip address");
    let functionName="fetchIpAddress";
    callBackend(functionName,'',writeIp)
}

function writeIp(ipAddress)
{
    document.getElementById("ipLabelOut").innerHTML=ipAddress;
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
    if (data.length==0)
    {
        let outputMessage='There is no record of exercises completed today from your IP address';
        document.getElementById("recordOutputArea").innerHTML=outputMessage;
        return
    }
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
    document.getElementById("uploadDailyIndicator").innerHTML=message;
    if (message=="Progress Transfered")
    {
        fetchRecord();
    }
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

function handleConfirm(ipInput)
{
    console.log("Handle confirm",ipInput);
    let params={'inputAddress':ipInput};
    let functionName="transferProgress";
    callBackend(functionName,params,writeToSubmitIpIndicator);
    document.getElementById("confirmOutput").innerHTML='';

    // must still write the confirm that changes the ip address over ot the other one 
}

function handleCancel()
{
    console.log("Handle cancel");
    document.getElementById("confirmOutput").innerHTML='';
}


function handleUploadProgressButton()
{
    console.log("Handle progress upload");
    fetchProgressList();
}

recordsInit();