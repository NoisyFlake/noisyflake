<?php

class PackageParser {

	private $products;

	function __construct($input) {
		$this->parseInput($input);
	}

	public function getProducts() {
		return $this->products;
	}

	private function parseInput($lines) {
		$this->products = [new stdClass()];
		$i = 0;

		foreach ($lines as $line) {
			if (empty($line)) {
				$i++;
				$this->products[$i] = new stdClass();
				continue;
			}

			$line = explode(": ", $line);
			$this->products[$i]->{$line[0]} = $line[1];
		}
	}

	function writeModifiedFile() {
		$outputFile = "";
		foreach ($this->products as $index => $product) {
			if (!isset($product->Package)) {
				unset($this->products[$index]);
				continue;
			}

			$product->Filename = sprintf("get/%s/%s", $product->Package, $product->Version);

			if (true) {
				$product->Depiction = sprintf("https://repo.packix.com/package/%s", $product->Package);
				$product->SileoDepiction = sprintf("https://repo.packix.com/api/sileo/package/%s/depiction", $product->Package);
				$product->Tag = "cydia::commercial";
			}

			foreach ($product as $key => $value) {
				$outputFile .= sprintf("%s: %s\n", $key, $value);
			}
			$outputFile .= "\n";
		}

		file_put_contents("Packages", $outputFile);
	}
}