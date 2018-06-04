/**
 *
 *
 *
 *  	Main Theme Script File
 *  	LIST HERE ALL THE DEPENDENCIES. THEY WILL BE IMPORTED AND MINIFIED IN THE PRODUCTION VERSION
 *
 *
 *
 *  	THIS FILE IS COMBINED AND MINIFIED INTO js/min/qt-main-min.js
 *  	TO USE THE OPEN VERSION, SET QT_DEBUG TO FALSE IN FUNCTIONS.PHP OR SET DEBUG TO YES IN THE THEME'S CUSTOMIZER
 *
 *
 * 		Dependencies:
 *	 	==============================================
 *
 *
 * 		Parts of this file:
 * 		==================================================
 * 		01. Helpers
 * 		02. Theme functions
 *   	03. qwLoadedTheme: Functions to execute once the contents are fully loaded 
 *  	04. qwInitTheme
 *  	05. Page Ready Trigger
 *  
 *  
 **/



(function($){

	"use strict";


	/**====================================================================
	 *
	 *
	 * 	01. Helpers
	 *
	 * 
	 ====================================================================*/

	
	// =================================================================
	//  Check mobile devices
	// =================================================================
	/**/	$.fn.mobilecheck = function () {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}


	// =================================================================
	// Helper: safe way to define callbacks
	// =================================================================
	$.fn.executeFunctionByName = function ( functionName, context ) {
		var args = [].slice.call(arguments).splice(2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		for(var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		return context[func].apply(this, args);
	}


	// =================================================================
	// ImagesLoaded
	// to check when the images in a certain DIV are loaded
	// Example: $("#mydiv").imagesLoaded().then(function(){ alert(Pictures loaded); });
	// =================================================================
	$.fn.imagesLoaded = function () {
		// get all the images (excluding those with no src attribute)
		var $imgs = this.find('img[src!=""]');
		// if there's no images, just return an already resolved promise
		if (!$imgs.length) {return $.Deferred().resolve().promise();}
		// for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
		var dfds = [];  
		$imgs.each(function(){
			var dfd = $.Deferred();
			dfds.push(dfd);
			var img = new Image();
			img.onload = function(){dfd.resolve();}
			img.onerror = function(){dfd.resolve();}
			img.src = this.src;
		});
		// return a master promise object which will resolve when all the deferred objects have resolved
		// IE - when all the images are loaded
		return $.when.apply($,dfds);
	}



	/**====================================================================
	 *
	 *
	 * 	02. Theme functions
	 *
	 * 
	 ====================================================================*/

	/**====================================================================
	*
	* 
	*  	Gridstack Materialize Carousel
	*	Materializecss carousel http://materializecss.com/media.html#two!
	*  
	* 
	====================================================================*/

	$.fn.gridstackCarousel = function(){
		$('.qt-gridstackCarousel').each(function(i,c){
			var that = $(c),
				w = that.width(),
				h = w/16*7,
				QTtime_constant = that.attr("data-time_constant"),
				QTdist = that.attr("data-dist"),
				QTshift = that.attr("data-shift"),
				QTvpadding = that.attr("data-vpadding"),
				QTfull_width = (that.attr("data-full_width") === "1" || that.attr("data-full_width") === "true"),
				QTpadding = that.attr("data-padding");
			if(QTtime_constant == undefined || QTtime_constant === "" ) {
				QTtime_constant = 200;
			}
			if(QTdist == undefined || QTdist === "" ) {
				QTdist = -30;
			}
			if(QTshift == undefined || QTshift === "" ) {
				QTshift = 0;
			}
			if(QTpadding == undefined || QTpadding === "" ) {
				QTpadding = 0;
			}
			if(QTvpadding == undefined || QTvpadding === "" ) {
				QTvpadding = 0;
			}
			if(QTvpadding !== 0){
				that.css({"margin-top":QTvpadding,"margin-bottom":QTvpadding});
			} 
			var atts = {
				time_constant: parseInt(QTtime_constant, 10),
				dist: parseInt(QTdist, 10),
				padding: parseInt(QTpadding, 10),
				shift:parseInt(QTshift, 10),
				full_width: QTfull_width
			};
			that.carousel(atts);


			that.parent().find(".prev").on("click",function(e){
				e.preventDefault();
				that.carousel("prev");
			});
			that.parent().find(".next").on("click",function(e){
				e.preventDefault();
				that.carousel("next");
			});


			that.find(".carousel-item").on("mouseenter touchstart", function(e){
				var itemElem = $(this);
				itemElem.addClass("active");
				if($("body").hasClass("mobile")){
					setTimeout(
					function(){ 
						itemElem.removeClass("active"); 
					} ,  3000);
					that.find("a").on("touchstart", function(e){
						window.location.href = $(this).attr("href");
					});
				}
			}).on("mouseleave", function(){
				$(this).removeClass("active");
			});
		});
	}


	/**====================================================================
	*
	* 
	*  	Slick gallery
	*  
	* 
	====================================================================*/

	$.fn.slickGallery = function(){
		console.log("Slick gallery");
		$('.qtgallery').slick({
			// lazyLoad: 'ondemand',
			
			slidesToScroll: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 4000,
			dots: true,
			variableWidth: true,
			arrows: true,
			centerMode: true,
			// centerPadding: '140px',
			slidesToShow: 1,
			responsive: [
			   
				{
				  breakpoint: 480,
				  settings: {
					arrows: true,
					centerMode: false,
					// centerPadding: '40px',
					variableWidth: false,
					variableHeight: false,
					slidesToShow: 1,
					draggable: true,
					swipe: true,
					touchMove: true
				  }
				}
			  ]
		});

/**/
		$('.qtvideos').slick({
		  centerMode: true,
		  centerPadding: '120px',
		  slidesToShow: 2,
		  responsive: [
			{
			  breakpoint: 768,
			  settings: {
				arrows: false,
				centerMode: false,
				slidesToShow: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
					arrows: true,
					centerMode: false,
					// centerPadding: '40px',
					variableWidth: false,
					variableHeight: false,
					slidesToShow: 1,
					draggable: true,
					swipe: true,
					touchMove: true
				  }
			}
		  ]
		});
	}

	/**====================================================================
	*
	* 
	*  	Parallax
	*  
	* 
	====================================================================*/
	$.fn.qtParallax = function(){
		$('.parallax').parallax();
	}

	/**====================================================================
	*
	*  Particles.js
	* 
	====================================================================*/

	$.fn.qtparticlesJs = function(){
		if($("body").hasClass("mobile")){
			return;
		}
		$(".qt-particles").each(function(i,c){
			console.log("particlesJs");
			var that= $(this),
				boxid = that.attr("id");
			console.log(boxid);
			particlesJS(boxid, {
				"particles": {
					"number": {
						"value": 160,
						"density": {
							"enable": true,
							"value_area": 800
						}
					},
					"color": {
						"value": !that.attr("data-color") ? "#FFFFFF" : that.attr("data-color")
					},
					"shape": {
						"type": "polygon",
						"stroke": {
							"width": 0,
							"color": "#000000"
						},
						"polygon": {
							"nb_sides": 3
						}
					},
					"opacity": {
						"value":  !that.attr("data-opacity") ? "0.5" : that.attr("data-opacity"),
						"random": true,
						"anim": {
							"enable": true,
							"speed": 1,
							"opacity_min": 0,
							"sync": false
						}
					},
					"size": {
						"value": 5,
						"random": true,
						"anim": {
							"enable": false,
							"speed": 50,
							"size_min": 0.1,
							"sync": false
						}
					},
					"line_linked": {
						"enable": that.attr("data-lines") ? true : false,
						"distance": 150,
						"color": !that.attr("data-color") ? "#FFFFFF" : that.attr("data-color"),
						"opacity": !that.attr("data-opacity") ? "0.5" : that.attr("data-opacity"),
						"width": 1
					},
					"move": {
						"enable": true,
						"speed": !that.attr("data-speed") ? 1 : that.attr("data-speed"),
						"direction": "none",
						"random": true,
						"straight": false,
						"out_mode": "out",
						"bounce": false,
						"attract": {
							"enable": false,
							"rotateX": 600,
							"rotateY": 1200
						}
					}
				},
				"interactivity": {
					"detect_on": "canvas",
					"events": {
						"onhover": {
							"enable": false,
							"mode": "grab"
						},
						"onclick": {
							"enable": true,
							"mode": "push"
						},
						"resize": true
					},
					"modes": {
						"grab": {
							"distance": 140,
							"line_linked": {
								"opacity": 1
							}
						},
						"bubble": {
							"distance": 400,
							"size": 40,
							"duration": 2,
							"opacity": 8,
							"speed": 3
						},
						"repulse": {
							"distance": 200,
							"duration": 0.4
						},
						"push": {
							"particles_nb": 4
						},
						"remove": {
							"particles_nb": 2
						}
					}
				},
				"retina_detect": true
			});
		});
	}


	/**====================================================================
	 *
	 * 
	 *	Smooth scrolling
	 *	
	 * 
	 ====================================================================*/
	$.fn.qtSmoothScroll = function(){
		var body = $("body");
		body.off("click",'a.qwsmoothscroll');
		body.on("click",'a.qwsmoothscroll', function(e){     
			e.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top - 70}, 800);
		});
	}


	/**====================================================================
	 *
	 *
	 *  Poly Decor (The polygons used as background in some pages) invented by QantumThemes. Copyright 2016 QantumThemes ( Igor Nardo )
	 *
	 * 
	 ====================================================================*/

	$.fn.parallaxPolydecor = function(){
		if($("body").hasClass("mobile")){
			return;
		}
		if($(".qt-polydecor").length < 1 && $(".qt-polydecor-page").length < 1){
			return;
		}
		var element1, element2, scrollTop;
		$('.qt-polydecor').not(".nopoly").each(function(){
			var container = $(this);
			container.wrapInner( "<div class='qt-polydecor-content'></div>");
			container.append('<div class="decor1"></div><div class="decor2"></div>');
			element1 = container.find(".decor1"),
			element2 = container.find(".decor2"); // assigning the object 
			var $this = $(this);
			var scrollTop = $(window).scrollTop();
			var offset = $this.offset().top;
			var height = $this.outerHeight();
			var speed1 = 100;
			var speed2 = 130;
			var scrollTop;
			var  offset = $this.offset().top,
			height = $this.outerHeight();
		});
		function updatePolydecor(e) {
			scrollTop = window.pageYOffset;
			$('.qt-polydecor, .qt-polydecor-page > .kc_row, .qt-polydecor-page > .vc_row').each(function(){
				var $this = $(this),
				offset = $this.offset().top,
				yBgPosition = Math.round((offset - scrollTop) );

				$this.find(".decor1").css({top: (yBgPosition * 0.98) +"px"});
				$this.find(".decor2").css({top: (yBgPosition * 0.6) +"px"});

			});
		}
		updatePolydecor();
		window.addEventListener('scroll', updatePolydecor, false);
		return true;
	}




	/**
	 *  New modal
	 */
	
	$.fn.qwNewModal = function(){
		var modal = $("#modal1"),
			frame = $("#modalframe"),
			thebody = $("body");
		thebody.append('<a id="modalmask"></a>');
		
		var modalmask = $("#modalmask");
		modalmask.hide();

		$(".modal-trigger").on("click",function(e){
			e.preventDefault();
			modal.toggleClass("open");
			

			if($(this).attr("data-iframe") !== undefined) {
				frame.attr("src", $(this).attr("data-iframe"));
			}

			if(modal.hasClass("open")){
				console.log("show");
				modalmask.show();
			}else {
				modalmask.hide();
				console.log("hide mask");
			
			}				
				
			return true;
		});
		modalmask.on("click", function(){
			console.log("click");
			modal.removeClass("open");
			modalmask.hide();
		});

	}


	/*=================================================================**
	 * 
	 *
	 *	qwInitPage: We put all page initialization functions here, 
	 *	to reinitialize eventually later
	 *
	 *
	=================================================================*/

	$.fn.qwInitPage = function(){

		// Materializecss parallax http://materializecss.com/parallax.html
		$.fn.qtParallax();

		// Sticky js http://stickyjs.com/
		// $("#stickymenu").sticky({topSpacing:0, responsiveWidth: true, zIndex: 100});

		// Materializecss carousel http://materializecss.com/media.html#two!
		$.fn.gridstackCarousel();

		// Slick gallery based on slickJs
		$.fn.slickGallery();

		$.fn.qwNewModal();

		

		//  initialize the modal window of the album
		// $('.modal-trigger').leanModal();

		//  initialize the animated background polygons
		$.fn.parallaxPolydecor();

		// background particles
		$.fn.qtparticlesJs();

		// smooth internal links scrolling
		$.fn.qtSmoothScroll();

		// http://materializecss.com/scrollspy.html
		$('.scrollspy').scrollSpy();

		// mobile navigation
		$('.button-collapse').sideNav({
			  menuWidth: 300, // Default is 240
			  edge: 'right', // Choose the horizontal origin
			  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
			}
		  );

		// video lightbox
		$( '.swipebox' ).swipebox();

		// materializecss slideshow
		$('.slider').slider();

		jQuery(window).load(function() {
			if(false === $.fn.mobilecheck()) {
				var s = skrollr.init();
			}
		});
	}


	/**====================================================================
	 *
	 *
	 *	Page Ready Trigger
	 * 	This needs to call only $.fn.qtInitTheme
	 * 
	 ====================================================================*/

	jQuery(document).ready(function() {
		/* If not in debug mode, the console messages are suppressed ============*/		
		if(false ===  $("body").hasClass("qt-debug")) {
			var console = {};
			console.log = function(){};
			window.console = console;
		} else {
			if(typeof console === "undefined") { var console = { log: function (logMsg) { } }; }
			console.log("Theme debug enabled the customizer \n ----------------------------------------------\n");
		}
		$.fn.qwInitPage();
	});


})(jQuery);