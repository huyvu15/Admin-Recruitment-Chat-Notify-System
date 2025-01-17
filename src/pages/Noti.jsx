import React, { useState } from 'react';
import './styles.css';
import { Send, Image, X } from 'lucide-react';

function EmailForm() {
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmails: '',
    subject: '',
    message: '',
    image: null,
  });

  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/avif'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        alert('Chỉ chấp nhận file ảnh định dạng JPEG, PNG, hoặc GIF.');
        return;
      }

      if (file.size > maxSize) {
        alert('File ảnh không được lớn hơn 2MB.');
        return;
      }

      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const emails = formData.candidateEmails.split(',').map((email) => email.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra định dạng email
    for (let email of emails) {
      if (!emailRegex.test(email)) {
        alert(`Email không hợp lệ: ${email}`);
        setIsSending(false);
        return;
      }
    }

    const formDataToSend = new FormData();
    formDataToSend.append('candidateName', formData.candidateName);
    formDataToSend.append('emails', JSON.stringify(emails));
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Email đã được gửi thành công!');
      } else {
        alert('Có lỗi xảy ra khi gửi email.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gửi email thành công!');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="email-form-container">
      <div className="form-section">
        <div className="form-left">
          <h2 className="form-title">Soạn Tin Nhắn</h2>
          <form className="email-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="candidateName">Label:</label>
              <input
                type="text"
                id="candidateName"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="candidateEmails">Email ứng viên:</label>
              <input
                type="text"
                id="candidateEmails"
                name="candidateEmails"
                value={formData.candidateEmails}
                onChange={handleInputChange}
                placeholder="email1@example.com, email2@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Chủ Đề:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Nội Dung Thư:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chọn ảnh:
                </label>
                <div className="mt-1 flex items-center">
                  <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Image className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Choose image</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            {/* <button className="sent-button">Sent</button> */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                {isSending ? 'Sending...' : 'Send Message'}
              </div>
            </button>
          </form>
        </div>

        <div className="form-right">
          <div className="phone-preview">
            <div className="phone-frame">
              <div className="phone-top">
                <div className="time">12:47</div>
                <div className="date-time-container">
                  <div className="additional-text">T.3, 3 tháng 12</div>
                </div>
                <div className="phone-container">
                  <div className="camera-container">
                    <div className="camera-icon"></div>
                    <span className="camera-text">Google</span>
                  </div>
                  <div className="status-bar">
                    <div className="battery-icon">📶🛜🔋75%</div>
                  </div>
                  <div className="bottom-line"></div>
                  <div className="round-button">
                    <i className="fa fa-box">☆</i>
                  </div>
                </div>
              </div>
              <div className="phone-screen">
                <div className="email-preview">
                  <h3>{formData.subject || "Chủ Đề Thư"}</h3>
                  <p>{formData.message || "Nội dung thư sẽ hiển thị ở đây."}</p>
                  {formData.image && (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="preview"
                      className="preview-image"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailForm;

