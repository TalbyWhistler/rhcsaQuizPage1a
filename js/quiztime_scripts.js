window.questionCount=1;
window.chapter=0;
window.quizScore=0;
window.hasBeenAnswered=false;

let twoAnswers=false;
let twoAnswerCount=0;
let firstAnswer='';


let activeChapter=0;
let activeFigure='KnowAlready-'+activeChapter;
let numQuestions=10;

let globalScore=0;


function quizTimeTesto()
{
    console.log("Testo!");
}



function handleTakeQuizButton()
{
    globalScore=0;
    const MAX_CHAPTER=6;
    let inputValue=activeChapter;
    activeFigure='knowAlready-'+activeChapter;
    console.log("handle button // ",activeChapter);
    if (activeChapter<1)
    {
        document.getElementById("takeQuizStatusIndicator").innerHTML="Please select a chapter first";
    }
    else if (activeChapter>MAX_CHAPTER)
    {
        document.getElementById("takeQuizStatusIndicator").innerHTML="Chapter not available";
    }
    else 
    {
        window.chapter=inputValue;
        document.getElementById("takeQuizStatusIndicator").innerHTML="Input Accepted...loading quiz for chapter "+`${inputValue}`+"...";
       // document.getElementById("quizTimeChapterChoice").value='';
        setTimeout(()=>{document.getElementById("takeQuizStatusIndicator").innerHTML="Ready"},3000);
        console.log("Here we start processing the quiz....");
       
     //   let params={chapter:inputValue};
        console.log("input value",inputValue)
        quizControl(inputValue);
    }

}

/*
function handleTakeQuizButtonB()
{
    const MAX_CHAPTER=6;
    console.log("Handling take quiz button...");
    //console.log('///////////////////////////////////');
    let inputValue=Number(document.getElementById("quizTimeChapterChoice").value); 
    console.log("value",inputValue);
    if (inputValue.length==0)
    {
        document.getElementById("takeQuizStatusIndicator").innerHTML="Invalid Input";
        setTimeout(()=>{document.getElementById("takeQuizStatusIndicator").innerHTML="Ready"},3000);
    }
    else if (inputValue<1 || inputValue>MAX_CHAPTER)
    {
        document.getElementById("takeQuizStatusIndicator").innerHTML="Sorry we don't have that chapter.";
        setTimeout(()=>{document.getElementById("takeQuizStatusIndicator").innerHTML="Ready"},3000);
    }
    else 
    {
        window.chapter=inputValue;
         document.getElementById("takeQuizStatusIndicator").innerHTML="Input Accepted...loading quiz for chapter "+`${inputValue}`+"...";
          document.getElementById("quizTimeChapterChoice").value='';
        setTimeout(()=>{document.getElementById("takeQuizStatusIndicator").innerHTML="Ready"},3000);
        console.log("Here we start processing the quiz....");
       
     //   let params={chapter:inputValue};
     console.log("input value",inputValue)
        quizControl(inputValue);
        //quizCallBackend("fetchQuiz",params,testPrint);
    }
}
    */

function testPrint(data)
{
    console.log(data);
    //document.getElementById("takeQuizStatusIndicator").innerHTML=data;
}

function fetchQuizAnswer(chapter,questionNumber)
{
    quizCallBackend("fetchQuizAnswer",{chapter:chapter,questionNumber:questionNumber},testPrint);
}

