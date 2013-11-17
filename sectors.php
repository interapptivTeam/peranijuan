<?php

if(!empty($_GET["sector"])) {
  $sector = $_GET["sector"];

  //Pera ni Juan Auto Appro Summary
  //https://docs.google.com/spreadsheet/pub?key=0AtRRMrLcXAG0dHczNnA2YzhiTHVXbVpBa2haakYyS1E&output=html
  $homepageAuto = "http://cors.io/spreadsheets.google.com/feeds/list/0AtRRMrLcXAG0dHczNnA2YzhiTHVXbVpBa2haakYyS1E/".$sector."/public/values?alt=json";

  //Pera ni Juan New Appro Summary 
  //https://docs.google.com/spreadsheet/pub?key=0AtRRMrLcXAG0dDhvOGxORDhWNDBIczcxelVBQlVGckE&output=html
  $homepageNew = "http://cors.io/spreadsheets.google.com/feeds/list/0AtRRMrLcXAG0dDhvOGxORDhWNDBIczcxelVBQlVGckE/".$sector."/public/values?alt=json";
  
  $homepageAuto = json_decode(file_get_contents($homepageAuto));
  $homepageNew = json_decode(file_get_contents($homepageNew));

  $approArray = array(
    "autoAppro" => $homepageAuto,
    "newAppro" => $homepageNew
	);

header('Content-type: application/json'); 
  echo json_encode($approArray);
  
}

?>