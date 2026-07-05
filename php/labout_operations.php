<?php 
function fetchDataAndMetadata($chapter)
{
    $outputMessage='fetch metadataAndData operations succeeded for chapter '.$chapter;
    include 'db_connect.php';
    $metadataArray=[];
    $dataArray=[];

    $stmt=$conn->prepare("select * from chapterlabmeta where chapter=?");
    $stmt->bind_param("i",$chapter);
    if ($stmt->execute())
        {
            $result=$stmt->get_result();
            while($row=$result->fetch_assoc())
                {
                    
                    $chapterTitle=$row["chaptertitle"];
                    $labIntro=$row["labintro"];
                    $unitArray=['chapter'=>$chapter,'chapterTitle'=>$chapterTitle,'labIntro'=>$labIntro];
                    array_push($metadataArray,$unitArray);
                }
        }
        else 
            {
                $outputMessage='Error fetching data';
                return $outputMessage;
            }
    
    $stmt=$conn->prepare("select * from chapterlabsteps where chapter=?");
    $stmt->bind_param("i",$chapter);
    if ($stmt->execute())
        {
            $result=$stmt->get_result();
            while ($row=$result->fetch_assoc())
                {
                    $stepNumber=$row["stepnumber"];
                    $stepText=$row["steptext"];
                    $unitArray=['stepNumber'=>$stepNumber,'stepText'=>$stepText];
                    array_push($dataArray,$unitArray);
                }
        }
         else 
            {
                $outputMessage='Error fetching data';
                return $outputMessage;
            }
    return $outputPackage=['data'=>$dataArray,'metaData'=>$metadataArray];    
}

?>