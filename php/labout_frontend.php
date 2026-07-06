<?php 
        include_once 'tools.php';
        $title=createElement('h2','labOutTitle','subtitle','End of Chapter Labs');
        $subHeading=createElement('p','labOutSubheading','subHeading',
        "
            Each of the chapters in the RHCSA certification study guide have a lab with steps to follow that relates to that chapter.   These labs are here and will be presented step by step.
        ");
        $scriptLink=
        "
            <script src='js/laboutScripts.js'></script>
        ";
       


        $buttons='';
        for($i=1;$i<=25;$i++)
            {
                $buttons=$buttons.
                "
                    <button id='chapterButton$i' class='chapterButton' onclick='handleChapterButton($i)'>$i</button>
                ";
            }

        $buttonArea=createElement('div','chapterButtonArea','buttonArea',$buttons);
        $chapterIndicator=createElement('label','chapterIndicator','indicator','None');
        $chapterIndicatorLabel=createElement('label','chapterIndicatorLabel','label','Chapter: ');

        $labHeaderOut=createElement('p','labHeaderOutputArea','outputArea','');
        $labOut=createElement('p','labStepsOutputArea','outputArea','');
        $nextButtonOut=createElement('p','nextButtonOutputArea','outputArea','');
        $endLabButtonOut=createElement('p','endLabButtonOut','outputArea','');
        $labBoxContents=
        "
            $labHeaderOut
            $labOut
            $nextButtonOut$endLabButtonOut
        ";
        $labBox=createElement('div','labBoxContainer','panelContainer',$labBoxContents);

         $pageContents=
        "
            $title
            $subHeading
            $buttonArea
            $chapterIndicatorLabel$chapterIndicator
            $labBoxContents
            $scriptLink
        ";
        $pageContainer=createElement('div','labOutPageContainer','pageContainer',$pageContents);


        echo $pageContainer;

?>