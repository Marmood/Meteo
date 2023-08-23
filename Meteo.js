let ville;
/*============================================================================Afficher l'heure====================================================================================*/
function affichZero(nombre) {
/* cette fonction prend en paramètre un nombre
 si ce nombre est inférieur à 10, on affiche 0 + ce nombre
 Ex: il est 07h00*/
return nombre < 10 ? '0' + nombre : nombre;
}
function dateEtHeure() {
/* Cette fonction fait deux choses :
 1 - Elle construit une constante avec l'objet Date()
 qui renvoie (année, mois, jour, heure, minutes, seconde, millisecondes)
 tout ça est dans l'objet infos*/
 
const infos = new Date();
 
/* 2 - La fonction attribue du texte au div id="heure_exacte"
 ce texte n'est autre que l'heure contenue dans l'objet infos
 on ne souhaite afficher que l'heure et les minutes avec infos.getHours()
 et infos.getMinutes(), On Sépare par ":" Ex: il est 07:00.*/
 
document.getElementById('heure_exacte').innerHTML = ' ' + affichZero(infos.getHours()) + ':' + affichZero(infos.getMinutes());
}
 
/* Pour actualiser l'heure chaque minutes, on rappelle la fonction dateEtHeure()
 toutes les 100 millisecondes, donc toutes les secondes*/
window.onload = function() {
setInterval("dateEtHeure()", 100);
};

/*===============================================================================Geoloc au chargement===================================================================*/

window.addEventListener("load",() =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9") 
			.then(reponse => reponse.json())
			.then(data => {
				champ.value = data.name;
				kebab();
				ville = data.name;
				
           })
        })
    }
})

console.log(ville);
/*========================================================== Keypress quand input rempli ==================================================================================================*/

document.getElementById("champ").addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		
		fetch("https://api.openweathermap.org/data/2.5/forecast?q="+champ.value+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
		.then(reponse => reponse.json())
			.then(data => {
				if(data.cod=="200"){
			kebab();
		}else{
			alert("Nom de ville non valide!");
		}
		})
		
	}
})


/*========================================================== Fonction pour remplir les saisie ==================================================================================================*/

