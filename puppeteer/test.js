const puppeteer = require("puppeteer");
const id = "F127145335";
const password = "89855991";
// 88
const i1 = 88;
// 10
// 11
const t1 = 11;
const t2 = 10;
const d = "2021/10/11";
(async () => {
	const browser = await puppeteer.launch({ headless: false, launch: true });
	const page = await browser.newPage();
	page.setDefaultNavigationTimeout(0);
	const Doing = async () => {
		let checkDate = await page.evaluate((d) => {
			return Promise.resolve([...document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img")].find((v) => v.getAttribute("onclick").match(d)));
			// return Promise.resolve(document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img")[document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img").length - 1].getAttribute("onclick").match(d));
		}, d);
		while (!checkDate) {
			await page.waitForTimeout(500);
			await page.reload();
			// checkDate = await page.evaluate((d) => {
			// 	return Promise.resolve([...document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img")].find((v) => v.getAttribute("onclick").match(d)));
			// 	// return Promise.resolve(document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img")[document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img").length - 1].getAttribute("onclick").match(d));
			// }, d);
			await page.waitForSelector("#ContentPlaceHolder1_StepImage_Lab").then(async () => {
				checkDate = await page.evaluate((d) => {
					return Promise.resolve([...document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img")].find((v) => v.getAttribute("onclick").match(d)));
					// return Promise.resolve(document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img")[document.querySelectorAll("#ContentPlaceHolder1_Date_Lab img").length - 1].getAttribute("onclick").match(d));
				}, d);
			});
			console.log(checkDate);
			console.log("還沒開放");
		}
		console.log("開放");
		// prettier-ignore
		await page.goto(`https://fe.xuanen.com.tw/fe01.aspx?module=net_booking&files=booking_place&StepFlag=25&QPid=${i1}&QTime=${t1}&PT=1&D=${d}`)
		var findStatus = await page.$eval("#ContentPlaceHolder1_Step3Info_lab > span:nth-child(1)", (el) => el.textContent);
		if (findStatus == "預約失敗") {
			console.log("預約失敗");
			await page.goto(`https://fe.xuanen.com.tw/fe01.aspx?module=net_booking&files=booking_place&StepFlag=25&QPid=${i1}&QTime=${t2}&PT=1&D=${d}`);
			var findStatus = await page.$eval("#ContentPlaceHolder1_Step3Info_lab > span:nth-child(1)", (el) => el.textContent);
			if (findStatus == "預約失敗") {
				console.log("預約失敗");
			}
			if (findStatus == "預約成功") {
				console.log("預約成功");
			}
		}
		if (findStatus == "預約成功") {
			console.log("預約成功");
			await page.goto(`https://fe.xuanen.com.tw/fe01.aspx?module=net_booking&files=booking_place&StepFlag=25&QPid=${i1}&QTime=${t2}&PT=1&D=${d}`);
			var findStatus = await page.$eval("#ContentPlaceHolder1_Step3Info_lab > span:nth-child(1)", (el) => el.textContent);
			if (findStatus == "預約失敗") {
				console.log("預約失敗");
			}
			if (findStatus == "預約成功") {
				console.log("預約成功");
			}
		}
	};
	await page.goto(`https://fe.xuanen.com.tw/fe01.aspx?module=net_booking&files=booking_place&PT=1`, 0);
	await page.on("dialog", async (dialog) => {
		console.log(dialog.message());
		console.log("dialog");
		await dialog.accept();
	});
	if (await page.$("#ContentPlaceHolder1_loginid")) {
		await page.type("#ContentPlaceHolder1_loginid", id);
		await page.type("#loginpw", password);
	}
	await page.once("load", async () => {
		console.log("load");
		await page.goto(`https://fe.xuanen.com.tw/fe01.aspx?module=net_booking&files=booking_place&PT=1`, 0);
		if (await page.$("#ContentPlaceHolder1_StepImage_Lab > img")) {
			Doing();
		} else {
			if (await page.$("#ContentPlaceHolder1_loginid")) {
				await page.type("#ContentPlaceHolder1_loginid", id);
				await page.type("#loginpw", password);
			}
			await page.waitForNavigation();
			await page.goto(`https://fe.xuanen.com.tw/fe01.aspx?module=net_booking&files=booking_place&PT=1`, 0);
			Doing();
		}
	});
})();
