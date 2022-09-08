using Gamania.SD.Helper;
using GamaniaSDNetLibrary.Model.Lineage;
using Lineage_Event_GCP.Base;
using Lineage_Event_GCP.Model.Event.E20220901;
using SDCodeCheck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Lineage_Event_GCP.Event.E20220914
{
    public partial class Index : LineageBaseEventIndexLogin
    {
        const string myConfigPath = "~/Event/E20220914/Web.config";
        private readonly AppSettings _AppSettings = new AppSettings(myConfigPath);

        protected GashInfo _gashInfo = new GashInfo("請先登入", "Index.aspx");


        protected void Page_Load(object sender, EventArgs e)
        {
            int Stage = int.Parse((Request.QueryString["page"] != null) ? Server.HtmlEncode(Request.QueryString["page"]) : "1");

            try
            {
                DateTime gtm = new DateTime(1970, 1, 1, 0, 0, 0);
                DateTime utc = DateTime.UtcNow.AddHours(8);
                AccountData accountData = new AccountData() { GashUserData = _gashInfo.GashUserClass, TimeStamp = utc.Subtract(gtm).TotalSeconds.ToString(), Stage = Stage, ServerType = BaseServer.ServerType };

                var AccountData_Json = new JavaScriptSerializer().Serialize(accountData);
                string dataObj = AESCode.EncryptAES256(AccountData_Json, _AppSettings.Key, _AppSettings.Iv);
                tkn.Value = dataObj;
                hfEventIndex.Value = _AppSettings.EventIndex;
                HttpContext.Current.Session["RedirectPage"] = _AppSettings.EventIndex;
            }
            catch (Exception ex)
            {
                ErrorLog.InsErrLog(_AppSettings.IRSEventCode, typeof(Index).FullName, MethodBase.GetCurrentMethod().Name, "Exception", WebComm.ToIRSneedLog(new { ex.Message, _gashInfo }));
                Response.Redirect(_AppSettings.EventIndex);
                return;
            }

        }
    }
}