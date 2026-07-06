<?php 

function fetchActivity()
{
    include 'db_connect.php';
    $ip=$_SERVER["REMOTE_ADDR"];
    $outputMessage="Fetch activity operations is working $ip";

    $outputArray=[];
    for($i=1;$i<=25;$i++)
        {
            $stmt=$conn->prepare("select count(*) as total from leaderboard where ip=? and chapter=?");
            $stmt->bind_param("si",$ip,$i);
            $stmt->execute();
            $result=$stmt->get_result();
            while($row=$result->fetch_assoc())
                {
                    $chapterCount=$row["total"];
                    array_push($outputArray,$chapterCount*5);
                }
        }
    if ($outputArray)
        {
            return $outputArray;
        }
        else 
            {
                    return $outputMessage;
            }
}


function fetchActivityTest()
{
    $ip=$_SERVER["REMOTE_ADDR"];
    $outputArray=[];
    $valuesArray=[0,1,2,3,4,5,6,10,15,20,25,30,35,40,35,50,55,60,65,70,75,80,85,90,95,100];
    for($i=1;$i<=25;$i++)
        {
            array_push($outputArray,$valuesArray[$i]);
        }
    return $outputArray;
}


function fetchCompletion()
{
    include 'db_connect.php';
    $ip=$_SERVER["REMOTE_ADDR"];
    $outputArray=[];
    $codeArray=['mt','ka','rq','ex','cl'];
    for($i=1;$i<=25;$i++)
        {
            $chapterScore=0;
            for($j=0;$j<4;$j++)
                {
                    $code=$codeArray[$j];
                    $stmt=$conn->prepare("select count(*) as total from leaderboard where ip=? and chapter=? and code=?");
                    $stmt->bind_param("sis",$ip,$i,$codeArray[$j]);
                    $stmt->execute();
                    $result=$stmt->get_result();
                    while($row=$result->fetch_assoc())
                        {
                            $total=$row["total"];
                            if ($total>0)
                                {
                                    $chapterScore=$chapterScore+20;
                                }
                        }
                }
            array_push($outputArray,$chapterScore);
        }
    return $outputArray;
    //mt,ka,rq,ex,cl
}


function fetchExposure()
{
    include 'db_connect.php';
    $ip=$_SERVER["REMOTE_ADDR"];
    $outputArray=[];
    for($i=1;$i<=25;$i++)
        {
            $chapterScore=0;
            $stmt=$conn->prepare("select count(*) as total from leaderboard where ip=? and chapter=?");
            $stmt->bind_param("si",$ip,$i);
            $stmt->execute();
            $result=$stmt->get_result();
            while($row=$result->fetch_assoc())
                {
                    $total=$row["total"];
                    if ($total>0)
                        {
                             array_push($outputArray,100);
                        }
                    else 
                        {
                            array_push($outputArray,0);
                        }
                   
                }
        }
    return $outputArray;
}


function fetchScores()
{
    include 'db_connect.php';
    $ip=$_SERVER["REMOTE_ADDR"];
    $outputArray=[];
    for($i=1;$i<=25;$i++)
        {
            $chapterTally=0;
            $stmt=$conn->prepare("select avg(score/outof)*100 as 'avg' from leaderboard where chapter=?");
            $stmt->bind_param("i",$i);
            $stmt->execute();
            $result=$stmt->get_result();
            while($row=$result->fetch_assoc())
                {
                    $average=$row["avg"]?$row["avg"]:0;
                    array_push($outputArray,$average);

                }
        }
    return $outputArray;
}

?>