/*
 *  jquery-slidebox - v1.0.1
 *  Yet another slideshow plugin.
 *  http://bjo3rn.com
 *
 *  Copyright Björn Fromme, <mail@bjo3rn.com>
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

	'use strict';

	var pluginName = 'slidebox',
		defaults = {
			closeButtonContent: 'close',
			animationSpeed: 250
		};

	function Plugin (element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {
			var that = this;
			var $element = $(this.element);
			$element.find('.slidebox-row').each(function() {
				var itemCount = $(this).children().length;
				$(this).find('.slidebox-image').css('width', 100/itemCount + '%');
				$(this).find('a').on('click', function(e) {
					e.preventDefault();
					var $currentImage = $(this).closest('.slidebox-image').addClass('current');
					var zoomUrl = $currentImage.data('zoom-image');
					var origin = $currentImage.position();
					var originX = origin.left + $currentImage.width()/2;
					var originY = origin.top + $currentImage.height()/2;
					var $zoomContainer = $('<div/>').addClass('slidebox-container');
					var $closeButton = $('<a/>')
						.addClass('slidebox-closebutton')
						.attr('href', '#')
						.append(that.settings.closeButtonContent)
						.on('click', function(e) {
							e.preventDefault();
							$closeButton.remove();
							$zoomContainer.animate({
								'top': originY,
								'left': originX,
								'width': 0,
								'height': 0
							}, that.settings.animationSpeed, function() {
								$zoomContainer.remove();
								$currentImage.removeClass('current');
							});
						});
					$zoomContainer
						.css({
							'top': originY,
							'left': originX,
							'backgroundImage': 'url(' + zoomUrl + ')'
						});
					$element.append($zoomContainer);
					$zoomContainer.animate({
						'top': 0,
						'left': 0,
						'width': $element.width(),
						'height': $element.height()
					}, that.settings.animationSpeed, function() {
						$zoomContainer.append($closeButton);
					});
				});
			});
		}
	});

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, 'plugin_' + pluginName ) ) {
				$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );
