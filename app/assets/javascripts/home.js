$('#calendar').fullCalendar({});

$('.fc-day-top').click(function() {
  var objet = $(this);
  console.log(objet);
  var date_selectionnee = $(this).data('date');
  console.log(date_selectionnee);
  $(this).toggleClass('blue');
});

$('.datepicker').pickadate()
$('.timepicker').pickatime({
  format: 'HH:i',
  interval: 60,
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 15 // Creates a dropdown of 15 years to control year
})
