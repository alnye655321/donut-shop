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

  var checkedEmployees = [];
  var checkedDonuts = [];

//get all checked emploees from list
  var employeesList = document.getElementById("employees-list").getElementsByTagName("li");
  for (var i = 0; i < employeesList.length; i++) {
    if (employeesList[i].classList.contains("active")) {
      checkedEmployees.push(employeesList[i].innerText);
    }
  }
//get all checked donuts from list
  var donutsList = document.getElementById("donuts-list").getElementsByTagName("li");
  for (var i = 0; i < donutsList.length; i++) {
    if (donutsList[i].classList.contains("active")) {
      checkedDonuts.push(donutsList[i].innerText);
    }
  }

  const payload = {
    name: $name,
    city: $city,
    employees: JSON.stringify(checkedEmployees),
    donuts: JSON.stringify(checkedDonuts)
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


//list group form select employees
$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {

        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

// Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

// Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

// Initialization
        function init() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
});
