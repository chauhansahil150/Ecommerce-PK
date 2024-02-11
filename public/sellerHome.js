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
            <div class="pname">Product Name:<input type="text" placeholder="Name" value="${p.name} id="pname-${p.p_id}"" ></div>
            <div class="pdes">Description:<input type="text"placeholder="description" value=">${p.des}" id="pdesc-${p.p_id}"></div>
            <div class="pprice">Price:<input type="text"placeholder="Price"  value="${p.price}" id="pprice-${p.p_id}"></div>
            <div class="pstock">Stock:<input type="text"placeholder="Stock" value="${p.stock}" id="pstock-${p.p_id}"></div>
    
            <div class="paction">
                <div class="des_button"><button onclick="updateProduct('${p.p_id}')"> UPDATE </button></div>
                <div class="cart_button"><button onclick="deleteProduct('${p.p_id}')" > DELETE</button></div>
            </div>
    `;
  container.appendChild(productContainer);
}

let arr = [];
fetch("/seller/products",{
    method:'get',
    headers:{
        authorization:localStorage.getItem("token")
    }
})
.then(result=>{
    return result.json();
})
.then(products=>{
console.log(products);
arr=products;

products.forEach(singleProduct => {
    productCard(singleProduct)
});
})

function updateProduct(id){
    fetch(`/seller/product?p_id=${id}`,)
}