function quizCallBackend(functionName,functionParams,callback)
{
    const fetchTarget='php/quiz_time_backend.php';
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


function quizControl(chapter)
{
    console.log("Quiz control chapter " + chapter);

   // console.log(questionCount);
     let question=window.questionCount;
     console.log("Question is "+question);
      let params={chapter:chapter,question:question};
     let functionName='fetchQuizQuestion';
     console.log(Window.questionCount);
     
     
    quizCallBackend("fetchQuizQuestion",params,printQuizQuestion);
    console.log("Question count is",question);
     
    
    // quizCallBackend("fetchQuizAnswer",{chapter:chapter,questionNumber:questionNumber},testPrint);
   //  window.questionCount+=1;
}

function kaChapterChoice(chapterIn)
{
    console.log("kaChapter choice",chapterIn);
    activeChapter=chapterIn;
    document.getElementById("chapterIndicator").innerHTML=chapterIn;
}


function printQuizQuestion(data)
{
   // console.log(data);
    
    Window.hasBeenAnswered=false;
    document.getElementById("answerOutputArea").innerHTML='';
    let questionData=data["questions"];
    let answerData=data["answers"];
    let index=window.questionCount;

    window.questionCount+=1;
    if (window.questonCount>10)
    {
        return false;
    }
    console.log(data);
    let chapter=questionData[0]["chapter"];
    let questionNumber=questionData[0]["questionNumber"];
    // quizCallBackend("queryForTwo",{chapter:chapter,questionNumber:questionNumber},setQueryForTwo);
    let questionText=questionData[0]["questionText"];
  //  console.log("Question text",questionText);
    let a=questionData[0]["a"];
   
    let b=questionData[0]["b"];
    let c=questionData[0]["c"];
    let d=questionData[0]["d"];
    let hasTwoAnswers=questionData[0]["hasTwoAnswers"];
    if (hasTwoAnswers)
    {
        console.log("This question has two answers...",hasTwoAnswers);
        twoAnswers=true;
    }
    else 
    {
        twoAnswers=false;
    }
    
    /*
    let questionCardContents=
    `
        <h3>${questionText}</h3>
        </br>
        <p >${a}</p><button onclick="answerButton('a')" >X</button>
        </br>
        <p >${b}</p><button onclick="answerButton('b')" >X</button>
        </br>
        <p ">${c}</p><button onclick="answerButton('c')" >X</button>
        </br>
        <p >${d}</p><button onclick="answerButton('d')" >X</button>
        </br>
    `;
    */
   // console.log("TWO ANSWERS",twoAnswers);
    let smallHeader=
    `
        <p>Chapter:${chapter} Question:${questionNumber}</p>
    `;
    let tableOpener='<table><tbody>';
    let tableCloser='</tbody></table>';
    let middleRows=
    `
        
        <tr>
            <td><h3>${questionText}${hasTwoAnswers?'(Answer two)':''}</h3></td>
        </tr>
        <tr>
            <td><p><label>A: </label>${a}</p></td><td><button  onclick="answerButton(${chapter},${questionNumber},'a',${twoAnswers})">x</button></td>
        

        </tr>
        <tr>
             <td><p><label>B: </label>${b}</p></td><td><button  onclick="answerButton(${chapter},${questionNumber},'b',${twoAnswers})">x</button></td>
        </tr>
        <tr>
             <td><p><label>C: </label>${c}</p></td><td><button  onclick="answerButton(${chapter},${questionNumber},'c',${twoAnswers})">x</button></td>
        </tr>
        <tr>
             <td><p><label>D: </label>${d}</p></td><td><button  onclick="answerButton(${chapter},${questionNumber},'d',${twoAnswers})">x</button></td>
        </tr>
    `;
    let questionCardContents=smallHeader+tableOpener+middleRows+tableCloser;
    let questionCard='<div id="questionCard" class="questionCardClass">'+questionCardContents+'</div>';
    document.getElementById("quizOutputArea").innerHTML=questionCard;

   


    return true;
    
}

/*
function setQueryForTwo(data)
{
    console.log(data);
    twoAnswers=data;
    console.log("TWO ANSWERS",twoAnswers);
}
*/

function answerButtonB(chapter,questionNumber,choice)
{
     console.log("Answer button ",chapter,":",questionNumber,"choice",choice);
        quizCallBackend("fetchQuizAnswer",{chapter:chapter,questionNumber:questionNumber,choice:choice},handleAnswer);
        console.log("Return to answer button");
    
   // console.log("Answers",answerLetter + " " + choice);   
}

function answerButton(chapter,questionNumber,choice,waitForSecond)
{
    if (!waitForSecond)
    {
        console.log("Answer button ",chapter,":",questionNumber,"choice",choice);
        quizCallBackend("fetchQuizAnswer",{chapter:chapter,questionNumber:questionNumber,choice:choice},handleAnswer);
        console.log("Return to answer button");
        twoAnswerCount=0;
    }
    else if(waitForSecond && twoAnswerCount==0)
    {
       // twoAnswers=false;
       console.log("Wait for second part 1",choice)
        twoAnswerCount+=1;
        firstAnswer=choice;
    }
    else if (waitForSecond && twoAnswerCount==1)
    {
        console.log("Wait for second part 2",choice);
        console.log("fullchoice",firstAnswer+choice);
        waitForSecond=false;
        twoAnswerCount=0;
        let fullChoice=firstAnswer+choice;
        quizCallBackend("fetchQuizAnswer",{chapter:chapter,questionNumber:questionNumber,choice:fullChoice},handleAnswer);
    }
}


function handleNext()
{
    if (window.questionCount==11)
    {
        handleSummary();
    }
    else 
    {
        quizControl(window.chapter,window,questionCount);
    }
}

function handleSummary()
{
    console.log("Handle summary");
    let resultsScore={
        0:" means you literally don't know anything...study study!",
        1:"is awful",
        2:"is terrible",
        3:"is just....Yikes",
        4:"means more studying...",
        5:"means you're not clueless, but not great...",
        6:"means you're getting there....",
        7:"means you know some things!",
        8:"means you know most things!",
        9:"is an just awesome",
        10:"perfect!  You really know this material!"
    }
    let scoreOutputContents=
    `
        <p>Ok, you're done!  Your score  ${resultsScore[window.quizScore]} </p>
        <p>${window.quizScore}/10</p>

    `;
    let scoreResetButton=
    `
        <button id='quizReset' class='resetButton' onclick='handleQuizReset()'>Reset Quiz</button>
    `;
    scoreOutputContents=scoreOutputContents+scoreResetButton;
    document.getElementById("answerOutputArea").innerHTML='';
    document.getElementById("quizOutputArea").innerHTML=scoreOutputContents;
   // console.log("Score is ",Window.quizScore);
    console.log("Score is ",window.quizScore,"/10");
    console.log("///// globals",globalScore,"/",numQuestions,"Chapter",activeChapter,"Figuretitle",activeFigure);
    callLeaderboard();
}


function handleQuizReset()
{
    console.log("Handle quiz reset");
    globalScore=0;
    window.questionCount=1;
    window.chapter=1;
    window.quizScore=0;
    window.hasBeenAnswered=false;
    document.getElementById("quizOutputArea").innerHTML='';
    
    const element=document.getElementById("quizTimeChapterChoice");
    if (element)
    {
        element.focus();
    }
        
   // document.getElementById("quizTimeChapterChoice").focus();
}

function handleAnswer(data)
{
    //console.log("Handle answer",data);
    console.log("Window has been answered",Window.hasBeenAnswered);
    let systemResponse='';
    let userChoice=data[0]["choice"];
    let userChoice2=data[0]["choice2"];
    let answerLetter=data[0]["answerLetter"];
    let answer=data[0]["answer"];
    let answerLetter2=data[0]["answerLetter2"];
    let nextButton=
    `
        <button id='quizNextButton' class='nextButton' onclick="handleNext()">Next</button>
    `
    if(answerLetter2)
    {
        console.log("Process for two answers");
        console.log("userChoice",userChoice,"userChoice2",userChoice2,"answerLetter",answerLetter,"answerLetter2",answerLetter2);
        if ( (userChoice==answerLetter && userChoice2 == answerLetter2) || (userChoice==answerLetter2 && userChoice2==answerLetter) )
        {
            console.log("It appears that both answer are correct");
            systemResponse="That's right! "+answer;
            document.getElementById("answerOutputArea").innerHTML=systemResponse + '<br/>' + nextButton;
            Window.hasBeenAnswered=true;
            window.quizScore+=1;
            globalScore+=1;
        }
        else 
        {
            console.log("Didn't get them both right");
            systemResponse="No I'm afraid not, the correct answer is " + answerLetter + " " + answer + '<br/>' + nextButton;
            document.getElementById("answerOutputArea").innerHTML=systemResponse;
            Window.hasBeenAnswered=true;
        }
    }
    else 
    {
        console.log("Process for one answer");
        if (userChoice===answerLetter && !Window.hasBeenAnswered)
        {
            systemResponse="That's right! "+answer;
            document.getElementById("answerOutputArea").innerHTML=systemResponse + '<br/>' + nextButton;
            Window.hasBeenAnswered=true;
            window.quizScore+=1;
             globalScore+=1;
        }
            else if (userChoice!=answerLetter && !Window.hasBeenAnswered)
            {
                systemResponse="No I'm afraid not, the correct answer is " + answerLetter + " " + answer + '<br/>' + nextButton;
                document.getElementById("answerOutputArea").innerHTML=systemResponse;
                Window.hasBeenAnswered=true;
            }
            else 
            {
                
            }   
    }
    
    console.log(systemResponse);
    setTimeout(() => {return},3000);
}

function callLeaderboard()
{
    console.log("Call leaderboard");
    let eventCode='ka';
    let score=globalScore;
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


