
<!DOCTYPE html>
<html>
<head>
  <!-- Standard Meta -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <!-- Site Properties -->
  <title>N. Sane Patcher</title>
  <link rel="stylesheet" type="text/css" href="semantic.min.css">

  <style type="text/css">

    .hidden.menu {
      display: none;
    }

    .masthead.segment {
      min-height: 700px;
      padding: 1em 0em;
    }
    .masthead .logo.item img {
      margin-right: 1em;
    }
    .masthead .ui.menu .ui.button {
      margin-left: 0.5em;
    }
    .masthead h1.ui.header {
      margin-top: 3em;
      margin-bottom: 0em;
      font-size: 4em;
      font-weight: normal;
    }
    .masthead h2 {
      font-size: 1.7em;
      font-weight: normal;
    }

    .ui.vertical.stripe {
    	padding-top: 8em;
    }
    .ui.vertical.stripe h3 {
      font-size: 2em;
    }
    .ui.vertical.stripe .button + h3,
    .ui.vertical.stripe p + h3 {
      margin-top: 3em;
    }
    .ui.vertical.stripe .floated.image {
      clear: both;
    }
    .ui.vertical.stripe p {
      font-size: 1.33em;
    }
    .ui.vertical.stripe .horizontal.divider {
      margin: 3em 0em;
    }

    .quote.stripe.segment {
      padding: 0em;
    }
    .quote.stripe.segment .grid .column {
      padding-top: 5em;
      padding-bottom: 5em;
    }

    .footer.segment {
      padding: 5em 0em;
    }

    .secondary.pointing.menu .toc.item {
      display: none;
    }

    @media only screen and (max-width: 700px) {
      .ui.fixed.menu {
        display: none !important;
      }
      .secondary.pointing.menu .item,
      .secondary.pointing.menu .menu {
        display: none;
      }
      .secondary.pointing.menu .toc.item {
        display: block;
      }
      .masthead.segment {
        min-height: 350px;
      }
      .masthead h1.ui.header {
        font-size: 2em;
        margin-top: 1.5em;
      }
      .masthead h2 {
        margin-top: 0.5em;
        font-size: 1.5em;
      }
    }

    #header {
    	background: url('header.jpg');
    	background-size: cover;
    }

    #download {
    	text-align: center;
    }

    #downloadButton {
    	margin-bottom: 10px;
    }

    #versionNumber {
    	padding-top: 3px;
    	margin-top: 3px;
    	color: grey;
    }

    #footer {
    	margin-top: 80px;
    	color: grey;
    	text-align: center;
    }

    .justify p {
    	 text-align: justify;
    }
  </style>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="semantic.min.js"></script>
</head>
<body>


<!-- Page Contents -->
<div class="pusher">
  <div class="ui inverted vertical masthead center aligned segment" id="header">

    <div class="ui text container">
      <h1 class="ui inverted header">
        N. Sane Patcher
      </h1>
      <h2>AN ACTUAL BLAST FROM THE PAST</h2><br>
      <a href="#content" class="ui huge green button">Download <i class="right arrow icon"></i></a>
    </div>

  </div>

  <div class="ui vertical stripe segment" id="content">
    <div class="ui middle aligned stackable grid container">
      <div class="row">
        <div class="eight wide column justify">
          <h3 class="ui header">Play it with the original Soundtrack</h3>
          <p>The N. Sane Patcher allows you to play the Crash Bandicoot N. Sane Trilogy with it's original Soundtrack from the <strong>PlayStation 1</strong> or the <strong>pre-console</strong> version. It also allows you to revert to the N. Sane Trilogy soundtrack.</p>
        </div>
        <div class="six wide right floated column">
        	<div id="download">
          	<a href="download.php" class="ui center aligned massive green button" id="downloadButton">Download</a><br>
          	<span id="versionNumber">v1.0.0 - 317MB</span>
        	</div>
        </div>
      </div>
      <div class="row">
        <div class="eight wide column justify">
        	<br>
          <h3 class="ui header">Things you should know</h3>
          <p style="color: red">Make sure to uncheck 'The Time Twister' in Crash 3 before patching or your game might crash. A fix for this will be out soon.</p>
          <p>You can select each level that you want to patch separately or patch everything at once. If you install the pre-console version, note that no tracks will be overwritten that don't exist in the pre-console version. This means if you patch the PS1 version first and thereafter the pre-console version, you will hear pre-console where available and PS1 where not.</p>
          <p>A few tracks don't loop correctly because they are too long. There's nothing we can really do about it.</p>
          <p>Most of the tracks are quieter than the N. Sane ones. It's recommended to increase the overall volume and set the ingame SFX to 4 for the best experience.
        </div>
      </div>
    </div>
		<div id="footer">Created with &#10084; by <a href="http://reddit.com/u/NoisyFlake">NoisyFlake</a></div>
  </div>

</div>

</body>

</html>
