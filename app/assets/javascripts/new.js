$('.availabilities-slot').click(function(){
  $(this).toggleClass('active');
  console.log($(this).data('time'));
  console.log($(this).data('date'));
});

var available_slots = $('.availabilities-slot.active')
console.log(available_slots.length)
