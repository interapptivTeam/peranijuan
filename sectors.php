<?php

if(!empty($_GET["sector"])) {
  $sector = $_GET["sector"];

  $homepage = "http://cors.io/spreadsheets.google.com/feeds/list/0AtRRMrLcXAG0dHczNnA2YzhiTHVXbVpBa2haakYyS1E/".$sector."/public/values?alt=json";
  echo file_get_contents($homepage,false);
  
}
  // $homepage = "https://spreadsheets.google.com/tq?key=0AtRRMrLcXAG0dHczNnA2YzhiTHVXbVpBa2haakYyS1E&tq=select%20A%2CB%2CC%2CD&gid=".$sector;
// $sheetkey = "0AgauRw-zlp7fdFZSN3dBUzVpV04yU05HVVZ5SVBJVmc";
// $querystr = "select+A%2c+D+order+by+A";
// $homepage = "http://spreadsheets.google.com/a/google.com/tq?key=".$sheetkey."&tq=".$querystr;

// $json = file_get_contents($homepage,FALSE);
// $start = stripos($json, '"rows":');
// $end = strripos($json, ");");

// $finalJSON = substr($json, $start, -3);
// $finalJSON = "{" . $finalJSON;

//   echo $finalJSON;
?>