function kebab(){
/*========================================================== Remplissage des vignettes ==================================================================================================*/
	/*=============================Inférieure à 7h du matin========================================================*/
	if (new Date().getHours()<"7"){
		fetch("https://api.openweathermap.org/data/2.5/forecast?q="+champ.value+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
		.then(reponse => reponse.json())
		.then(data => {
		
			for(i=0;i<7;i++){				
				if (new Date(data.list[i].dt*1000).getHours() == "7"){
					genereVignette(0,i," matin",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "8"){
					genereVignette(0,i," matin",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
					genereVignette(1,i," aprem",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
					genereVignette(1,i," aprem",data);
				}
			}
			for(i=7;i<15;i++){				
				if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
					genereVignette(2,i," matin",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
					genereVignette(2,i," matin",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
					genereVignette(3,i," aprem",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
					genereVignette(3,i," aprem",data);
				}
			}
			if(document.getElementById('transparent').style.display == "none"){
				for(i=15;i<23;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(5,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(5,i," aprem",data);
					}
				}
				for(i=23;i<31;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(7,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(7,i," aprem",data);
					}
				}
			}			
		})
	}
	
	/*=============================Compris entre 7h et 16h (7h inclus et 16h non inclus)========================================================*/
	
	if (new Date().getHours()>="7" && new Date().getHours()<"16"){
		
		fetch("https://api.openweathermap.org/data/2.5/weather?q="+champ.value+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
		.then(reponse => reponse.json())
		.then(data => {
			document.getElementsByClassName("vignette")[0].getElementsByTagName('article')[0].textContent= "Ce matin";
			document.getElementsByClassName("vignette")[0].getElementsByTagName('img')[0].src= "http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
			document.getElementsByClassName("vignette")[0].getElementsByTagName('article')[1].textContent= data.main.humidity + "%";
			document.getElementsByClassName("vignette")[0].getElementsByTagName('article')[2].textContent= data.wind.speed + " Km/h";
			document.getElementsByClassName("vignette")[0].getElementsByTagName('article')[3].textContent= Math.floor(data.main.temp)+"°C";
		})
		
		
		fetch("https://api.openweathermap.org/data/2.5/forecast?q="+champ.value+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
		.then(reponse => reponse.json())
		.then(data => {
			for(i=0;i<4;i++){
				if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
					genereVignette(1,i," aprem",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
					genereVignette(1,i," aprem",data);
				}
			}
			for(i=4;i<12;i++){
				
				if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
					genereVignette(2,i," matin",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
					genereVignette(2,i," matin",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
					genereVignette(3,i," aprem",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
					genereVignette(3,i," aprem",data);
				}
			}
			if(document.getElementById('transparent').style.display == "none"){
				for(i=12;i<20;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(5,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(5,i," aprem",data);
					}
				}
				for(i=20;i<28;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(7,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(7,i," aprem",data);
					}
				}
			}			
		})
	}
	
	/*=============================Supérieure à 16h (16h inclus)========================================================*/
	
	if (new Date().getHours() >= "16"){
		
		fetch("https://api.openweathermap.org/data/2.5/forecast?q="+champ.value+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
		.then(reponse => reponse.json())
		.then(data => {
			
			for(i=0;i<8;i++){
				if (new Date(data.list[i].dt*1000).getHours() == "7"){
					genereVignette(0,i," matin",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "8"){
					genereVignette(0,i," matin",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
					genereVignette(1,i," aprem",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "17"){
					genereVignette(1,i," aprem",data);
				}
			}
			for(i=8;i<16;i++){
				
				if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
					genereVignette(2,i," matin",data);					
				}
				if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
					genereVignette(2,i," matin",data);					
				}
				if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
					genereVignette(3,i," aprem",data);
				}
				if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
					genereVignette(3,i," aprem",data);
				}
			}

			if(document.getElementById('transparent').style.display == "none"){
				for(i=16;i<24;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(5,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(5,i," aprem",data);
					}
				}
				for(i=24;i<31;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(7,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(7,i," aprem",data);
					}
				}
			}
		})		
	}	

/*========================================================== Remplissage des vignettes ==================================================================================================*/

fetch("https://api.openweathermap.org/data/2.5/forecast?q="+champ.value+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
	.then(reponse => reponse.json())
	.then(data => {
		
		//Heure vignette
		for (i=1;i<8;i++){
			document.getElementsByClassName("item")[i].getElementsByTagName('p')[0].textContent= new Date(data.list[i-1].dt*1000).getHours()+"h";
		}
		//Températures vignette
		for (i=1;i<8;i++){
			document.getElementsByClassName("item")[i].getElementsByTagName('p')[1].textContent= Math.floor(data.list[i-1].main.temp)+"°C";
		}
		//Image vignette
		for (i=1;i<8;i++){
			document.getElementsByClassName("item")[i].getElementsByTagName('img')[0].src= "http://openweathermap.org/img/wn/"+data.list[i-1].weather[0].icon+".png";
		}
	})

/*========================================================== Remplissage Texte après l'input (Ville Température et description meteo ==================================================================================================*/

fetch("https://api.openweathermap.org/data/2.5/weather?q="+champ.value+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
	.then(reponse => reponse.json())
	.then(data => {
		document.getElementsByTagName('main')[0].getElementsByTagName('section')[1].getElementsByTagName('article')[0].getElementsByTagName('p')[0].textContent = data.name;
		document.getElementsByTagName('main')[0].getElementsByTagName('section')[1].getElementsByTagName('article')[1].getElementsByTagName('p')[0].textContent = Math.floor(data.main.temp);
		document.getElementsByTagName('main')[0].getElementsByTagName('section')[1].getElementsByTagName('article')[3].getElementsByTagName('p')[0].textContent = data.weather[0].description[0].toUpperCase()+data.weather[0].description.slice(1);
		
		ville = data.name;
		
		document.getElementsByClassName("item")[0].getElementsByTagName('p')[0].textContent= "Maintenant";
		document.getElementsByClassName("item")[0].getElementsByTagName('p')[1].textContent= Math.floor(data.main.temp)+"°C";
		document.getElementsByClassName("item")[0].getElementsByTagName('img')[0].src= "http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
	})
	
	
	
	document.getElementById("champ").value = "";
}
/*========================================================== Fin fonction pour remplir les saisie ==================================================================================================*/  



/*===================================================Boutton 5 jours en plus======================================================================*/

function Next() {	
	document.getElementById('transparent2').style.display="block";
	document.getElementById('transparent').style.display="none";
	
	for(let k=0;k<4;k++){	
		let elt=document.createElement('section');
		let elt2=document.createElement('img');
		let elt3=document.createElement('article');
		let elt4=document.createElement('article');
		let elt5=document.createElement('article');
		let elt6=document.createElement('article');
		
		elt.setAttribute("class","vignette");
		
		if (new Date().getHours()<"7"){
		console.log("dsgsdgvb");
		console.log(ville);
		fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ville+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
		.then(reponse => reponse.json())
		.then(data => {
			if(document.getElementById('transparent').style.display == "none"){
				for(i=15;i<23;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(5,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(5,i," aprem",data);
					}
				}
				for(i=23;i<31;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(7,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(7,i," aprem",data);
					}
				}
			}			
		})
	}
	
		if (new Date().getHours()>="7" && new Date().getHours()<"16"){
			fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ville+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
		.then(reponse => reponse.json())
		.then(data => {
			if(document.getElementById('transparent').style.display == "none"){
				for(i=12;i<20;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(5,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(5,i," aprem",data);
					}
				}
				for(i=20;i<28;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(7,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(7,i," aprem",data);
					}
				}
			}			
		})
	}
		
		if (new Date().getHours() >= "16"){
		
			fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ville+"&lang=fr&units=metric&appid=9d63106b0003583259d7d973d5addfa9")
			.then(reponse => reponse.json())
			.then(data => {
			
				for(i=17;i<25;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8"){
						genereVignette(4,i," matin",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(5,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(5,i," aprem",data);
					}
				}
				for(i=25;i<33;i++){
					
					if (new Date(data.list[i].dt*1000).getHours() == "7" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "8" ) {
						genereVignette(6,i," matin",data);					
					}
					if (new Date(data.list[i].dt*1000).getHours() == "16" ) {
						genereVignette(7,i," aprem",data);
					}
					if (new Date(data.list[i].dt*1000).getHours() == "17" ) {
						genereVignette(7,i," aprem",data);
					}
				}
			})
		}
		
		elt.appendChild(elt2);
		elt.appendChild(elt3);
		elt.appendChild(elt4);
		elt.appendChild(elt5);
		elt.appendChild(elt6);
		document.getElementById('section1').appendChild(elt);
	}
}

/*===================================================Boutton 2 jours en moins======================================================================*/

function Previous() {
	document.getElementById('transparent').style.display="block";
	document.getElementById('transparent2').style.display="none";
	
	
	document.getElementsByClassName("vignette")[7].remove();
	document.getElementsByClassName("vignette")[6].remove();
	document.getElementsByClassName("vignette")[5].remove();
	document.getElementsByClassName("vignette")[4].remove();
}

/*============================================================================Slide Vignette toutes les 2 heures====================================================================================*/

const nextSlide = (event) => {
	const slider = event.parentNode.children[1]
	slider.append(slider.children[0])
}
const prevSlide = (event) => {
	const slider = event.parentNode.children[1]
	slider.prepend(slider.children[slider.children.length - 1])
}

/*============================================================================Fonction pour raccourcir les saisie====================================================================================*/

function genereVignette(index, i, moment, data) {
    const vignette = document.getElementsByClassName("vignette")[index];
    const articleElements = vignette.getElementsByTagName('article');
    
    articleElements[0].textContent = new Date(data.list[i].dt*1000).toLocaleDateString("fr-FR", {weekday: "long"}) + moment;
    articleElements[1].textContent = data.list[i].main.humidity + "%";
    articleElements[2].textContent = data.list[i].wind.speed + " Km/h";
    articleElements[3].textContent = Math.floor(data.list[i].main.temp) + "°C";
    
    const imgElement = vignette.getElementsByTagName('img')[0];
    imgElement.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
}


