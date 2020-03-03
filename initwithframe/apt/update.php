<?php

require_once('PackageParser.php');

system("rm Packages Packages.bz2");

$dpkg = shell_exec("dpkg-scanpackages -m .");
$dpkg = explode("\n", $dpkg);

$parser = new PackageParser($dpkg);
$parser->writeModifiedFile();

system("bzip2 -k Packages");