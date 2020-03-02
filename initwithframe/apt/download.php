<?php

$request = isset($_GET['request']) ? explode('_', $_GET['request']) : null;

if (count($request) !== 2) {
    header('HTTP/1.0 400 Bad Request');
    exit();
}

$bundleId = $request[0] ?? null;
$version = $request[1] ?? null;

if (empty($bundleId) || empty($version)) {
    header('HTTP/1.0 400 Bad Request');
    exit();
}

$bundleId = filter_var($bundleId, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$version = filter_var($version, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

$filename = sprintf('%s_%s_iphoneos-arm.deb', $bundleId, $version);
$path = 'debs/' . $filename;

if (!file_exists($path)) {
    header('HTTP/1.0 404 Not Found');
    exit();
}

$udid = $_SERVER['HTTP_X_UNIQUE_ID'] ?? null;
$device = $_SERVER['HTTP_X_MACHINE'] ?? null;

if (empty($udid) || empty($device)) {
    header('HTTP/1.0 412 Precondition Failed');
    exit();
}

$postdata = http_build_query(
    array(
        'udid' => $udid,
        'model' => $device,
        'identifier' => $bundleId,
        'token' => '194a8bef-6ac6-46ab-8e90-e42644150bae'
    )
);
$opts = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
    )
);
$context  = stream_context_create($opts);
$result = file_get_contents('https://repo.packix.com/api/drm/check', false, $context);

if (!$result) {
    header('HTTP/1.0 502 Bad Gateway');
    exit();
}

$packix = json_decode($result);
if ($packix->status !== "completed") {
    header('HTTP/1.0 402 Payment Required');
    exit();
}

$filesize = filesize($path);

header("Content-Type: application/x-debian-package");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Content-Length: $filesize");

readfile($path);
