

// 1.页面翻转控制
function turn(elem){
	var cls = elem.className;
	var n = elem.id.split('_')[1];
	if(!/photo_center/.test(cls)){

		return rsort(n);

	}
    //判断“photo_front”是否在cls中
	if( /photo_front/.test( cls ) ){   
	//判断“photo_front”是否在cls中
        cls = cls.replace(/photo_front/,'photo_back')
	}else{
		cls = cls.replace(/photo_back/,'photo_front')
	}
	return elem.className = cls;
}


//2.通用函数

function g(selector){
	var method = selector.substr(0,1) == "."?"getElementsByClassName":"getElementById"
	return document[method](selector.substr(1));

	//method为字符串方法要用[]连接
}


//3.输出所有海报
function addPhotos(){
	var html = [] ;
	var nav = [];
	for(var i=0 ; i<data.length; i++){
		var arrTem = g("#wrap").innerHTML
		                   .replace("{{index}}", i)
		                   .replace("{{img}}", data[i].img)
		                   .replace("{{caption}}", data[i].caption)
		                   .replace("{{desc}}", data[i].desc);
		                 
		html.push( arrTem );
		
	}
	
    g("#wrap").innerHTML = html.join(''); 
    rsort( random([0, data.length]));
}
addPhotos();


//6. 随机生成一个值，支持取值范围 random([min,max])
function random(range){
	var max = Math.max(range[0],range[1]);
	var min = Math.min(range[0],range[1]);
	var diff = max-min;
	var number = Math.ceil(Math.random()*diff + min);
    return number;
}

//5. 排序海报
function rsort(n){
	//如果一个海报不常用，会以_开头，表示临时变量
	//_photo并不是一个真的数组，只有length属性
	var _photo = g(".photo");
	var photos = []; 
	for(var i=0; i<_photo.length; i++){
		_photo[i].className = _photo[i].className.replace(/\s*photo_center\s*/,'');       
         _photo[i].style.left='';
         _photo[i].style.top='';

        _photo[i].style.transform = "rotate(0deg) scale(1.2)";
        photos.push(_photo[i]);
        //将所有海报放到一个数组中，成为一个真的数组
	}

	var photo_center = g("#photo_"+n);
	photo_center = photos.splice(n,1)[0];
	photo_center.className += " photo_center";
	


	//把海报分为左右区域
	var photos_left = photos.splice(0,Math.ceil(photos.length/2));
    var photos_right = photos;

    var wrap_w = g("#wrap").clientWidth;
    var wrap_h = g("#wrap").clientHeight;
    var photo_w = g(".photo")[0].clientWidth;
    var photo_h = g(".photo")[0].clientHeight;

    for(s in photos_left){
    	var photo = photos_left[s];
    	photo.style.left = random([0-photo_w/3,wrap_w/2-photo_w/2])+"px";
    	photo.style.top = random([0-photo_h/2, wrap_h+photo_h])+ "px"; 
    	photo.style.transform = "rotate("+random([-180,180])+"deg) scale(1)";
    }

    for(s in photos_right){
    	var photo = photos_right[s];
    	photo.style.left = random( [wrap_w/2+photo_w/2,wrap_w+photo_w/2])+"px";
    	photo.style.top = random([0-photo_h/2, wrap_h+photo_h/2])+"px";
    	photo.style.transform = "rotate("+random([-180,180])+"deg) scale(1)";
    }

     //控制按钮处理
     
      

    console.log(photos_left.length,photos_right.length);
	console.log(photos.length);


}


