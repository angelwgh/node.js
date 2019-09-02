;
(function(window, factory) {
    factory(window)
})(this, function(window) {
    async function addScript(src) {
        var script = document.createElement('script')
        script.src = src
        document.body.appendChild(script)
        return await new Promise(resolve => {
            script.onload = () => {
                resolve()
            }
        })

    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
        return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    }

    console.log(234230)
    addScript('https://zhejiangjxjy.gaodun.com/player/jquery-1.9.1.min.js')
        .then(() => {
            const page = new Page()


        })

    class Page {
        constructor() {
            // this.param = {
            //     course_id: getQueryString('course_id'),
            //     order_id: getQueryString('order_id'),
            //     training_id: getQueryString('training_id')
            // }

            // this.token = getCookie('token')
            this.resetParam()
            this.render()
        }

        resetParam() {
            this.param = {
                course_id: getQueryString('course_id'),
                order_id: getQueryString('order_id'),
                training_id: getQueryString('training_id')
            }
            this.user_option = []
            this.token = getCookie('token')
        }
        async getData() {
            return new Promise(resolve => {
                $.ajax({
                    url: 'https://zhejiangjxjy.gaodun.com/api/v1/course/quizList',
                    type: 'post',
                    data: this.param,
                    headers: {
                        Authtoken: this.token,
                        Accept: 'application/json, text/plain, */*'
                    },
                    success: res => {

                        resolve(res)
                    }
                })
            })
        }

        render() {
            this.renderStyle()
            const $dom = $(`<div id="ly_answer">
                <a class="get-btn">获取答案</a>
                <a class="put-btn">提交答案</a>
                <a class="back" style="display: none" href="/member/learning"></a>
                <div class="single answer-list">
                    <div class="title">单选题</div>
                    <ul></ul>
                </div>
                <div class="many answer-list">
                    <div class="title">多选题</div>
                    <ul></ul>
                </div>
                <div class="judge answer-list">
                    <div class="title">判断题</div>
                    <ul></ul>
                </div>
                
            </div>`)
            $dom.appendTo($('body'))


            $dom.on('click', '.get-btn', () => {
                this.resetParam()
                this.getData()
                    .then(res => {
                        const { single, many, judge } = res.result.list.list

                        this.renderList('single', single)
                        this.renderList('many', many)
                        this.renderList('judge', judge)

                    })
            })

            $dom.on('click', '.put-btn', () => {
                const user_option = this.user_option.map(v => {
                    return {
                        question_id: v.question_id,
                        user_answer: v.answer
                    }
                })

                $.ajax({
                    url: 'https://zhejiangjxjy.gaodun.com/api/v1/course/quizcontent',
                    type: 'post',
                    headers: {
                        Authtoken: this.token,
                        Accept: 'application/json, text/plain, */*'
                    },
                    data: {
                        user_option,
                        ...this.param
                    },
                    success: res => {
                        console.log(res)
                        if (res.result.quiz_over === 1 && res.result.quiz_pass) {
                            alert('测试通过')

                            $('#ly_answer .back').click()

                            // location.href = '/member/learning'
                        }

                    }
                })
            })
        }

        renderList(name, list) {
            const $ul = $('#ly_answer .' + name + ' ul')
            this.user_option = this.user_option.concat(list)
            $ul.html('')
            for (let i = 0; i < list.length; i++) {
                $ul.append('<li>' + list[i].item_id + ':' + list[i].answer + '</li>')
            }

            //             course_id: "2906"
            // order_id: "172786"
            // training_id: "313"
            // user_option: Array(11)
            // 0:
            // question_id: "8105"
            // user_answer: "0"
        }

        renderStyle() {
            const style = `<style>
                #ly_answer{
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 400px;
                    background-color: #fff;
                    padding-top: 30px;
                }

                #ly_answer .get-btn,
                #ly_answer .put-btn{
                    display: block;
                    margin: 0 auto;
                    width: 80%;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    text-align: center;
                    line-height: 30px;
                    color: #666;
                    transition: 0.2s;
                    cursor: pointer;
                }

                #ly_answer .get-btn:active{
                    background-color: #f5f5f5;
                }

                #ly_answer .answer-list{
                    margin: 20px;
                    border: 1px solid #f1f1f1;
                }

                #ly_answer .answer-list .title{
                    margin: 0 15px;
                    font-size: 15px;
                    color: #333;
                    text-align: center;
                    line-height: 30px;
                    border-bottom: 1px solid #f5f5f5;
                }

                #ly_answer .answer-list ul{
                    padding: 10px;
                    display: flex;
                    flex-wrap: wrap;
                    
                }

                #ly_answer .answer-list ul li{
                    margin-right: 10px;
                    /* width: 20px; */
                    height: 25px;
                    line-height: 25px;
                    border: 1px solid #f5f5f5;
                    padding: 0 5px;
                    margin-bottom: 5px;
                }
            </style>`

            $('head').append($(style))
        }
    }

})