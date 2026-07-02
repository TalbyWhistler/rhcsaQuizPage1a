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
                    $choice2='';
                    if (strlen($choice)>1)
                        {
                            $choice=substr($params["choice"],0,1);
                            $choice2=substr($params["choice"],1,1);
                        }
                    else 
                        {
                             $choice=$params["choice"];
                             $choice2='';
                        }
                  //  $outputMEssage=$chapter.$questionNumber.$choice;
                    $outputMessage=fetchQuizAnswer($chapter,$questionNumber,$choice,$choice2);
                    break;
                }
            case("queryForTwo"):
                {
                    $params=$jsonInput["params"];
                    $chapter=$params["chapter"];
                    $questionNumber=$params["questionNumber"];
                    $outputMessage=queryForTwo($chapter,$questionNumber);
                  //  $outputMessage="QUERY FOR TWO CONTROLLER";
                    break;
                }
        }
        
    echo json_encode($outputMessage);

?>