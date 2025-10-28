import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaTimes } from 'react-icons/fa';
// Parent component should provide onSave(newMember)
function AddMemberModal({ onClose, onSave }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    teams: '',
    dob: '',
    gender: '',
    nationality: '',
    contact: '',
    workEmail: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new member object
    const newMember = {
      id: Date.now(), // Generate a unique ID
      ...formData,
      teams: formData.teams.split(',').map(t => t.trim()), // Convert comma-separated teams to array
      status: 'active', // Default status
      // Use uploaded image if available, otherwise generate avatar
      avatar: imageFile ? URL.createObjectURL(imageFile) : `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(formData.name)}`,
      // Generate a username from name
      username: formData.name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000),
    };

    // Delegate saving to parent via onSave
    if (onSave && typeof onSave === 'function') {
      onSave(newMember);
    }

    // Close the modal
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: theme.colors.surface,
        borderRadius: '10px',
        padding: '20px',
        width: '90%',
        maxWidth: '500px',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: theme.colors.text,
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '15px',
            top: '15px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: theme.colors.text,
          }}
        >
          <FaTimes />
        </button>

        <h2 style={{ marginBottom: '20px', color: theme.colors.primary }}>Add New Member</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Profile Image</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {imagePreview && (
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `1px solid ${theme.colors.border}`,
                }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${theme.colors.border}`,
                  background: theme.colors.surface,
                  color: theme.colors.text,
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Role *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '12px',
                fontWeight: '500',
                color: theme.colors.textSecondary || theme.colors.text,
                letterSpacing: '0.3px',
              }}
            >
              Teams (comma-separated) *
            </label>
            <input
              type="text"
              name="teams"
              value={formData.teams}
              onChange={handleChange}
              required
              placeholder="e.g., Design, Frontend, Backend"
              style={{
                width: '100%',
                padding: '6px 12px',
                borderRadius: '9999px', // capsule shape
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
                fontSize: '12px', // smaller, clean font
                outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
              onFocus={(e) =>
                (e.target.style.border = `1px solid ${theme.colors.primary || '#7C3AED'}`)
              }
              onBlur={(e) =>
                (e.target.style.border = `1px solid ${theme.colors.border}`)
              }
            />
          </div>


          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Work Email</label>
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.buttonBorder}`,
                background: theme.colors.buttonBg,
                color: theme.colors.buttonText,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                background: theme.colors.primary,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMemberModal;