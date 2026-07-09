<?php 
        include_once 'tools.php';
        $title=createElement('h2','progressTitle','subtitle','Progress');
        $scriptLink='<script src="js/progressScripts.js"></script>';

        $chapterActivity=createButton('chapterActivityButton','submitButton','handleChapterActivity','Activity');
        $chapterExposure=createButton('chapterExposureButton','submitButton','handleChapterExposure','Exposure');
        $chapterCompletion=createButton('chapterCompletionButton','submitButton','handleChapterCompletion','Completion');
        $scores=createButton('scoresButton','submitButton','handleScoresButton','Scores');
        $subHeading=createElement('p','progressSubheading','subHeading',
        "
            This grid represents the 25 chapters in the RHCSA certification study guide, the objective of the game is to fill in all of the various grids.
        ");

        $numberStack='<table><tbody>';
        $counter=1;
        for($i=0;$i<5;$i++)
            {
                $numberStack=$numberStack.'<tr>';
                for ($j=0;$j<5;$j++)
                    {
                        $numberStack=$numberStack."<td id='numberStackTd$counter' class='numberStackTd'>";
                        $numberStack=$numberStack."<label id ='stackNumber$counter' class='stackNumber'>$counter</label>";
                        $numberStack=$numberStack.'</td>';
                        $counter=$counter+1;
                    }
                $numberStack=$numberStack.'</tr>';
            }
        $numberStack=$numberStack.'</tbody></table>';

        $buttonAreaContent=
        "
            $chapterActivity
            $chapterExposure
            $chapterCompletion
            $scores
        ";

        $buttonArea=createElement('div','buttonArea','row',$buttonAreaContent);
        $numberStackoutput=createElement('div','numberStackArea','outputArea','');
        $numberStackContainer=createElement('div','numberStackContainer','panelContainer',$numberStack);

        $explanationIndicator=createElement('p','explanationIndicator','statusIndicator','Each of these grids can help you know where to go next.');

        $loadProgressHeader=createElement('p','progressHeader','header','Load Progress');
        $currentProgressLabel=createElement('label','currentProgressLabel','label','Currently showing progress for account|');
        $currentProgress=createElement('label','currentProgressIndicator','statusIndicator','');

        $loadProgressButton=createButton('loadProgressButton','submitButton','handleLoadProgressButton','Load Progress');
        $loadProgressListoutput=createElement('p','loadProgressListoutput','outputArea','');
        $loadPanelContents=
        "
            $loadProgressHeader
            $currentProgressLabel$currentProgress 
            </br>
            $loadProgressButton
            $loadProgressListoutput
        ";
        $loadPanel=createElement('div','loadPanel','inputPanel',$loadPanelContents);

        $pageContents=
        "   
            $title
            $subHeading
            $scriptLink
            $buttonArea
            $numberStackContainer
            $explanationIndicator
            $loadPanel
        ";

        $pageContainer=createElement('div','progressPageContainer','pageContainer',$pageContents);
        echo $pageContainer;
?>