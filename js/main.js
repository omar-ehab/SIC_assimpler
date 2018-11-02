document.body.onload = function () {
    $(".addBtn").on("click", function (e) {
        $("tbody").append("<tr>\n" +
            "                    <td><input type=\"text\" class=\"form-control\" required></td>\n" +
            "                    <td><input type=\"text\" class=\"form-control\" required></td>\n" +
            "                    <td><input type=\"text\" class=\"form-control\" required></td>\n" +
            "                </tr");
    });

}