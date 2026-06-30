<?php 
        include_once 'tools.php';
        $title=createElement("h2","exercisesOutTitle","title","Exercises");
         $scriptLink='<script src="js/exercisesoutScripts.js"></script>';
        $subTitle=createElement("p","exercisesoutSubtitle","subtitle","Select one of the following exercises to run it step by step");
        $buttonArea=createElement("p","exercisesoutButtonArea","buttonArea","");
        $buttonAreaContainer=createElement("div","eoButtonAreaContainer","buttonAreaContainer",$buttonArea);

        $exerciseHeader=createElement("p","headerOutputArea","outputArea","");
        $headerContainer=createElement("div","exOutHeaderContainer","headerContainer",$exerciseHeader);

        $stepsOut=createElement("p","stepsOutputArea","outputArea","");
        $stepsOutContainer=createElement("div","stepsOutContainer","outputContainer",$stepsOut);

        $nextButtonsOutput=createElement("p","nextButtonsOutput","outputArea","");


        $content=''
            .$title
            .$subTitle
            .$buttonAreaContainer
            .$headerContainer
            .$stepsOutContainer
            .$nextButtonsOutput
            .$scriptLink;


        $contentContainer=createElement('div','exercisesOutContentContainer','contentContainer',$content);
        echo $contentContainer;
?>