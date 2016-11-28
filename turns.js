/*----------轮播----------*/
$(function () {
    {
        let banner = $(".bannermain");
        let li = banner.find("li");
        let dot = $(".round a");
        {
            let banner_config = {
                num: 4,      //轮播图数量
                time: 3000,  //动画时间
                banner: li,   //对应的各个图片外层节点
                index: dot    //下方的索引点
            };
            let i = 0;
            let timer;

            //鼠标进出事件
            banner.on({
                mouseenter: function () {
                    $(".arrow_prev,.arrow_next").fadeTo("show", 0.5);
                    clearInterval(timer);
                },
                mouseleave: function () {
                    $(".arrow_prev,.arrow_next").fadeTo("show", 0);
                    start();
                }
            });
            //前后箭头点击事件
            $(".arrow_prev").click(function () {
                if (i > 0) {
                    banner_config.banner.eq(i).animate({
                        opacity: 0,
                    }, 400, function () {
                        li.eq(i).index = 0
                    });
                    banner_config.index.eq(i).removeClass("on");
                    banner_config.index.eq(i - 1).addClass("on");
                    banner_config.banner.eq(i - 1).animate({
                        opacity: 1,
                    }, 400, function () {
                        banner_config.banner.eq(i).index = 1
                    });
                    i--;
                } else {
                    banner_config.banner.eq(i).animate({
                        opacity: 0,
                    }, 400, function () {
                        banner_config.banner.eq(i).index = 0
                    });
                    banner_config.index.eq(i).removeClass("on");
                    banner_config.index.eq(banner_config.num - 1).addClass("on");
                    banner_config.banner.eq(banner_config.num - 1).animate({
                        opacity: 1,
                    }, 400, function () {
                        banner_config.banner.eq(i).index = 1
                    });
                    i = banner_config.num - 1;
                }
            });
            $(".arrow_next").click(function () {
                move();
            });
            //index的点击事件

            $(".round a").hover(function (event) {
                let number = $(".round a").index(event.target);
                if (i != number) {            //目标是当前不进行切换
                    animate(i, number);
                    i = number;
                }
            }, function () {
            });

            //计时器
            function start() {
                timer = setInterval(function () {
                    move();
                }, banner_config.time)
            }
            //切换动画
            function animate(from, to) {
                banner_config.banner.eq(from).animate({
                    opacity: 0,
                }, 400, function () {
                    banner_config.banner.eq(from).css("z-index", 0)
                });
                banner_config.index.eq(from).removeClass("current");
                banner_config.index.eq(to).addClass("current");
                banner_config.banner.eq(to).animate({
                    opacity: 1,
                }, 400, function () {
                    banner_config.banner.eq(to).css("z-index", 1)
                });
            }

            function move() {
                if (i < banner_config.num - 1) {
                    animate(i, i + 1);
                    i++;
                } else {
                    animate(i, 0);
                    i = 0;
                }
            }

            start();
        }
    }
});
