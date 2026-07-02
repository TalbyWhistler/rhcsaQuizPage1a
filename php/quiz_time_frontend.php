<?php 
    
    function ce($element,$id,$class,$inner)
    {
        $elementString='';
        $elementString=$elementString.'<'.$element.' id="'.$id.'" class="'.$class.'"';
        $elementString=$elementString.'>';
        $elementString=$elementString.$inner;
        $elementString=$elementString.'</'.$element.'>';
        return $elementString;
    }

function ci($id,$class)
    {
        $elementString='';
        $elementString=$elementString.'<input id="'.$id.'" class="'.$class.'"';
        $elementString=$elementString.'/>';
       // $elementString=$elementString.$inner;
    //    $elementString=$elementString.'</'.$element.'>';
        return $elementString;
    }

function cb($id,$class,$function,$inner)
    {
        $elementString='';
        $elementString=$elementString
            .'<button id='.$id.' class='.$class.' onclick="'.$function.'()">'
            .$inner 
            .'</button>';
        return $elementString;
    }

    $script='<script src="js/quiztime_scripts.js"></script>';
    $chapterChoice='<input type="number" id="quizTimeChapterChoice" class="panelControl"/>';
    $chapterChoiceLabel=ce('label','chapterChoiceLabel','label','Chapters');
    $br='</br>';
    $takeQuizButton=cb("takeQuizButton","panelButton",'handleTakeQuizButton',"Take Quiz!");
    $takeQuizStatusIndicator=ce('p',"takeQuizStatusIndicator","statusIndicator","Ready");
    $statusIndicatorBox=ce('div','takeQuizStatusIndicatorBox','statusIndicatorBox',$takeQuizStatusIndicator);
    
    $chapterButtons='';
    for($i=1;$i<=24;$i++)
        {
            $chapterButtons=$chapterButtons.
            "
                <button id='chapterButton$i' class='chapterButton' onclick='kaChapterChoice($i)'>$i</button>
            ";
        };

    $chapterIndicator=createElement("label","chapterIndicator","statusIndicator",'None');
    $chapterIndicatorLabel=createElement("label","chapterIndicatorLabel","label","Current Chapter:");

        /*
    $choiceBoxContents=''
        .$chapterChoice 
        .$chapterChoiceLabel 
        .$br
        .$takeQuizButton
        .$br
        .$statusIndicatorBox;
    */
    $choiceBoxContents=
    "
        $chapterChoiceLabel
        $chapterButtons
        $br
        $chapterIndicatorLabel$chapterIndicator
        $br
        $takeQuizButton
        $statusIndicatorBox
    ";
    
    

    $chapterChoiceBox=ce('div','chapterChoiceBox','panelBox',$choiceBoxContents);
    $title=ce('h1','quizTimeTitle','title','Do you know this already?');
    $quizOutput=ce('p','quizOutputArea','outputArea','');
    $answerOutput=ce('p','answerOutputArea','outputArea','');
    $pageContents=''
            .$title
            .$chapterChoiceBox
            .$quizOutput
            .$answerOutput
            .$script;
    $page=ce("div","quizTimePage","page",$pageContents);
    echo $page;
?>