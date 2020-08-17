var targetIds = [];
var isAnalyzeAll = false;

$(document).ready(function () {
    jsGrid.locale("zh-tw");
    // $("#resultCard").hide();
    $('#Stands').select2({
        placeholder: '請選擇',
        width: '100%'
    });
    _changeGroup($("#SearchGroup").val(), "SearchGroupMember");
    $('#SearchGroup').change(function () { _changeGroup($("#SearchGroup").val(), "SearchGroupMember"); });

    window.addEventListener('resize', function (event) {
        setTimeout(function () {
            $("#jsGrid .jsgrid-grid-body").css("height", "inherit");
        }, 200);
    });
});

var analyzeIds = [];
function _search() {
    $.ajax({
        type: "POST",
        url: "/EEG/FindByCondition",
        data: $("#conditionForm").serialize() + "&User_Id=" + $("#User_Id").val()
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
            deleteConfirm: "是否刪除此筆資料?",

            data: data.Data,
            onRefreshed: function (args) {
                $("#jsGrid .jsgrid-grid-body").css("height", "inherit");
            },
            onPageChanged: function (args) {
                pageIndex = $("#jsGrid").jsGrid("option", "pageIndex");
                $("#selectAllCheckbox").prop("checked", false);
                isAnalyzeAll = false;
                targetIds = [];
            },
            fields: [
                {
                    headerTemplate: function (e) {
                        return $("<input>").attr("type", "checkbox").attr("id", "selectAllCheckbox").on("change", function (target) {
                            if ($("#selectAllCheckbox").prop("checked")) {
                                $(".singleCheckbox").each(function () {
                                    $(this).prop("checked", true);
                                });
                                isAnalyzeAll = true;
                                var Ids = $('.EEGId');
                                for (var i = 0; i < Ids.length; i++) {
                                    _addTargetIds(Ids[i].value);
                                }
                            } else {
                                $(".singleCheckbox").each(function () {
                                    $(this).prop("checked", false);
                                });
                                isAnalyzeAll = false;
                                var Ids = $('.EEGId');
                                for (var i = 0; i < Ids.length; i++) {
                                    _removeTargetIds(Ids[i].value);
                                }
                            }
                        });
                    },
                    itemTemplate: function (e, item) {
                        return $("<input>").attr("type", "checkbox").attr("class", "singleCheckbox")
                            .on("change", { id: item.Id }, function (target) {
                                if ($(this).prop("checked")) {
                                    _addTargetIds(target.data.id);
                                } else {
                                    _removeTargetIds(target.data.id)
                                }
                            });
                    },
                    align: "center",
                    width: "30px",
                    sorting: false
                },
                {
                    title: "診所病歷號碼",
                    width: "15%",
                    itemTemplate: function (e, item) {
                        return "<a onclick = '_showEEGFormModal(" + item.Id + ",\"\")'>" + item.PatientUID + "</a>";
                    }
                },
                {
                    title: "姓名",
                    width: "10%",
                    itemTemplate: function (e, item) {
                        return "<a onclick = '_showEEGFormModal(" + item.Id + ",\"\")'>" + item.PatientName + "</a>" +
                            " <i class='ni ni-circle-08' onclick='_showPatient(" + item.PatientId + ")'></i>";
                    }
                },
                { name: "Data", type: "text", title: "Data", width: "15%" },
                { name: "Report", type: "text", title: "報告上傳日期", width: "10%" },
                { name: "StandName", type: "text", title: "評估表", width: "10%" },
                { name: "Score", type: "number", title: "分數", width: "10%" },
                { name: "Add_Time", type: "text", title: "上傳時間", width: "10%" },
                { name: "Position", type: "text", title: "Position", visible: data.IsVisible, width: "5.5%" },
                { name: "HZ", type: "text", title: "HZ", visible: data.IsVisible, width: "5.5%" },
                { name: "Pos_Order1", type: "text", title: "Pos_Order1", width: "5.5%" },
                { name: "Pos_Order2", type: "text", title: "Pos_Order2" , width: "5.5%"},
                {
                    title: "操作",
                    width: "5%",
                    itemTemplate: function (e, item) {
                        return "<input type='button' class='btn btn-outline-info btn-sm'  onclick='_startAnalyze(" + item.Id + ")' value='計算'/>"
                            + "<input  type='hidden' class='EEGId' value='" + item.Id + "' />";
                    }
                }
            ]
        });
        $("#jsGrid .jsgrid-grid-body").css("height", "inherit");
    });
}

