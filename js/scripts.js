window.addEventListener('load',function(){

    paises = [];
    favoritos = [];
    ordem = [];


    const valores=fetch('https://restcountries.com/v2/all').then(res=>{ //fetch para fzr acesso ao url || res recebe o retorno da função
        res.json().then(dados=>{ // tratamento do objeto
                // console.log(dados);
                prepararArrays(dados);
            });
    }).catch(erro=>{
        console.log(erro+" erro na requisição");
    });

    // console.log(valores);
});

function prepararArrays(dados){
    for(i = 0; i < dados.length; i++){
        paises.push(dados[i]);
        ordem.push(dados[i]);
    }
    // console.log("paises: "+paises);
    // console.log("favoritos: "+favoritos);
    // atualizaPaises(dados);
    // atualizaFavoritos(favoritos);
    atualizar();

}

function atualizar(){
    paises.sort(function(a,b){
        return ordem.indexOf(a) - ordem.indexOf(b);
    });
    favoritos.sort(function(a,b){
        return ordem.indexOf(a) - ordem.indexOf(b);
    });
    atualizaPaises(paises);
    atualizaFavoritos(favoritos);
}



function atualizaPaises(dados){
    if(dados.length<1){
        const divPaises=document.querySelector('#paises'); //Div paises
        divPaises.innerHTML = "";

        var h1 = document.createElement("h1");
        h1.textContent = "Todos os Países";
        h1.classList.add("legenda");
        divPaises.appendChild(h1);
        
        var p = document.createElement("p");
        p.textContent = "Todos os países foram favoritados!";
        p.classList.add("legenda2");
        divPaises.appendChild(p);
    }
    else{
        function criarBotãoFavorito(index){
            var btnFavorito = document.createElement("button");
            btnFavorito.classList.add("btnFavorito");
            function favoritar(){
                console.log("favoritou " + dados[index].name + "|" + dados[index].dados);
                favoritos.push(dados[index]);
                dados.splice(index,1);
                atualizar();
            }
            btnFavorito.addEventListener("click",favoritar);
            return btnFavorito;
        }
    
        const divPaises=document.querySelector('#paises'); //Div paises
        divPaises.innerHTML = "";

        var populacaoTotal = 0;
        var ul = document.createElement("ul");

        for (var i = 0; i < dados.length; i++){
            //criação de elementos
            var nome = dados[i].name; //nome do pais
            var nomeTraducao = dados[i].translations.br; //nome do pais traduzido
            var bandeira = dados[i].flag; //bandeira do pais
            var populacao = dados[i].population; //população do pais
            var continente = dados[i].region; //continente do pais
            populacaoTotal+=populacao; //soma da população
    
            var li = document.createElement("li");
    
            var spanNome = document.createElement("span"); //span nome do pais
            spanNome.textContent = nome + " (" + nomeTraducao + ")";
    
            var spanbandeira = document.createElement("span");//span bandeira do pais
            spanbandeira.innerHTML = "<img src=" + bandeira +" class='bandeiras'></img>";
    
            var spanCoracao = document.createElement("span");//span coracao
            spanCoracao.innerHTML = "<img src='./src/btnFavorito.svg' class='coracao'></img>";

            var spanContinente = document.createElement("span");//span continente do pais
            
            switch (continente){

                case "Africa":              spanContinente.textContent = "África";
                                            spanContinente.classList.add("africa");
                                            break;
                
                case "Americas":            spanContinente.textContent = "Américas";
                                            spanContinente.classList.add("america");
                                            break;
                
                case "Asia":                spanContinente.textContent = "Ásia";
                                            spanContinente.classList.add("asia");
                                            break;

                case "Europe":              spanContinente.textContent = "Europa";
                                            spanContinente.classList.add("europa");
                                            break;

                case "Oceania":             spanContinente.textContent = "Oceania";
                                            spanContinente.classList.add("oceania");
                                            break;

                case "Antarctic Ocean":     spanContinente.textContent = "Oceano Antártico";
                                            spanContinente.classList.add("oceano-antartico");
                                            break;
                
                case "Polar":               spanContinente.textContent = "Polar";
                                            spanContinente.classList.add("polar");
                                            break;

            }


            // spanContinente.textContent = continente;
            spanContinente.classList.add("continentePais");


    
            var btnFavorito = criarBotãoFavorito(i);
            btnFavorito.appendChild(spanCoracao);

            var spanInfo = document.createElement("span"); //span info
            spanInfo.classList.add("spanInfo");
    
    
            spanInfo.appendChild(btnFavorito);
            spanInfo.appendChild(spanNome);
            spanInfo.appendChild(spanContinente);
    
            li.appendChild(spanInfo);
            li.appendChild(spanbandeira);
    
            ul.appendChild(li);
        }

        var spanPopulacao = document.createElement("span");
        spanPopulacao.classList.add("legenda2");
        spanPopulacao.textContent = "População Total: " + populacaoTotal;
        
        var spanTotalPaises = document.createElement("span");
        spanTotalPaises.classList.add("legenda2");
        spanTotalPaises.textContent = " Total de Países: " + dados.length;

        var h1 = document.createElement("h1");
        h1.textContent = "Países do Mundo";
        h1.classList.add("legenda");
        divPaises.appendChild(h1);
        divPaises.appendChild(spanPopulacao);
        divPaises.appendChild(spanTotalPaises);
        divPaises.appendChild(ul);
    }

}

