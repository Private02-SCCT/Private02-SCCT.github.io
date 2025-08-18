const urlinput=document.getElementById("urlinput")
const btn=document.getElementById("btn")
const log=document.getElementById("log")
let log_tmp=``
log.value = ""

btn.addEventListener('click', decode);

function decode(){
	log_text("----------")
	url_tmp=urlinput.value
	Engine=checkEngine(url_tmp)
	
	if (Engine==="undefined"){
		log_text("[Info]検索エンジンを検出できなかった、もしくは対応していない検索エンジンです")
	}
	if (Engine==="Google"){
		log_text("[Google]GoogleのURLを検出しました")
		// decodeURIComponentを二回行っているのは、一部URLは一回だけでは日本語復元がされない場合があるから。たとえるとGitHubにおいてあるREADME.mdに例として書いてあるようなURL。
		result = decodeURIComponent(decodeURIComponent(url_tmp.substring(url_tmp.indexOf("https%3A%2F%2F")).split("&usg")[0]))
		log_text(`\n[Google]URL復元を完了しました。元URLを出力します...`)
		log_text(`${result}`)
	}
	
	
}

function checkEngine(input){
	google_check = String(input).indexOf("https://www.google.com/url?")
	if (google_check !== -1 && google_check === 0){
		return "Google"
	}
	
	return "undefined"
}

function log_text(content){
	log_tmp = `${String(content)}\n${log_tmp}`
	log.value = log_tmp
}