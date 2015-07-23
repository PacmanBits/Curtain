var Curtain = {};

(function($)
{
	// if the current page has been included as an iFrame we'll use the Curtain that's defined at the top so that it appears over everything
	if(top.document.CurtainDocTopAlias)
	{
		// Point the Curtain functions at this level to the top Curtain
		for(var f in top.document.CurtainDocTopAlias)
			Curtain[f] = top.document.CurtainDocTopAlias[f];
	}
	else
	{
		// Alias to place accessible at all levels
		top.document.CurtainDocTopAlias = Curtain;
		
		var curtainer = $(document.createElement("div"))
			.css({
				position      : "fixed" ,
				top           : "0"     ,
				left          : "0"     ,
				right         : "0"     ,
				bottom        : "0"     ,
				zIndex        : "999"   ,
				pointerEvents : "none"
			})
		;
		
		var curtainStack = [] ;
		
		var defaultOptions = {
			width       : "auto"  ,
			height      : "auto"  ,
			background  : "white" ,
			scrimCloses : true
		};
		
		var defaultAlertButtons = {
			okay : function()
			{
				this.Close();
			}
		};
		
		Curtain.Open = function(content, options)
		{
			var crt = new CurtainObj(content, options);
			curtainStack.push(crt);
			return crt;
		};
		
		Curtain.OpenURL = function(URL, options)
		{
			Curtain.Open(
				$(document.createElement("iframe"))
					.attr("src", URL)
					.css({
						position : "absolute" ,
						width    : "100%"     ,
						height   : "100%"     ,
						border   : "none"
					})
			, options);
		}
		
		Curtain.Alert = function(text, buttons)
		{
			var bts = $.extend({}, defaultAlertButtons, buttons);
			
			var btnEl = $(document.createElement("div"))
				.css({
					border      : "1px #CCC none"         ,
					borderStyle : "solid none none solid"
				})
			;
			
			var textEl = $(document.createElement("div"))
				.append(text)
				.css({
					textAlign : "center",
					padding   : "20px"
				})
			;
			
			var cont = $(document.createElement("div"))
				.append(textEl)
				.append(btnEl)
				.css({
					fontFamily : "Arial,sans-serif" ,
					color      : "#666"
				})
			;
			
			var ctn = Curtain.Open(cont, { width : "400px", scrimCloses : false });
			
			for(b in bts)
			{
				$(document.createElement("div"))
					.text(b)
					.click(function()
					{
						bts[b].apply(ctn);
					})
					.appendTo(btnEl)
					.css({
						float       : "right"                ,
						cursor      : "pointer"              ,
						width       : "79px"                 ,
						border      : "1px #CCC none"        ,
						borderStyle : "none solid none none" ,
						padding     : "10px"                 ,
						textAlign   : "right"
					})
				;
			}
		};
		
		Curtain.CloseAll = function()
		{
			for(var c = 0; c < curtainStack.length; c++)
				curtainStack[c].Close();
			
			curtainStack = [];
		}
		
		$(function()
		{
			curtainer.appendTo($("body"));
		});
		
		function CurtainObj(content, options)
		{
			var me = this;
			var opts = $.extend({}, defaultOptions, options);
			
			var el = $(document.createElement("div"))
				.css({
					position      : "fixed" ,
					top           : "0"     ,
					left          : "0"     ,
					right         : "0"     ,
					bottom        : "0"     ,
					pointerEvents : "auto"
				})
				.appendTo(curtainer)
			;
			
			var scrim = $(document.createElement("div"))
				.css({
					position        : "absolute" ,
					top             : "0"        ,
					left            : "0"        ,
					right           : "0"        ,
					bottom          : "0"        ,
					backgroundColor : "black"    ,
					opacity         : "0.5"
				})
				.appendTo(el)
			;
			
			if(opts.scrimCloses)
				scrim.click(function(){ me.Close(); });
			
			var frame   = $(document.createElement("div"))
				.css({
					position   : "fixed"                ,
					top        : "50%"                  ,
					left       : "50%"                  ,
					transform  : "translate(-50%,-50%)" ,
					background : opts.background        ,
					width      : opts.width             ,
					height     : opts.height
				})
				.appendTo(el)
				.append(content)
			;
			
			this.Close = function()
			{
				el.remove()  ;
				opts  = null ;
				scrim = null ;
				frame = null ;
			};
		}
	}
})(jQuery)
