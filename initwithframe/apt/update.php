<?php

echo "Removing Packages files... ";
system("rm Packages.bz2 ");
echo "Done!<br>";

// echo "Creating new Packages file... ";
// system("dpkg-scanpackages -m . /dev/null >Packages");
// echo "Done!<br>";

// $file = file("Packages");

// var_dump($file);

echo "Compressing new Packages file... ";
system("bzip2 -k Packages");
echo "Done!</br>";

?>