<?php 
        include_once 'tools.php';
        $title=createElement('h1','recordTitle','title','Activity Record');
        $subheading=createElement('p','recordSubheading','subHeading',
        "
            These are all of the activities that you've completed on the site based on your source ip address.
        ");
        $scriptLink="<script src='js/recordScripts.js'></script>";
        //$recordOutputbox="<textarea id='recordOutputbox' class='outputArea' rows='40' cols='60'></textarea>";
        $recordOutputArea=createElement('p','recordOutputArea','outputArea','');

        $pageContainerContents=
        "   
            $title
            $subheading
            $recordOutputArea
            $scriptLink
        ";

        $pageContainer=createElement('div','recordPageContainer','pageContainer',$pageContainerContents);
        echo $pageContainer;

?>