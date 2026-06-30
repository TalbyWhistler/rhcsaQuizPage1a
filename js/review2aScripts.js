let chapterData={};
let userAnswers=[];
let questionCount=0;
let activeChapter;

function loadChapterData(data)
{
    chapterData=data;
    console.log(chapterData);
   
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
    console.log("Chapter button",chapter);
    document.getElementById("selectedChapterIndicator").innerHTML=chapter;
    document.getElementById("summaryOutputArea").innerHTML='';
    document.getElementById("quizCard").classList.add("hiddenClass");
    writeToStartQuizStatus
    document.getElementById("answerSubmitIndicator").innerHTML='Ready';
    document.getElementById("startQuizStatusIndicator").innerHTML='Ready';
    activeChapter=chapter;
    questionCount=0;
    callBackendQa2("fetchQa",{chapter:chapter},loadChapterData);
}

function handleStartQuiz()
{
    console.log("Handle start quiz");
    if(!activeChapter)
    {
        writeToStartQuizStatus("No chapter selected");
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
    for(let i=0;i<chapterData["questions"].length;i++)
    {
        outputSummary+=
        `
            <label>Question ${chapterData["questions"][i]["questionNo"]}</label>
            <p><strong>${chapterData["questions"][i]["questionText"]}</strong></p>
            <p>${userAnswers[i]["userAnswerText"]}</p>
            <p><i>${chapterData["answers"][i]["answerText"]}</i></p>

        `;
    }
    document.getElementById("summaryOutputArea").innerHTML=outputSummary;
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

rq2ainit();