import React, { useState, useContext } from "react";
import { ProductsContext } from "../../ProductContext";
import "./file.css";
import { ToastContainer, toast } from "react-toastify";

const FileUpload = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);  
  const [idToDelete, setIdToDelete] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
  
    try {
      const response = await fetch(
        "http://localhost:9000/product/postproduct",
        {
          method: "POST",
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const newProduct = await response.json();
      console.log(newProduct);
      setProducts([...products, newProduct]);
  
      setName("");
      setBrand("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImage(null);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  const handleDelete = async () => {
    console.log("Deleting product with ID:", idToDelete); // Check if ID is correct
    try {
      const response = await fetch(
        `http://localhost:9000/product/delproducts/${idToDelete}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      setProducts(products.filter((product) => product.id !== parseInt(idToDelete)));
      setIdToDelete("");
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };
  
  return (
    <div className="centered">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={handleFileChange} />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit" className="sub">
          Submit
        </button>
        <div>
          <label>ID to Delete</label>
          <input
            type="text"
            value={idToDelete}
            onChange={(e) => setIdToDelete(e.target.value)}
          />
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default FileUpload;
