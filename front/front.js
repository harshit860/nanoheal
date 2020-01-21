var all_movies = []

var movie_input = document.getElementById('movieinput')
var poster_input = document.getElementById('posterinput')
var moviesearch = document.getElementById('movsearch')

function getdata(){
    var all_data = new XMLHttpRequest();
    all_data.open('GET', 'http://127.0.0.1:5000/getmovie');
    all_data.send();
    all_data.onload = function () {
        if (all_data.status == 200) {
            var data1 = JSON.parse(all_data.response)
            // console.log(data1.data)
            data1.data.map((a=>{
                all_movies.push(a)
            }))
            show()
            
            console.log(all_movies)
        }
        else {
            console.log(all_data.status)
        }
    }
    if(movie_input)
    {
        show()
    }
}
var btnshow = document.getElementById('searchme')
btnshow.addEventListener('click',show)
function show(){
    var search_val = moviesearch.value
    var body = document.getElementById('show')
    body.innerHTML=''
    for(var a =0;a<all_movies.length;a++)
    {
        if(search_val)
        {
            var divp = document.createElement('div')
            divp.setAttribute('id','each')
            var newimg = document.createElement('img')
            newimg.src = all_movies[a][1]
            newimg.setAttribute('id','img1')
            var newelem = document.createElement('p')
            if(search_val == all_movies[a][2])
            {
                newelem.textContent = "Movie Title :"+all_movies[a][2]
                newelem.setAttribute('id','movietitle')
                divp.appendChild(newimg)
                divp.appendChild(newelem)
                
                body.appendChild(divp)
            }
            
        }
        else
        {
            var divp = document.createElement('div')
            divp.setAttribute('id','each')
            var newimg = document.createElement('img')
            newimg.src = all_movies[a][1]
            newimg.setAttribute('id','img1')
            var newelem = document.createElement('p')
                newelem.textContent = "Movie Title :"+all_movies[a][2]
                newelem.setAttribute('id','movietitle')
                divp.appendChild(newimg)
                divp.appendChild(newelem)
                
                body.appendChild(divp)
            
        }
        
    }

}

var addbutton = document.getElementById('create')
addbutton.addEventListener('click', function () {
    var send = new XMLHttpRequest()
    send.onload = function () {
        if (send.status == 200) {
            console.log(JSON.parse(send.response))
        }
        else {
            console.log("Error Code is:" + send.status);
        }
    }

    send.open('POST', 'http://127.0.0.1:5000/create')
    send.setRequestHeader('accept', 'application/json');
    var data={
        moviename:movie_input,
        poster:poster_input
    }
   
    send.send(data)
})
getdata()