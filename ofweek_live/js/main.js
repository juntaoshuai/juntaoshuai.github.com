jQuery(function($) {
    (function() {
        //'use strict';
        //轮换图
        var index = 1;
        var len = $("#banner_list li").length;
        $("#banner_list li:not(:first-child)").hide();

        function show() {
            $("#banner_list li").eq(index).fadeIn(1000).siblings("li").fadeOut(1000);
            $("#dot_list li").eq(index).addClass("active").siblings("li").removeClass("active");
            index++;
            if (index > len - 1) {
                index = 0;
            }
        }
        var timer = setInterval(show, 4000);
        $("#banner_list").hover(function() {
            clearInterval(timer);

        }, function() {
            timer = setInterval(show, 4000);
        });

        $("#dot_list li").click(function() {
            index = $(this).index();
            $("#banner_list li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
            $(this).addClass("active").siblings().removeClass("active");
        });

    })();

    //右侧固定悬浮
    var rightfix = function() {
        var rtop = $(".main_right ").offset().top;
        $(window).scroll(function() {
            if ($(this).scrollTop() > rtop) {
                $(".main_right").addClass("fix");
            } else {
                $(".main_right").removeClass("fix");

            }
        });

    }
    rightfix();


    //下拉加载 
    var dropDwonLoad = function() {
        var $more = $("#js-more"),
            loading = true,
            pageIndex = 1,
            html = "";

        function getListData(pageIndex) {
            $.ajax({
                url: "js/live.txt?pageIndex=" + pageIndex, //http://www.ofweek.com/onlivemeetingajax.do
                dataType: 'json',
                success: function(data) {

                    if (!data.length) {
                        $more.remove(); //没有数据则移除更多按钮
                        return; //如果没有数据则返回
                    }
                    html = "";

                    for (var i in data) {
                        for (var j in data[i]) {
                            html += '<dl>';
                            html += '<dt class="fl">';
                            html += '<a href="" target="_blank"><img src=' + data[i][j].coverImgUrl + '></a>';
                            html += '<i></i>';
                            if (data[i][j].lecturer) {
                                if (data[i][j].status == 0) { //在线研讨会
                                    html += '<span>直播预告</span>';

                                } else if (data[i][j].status == 1) {
                                    html += '<span>直播中</span>';

                                } else if (data[i][j].status == 2) {
                                    html += '<span>直播结束</span>';

                                }

                            } else { //在线展会
                                if (data[i][j].status == 0) {
                                    html += '<span>直播预告</span>';

                                } else if (data[i][j].status == 2) {
                                    html += '<span>直播中</span>';

                                } else if (data[i][j].status == 4) {
                                    html += '<span>直播结束</span>';
                                }

                            }
                            html += '</dt>';
                            html += '<dd class="fr">';
                            html += '<h3><a href="http://expo.ofweek.com/Libattery_NEV/ " target="_blank">' + data[i][j].name + '</a></h3>';
                            html += '<div class="timeshare">';
                            if (data[i][j].endTime) {
                                html += '<strong>' + data[i][j].startTime + ' - ' + data[i][j].endTime + '</strong>';

                            } else {
                                html += '<strong>' + data[i][j].startTime + '</strong>';

                            }
                            html += '<div class="jiathis_style fr liveshare">';
                            html += '</div>';
                            html += '</div>';
                            if (data[i][j].lecturer) {
                                html += '<p class="zhujiang">';
                                html += '<span>主办公司：' + data[i][j].company + '</span>';
                                html += '<span>&nbsp;主讲人：' + data[i][j].lecturer + '</span>';
                                html += '</p>';
                            }

                            html += '<p>';
                            html += data[i][j].summary;
                            if (data[i][j].lecturer) {
                                html += '<a href="http://webinar.ofweek.com/activityDetail.action?activity.id=10657384&user.id=2" target="_blank">详细</a>';
                            } else {
                                html += '<a href="" target="_blank">详细</a>';
                            }
                            html += '</p>';
                            html += '<div class="opera">';
                            html += '<a href="http://expo.ofweek.com/audience/gotoRegisterExhibition.xhtml " class="red_btn" target="_blank">观众登记</a>';
                            html += '</div>';
                            html += '</dd>';
                            html += '</dl>';

                        }

                    }

                    $(html).hide().insertBefore($more).fadeIn(800);
                    $more.html("更多").removeClass("loading");
                    loading = true;

                }

            });

        }
        getListData(pageIndex);

        $(window).scroll(function() {

            if ($(this).scrollTop() + $(window).height() >= $more.offset().top + $more.outerHeight() && loading) {
                $more.html("<span>加载中</span>").addClass("loading");
                loading = false; //防止加载多次
                pageIndex++;
                getListData(pageIndex);

            };
        });

    }

    dropDwonLoad();







})
