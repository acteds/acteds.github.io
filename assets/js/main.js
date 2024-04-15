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
  var brElements = document.querySelectorAll("body > section.container.content .article-content.markdown-body p > br");
  brElements.forEach(function (br) {
    deleteRedundantEmptyTextNodes(br.parentNode);
    var nextElement = br.nextSibling;
    if (nextElement) {
      // if ( nextElement.nodeType === Node.TEXT_NODE ) {
      //   var span = document.createElement("span");
      //   span.classList.add("first-line-indent");
      //   span.textContent = nextElement.nodeValue.trim();
      //   nextElement.parentNode.insertBefore(span, nextElement);
      //   nextElement.parentNode.removeChild(nextElement);
      // } else if (nextElement.nodeType === Node.ELEMENT_NODE) {
        var span = document.createElement("span");
        span.innerHTML = "&emsp;&emsp;";/* 缩进2字符*/
        span.style.userSelect = "none";/* 被复制时不被选中*/
        nextElement.parentNode.insertBefore(span, nextElement);
      // }
    }
  });
  /**
   * 删除多余的空文本节点,为nextSibling,等节点操作一致性做准备
   * @param elem 要优化的父节点
   */
  function deleteRedundantEmptyTextNodes(elem) {
    let elemList = elem.childNodes;
    for (let i = 0; i < elemList.length; i++) {
      /*当为文本节点并且为不可见字符时删除节点*/
      if (elemList[i].nodeName === "#text" && /^\s+$/.test(elemList[i].nodeValue)) {
        elem.removeChild(elemList[i])
      }
    }
  }
});
