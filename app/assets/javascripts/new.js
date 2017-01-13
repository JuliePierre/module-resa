var available_slots = [];
var dates_to_remove = [];

$('.availabilities-slot.active').each(function(i, slot){
  var date = $(slot).data('date');
  var datetime = $(slot).data('time');
  available_slot = new Date(datetime);
  // ATTENTION : AVAILABLE SLOT A UNE HEURE DE PLUS QUE CE QUI EST AFFICHÉ MAIS POUR AFFICHAGE, PAS UN PROBLEME
  available_slots.push(available_slot);
});

$('.availabilities-slot').click(function(){
  $(this).toggleClass('active');
  if ($(this).hasClass('active')){
    // create a Date object from date and time
    var date = $(this).data('date');
    var datetime = $(this).data('time');
    available_slot = new Date(datetime);
    available_slots.push(available_slot);
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
    dates_to_remove.push(date_to_remove);
  };
});

$('#validation-calendrier').click(function(){
  var availabilities = JSON.stringify(available_slots);
  var availabilities_to_remove = JSON.stringify(dates_to_remove);
  $.ajax({
    type: "POST",
    url: "/calendar/",
    data: {my_data: availabilities, to_remove: availabilities_to_remove},
    success: function(data) {
      console.log('Success');
    }
  });
  $('.availabilities-slot.active').addClass('green-bg');
  $('.availabilities-slot').not('active').addClass('dark-grey-bg');
});

