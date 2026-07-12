<?php 
        include_once 'tools.php';
        $title=createElement("h2","exercisesOutTitle","subtitle","Exercises");
         $scriptLink='<script src="js/exercisesoutScripts.js"></script>';
        $subTitle=createElement("p","exercisesoutSubtitle","subHeading",
        "
            The RHCSA cert study guide contains many helpful exercises.   
            Select one of the following exercises to run it step by step.
        ");
        $buttonArea=createElement("p","exercisesoutButtonArea","buttonArea","");
        $buttonAreaContainer=createElement("div","eoButtonAreaContainer","buttonAreaContainer",$buttonArea);

        $exerciseHeader=createElement("p","headerOutputArea","outputArea","");
        $headerContainer=createElement("div","exOutHeaderContainer","headerContainer",$exerciseHeader);

        $stepsOut=createElement("p","stepsOutputArea","outputArea","");
        $stepsOutContainer=createElement("div","stepsOutContainer","outputContainer",$stepsOut);

        $nextButtonsOutput=createElement("p","nextButtonsOutput","outputArea","");

         $chapterButtons='';
        for($i=1;$i<=25;$i++)
            {
                $chapterButtons=$chapterButtons.
                "
                    <button id='chapterButton$i' class='chapterButton' onclick='handleChapterButton($i)'>$i</button>
                ";
            }
        $activeChapterLabel=createElement('label','activeChapterLabel','statusIndicatorLabel','Current Chapter: ');
        $activeChapterIndicator=createElement('label','activeChapterIndicator','statusIndicator','None');

        $content=''
            .$title
            .$subTitle
             .$chapterButtons
            .'</br>'
            .$activeChapterLabel.$activeChapterIndicator
            .$buttonAreaContainer
            .$headerContainer
            .$stepsOutContainer
            .$nextButtonsOutput
            .$scriptLink;


        $contentContainer=createElement('div','exercisesOutContentContainer','contentContainer',$content);
        echo $contentContainer;
?>