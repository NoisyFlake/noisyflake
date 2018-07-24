<?php

$current_count = file_get_contents('count.txt');
$f = fopen('count.txt', 'w+');
fwrite($f, $current_count + 1);
fclose($f);

// header("Location: dl/nsanepatcher-v1.0.0.zip");
$filename = "nsanepatcher-v1.0.2.zip";
header("Content-disposition: attachment; filename=".$filename."");
header('Content-type: application/zip');
header("Content-Length: " . filesize('dl/' . $file_url));
readfile("dl/" . $filename);
