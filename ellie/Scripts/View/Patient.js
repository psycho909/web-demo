$(document).ready(function () {
    // $("#resultCard").hide();
    $('#DiagnosisTypeList').select2({
        placeholder: '請選擇',
        width: '100%'
    });

    _changeGroup($("#Group").val(), "GroupMember");
    $('#Group').change(function () { _changeGroup($("#Group").val(), "GroupMember"); });    
    _changeGroup($("#SearchGroup").val(), "SearchGroupMember");
    $('#SearchGroup').change(function () { _changeGroup($("#SearchGroup").val(), "SearchGroupMember"); });

    var getUrlString = location.href;
    var url = new URL(getUrlString);
    var patientId = url.searchParams.get('Id');
    if (patientId) {
        _editData(patientId);
    }
    window.addEventListener('resize', function (event) {
        setTimeout(function () {
            $("#jsGrid .jsgrid-grid-body").css("height", "inherit");
        }, 200);
    });
});


function _search() {   
    jsGrid.locale("zh-tw");
    $.blockUI({ message: '<h1><img src="/img/loading.gif" />查詢中...</h1>' });
    $.ajax({
        type: "POST",
        url: "/PatientData/FindByCondition",
        data: $("#conditionForm").serialize() + "&User_Id=" + $('#User_Id').val()
    }).done(function (data) {
        $("#resultCard").show();
        $("#jsGrid").jsGrid({
            height: "100%",
            width: "100%",
            sorting: true,
            paging: true,
            pageSize: 15,
            pageButtonCount: 5,
            pagerFormat: "共 : {itemCount} 筆  &nbsp; {pageCount} 頁 &nbsp; {first} {prev} {pages} {next} {last} &nbsp;  ",
            data: data,
            fields: [                
                {
                    title: "病歷號碼",
                    width: "15%",
                    itemTemplate: function (e, item) {
                        return "<a onclick='_editData(\"" + item.Id + "\")'>" + item.Patient_UID + "</a>";
                    }
                },
                { name: "Id", type: "number", title: "編號", width: "10%", visible: false },
                {
                    title: "姓名",
                    width: "10%",
                    itemTemplate: function (e, item) {
                        var middleName = "";
                        if (item.MiddleName) {
                            middleName = item.MiddleName;
                        }
                        return "<a onclick='_editData(\"" + item.Id + "\")'>" + item.LastName + ' ' + item.FirstName + "</a>";
                    }
                },
                { name: "Sex", type: "text", title: "性別", width: "5%" },
                {
                    title: "照片",
                    width: "10%",
                    itemTemplate: function (e, item) {
                        if (item.ImagePath) {
                            return '<img height="100" width="75" src="..' + item.ImagePath + '" />';
                        } else {
                            return '';
                        }
                    }
                },
                { name: "Birthday", type: "text", title: "生日", width: "10%" },
                { name: "Diagnosis", type: "text", title: "診斷", width: "20%" },
                {
                    title: "操作",
                    width: "5%",
                    itemTemplate: function (e, item) {
                        return "<input type='button' class='btn btn-outline-default btn-sm'  onclick='_addNewEEG(" + item.Id + ")' value='EEG'/>";
                    }
                }               
            ]
        });
        $("#jsGrid .jsgrid-grid-body").css("height", "inherit")

    }).always(function () {
        $.unblockUI();
    });   
}

function _editEEGData(id, item) {
    if (!item) {
        var data = $("#eggGrid").jsGrid("option", "data");
        for (var i = 0; i < data.length; i++) {
            if (data[i].Id == id) {
                item = data[i];
                break;
            }
        }
    }
    $('.preFile').show();
    $('#fileLink').html(item.Data);
    $("#fileLink").prop("onclick", null).off("click");
    $("#fileLink").click(function () {
        _downloadData(item.Id);
    });

    $('#reportLink').html(item.Report);
    $("#reportLink").prop("onclick", null).off("click");
    $("#reportLink").click(function () {
        _downloadReport(item.Id);
    });

    $('#Data').val('');
    $('#eegForm #Id').val(item.Id);
    $('#eegForm #PatientId').val(item.PatientId);
    $('#PatientName').val(PatientName);
    $('#Score').val(item.Score);
    $('#Stand').val(item.Stand);

    var options = document.getElementById('Pos_Order1').options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].text === item.Pos_Order1) {
            $('#Pos_Order1').val((i));
        }
        if (options[i].text === item.Pos_Order2) {
            $('#Pos_Order2').val((i));
        }
    }
    $('#Comment').val(item.Comment);

    $('#eggList').hide();
    $('#modalTitle').html(" EEG資料");
    $('#PatientForm').hide();
    $('#eegForm').show();
    $('#cancelAddEEGBtn').show();

    $('#patient').html("病患名稱：" + item.PatientName + "( " + item.PatientUID + " )");

    $("#alertBody").html("");
    $("#modal-form").modal('show');
    $("#modal-form").animate({ scrollTop: 0 });
}

