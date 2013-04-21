(function(){
    var socket = io.connect('http://www12139ui.sakura.ne.jp');
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

function AppViewModel() {
    this.eventName = ko.observable("");
    this.date = ko.observable("");
    this.comment = ko.observable("");

    // イベント作成
    this.createEvent = function() {
        var event = $('<li>').html(this.eventName());
        $('#eventList').prepend(event);
        $("#eventList").listview('refresh');
    };
}
// Activates knockout.js
ko.applyBindings(new AppViewModel());

