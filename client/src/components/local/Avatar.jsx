import React, { useState } from "react";
import { Avatar, Upload, Tooltip } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

const ProfileAvatar = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (file) => {
        const reader = new FileReader();
        reader.onload = () => setImageUrl(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <Upload
            showUploadList={false}
            accept="image/*"
            customRequest={({ file, onSuccess }) => {
                handleFileChange(file);
                onSuccess("ok"); // prevent upload to server
            }}
        >
            <div style={{ position: "relative", display: "inline-block", cursor: "pointer" }}>
                {/* Avatar */}
                <Avatar
                    size={100}
                    src={imageUrl}
                    icon={!imageUrl && <UserOutlined />}
                />

                {/* Edit Icon */}
                <Tooltip title="Upload">
                    <div style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "#F3EAEA", borderRadius: "20%", padding: 4, cursor: "pointer", }} >
                        <EditOutlined />
                    </div>
                </Tooltip>
            </div>
        </Upload>
    );
};

export default ProfileAvatar;
