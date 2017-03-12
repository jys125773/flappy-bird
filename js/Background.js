var Background = window.Background = Actor.extend({
	init : function(){
		//随机选择一个，是白天还是黑夜
		this.dayOrNight = _.random(0,1);
		//自己的图片名字
		this.imageName = (["bg_day","bg_night"])[this.dayOrNight];
		//自己的图片，自己的图片已经被game类的R加载完毕了！！！
		this.image = game.R[this.imageName];
		//x位置
		this.x = 0;
		//速度
		this.speed = 2;
		//调用超类的构造函数，把自己放入game的actors数组中
		this._super();
	},
	//主循环再帮我们每帧调用update函数
	update : function(){
		this.x -= this.speed;
		if(this.x < -288){
			this.x = 0;
		}
	},
	//主循环再帮我们每帧调用render函数
	render : function(){
		//渲染三张，目的是无缝连续滚动，当猫腻图的左边框到达0点，就拉回来。
		//也就是x如果是-288，就让x为0
		game.ctx.drawImage(this.image,this.x,0,288,520);
		game.ctx.drawImage(this.image,this.x + 288,0,288,520);
		game.ctx.drawImage(this.image,this.x + 288 * 2,0,288,520);
	}
});
