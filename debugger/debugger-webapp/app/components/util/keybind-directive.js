(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    };
})(jQuery);

(function ($, undefined) {
  $.fn.setCursorPosition = function(selectionStart, selectionEnd) {
    if(!selectionEnd) {
      selectionEnd = selectionStart;
    }
    var el = $(this).get(0);

    if (el.setSelectionRange) {
      el.focus();
      el.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (el.createTextRange) {
      var range = el.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  };

})(jQuery);

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

angular
.module('app')
.directive('ngEnter', function() {
  return function(scope, element, attrs) {

    var rows = 0;

    function getCursorPos() {
      var pos = element.val().length;
      if('selectionStart' in element) {
        pos = el.selectionStart;
      } else if('selection' in document) {
        element.focus();
        pos = document.selection.createRange();
      }
      return pos;
    }

    function addRow() {
      var cpos = element.getCursorPosition();
      var textContent = element.val();
      textContent = [textContent.slice(0, cpos), "\n", textContent.slice(cpos)].join('');
      element.val(textContent);
      element.setCursorPosition(cpos+1);
      element.attr("rows", ++rows);
    }

    addRow();

    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        if(!event.shiftKey) {
          
          scope.$apply(function(){
            scope.$eval(attrs['ngEnter'], {'event': event});
          });

        } else {
          addRow();

        }

        event.preventDefault();
      }
    });
  };
});
