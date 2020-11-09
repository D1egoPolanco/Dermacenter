var users = [
  {
    id: 1,
    name: "Enrique Bunbury",
    dui: "00000000-0",
    age: 27,
    phone:2222222
  },
  {
    id: 2,
    name: "Diego Maradona",
    dui: "00000000-1",
    age: 27,
    phone:2222222
  },
  {
    id: 3,
    name: "Axl Rose",
    dui: "00000000-2",
    age: 28,
    phone:2222222
  },
  {
    id: 4,
    name: "Jhon Lennon",
    dui: "00000000-3",
    age: 29,
    phone:2222222
  },
  {
    id: 5,
    name: "Elton Jhon",
    dui: "00000000-4",
    age: 27,
    phone:2222222
  },
  {
    id: 6,
    name: "Sergio Ramos",
    dui: "00000000-5",
    age: 25,
    phone:2222222
  },
  {
    id: 7,
    name: "Tony Stark",
    dui: "00000000-6",
    age: 26,
    phone:2222222
  },
  {
    id: 8,
    name: "Peter Parker",
    dui: "00000000-7",
    age: 30,
    phone:2222222
  },
  {
    id: 9,
    name: "Joaquin Sabina",
    dui: "00000000-8",
    age: 32,
    phone:2222222
  },
  {
    id: 10,
    name: "Cristiano Ronaldo",
    dui: "00000000-9",
    age: 37,
    phone:2222222
  },
];

$.each(users, function(i, user) {
  appendToUsrTable(user);
});

$("form").submit(function(e) {
  e.preventDefault();
});

$("form#addUser").submit(function() {
  var user = {};
  var nameInput = $('input[name="name"]').val().trim();
  var addressInput = $('input[name="address"]').val().trim();
  var ageInput = $('input[name="age"]').val().trim();
  if (nameInput && addressInput && ageInput) {
    $(this).serializeArray().map(function(data) {
      user[data.name] = data.value;
    });
    var lastUser = users[Object.keys(users).sort().pop()];
    user.id = lastUser.id + 1;

    addUser(user);
  } else {
    alert("All fields must have a valid value.");
  }
});

function addUser(user) {
  users.push(user);
  appendToUsrTable(user);
}

function editUser(id) {
  users.forEach(function(user, i) {
    if (user.id == id) {
      $(".modal-body").empty().append(`
                <form id="updateUser" action="">
                    <label for="name">Name</label>
                    <input class="form-control" type="text" name="name" value="${user.name}"/>
                    <label for="dui">DUI</label>
                    <input class="form-control" type="text" name="dui" value="${user.dui}"/>
                    <label for="age">Edad</label>
                    <input class="form-control" type="text" name="age" value="${user.age}" min=10 max=100/>
                    <label for="phone">Telefono</label>
                    <input class="form-control" type="text" name="phone" value="${user.phone}"/>
            `);
      $(".modal-footer").empty().append(`
                    <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </form>
            `);
    }
  });
}

function deleteUser(id) {
  var action = confirm("Are you sure you want to delete this user?");
  var msg = "User deleted successfully!";
  users.forEach(function(user, i) {
    if (user.id == id && action != false) {
      users.splice(i, 1);
      $("#userTable #user-" + user.id).remove();
      flashMessage(msg);
    }
  });
}

function updateUser(id) {
  var msg = "User updated successfully!";
  var user = {};
  user.id = id;
  users.forEach(function(user, i) {
    if (user.id == id) {
      $("#updateUser").children("input").each(function() {
        var value = $(this).val();
        var attr = $(this).attr("name");
        if (attr == "name") {
          user.name = value;
        } else if (attr == "dui") {
          user.dui = value;
        } else if (attr == "age") {
          user.age = value;
        } else if (attr == "phone") {
          user.phone = value;
        }
      });
      users.splice(i, 1);
      users.splice(user.id - 1, 0, user);
      $("#userTable #user-" + user.id).children(".userData").each(function() {
        var attr = $(this).attr("name");
        if (attr == "name") {
          $(this).text(user.name);
        } else if (attr == "dui") {
          $(this).text(user.dui);
        } else if (attr == "age"){
          $(this).text(user.age);
        } else if (attr == "phone"){
          $(this).text(user.phone);
        }
      });
      $(".modal").modal("toggle");
      flashMessage(msg);
    }
  });
}

function flashMessage(msg) {
  $(".flashMsg").remove();
  $(".row").prepend(`
        <div class="col-sm-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
    `);
}

function appendToUsrTable(user) {
  $("#userTable > tbody:last-child").append(`
        <tr id="user-${user.id}">
            <td class="userData" name="name">${user.name}</td>
            '<td class="userData" name="dui">${user.dui}</td>
            '<td id="tdAge" class="userData" name="age">${user.age}</td>
            '<td id="tdAge" class="userData" name="phone">${user.phone}</td>
            '<td align="center">
                <button class="btn btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")"><i class="fa fa-pencil fa-lg"></i></button>
            </td>
            <td align="center">
                <button class="btn btn-danger form-control" onClick="deleteUser(${user.id})"><i class="fa fa-trash-o fa-lg"></i></button>
            </td>
            <td align="center">
                <button class="btn btn-warning form-control" onClick=location.href="historial.html";><i class="fa fa-eye"></i></button>
            </td>
            <td align="center">
                <button class="btn btn-primary form-control" onClick=location.href="clinico.html";><i class="fa fa-stethoscope"></i></button>
            </td>
        </tr>
    `);
}