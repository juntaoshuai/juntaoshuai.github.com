/**
 * 
 * @shuaijuntao (you@example.org)
 * @date    2016-09-01 09:58:30
 * @version $Id$
 */
$(function() {
    //下拉列表整体操作
    var pulldown = function() {
        $(".pulldown").click(function() {
            $(this).next().show();
            return false;
        });

        $(".pulldown-list li").click(function() {
            var id = $(this).data("id");
            $(this).closest(".pulldown-box").find(".select-txt").html($(this).html());
            $(this).parent().hide();
            if (id) {
                $(this).parent().next(":hidden").val(id);
            } else {
                $(this).parent().next(":hidden").val($(this).html());
            }
        });

        $(document).click(function() {
            $(".pulldown-list").hide();
        });

    }

    pulldown();













});
