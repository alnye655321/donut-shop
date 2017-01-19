(function () {

  console.log('sanity check!');

})();

//click of open update modal
$(document).on('click', '.update-shop-btn', function() {
  const $this = $(this);
  const shopID = $this.attr('data-id');
  console.log(shopID);
  const city = $this.attr('data-city');
  const name = $this.attr('data-name');
  $('#update-shop-name').val(name);
  $('#update-shop-city').val(city);
  $('#update-shop-id').val(shopID);
});

// submit edit shop form
$(document).on('submit', '#modal-shop-form', function(event) {
  event.preventDefault();
  const $name = $('#update-shop-name').val();
  const $city = $('#update-shop-city').val();
  const shopID = $('#update-shop-id').val();
  const payload = {
    name: $name,
    city: $city
  };
  $.ajax({
    type: 'PUT',
    url: '/' + shopID,
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

// submit new shop form
$(document).on('submit', '#modal-newshop-form', function(event) {
  event.preventDefault();
  const $name = $('#new-shop-name').val();
  const $city = $('#new-shop-city').val();
  const payload = {
    name: $name,
    city: $city
  };
  $.ajax({
    type: 'POST',
    url: '/',
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

// delete shop button
$(document).on('click', '.delete-shop-btn', function() {
  const answer = confirm('Are you sure?');
  if (answer) {
    const $this = $(this);
    const shopID = $this.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/${shopID}`
    })
    .done((data) => {
      location.reload();
    })
    .fail((err) => {
      console.log(err);
    });
  }
});
