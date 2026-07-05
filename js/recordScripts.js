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
            <th>Date</th><th>Chapter</th><th>Title</th><th>Code</th><th>Score</th><th>Max</th><th>%</th>
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
                <td>${date}</td><td>${chapter}</td><td>${title}</td><td>${code}</td><td>${score}</td><td>${outof}</td><td>${percentage}</td>
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

recordsInit();