$(document).ready(function() {

  var message = $( "#message" );

  var start = $( "#start" );
  var stop = $( "#stop" );
  var pathInput = $( "#path" );

  start.click(handleClick);
  stop.click(handleClick);

  function handleClick(event) {
    event.preventDefault();
    var type = this.getAttribute('id');
    var path = pathInput.val();
    if (!path) {
      message.html('Path is not setted');
      message.addClass('warn');
      return;
    }

    pathInput.val('');

    $.ajax({
      type: "POST",
      url: '/watcher/' + type,
      data: JSON.stringify({'path': path, 'type': type}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: successFunc,
      error: errorFunc
    });
    
    function successFunc(data) {
      message.html(data.message);
      data.status == 500 ? message.addClass('warn') : message.removeClass('warn');
    }
    
    function errorFunc(e) {
      console.log(e);
      message.html(e.responseJSON.error || e.responseJSON.message);
      message.addClass('warn');
    }
  }

});
