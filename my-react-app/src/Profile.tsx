import React from'react';

interface ProfileProps {
  username: string;
}

const Profile: React.FC<ProfileProps> = ({ username }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">个人中心</h2>
      <div className="flex items-center space-x-4">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        <div>
          <p className="text-lg font-semibold">用户名: {username}</p>
          <p className="text-gray-600">可以展示更多个人信息</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;