document.body.onload = function () {
    $(".addBtn").on("click", function () {
        $("tbody").append("<tr>\n" +
            "                    <td><input type=\"text\" class=\"form-control var\" required></td>\n" +
            "                    <td><input type=\"text\" class=\"form-control ins\" required></td>\n" +
            "                    <td><input type=\"text\" class=\"form-control address\" required></td>\n" +
            "                    <td><button class=\"btn btn-danger rmvBtn\" onclick=\"deleteParent()\">\n" +
            "                        <i class=\"fa fa-times\"></i>\n" +
            "                    </button></td>\n" +
            "                </tr>");
    });

    $(".submit").on("click", function (e) {
        e.preventDefault();
        $(".var").each(function (index, val) {
            var regex = new RegExp("^[A-Za-z]+$");
            if(regex.test(val.value)){
                console.log("true");
            } else {
                val.style.borderColor = "#d9534f";
            }
        });
    });

}