<?php 

function fetchRecordsList()
{
    include 'db_connect.php';
    $stmt=$conn->prepare("select figure,title from exercisesmeta order by figure asc");
    $stmt->execute();
    $result=$stmt->get_result();
    $outputArray=[];
    if ($result)
        {
            while($row=$result->fetch_assoc())
                {
                    $figure=$row["figure"];
                    $title=$row["title"];
                    $unitArray=['figure'=>$figure,'title'=>$title];
                    array_push($outputArray,$unitArray);
                }
            return $outputArray;
        }
    return $false;
}


function getData($figure)
{
    include 'db_connect.php';
    $stmt=$conn->prepare("select * from exercisesmeta where figure=?");
    $stmt->bind_param("s",$figure);
    $metadataArray=[];
    $dataArray=[];
    if ($stmt->execute())
        {
            $result=$stmt->get_result();
            if ($result)
                {
                    while($row=$result->fetch_assoc())
                        {
                            $figure=$row["figure"];
                            $title=$row["title"];
                            $description=$row["description"];
                            $pic=$row["optionalPicLocation"];
                            $unitArray=['figure'=>$figure,'title'=>$title,'description'=>$description,'optionalPicLocation'=>$pic];
                            array_push($metadataArray,$unitArray);
                        }
                }
        }   


    $stmt=$conn->prepare("select * from exercises where figure=? order by stepnumber asc");
    $stmt->bind_param("s",$figure);
    if ($stmt->execute())
        {
            $result=$stmt->get_result();
            if ($result)
                {
                    while($row=$result->fetch_assoc())
                        {
                            $figure=$row["figure"];
                            $stepNumber=$row["stepnumber"];
                            $stepText=$row["steptext"];
                            $unitArray=['figure'=>$figure,'stepNumber'=>$stepNumber,'stepText'=>$stepText];
                            array_push($dataArray,$unitArray);
                        }
                }
            $outputPackage=['metaData'=>$metadataArray,'data'=>$dataArray];
            return $outputPackage;
        }
    return false;
}


function fetchRecordsPerChapter($chapter)
{
    include 'db_connect.php';
    $stmt=$conn->prepare("select *,substring(figure,1,1) as chapter from exercisesmeta where substring(figure,1,1)=? order by figure asc");
    $stmt->bind_param("i",$chapter);
    $outputArray=[];
    if ($stmt->execute())
        {
            $result=$stmt->get_result();
            while($row=$result->fetch_assoc())
                {
                    $figure=$row["figure"];
                    $title=$row["title"];
                    $unitArray=['figure'=>$figure,'title'=>$title];   
                    array_push($outputArray,$unitArray);
                }
        }
        else 
            {
                return 'Error fetching records';
            }
    return $outputArray;
}

?>