function progressInit()
{
    console.log("Progress");
    attachStylesheet();
}

function attachStylesheet()
{
    let loc='css/progressStyles.css';
    let el=document.createElement("link");
    el.type='text/css';
    el.rel='stylesheet';
    el.href=loc;
    document.body.appendChild(el);
}


function writeToExplanation(message)
{
    document.getElementById("explanationIndicator").innerHTML=message;
}

function handleChapterActivity()
{
    console.log('Handle chapter activity');
    let functionName="fetchActivity";
    let explanation=
    `
        The activity grid is to indicate where you've been spending your time so far.
    `;
    writeToExplanation(explanation);
    callBackend(functionName,'',paintNumbers);
}


function handleScoresButton()
{
    console.log("Scores button");
    let explanation=
    `
        This grid will get transformed based on your average scores per chapter.   Untouched chapters get a 0 score to start.
    `;
    writeToExplanation(explanation);
    callBackend("fetchScores",'',paintNumbers);
}

function paintNumbers(data)
{
    console.log(data);
  
  //  let target=document.getElementById("stackNumber0");
  //  let targetStyle=document.createElement("style");
 //   let activityValue=data[0]*3;
 /*
    targetStyle.innerHTML=`#stackNumber1{
    background-color:rgb(${255-activityValue},${255-activityValue},128);
    color:rgb(${activityValue},${activityValue},${activityValue});
    }`;
    document.body.appendChild(targetStyle);
*/
    for(let i=0;i<25;i++)
    {
        console.log(i);
        let activityValue=data[i]*3;
        let targetEl=document.getElementById(`stackNumber${i+1}`);
        let tStyle=document.createElement("style");
        let aValue=data[i];
        tStyle.innerHTML=
        `
            #stackNumber${i+1}{
             background-color:rgb(${255-activityValue/2},${255-activityValue/2},200);
            color:rgb(${activityValue},${activityValue},${activityValue});
            }
        `;
        /*

        tStyle.innerHTML=
        `
             #stackNumber${i+1}{
             background-color:rgb(224,${255-activityValue/2},${255-activityValue/2});
            color:rgb(${activityValue},${activityValue},${activityValue});
            }
        `;
        */
        document.body.appendChild(tStyle);
    }
}

function handleChapterCompletion()
{
    console.log("fetch completion");
    callBackend('fetchCompletion','',paintNumbers);
    let explanation=
    `
        This grid gets filled in if you complete EACH of the activities in the chapter, any activites you haven't completed will work against you.
    `;
    writeToExplanation(explanation);
}


function handleChapterExposure()
{
    console.log("Chapter exposure");
    const explanation=
    `
        This grid gets filled in fully if you complete ANY activities from the chapter.  It is to let you know what you've seen and what you haven't.
    `;
    writeToExplanation(explanation);
    callBackend('fetchExposure','',paintNumbers);
}

function callBackend(functionName,functionParams,callback)
{
    const fetchTarget='php/progress_control.php';
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


progressInit();