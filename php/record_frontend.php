<?php 
        include_once 'tools.php';
        $title=createElement('h2','recordTitle','subtitle','Activity Record');
        $subheading=createElement('p','recordSubheading','subHeading',
        "
            These are all of the activities that you've completed today on the site based on your source ip address.   If you're not on your usual device, you can enter your home IP address below and transfer your progress there.
        ");
        $scriptLink="<script src='js/recordScripts.js'></script>";
        //$recordOutputbox="<textarea id='recordOutputbox' class='outputArea' rows='40' cols='60'></textarea>";
        $recordOutputArea=createElement('p','recordOutputArea','outputArea','');

        $transferHeader=createElement('strong','transferHeader','panelHeader','Progress Transfer');
        $ipInput=createInput('ipInput','input');
        $ipInputButton=createButton('ipInputButton','submitButton','handleIpInputButton','Submit IP Address');
        $ipStatusIndicator=createElement('p','ipStatusIndicator','statusIndicator','Ready');
        $explano=createElement('p','explanation','explanation',
        "
            If you know your home (or usual) IP address and would like to transfer today's progress (above) to your home progress you can enter your home ip address here.
        ");

        $confirmOutput=createElement('p','confirmOutput','outputArea','');
        $ipLabelOut=createElement('label','ipLabelOut','statusIndicator','');
        $ipLabel=createElement('label','ipLabelLabel','statusIndicatorLabel','Current IP address (as far as we know) - ');

        $transferPanelContents=
        "
            $transferHeader
            </br>
            $ipLabel$ipLabelOut
            </br> 
           
            
        ";        
        $transferPanel=createElement('div','transferPanel','inputPanel',$transferPanelContents);
        $progressListOut=createElement('p','progressListOut','outputArea','');
        $uploadProgressBlurb=createElement('label','uploadProgressBlurb','label',
        "
            You can upload any progress from today at your current IP address to your 'main account', which will be the IP address numbers and date of your first record activity.   
        ");
        $uploadProgressButton=createButton('uploadProgressButton','submitButton','handleUploadProgressButton','Upload Daily Progress');
        $uploadProgressIndicator=createElement('p','uploadDailyIndicator','statusIndicator','Ready');
        $uploadConfirm=createElement('p','uploadConfirmOut','outputArea','');


        $pageContainerContents=
        "   
            $title
            $subheading
            $recordOutputArea
            $scriptLink
            $transferPanel
            $confirmOutput
            $uploadProgressBlurb$uploadProgressButton
            $uploadProgressIndicator
            $progressListOut
            $uploadConfirm
            
        ";

        $pageContainer=createElement('div','recordPageContainer','pageContainer',$pageContainerContents);
        echo $pageContainer;

?>