function _cancelSaveEEG() {
    $('#eegForm').hide();
    $('#PatientForm').show();
    $('#eggList').show();
    $('#modalTitle').html(" 病患資料");
    $("#alertBody").html("");
    $("#modal-form").animate({ scrollTop: 0 });
}

function _showNewPatientModal() {
    $('#patientInfo').hide();
    $('#PatientForm .form-control').removeAttr('disabled');
    $('#PatientForm .form-control').val('');
    $('#PatientForm').show();
    $('#eggList').hide();
    $('#editorInfo').hide();
    $('#modalTitle').html(" 病患資料");
    $("#alertBody").html("");
    $("#editModeBtn").hide();
    $("#saveBtn").show();
    $("#deleteBtn").hide();
    $("#cancelBtn").hide();    
    $('#PatientForm').show();
    $('#eegForm').hide();    
    $("#modal-form").modal('show');    
}

function _editMode(startEdit) {
    if (startEdit == "true") {
        $("#editModeBtn").hide();
        $("#saveBtn").show();
        $("#deleteBtn").show();
        $("#cancelBtn").show();
        $('#PatientForm .form-control').removeAttr('disabled');
    } else {
        $("#editModeBtn").show();
        $("#saveBtn").hide();
        $("#deleteBtn").hide();
        $("#cancelBtn").hide();
        $('#PatientForm .form-control').attr('disabled', true);
    }
    $("#modal-form").animate({ scrollTop: 0 });
}

function _save(option) {
    if ($("#Group").val() == 0 && $("#GroupMember").val() == 0) {
        $("#alertBody").append(showWarningAlert("請選擇所屬地區與診所!", "警告"));
        return;
    }
    if ($("#LastName").val() == '' && $("#FirstName").val() == '' && $("#FirstName").val() == ''
        && $("#Form_Sex").val() == null && $("#Form_Birthday").val() == '' && $("#Seizures").val() == null ) {
        $("#alertBody").append(showWarningAlert("必填欄位(*)不可為空值!", "警告"));
        return;
    }
    $.ajax({
        type: "POST",
        url: "/PatientData/Save",
        data: new FormData($('#PatientForm')[0]),
        contentType: false,
        processData: false
    }).done(function (data) {
        if (data.IsSusses != undefined) {
            if (!data.IsSusses) {
                $("#alertBody").append(showDangerAlert(data.Message, "儲存失敗"));
            }
        } else {
            _showModal(data)
            _search();
            $("#alertBody").append(showSuccessAlert("儲存病患資料完成!", "成功"));
        }
    }).fail(function (msg) {
        $("#alertBody").append(showDangerAlert("儲存病患資料失敗!", "失敗"));
    }).always(function (msg) {
        $("#modal-form").animate({ scrollTop: 0 });
    });    
}

function _clearSearchCondition() {
    $('#Name').val('');
    $('#PatientUID').val('');
    $('#DiagnosisTypeList').val('').trigger('change');;
    $('#Birthday').val('');
    $('#Sex').val('');
    $('#SearchGroup').val('');
    $('#SearchGroupMember').val('');
}

function _saveEEG() {
    $.blockUI({ message: '<h1><img src="/img/loading.gif" />儲存中...</h1>' });
    $.ajax({
        type: "POST",
        url: "/EEG/Save",
        data: new FormData($('#eegForm')[0]),
        contentType: false,
        processData: false,
        dataType: "json"
    }).done(function (data) {
        $("#alertBody").append(showSuccessAlert("新增EEG資料完成!", "成功"));
        $("#editModeBtn").show();
        $("#saveBtn").hide();
        $("#deleteBtn").hide();
        $("#cancelBtn").hide();
        $('#PatientForm').show();
        $('#eegList').show();
        $('#eegForm').hide();    
        _showEGGList($('#PatientForm #Id').val());
    }).fail(function (msg) {
        $("#alertBody").append(showDangerAlert("新增EEG資料失敗!", "失敗"));
    }).always(function (msg) {
        $("#modal-form").animate({ scrollTop: 0 });
        $.unblockUI();
    });
}

