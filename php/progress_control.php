<?php 
        include 'progress_operations.php';
        $rawInput=file_get_contents('php://input');
        $jsonInput=json_decode($rawInput,true);
        $function=$jsonInput["function"];
        $outputMessage="No case activated in progress control";
        switch($function)
        {
            case("testo"):
                {
                    $outputMessage="Progress control is working";
                    break;
                }
            case("fetchActivity"):
                {
                    $outputMessage="Fetch activity control is working";
                    $outputMessage=fetchActivity();

                    //$outputMessage=fetchActivityTest();
                    break;
                }
            case("fetchCompletion"):
                {
                    $outputMessage="Fetch exposure control is working";
                    $outputMessage=fetchCompletion();
                    break;
                }
            case("fetchExposure"):
                {
                    $outputMessage="Fetch exposure is working";
                    $outputMessage=fetchExposure();
                    break;
                }
            case("fetchScores"):
                {
                    $outputMessage="Fetch scores is working";
                    $outputMessage=fetchScores();
                    break;
                }
            case("fetchCurrentAccount"):
                {
                    $outputMessage="Fetch current account control is working";
                    $outputMessage=fetchCurrentAccount();
                    break;
                }
        }
        echo json_encode($outputMessage);
?>