
$(document).ready(function () {
    $('.updateUser').on("click", updateUser);

    $(".dob").on("change", function () {

        var date = $(this).val();

        var dob = new Date(date);
        var today = new Date();
        var age = today.getFullYear() - dob.getFullYear();
        $(this).parent().parent().find('#age').val(age);
    })

    $('.editable').hide();
    $('.fixed').show();
    $('.editUser').on("click",editUser);
})

function editUser(){
    $(this).parent().parent().find('.fixed').toggle();
    $(this).parent().parent().find('.editable').toggle();
}


function updateUser() {
    var name = $(this).parent().parent().find('.name').val();
    var age = $(this).parent().parent().find('.age').val();
    var email = $(this).parent().parent().find('.email').val();
    var department = $(this).parent().parent().find('.department').val();
    var gender = $(this).parent().parent().find('.gender').val();
    var dob = $(this).parent().parent().find('.dob').val();
    $.ajax({
        type: "PUT",
        url: "/users/update/" + $(this).data('id') + "/" + name + "/" + age + "/" + email + "/" + department + "/" + gender + "/" + dob 
    }).done(function (response) {
        // window.location.replace("/");
    });
    window.location.replace("/");
}

