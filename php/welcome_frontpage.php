<?php 
            include_once 'tools.php';
        $subtitle=createElement('h2','welcomeSubtitle','subtitle','RHCSA Quiz and Study Page');
        $openBlurb=createElement('p','openBlurb','blurb',
        "
            Are you interested in a) becoming better at Linux? b) Studying for your Red Hat certs?  c) both of the above?   This page contains a number of quizzes, tests and labs that might help you with that!   
            Some of them are autograded and others on the 'honour system' but regardless, a fun way to learn more and get really comfortable with the material.
        ");
        $already=createElement('strong','kaHeading','heading','Do I know this already?');
        $alreadyText=createElement('p','kaBlurb','blurb',
        "
            Each chapter of RHCSA cert guide opens with a quiz to see if you 'know this already', these quizzes are multiple choice.
        ");
        $review=createElement('strong','crHeading','heading','Chapter Review');
        $reviewBlurb=createElement('p','crBlurb','blurb',
        "
            Each chapter also has 10 questions to review the material, these are not multiple choice but write-in answers.
        ");
        $exercises=createElement('strong','reHeading','heading','Run Exercises');
        $exercisesBlurb=createElement('p','exercisesBlurb','blurb',
        "
            Each chapter has several exercises and these will be labeled and presented to the user step by step.
        ");
        $table=createElement('strong','mtHeading','heading','Memory Table Quizzes');
        $tableBlurb=createElement('p','teBlurb','blurb',
        "
            Each chapter of the cert guide contains several memory tables.   These have been mixed up and the quizzes are based on you selecting the correct matching entries.
        ");

        $scriptLink="<script src='js/welcomeScripts.js'></script>";
        $pageContents=
        "
            $subtitle 
            $scriptLink
            $openBlurb
            $already 
            $alreadyText 
            $review 
            $reviewBlurb 
            $exercises 
            $exercisesBlurb 
            $table 
            $tableBlurb
        ";

        $pageContainer=createElement('div','welcomePageContainer','pageContainer',$pageContents);
        echo $pageContainer;
?> 