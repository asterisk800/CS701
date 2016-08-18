$(function(){
    $("#login, #register").click(function() {

        ($("#feature_dialog").dialog("isOpen") == false) ? $("#feature_dialog").dialog("open") : $("#feature_dialog").dialog("close") ;
    });
    $("#feature_dialog").dialog({autoOpen: false});
});