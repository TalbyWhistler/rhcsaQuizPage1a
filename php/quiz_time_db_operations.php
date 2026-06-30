<?php 

function fetchQuizQuestion($chapter,$questionNumber)
{
    include 'db_connect.php';
    $returnMessage='';
    $outputQuestions=[];
    $outputAnswers=[];
    $stmt=$conn->prepare('SELECT * FROM questions WHERE CHAPTER=? and QUESTIONNUMBER=?');
    $stmt->bind_param("ii",$chapter,$questionNumber);
    if ($stmt->execute())
        {
            //return 'the first statement has executed';
            $results=$stmt->get_result();
            while($row=$results->fetch_assoc())
                {
                    
                    $questionNumber=$row["questionNumber"];
                    $questionText=$row["questionText"];
                    $a=$row["a"];
                    $b=$row["b"];
                    $c=$row["c"];
                    $d=$row["d"];
                    $unitArray=['chapter'=>$chapter,'questionNumber'=>$questionNumber,'questionText'=>$questionText,'a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d];
                    array_push($outputQuestions,$unitArray);
                }
            $stmt=$conn->prepare("select * from answers where chapter=? and questionNumber=?");
            $stmt->bind_param("ii",$chapter,$questionNumber);
            
            if ($stmt->execute())
                {
                    $results=$stmt->get_result();
                    while($row=$results->fetch_assoc())
                        {
                            $questionNumber=$row["questionNumber"];
                            $answerLetter=$row["answerLetter"];
                            $answer=$row["answer"];
                            $unitArray=['questionNumber'=>$questionNumber,'answerLetter'=>$answerLetter,'answer'=>$answer];
                            array_push($outputAnswers,$unitArray);
                        }
                    return ['questions'=>$outputQuestions,'answers'=>$outputAnswers];
                }
                else 
                    {
                        return 'second command failed';
                    }

        }
        else 
            {
                return 'the first statement has failed';
            }
}

function fetchQuizAnswer($chapter,$questionNumber,$choice)
{
    include 'db_connect.php';
    $returnMessage='';
    $stmt=$conn->prepare("select answerLetter,answer from answers where chapter=? and questionNumber=?");
    $stmt->bind_param("ii",$chapter,$questionNumber);
    $outputArray=[];
    if ($stmt->execute())
        {
            $results=$stmt->get_result();
            while($row=$results->fetch_assoc())
                {
                    $answerLetter=$row["answerLetter"];
                    $answer=$row["answer"];
                    $unitArray=['chapter'=>$chapter,'questionNumber'=>$questionNumber,'answerLetter'=>$answerLetter,'choice'=>$choice,'answer'=>$answer];
                    array_push($outputArray,$unitArray);
                }
            return $outputArray;
        }
    
}

?>