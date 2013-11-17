<?php

  $homepage = "http://cors.io/spreadsheets.google.com/feeds/list/0AtRRMrLcXAG0dHRraHVZRTdOZU4zQ0NiQUhaM1VpSGc/od6/public/values?alt=json";
  echo file_get_contents($homepage,false);

?>