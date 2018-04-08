//tab
(function($){

	var Tab=function(tab){
		var _this_=this;
		//保存單個tab組件
		this.tab=tab;
		//默認配置參數
		this.config={
			'triggerType':'click',
			'effect':'fade',
			'invoke':2,
			'auto':10000
		}
		//如果配置參數存在,就況展默認的參數
		if(this.getConfig()){
			$.extend(this.config,this.getConfig());
		}
		//保存TAB標籤列表 對應的內容列表
		this.tableItems=this.tab.find('ul.tab-nav li');
		this.contentItems=this.tab.find('div.content-wrap .content-item');

		//保存配置參數
		var config=this.config;

		if(config.triggerType === 'click'){
			this.tableItems.bind(config.triggerType,function(){
				_this_.invoke($(this));
			})
		}else if(config.triggerType === 'mouseover' || config.triggerType != 'click'){
			this.tableItems.mouseover(function(){
				_this_.invoke($(this));
				console.log(11)
			})
		};

		//自動切換功能 當配置的時間 就根據時間間隔進行切換
		if(config.auto){

			//定義一個全局的定時器
			this.timer=null;
			//計數器
			this.loop=0;

			this.autoPlay();

			this.tab.hover(function(){
				window.clearInterval(_this_.timer)
				console.log(1)
			},function(){
				_this_.autoPlay();
				console.log(2)
			})

		};

		//設置默認顯示第幾個tab

		if(config.invoke>1){
			this.invoke(this.tableItems.eq(config.invoke-1));
		}

	};

	Tab.prototype={
		//自動間隔切換
		autoPlay:function(){

			var _this_=this,
				tabItems=this.tableItems,
				tabLength=tabItems.length,
				config=this.config;

			this.timer=window.setInterval(function(){

				_this_.loop++;

				if(_this_.loop>=tabLength){
					_this_.loop=0;
				}

				tabItems.eq(_this_.loop).trigger(config.triggerType)

			},config.auto)

		},
		//事件驅動函數
		invoke:function(currentTab){
			var _this_=this;

			//要執行tab的選中狀態 當前選中的加上actived
			//切換對應的tab內容 要根據配置參數的effect進行效果
			var index=currentTab.index();
			//tab選中狀態
			currentTab.addClass('actived').siblings().removeClass('actived');
			//切換對應的內容區域
			var effect=this.config.effect;
			var conItems=this.contentItems;
			if(effect === 'default' || effect != 'fade'){
				conItems.eq(index).addClass('current').siblings().removeClass('current');
			}else if(effect === 'fade'){
				conItems.eq(index).fadeIn().siblings().fadeOut();
			};

			//注意：如果配置了自動切換,記得把當前的loop的直設置當前tab的index

			if(this.config.auto){
				this.loop=index;
			}

		},
		//獲取配置參數
		getConfig:function(){
			//獲取tab elem節點上的data-config
			var config=this.tab.attr('data-config');
			//確保有配置參數
			if(config && config != ''){
				return $.parseJSON(config);
			}else{
				return null;
			}
		}
	};

	Tab.init=function(tabs){

		var _this_=this;
		tabs.each(function(){

			new _this_($(this));

		});
	};

	//註冊為jq方法

	$.fn.extend({
		tab:function(){
			this.each(function(){

				new Tab($(this));

			})
			return this;
		}
	})

	window.Tab=Tab;
})(jQuery)