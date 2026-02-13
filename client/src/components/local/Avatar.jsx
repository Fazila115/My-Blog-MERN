import React, { useState } from "react";
import { Avatar, Upload, Tooltip } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

const ProfileAvatar = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleChange = (info) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => setImageUrl(reader.result));
        reader.readAsDataURL(info.file);
        return false; // prevent upload to server
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            {/* Avatar */}
            <Avatar
                size={100}
                src={imageUrl}
                icon={!imageUrl && <UserOutlined />}
            />

            {/* Edit Icon */}
            <Upload
                showUploadList={false}
                beforeUpload={handleChange}
                style={{ position: "absolute", bottom: 0, right: 0 }}
            >
                <Tooltip title="upload">
                    <div style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "#fff", borderRadius: "50%", padding: 4, border: "1px solid #d9d9d9", cursor: "pointer", }} >
                        <EditOutlined />
                    </div>
                </Tooltip>
            </Upload>
        </div>
    );
};

export default ProfileAvatar;
