function go_urun() {
	if (!localStorage.getItem("app_on")) {
		localStorage.setItem("app_on", "ON");
		localStorage.setItem("total_num", 1);
		
		location.href = "urunler.html";
	} else {
	location.href = "urunler.html";
	}
}

function urunekle() {
	var isim_value = document.getElementById("isim_input").value;
	var tarih_value = document.getElementById("tarih_input").value;
	var kaldirma_value = document.getElementById("kaldirma_input").value;
	
	localStorage.setItem("urun" + localStorage.getItem("total_num") + "_isim", isim_value);
	localStorage.setItem("urun" + localStorage.getItem("total_num") + "_tarih", tarih_value);
	localStorage.setItem("urun" + localStorage.getItem("total_num") + "_kaldirma", kaldirma_value);
	
	localStorage.setItem("total_num", Math.floor(Number(localStorage.getItem("total_num")) + 1));
	
	document.getElementById("isim_input").value = "";
	document.getElementById("tarih_input").value = "";
	document.getElementById("kaldirma_input").value = "";
}

document.addEventListener('scroll', function() {
    var ekle_btn = document.getElementById('ekle_btn');
    if (window.scrollY > 100) {
        ekle_btn.style.opacity = '0.2';
    } else {
        ekle_btn.style.opacity = '1';
    }
});

function save() {
	
    let content_div = document.getElementById('content_div');
    content_div.innerHTML = '';
	
	let keys = Object.keys(localStorage);
    let products = [];
	
	keys.forEach(key => {
        if (key.endsWith('_isim')) {
            let productKey = key.split('_')[0];
            let productName = localStorage.getItem(key);
            let productDateStr = localStorage.getItem(productKey + '_tarih');
            let productDate = new Date(productDateStr);
            let removalDaysStr = localStorage.getItem(productKey + '_kaldirma');
            let removalDays = parseInt(removalDaysStr, 10);


            let today = new Date();
            let timeDiff = productDate - today;
            let daysUntilRemoval = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));


            let backgroundColor = daysUntilRemoval <= removalDays ? '#FF4040' : '#00FF00';


            products.push({ productName, productDate, backgroundColor, productKey });
        }
    });


    products.sort((a, b) => a.productDate - b.productDate);


    products.forEach(product => {
        let formattedDate = product.productDate.toISOString().split('T')[0]; // YYYY-MM-DD

        content_div.innerHTML += `
            <div class="eklenmis_urunler" style="background-color: ${product.backgroundColor};">
                <div class="resim_ortla">
                    <div class="urunler_resim"></div>
                </div>
                <div class="urunler_aciklama">
                    <b>${product.productName}</b><br><br><span>${formattedDate}</span>
                </div>
                <div class="urunler_x_btn" style="background-image: url('images/x_button.png');" onclick="handleDelete('${product.productKey}')"></div>
            </div>
        `;
    });
	
}

function handleDelete(productKey) {

    localStorage.setItem('del_urun', productKey);

    yes_no_open();
}

function yes_no_open() {
	document.getElementById("yes_no_bg").style.display = "block";
}

function sil_urun_iptal() {
	document.getElementById("yes_no_bg").style.display = "none";
}

function sil_urun() {
	
	localStorage.removeItem(localStorage.getItem("del_urun") + "_isim");
	localStorage.removeItem(localStorage.getItem("del_urun") + "_tarih");
	localStorage.removeItem(localStorage.getItem("del_urun") + "_kaldirma");
	
	location.reload();
	
}