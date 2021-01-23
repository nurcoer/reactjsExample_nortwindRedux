import * as actionTypes from "./actionTypes";

export function getProductSuccess(products) {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: products,
  };
}

export function createProductSuccess(product) {
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
    payload: product,
  };
}

export function updateProductSuccess(product) {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product,
  };
}

//gelen product db.jsondan(vt'den)
//al güncellemeyse işlem put yap ekleme işlemiyse post yap)
//gönderdiğim veriyi stringe çevir ve başlık ekle.
export function saveProductApi(product) {
  return fetch("http://localhost:3000/products/" + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

//gönderilcek veri türünü belirle veri update işlemiyse updateProductSuccess çalıştır.
//ekleme işlemiyse createProductSuccess çalıştır.
//savedProduct veri tabanına gönderilmiş kaydedilmiş yada güncellenmiş değer.
export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product).then((savedProduct) => {
      product.id
        ? dispatch(updateProductSuccess(savedProduct))
        : dispatch(createProductSuccess(savedProduct));
    })
    .catch((error) => {
        throw error;
    });
  };
}

//asenkron fonksiyon
//gelen response'u json'a çeviriyor eğer bir 
//hata oluşursa yakalama işlemi yapılabiliyor.
export async function handleResponse(response){
    if(response.ok){
        return response.json();
    }
    const error = await response.text();
    throw  new Error(error);
}

export function handleError(error){
    console.error("Bir hata oluştu");
    throw error;
}

export function getProducts(categoryId) {
  return function (dispatch) {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductSuccess(result)));
  };
}
