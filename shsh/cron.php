<?php
	define('PATH', '/var/www/html/shsh/');

	$newBlobsSaved = array();
	$devices = array();

	$devices[] = [
		'identifier' => 'iPhone10,5',
		'ecid' => '8511139731406894',
		'board' => 'd211ap'
	];
	$devices[] = [
		'identifier' => 'iPad5,3',
		'ecid' => '8484936479828006',
		'board' => 'j81ap'
	];

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, 'https://api.ipsw.me/v2.1/firmwares.json/condensed');
	$result = curl_exec($ch);
	curl_close($ch);
	$data = json_decode($result, true);


	for ($i = 0; $i < count($devices); $i++) {
		$identifier = $devices[$i]['identifier'];
		$ecid = $devices[$i]['ecid'];
		$board = $devices[$i]['board'];

		$firmwares = $data['devices'][$identifier]['firmwares'];

		$newBlobsSaved[$identifier] = array();

		$signed = array();
		for($y = 0; $y < count($firmwares); $y++) {
			$current = $firmwares[$y];
			if($current['signed'] == true) $signed[] = $current;
		}

		for($a = 0; $a < count($signed); $a++) {
			$currentFirmware = $signed[$a];

			echo $identifier . ' - ' . $currentFirmware['version'] . ': ';

			$savePath = 'blobs/' . $identifier . '/';

			$filename = $ecid . '_' . $identifier . '_' . $board . '_' . $currentFirmware['version'] . '-';
			$fileList = glob(PATH . $savePath . $filename . '*.shsh2');

			if (!empty($fileList)) {
				echo "already saved. <br>";
				continue;
			}

			$cmd = PATH . "tsschecker/tsschecker_linux";
			$cmd .= " -d ".escapeshellarg($identifier);
			$cmd .= " -e ".escapeshellarg($ecid);
			$cmd .= " --boardconfig ".escapeshellarg($board);
			$cmd .= " -i ".escapeshellarg($currentFirmware['version']);
			$cmd .= " --buildid ".escapeshellarg($currentFirmware['buildid']);
			$cmd .= " -s -b ";
			$cmd .= "--save-path ". escapeshellarg(PATH . $savePath);
			// echo $cmd;
			$output = shell_exec($cmd);
			echo "<strong>saved!</strong><br>";

			$newBlobsSaved[$identifier][] = $currentFirmware['version'];

	}

	echo "<br>";

}

$sendMail = false;
$message = "The following blobs have been saved: \n\n";

foreach ($newBlobsSaved as $device => $versions) {
	if (!empty($versions)) $sendMail = true;

	foreach ($versions as $version) {
		$message .= $device . ': ' . $version . "\n";
	}
	$message .= "\n";
}

$to      = 'joelpoick@me.com';
$subject = 'New SHSH blobs saved';
$headers = 'From: shsh@noisyflake.com' . "\r\n" .
    'Reply-To: shsh@noisyflake.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if ($sendMail) mail($to, $subject, $message, $headers);
