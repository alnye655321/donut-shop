(function () {

  console.log('sanity check!');

})();

//add new employee
$(document).on('click', '.employee-add', function() {
  const $newEmployeeFirstName = $('#newEmployeeFirstName').val();
  const $newEmployeeLastName = $('#newEmployeeLastName').val();
  const $newEmployeeEmail = $('#newEmployeeEmail').val();
  const payload = {
    first_name: $newEmployeeFirstName,
    last_name: $newEmployeeLastName,
    email: $newEmployeeEmail
  };
  $.ajax({
    type: 'POST',
    url: '/employees',
    data: payload
  })
  .done((data) => {
    location.reload();
  })
  .fail((err) => {
    console.log(err);
  });
});

//fill in edit employee modal
$(document).on('click', '.employee-edit', function() {
  const $this = $(this);
  const employeeID = $this.attr('data-id');
  const first_name = $this.attr('data-first_name');
  const last_name = $this.attr('data-last_name');
  const email = $this.attr('data-email');
  $('#update-employee-first_name').val(first_name);
  $('#update-employee-last_name').val(last_name);
  $('#update-employee-email').val(email);
  $('#update-employee-id').val(employeeID);
});

// submit edit employee modal form
$(document).on('submit', '#modal-employee-form', function(event) {
  event.preventDefault();
  const $first_name = $('#update-employee-first_name').val();
  const $last_name = $('#update-employee-last_name').val();
  const $email = $('#update-employee-email').val();
  const employeeID = $('#update-employee-id').val();
  const payload = {
    first_name: $first_name,
    last_name: $last_name,
    email: $email
  };
  $.ajax({
    type: 'PUT',
    url: '/employees/' + employeeID,
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

// delete employee button
$(document).on('click', '.employee-delete', function() {
  const answer = confirm('Are you sure?');
  if (answer) {
    const $this = $(this);
    const employeeID = $this.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/employees/${employeeID}`
    })
    .done((data) => {
      location.reload();
    })
    .fail((err) => {
      console.log(err);
    });
  }
});
