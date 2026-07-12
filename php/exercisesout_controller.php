<?php 
        include 'exercisesout_operations.php';
        $rawInput=file_get_contents('php://input');
        $jsonInput=json_decode($rawInput,true);
        $inputFunction=$jsonInput["function"];
        $outputMessage='No function was activated';
        
        switch($inputFunction)
        {
            case("testo"):
                {
                    $outputMessage='testo fired control is working';
                    break;
                }
            case("fetchRecords"):
                {
                   
                    $outputMessage='Fetch records is working';
                    $outputMessage=fetchRecordsList();
                    break;
                }
            case("getData"):
                {
                    $params=$jsonInput["params"];
                    $figure=$params["figure"];
                    $outputMessage="Get data has fired ".$figure;
                    $outputMessage=getData($figure);
                    break;
                }
            case("fetchRecordsPerChapter"):
                {
                    $params=$jsonInput["params"];
                    $chapter=$params["chapter"];
                    $outputMessage="Fetch records per chapter control is working".$chapter;
                    $outputMessage=fetchRecordsPerChapter($chapter);
                    break;
                }
        }
    

    echo json_encode($outputMessage);

?>