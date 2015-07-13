var Curtain = {
	Show       : null,
	Hide       : null,
	LoadURL    : null,
	SetContent : null,
	Clear      : null,
	SetSize    : null
};

(function($)
{
	var curtainEl = $(document.createElement("div"))
		.css({
			position:        "fixed",
			top:             "0",
			left:            "0",
			right:           "0",
			bottom:          "0",
			backgroundColor: "black",
			opacity:         "0.5",
			display:         "none",
			zIndex:          998
		})
		.click(function(){ Curtain.Hide(); })
	;
	
	var frame   = $(document.createElement("div")).css({
		position:        "fixed",
		top:             "50%",
		left:            "50%",
		transform:       "translate(-50%,-50%)",
		display:         "none",
		zIndex:          999
	});
	
	var iFrame  = $(document.createElement("iframe"))
		.css({
			width:           "100%",
			height:          "100%",
			display:         "none",
			backgroundColor: "white",
			border:          "none"
		})
		.appendTo(frame)
	;
	
	var contentEl = $(document.createElement("div"))
		.css({
			width:           "100%",
			height:          "100%",
			display:         "none"
		})
		.appendTo(frame)
	;
	
	var defaultOptions = {
		width   : "auto" ,
		height  : "auto" ,
		URL     : null   ,
		content : null
	}
	
	Curtain.Show = function(options)
	{
		var opts = $.extend({}, defaultOptions, options);
		
		if(opts.URL)
			LoadURL(opts.URL);
		else if(opts.content)
			SetContent(opts.content);
		
		SetSize(opts.width, opts.height);
		
		curtainEl.show();
		frame.show();
	}
	
	Curtain.Hide = function()
	{
		Clear();
		
		curtainEl.hide();
		frame.hide();
	}
	
	function LoadURL(URL)
	{
		iFrame.hide();
		iFrame.attr("src", URL);
		
		contentEl.hide();
		iFrame.show();
//		iFrame.load(function()
//		{
//			$(this).fadeIn(10000);
//		});
	}
	
	function SetContent(content)
	{
		contentEl.append($(content));
		
		contentEl.show();
		iFrame.hide();
	}
	
	function SetSize(width, height)
	{
		frame.css({
			width  : width,
			height : height
		});
	}
	
	function Clear()
	{
		iFrame.attr("src", "");
		contentEl.empty();
		
		contentEl.hide();
		iFrame.hide();
	}
	
	$(function()
	{
		curtainEl.appendTo($("body"));
		frame.appendTo($("body"));
	});
})(jQuery)
