
$(document).ready(function () {
    $('.updateUser').on("click", updateUser);


})



function updateUser() {
    var name = $(this).parent().parent().find('.name').val();
    var age = $(this).parent().parent().find('.age').val();
    var email = $(this).parent().parent().find('.email').val();
    $.ajax({
        type: "PUT",
        url: "/users/update/" + $(this).data('id') + "/" + name + "/" + age + "/" + email
    }).done(function (response) {
        // window.location.replace("/");
    });
    window.location.replace("/");
}

