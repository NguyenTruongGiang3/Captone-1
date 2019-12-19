$(document).ready(function () {
    $("#launch-submit1").click(function () {
        $.ajax({
            url: "/initializeaddr",
            type: "GET",
            success: function (response) {
                console.log(response);
                $("#privateKey").val(response["PrivateKey"]);
                $("#publicKey").val(response["PublicKey"]);
                $("#addressKey").val(response["Address"]);
            }
        });
    });
});

$(document).ready(function () {
    $("#g_seed").click(function () {
        $.ajax({
            url : "/api/seed",
            type: "GET",
            success: function (response) {
                console.log(response["seed"]);
                $("#seed1").val(response["seed"]);
            }
        })
    })
})