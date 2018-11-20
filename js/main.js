const instruction   = {};
function createInstructionHash() {
    instruction["ADD"]  = "18";
    instruction["AND"]  = "40";
    instruction["COMP"] = "28";
    instruction["DIV"]  = "24";
    instruction["J"]    = "3C";
    instruction["JEQ"]  = "30";
    instruction["JGT"]  = "34";
    instruction["JLT"]  = "38";
    instruction["JSUB"] = "48";
    instruction["LDA"]  = "00";
    instruction["LDCH"] = "50";
    instruction["LDL"]  = "08";
    instruction["LDX"]  = "04";
    instruction["MUL"]  = "20";
    instruction["OR"]   = "44";
    instruction["RD"]   = "D8";
    instruction["RSUB"] = "4C";
    instruction["STA"]  = "0C";
    instruction["STCH"] = "54";
    instruction["STL"]  = "14";
    instruction["STSW"] = "E8";
    instruction["SUB"]  = "1C";
    instruction["TD"]   = "E0";
    instruction["TIX"]  = "2C";
};
createInstructionHash();




document.body.onload = function () {
    $(".addBtn").on("click", function () {
        $("tbody").append("<tr>\n" +
            "                    <td><input type=\"text\" class=\"form-control var\" required></td>\n" +
            "                    <td><input type=\"text\" class=\"form-control ins\" required></td>\n" +
            "                    <td>\n" +
            "                        <select class=\"form-control\">\n" +
            "                            <option value=\"0\" selected>0</option>\n" +
            "                            <option value=\"1\">1</option>\n" +
            "                        </select>\n" +
            "                    </td>\n" +
            "                    <td><input type=\"text\" class=\"form-control address\" required></td>\n" +
            "<td><button class=\"btn btn-danger rmvBtn\" onclick=\"deleteParent()\"> "+
            "   <i class=\"fa fa-times\"></i>" +
            "</button></td>" +
            "                </tr>");
    });
    $(".submit").on("click", function (e) {
        e.preventDefault();
        console.log($(".var").length);
        var startAddressValue = $("#Start").val();
        var hexRegex = new RegExp("^[A-Fa-f0-9]");
        var varRegex = new RegExp("^[A-Za-z0-9]+$");

        if(!hexRegex.test(startAddressValue)){
            $("#Start").css("border-color","#d9534f");
        } else{
            $("#Start").css("border-color","#ced4da");
        }
        $(".var").each(function (index, val) {
            if(varRegex.test(val.value)){
                val.style.borderColor = "#ced4da";
                console.log("Variable true");
            } else {
                val.style.borderColor = "#d9534f";
            }
        });
        $(".ins").each(function (index, val) {
            if(instruction[val.value] !== undefined){
                val.style.borderColor = "#ced4da";
                console.log("Instruction true");
            } else {
                val.style.borderColor = "#d9534f";
            }
        });
        $(".address").each(function (index, val) {
            if(varRegex.test(val.value)) {
                val.style.borderColor = "#ced4da";
                console.log("Address true");
            } else {
                val.style.borderColor = "#d9534f";
            }
        });
    });

}