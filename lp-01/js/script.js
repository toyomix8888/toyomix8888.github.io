const menuItems = [
	{
		name: "蔵日和ブレンド",
		category: "COFFEE",
		price: "650円",
		description: "店主が豆選びからこだわり、香り豊かに丁寧に焙煎しました。",
		image: "https://placehold.jp/600x400.png?text=Item",
		imageAlt: "蔵日和ブレンドコーヒー"
	},
	{
		name: "手作りチーズケーキ",
		category: "SWEETS",
		price: "580円",
		description: "なめらかな口どけと、ほどよい酸味を楽しむ定番の味。",
		image: "https://placehold.jp/600x400.png?text=Item",
		imageAlt: "手作りチーズケーキ"
	},
	{
		name: "季節の果実タルト",
		category: "SEASONAL",
		price: "680円",
		description: "旬のフルーツをたっぷり使った、季節限定のタルトです。",
		image: "https://placehold.jp/600x400.png?text=Item",
		imageAlt: "季節のフルーツを使ったタルト"
	}
];

const customerVoices = [
	{
		name: "30代・女性",
		visit: "ご友人と来店",
		rating: 5,
		comment: "蔵の落ち着いた雰囲気に癒やされました。コーヒーとケーキもおいしく、つい長居したくなります。"
	},
	{
		name: "40代・男性",
		visit: "おひとりで来店",
		rating: 5,
		comment: "町歩きの途中に立ち寄りました。静かな店内で、丁寧に淹れていただいた一杯をゆっくり楽しめました。"
	},
	{
		name: "20代・女性",
		visit: "ご家族と来店",
		rating: 5,
		comment: "歴史ある建物なのに居心地がよくて素敵です。季節のタルトも見た目がきれいで、また訪れたいです。"
	}
];

const frequentlyAskedQuestions = [
	{
		question: "予約はできますか？",
		answer: "お席のご予約については、お電話にてお問い合わせください。混雑状況によってはご希望に添えない場合がございます。"
	},
	{
		question: "駐車場はありますか？",
		answer: "店舗専用駐車場の有無や近隣の駐車場については、ご来店前に店舗へお問い合わせください。城下町の散策とあわせて公共交通機関でのご来店もおすすめです。"
	},
	{
		question: "季節のタルトはいつでも注文できますか？",
		answer: "季節のタルトは旬の果物を使用しているため、時期によって内容が変わります。売り切れとなる場合もございますのでご了承ください。"
	},
	{
		question: "子どもと一緒に利用できますか？",
		answer: "お子さまとご一緒にご利用いただけます。店内には段差や歴史ある建具がございますので、どうぞお気をつけてお過ごしください。"
	}
];

const menuList = document.querySelector("#menu-list");
const voiceList = document.querySelector("#voice-list");
const faqList = document.querySelector("#faq-list");

if (menuList) {
	menuList.innerHTML = menuItems.map((item) => `
		<article class="menu-card">
			<img src="${item.image}" alt="${item.imageAlt}" loading="lazy">
			<div class="menu-card-content">
				<div class="menu-card-meta">
					<span class="menu-card-category">${item.category}</span>
					<span class="menu-card-price">${item.price}</span>
				</div>
				<h3>${item.name}</h3>
				<p>${item.description}</p>
			</div>
		</article>
	`).join("");
}

if (voiceList) {
	voiceList.innerHTML = customerVoices.map((voice) => `
		<article class="voice-card">
			<img src="https://placehold.jp/150x150.png?text=User" alt="" loading="lazy">
			<div class="voice-card-heading">
				<h3>${voice.name}</h3>
				<p class="voice-card-meta">${voice.visit}</p>
			</div>
			<div class="voice-rating" aria-label="評価 ${voice.rating} 点">${"★".repeat(voice.rating)}${"☆".repeat(5 - voice.rating)}</div>
			<blockquote>${voice.comment}</blockquote>
		</article>
	`).join("");
}

if (faqList) {
	faqList.innerHTML = frequentlyAskedQuestions.map((item, index) => `
		<article class="faq-item">
			<h3 class="faq-heading">
				<button class="faq-question" type="button" id="faq-question-${index}" aria-expanded="false" aria-controls="faq-answer-${index}">
					<span class="faq-q-mark" aria-hidden="true">Q.</span>
					<span class="faq-question-text">${item.question}</span>
					<span class="faq-toggle-icon" aria-hidden="true"></span>
				</button>
			</h3>
			<div class="faq-answer" id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}">
				<div class="faq-answer-inner"><p><span class="faq-a-mark" aria-hidden="true">A.</span><span>${item.answer}</span></p></div>
			</div>
		</article>
	`).join("");

	faqList.addEventListener("click", (event) => {
		const button = event.target.closest(".faq-question");
		if (!button) return;

		const item = button.closest(".faq-item");
		const isExpanded = button.getAttribute("aria-expanded") === "true";
		button.setAttribute("aria-expanded", String(!isExpanded));
		item.classList.toggle("is-open", !isExpanded);
	});
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
	const closeMenu = () => {
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "メニューを開く");
		siteNav.classList.remove("is-open");
		document.body.classList.remove("menu-open");
	};

	menuToggle.addEventListener("click", () => {
		const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", String(!isExpanded));
		menuToggle.setAttribute("aria-label", isExpanded ? "メニューを開く" : "メニューを閉じる");
		siteNav.classList.toggle("is-open", !isExpanded);
		document.body.classList.toggle("menu-open", !isExpanded);
	});

	siteNav.addEventListener("click", (event) => {
		if (event.target.closest("a")) closeMenu();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeMenu();
	});
}
