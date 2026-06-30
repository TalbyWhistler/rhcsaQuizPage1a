let metadataObject={};
let stepsArray=[];
let stepCount=0;



function exercisesOutInit()
{
    console.log("Exercises out");
    attachStylesheet();
    fetchRecordsForButtons();
}


function fetchRecordsForButtons()
{
    let functionName='fetchRecords';
    callBackendExOut(functionName,'',printButtons);
}


function attachStylesheet()
{
    let loc='css/exercisesoutStyles.css';
    let el=document.createElement('link');
    el.type='text/css';
    el.rel='stylesheet';
    el.href=loc;
    document.body.appendChild(el);
}

function printButtons(data)
{
    console.log(data)
    let buttonContent='';
    for(let i=0;i<data.length;i++)
    {
        let figure=data[i]["figure"];
        let title=data[i]["title"];
        let button=
        `
            <button onClick="handleChoiceButton('${figure}')">${figure}${title?'|'+title:''}</button>
        `;
        buttonContent+=button;
    }
    document.getElementById("exercisesoutButtonArea").innerHTML=buttonContent;
}

function handleChoiceButton(figure)
{
    stepsArray=[];
    stepCount=0;
    document.getElementById("headerOutputArea").innerHTML='';
    document.getElementById("stepsOutputArea").innerHTML='';
    document.getElementById("nextButtonsOutput").innerHTML='';
    console.log("Handle choice button",figure);    
    let functionName="getData";
    let params={figure:figure};
    callBackendExOut(functionName,params,loadAndPrint);
}

function loadAndPrint(data)
{
    let dat=data["data"];
    let met=data["metaData"];
    console.log("data",dat);
    console.log("met",met[0]);
    let figure=met[0]["figure"];
    let title=met[0]["title"];
    let description=met[0]["description"];
    stepsArray=[...dat];
    let headerOut=
    `
        <h3>${figure}</h3>
        <p>${title}</p>
        <p>${description}</p>
        <button id="beginButton" class="submitButton" onClick="handleBeginButton()">Begin</button>
    `;
    document.getElementById("headerOutputArea").innerHTML=headerOut;   
}

function handleBeginButton()
{
    console.log("Begin steps");
    stepCount=1;
   // console.log(stepsArray[stepCount-1]);
    let stepNumber=stepsArray[stepCount-1]["stepNumber"];
    let stepText=stepsArray[stepCount-1]["stepText"];
   // console.log(stepNumber);
   // console.log(stepText);
    printSteps();
    
}

function printSteps()
{
    console.log("Stepcount",stepCount);
 //   console.log("data",stepsArray);
    let tableOpener=
    `
        <table><tbody>
    `;
    let tableCloser=
    `
        </tbody></table>
    `;
    let tableHeaders=
    `
        <tr>
            <th>#</th>
            <th>Step</th>
        </tr>
    `;
    let tableRows='';
    for(let i=0;i<stepCount;i++)
    {

        console.log(stepsArray[i]);
        let stepNumber=stepsArray[i]["stepNumber"];
        let stepText=stepsArray[i]["stepText"];
        tableRows+=
        `
            <tr>
                <td>${stepNumber}</td><td>${stepText}</td>
                
            </tr>
        `;
    }
    let table=
    `
        ${tableOpener}
        ${tableHeaders}
        ${tableRows}
        ${tableCloser}
    `;

    let backButton=
    `
        <button id="backButton" onclick="handleBackButton()" class="submitButton"><-</button>
    `;
     let forwardButton=
    `
        <button id="forwardButton" onclick="handleForwardButton()" class="submitButton">-></button>
    `;
    let buttonsRow=
    `
        <div id="buttonRow" >
            ${backButton}
            ${forwardButton}
        </div>
    `;
    
    // next need a next and back button and possibly finish conditions
    document.getElementById("stepsOutputArea").innerHTML=table;
    document.getElementById("nextButtonsOutput").innerHTML=buttonsRow;

}


function handleBackButton()
{
    console.log('back');
    if(stepCount>1)
    {
        stepCount--;
        printSteps();
    }
}

function handleForwardButton()
{
    console.log('forward');
    if(stepCount<stepsArray.length)
    {
        stepCount++;
        printSteps();
    }
}




function callBackendExOut(functionName,params,callback)
{
    let fetchTarget='php/exercisesout_controller.php';
    let inputPackage={function:functionName,params:params};
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

exercisesOutInit();