<?php 
        include_once 'record_operations.php';
        $rawInput=file_get_contents('php://input');
        $jsonInput=json_decode($rawInput,true);
        $function=$jsonInput["function"];
        $outputMessage="No function activated in record_operations";
        switch($function)
        {
            case("testo"):
                {
                    $outputMessage="record controller is working";
                    break;
                }
            case("fetchRecord"):
                {
                    $outputMessage=fetchRecord();
                    //$outputMessage='fetch record controller';
                    break;
                }
            case("checkForIp"):
                {
                    $params=$jsonInput["params"];
                    $inputAddress=$params["inputAddress"];
                    $outputMessage=checkForIp($inputAddress);
                    break;
                }
            case("transferProgress"):
                {
                    $params=$jsonInput["params"];
                    $inputAddress=$params["inputAddress"];
                    if(transferProgress($inputAddress))
                        {
                            $outputMessage="Progress transfered";
                        }
                    else 
                        {
                            $outputMessage="Error transferring progress";
                        }
                    break;
                }
            case("fetchIpAddress"):
                {
                    
                    $outputMessage=fetchIpAddress();
                    break;
                }
        }

        echo json_encode($outputMessage);

?>