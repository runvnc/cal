var clndr = {};

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}

$( function() {
  var loadEvents = localStorage.getObject('events');
  console.log(loadEvents);
  if (loadEvents && loadEvents.hasOwnProperty('length')) {
    var events = loadEvents; 
  } else {
    var events = [
      { id: 1, date: '2015-08-03', title: 'Cliffs AP Bio Notes Chapter 1' },
      { id: 2, date: '2015-08-04', title: 'Cliffs AP Bio Notes Chapter 2'},
      { id: 3, date: '2015-08-06', title: 'Cliffs AP Bio Notes Chapter 3' },
      { id: 4, date: '2015-08-07', title: 'Cliffs AP Bio Notes Chapter 4' }
    ];
  };

  function removeEvent(id) {
    var index = -1;
    for (var i=0; i<events.length; i++) {
      if (events[i].id == id) {
        index = i;
      }
    }
    events.splice(index, 1);
    localStorage.setObject('events', events);
  };

  function render() {
    clndr = $('#full-clndr').clndr({
      template: $('#full-clndr-template').html(),
      events: events,
      forceSixRows: true,
      doneRendering: function() {
        $('.del').click(function() {
          removeEvent($(this).data('id'));
          clndr.setEvents(events);
        });
      } 
    });
  }

  render();
});
