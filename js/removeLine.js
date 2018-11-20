function deleteParent() {
    $(".rmvBtn").on("click", function () {
        this.parentElement.parentElement.remove();
    });
}