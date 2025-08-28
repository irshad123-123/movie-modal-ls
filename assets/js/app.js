let cl = console.log;

const addMovieModal = document.getElementById('addMovieModal')
const backDrop = document.getElementById('backDrop')
const movieModal = document.getElementById('movieModal')
const onToggle = document.querySelectorAll('.onToggle')
const movieForm = document.getElementById('movieForm')
const movieNameControler = document.getElementById('movieName')
const movieImagControler = document.getElementById('movieImag')
const movieDescriptionControler = document.getElementById('movieDescription')
const movieRatingControler = document.getElementById('movieRating')
const movieContainer = document.getElementById('movieContainer')
const addMovieBtn = document.getElementById('addMovieBtn')
const updateMovieBtn = document.getElementById('updateMovieBtn')

uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
}

let movieArr = JSON.parse(localStorage.getItem('movieArr')) || [
    {
        movieDescription:"Ethan Hunt and the IMF team race against time to find the Entity, a rogue artificial intelligence that can destroy mankind.\n",
movieId:"a179b79e-7e2b-414f-97ca-76ecb2421ba8",
movieImg:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCWFhipbHINqU6gDKMy5IP_YXwPkzv94bGI5JjhxZ0biFmGDmv",
movieName:"Mission: Impossible – The Final Reckoning",
movieRating:"5",
movieId:uuid()
    }
];


const onShowModal = (eve) => {
    movieModal.classList.toggle('active')
    backDrop.classList.toggle('active')

    movieForm.reset()
    addMovieBtn.classList.remove('d-none')
    updateMovieBtn.classList.add('d-none')
}

addMovieModal.addEventListener('click', onShowModal)
onToggle.forEach(f => f.addEventListener('click', onShowModal))

const Rating = (r)=>{
    if(r>=4){
        return 'badge-success'
    }else if(r<=3 && r>=3){
        return 'badge-warning'
    }else{
        return 'badge-danger'
    }
}

const onClickEdit = (ele)=>{
    let Get_Id = ele.closest('.card').id;
    cl(Get_Id)
    localStorage.setItem('Get_Id', Get_Id)
    let Edit_Obj = movieArr.find(f=>f.movieId == Get_Id)
    cl(Edit_Obj)
    onShowModal(movieArr)

    movieNameControler.value = Edit_Obj.movieName
    movieImagControler.value = Edit_Obj.movieImg
    movieDescriptionControler.value = Edit_Obj.movieDescription
    movieRatingControler.value = Edit_Obj.movieRating

    addMovieBtn.classList.add('d-none')
    updateMovieBtn.classList.remove('d-none')
}

const onClickRemove = (ele)=>{
    let remove_Id = ele.closest('.card').id
    cl(remove_Id)
    let get_Index = movieArr.findIndex(f=>f.movieId == remove_Id)
    cl(get_Index)
    movieArr.splice(get_Index, 1)
    ele.closest('.col-md-3').remove()
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
}

const movieTemplating = (arr) => {
    let result = '';
    arr.forEach(f =>
        result += `
            <div class="col-md-3">
                <div class="card" id=${f.movieId}>
                    <div class="card-header pt-1 pb-1">
                        <div class="row d-flex justify-content-between">
                            <div class="col-md-10"><h4>${f.movieName}</h4></div>
                            <div class="col-md-2"><strong class="badge ${Rating(f.movieRating)} rating">${f.movieRating}</strong></div>
                        </div>
                    </div>
                    <div class="card-body pt-1 pb-1">
                        <div class="content">
                            <img src="${f.movieImg}"
                                title="${f.movieName}" alt="${f.movieName}">
                            <p> <strong>${f.movieName}</strong>
                            ${f.movieDescription}
                            </p>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick = "onClickEdit(this)" class="btn sm-btn nfx-sec-btn">Edit</button>
                        <button onclick="onClickRemove(this)" class="btn sm-btn nfx-pri-btn">Remove</button>
                    </div>
                </div>
            </div>
                    `)
    movieContainer.innerHTML = result;
}

movieTemplating(movieArr)

const onSubmitMovie = (eve) => {
    eve.preventDefault();
    let obj = {
        movieName: movieNameControler.value,
        movieImg: movieImagControler.value,
        movieDescription: movieDescriptionControler.value,
        movieRating: movieRatingControler.value,
        movieId: uuid()
    }
    cl(obj)
    movieForm.reset()
    onShowModal()
    movieArr.push(obj)
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
    // movieTemplating(movieArr)
    let div = document.createElement('div')
    div.id = obj.movieId;
    div.className = 'col-md-3'
    div.innerHTML = `<div class="card">
                    <div class="card-header pt-1 pb-1">
                        <div class="row d-flex justify-content-between">
                            <div class="col-md-10"><h4>${obj.movieName}</h4></div>
                            <div class="col-md-2"><strong class="badge ${Rating(obj.movieRating)} rating">${obj.movieRating}</strong></div>
                        </div>
                    </div>
                    <div class="card-body pt-1 pb-1">
                        <div class="content">
                            <img src="${obj.movieImg}"
                                title="${obj.movieName}" alt="${obj.movieName}">
                            <p> <strong>${obj.movieName}</strong>
                            ${obj.movieDescription}
                            </p>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick = "onClickEdit(this)" class="btn sm-btn nfx-sec-btn">Edit</button>
                        <button onclick="onClickRemove(this)" class="btn sm-btn nfx-pri-btn">Remove</button>
                    </div>
                    </div>`
    movieContainer.append(div)
}

movieForm.addEventListener('submit', onSubmitMovie)

const onUpdateMovie =(eve)=>{
    let update_Id = localStorage.getItem('Get_Id')
    cl(update_Id)
    let update_Obj ={
         movieName: movieNameControler.value,
        movieImg: movieImagControler.value,
        movieDescription: movieDescriptionControler.value,
        movieRating: movieRatingControler.value,
        movieId: update_Id
    }
    cl(update_Obj)
    movieForm.reset()
    let get_Index = movieArr.findIndex(f=>f.movieId == update_Id)
    cl(get_Index)
    movieArr[get_Index]= update_Obj

    localStorage.setItem('movieArr', JSON.stringify(movieArr))
    onShowModal()
    movieTemplating(movieArr)

    
}


updateMovieBtn.addEventListener('click', onUpdateMovie)