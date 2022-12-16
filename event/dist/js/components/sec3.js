let sec3 = {
	setup() {
		let notices = ["搖獎機獎勵共分為史詩/傳奇/上古/神話/代幣，可於[獎勵介紹]確認各級別所包含的 獎勵。", "搖獎機分為單抽與10連抽，單抽時，可於全級別中獲得一種獎勵，10連抽時，必定轉出[ALL IN]珠子，並從全級別中隨機獲得10種獎勵。", "活動期間累積消費金額每整點更新一次，建議玩家重新整理頁面來取得已達到金額所贈送的代幣。", "前一日完成7個世界每日任務，可於網頁上直接取得1個代幣，發放時間為每日9~10點，首次發放日為02/01(三)，最後發放日為02/15(三)。", "[領獎專區]可確認獲得獎勵，並可選擇獎勵及領取角色，送出獎勵後將於30分鐘內  在角色的信箱獲得獎勵，角色若在送出獎勵前就在線上，需重新選擇角色進入遊戲方可收到信件。", "代幣最後獲得時間為02/15(三)10:00，後續無法再獲得任何代幣(累積消費金額/每日任務)，[轉動搖獎機]、[開啟寶箱]、[領獎專區]則開放至02/22(三)10:00，還請玩家把握時間抽獎與領取獎勵。", "參與活動需登入遊戲橘子帳號，且需持有新龍之谷角色，還請玩家留意。", "此為機會中獎活動，玩家參與活動不代表即可獲得特定商品。", "玩家若因個人線路不穩導致斷線、連接失效等非我方業務造成之問題，本公司將不負責，活動將依照公告方式進行，不另行補償。", "活動期間系統若發生任何問題，或其他不可抗力之因素，導致活動無法順利進行，本公司保留變更或終止活動時間、內容之權利。", "若上述說明仍無法解決您的問題，請聯絡我們，客服人員將會盡快回覆您。", "其他未規定事項，將統一由官方於官方網頁公佈。"];
		return {
			notices,
		};
	},
	template: `
    <div class="sec sec3-wrap">
       <div class="container">
            <div class="sec3-title">注意事項</div>
            <ol class="sec3-list">
                <li class="sec3-list__li" v-for="n in notices">{{n}}</li>
            </ol>
       </div>
    </div>
    `,
};

export default sec3;
