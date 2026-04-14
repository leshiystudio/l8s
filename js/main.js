var arr=[];
var sp=0.5;
var ctx,cnv;
var _shag=Math.PI/720;
var lastmouseenter;
var infoWindowTimeOut;
var timeOutCnvDraw=false;
var $self;

function getClientWidth() {
	return window.innerWidth;
}
function getClientHeight() {
	return window.innerHeight;
}

function initcanvas(){
	var cnvwidth = getClientWidth();
	var cnvheight = getClientHeight();
	var parentElem = document.body;
	cnv = document.getElementById("cnv");
	cnv.height = cnvheight;
	cnv.width = cnvwidth;
	cnv.style.display = "none";
	parentElem.insertBefore(cnv, parentElem.childNodes[2]);
	cnv.style.display = "block";
	ctx = cnv.getContext("2d");
	if(ctx){
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.lineJoin = 'round';
		ctx.strokeStyle = "#007999";
	}
}

function initcircle(_lineWidth=false,_di=false){
	if(timeOutCnvDraw){clearTimeout(timeOutCnvDraw);}
	if(ctx){
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		let i;
		let lineWidth;
		$.each( $(".planet"), function( obj, value ) {
			let c=0;
			obj++;
			if(arr.length >0 && typeof arr[obj] !== 'undefined' && typeof arr[obj].i !== 'undefined'){
				i=arr[obj].i;
			}else{
				i=-Math.PI;
			}
			lineWidth = (_lineWidth)?_lineWidth:40;
			ctx.beginPath();
			if(arr.length>0 && typeof arr[obj] !== 'undefined' && typeof arr[obj].x !== 'undefined' && typeof arr[obj].y != 'undefined'){
				ctx.moveTo(arr[obj].x,arr[obj].y);
			}else{
				ctx.moveTo(funcLeft(-Math.PI,obj,value),funcTop(-Math.PI,obj,value));
			}
			do{
				i=i+((_di)?_di:(-Math.PI/(15/obj)));
				let _left = funcLeft(i,obj,value);
				let _top  = funcTop(i,obj,value);
				ctx.strokeStyle = "rgba(80,150,250,0.03)";
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.lineWidth = lineWidth;
				ctx.lineTo(_left,_top);
				lineWidth=(--lineWidth<1)?1:lineWidth--;
				ctx.stroke();
				c++;
			}
			while (c<100 && lineWidth > 1);
		});
		timeOutCnvDraw = setTimeout(initcircle, 1000/2);
	}
}

function funcLeft(i,obj,value){
	var _centerl = getClientWidth()/2;
	var _d = parseFloat($(value).attr("rad"));
	_d=(_centerl/100)*_d;
	return _centerl + Math.sin(( i -(Math.PI/180)*(24+obj*8) )/(obj||1)*sp+obj*10)*_d;
}

function funcTop(i,obj,value){
	var _centert = getClientHeight()/2;
	var _d = parseFloat($(value).attr("rad"));
	_d=(_centert/100)*_d;
	return _centert + Math.cos( i /(obj||1)*sp+obj*10)*_d/1.5;
}

function infowindowMoveTo($self){
	var $infowindow = $("#infowindow");
	var infowidth = $infowindow.innerWidth();
	var infoheight = $infowindow.innerHeight();
	var _x = parseFloat($self.css("left"))-infowidth/2+$self.innerWidth()/2;
	var _y = parseFloat($self.css("top"))-infoheight-30;
	_y=_y>0?_y:parseFloat($self.css("top"))+$self.innerHeight()+30;
	$infowindow.css({left:_x,top:_y});
}

function infowindowShow(description,previewlink){
	var $infowindow = $("#infowindow");
	$infowindow.hide();
	var $infopreview = $infowindow.find("#infopreview");
	var $infobody = $infowindow.find("#infobody");
	$infobody.html("");
	$infopreview.attr("src","#");
	$infobody.html(description);
	$infopreview.attr("src",previewlink);
	infowindowMoveTo($self);
	$infowindow.show();
}

function initStars(){
	var style = ["style1", "style2", "style3", "style4"];
	var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
	var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

	function getRandomArbitrary(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	var stars = "";
	var qtdeEstrelas = 500;
	var noite = document.querySelector(".stars");
	noite.innerHTML="";
	var widthWindow = window.innerWidth;
	var heightWindow = window.innerHeight;

	for (var i = 0; i < qtdeEstrelas; i++) {
		stars += "<span class='star " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
		+ tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
		+ getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
	}

	noite.innerHTML = stars;
}

window.addEventListener('load', function() {
	var _centerl = getClientWidth()/2;
	var _centert = getClientHeight()/2;

	$("#sun img").css({"left":-parseInt($("#sun img").css("width"))/2,"top":-parseInt($("#sun img").css("height"))/2});

	$(".planet").mouseenter(function(){
		clearTimeout(infoWindowTimeOut);
		$self = $(this);
		arr[$self.index()+1].run = false;
		lastmouseenter = $self.index()+1;

		var description = $self.find(".description").html();
		var previewlink = $self.find(".preview").attr("src");
		infowindowShow(description,previewlink);
	})
	.mouseleave(function() {
		arr[$(this).index()+1].run = true;
		infoWindowTimeOut = setTimeout(function(){ $("#infowindow").hide(); lastmouseenter=-1;}, 4000);
	});

	function round(){
		_centerl = getClientWidth()/2;
		_centert = getClientHeight()/2;
		$("#sun").css({"left":_centerl,"top":_centert});

		$.each( $(".planet"), function( obj, value ) {
			obj++;
			if (typeof(arr[obj]) == "undefined"){
				var _x = funcLeft(-Math.PI+_shag,obj,value);
				var _y = funcTop(-Math.PI+_shag,obj,value);
				arr[obj]={i:-Math.PI,x:_x,y:_y,run:true};
				console.log("planet_ok: "+obj);
			}

			var _left = funcLeft(arr[obj].i-(Math.PI/180)*8,obj,value);
			var _top  = funcTop(arr[obj].i,obj,value);

			var lw=80;
			var temp = (_top<_centert+350)?parseInt((_centert+350 - _top)/15):0;
			var _h = (lw - temp<=0)?1:parseInt(lw - temp);
			$(value).find(".icon").css("height",_h);
			$(value).find(".name").css("left",_h+10);

			arr[obj].x=_left;
			arr[obj].y=_top;

			$(value).css({"left":_left-(parseFloat($(value).css("width"))/2),"top":_top-(parseFloat($(value).css("height"))/2)});
			if(_left.toFixed(3) == funcLeft(arr[obj].i,obj,value).toFixed(3) && _top.toFixed(3) == funcTop(arr[obj].i,obj,value).toFixed(3)){
				arr[obj].i=-Math.PI;
			}

			if(arr[obj].run){
				arr[obj].i=arr[obj].i+_shag;
			}
			if(lastmouseenter == obj){
				$self = $(value);
				infowindowMoveTo($self);
			}
		});
		requestAnimationFrame(round);
	}

	initcanvas();
	round();
	initcircle();
	initStars();

	$("#load").css("display","none");
});

window.addEventListener('resize', function(){
	initcanvas();
	initcircle();
	initStars();
});
