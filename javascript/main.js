
let dataSearch;
const content = document.getElementById('content')
const textInput = document.getElementById('search')
const mainBtn = document.getElementById('mainBtn')
let urlRef='https://api.themoviedb.org/3/movie/popular?api_key=bbbf03a4400c81dfe007726ee5fe29c7';

async function getDataFromApi(urlRef){
  
    let api = await fetch(urlRef)
    
    let finalData = (await api.json()).results
    dataSearch = finalData;

    // search btn
    search()

    try{
        let data =''
        for(let i=0; i<finalData.length; i++){
            data+=`
                 <div class='text-center col-md-4 col-sm-6 col-6 item'>
                        <div class="layer">
                            <h3>${finalData[i].title}</h3>
                            <p>${(finalData[i].overview)}</p>
                        </div>
                        <img class='w-100' src='https://image.tmdb.org/t/p/w500/${finalData[i].poster_path}'/>
                        <small>${finalData[i].title}</small>
                </div>
            `
        }

        content.innerHTML = data;

    }catch{ 
        console.log('error while fetching data')
    }

    // returen data to show when mouse leave from search box
    textInput.addEventListener('blur' , ()=>{
        if(textInput.value == ''){
            getDataFromApi(urlRef)
        }
    })
}


// search btn
function search(){
    mainBtn.addEventListener('click' , ()=>{
        let dataFromSearch=``
        for(let index in dataSearch){
            if(String(dataSearch[index].title).toLowerCase().includes(String(textInput.value).toLowerCase())){
                dataFromSearch+=`
                    <div class='text-center col-md-4 col-sm-6 col-6 item'>
                        
                        <img class='w-100' src='https://image.tmdb.org/t/p/w500/${dataSearch[index].poster_path}'/>
                        <small>${dataSearch[index].title}</small>
                    </div>
                
                    `
            }else{
                
            }
        }
        content.innerHTML = dataFromSearch;
    })
}



(async ()=>{
    await getDataFromApi(urlRef)
})()

// link click
const links = document.querySelectorAll('a')
for(let i in links){
    links[i].onclick = function(){
        if(links[i].textContent =='Treandy'){
            urlRef = 'https://api.themoviedb.org/3/movie/popular?api_key=bbbf03a4400c81dfe007726ee5fe29c7'
            getDataFromApi(urlRef)
        }else if(links[i].textContent=='Movie Home'){
            urlRef = 'https://api.themoviedb.org/3/movie/now_playing?api_key=bbbf03a4400c81dfe007726ee5fe29c7'
            getDataFromApi(urlRef)
        }else{
            urlRef = 'https://api.themoviedb.org/3/trending/all/day?api_key=bbbf03a4400c81dfe007726ee5fe29c7'
            getDataFromApi(urlRef)
        }
    }
}