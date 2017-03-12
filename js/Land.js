;(function(){
	var Land = window.Land = Actor.extend({
		init:function(){
			this.image = game.R["land"];
			this.x = 0;//背景初始位置左边
			this.speed = 3;
			this._super();
		},
		update:function(){
			this.x -= this.speed;
			if (this.x < -288) {
				this.x = 0;
			};
		},
		render:function(){
			game.ctx.drawImage(this.image,this.x,game.canvas.height-112,288,112);
			game.ctx.drawImage(this.image,this.x+288,game.canvas.height-112,288,112);
			game.ctx.drawImage(this.image,this.x+288*2,game.canvas.height-112,288,112);
		}
	});
})();