//有滚动条的时候棋子的位置不准
var isblack=true;
var canvas=document.getElementById('myCanvas');
var pop=document.getElementsByClassName('pop')[0];
var mask=document.getElementsByClassName('mask')[0];
var replay=document.getElementById("replay");
var h1=document.getElementsByTagName('h1')[0];
var ctx=canvas.getContext('2d');
for(var i=0;i<15;++i){
	for(var j=0;j<15;++j){
		ctx.strokeStyle='black';
		ctx.strokeRect(40*i,40*j,40,40);
	}
}
var map=new Array(14);
for(var i=1;i<15;++i){
	map[i]=new Array(14)
	for(var j=1;j<15;++j){
		map[i][j]=0;
	}
}
canvas.onclick=function (event) {
	var black=new Image();
	var white=new Image();
	black.src='images/black.png';
	white.src='images/white.png';
	var windowWidth=document.body.clientWidth;
	var x=event.clientX-(windowWidth-600)/2;
	var y=event.clientY-30;
	var row;
	var col;
	if (x%40>20) {
		col=Math.floor(x/40)+1;
	}else {
		col=Math.floor(x/40);
	}
	if (y%40>20) {
		row=Math.floor(y/40)+1;
	}else {
		row=Math.floor(y/40);
	}
	if (map[row][col]==0) {
		if (isblack) {
			black.onload=function  () {
				ctx.drawImage(black,col*40-18,row*40-18);
			}
			isblack=false;
			map[row][col]=1;
			iswin(row,col,1);
		}else{
			ctx.drawImage(white,col*40-18,row*40-18);
			isblack=true;
			map[row][col]=2;
			iswin(row,col,2);
		}
	}
}
//判断是否输赢
function iswin (isrow,iscol,t) {
	//对行方向进行判断
	var fun_isrow=isrow;
	var fun_iscol=iscol;
	var total=1;
	while(fun_isrow-1>0&&map[fun_isrow-1][fun_iscol]==t&&total<5){
		--fun_isrow;
		++total;
	}
	fun_isrow=isrow;
	fun_iscol=iscol;
	while(fun_isrow+1<16&&map[fun_isrow+1][fun_iscol]==t&&total<5){
		++fun_isrow;
		++total;
	}
	result();
	//对列方向进行判断
	total=1;
	fun_isrow=isrow;
	fun_iscol=iscol;
	while(fun_iscol+1<16&&map[fun_isrow][fun_iscol+1]==t&&total<5){
		++fun_iscol;
		++total;
	}
	fun_isrow=isrow;
	fun_iscol=iscol;
	while(fun_iscol-1>0&&map[fun_isrow][fun_iscol-1]==t&&total<5){
		--fun_iscol;
		++total;
	}
	result();
	//对/方向进行判断
	total=1;
	fun_isrow=isrow;
	fun_iscol=iscol;
	while(fun_iscol+1<16&&fun_isrow-1>0&&map[fun_isrow-1][fun_iscol+1]==t&&total<5){
		++fun_iscol;
		--fun_isrow;
		++total;
	}
	fun_isrow=isrow;
	fun_iscol=iscol;
	while(fun_isrow+1<16&&fun_iscol-1>0&&map[fun_isrow+1][fun_iscol-1]==t&&total<5){
		--fun_iscol;
		++fun_isrow;
		++total;
	}
	result();
	//对\方向进行判断
	total=1;
	fun_isrow=isrow;
	fun_iscol=iscol;
	while(fun_isrow+1<16&&fun_iscol+1<16&&map[fun_isrow+1][fun_iscol+1]==t&&total<5){
		++fun_iscol;
		++fun_isrow;
		++total;
	}
	fun_isrow=isrow;
	fun_iscol=iscol;
	while(fun_isrow-1>0&&fun_iscol-1>0&&map[fun_isrow-1][fun_iscol-1]==t&&total<5){
		--fun_iscol;
		--fun_isrow;
		++total;
	}
	result();
	function result () {
		if (total>=5) {
			if (t==1) {
				h1.innerHTML='黑棋胜！';
			}else{
				h1.innerHTML='白棋胜！';
			}
			mask.style.display='block';
			pop.style.display='block';
		}
	}
}
replay.onclick=function  () {
	window.location.reload();
}
