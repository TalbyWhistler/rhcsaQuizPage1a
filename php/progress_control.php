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
            case("fetchOtherProgressList"):
                {
                    $outputMessage="Fetch other progress control is working";
                    $outputMessage=fetchOtherProgressList();
                    break;
                }
            case("getIpWithAccount"):
                {
                    $outputMessage="Get ip with account info control is working";
                    $params=$jsonInput["params"];
                    $account=$params["account"];
                    $outputMessage=getIpWithAccount($account);
                    break;
                }
            case("fetchActivityByIp"):
                {
                   
                    $params=$jsonInput["params"];
                    $ip=$params["ip"];
                    $outputMessage="fetch activity by ip is working";
                    $outputMessage=fetchActivityByIp($ip);
                    break;
                }
            case("fetchScoresByIp"):
                {
                    $params=$jsonInput["params"];
                    $ip=$params["ip"];
                    $outputMessage="fetch activity by ip is working";
                    $outputMessage=fetchScoresByIp($ip);
                    break;
                }
            case("fetchExposureByIp"):
                {
                     $params=$jsonInput["params"];
                    $ip=$params["ip"];
                    $outputMessage="fetch activity by ip is working";
                    $outputMessage=fetchExposureByIp($ip);
                    break;
                }
            case("fetchCompletionByIp"):
                {
                    $params=$jsonInput["params"];
                    $ip=$params["ip"];
                    $outputMessage="fetch activity by ip is working";
                    $outputMessage=fetchCompletionByIp($ip);
                    break;
                }
                ////////// must also complete exposure and completion by ip
        }
        echo json_encode($outputMessage);
?>