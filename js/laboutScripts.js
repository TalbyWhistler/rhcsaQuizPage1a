
let activeChapter=0;
let activeData=[];
let activeMetadata=[];
let activeStep=1;

function labOutInit()
{
    console.log("Chapter End lab out page");
    attachStyleSheet();
    selectNav();
}

function selectNav()
{
    let el=document.getElementById("chapterLabButton");
    el.classList.add('selectedNav');
}



function attachStyleSheet()
{
    let loc='css/laboutStyles.css';
    let el=document.createElement('link');
    el.type='text/css';
    el.rel='stylesheet';
    el.href=loc;
    document.body.appendChild(el);
}


function handleChapterButton(chapter)
{
    console.log("Handle chapter button for chapter",chapter);
    activeChapter=chapter;
    document.getElementById("chapterIndicator").innerHTML=chapter;
    fetchDataAndMetadata(chapter);
    
}

function fetchDataAndMetadata(chapter)
{
    let functionName="fetchDataAndMetadata";
    let params={'chapter':chapter};
    callToLabBackend(functionName,params,handleDataAndMetadata);
}

function handleDataAndMetadata(data)
{
    activeMetadata='';
    activeData='';
    console.log(data);
    console.log("Data",data["data"]);
    console.log("Metadata",data["metaData"]);
    activeMetadata=data["metaData"];
    activeData=data["data"];
    prepareLab(data["metaData"],data["data"]);
}

function prepareLab(metaData,data)
{
    //console.log(metaData[0]["chapter"]);
    let output='';
    if (metaData[0])
    {
        let chapter=metaData[0]["chapter"];
        let chapterTitle=metaData[0]["chapterTitle"];
        let labIntro=metaData[0]["labIntro"];
        output=
        `
            <h3>End of Chapter Lab for Chapter ${chapter}:${chapterTitle}</h3>
            <p>${labIntro}</p>
            <button onclick="handleBeginLab()" id="beginLabSubmit" class="submitButton">Begin Lab Steps</button> 
        `;       
    }
    else 
    {
        output=
        `
            <p>There is no lab data for Chapter ${activeChapter} at this time.
        `;
    }
    document.getElementById("labHeaderOutputArea").innerHTML=output;
    
}

function handleBeginLab()
{
    console.log("Handle begin lab");
    console.log("Active meta",activeMetadata);
    console.log("Active data",activeData);
    console.log(activeData.length)
    let numSteps=activeData.length;
    let currentStep=1;
    document.getElementById("labStepsOutputArea").innerHTML='';
    while(currentStep<=activeStep)
    {
        let stepNumber=activeData[currentStep-1]["stepNumber"];
        let stepText=activeData[currentStep-1]["stepText"];
        let line=
        `
            <p><strong>Step ${stepNumber}</strong></p><p>${stepText}</p>
        `;
        console.log(activeData[currentStep-1]);
        document.getElementById("labStepsOutputArea").innerHTML+=line;
        currentStep++;
    }
    let buttonLine=
    `
        <button onclick="handlePrevButton()" id="nextButton" class="submitButton">Prev Step</button>
        <button onclick="handleNextButton()" id="nextButton" class="submitButton">Next Step</button>
    `;
    document.getElementById("nextButtonOutputArea").innerHTML=buttonLine
}

function handleNextButton()
{
    console.log("Next");
     activeStep++;
    if (activeStep===activeData.length)
    {
        console.log("offer the end quiz button");
        let endLabButton=
        `
            <button onClick="handleEndLab()" id="endLabButton" class="submitButton">End Lab</button>
        `;
        document.getElementById("endLabButtonOut").innerHTML=endLabButton;
    
    }
    
    activeStep=activeStep<=activeData.length?activeStep:activeData.length;
    console.log("Active step",activeStep);
    handleBeginLab();
}
function handlePrevButton()
{
    console.log("Prev");
    activeStep--;
    activeStep=activeStep>1?activeStep:1;
    console.log("Active step",activeStep);
    handleBeginLab();
}


function handleEndLab()
{
    console.log("End lab");
    let outMessage=
    `
        <p>Congratulations you have completed the lab for Chapter ${activeChapter}:${activeMetadata[0]["chapterTitle"]}.</p>
    `;
    
    document.getElementById("labStepsOutputArea").innerHTML=outMessage;
    document.getElementById("nextButtonOutputArea").innerHTML='';
    document.getElementById("endLabButtonOut").innerHTML='';
    callLeaderboard();
}

function callToLabBackend(functionName,params,callback)
{
    let fetchTarget='php/labout_controller.php';
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
    .then(data=>callback(data));
}



function callLeaderboard()
{
    console.log("Call leaderboard");
    let eventCode='cl';
 //   let score=globalScore;
    
    let params={'eventCode':eventCode,'chapter':activeChapter,'figure':activeMetadata[0]["chapterTitle"],'score':1,'outof':1};
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


labOutInit();