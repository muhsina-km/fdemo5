import React, { useState } from 'react';
import { Upload, Button, message, Modal, Row, Col } from 'antd';
import { DeleteOutlined, EyeOutlined, RestOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import ImgCrop from 'antd-img-crop';

const HostImgCrop = ({ onUrlChange, resetAfterUpload }) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onChange = ({ fileList: newFileList }) => {
    setLoading(true);
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    // Add any custom validation logic here, if needed
    return true;
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:4005/plantdetails/uploadimg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.imageUrl);
      onUrlChange(response.data.imageUrl);
      if (!response.data || response.data.error) {
        throw new Error(response.data ? response.data.error : 'Failed to upload image');
      }

      onSuccess(response.data);
    } catch (error) {
      console.error(error);
      onError(error);
      message.error('Failed to upload image');
    }
  };

  return (
    <div>
      <Row>
        <Col span={7}>
      <ImgCrop aspect={1 / 1} showGrid showReset>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          beforeUpload={beforeUpload}
          customRequest={customRequest}
          showUploadList={false} // Hide the default file list
        >
          {imageUrl ? (<>
            <img src={imageUrl} alt="Uploaded" style={{ width: '100%',objectFit: 'contain' }}/>
             
             </>
            ): (
          <Button loading={loading} icon={<UploadOutlined />}/>  
          )}
        </Upload>
      </ImgCrop> </Col>
      <Col span={4}>
              {imageUrl && (
                <Button icon={<EyeOutlined />} onClick={() => setPreviewOpen(true)}>Preview</Button>
              )}</Col>
              </Row>
      <Modal open={previewOpen} style={{alignItems:'center',justifyContent:'center',display:'flex'}} title={null} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img
          alt="example"
          style={{
            maxHeight: '70vh',
            maxWidth: '70vw',
            // width: '100%',
          }}
          src={imageUrl}
        />
      </Modal>
    </div>
  );  
};

export default HostImgCrop;
