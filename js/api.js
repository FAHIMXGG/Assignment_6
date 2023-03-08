///Data fetch
const loadAI = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    AIData(data.data.tools, dataLimit);
}
// data push
const AIData = (tools, dataLimit) => {
    //console.log(tools);
    //console.log(dataLimit);
    const cardContainer = document.getElementById('card-container')
    // show all function
    const showAll = document.getElementById('show-all');
    if (dataLimit && tools.length > 6) {
      tools =tools.slice(0,6);
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }
// short by date
    function byDate(a, b){
        return new Date(a.published_in).valueOf() - new Date(b.published_in).valueOf();
    }
    // const log = console.log
    // //log('\n\n short by date');
    //(tools.sort(byDate));
    document.getElementById('sort').addEventListener('click', function(){
         const toolsShort = (tools.sort(byDate));
         console.log(toolsShort);
        //(tools.sort(byDate));
        cardContainer.innerHTML = "";
    toolsShort.forEach(tool => {
        console.log(tool)
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card p-3">
        <img src="${tool.image}" class="card-img-top rounded" alt="...">
        <div class="card-body">
                        <h5 class="card-title fs-3">Features</h5>
                        <ol class="list-decimal text-xl text-gray-600">
            <li>${tool.features[0]}</li>
            <li>${tool.features[1]}</li>
            <li>${tool.features[2]}</li>

        </ol>
                        <hr>
                        <div class="card-bottom-sec d-flex justify-content-between align-items-center">
                        <div class="title-and-date">
                            <h5 class="card-title fs-5 py-2">${tool.name}</h5>
                            <p class="align-items-end"><img class="icon-cal align-items-end" src="./img/callender_icon.png" alt="">${tool.published_in}
                            </p>
                        </div>
                        <div class="arrow">
                            <img onclick="loadDetails('${tool.id}')" class="arrow-img img-fluid img-thumbnail" 
                            data-bs-toggle="modal" data-bs-target="#DetailModal" src="./img/arrow_icon.png" alt="">
                            
                        </div>
                        </div>
                   </div>
        `;
        cardContainer.appendChild(cardDiv)
    })
        
        
    })


    
// get card info
    cardContainer.innerHTML = "";
    tools.forEach(tool => {
        console.log(tool)
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card p-3">
            <img src="${tool.image}" class="card-img-top rounded" alt="...">
            <div class="card-body">
                <h5 class="card-title fs-3">Features</h5>
                <ol class="list-decimal text-xl text-gray-600">
                    <li>${tool.features[0]}</li>
                    <li>${tool.features[1]}</li>
                    <li>${tool.features[2]}</li>
                </ol>
            <hr>
                    <div class="card-bottom-sec d-flex justify-content-between align-items-center">
                        <div class="title-and-date">
                            <h5 class="card-title fs-5 py-2">${tool.name}</h5>
                            <p class="align-items-end"><img class="icon-cal align-items-end" src="./img/callender_icon.png" alt="">${tool.published_in}
                            </p>
                        </div>
                        <div class="arrow">
                            <img onclick="loadDetails('${tool.id}')" class="arrow-img img-fluid img-thumbnail" 
                            data-bs-toggle="modal" data-bs-target="#DetailModal" src="./img/arrow_icon.png" alt="">
                            
                        </div>
                    </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv)
    })
    //close
    toggleSpinner(false);

    // document.getElementById('sort').addEventListener('click', function() {
    //     tools.sort(byDate);
    //     renderTools(tools);
    // })

    // // render initial tools
    // renderTools(tools);
}
//toggleSpinner
const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    }
    else {
        loadingSpinner.classList.add('d-none');
    }
}
// data limit 6
const dataShow = (dataLimit) =>{
    //start
    toggleSpinner(true);
    loadAI(dataLimit);
  }
  dataShow(6);


// modal data fetch
const loadDetails = async id => {
    const url = `
    https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCardDetails(data.data);
    console.log(data.data);

}
// get modal data
const displayCardDetails = info => {
    console.log(info);
//     const modalTitle = document.getElementById('DetailModalLabel');
//   modalTitle.innerText = info.id;
  const phoneDetails= document.getElementById('card-details');
  phoneDetails.innerHTML = `
                        <div class="left-modal mx-4 border border-success bg-danger bg-opacity-25 p-3 border-opacity-10 rounded-4 mt-3">
                            <h3 class="model-description pt-3 pb-2 fs-3 " >
                                ${info.description}
                            </h3>
                            <div class="price-cards justify-content-around pt-4 pb-4">
                                <div class="price price1 card px-2 pt-1 pb-1 rounded fs-5 text-center"> ${info.pricing ? info.pricing[0].price : 'No <br> Data'} <br> ${info.pricing ? info.pricing[0].plan : ''}</div>
                                <div class="price price2 card px-2 pt-1 pb-1 rounded fs-5 text-center"> ${info.pricing ? info.pricing[1].price : 'No <br> Data'} <br> ${info.pricing ? info.pricing[1].plan : ''}</div>
                                <div class="price price3 card px-2 pt-1 pb-1 rounded fs-5 text-center"> ${info.pricing ? info.pricing[2].price : 'No <br> Data'} <br> ${info.pricing ? info.pricing[2].plan : ''}</div>
                            </div>
                            <div class="d-flex justify-content-between text-start px-4">
                                <div class="text-start">
                                    <h3 class="text-start fs-5">Features</h3>
                                    <ul class="features-list fs-6">
                                        <li class="text-start pt-2 fs-6">${info.features[1].feature_name}</li>
                                        <li class="text-start pt-2 fs-6">${info.features[2].feature_name}</li>
                                        <li class="text-start pt-2 fs-6">${info.features[3].feature_name}</li>
                                    </ul>
                                </div>
                                <div class="text-start">
                                    <h3 class="text-start fs-5">Integrations</h3>
                                    <p id="no-data" class="d-none"></p>
                                    <ul id="data-found" class="features-list fs-6">
                                        <li class="text-start pt-2 fs-6">${ info.integrations && info.integrations[0] ? info.integrations[0] : 'No data Found'}</li>
                                        <li class="text-start pt-2 fs-6">${ info.integrations && info.integrations[1] ? info.integrations[1] : 'No data Found'}</li>
                                        <li class="text-start pt-2 fs-6">${ info.integrations && info.integrations[2] ? info.integrations[2] : 'No data Found'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="mx-4 border border-success bg-opacity-25 p-3 border-opacity-10 rounded-4 align-items-center text-center mb-3 mt-3">
                            <img class="modal-img rounded" src="${info.image_link[0]}" alt="">
                            <p id="accuracy" class="accuracy">% Accuracy</p>
                            <h2 class="fs-4 pt-2 pb-1">${info.input_output_examples ? info.input_output_examples[0].input : 'Can you give any example?'}</h2>
                            <p class="pt-1 pb-2">${info.input_output_examples ? info.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}
                            </p>
                        </div>
                        
  `;
// integrations no data
const integrations = info.integrations;
const noDataElement = document.getElementById('no-data');
const dataElement = document.getElementById('data-found')
const listItems = document.querySelectorAll('.features-list li');

if (integrations) {
  for (let i = 0; i < integrations.length && i < listItems.length; i++) {
    listItems[i].textContent = integrations[i];
  }
} else {
  noDataElement.textContent = 'No data found.';
  noDataElement.classList.remove('d-none');
  dataElement.classList.add('d-none')
 
}


// accuracy function
  const accuracyScore = info.accuracy.score;
const accuracyElement = document.getElementById('accuracy');

if (accuracyScore) {
  const percentage = accuracyScore * 100;
  accuracyElement.textContent = `${percentage}% Accuracy`;
} else {
  accuracyElement.classList.add('d-none');
}
}

//onclick="loadDetails('${tool.id}')"
//loadAI();