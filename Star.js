//待補：顏色第四組
//待補：大小
//待補：速率
//待補：粒子一開始的位置
//待補：畫布改成畫圖片
//待補：粒子多種圖
//待補：不同方向的粒子束(包含圖片)

var all_particles = {},particleIndex = 0;
//粒子動畫 總體 設定開始
	//畫布id
	var canvas_element_id="motion";
	
	//各方向粒子發射器 設定
	//左邊的發射器
	var left_particles_squirt={
		//開關
		'is_on':true,
		
		//發射速度 數字越大越快		
		'speed':1,
		
		//粒子數量1~100(數值越大密度越高)
		'particles_num':100,
		
		//發射什麼樣的粒子 square(正方形),image(圖片)
		'particles_type':'image',
		
		//粒子為圖片時 將會隨機抓取以下的圖片
		'image_use':[
			{
				'src':'images/main/star1.png',
				'ratio':3/3,
				'size_max':10
			},
			
			{
				'src':'images/main/star2.png',
				'ratio':3/3,
				'size_max':10
			}
			,
			{
				'src':'images/main/star3.png',
				'ratio':3/3,
				'size_max':20
			}
			,
			{
				'src':'images/main/star4.png',
				'ratio':3/3,
				'size_max':15
			}
		],
		//粒子為正方時 將會隨機使用以下顏色
		'square_use':[
			{
				//若粒子本體為正方形 粒子顏色 r g b	
				'r':255,
				'g':0,
				'b':0,
				//若粒子本體為正方形 寬最大多少像素
				'size_max':10
			},
			{
				'r':0,
				'g':255,
				'b':0,
				'size_max':10
			},
			{
				'r':0,
				'g':0,
				'b':255,
				
				'size_max':10
			},
		]
	};
	

//粒子動畫 總體 設定結束
	
	if(left_particles_squirt.is_on){
		if(left_particles_squirt.particles_type=='image'){
			for(var kindex in left_particles_squirt.image_use){
				var temp_img=document.createElement("img");
				temp_img.src=left_particles_squirt.image_use[kindex].src;
				left_particles_squirt.image_use[kindex]['element']=temp_img;
			}
		}
	}

	
