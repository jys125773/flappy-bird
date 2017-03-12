;(function(){
	var Pipe = window.Pipe = Actor.extend({
		init:function(){
			this.d_image = game.R["pipe1_up"];
			this.u_image = game.R["pipe1_down"];
			this.u_height = 50+Math.floor(Math.random()*150);//上面柱子的高度
			this.kong = 160;//两个柱子之间的空格
			this.X = game.canvas.width;//柱子初始位置,画布外
			this.flag = true;//设置过一个柱子加一分
			this.speed = 3;
			this._super();
		},
		update:function(){
			this.X -= this.speed;
			if (this.X < -52) {
				this.die();
			};
			this.A1 = this.u_height;//上面柱子的边界
			this.B1 = this.X + 52;
			this.D1 = this.X;

			this.A2 = this.u_height + this.kong;
			this.B2 = this.X + 52;
			this.D2 = this.X;
			if (this.B2 < game.bird.X && this.flag) {
				this.flag = false;
				game.fen++;
				console.log(game.fen);
			};
			if ((game.bird.B > this.D1 && game.bird.D < this.B1 && game.bird.A < this.A1)||(game.bird.B > this.D2 && game.bird.D < this.B2 && game.bird.C > this.A2)) {
				game.scene.changeScene(2);
			};
		},
		render:function(){
			game.ctx.drawImage(this.u_image,0,320 - this.u_height,52,this.u_height,this.X,0,52,this.u_height);
			game.ctx.drawImage(this.d_image,0,0,52,410-this.u_height-this.kong,this.X,this.u_height+this.kong,52,410-this.u_height-this.kong);
		},
		die:function(){
			game.actors = _.without(game.actors,this);
		}
	});
})();