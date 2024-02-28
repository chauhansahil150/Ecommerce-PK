const container=document.getElementById('container')
const noOfProducts = document.getElementById('no_of_products');
function productCard(p) {
    const container = document.getElementById("container");
    const productContainer = document.createElement("productcontainer");
    productContainer.className = "productcontainer";
    productContainer.id = `productcontainer-${p.p_id}`;
    productContainer.innerHTML = `
    <div class="imgcontainer">
                <img
                    src="${p.image}"/>
            </div>
            <div class="pname">Product Name:<input type="text" placeholder="Name" value="${p.name}" id="pname-${p.p_id}" ></div>
            <div class="pdes">Description:<input type="text" placeholder="description" value="${p.des}" id="pdes-${p.p_id}"> </div>
            <div class="pprice">Price:<input type="text"placeholder="Price"  value="${p.price}" id="pprice-${p.p_id}"></div>
            <div class="pstock">Stock:<input type="text"placeholder="Stock" value="${p.stock}" id="pstock-${p.p_id}"></div>
    
            <div class="paction">
                <div class="des_button"><button onclick="updateProduct('${p.p_id}')"> UPDATE </button></div>
                <div class="cart_button"><button onclick="deleteProduct('${p.p_id}')" > DELETE</button></div>
            </div> `;
    container.appendChild(productContainer);
}

let arr = [];
function fetchAndDisplayProducts(pageNo) {
    container.innerHTML=``;
    const noOfProducts = document.getElementById('no_of_products').value;
    fetch(`/seller/products?start=${pageNo}&no_of_products=${noOfProducts}`, {
        method: 'get',
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
        .then(result => {
            if (result.status == 401) {
                location.href = result.url;
                return [];
            }
            return result.json();
        })
        .then(products => {
            console.log(products);
            arr = products;

            arr.forEach(singleProduct => {
                productCard(singleProduct)
            });
        })
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
  createPagination(100,4);
  noOfProducts.addEventListener('change', () => {
    createPagination(100, noOfProducts.value);
    fetchAndDisplayProducts(1);
  });
  fetchAndDisplayProducts(4);


function updateProduct(id) {
    const name = document.getElementById(`pname-${id}`).value;
    const des = document.getElementById(`pdes-${id}`).value;
    const price = document.getElementById(`pprice-${id}`).value;
    const stock = document.getElementById(`pstock-${id}`).value;
    console.log(name);
    console.log(des);
    console.log(price);
    console.log(stock);
    const updatedProduct = {
        name,
        des,
        price,
        stock
    }
    console.log(updatedProduct);
    fetch(`/seller/product?p_id=${id}`, {
        method: 'put',
        headers: {
            'content-type': 'application/json',
            authorization: localStorage.getItem("token")
        },
        body: JSON.stringify(updatedProduct)
    })
        .then(res => {
            if (res.status == 200) {
                alert('product updated successfully');
                return;
            }
            if (res.status == 500) {
                alert('Internal Server Error');
                return;
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function deleteProduct(id) {
    const productContainer = document.getElementById(`productcontainer-${id}`)
    fetch(`/seller/product?p_id=${id}`, {
        method: 'delete',
        headers: {
            authorization: localStorage.getItem("token")
        }
    }).then(res => {
        if (res.status == 200) {
            alert('product deleted successfully');
            productContainer.remove();
        }
        if (res.status == 500) {
            alert('Internal Server Error');
            return;
        }
        /*const newData=arr.filter(p=>p.p_id!=id);
        console.log(newData);
        arr=newData;
        displayAllProducts();*/
    })
        .catch(err => {
            console.log(err);
        })

}

function logout() {
    location.href = '/login';
    localStorage.removeItem("token");

}