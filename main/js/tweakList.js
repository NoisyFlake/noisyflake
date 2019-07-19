class TweakList {

	constructor() {
		this.json = null;

		let request = new XMLHttpRequest();
		request.open('GET', 'tweaks.json', true);

		request.onload = function(e) {
			if (request.status === 200)	this.json = JSON.parse(request.responseText);
			this.render();
		}.bind(this);

		request.send(null);
	}

	render() {
		let tweakList = document.getElementById('tweakList');

		if (this.json == null) {
			tweakList.innerHTML = 'Error: Unable to load tweak list';
			return;
		}

		this.json.tweaks.forEach(tweak => {
			let html = '<a href="https://repo.packix.com/package/' + tweak.package + '/"  title="Get it on Packix"><i class="orange cube icon"></i></a>';

			if (tweak.repo == null) {
				html += '<i class="yellow lock icon" title="Closed source"></i>'
			} else {
				html += '<a href="https://github.com/NoisyFlake/' + tweak.repo + '" title="View the Source Code"><i class="blue github icon"></i></a>';
			}

			html += ' <strong>' + tweak.name + '</strong>';
			html += (tweak.price ? (" - " + tweak.price) : '');
			html += '<br><span class="grey">' + tweak.description + '</span><br><br>';

			tweakList.innerHTML += html;
		});
	}
}

new TweakList();
