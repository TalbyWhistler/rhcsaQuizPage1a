<?php 
    /*
    create table leaderboard(
    chapter int,
    figuretitle varchar(20),
    code varchar(2),
    score int,
    outof int
    
    );

    */


    function writeToLeaderboard($chapter,$figureTitle,$code,$score,$outOf)
    {
        include 'db_connect.php';
        $timeStamp=time();
        $date=date('Y-m-d');
        $time=date('H:i:s');
        $ip=getenv("REMOTE_ADDR");
        $outputMessage='nothing';

        /*
        $outputMessage=
        "
            $date
            $time
            $ip
        ";
        
        $outputMessage=
        "INSERT INTO leaderboard(chapter,figuretitle,code,score,outof,ip,dateof,timeof) values($chapter,$figureTitle,$code,$score,$outOf,$ip,$date,$time)";
        
        */
        $stmt=$conn->prepare("INSERT INTO leaderboard(chapter,figuretitle,code,score,outof,ip,dateof,timeof) values(?,?,?,?,?,?,?,?)");
        
        $stmt->bind_param("issiisss",$chapter,$figureTitle,$code,$score,$outOf,$ip,$date,$time);
        if ($stmt->execute())
            {
                $outputMessage="Leaderboard updated";
            }
            else 
                {
                    $outputMessage="Error updating leaderboard";
                }
        
        return $outputMessage;
    }
?> 