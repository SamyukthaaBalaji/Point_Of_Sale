import React, { useState, useContext } from "react";
import { ProductsContext } from "../../ProductContext";
import "./file.css";
import { ToastContainer, toast } from "react-toastify";

const FileUpload = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [idToDelete, setIdToDelete] = useState("");

  const categories = [
    "Electronics",
    "Clothing",
    "Home Appliances",
    "Groceries",
    "Toys",
    "Fruits",
    "Vegetables",
    "Books",
    "Phones/Tablets",
    "Furniture",
  ];

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://posapp1-hg6w-kpues2kdx-samyukthaas-projects.vercel.app/product/postproduct",
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
      setCategory("");
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
        `https://posapp1-hg6w-kpues2kdx-samyukthaas-projects.vercel.app/product/delproducts/${idToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setProducts(
        products.filter((product) => product.id !== parseInt(idToDelete))
      );
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
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