function _addNewEEG(id) {   
    $.blockUI({ message: '<h1><img src="/img/loading.gif" />查詢中...</h1>' });
    $.ajax({
        type: "POST",
        url: "/PatientData/GetPatientName",
        data: {
            "getOneVo": { Id: id, User_Id: $('#User_Id').val() }
        },
        dataType: "json",
    }).done(function (data) {        
        _showEEGModal(data);
    }).fail(function (msg) {
        $("#alertBody").append(showDangerAlert("讀取病患資料失敗!", "失敗"));
        }).always(function () {
            $.unblockUI();
        });   
}

function _addEEG() {
    var name = $('#LastName').val() + ' ' + $('#FirstName').val();
    var data = { PatientId: $('#PatientForm #Id').val(), PatientName: name };
    _showEEGModal(data);
}

function _editData(id) {
    $.ajax({
        type: "POST",
        url: "/PatientData/Get",
        data: {
            "getOneVo": { Id: id, User_Id: $('#User_Id').val() }
        },
        dataType: "json",
    }).done(function (data) {
        _showModal(data);
        }).fail(function (msg) {
            $("#alertBody").append(showDangerAlert("讀取病患資料失敗!", "失敗"));
    });
}

function _deleteData() {
    var id = $('#Id').val();
    if (confirm("是否刪除此資料?")){
        $.ajax({
            type: "POST",
            url: "/PatientData/Delete",
            data: {
                "getOneVo": { Id: id, User_Id: $('#User_Id').val() }
            },
            dataType: "json",
        }).done(function (data) {
            if (data.IsSusses != undefined) {
                if (!data.IsSusses) {
                    $("#alertMessage").append(showDangerAlert(data.Message, "失敗"));
                    return;
                }
            }
            $("#alertMessage").append(showSuccessAlert("刪除病患資料完成!", "成功"));
            _search();
            $("#modal-form").modal('hide');
        }).fail(function (msg) {
            $("#alertMessage").append(showDangerAlert("刪除病患資料失敗!", "失敗"));
        });
    }
}

function _showEEGModal(data) {
    $('#eggList').hide();
    $('.preFile').hide();
    $('#modalTitle').html(" EEG資料");
    $('#PatientForm').hide();
    $('#eegForm').show();
    $('#eegForm #Id').val('');
    $('#Data').val('');
    $('#Report').val('');
    $('#Score').val('');
    $('#Comment').val('');
    $('#Pos_Order1').val('');
    $('#Pos_Order2').val('');
    $('#PatientId').val(data.PatientId);
    $('#PatientName').val(data.PatientName);
    $('#patient').html("病患名稱：" + data.PatientName + "( " + data.PatientUID + " )");
    
    $("#alertBody").html("");
    $("#modal-form").modal('show');
    $("#modal-form").animate({ scrollTop: 0 });
}

