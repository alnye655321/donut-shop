//add new donut
$(document).on('click', '.donut-add', function() {
  const $newDonutName = $('#newDonutName').val();
  const $newDonutTopping = $('#newDonutTopping').val();
  const $newDonutPrice = $('#newDonutPrice').val();
  const payload = {
    donut_name: $newDonutName,
    topping: $newDonutTopping,
    price: $newDonutPrice
  };
  $.ajax({
    type: 'POST',
    url: '/donuts',
    data: payload
  })
  .done((data) => {
    location.reload();
  })
  .fail((err) => {
    console.log(err);
  });
});

//fill in edit donut modal
$(document).on('click', '.donut-edit', function() {
  const $this = $(this);
  const donutID = $this.attr('data-id');
  const topping = $this.attr('data-topping');
  const name = $this.attr('data-name');
  const price = $this.attr('data-price');
  $('#update-donut-name').val(name);
  $('#update-donut-topping').val(topping);
  $('#update-donut-price').val(price);
  $('#update-donut-id').val(donutID);
});

// submit edit donut modal form
$(document).on('submit', '#modal-donut-form', function(event) {
  event.preventDefault();
  const $name = $('#update-donut-name').val();
  const $price = $('#update-donut-price').val();
  const $topping = $('#update-donut-topping').val();
  const donutID = $('#update-donut-id').val();
  const payload = {
    name: $name,
    price: $price,
    topping: $topping
  };
  $.ajax({
    type: 'PUT',
    url: '/donuts/' + donutID,
    data: payload
  })
  .done((data) => {
    $('#myModal').modal('toggle');
    location.reload();
  })
  .fail((err) => {
    console.log(err);
  });
});

// delete donut button
$(document).on('click', '.donut-delete', function() {
  const answer = confirm('Are you sure?');
  if (answer) {
    const $this = $(this);
    const donutID = $this.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/donuts/${donutID}`
    })
    .done((data) => {
      location.reload();
    })
    .fail((err) => {
      console.log(err);
    });
  }
});
