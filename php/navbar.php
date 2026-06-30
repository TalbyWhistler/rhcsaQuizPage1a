<?php
    //include 'tools.php';
    $knowBeforeOption=createElement("div","knowBeforeOption","navButton","Do I know this already?");
    $reviewQuestionOption=createElement("div","reviewQuizOption","navButton","Chapter Review Quizzes");
   // $reviewQuestionOption=createElement('div','reviewButton','navButton','Chapter Review Questions');
    $exerciseOption=createElement('div','exerciseButton','navButton',"Run Exercises");
    $memoryOption=createElement('div','tableButton','navButton','Memory Table Quizzes');
    $welcome=createElement('div','welcomeButton','navButton','Welcome');
    $navRowContents=
    "
     <a href='index.php'>$welcome</a>
      <a href='memory_quiz.php'>$knowBeforeOption</a>
      <a href='review_quiz.php'>$reviewQuestionOption</a> 
      <a href='run_exercise.php'>$exerciseOption</a>
      <a href='table_quiz.php'>$memoryOption</a>
    ";
    $navRow=createElement("div","navRow","row",$navRowContents);
    echo $navRow;
?>