function _showModal(data) {
    $('#PatientForm .form-control').attr('disabled', true);
    $('#modalTitle').html(" 病患資料");
    $('#patientInfo').hide();
    $('#PatientForm #Id').val(data.Id);
    $('#FirstName').val(data.FirstName);
    $('#LastName').val(data.LastName);
    $('#MiddleName').val(data.MiddleName);
    $('#Form_Sex').val(data.Sex);
    $('#PatientForm #Id_Number').val(data.Id_Number);
    $('#Weight').val(data.Weight);
    $('#Height').val(data.Height);
    $('#Handedness').val(data.Handedness);
    $('#Seizures').val(data.Seizures);
    $('#OnSetAge').val(data.OnSetAge);
    $('#Orders').val(data.Orders);
    $('#Diagnosis').val(data.Diagnosis);
    $('#Form_Birthday').val(data.Birthday);
    $('#Image').attr("src", data.ImagePath);
    $("#Group").val(data.Group);
    $("#GroupMember").val(data.GroupMember);
    $("#Patient_UID").val(data.Patient_UID);

    $("#Address1").val(data.Address1);
    $("#Address2").val(data.Address2);
    $("#City").val(data.City);
    $("#Country").val(data.Country);
    $("#Phone1").val(data.Phone1);
    $("#Phone2").val(data.Phone2);
    $("#Emergency_Contact").val(data.Emergency_Contact);
    $("#Emergency_Phone").val(data.Emergency_Phone);
    $("#Email").val(data.Email);
    $("#Referring_Doctor").val(data.Referring_Doctor);
    $("#Attending_Doctor").val(data.Attending_Doctor);

    $('#editorInfo').show();
    $('#editor').html("最後修改人：" + data.EditorName + "( " + data.LastEditTime + " )");

    $("#alertBody").html("");
    $("#editModeBtn").show();
    $("#saveBtn").hide();
    $("#deleteBtn").hide();
    $("#cancelBtn").hide();
    $('#PatientForm').show();
    $('#eegForm').hide();    
    $("#modal-form").modal('show');    

    _showEGGList(data.Id);
}

function _showEGGList(id) {
    $.blockUI({ message: '<h1><img src="/img/loading.gif" />查詢中...</h1>' });
    $.ajax({
        type: "POST",
        url: "/EEG/FindByPatientId",
        data: {
            "getOneVo": { Id: id, User_Id: $('#User_Id').val() }
        },
    }).done(function (data) {
        $('#eggList').show();
        $("#eggGrid").jsGrid({
            height: "100%",
            width: "100%",
            sorting: true,
            paging: true,

            pageSize: 10,
            pageButtonCount: 5,

            data: data.Data,
            onRefreshed: function (args) {
                $("#eggGrid .jsgrid-grid-body").css("height", "inherit");
            },
            fields: [
                {
                    title: "上傳時間",
                    width: "10%",
                    itemTemplate: function (e, item) {
                        return "<a onclick='_editEEGData(\"" + item.Id + "\")'>" + item.Add_Time + "</a>";
                    }
                },
                {
                    title: "Data",
                    width: "15%",
                    itemTemplate: function (e, item) {
                        return "<a onclick='_editEEGData(\"" + item.Id + "\")'>" + item.Data + "</a>";
                    }
                },
                { name: "Report", type: "text", title: "報告上傳日期", width: "10%" },
                { name: "StandName", type: "text", title: "評估表" },
                { name: "Score", type: "number", title: "分數" },
                { name: "Position", type: "text", title: "POS", visible: data.IsVisible },
                { name: "HZ", type: "text", title: "H2", visible: data.IsVisible },
                { name: "Pos_Order1", type: "text", title: "Pos_Order1"},
                { name: "Pos_Order2", type: "text", title: "Pos_Order2"},
                {
                    title: "操作",
                    width: "5%",
                    itemTemplate: function (e, item) {
                        return "<input type='button' class='btn btn-outline-info btn-sm'  onclick='_startAnalyze(" + item.Id + ")' value='計算'/>";
                    }
                }
            ]
        });
        $("#eggGrid .jsgrid-grid-body").css("height", "inherit");
        }).always(function () {
            $.unblockUI();
        });           
}

function _changeGroup(groupId, targetElementId) {
    $.ajax({
        url: "/GroupMember/FindByGroupIdAsHtml",
        data: { selectedGroupId: groupId, targetElementId: targetElementId, User_Id: $('#User_Id').val()},
        type: 'post',
        dataType: 'text',
        success: function (data) {
            $('#' + targetElementId).replaceWith(data);
        }
    });
}

function _downloadReport(Id) {
    var form = $('<form></form>');
    $(form).hide().attr('method', 'post').attr('action', "/EEG/DownloadReport");
    $(form).attr('target', '_blank');
    var input = $('<input type="hidden" name=id value="' + Id + '"/>');
    $(form).append(input);
    $(form).appendTo('body').submit();
}

function _downloadData(Id) {
    var form = $('<form></form>');
    $(form).hide().attr('method', 'post').attr('action', "/EEG/DownloadData");
    $(form).attr('target', '_blank');
    var input = $('<input type="hidden" name=id value="' + Id + '"/>');
    $(form).append(input);
    $(form).appendTo('body').submit();
}

function _closeModal() {
    $("#modal-form").modal('hide');   
}