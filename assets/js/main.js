function toggleMenu() {
  var nav = document.getElementsByClassName("site-header-nav")[0];
  if (nav.style.display == "inline-flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "inline-flex";
  }
}

jQuery(function() {
  // 回到顶部
  function toTop () {
    var $toTop = $(".gotop");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= $(window).height()) {
        $toTop.css("display", "block").fadeIn();
      } else {
        $toTop.fadeOut();
      }
    });

    $toTop.on("click", function (evt) {
      var $obj = $("body,html");
      $obj.animate({
        scrollTop: 0
      }, 240);

      evt.preventDefault();
    });
  }

  toTop();
});
/* 为文章添加首行缩进 */
document.addEventListener("DOMContentLoaded", function () {
  var brElements = document.querySelectorAll("body > section.container.content > br")
  brElements.forEach(function (br) {
    var nextElement = br.nextSibling;
    if (nextElement && nextElement.nodeType === Node.TEXT_NODE) {
      var span = document.createElement("span");
      classList.add("first-line-indent");
      span.textContent = nextElement.nodeValue.trim();
      nextElement.parentNode.insertBefore(span, nextElement);
      nextElement.parentNode.removeChild(nextElement);
    }
  });
});
