<?php 
    include_once 'tools.php';

    $scriptLink='<script src=js/quiz2Scripts.js></script>';
    $pageHeadline='<h2 class="subtitle">Memory Table Quizes</h2>';
    $subHeading=createElement('p','mqSubheading','subHeading',
    "
        There are many 'memory tables' in the RHCSA certification study guide.   The memory tables here on this page have been scrambled so that they don't match.   Click on and select the matching entries and as you 
        get them correct, they'll disappear.   Try to get rid of the whole chart without getting any wrong!
    ");
    $buttonOutput=createElement('p','buttonOutputArea','outputArea','');
    $tableOutput=createElement('p','quizTableOutput','outputArea','');
    $rightWrong=createElement('p',"rightWrongStatus","statusIndicator",'--:');
    $wrongCount=createElement('p',"wrongCount","statusIndicator","Wrong Answers: 0");

    $chapterButtons='<label>Chapters: </label>';;
    for($i=1;$i<=25;$i++)
        {
            $chapterButtons=$chapterButtons.
            "
                <button id='chapterButton$i' class='chapterButton' onclick='handleChapterButton($i)'>$i</button>
            ";
        }
    $activeChapterLabel=createElement('label','activeChapterLabel','statusIndicatorLabel','Current Chapter: ');
    $activeChapterIndicator=createElement('label','activeChapterIndicator','statusIndicator','None');
    $pageContents=''
            .$pageHeadline 
            .$subHeading
            .$scriptLink
            .$chapterButtons
            .'</br>'
            .$activeChapterLabel.$activeChapterIndicator
            .$buttonOutput
            .$rightWrong
            .$wrongCount
            .$tableOutput;
    echo $pageContents


    ?>