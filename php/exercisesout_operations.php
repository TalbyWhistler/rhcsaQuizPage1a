<?php 

function fetchRecordsList()
{
    include 'db_connect.php';
    $stmt=$conn->prepare("select figure,title from exercisesmeta");
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
    $stmt=$conn->prepare("select * from exercisesMeta where figure=?");
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

?>