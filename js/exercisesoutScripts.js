let metadataObject={};
let stepsArray=[];
let stepCount=0;
let globalFigure='';
let globalTitle='';
let numQuestions=1;
let globalChapter=0;


function exercisesOutInit()
{
    console.log("Exercises out");
    attachStylesheet();
    selectNav();
   // fetchRecordsForButtons();
}

function selectNav()
{
    let el=document.getElementById("exerciseButton");
    el.classList.add('selectedNav');
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
  //  console.log(data)
    let buttonContent='';
    for(let i=0;i<data.length;i++)
    {
        let figure=data[i]["figure"];
        let title=data[i]["title"];
        let button=
        `
            <button class="chapterButton" onClick="handleChoiceButton('${figure}','${title}')"><strong>${figure}</strong>${title?'|'+title:''}</button>
        `;
        buttonContent+=button;
    }
    document.getElementById("exercisesoutButtonArea").innerHTML=buttonContent;
}

function handleChoiceButton(figure,title)
{
    globalFigure=figure;
    globalTitle=title;
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
  //  console.log("data",dat);
  //  console.log("met",met[0]);
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

      //  console.log(stepsArray[i]);
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
    else 
    {
        endExercise();
    }
}

function endExercise()
{
    console.log("End of exercise");
    let outputMessage=`Congratulations.  You have completed the exercises for figure ${globalFigure} ${globalTitle}`;
     document.getElementById("stepsOutputArea").innerHTML=outputMessage;
    document.getElementById("nextButtonsOutput").innerHTML='';
    callLeaderboard();

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

function callLeaderboard()
{
    console.log("Call leaderboard");
    let eventCode='ex';
    let score=1
    let outputMessage=
    `
         Event code:${eventCode}
         Chapter:${Number(globalFigure[0])}
         Figure:${globalFigure}
         Score:${score}
         Number of Questions:${numQuestions}

    `;
    let params={'eventCode':eventCode,'chapter':Number(globalFigure[0]),'figure':globalFigure,'score':score,'outof':numQuestions};
    let functionName='writeToLeaderboard';
    let fetchTarget='php/leaderboard_control.php';
    let inputPackage={'function':functionName,'params':params};
    inputPackage=JSON.stringify(inputPackage);
    fetch(fetchTarget,
        {
            method:'POST',
            headers:{'Content-Type':'Application/json'},
            body:inputPackage
        }
    )
    .then(response=>response.json())
    .then(data=>console.log(data));

    //console.log(outputMessage);
}

function handleChapterButton(chapter)
{
    console.log("Handle chapter button ",chapter);
    document.getElementById("headerOutputArea").innerHTML='';
    document.getElementById("stepsOutputArea").innerHTML='';
    document.getElementById("nextButtonsOutput").innerHTML='';
    document.getElementById("activeChapterIndicator").innerHTML=chapter;
    document.getElementById("stepsOutputArea").innerHTML='';
    
    for(let i=1;i<=25;i++)
    {
        let el=document.getElementById(`chapterButton${i}`);
        el.classList.remove('selectedChapter')
    }
    let target=document.getElementById(`chapterButton${chapter}`);
    target.classList.add("selectedChapter");
    callBackendExOut("fetchRecordsPerChapter",{'chapter':chapter},printButtons);
}

exercisesOutInit();