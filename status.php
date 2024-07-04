<?php

$statusFor = $_GET['of'];

function getStatus($statusFor) {
    if ($statusFor == null || $statusFor !== ["toilet", "elevators", "vendingMachine"]) {
        echo "Please provide a status to get.";
        throw new Exception("Please provide a status to get.");
        return json_encode((object) ["error" => "Please provide a status to get."]);
    } else {
        try {
            $statusFile = fopen("status.json", "r") or die("Unable to open file!");
            $currentStatus = json_decode(fread($statusFile, filesize("status.json")));
            fclose($statusFile);
        } catch (error) {
            echo "An error has occured while reading the status file.";
            return "An error has occured while reading the status file.";
        }
        return $currentStatus->$statusFor;
    }
}
    