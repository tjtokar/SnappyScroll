$.fn.snappyScroll = function(scrollDuration, startAtTop) {
	
	var activeSection = 0;
	var isAnimating = false;
	var lastLayer = parseInt($(".layer").length) - 1;
	
	function layerChecker(){
		var layerCounter = 1;
		$(".layer").each( function() {
			atTop = $(this).offset().top - $(window).scrollTop();
			if( atTop == 0 ){
				$(".layer:nth-of-type("+layerCounter+")").attr('data-start', 'start');
				activeSection = layerCounter - 1;
			}
			layerCounter++;
		});
	}
	
	layerChecker();
	
	window.addEventListener('DOMMouseScroll', onMouseWheel, false);
	window.onmousewheel = document.onmousewheel = onMouseWheel;
	
	function onMouseWheel(event) {
	    event.stopPropagation();
	    event.preventDefault();
	    event.cancelBubble = true;
	    if(isAnimating == true){
			return false;
		}
		var FF = (document.getBoxObjectFor != null || window.mozInnerScreenX != null);
		if (FF) {
			if( event.detail < 0 ){
				direction = "up";
			} else {
				direction = "down";
			}
		} else {
			if( event.wheelDelta > 0 ){
				direction = "up";
			} else {
				direction = "down";
			}
		}

		scrollsnapper(event);
	    return false;
	}
	
	function scrollsnapper(event){
		
		
		if( direction == "up"){
			activeSection--;
		} else {
			activeSection++;
		}
        if( activeSection < 0 ){
	        activeSection = 0;
	        return false;
        }
        
        console.log( activeSection );
        console.log( lastLayer );
        
        if( activeSection > lastLayer ){
	        activeSection = lastLayer;
	        return false;
        }
		
		
		
		
		if( direction == "down") {
			nextLayer = $(".layer[data-start=start]").removeAttr('data-start').next().offset().top;
		} else {
			nextLayer = $(".layer[data-start=start]").removeAttr('data-start').prev().offset().top;
		}
		
		scrollToSection(nextLayer);
	}
	
	function scrollToSection( abs ){
		if(isAnimating == true){
			return false;
		}
		
		isAnimating = true;
		
		$("html, body").animate({ scrollTop: abs }, scrollDuration, function() {
			 isAnimating = false;
			 layerChecker();
		});
	}


}