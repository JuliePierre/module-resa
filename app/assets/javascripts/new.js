var available_slots = [];

$('.availabilities-slot.active').each(function(i, slot){
  // console.log('toto');
  // console.log($(slot));
  var date = $(slot).data('date');
  var year = date.split(",")[0];
  var month = date.split(",")[1];
  var day = date.split(",")[2];
  var time = $(slot).data('time');
  var hour = time.split(":")[0];
  var minutes = time.split(":")[1];
  available_slot = new Date(year, month - 1, day, hour, minutes);
  // console.log(available_slot);
  available_slots.push(available_slot);
  console.log(available_slots);
});

$('.availabilities-slot').click(function(){
  $(this).toggleClass('active');
  if ($(this).hasClass('active')){
    // create a Date object from date and time
    var date = $(this).data('date');
    var year = date.split(",")[0];
    var month = date.split(",")[1];
    var day = date.split(",")[2];
    var time = $(this).data('time');
    var hour = time.split(":")[0];
    var minutes = time.split(":")[1];
    available_slot = new Date(year, month - 1, day, hour, minutes);
    available_slots.push(available_slot);
    // old version
    // available_slots.push($(this).data('date'));
    // console.log($(this));
    // console.log(available_slots);
  };
  if (!$(this).hasClass('active')){
    var selection  = $(this);
    var date = selection.data('date');
    var year = date.split(",")[0];
    var month = date.split(",")[1];
    var day = date.split(",")[2];
    var time = selection.data('time');
    var hour = time.split(":")[0];
    var minutes = time.split(":")[1];
    var date_to_remove = new Date(year, month - 1, day, hour, minutes);
    var index = available_slots.map(Number).indexOf(+date_to_remove);
    available_slots.splice(index, 1);
  };
});

$('#validation-calendrier').click(function(){
  console.log(available_slots);
  var availabilities = JSON.stringify(available_slots);
  console.log(availabilities);
  $.ajax({
    type: "POST",
    url: "/calendar/",
    data: {my_data: availabilities},
    success: function(data) {
      console.log('Success');
    }
  });
});

///////////////// 2ème version avec Ajax dès click ////////////

// $('.availabilities-slot').click(function(){
//   $(this).toggleClass('active');
//   if ($(this).hasClass('active')){
//     var selection  = $(this);
//     var date = selection.data('date');
//     var year = date.split(",")[0];
//     var month = date.split(",")[1];
//     var day = date.split(",")[2];
//     var time = selection.data('time');
//     var hour = time.split(":")[0];
//     var minutes = time.split(":")[1];
//     var date_to_add = new Date(year, month - 1, day, hour, minutes);
//     console.log(date_to_add);
//     $.ajax({
//       type: "POST",
//       url: "/calendar/",
//       data: {date: date_to_add},
//       success: function(data) {
//         console.log('Success');
//       }
//     });
//   };
//   if (!$(this).hasClass('active')){
//     var selection  = $(this);
//     var date = selection.data('date');
//     var year = date.split(",")[0];
//     var month = date.split(",")[1];
//     var day = date.split(",")[2];
//     var time = selection.data('time');
//     var hour = time.split(":")[0];
//     var minutes = time.split(":")[1];
//     var date_to_remove = new Date(year, month - 1, day, hour, minutes);
//     console.log(date_to_remove);
//   };
// });




























