<?php 

function fetchQa($chapter)
    {
        include 'db_connect.php';
        $questionsArray=[];
        $answersArray=[];
        $stmt=$conn->prepare("select * from reviewquestions where chapter=? order by questionNo asc");
        $stmt->bind_param("i",$chapter);
        if ($stmt->execute())
            {
                $result=$stmt->get_result();
                while($row=$result->fetch_assoc())
                    {
                        
                        $questionNo=$row["questionNo"];
                        $questionText=$row["questionText"];
                        $unitArray=['chapter'=>$chapter,'questionNo'=>$questionNo,'questionText'=>$questionText];
                        array_push($questionsArray,$unitArray);
                    }
            }
        
        $stmt=$conn->prepare("select * from reviewanswers where chapter=? order by questionNo asc");
        $stmt->bind_param("i",$chapter);
        if ($stmt->execute())
            {
                $result=$stmt->get_result();
                while($row=$result->fetch_assoc())
                    {
                        $questionNo=$row["questionNo"];
                        $answerText=$row["answerText"];
                        $unitArray=['chapter'=>$chapter,'questionNo'=>$questionNo,'answerText'=>$answerText];
                        array_push($answersArray,$unitArray);
                    }
                
                $outputPackage=["questions"=>$questionsArray,"answers"=>$answersArray];
                return $outputPackage;
            }
        return false;
    }

?>