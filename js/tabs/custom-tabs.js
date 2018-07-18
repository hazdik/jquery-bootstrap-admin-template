$(function() {
	var tabs = $("#tabs2").tabs();
	var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='fa fa-times-circle'></span></li>";

	function findTab(id) {
		var tabIndex = tabs.find("[href=#tabs-" + id + "]").closest("li").index();
		return tabIndex;
	}

	function addTab(tabTitle, id) {
		var $li = $(tabTemplate.replace(/#\{href\}/g, "#tabs-" + id).replace(/#\{label\}/g, tabTitle));
		tabs.find(".nav").append($li);
		tabs.tabs("refresh");
	}

	$(".tabsmenu li a").each(function() {
		$(this).click(function() {
			var tabIndex = findTab(this.id);
			var tabTitle = this.innerText;

			//找到tab会返回li的位置index，没找到会返回-1，那就add
			if(tabIndex == -1) {
				addTab(tabTitle, this.id);
				tabIndex = findTab(this.id);
			}
			//将tab转换到正确的位置上
			tabs.tabs("option", "active", tabIndex);
			//sliderbar的active转换
			$(this).parent().parent().find("li").removeClass("active");
			$(this).parent().addClass("active");
		});

	});

	$("#tabs2").on("click", 'span.fa-times-circle', function() {
		var panelId = $(this).closest("li");
		panelId.remove();
		tabs.tabs("refresh");
	});
})