function atualizaFavoritos(dados){
    if(dados.length<1){
        const favoritos=document.querySelector('#favoritos'); //Div favoritos
        favoritos.innerHTML = "";
        var h1 = document.createElement("h1");
        h1.textContent = "Países Favoritos";
        h1.classList.add("legenda");
        favoritos.appendChild(h1);
        var p = document.createElement("p");
        p.textContent = "Você ainda não possui nenhum favorito";
        p.classList.add("legenda2");
        favoritos.appendChild(p);
    }
    else{
        function criarBotãoFavorito(index){
            var btnFavorito = document.createElement("button");
            btnFavorito.classList.add("btnFavorito");
            function favoritar(){
                console.log("des-favoritou " + dados[index].name);
                paises.push(dados[index]);
                dados.splice(index,1);
                atualizar();
            }
            btnFavorito.addEventListener("click",favoritar);
            return btnFavorito;
        }
    
        const favoritos=document.querySelector('#favoritos'); //Div favoritos
        favoritos.innerHTML = "";
        var populacaoTotal = 0;
        var ul = document.createElement("ul");

        for (var i = 0; i < dados.length; i++){
            //criação de elementos
            var nome = dados[i].name; //nome do pais
            var nomeTraducao = dados[i].translations.br; //nome do pais traduzido
            var bandeira = dados[i].flag; //bandeira do pais
            var continente = dados[i].region; //continente do pais
            var populacao = dados[i].population; //população do pais
            populacaoTotal += populacao; //soma da população
    
            var li = document.createElement("li");
    
            var spanNome = document.createElement("span"); //span nome do pais
            spanNome.textContent = nome + " (" + nomeTraducao + ")";
    
            var spanbandeira = document.createElement("span");//span bandeira do pais
            spanbandeira.innerHTML = "<img src=" + bandeira +" class='bandeiras'></img>";

            var spanCoracao = document.createElement("span");//span coracao 
            spanCoracao.innerHTML = "<img src='./src/btnDesFavorito.svg' class='coracao'></img>";

            var spanContinente = document.createElement("span");//span continente do pais

            switch (continente){

                case "Africa":              spanContinente.textContent = "África";
                                            spanContinente.classList.add("africa");
                                            break;
                
                case "Americas":            spanContinente.textContent = "Américas";
                                            spanContinente.classList.add("america");
                                            break;
                
                case "Asia":                spanContinente.textContent = "Ásia";
                                            spanContinente.classList.add("asia");
                                            break;

                case "Europe":              spanContinente.textContent = "Europa";
                                            spanContinente.classList.add("europa");
                                            break;

                case "Oceania":             spanContinente.textContent = "Oceania";
                                            spanContinente.classList.add("oceania");
                                            break;

                case "Antarctic Ocean":     spanContinente.textContent = "Oceano Antártico";
                                            spanContinente.classList.add("oceano-antartico");
                                            break;

                case "Polar":               spanContinente.textContent = "Polar";
                                            spanContinente.classList.add("polar");
                                            break;

            }


            // spanContinente.textContent = continente;
            spanContinente.classList.add("continentePais");

    
            var btnFavorito = criarBotãoFavorito(i);
            btnFavorito.appendChild(spanCoracao);

            var spanInfo = document.createElement("span"); //span info
            spanInfo.classList.add("spanInfo");
    
    
            spanInfo.appendChild(btnFavorito);
            spanInfo.appendChild(spanNome);
            spanInfo.appendChild(spanContinente);

            
    
            li.appendChild(spanInfo);
            li.appendChild(spanbandeira);
    
            ul.appendChild(li);
        }
        
        var spanPopulacao = document.createElement("span");
        spanPopulacao.classList.add("legenda2");
        spanPopulacao.textContent = "População Total: " + populacaoTotal;

        var spanTotalPaises = document.createElement("span");
        spanTotalPaises.classList.add("legenda2");
        spanTotalPaises.textContent = " Total de Países: " + dados.length;

        var h1 = document.createElement("h1");
        h1.textContent = "Países Favoritos";
        h1.classList.add("legenda");
        favoritos.appendChild(h1);
        favoritos.appendChild(spanPopulacao);
        favoritos.appendChild(spanTotalPaises);
        favoritos.appendChild(ul);
    }
}

