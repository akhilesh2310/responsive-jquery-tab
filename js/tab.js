$(document).ready(function () {

    // activate the tab using id.
    $('#responsiveTab').responsiveTab({
        breakpoint: 767,
        visibleTabIndex: 1,
        toggleTabMenu: '#toggle-tab'
    });
});


/// Custum function to create tab.
(function ($) {

    $.fn.responsiveTab = function (options) {

        // Establish our default settings
        var settings = $.extend({
            breakpoint: 767,
            visibleTabIndex: 1,
            toggleTabMenu: '#toggle-tab'
        }, options);

        return this.each(function () {
            var tabContainer = $(this),
                tabItem = $(this).children("ul").children("li"),
                tabContent = $(this).children(".tab-content"),
                tabReset = function () {
                    if ($(window).width() > parseInt(settings.breakpoint)) {
                        $(settings.toggleTabMenu).hide();
                        tabItem.css('width', 'auto');
                        tabItem.children("a").css('display', 'inline-block');
                        tabItem.closest("ul").show();
                    } else {
                        $(settings.toggleTabMenu).show();
                        tabItem.css('width', '100%');
                        tabItem.children("a").css('display', 'block');
                        tabItem.closest("ul").hide();
                    }
                }
            if (settings.visibleTabIndex) {
                var tabindex = parseInt(settings.visibleTabIndex) - 1;
                tabItem.removeClass('active');
                $(this).children("ul").children("li").eq(tabindex).addClass("active");
                tabContent.children(".tab-pane").removeClass("active");
                tabContent.children(".tab-pane").eq(tabindex).addClass("active");
            }
            if (settings.breakpoint) {
                tabReset();
                $(window).resize(function () {
                    tabReset();
                });
            }
            if (settings.toggleTabMenu) {
                $(settings.toggleTabMenu).on('click', function () {
                    tabItem.closest("ul").slideToggle();
                });
            }
            tabItem.on('click', function () {
                var tabIndex = $(this).index();
                tabItem.removeClass('active');
                $(this).addClass('active');
                tabContent.children('.tab-pane').removeClass('active').hide();
                $(this).closest(tabContainer).find(".tab-pane").eq(tabIndex).addClass('active').show();
            });

        });
    }

}(jQuery));