var available_slots = [];
var dates_to_remove = [];

$('.availabilities-slot.active').each(function(i, slot){
  // console.log('toto');
  // console.log($(slot));
  var date = $(slot).data('date');
  var datetime = $(slot).data('time');
  available_slot = new Date(datetime);
  // ATTENTION : AVAILABLE SLOT A UNE HEURE DE PLUS QUE CE QUI EST AFFICHÉ MAIS POUR AFFICHAGE, PAS UN PROBLEME
  console.log(available_slot);
  available_slots.push(available_slot);
  // console.log(available_slots);
});

$('.availabilities-slot').click(function(){
  $(this).toggleClass('active');
  if ($(this).hasClass('active')){
    // create a Date object from date and time
    var date = $(this).data('date');
    var datetime = $(this).data('time');
    available_slot = new Date(datetime);
    console.log(available_slot);
    available_slots.push(available_slot);
    console.log(available_slots);
  };
  if (!$(this).hasClass('active')){
    // si on clique sur un slot actif c'est que l'on n'en veut plus --> on l'enlève du tableau "availability"
    var selection  = $(this);
    var date = selection.data('date');
    var datetime = selection.data('time');
    var date_to_remove = new Date(datetime);
    var index = available_slots.map(Number).indexOf(+date_to_remove);
    available_slots.splice(index, 1);

    // on le supprime également de la base de données car il y a peut-être déjà été ajouté
    console.log(date_to_remove);
    dates_to_remove.push(date_to_remove);
    console.log(dates_to_remove)
  };
});

$('#validation-calendrier').click(function(){
  // console.log(available_slots);
  var availabilities = JSON.stringify(available_slots);
  var availabilities_to_remove = JSON.stringify(dates_to_remove);
  // console.log(availabilities);
  $.ajax({
    type: "POST",
    url: "/calendar/",
    data: {my_data: availabilities, to_remove: availabilities_to_remove},
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




























