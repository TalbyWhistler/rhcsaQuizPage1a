<?php 
            include_once 'labout_operations.php';
            $rawInput=file_get_contents('php://input');
            $jsonInput=json_decode($rawInput,true);
            $function=$jsonInput["function"];
            $outputMessage="No function activated in labout_controller";
            switch($function)
            {
                case("testo"):
                    {
                        $outputMessage="labout_controller is working";
                        break;
                    }
            
                case("fetchDataAndMetadata"):
                    {
                        $params=$jsonInput["params"];
                        $chapter=$params["chapter"];
                        $outputMessage="fdam in the controller is working chapter".$chapter;
                        $outputMessage=fetchDataAndMetadata($chapter);
                        break;
                    }
            }
            echo json_encode($outputMessage);

?>