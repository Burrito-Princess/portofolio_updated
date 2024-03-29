<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maaslanden - dev-ross.com</title>
</head>
<body>

<?php

include "db.php";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }
  $data[0] = 0;
  $sql = "SELECT * FROM game_" . intval($_GET['game']) . " WHERE city_id = " . intval($_GET['city']);
  $stmt = $conn->prepare($sql); 
  $stmt->execute();
  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $stmt = $conn->prepare("SELECT * FROM game_keys WHERE game = " . intval($_GET['game']));
  $stmt->execute();
  $result_key = $stmt->fetch(PDO::FETCH_ASSOC);
  if (intval($_GET['key']) == $result_key['game_key']) { 
    if(isset($data[0])) {// if the city exists
      echo "entry Already in Exists<br>";
      $stmt = $conn->prepare("SELECT * FROM game_" . intval($_GET['game']) . " WHERE city_id = " . intval($_GET['city']));
      $stmt->execute();
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      echo "<pre>"; print_r($result);
    }
  
    else
    {
      $sql = "SELECT * FROM game_variables WHERE game_id =" . intval($_GET['game']) . " AND kind = 'city'";
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      // echo "<pre>"; print_r($result);
      $typerandom = rand(0, count($result) - 1);
      $type = $result[$typerandom]["variable"];
      echo $type . "<br>";
      if ($type == "capital"){
          $stmt = $conn->prepare("DELETE FROM game_variables WHERE variable = 'capital' AND game_id = " . intval($_GET['game']));
          $stmt->execute();
      }
  
      $sql = "SELECT * FROM game_variables WHERE game_id =" . intval($_GET['game']) . " AND kind = 'city_name'";
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      // echo "<pre>"; print_r($result);
      $namerandom = rand(0, count($result) - 1);
      $name = $result[$namerandom]["variable"];
      echo $name . "<br>";
      
      
      $sql = "SELECT * FROM game_variables WHERE game_id =" . intval($_GET['game']) . " AND kind = 'industry'";
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      // echo "<pre>"; print_r($result);
      $industryrandom = rand(0, count($result) - 1);
      $industry = $result[$industryrandom]["variable"];
      echo $industry . "<br>";
      switch ($type){
        case "village":
          $initial_pop = rand(1000, 20000);
          break;
        case "town":
          $initial_pop = rand(10000, 50000);
          break;
        case "city":
          $initial_pop = rand(50000, 200000);
          break;
        case "capital":
          $initial_pop = rand(100000, 500000);
      }
      
      echo $initial_pop . "<br>";
      $current_pop = $initial_pop;
      $city_id = intval($_GET['city']);
      echo $city_id;
      
    echo "<form action='' method='POST'>";
    echo "<select name='player'>";
    echo "<option value='1'>Player 1</option>";
    echo "<option value='2'>Player 2</option>";
    echo "<option value='3'>Player 3</option>";
    echo "<option value='4'>Player 4</option>";
    echo "</select>";
    echo "<input type='submit' value='Submit'>";

    if (isset($_POST['player'])){
      $player = $_POST['player'];
      $player_id = $player;
      $sql = "INSERT INTO game_" . intval($_GET['game']) . "(type, name, industry, initial_pop, current_pop, city_id, player_id) VALUES ('$type', '$name', '$industry', '$initial_pop', '$current_pop', '$city_id', '$player_id')";
  
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt = $conn->prepare("DELETE FROM game_variables WHERE variable = '$name' AND game_id = " . intval($_GET['game']));
      $stmt->execute();
    }

    
    
    
    }
    
  } else {
    echo "key incorrect<br>";
    exit();
  }
?>
  </body>
</html>
 

    