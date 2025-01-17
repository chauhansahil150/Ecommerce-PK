const container=document.getElementById('container')
const noOfProducts = document.getElementById('no_of_products');

function productCard(p) {
    const container = document.getElementById("container");
    const productContainer = document.createElement("productcontainer");
    productContainer.className = "productcontainer";
    productContainer.id = "pContain";
    productContainer.innerHTML = `<div class="imgcontainer">
                                        <img
                                            src="${p.image}" />
                                    </div>
                                    <div class="pname" id="pname-${p.p_id}"> ${p.name}</div>
                                    <div class="pprice" id="pprice-${p.p_id}">₹${p.price}</div>
                                    <div class="paction">
                                        <div class="des_button"> <button onclick="showDesc('${p.p_id}')"> View description</button></div>
                                        <div class="cart_button"><button onclick="addtoCart('${p.p_id}')"> Add to cart</button></div>
                                    </div>`
    container.appendChild(productContainer);
}
let array =[];

// array.forEach((p) => {
//     productCard(p);
// })


function showDesc(id) {
    console.log("showDesc=>", id);
    const newarray = array.filter(item => {
        return item.p_id == id;
    })
    console.log(newarray[0]);
    popupdesbox(newarray[0]);
}

function popupdesbox(p) {
    const popupbox = document.getElementById("popupbox");
    console.log(popupbox)
    popupbox.style.visibility='visible';

    const popid = Date.now();
    // popupbox.id = popid;
    popupbox.innerHTML = ` <div class="popuplabel">
    <button id="popupbtn" onclick="crossbtn(${popid})"> X</button> </div>
    <div class="popupdescontainer">
        <div class="popupleft"> 
            <img src="${p.image}" class='product_image'/>
        </div>
        <div class="popupright">
            <div class="right1"> ${p.name}</div>
            <div class="right2">${p.price}</div>
            <div class="right3">${p.des}
            </div>
        </div>
    </div> `
    
}
function crossbtn(id) {
    const popupbox = document.getElementById("popupbox");
    console.log(popupbox)
    popupbox.style.visibility='hidden';
}

function addtoCart(id) {
    if(!localStorage.getItem("token")){
        location.href="/login";
        return;
    }
    fetch(`/cart?p_id=${id}`,{
        method:"POST",
        headers:{
            authorization:localStorage.getItem("token")
        }
    })
    .then((result) => {
        if(result.status==409)
         alert("Product already exist in the cart");
        if(result.status==304)
          alert("something went wrong");
          if(result.ok){
            alert("Product added to cart");
          }
    }).catch((err) => {
        console.log(err);        
    });
}
let onlinearray = [];
function fetchAndDisplayProducts(pageNo){
    container.innerHTML='';
    const noOfProducts = document.getElementById('no_of_products').value;
    fetch(`/products?start=${pageNo}&no_of_products=${noOfProducts}`)
    .then((result) => {
        return result.json();
    }).then((data) => {
        console.log(data.length);
        if(data.length<=0){
            const h2 = document.getElementById("h2")

             h2.innerText ="NO Item HERE";
             return;
        }
        array=data;
        // console.log(data);
        data.forEach(p => {
        //     const obj = {
        //         id: p.id,
        //         img: p.thumbnail, 
        //         name: p.title,
        //         price: p.price,
        //         des: p.description
        //     }
            productCard(p);
        //     onlinearray.push(obj);
        });

    }).catch(err=>{
        console.log(err)

    });
}
function createPagination(items, itemperPage) {
    console.log(items, itemperPage)
    {
      $('#pagination').pagination({
        items: items,
        itemsOnPage: itemperPage,
        onPageClick: function (pageNo) {
          fetchAndDisplayProducts(pageNo);
        }
      });
    }
  }
  createPagination(100,10);
  fetchAndDisplayProducts(4);

  noOfProducts.addEventListener('change', () => {
    createPagination(100, noOfProducts.value);
    fetchAndDisplayProducts(1);
  });

function logout(){
    localStorage.removeItem("token");
    location.href='/login';
}

function addProducttoCart(){}
