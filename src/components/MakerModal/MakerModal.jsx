import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, X, Plus, Trash2, Tag, Loader2, DollarSign } from 'lucide-react';
import './MakerModal.css';

export default function MakerModal({ onClose, onSubmit }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Decor');
    const [description, setDescription] = useState('');
    const [story, setStory] = useState('');
    const [images, setImages] = useState([]);

    // Dummy categories
    const categories = ['Decor', 'Fashion', 'Furniture', 'Art', 'Utility'];

    // Handle dummy image upload for demo purposes
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (images.length < 5) {
                    setImages([...images, reader.result]);
                } else {
                    alert('Maximum of 5 photos allowed.');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (step === 1) {
            if (!name || !price) return alert("Please enter a name and price.");
        }
        if (step === 2) {
            if (images.length === 0) return alert("Please upload at least one image of your project.");
        }
        setStep(p => Math.min(p + 1, 3));
    };

    const handleBack = () => {
        setStep(p => Math.max(p - 1, 1));
    };

    const handlePublish = async () => {
        if (!story) return alert("Please share the story behind your creation.");

        setIsSubmitting(true);
        const payload = {
            name,
            price: Number(price),
            category,
            description,
            story,
            images
        };

        // Let the parent handle the API call or mock submission
        await onSubmit(payload);
        setIsSubmitting(false);
    };

    return (
        <div className="maker-modal-overlay">
            <div className="maker-modal-content">
                <button className="maker-close-btn" onClick={onClose} disabled={isSubmitting}>
                    <X size={20} />
                </button>

                {/* Progress Header */}
                <div className="maker-modal-header">
                    <h2>Submit Your Creation</h2>
                    <div className="maker-progress-bar">
                        <div className={`maker-step ${step >= 1 ? 'active' : ''}`}>1</div>
                        <div className="maker-line"></div>
                        <div className={`maker-step ${step >= 2 ? 'active' : ''}`}>2</div>
                        <div className="maker-line"></div>
                        <div className={`maker-step ${step >= 3 ? 'active' : ''}`}>3</div>
                    </div>
                </div>

                <div className="maker-modal-body">
                    {/* STEP 1: Basic Info */}
                    {step === 1 && (
                        <div className="maker-step-content animation-fade-in">
                            <h3>Product Details</h3>
                            <p className="maker-subtitle">Give your upcycled creation an identity.</p>

                            <div className="maker-field">
                                <label>Creation Name *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Minimalist PET Vase"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="maker-field-row">
                                <div className="maker-field">
                                    <label>Selling Price (₹) *</label>
                                    <div className="maker-input-icon">
                                        <DollarSign size={16} />
                                        <input
                                            type="number"
                                            placeholder="450"
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className="maker-field">
                                    <label>Category</label>
                                    <div className="maker-input-icon">
                                        <Tag size={16} />
                                        <select value={category} onChange={e => setCategory(e.target.value)}>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="maker-field">
                                <label>Short Description</label>
                                <textarea
                                    placeholder="Basic details about materials, dimensions, or usage context..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    rows="3"
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Media Upload */}
                    {step === 2 && (
                        <div className="maker-step-content animation-fade-in">
                            <h3>Project Gallery</h3>
                            <p className="maker-subtitle">Show buyers your process. Upload photos of the raw plastic, your workspace, and the final piece.</p>

                            <div className="maker-upload-area">
                                <input type="file" id="productImages" accept="image/*" onChange={handleImageChange} hidden />
                                <label htmlFor="productImages" className="maker-upload-label">
                                    <Camera size={32} />
                                    <span>Tap to add photos (max 5)</span>
                                    <span className="maker-upload-hint">Include before, during, and after shots!</span>
                                </label>
                            </div>

                            {images.length > 0 && (
                                <div className="maker-preview-grid">
                                    {images.map((imgSrc, i) => (
                                        <div key={i} className="maker-preview-card">
                                            <img src={imgSrc} alt={`preview ${i}`} />
                                            {i === 0 && <span className="maker-cover-badge">Cover</span>}
                                            <button className="maker-remove-img" onClick={() => removeImage(i)}>
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 3: Behind the Craft */}
                    {step === 3 && (
                        <div className="maker-step-content animation-fade-in">
                            <h3>The Story Behind It <Sparkles size={16} style={{ color: '#f59e0b', display: 'inline', marginLeft: 6 }} /></h3>
                            <p className="maker-subtitle">Our buyers purchase for the impact as much as the product. Tell them your journey.</p>

                            <div className="maker-story-box">
                                <div className="maker-story-prompts">
                                    <strong>Need inspiration?</strong> Try answering:
                                    <ul>
                                        <li>Where did you collect this plastic from?</li>
                                        <li>What inspired you to turn it into this specific product?</li>
                                        <li>What challenges did you face making it?</li>
                                    </ul>
                                </div>
                                <textarea
                                    className="maker-story-input"
                                    placeholder="Write your story here... Let buyers connect emotionally with your craft."
                                    value={story}
                                    onChange={e => setStory(e.target.value)}
                                    rows="6"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="maker-modal-footer">
                    {step > 1 ? (
                        <button className="maker-btn-outline" onClick={handleBack} disabled={isSubmitting}>Back</button>
                    ) : (
                        <div></div> // Spacer
                    )}

                    {step < 3 ? (
                        <button className="maker-btn-primary" onClick={handleNext}>Next Step</button>
                    ) : (
                        <button className="maker-btn-primary maker-btn-submit" onClick={handlePublish} disabled={isSubmitting}>
                            {isSubmitting ? <><Loader2 size={16} className="spin" /> Publishing...</> : 'Publish to Marketplace'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
