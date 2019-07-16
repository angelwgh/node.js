(function (window, factory) {
	factory(window)
})(this, function () {
	var id = 'adawdawdaw'
	var id_1 = 'sdfgfgdsg'
	var id_2 = "dfgrtgbdsrt"
	

	function addScript(src, cb) {
		var script = document.createElement('script')
		script.src = src
		script.onload = ()=>{cb()}
		document.body.appendChild(script)
	}


	addScript('https://zhejiangjxjy.gaodun.com/player/jquery-1.9.1.min.js',
		function () {

			var page = new Page()
		})


	function Page() {
		this.opt = {
			runing: false,
			num_1:0,
			num_2:0
		}
		this.init()
	}

	Page.prototype = {
		init: function () {

			this.$ctrl = $('#' + id);

			if (this.$ctrl.length == 0){
				this.$ctrl = this.createCtrl()
			}

			
		},

		createCtrl: function () {
			var $ctrl = $(`<div id="${id}">
						<button>开始</button>
						<button>暂停</button>
						<div class="l l-1">监听时间：<span id="${id_1}">00:00:00</span></div>
						<div class="l l-2">答题次数：<span id="${id_2}">0</span></div>
					</div>`)

			$ctrl.appendTo($('body'))

			var $style = $(`<style>
					#${id}{
						position: fixed;
						top: 0;
						left: 50%;
						width: 200;
						height: 100;
						z-index: 999;
						padding: 10px;
						background-color: rgb(40,41,35)
					}

					#${id} button{
						border: none;
					    background-color: #FFF;
					    width: 100px;
					    float: left;
					    height: 30px;
					    color: #fff;
					    cursor: pointer;
					    font-size: 16px;
					    border-radius: 5px 0 0 5px;
					    transition: 0.2s;
					    background-color: #67C23A;
					}

					#${id} button:nth-of-type(2){
						border-radius: 0 5px 5px 0;
						background-color:#F56C6C
					}

					#${id} button:active{
						opacity: 0.8;
					}

					#${id} .l{
						clear:both;
						color: #fff;
						height:30px;
						line-height:30px;
						font-size: 15px;
					}
				</style>`)
			.appendTo($('head'))
			$ctrl.on('click','button',  (e) => {
				this.handleClick(e)
			})
		},

		handleClick: function (e) {
			var $this = $(e.target)
			if($this.index() == 0){
				if(this.opt.runing){
					return
				}
				this.opt.runing = true
				this.listenAnswer()
			}else{
				this.opt.runing = false
			}
			
		},


		listenAnswer: function () {
			setTimeout(() => {
				if(!this.opt.runing){
					return false
				}
				var _win = window.frames[0]
				var _doc = _win.document;
				// var time = new Date()
				this.opt.num_1 ++;

				$('#' + id_1).text(this.handlerTime())
				if($('.answer input', _doc).length > 0){
					$('.answer input', _doc).eq(0).click()
					$('.submit-answer', _doc)[0].click()
					// this.opt.num_2++
					$('#' + id_2).text(++this.opt.num_2)
					setTimeout( () => {
						this.listenAnswer()
					}, 2000)
				}else {
					this.listenAnswer()
				}
			}, 1000)
		},

		handlerTime: function (time) {
			var num = this.opt.num_1;

			var s = timeNum(num % 60);
			var m = timeNum((num - s) / 60 % 60)
			var h = timeNum((num - m * 60 - s) / 3600 )


			function timeNum(num) {
				num = num < 0 ? 0 : num
				return num < 10 ? '0' + num : num + ''
			}

			return h + ':' + m + ':' + s
		}


	}

})
