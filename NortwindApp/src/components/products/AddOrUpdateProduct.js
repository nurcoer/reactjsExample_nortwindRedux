import React, { useEffect, useState } from "react";
//setState yerine useState
//useEffect ise componentDidMounts yerine
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

//...props mevcut component proplarına
// yukarıda verilenleride ekle ve kopyasunı oluştur.
function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  //propslardaki product'ı setProduct ile değiştirebilirim.
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  //ana sayfadan gelmeyen kullanıcı için categoriler
  //gelmez o yüzden direkt http adresi ile gelener için
  //categorileri getiriyoruz.
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    //event target içindeli name ve  value yu atamış oluyoruz.
    const { name, value } = event.target;
    //previousProduct gelen değer categoryId alanıysa değeri int'e çevir
    //aksi taktirde olduğu gibi değeri name'e bas
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    if (value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "bu alan boş bırakılamaz",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }
  }

  function handleSave(event) {
    //tüm sayfanın refresh etmesini engelle
    event.preventDefault();
    saveProduct(product).then(() => {
      //daha önceki geldiğimiz sayfalara yönlendirme
      //yapmak için kullanılır.
      history.push("/");
    });
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  //git parametrelere bak ordan productId'yi çek
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};

  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
