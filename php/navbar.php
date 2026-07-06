<?php
    //include 'tools.php';
    $knowBeforeOption=createElement("div","knowBeforeOption","navButton","Do I know this already?");
    $reviewQuestionOption=createElement("div","reviewQuizOption","navButton","Chapter Review Quizzes");
   // $reviewQuestionOption=createElement('div','reviewButton','navButton','Chapter Review Questions');
    $exerciseOption=createElement('div','exerciseButton','navButton',"Run Exercises");
    $memoryOption=createElement('div','tableButton','navButton','Memory Table Quizzes');
    $welcome=createElement('div','welcomeButton','navButton','Welcome');
     $labOutOption=createElement('div','chapterLabButton','navButton','Chapter Labs');
     $recordOption=createElement('div','recordButton','navButton','Daily Record');
     $progressOption=createElement('div','progressButton','navButton','Progress');

    $navRowContents=
    "
     <a href='index.php'>$welcome</a>
      <a href='memory_quiz.php'>$knowBeforeOption</a>
      <a href='review_quiz.php'>$reviewQuestionOption</a> 
      <a href='run_exercise.php'>$exerciseOption</a>
      <a href='table_quiz.php'>$memoryOption</a>
      <a href='labOut.php'>$labOutOption</a>
      <a href='progress.php'>$progressOption</a>
      <a href='records.php'>$recordOption</a>
    ";
    $navRow=createElement("div","navRow","row",$navRowContents);
    echo $navRow;
?>