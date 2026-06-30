<?php 
    //include 'knowalready_db_operations.php';
    include 'quiz_time_db_operations.php';
    $input=file_get_contents('php://input');
    $jsonInput=json_decode($input,true);
    $inputFunction=$jsonInput["function"];
    $outputMessage='';
    switch($inputFunction)
        {
            case("Testo"):
                {
                    $outputMessage='Testo testo';
                    break;
                }
            case("fetchQuizQuestion"):
                {
                    $params=$jsonInput["params"];
                    $chapter=$params["chapter"];
                    $question=$params["question"];
                    $outputMessage=fetchQuizQuestion($chapter,$question);
                  //  $outputMessage='Fetch quiz questions control '.$chapter.' '.$question;
                  break;
                }
            case("fetchQuizAnswer"):
                {
                   
                    $params=$jsonInput["params"];
                    //$answer=$jsonInput["answer"];
                    $chapter=$params["chapter"];
                    $questionNumber=$params["questionNumber"];
                    $choice=$params["choice"];
                  //  $outputMEssage=$chapter.$questionNumber.$choice;
                    $outputMessage=fetchQuizAnswer($chapter,$questionNumber,$choice);
                    break;
                }
        }
        
    echo json_encode($outputMessage);

?>