function _showSearchPatientModal() {
    $("#search-modal-form").modal('show');
}

function _downloadFile(Id) {
    var form = $('<form></form>');
    $(form).hide().attr('method', 'post').attr('action', "/EEG/DownloadReport");
    $(form).attr('target', '_blank');
    var input = $('<input type="hidden" name=id value="' + Id + '"/>');
    $(form).append(input);
    $(form).appendTo('body').submit();
}

function _searchPatient() {
    $.ajax({
        type: "POST",
        url: "/PatientData/FindPatient",
        data: $("#searchPatientForm").serialize() + "&User_Id=" + $("#User_Id").val()
    }).done(function (data) {
        $("#PatientResult").jsGrid({
            height: "100%",
            width: "100%",
            sorting: true,
            paging: true,
            pageSize: 10,
            pageButtonCount: 5,
            data: data,
            fields: [
                {
                    title: "EEG",
                    width: "10%",
                    itemTemplate: function (e, item) {
                        return "<input type='button' class='btn btn-outline-default btn-sm' " +
                            " onclick = '_showNEWEEGFormModal(" + item.Id + ",\"" + item.PatientName + "\",\"" + item.PatientUID + "\")' value = '新增' />";
                    }
                },
                { name: "PatientUID", type: "text", title: "病歷編號", width: "45%" },
                { name: "PatientName", type: "text", title: "姓名", width: "45%" },
            ]
        });
    });
}

function _showEEGFormModal(Id, item) {
    if (item == '') {
        var data = $("#jsGrid").jsGrid("option", "data");
        for (var i = 0; i < data.length; i++) {
            if (data[i].Id == Id) {
                item = data[i];
                break;
            }
        }
    }
    $('.preFile').show();
    if (item.DataPath) {
        $('#fileLink').html(item.DataPath);
    } else {
        $('#fileLink').html(item.Data);
    }    
    $("#fileLink").prop("onclick", null).off("click");
    $("#fileLink").click(function () {
        _downloadData(item.Id);
    });
    if (item.ReportPath) {
        $('#reportLink').html(item.ReportPath);
    } else {
        $('#reportLink').html(item.Report);
    }

    $("#reportLink").prop("onclick", null).off("click");
    $("#reportLink").click(function () {
        _downloadReport(item.Id);
    });
    $('#Data').val('');
    $('#Id').val(item.Id);
    $('#PatientId').val(item.PatientId);
    if (item.PatientName) {
        $('#PatientName').val(item.PatientName);
    }
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
    $('#patient').html("病患名稱：" + item.PatientName + "( " + item.PatientUID + " )");
    $("#alertBody").html("");
    $("#modal-form").modal('show');
}

function _showNEWEEGFormModal(PatientId, PatientName, PatientUID) {
    $("#search-modal-form").modal('hide');
    $('.preFile').hide();
    $('#eegForm .form-control').val('');  
    $('#PatientId').val(PatientId);
    $('#PatientName').val(PatientName);
    $('#patient').html("病患名稱：" + PatientName + "( " + PatientUID + " )");
    $("#alertBody").html("");
    $("#modal-form").modal('show');
}

function _clearSearchCondition() {
    $('#Name').val('');
    $('#PatientUID').val('');
    $('#Stands').val('').trigger('change');;
    $('#MinScore').val('');
    $('#MaxScore').val('');
    $('#SearchGroup').val('');
    $('#SearchGroupMember').val('');
}

