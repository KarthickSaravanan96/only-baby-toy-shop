import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: 0
    },
    originalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Toys', 'Baby Care', 'Feeding', 'Diapers', 'Gear', 'Wipes', 'Others']
    },
    ageGroup: {
        type: String,
        required: [true, 'Age group is required']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    reviews: {
        type: Number,
        default: 0,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 10,
        min: 0
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
productSchema.index({ category: 1, ageGroup: 1 });
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
