(function(){
    var socket = io.connect('http://www12139ui.sakura.ne.jp:3011');
    var userId = $('#userId').val();

    // init
    // eventList取得
    $(document).ready(function(){
        socket.emit('reqEventList', userId);
    });

    // eventListの描画
    var showEventList = function(eventList){
        for (var i = 0; i < eventList.length; i++) {
            var event = $('<li>').html(eventList[i].EventName);
            $('#eventList').append(event);
        }

        $("#eventList").listview('refresh');
    };


    //////////////////////////////////////
    // socket.on
    //////////////////////////////////////

    // EventListを取得して描画関数に渡す
    socket.on('resEventList', function(eventList){
        showEventList(eventList.events);
    });

})();
