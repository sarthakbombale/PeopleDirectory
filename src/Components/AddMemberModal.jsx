import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaTimes } from 'react-icons/fa';

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
    avatarUrl: '', // ✅ New field for image URL
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMember = {
      id: Date.now(),
      ...formData,
      teams: formData.teams.split(',').map(t => t.trim()),
      status: 'active',
      avatar: formData.avatarUrl
        ? formData.avatarUrl
        : `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(formData.name)}`,
      username: formData.name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000),
    };

    if (onSave) onSave(newMember);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
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
            position: 'absolute', right: '15px', top: '15px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: theme.colors.text,
          }}
        >
          <FaTimes />
        </button>

        <h2 style={{ marginBottom: '20px', color: theme.colors.primary }}>Add New Member</h2>

        <form onSubmit={handleSubmit}>
          {/* Image URL input */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Profile Image URL</label>
            <input
              type="text"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
            {formData.avatarUrl && (
              <div style={{
                marginTop: '10px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `1px solid ${theme.colors.border}`,
              }}>
                <img
                  src={formData.avatarUrl}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          {/* Name */}
          <div style={{ marginBottom: '15px' }}>
            <label>Name *</label>
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

          {/* Email */}
          <div style={{ marginBottom: '15px' }}>
            <label>Email *</label>
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

          {/* Role */}
          <div style={{ marginBottom: '15px' }}>
            <label>Role *</label>
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

          {/* Teams */}
          <div style={{ marginBottom: '15px' }}>
            <label>Teams (comma-separated) *</label>
            <input
              type="text"
              name="teams"
              value={formData.teams}
              onChange={handleChange}
              required
              placeholder="e.g., Design, Frontend"
              style={{
                width: '100%',
                padding: '6px 12px',
                borderRadius: '9999px',
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
          </div>

          {/* Submit buttons */}
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
