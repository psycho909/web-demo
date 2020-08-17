var alertMessageDiv = '<div class=\"alert @type alert-dismissible fade show\" role=\"alert\">' +
    '    <span class=\"alert-icon\" > <i class=\"ni @icon \"></i></span>' +
    '        <span class=\"alert-text\"><strong>@caption </strong>  @message</span>' +
    '       <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">' +
    '            <span aria-hidden=\"true\">&times;</span>' +
    '        </button></div >';

function showSuccessAlert(msg, cap) {
    var tempMessage = alertMessageDiv;
    tempMessage = tempMessage.replace("@type", "alert-success");
    tempMessage = tempMessage.replace("@icon", "ni-like-2");
    tempMessage = tempMessage.replace("@caption", cap);
    tempMessage = tempMessage.replace("@message", msg);
    return tempMessage;
}


function showDangerAlert(msg, cap) {
    var tempMessage = alertMessageDiv;
    tempMessage = tempMessage.replace("@type", "alert-danger");
    tempMessage = tempMessage.replace("@icon", "ni-fat-remove");
    tempMessage = tempMessage.replace("@caption", cap);
    tempMessage = tempMessage.replace("@message", msg);
    return tempMessage;
}

function showWarningAlert(msg, cap) {
    var tempMessage = alertMessageDiv;
    tempMessage = tempMessage.replace("@type", "alert-warning");
    tempMessage = tempMessage.replace("@icon", "ni-fat-remove");
    tempMessage = tempMessage.replace("@caption", cap);
    tempMessage = tempMessage.replace("@message", msg);
    return tempMessage;
}