<?php

$db = new SQLite3('reservations.db');
$db->exec('CREATE TABLE IF NOT EXISTS reservations (day TEXT, party NUMERIC)');

if ($_GET['list']) {
    $res = $db->query('SELECT * FROM reservations');
    $reservedDays = array();
    while ($row = $res->fetchArray()) {
        $reservedDays[] = $row['day'];
    }
    return json_encode($reservedDays);
}
if ($_POST['day']) {
    $stmt = $db->prepare('INSERT INTO reservations (day) VALUES (:day)');
    $stmt->bindValue(':day', $_POST['day'], SQLITE3_TEXT);
    $stmt->execute();
    return 200;
}