let chapterData={};
let userAnswers=[];
let questionCount=0;
let activeChapter;
let quizScore=0;
let numQuestions=10;
let activeFigure='';
let chapterHasData=true;

function loadChapterData(data)
{
    chapterData=data;
    console.log(chapterData);
    console.log('//////////////////////////')
    console.log(chapterData["questions"].length);
    if (chapterData["questions"].length>0)
    {
        chapterHasData=true;
    }
    else 
    {
        chapterHasData=false;
    }
    console.log("Chapter has data ",chapterHasData);
   // console.log(chapterData["questions"][0])
}

function hideQuizCard()
{
    let el=document.getElementById("quizCard");
    el.classList.add("hiddenClass");
}


function rq2ainit()
{
    console.log("Review Questions");
    attachStyleSheet();
     hideQuizCard();
}

function writeToStartQuizStatus(message)
{
    document.getElementById("startQuizStatusIndicator").innerHTML=message;
}


function chapterButton(chapter)
{
    
    quizScore=0;
    console.log("Chapter button",chapter);
    document.getElementById("selectedChapterIndicator").innerHTML=chapter;
    document.getElementById("summaryOutputArea").innerHTML='';
    document.getElementById("quizCard").classList.add("hiddenClass");
    writeToStartQuizStatus
    document.getElementById("answerSubmitIndicator").innerHTML='Ready';
    document.getElementById("startQuizStatusIndicator").innerHTML='Ready';
    activeChapter=chapter;
    activeFigure='rq-'+activeChapter;
    questionCount=0;
    userAnswers=[];//////////////////////////////
    chapterData={};
    userAnswers=[];
    callBackendQa2("fetchQa",{chapter:chapter},loadChapterData);
}

function handleStartQuiz()
{
    console.log("Handle start quiz");
    if(!activeChapter)
    {
        writeToStartQuizStatus("No chapter selected");
    }
    else if (!chapterHasData)
    {
        writeToStartQuizStatus(`The review question for chapter ${activeChapter} are not available at this time.`)
    }
    else 
    {
        writeToStartQuizStatus(`Chapter ${activeChapter}`);
        document.getElementById("quizCard").classList.remove("hiddenClass");
        runQuizQuestion(); 
       
    }
}


function attachStyleSheet()
{
    let loc='css/review2aStyles.css';
    let el=document.createElement('link');
    el.type="text/css";
    el.rel="stylesheet";
    el.href=loc;
    document.body.appendChild(el);
}

function callBackendQa2(functionName,params,callback)
{
    let fetchTarget='php/review2a_controller.php';
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

function handleAnswerSubmit()
{
    let userAnswer=document.getElementById("answerIn").value;
    if (userAnswer.length<1)
    {
        document.getElementById("answerSubmitIndicator").innerHTML="Invalid input";
    }
    else 
    {
        document.getElementById("answerSubmitIndicator").innerHTML="Input accepted";
        let unitArray={'questionNo':questionCount,'userAnswerText':userAnswer};
        userAnswers.push(unitArray);
        questionCount++;
        document.getElementById("answerIn").value='';
        document.getElementById("answerIn").focus();
        nextQuestion();
    }
}




function printQuestionText(question)
{
    document.getElementById("questionOut").innerHTML=question;
    document.getElementById("outOfOutput").innerHTML=chapterData["questions"].length;
    document.getElementById("questionNumberOutput").innerHTML=Number(questionCount)+1;

}

function nextQuestion()
{
    console.log("question count",questionCount);
    runQuizQuestion();
}


function printQuizQuestion()
{
    if (questionCount<chapterData["questions"].length)
    {
        let questionText=chapterData["questions"][questionCount]["questionText"];
        printQuestionText(questionText);
    }
   
   // questionCount++;
}


function runQuizQuestion()
{
   
    
    if (questionCount<chapterData["questions"].length)
    {
       // console.log("Run quiz question ")
       // printQuestionText("Construct and print the question with inputs and buttons get the answer and advance the questionCounter");
        printQuizQuestion();
    }
    else 
    {
        console.log("The quiz is over, print the question, the user answers and the real answers to all questions");
        console.log(userAnswers);
        endQuiz();
    }   
}

function endQuiz()
{
    let outputSummary='';
    let submitButton=
    `
        <button onclick="handleSubmitGrading()" id="gradingSubmitButton" class="submitButton">Submit Grading</button>
    `;
    
    for(let i=0;i<chapterData["questions"].length;i++)
    {
        let correctionInput=
        `
            <input id="isCorrect${i}" class="isCorrect" type="checkbox"/>
        `;
        outputSummary+=
        `
            <label>Question ${chapterData["questions"][i]["questionNo"]}</label>
            <p><strong>${chapterData["questions"][i]["questionText"]}</strong></p>
            <p>${userAnswers[i]["userAnswerText"]}</p>
            <p><i>${chapterData["answers"][i]["answerText"]}</i></p>
            <label>Was your answer correct?</label>${correctionInput}</br></br>
        `;
    }
    outputSummary+=submitButton;
    document.getElementById("summaryOutputArea").innerHTML=outputSummary;
    chapterData={};
    userAnswers=[];
}

function handleSubmitGrading()
{
    console.log('Handle submit grading');
    let gradesArray=[];
    for(let i=0;i<10;i++)
    {
        let id="isCorrect"+i;
        console.log("ID=",id);
        let el=document.getElementById(id);
        let grade=el.checked;
        if (grade)
        {
            quizScore++;
        }
    }
    let outputSummary=
    `
        <p>
            Your final score for this chapter was ${quizScore} out of 10 review questions.
        </p>
    `;
    document.getElementById("summaryOutputArea").innerHTML=outputSummary;
    callLeaderboard();
    //console.log("//////////////call leaderboard");
}


function runQuizQuestions()
{
    let counter=0;
    while(counter<10)
    {
        console.log("counter",counter)
        console.log("question count",questionCount);
        runQuizQuestion();
    }
}

function callLeaderboard()
{
    console.log("Call leaderboard");
    let eventCode='rq';
    let score=quizScore;
    let outputMessage=
    `
         Event code:${eventCode}
         Chapter:${activeChapter}
         Figure:${activeFigure}
         Score:${score};
         Number of Questions:${numQuestions}

    `;
    let params={'eventCode':eventCode,'chapter':activeChapter,'figure':activeFigure,'score':score,'outof':numQuestions};
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

rq2ainit();