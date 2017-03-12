(function(){
	var Game = window.Game = Class.extend({
		init:function(paras){
			this.canvas = document.getElementById(paras.id);
			this.ctx = this.canvas.getContext("2d");
			this.ajaxUrl = paras.ajaxUrl;//ajax请求网址
			this.dataObj = null;//请求回来的json对象
			this.R = {};//用于存放每次new的image对象k:image
			this.f = 0;
			this.sceneNum = 0;
			this.actors = [];
			this.fen = 0;//分数
			var self = this;
			this.loadResuorce(function(){//ajax加载资源,回调开启主循环
				self.start();//职责链w
			});
		},
		loadResuorce:function(fn){
			this.ctx.font = "20px 微软雅黑";
			this.ctx.textAlign = "center";
			this.ctx.fillText("正在加载图片...",this.canvas.width/2,this.canvas.height*(1-0.618));
			var self = this,imgAmount=0,count=0;//图片数量，计数器
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if (xhr.readyState === 4){
					var status = xhr.status;
					if (status >= 200 && status < 300 || status === 304) {
						self.dataObj = JSON.parse(xhr.responseText);
						for(var k in self.dataObj){
							imgAmount++;
							var img = new Image();
							img.src = "images/"+ self.dataObj[k];
							self.R[k] = img;
							img.onload = function(){
								count++;
								self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
								self.ctx.fillText("正在加载图片"+count+"/"+imgAmount,self.canvas.width/2,self.canvas.height*(1-0.618));
								if (count === imgAmount) {
									fn && fn.call(self);//由window改为canvas
								};
							};
						};
					};
				};
			};
			xhr.open("get",this.ajaxUrl,true);
			xhr.send(null);
		},
		start:function(){
			var self = this;
			self.scene = new Scene();
			self.scene.changeScene(self.sceneNum);
			this.timer = setInterval(function(){
				self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
				self.scene.show();
				self.f++;
				// _.each(self.actors,function(actor) {
				// 	actor.update();
				// 	actor.render();
				// });
			}, 20);
		}
	});
})();