function filterContinent(continente){

    if(continente == "all"){

        atualizaPaises(paises);
        atualizaFavoritos(favoritos);

    }else{

        function retornaPaisFiltrado (value){
            if (value.region == continente)
            return value;
        }
    
        var paisesFiltrados = paises.filter(retornaPaisFiltrado);
        paisesFiltrados.forEach(paisFiltrado => { 
            // console.log(paisFiltrado);
        })
    
        atualizaPaises(paisesFiltrados);
    
        var favoritosFiltrados = favoritos.filter(retornaPaisFiltrado);
        favoritosFiltrados.forEach(favoritoFiltrado => { 
            // console.log(paisFiltrado);
        })
    
        atualizaFavoritos(favoritosFiltrados);

    }
}

function buscaPais(){
    let input = document.getElementById('searchbar').value
        input = input.toLowerCase();
        
        pesquisaPaises = [];

        for (i = 0; i < paises.length; i++) { 
            if (paises[i].translations.br.toLowerCase().includes(input)) {
                pesquisaPaises.push(paises[i]);
                console.log(paises[i].translations.br.toLowerCase());
            }
            // else {
            //     index = pesquisaPaises.indexOf(paises[i].name);
            //     pesquisaPaises.splice(index,1);
            // }
        }

        console.log("--------------");
        atualizaPaises(pesquisaPaises);
        pesquisaPaises = [];
}

// inputP = document.getElementById('searchbar');

// inputP.addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') { 
    
//        //var paisestraduzido = paises.translations;
//        //var pesquisa = paises.name.indexOf(inputP.value);

//        //console.log(paisestraduzido)
//        //console.log(pesquisa)

//        var indice = '';

//        var searchTerm = inputP.value,
//        index = -1;
//        for(var i = 0, len = paises.length; i < len; i++) {
           
//         if (paises[i].translations.br === searchTerm) {
//                index = i;
//                console.log(index);
//                indice = index;
//                break;
//             }
//         }

//         if(indice != ''){

//             alert(" O país: " + paises[indice].translations.br + "\n Tem " + paises[indice].population + " residentes \n E ele se localiza na: " + paises[indice].region);

//         }

//         inputP.value ='';

//     }
// })