window.onload = function(){
	// Creating the Canvas(畫布)
	//<canvas> 是 HTML5 的新元素，
	//可透過 Script（通常是 JavaScript）繪製圖形。例如，可以用來繪圖、合成圖照片、建立動畫、甚至處理即時的影片播放。
	
	
	//創造一個繪圖工具箱，裡頭有畫布還有各項工具
	var the_canvas = document.getElementById(canvas_element_id), 
		//要畫那一種東西，取出一支畫筆
		the_canvas_2d_pen = the_canvas.getContext("2d"),
		cached_the_canvas = document.createElement("canvas"), 
		//要畫那一種東西，取出一支畫筆
		cached_the_canvas_2d_pen = cached_the_canvas.getContext("2d");
		
	//Get the window's height and width: (NOT including toolbars/scrollbars):
	
	the_canvas.width = window.innerWidth;
	the_canvas.height = window.innerHeight;
	
	cached_the_canvas.width = the_canvas.width;
	cached_the_canvas.height = the_canvas.height;
	// Finished Creating Canvas	
	
	
	//粒子模型
	function Particle(params){
		if(typeof params!='object'){
			params={};
		}	
		//粒子從哪個方向到哪個方向
		this.direction='left_right';//left_right,right_left,top_bottom,bottom_top
		this.from_squirt='left_particles_squirt';
		//粒子本體為何
		this.draw_thing='image';//square,image
		//粒子速率
		this.speed=1;//數字越大越快					

		for(var kindex in params){
			this[kindex]=params[kindex];
		}
		

		// Math.random(),返回一浮點數
		//Return a random number between 0 (inclusive) and 1 (exclusive):
		if (this.direction == 'left_right' || this.direction == 'right_left') {
			var random_x = Math.floor(Math.random() * (0)) + 1;
			var random_y = Math.floor(Math.random() * the_canvas.height) + 1;
		} else if (this.direction == 'top_bottom' || this.direction == 'bottom_top') {
			var random_x = Math.floor(Math.random() * the_canvas.width) + 1;
			var random_y = Math.floor(Math.random() * (0)) + 1;
		}

		this.x = random_x;
		this.y = random_y;

		if (this.direction == 'left_right' || this.direction == 'right_left') {
			this.vx = Math.random()*6 + 0.01+this.speed;
			this.vy = Math.random() * 2 - 1;
		} else if (this.direction == 'top_bottom' || this.direction == 'bottom_top') {
			this.vx = Math.random() * 2 - 1;
			this.vy = Math.random()*6+ 0.01+this.speed;
		}
		
	   
	
		particleIndex++;
		all_particles[particleIndex] = this;
		this.id = particleIndex;
		
		
		
		if(this.draw_thing=='image'){
			var particle_images=window[this.from_squirt].image_use;
			var temp_num=Math.floor(Math.random()*particle_images.length);
			//若粒子本體為圖片 圖片ID
			this.image_element =  particle_images[temp_num].element;
			//若粒子本體為圖片 圖片寬高比
			this.image_width_height_ratio = particle_images[temp_num].ratio;
			//若粒子本體為圖片 寬最大多少像素
			this.image_size_max=Math.floor(Math.random() *  particle_images[temp_num].size_max + 1);
			
			this.size_width = Math.floor(Math.random() * this.image_size_max +1);
			this.size_height = this.size_width/this.image_width_height_ratio;
		
		
		}else if(this.draw_thing=='square'){
			var particle_colors=window[this.from_squirt].square_use;
			var temp_num=Math.floor(Math.random()*particle_colors.length);
			this.square_size_max= particle_colors[temp_num].size_max;
			this.square_color_r=particle_colors[temp_num].r;
			this.square_color_g=particle_colors[temp_num].g;
			this.square_color_b=particle_colors[temp_num].b;
			
			this.size = Math.floor(Math.random() * this.square_size_max +1);
			
			var random_plus_minus=Math.floor(Math.random() * 2 - 1)*Math.ceil(Math.random() * 70);
			//var random_plus_minus=0;
			var square_color_r=this.square_color_r+random_plus_minus,
			square_color_g=this.square_color_g+random_plus_minus,
			square_color_b=this.square_color_b+random_plus_minus;
		
			this.color ="rgba("+(square_color_r>=0?square_color_r:0)+","+(square_color_g>=0?square_color_g:0)+","+(square_color_b>=0?square_color_b:0)+",1)";
		}
		
	}
   
	Particle.prototype.draw = function(){
		this.x += this.vx;
		this.y += this.vy;
		
		
		if(this.x > cached_the_canvas.width || this.y > cached_the_canvas.height){
			delete all_particles[this.id];return;
		}
		if(this.draw_thing=='image'){
			if(this.direction=='left_right'){
				
				cached_the_canvas_2d_pen.drawImage(this.image_element,this.x,this.y,this.size_width,this.size_height);
				
			}else if(this.direction=='right_left'){
			
				cached_the_canvas_2d_pen.drawImage(this.image_element,cached_the_canvas.width-this.x,this.y,this.size_width,this.size_height);
				
			}else if(this.direction=='top_bottom'){
			
				cached_the_canvas_2d_pen.drawImage(this.image_element,this.x,this.y,this.size_width,this.size_height);
				
			}else if(this.direction=='bottom_top'){
				
				cached_the_canvas_2d_pen.drawImage(this.image_element,this.x,cached_the_canvas.height-this.y,this.size_width,this.size_height);
				
			}
		}else if(this.draw_thing=='square'){
			cached_the_canvas_2d_pen.fillStyle = this.color;
			
			if(this.direction=='left_right'){
				
				cached_the_canvas_2d_pen.fillRect(this.x, this.y, this.size, this.size);
				
			}else if(this.direction=='right_left'){
				
				cached_the_canvas_2d_pen.fillRect(cached_the_canvas.width-this.x, this.y, this.size, this.size);
				
			}else if(this.direction=='top_bottom'){
				
				cached_the_canvas_2d_pen.fillRect(this.x, this.y, this.size, this.size);
				
			}else if(this.direction=='bottom_top'){
				cached_the_canvas_2d_pen.fillRect(this.x, cached_the_canvas.height-this.y, this.size, this.size);
			}
		}
	};
   
	
	if(left_particles_squirt.is_on){
		setInterval(function() {
			
			new Particle(
				{
					'direction':'left_right',
					'from_squirt':'left_particles_squirt',
					'draw_thing':left_particles_squirt.particles_type,
					'speed':left_particles_squirt.speed
				}
			);
		}, 1000/left_particles_squirt.particles_num);
	}
	
	
	//每0.03秒更新一次畫布
	setInterval(function(){		
	
		for(var i in all_particles){
			all_particles[i].draw();
		}
		
		the_canvas_2d_pen.clearRect(0, 0, the_canvas.width, the_canvas.height);
		the_canvas_2d_pen.drawImage(cached_the_canvas,0, 0, the_canvas.width, the_canvas.height);
		cached_the_canvas_2d_pen.clearRect(0, 0, cached_the_canvas.width, cached_the_canvas.height);
	}, 30);
};