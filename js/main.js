var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
var arr=[];
var sp=0.5;
var ctx,cnv,_x,_y,allstep;
var ff=false;
var _shag=Math.PI/360;
var ua = navigator.userAgent;
var lastmouseenter;
var infoWindowTimeOut;
var timeOutCnvDraw=false;
if (ua.search(/Firefox/) != -1) { ff=true; };

function getClientWidth() {
	return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
}
function getClientHeight() {
	return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
}
function initcanvas(){
	cnvwidth = getClientWidth();
	cnvheight = getClientHeight();
	var parentElem = document.body;
	cnv = document.getElementById("cnv");
	//cnv = document.createElement('canvas');
	//cnv.id = "cnv";
	//cnv.innerHTML = 'Ваш браузер не поддерживает canvas!';
	cnv.height = cnvheight;
	cnv.width = cnvwidth;
	cnv.style.display = "none";
	parentElem.insertBefore(cnv, parentElem.childNodes[2]);
	cnv.style.display = "block";
	//	cnv = document.getElementById("cnv");
	ctx = cnv.getContext("2d");
	if(ctx){
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.lineJoin = 'round';
		ctx.strokeStyle = "#007999";
	}

}
function initcircle(_lineWidth=false,_di=false){
	if(timeOutCnvDraw){clearTimeout(timeOutCnvDraw)}
	if(ctx){
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		_centert = getClientHeight()/2;
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
				_left = funcLeft(i,obj,value);
				_top  = funcTop(i,obj,value);
				ctx.strokeStyle = "rgba(80,150,250,0.03)";
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.lineWidth = lineWidth; // 1
				ctx.lineTo(_left,_top);
				lineWidth=(--lineWidth<1)?1:lineWidth--;
				ctx.stroke();
				c++;
			}
			while (c<100 && lineWidth > 1)
		});
		//console.log("initcircle");
		timeOutCnvDraw = setTimeout(initcircle ,1000/2);

	}else{
		//console.info("canvas is not supported");
	}
}

function funcLeft(i,obj,value){
	_centerl = getClientWidth()/2;
	_d=parseFloat($(value).attr("rad"));//*10||10;
	_d=(_centerl/100)*_d;
	return _centerl + Math.sin(( i -(Math.PI/180)*(24+obj*8) )/(obj||1)*sp+obj*10)*_d;
}

function funcTop(i,obj,value){
	_centert = getClientHeight()/2;
	_d=parseFloat($(value).attr("rad"));//*10||10;
	_d=(_centert/100)*_d;
	return _centert + Math.cos( i /(obj||1)*sp+obj*10)*_d;///web.archive.org/web/20250128180232/https://1.5;
}

function infowindowMoveTo($self){
	$infowindow = $("#infowindow");
	infowidth = $infowindow.innerWidth();
	infoheight = $infowindow.innerHeight()
	_x=parseFloat($self.css("left"))-infowidth/2+$self.innerWidth()/2;
	// отступ 30
	_y=parseFloat($self.css("top"))-infoheight-30;
	_y=_y>0?_y:parseFloat($self.css("top"))+$self.innerHeight()+30;
	$infowindow.css({left:_x,top:_y});
}

function infowindowShow(description,previewlink){
	$infowindow = $("#infowindow");
	$infowindow.hide();
	$infopreview = $infowindow.find("#infopreview");
	$infobody = $infowindow.find("#infobody");
	// очищаем
	$infobody.html("");
	$infopreview.attr("src","#");
	// заполняем информацией
	$infobody.html(description);
	$infopreview.attr("src",previewlink);
	// считаем координаты окна
	infowindowMoveTo($self);
	// показываем
	$infowindow.show("fade");
}

