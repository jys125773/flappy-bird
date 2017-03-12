;(function(){
	var Bird = window.Bird = Actor.extend({
		init:function(){
			this.image = game.R["bird0"];
			this.imgIdx = 0;
			this.X = 66;
			this.Y = 260;
			this.startY = this.Y;
			this.f = 0;//小鸟的帧编号，每次动作清零,在主循环里面每帧增加1
			this.v = 8;//抛掷速度
			this.rotate = 0;
			this._super();
		},
		update:function(){
			this.f++;
			this.imgIdx = ++this.imgIdx%3;
			this.rotate += 0.04;
			this.Y = this.startY - (this.v*this.f-0.25*this.f*this.f);//16帧到最高

			this.A = this.Y+12;
			this.B = this.X + 41;
			this.C = this.Y+36;
			this.D = this.X+7;
		},
		render:function(){
			if (this.Y < -24) {
				this.Y = -24;//触顶
				this.startY = -24;
				this.f = 32;//反弹
			}else if(this.Y > 380){
				this.Y = 380;
			};
			game.ctx.save();
			//先移动坐标系
			game.ctx.translate(this.X + 24,this.Y + 24);
			//然后旋转
			game.ctx.rotate(this.rotate);
			//绘制
			game.ctx.drawImage(game.R["bird"+this.imgIdx],-24,-24);
			//恢复
			game.ctx.restore(); 
		}
	});
})();