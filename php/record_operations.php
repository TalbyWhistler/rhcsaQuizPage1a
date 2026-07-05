<?php 

function fetchRecord()
{
    include 'db_connect.php';
    $ipAddr=$_SERVER["REMOTE_ADDR"]??'';
    $stmt=$conn->prepare("SELECT * FROM LEADERBOARD WHERE IP=? order by dateof,timeof asc");
    $stmt->bind_param("s",$ipAddr);
    $outputMessage='';
    $outputArray=[];
    if ($stmt->execute())
        {
            $result=$stmt->get_result();
            while($row=$result->fetch_assoc())
                {
                    $chapter=$row["chapter"];
                    $figuretitle=$row["figuretitle"];
                    $code=$row["code"];
                    $score=$row["score"];
                    $outof=$row["outof"];
                    $dateof=$row["dateof"];
                    $timeof=$row["timeof"];
                    $unitArray=['chapter'=>$chapter,'figuretitle'=>$figuretitle,'code'=>$code,'score'=>$score,'outof'=>$outof,'dateof'=>$dateof,'timeof'=>$timeof];
                    array_push($outputArray,$unitArray);
                }
            return $outputArray;
        }
        else 
            {
                $outputMessage="Error executing statement.";
            }
    return $outputMessage;
}



?>