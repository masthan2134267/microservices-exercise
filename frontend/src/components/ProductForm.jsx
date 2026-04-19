import { useState } from 'react';

function ProductForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: formData.name.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    await onSubmit(payload);

    setFormData({
      name: '',
      price: '',
      stock: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', marginTop: '16px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>Price</label>
        <br />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>Stock</label>
        <br />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Create Product'}
      </button>
    </form>
  );
}

export default ProductForm;