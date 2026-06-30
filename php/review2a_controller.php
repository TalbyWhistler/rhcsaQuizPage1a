<?php 
        include 'review2a_operations.php';
        $rawInput=file_get_contents('php://input');
        $jsonInput=json_decode($rawInput,true);
        $function=$jsonInput["function"];
        $outputMessage="No function was activated in the controller";
        switch($function)
        {
                case("testo"):
                    {
                        $outputMessage="Review Questions controller is working";
                        break;
                    }
                case("fetchQa"):
                    {
                        $outputMessage="Fetchqa is working";
                        $params=$jsonInput["params"];
                        $chapter=$params["chapter"];
                        $outputMessage=fetchQa($chapter);
                        break;
                    }
        }


        echo json_encode($outputMessage);

?>