(function(){
	var Scene = window.Scene = Class.extend({
		init:function(){
			this.bindEvent();
		},
		changeScene:function(numer){
			game.sceneNum = numer;
			if (numer === 0) {//游戏开始
				game.actors = [];
				game.fen = 0;
				game.background = new Background();
				game.land = new Land();
				this.titleImage = game.R["title"];
				this.titleY = -48;
				this.buttonPlay = game.R["button_play"];
				this.buttonPlayY = 520;
				this.buttonPlayX = 122;
			} else if(numer === 1){//游戏进行状态
				game.bird = new Bird();
			}else if (numer === 2) {//游戏死亡状态
				game.ctx.globalAlpha = 0;
				this.score_panel = game.R["score_panel"];
				this.score_panelX = 61;
				this.score_panelY = -126;
			};
		},
		show:function(){
			if (game.sceneNum === 0) {//
				_.each(game.actors,function(actor) {
					actor.render();//游戏没有开始前，仅仅渲染，不update
				});
				this.titleY+=10;//更新title
				if(this.titleY > 120){
					this.titleY = 120;
				};
				game.ctx.drawImage(this.titleImage,91,this.titleY,178,48);

				this.buttonPlayY-=20;//更新按钮
				if(this.buttonPlayY < 260){
					this.buttonPlayY = 260;
				};
				game.ctx.drawImage(this.buttonPlay,122,this.buttonPlayY,116,70);
			} else if(game.sceneNum === 1){//
				if (game.f % 50 === 0) {
					new Pipe();
				};
				_.each(game.actors,function(actor) {
					actor.update();
					actor.render();//游戏没有开始前，仅仅渲染，不update
				});
			}else if (game.sceneNum === 2) {//
				game.ctx.globalAlpha += 0.06;
				if (game.ctx.globalAlpha>1) {game.ctx.globalAlpha=1};
				game.bird.Y += 36;//鸟儿2瞬间下落
				_.each(game.actors,function(actor) {
					actor.render();//游戏没有开始前，仅仅渲染，不update
				});
				this.score_panelY += 20;
				game.ctx.drawImage(this.score_panel,61,this.score_panelY,238,136);
				if (this.score_panelY > 200) {
					this.score_panelY=200;
					game.ctx.fillText(game.fen,115,300);
				};
			};
		},
		bindEvent:function(){
			var self = this;
			game.canvas.onmousedown = function(event){
				var x = event.offsetX;
				var y = event.offsetY;
				
				if (game.sceneNum === 0) {
					if (x>self.buttonPlayX && x <self.buttonPlayX+116 && y > self.buttonPlayY && y < self.buttonPlayY+70) {
						self.changeScene(1);
					};
				}else if(game.sceneNum === 1) {
					game.bird.f = 0;
					game.bird.startY = game.bird.Y;
					game.bird.rotate = -1;
				}else if (game.sceneNum === 2) {
					self.changeScene(0);
				};
			};
		}
	});
})();