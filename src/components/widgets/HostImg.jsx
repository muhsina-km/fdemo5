import React, { useState } from 'react';
import { Upload, Button, message, Spin, Card, Avatar, Modal } from 'antd';
import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';

const HostImg = ({ onUrlChange, resetAfterUpload }) => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].status === 'done') {
      onUrlChange(newFileList[0].response.imageUrl);
      setUploadedImageUrl(newFileList[0].response.imageUrl);
      if (resetAfterUpload) {
        setFileList([]); // Reset fileList when resetAfterUpload is true
      }
    }
  };

  const beforeUpload = (file) => {
    // Add any custom validation logic here, if needed
    return true;
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      setLoading(true); // Set loading to true while uploading

      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:3001/utils/uploadimg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data || response.data.error) {
        throw new Error(response.data ? response.data.error : 'Failed to upload image');
      }

      onSuccess(response.data);
    } catch (error) {
      console.error(error);
      onError(error);
      message.error('Failed to upload image');
    } finally {
      setLoading(false); // Reset loading state after upload is complete or failed
    }
  };

  return (
    <div>
        {uploadedImageUrl && (
          <Avatar
            style={{ marginRight: '10px' }}
            size="large"
            src={<img alt="uploaded" src={uploadedImageUrl} />}
            onClick={() => setPreviewOpen(true)}
          />
        )  }
      <Upload
        listType="picture"
        accept="image/*"
        previewFile={(file) => file.url || file.originFileObj}
        fileList={fileList}
        onPreview={(file) => {
          if (file.url) {
            window.open(file.url, '_blank');
          }
        }}
        onChange={onChange}
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        showUploadList={false} 
      >
        
          <Button icon={<UploadOutlined />} loading={loading}>
            Upload Image
          </Button>
        
      </Upload>
      {/* {loading && <Spin />} */}
      <Modal open={previewOpen} style={{alignItems:'center',justifyContent:'center',display:'flex'}} title={null} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img
          alt="example"
          style={{
            maxHeight: '70vh',
            maxWidth: '70vw',
            // width: '100%',
          }}
          src={uploadedImageUrl}
        />
      </Modal>
    </div>
  );
};

export default HostImg;