function _save() {
    $.blockUI({ message: '<h1><img src="/img/loading.gif" />儲存中...</h1>' });    
    $.ajax({
        type: "POST",
        url: "/EEG/Save",
        data: new FormData($('#eegForm')[0]),
        contentType: false,
        processData: false,
        dataType: "json"
    }).done(function (data) {
        _search();
        _showEEGFormModal(data.Id, data)
        $("#alertBody").append(showSuccessAlert("新增EEG資料完成!", "成功"));
    }).fail(function (msg) {
        $("#alertBody").append(showDangerAlert("新增EEG資料失敗!", "失敗"));
    }).always(function (msg) {
        $("#modal-form").animate({ scrollTop: 0 });
        $.unblockUI();
    });
}

function _delete() {
    if (!confirm("是否刪除此筆資料?")) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/EEG/Delete",
        data: {
            "getOneVo": { Id: $('#Id').val(), User_Id: $('#User_Id').val() }
        },
    }).done(function (data) {
        _search();
        $("#modal-form").modal('hide');
        alert("刪除成功!");
    }).fail(function (msg) {
        $("#alertBody").append(showDangerAlert("刪除EEG資料失敗!", "失敗"));
    }).always(function (msg) {
        $("#modal-form").animate({ scrollTop: 0 });
        $.unblockUI();
    });
}


function _analyze() {
    if (targetIds.length == 0) {
        $("#alertMessage").append(showWarningAlert("請先勾選分析資料!", "警告"));
        return;
    }
    _analyzeAll(0)
}

function _analyzeAll(currentIndex) {
    var id = targetIds[currentIndex]
    $.blockUI({ message: '<h1><img src="/img/loading.gif" />分析中..(' + (currentIndex+1).toString() + '/ ' + targetIds.length +  ').</h1>' });
    $.ajax({
        type: "POST",
        url: "/EEG/StartAnalyze",
        data: {
            "getOneVo": { Id: id, User_Id: $('#User_Id').val() }
        },
        dataType: "json",
    }).done(function (data) {
        if (data.IsSusses) {
            currentIndex++;
            if (currentIndex == targetIds.length) {
                $("#alertMessage").append(showSuccessAlert("分析資料完成!", "成功"));
                _search();
                $.unblockUI();
            } else {
                _analyzeAll(currentIndex);
            }
        } else {
            //$("#alertBody").append(showDangerAlert(data.Message, "失敗"));
            currentIndex++;
            _analyzeAll(currentIndex);
        }
        }).fail(function (msg) {
            currentIndex++;
        if (currentIndex == targetIds.length) {
            $("#alertMessage").append(showSuccessAlert("分析資料完成!", "成功"));
            _search();
            $.unblockUI();
        } else {
            _analyzeAll(currentIndex);
        }
    });
}

function _startAnalyze(id) {
    $.blockUI({ message: '<h1><img src="/img/loading.gif" />分析中...</h1>' });
    $.ajax({
        type: "POST",
        url: "/EEG/StartAnalyze",
        data: {
            "getOneVo": { Id: id, User_Id: $('#User_Id').val() }
        },
        dataType: "json",
    }).done(function (data) {
        if (data.IsSusses) {
            _search();
            $("#alertBody").append(showSuccessAlert("分析資料完成!", "成功"));
        } else {
            $("#alertBody").append(showDangerAlert(data.Message, "失敗"));
        }
    }).fail(function (msg) {
        $("#alertBody").append(showDangerAlert("讀取病患資料失敗!", "失敗"));
    }).always(function (msg) {
        $("#modal-form").animate({ scrollTop: 0 });
        $.unblockUI();
    });
}

function _changeGroup(groupId, targetElementId) {
    $.ajax({
        url: "/GroupMember/FindByGroupIdAsHtml",
        data: { selectedGroupId: groupId, targetElementId: targetElementId, User_Id: $('#User_Id').val() },
        type: 'post',
        dataType: 'text',
        success: function (data) {
            $('#' + targetElementId).replaceWith(data);
        }
    });
}

function _addTargetIds(id) {
    if (!targetIds.includes(id.toString())) {
        targetIds.push(id.toString());
    }
}

function _removeTargetIds(id) {
    var index = targetIds.indexOf(id.toString());
    targetIds.splice(index, 1);
}

function _showPatient(patientId) {
    window.open('../PatientData/Index?Id=' + patientId);
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