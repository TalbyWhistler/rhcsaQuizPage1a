<?php 
        include_once 'tools.php';
        $title=createElement('h1','rq2Title','title','Review Questions');
        $scriptLink='<script src="js/review2aScripts.js"></script>';
        $buttons='';
        for($i=1;$i<=24;$i++)
            {
                $buttons=$buttons.
                '<button id="chapterButton'.$i.'" onclick="chapterButton('.$i.')">'.$i.'</button>';
            };

        $selectedChapterIndicator=createElement('label','selectedChapterIndicator','statusIndicator','None');
        $selectedChapterIndicatorLabel=createElement('label','chapterLabel','label','Current Selected Chapter: ');
        $selectedChapterBox=createElement('div','selectedChapterIndicatorBox','statusIndicatorBox',$selectedChapterIndicatorLabel.$selectedChapterIndicator);
        $startQuiz=createButton("startQuizButton","submitButton","handleStartQuiz","Start Quiz");
        $startQuizStatus=createElement("p","startQuizStatusIndicator","statusIndicator","Ready");
        $startQuizBox=createElement("div","sqsiBox","indicatorBox",$startQuizStatus);
        
        $questionOut=createElement("p","questionOut","outputArea","");
        $answerIn="<textarea id='answerIn' class='inputArea' row=4 cols=40></textarea>";
        $answerSubmit=createButton("answerSubmit","submitButton","handleAnswerSubmit","Submit");
        $answerIndicator=createElement('p','answerSubmitIndicator','statusIndicator','Ready');
        $answerIndicatorBox=createElement('div','asIndicatorBox','indicatorBox',$answerIndicator);
        $outOfOutput=createElement('label','outOfOutput','statusIndicator','');
        $questionNumberOutput=createElement('label','questionNumberOutput','statusIndicator','');
        $quizCardContents=
        "
            <label>Question </label>$questionNumberOutput out of $outOfOutput
            $questionOut
            $answerIn
            </br>
            $answerSubmit
            $answerIndicatorBox
        ";

        $summaryOutputArea=createElement("p","summaryOutputArea","outputArea",'');


        $quizCard=createElement('div','quizCard','card',$quizCardContents);

        $pageContents=''
            .$title
            .$buttons
            .$selectedChapterBox
            .$startQuiz
            .$startQuizStatus
            .$quizCard
            .$summaryOutputArea
            .$scriptLink;
        $pageContainer=createElement('div','rq2PageContainer','pageContainer',$pageContents);
        echo $pageContainer;
?>