function initStars(){

	//stars
  
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


onload = function () {
	var    _centerl = getClientWidth()/2;
	var    _centert = getClientHeight()/2;

	//$("#log").html("0");

	$("#sun img").css({"left":-parseInt($("#sun img").css("width"))/2,"top":-parseInt($("#sun img").css("height"))/2});

	$(".planet").mouseenter(function(){
		clearTimeout(infoWindowTimeOut);
		$self = $(this);
		arr[$self.index()+1].run = false;
		lastmouseenter = $self.index()+1;

		description = $self.find(".description").html();
		previewlink = $self.find(".preview").attr("src");
		infowindowShow(description,previewlink);
	})
	.mouseleave(function() {
		arr[$(this).index()+1].run = true;
		// Задержка окна и выключаем его перемещение
		infoWindowTimeOut = setTimeout(function(){ $("#infowindow").hide("fade"); lastmouseenter=-1;} ,4000);
	});
	
	function round(){
		_centerl = getClientWidth()/2;
		_centert = getClientHeight()/2;
		$("#sun").css({"left":_centerl,"top":_centert});
		
		$.each( $(".planet"), function( obj, value ) {
			obj++;
			if (typeof(arr[obj]) == "undefined"){
				_x =  funcLeft(-Math.PI+_shag,obj,value);
				_y  = funcTop(-Math.PI+_shag,obj,value);
				arr[obj]={i:-Math.PI,x:_x,y:_y,run:true};
				console.log("planet_ok: "+obj);
			}
			
			//$("#log").html(arr[1].i+"</br>"+(arr[2]?arr[2].i:0)+"</br>"+(arr[3]?arr[3].i:0) +"</br>"+getClientWidth());
			
			_left = funcLeft(arr[obj].i-(Math.PI/180)*8,obj,value);//_centerl + Math.sin(( arr[obj].i -(Math.PI/180)*8 )/(obj||1)*sp+obj*10)*_d;
			_top  = funcTop(arr[obj].i,obj,value);//_centert + Math.cos(( arr[obj].i )/(obj||1)*sp+obj*10)*_d/1.5;

			// изменяем размер планеты в зависимости от её положения
			var lw=80;			
			var temp = (_top<_centert+350 )?parseInt((_centert+350 - _top)/15):0;
			var _h = (lw - temp<=0 )?1:parseInt(lw - temp);
			$(value).find(".icon").css("height",_h);
			
			// изменяем координаты имени
			$(value).find(".name").css("left",_h+10);
			
			if (typeof(arr[obj].allstep) == "undefined"){
				arr[obj].allstep=(arr[obj].i-(arr[obj].i-Math.PI))/(Math.PI/30);
			}

			arr[obj].x=_left;
			arr[obj].y=_top;
			
			// изменяем координаты планеты
			$(value).css({"left":_left-(parseFloat($(value).css("width"))/2),"top":_top-(parseFloat($(value).css("height"))/2)});
			if(_left.toFixed(3) == funcLeft(arr[obj].i,obj,value).toFixed(3) &&  _top.toFixed(3)  == funcTop(arr[obj].i,obj,value).toFixed(3) ){ arr[obj].i=-Math.PI; }
						
			
			// если статус run = true, то изменяем шаговую переменную для планеты
			// другими словами изменяем x для функции f(x) по которой вычисляются коородинаты планеты
			// если false, то переменная не изменяется и соответственно функция неизменна, планета не двигается
			//initcircle(45,arr[obj].i);
			//console.log(arr[obj].i);

			if(arr[obj].run) {
				arr[obj].i=arr[obj].i+_shag;
				
				//arr[obj].i=(arr[obj].i>Math.PI*2)?-Math.PI:arr[obj].i;
			}
			if(lastmouseenter == obj){
				$self = $(value);
				// считаем координаты окна
				infowindowMoveTo($self);
			}
		})
		setTimeout(round ,1000/30);
	}
	//
	initcanvas();
	round();
	initcircle();
	initStars()

	$("#load").css("display","none");
}

onresize = function(){
		initcanvas();
		initcircle();
		initStars()
}
}

/*
     FILE ARCHIVED ON 18:02:32 Jan 28, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:09:08 Apr 14, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 4.805
  load_resource: 231.812
  PetaboxLoader3.resolve: 183.463
  PetaboxLoader3.datanode: 32.896
*/