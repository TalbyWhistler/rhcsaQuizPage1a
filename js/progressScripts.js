let globalFetchIp='';


function progressInit()
{
    console.log("Progress");
    getCurrentAccount();
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
        The activity grid is to indicate where you've been spending your time so in total on linuxLab.
    `;
    writeToExplanation(explanation);
    callBackend(functionName,'',paintNumbers);
}

function handleChapterActivityByIp()
{
    let explanation=
    `
        The activity grid is to indicate where you've been spending your time so in total on linuxLab.
    `;
    writeToExplanation(explanation);
    let functionName="fetchActivityByIp";
    let params={'ip':globalFetchIp};
    callBackend(functionName,params,paintNumbers);
}

function handleScoresByIp()
{
    console.log("Scores button");
    let explanation=
    `
        This grid will get transformed based on your average scores per chapter.   Untouched chapters get a 0 score to start.
    `;
    writeToExplanation(explanation);
    callBackend("fetchScoresByIp",{'ip':globalFetchIp},paintNumbers);
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

function clearNumbers()
{
     for(let i=0;i<25;i++)
    {
        console.log(i);
     //   let activityValue=data[i]*3;
        let targetEl=document.getElementById(`stackNumber${i+1}`);
        let tStyle=document.createElement("style");
     //   let aValue=data[i];
        tStyle.innerHTML=
        `
            #stackNumber${i+1}{
             background-color:rgb(223, 223, 239,200);
            color:rgb(0,0,0);
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

function handleChapterCompletionByIp()
{
    let ip=globalFetchIp;
    let params={'ip':ip};
    callBackend("fetchCompletionByIp",params,paintNumbers);
}

function handleChapterExposureByIp()
{
    let ip=globalFetchIp;
    let params={'ip':ip};
    callBackend("fetchExposureByIp",params,paintNumbers);
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

function handleLoadProgressButton()
{
    console.log("Handle load progress button");
    callBackend("fetchOtherProgressList",'',printProgressList);
    
}



function getCurrentAccount()
{
    console.log("Get current account");
    callBackend("fetchCurrentAccount","",printCurrentAccount);
}
function printCurrentAccount(accountData)
{
    document.getElementById("currentProgressIndicator").innerHTML=accountData;
    fetchIpFromAccount(accountData);
    
}

function fetchIpFromAccount(account)
{
    console.log("Fetch ip from account",account);
    let params={'account':account};
    callBackend("getIpWithAccount",params,setGlobalIpForViewing);
}

function setGlobalIpForViewing(data)
{
    globalFetchIp=data;
    console.log("Global ip for viewing is ",data);
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
    document.getElementById("loadProgressListoutput").innerHTML=table;
}

function uploadProgress(ip,progressId)
{
    console.log('upload progress',ip,progressId);
    document.getElementById("currentProgressIndicator").innerHTML=progressId;
    globalFetchIp=ip;
    clearNumbers();
    

}

function handleBacktoLocal()
{
    console.log("Back to local");
    getCurrentAccount();
    clearNumbers();
}

progressInit();