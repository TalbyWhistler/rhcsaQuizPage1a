<?php 
        include 'leaderboard_operations.php';
        $rawInput=file_get_contents('php://input');
        $jsonInput=json_decode($rawInput,true);
        $function=$jsonInput["function"];
        $outputMessage="No leaderboard function selected";
        switch($function)
        {
            case("writeToLeaderboard"):
            {
                 $params=$jsonInput["params"];
                 $chapter=$params["chapter"];
                 $code=$params["eventCode"];
                 $figure=$params["figure"];
                 $score=$params["score"];
                 $outof=$params["outof"];
                 $outputMessage="Leaderboard is working chapter $chapter code $code figure  $figure score  $score outof $outof";
                 $outputMessage=writeToLeaderboard($chapter,$figure,$code,$score,$outof);
                 break;
            }
           
        }




        echo json_encode($outputMessage);

?>