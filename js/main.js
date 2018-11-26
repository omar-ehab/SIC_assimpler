var addresses = [],
    symbolTabel = [],
    A,
    X,
    L,
    PC,
    SW,
    Memory;
const instruction   = {};
// this method create HashTable of Instructions
function createInstructionHash() {
    "use strict";
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
    instruction["WORD"] = "";
    instruction["BYTE"] = "";
    instruction["RESW"] = "";
    instruction["RESB"] = "";
}
createInstructionHash();

//all this code in this function will run after page load
document.body.onload = function () {
    "use strict";
    //this event handel new row addition
    $(".addBtn").on("click", function () {
        $(".code tbody").append("<tr>\n" +
            "                    <td><input type=\"text\" class=\"form-control var\" required></td>\n" +
            "                    <td><input type=\"text\" class=\"form-control inst\" required></td>\n" +
            "                    <td>\n" +
            "                        <select class=\"form-control\">\n" +
            "                            <option value=\"0\" selected>0</option>\n" +
            "                            <option value=\"1\">1</option>\n" +
            "                        </select>\n" +
            "                    </td>\n" +
            "                    <td><input type=\"text\" class=\"form-control address\" required></td>\n" +
            "<td><button class=\"btn btn-danger rmvBtn\" onclick=\"deleteParent()\"> " +
            "   <i class=\"fa fa-times\"></i>" +
            "</button></td>" +
            "                </tr>");
    });

    //this event handle convert from SIC code to object code
    $(".submit").on("click", function (e) {
        //prevent button behavior
        e.preventDefault();
        //hide compile button
        $(this).hide();
        //show object code
        $(".symbol").toggle();
        var startAddressValue = $("#Start").val(),
            //Regular expression to check empty string
            emptyRegex = new RegExp("^$"),
            //Regular Expression to check only string and numbers
            varRegex = new RegExp("^[A-Za-z0-9' ]+$");
        addresses[0] = startAddressValue;
        if (!varRegex.test(startAddressValue)) {
            $("#Start").css("border-color", "#d9534f");
        } else {
            $("#Start").css("border-color", "#ced4da");
        }

        $(".var").each(function (index, val) {
            if (varRegex.test(val.value) || emptyRegex.test(val.value)) {
                val.style.borderColor = "#ced4da";
                //console.log("Variable true");
            } else {
                val.style.borderColor = "#d9534f";
            }
        });

        $(".inst").each(function (index, val) {

            if (instruction[val.value] !== undefined) {
                val.style.borderColor = "#ced4da";
                if (val.value != "BYTE" && val.value != "RESW" && val.value != "RESB") {
                    addresses[index + 1] = hexAdd(addresses[index], "3");
                    if ($(".var").eq(index).val() != "") {
                        symbolTabel[$(".var").eq(index).val()] = addresses[index];
                    }
                } else if (val.value === "BYTE") {
                    var byteLength = (($(".address").eq(index).val().length) - 3).toString(16);
                    addresses[index + 1] = hexAdd(addresses[index], byteLength);
                    if ($(".var").eq(index).val() != "") {
                        symbolTabel[$(".var").eq(index).val()] = addresses[index];
                    }
                } else if (val.value === "RESW") {
                    var reswLength = ($(".address").eq(index).val() * 3).toString(16);
                    addresses[index + 1] = hexAdd(addresses[index], reswLength);
                    if ($(".var").eq(index).val() != "") {
                        symbolTabel[$(".var").eq(index).val()] = addresses[index];
                    }
                } else if (val.value === "RESB") {
                    var resbLength = ($(".address").eq(index).val() * 1).toString(16);
                    addresses[index + 1] = hexAdd(addresses[index], resbLength);
                    if ($(".var").eq(index).val() != "") {
                        symbolTabel[$(".var").eq(index).val()] = addresses[index];
                    }
                }
            } else {
                val.style.borderColor = "#d9534f";
            }
        });

        for (var i = 0; i < addresses.length - 1; i++) {
            console.log(addresses[i]);
        }


        $(".address").each(function (index, val) {
            if (varRegex.test(val.value)) {
                val.style.borderColor = "#ced4da";
                //console.log("Address true");
            } else {
                val.style.borderColor = "#d9534f";
            }
        });


        for (i in symbolTabel) {
            $(".symbol tbody").append("<tr>\n" +
                "                    <td>"+i+"</td>\n" +
                "                    <td>"+symbolTabel[i]+"</td>\n" +
                "                </tr>");
        }

    });
};

//this method add two hex numbers and return the result of addition
function hexAdd(num1, num2) {
    var answer = parseInt(num1, 16) + parseInt(num2, 16);
    return answer.toString(16);
}





// this code to iterates row by row
/*
    $("tbody tr").each(function(){
        $(this).find('td').each(function(){
            console.log($(this));
        });
        console.log("_________________________________");
    });
*/