// 1. 导入必要的模块和类型定义
import React, { useState } from'react';
// 从React库中导入React核心对象以及useState钩子函数。React用于构建React组件，useState用于在函数组件中管理状态。

// 2. 定义消息对象的接口类型
interface Message {
  id: number;
  author: string;
  content: string;
}
// 这里定义了一个名为Message的接口，规定了消息对象应具有的结构，包含id（数字类型）、author（字符串类型，代表消息作者）和content（字符串类型，代表消息内容）这三个属性。

// 3. 定义函数组件App
const App: React.FC = () => {
  // 以下是组件内部的状态及对应的状态更新函数声明，使用useState进行初始化

  // 3.1 初始化activeTab状态，用于记录当前激活的选项卡
  const [activeTab, setActiveTab] = useState<'messages' | 'chat' | 'profile'>('messages');
  // useState接收一个泛型参数，限定activeTab的取值只能是'messages'、'chat'或者'profile'这三个字符串字面量类型之一，初始值设为'messages'。

  // 3.2 初始化messages状态，用于存储留言板的消息列表
  const [messages, setMessages] = useState<Message[]>([]);
  // 这里定义messages的类型为Message类型的数组，初始时为空数组，表示留言板一开始没有消息。

  // 3.3 初始化chatMessages状态，用于存储聊天室的消息列表
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  // 同理，chatMessages也是Message类型的数组，初始为空，用于存放聊天室相关的消息。

  // 3.4 初始化newMessage状态，用于绑定留言板输入框中的新消息内容
  const [newMessage, setNewMessage] = useState('');
  // 它是一个字符串类型的状态，初始为空字符串，会随着用户在留言板输入框的输入而改变。

  // 3.5 初始化chatMessage状态，用于绑定聊天室输入框中的聊天内容
  const [chatMessage, setChatMessage] = useState('');
  // 和newMessage类似，不过是针对聊天室输入框的内容，同样初始为空字符串。

  // 3.6 初始化username状态，用于存储用户名
  const [username, setUsername] = useState('User123');
  // 字符串类型，初始值设为'User123'，可根据实际需求进行修改，代表当前用户的名称。

  // 4. 定义处理留言板发送消息的函数
  const handleSendMessage = () => {
    // 4.1 检查输入的新消息是否为空（去除两端空白字符后），如果为空则直接返回，不进行发送操作
    if (newMessage.trim() === '') return;

    // 4.2 创建一个新的Message类型的对象，用于表示要发送的新消息
    const newMessageObject: Message = {
      id: messages.length + 1,
      // 新消息的id根据当前messages数组的长度加1来生成，确保每个消息都有唯一的id。
      author: username,
      // 消息的作者设置为当前的用户名，取自username状态。
      content: newMessage
      // 消息的内容就是用户在输入框中输入的内容，取自newMessage状态。
    };

    // 4.3 通过调用setMessages函数更新messages状态，将新创建的消息对象添加到原消息列表中
    setMessages([...messages, newMessageObject]);
    // 使用展开运算符将原messages数组和新消息对象合并成新的数组，然后更新状态，触发组件重新渲染，展示新的消息列表。

    // 4.4 将newMessage状态置为空字符串，清空留言板输入框的内容
    setNewMessage('');
  };

  // 5. 定义处理聊天室发送消息的函数，逻辑和handleSendMessage类似
  const handleSendChatMessage = () => {
    if (chatMessage.trim() === '') return;
    const newChatMessageObject: Message = {
      id: chatMessages.length + 1,
      author: username,
      content: chatMessage
    };
    setChatMessages([...chatMessages, newChatMessageObject]);
    setChatMessage('');
  }

  // 6. 组件的返回部分，定义了组件的UI结构，使用JSX语法进行描述
  return (
    <div className="font-sans antialiased bg-gray-100 min-h-screen">
      {/* 6.1 页面顶部的导航栏部分，使用nav元素表示 */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-around items-center">
          {/* 6.1.1 “留言板”按钮，点击时设置activeTab为'messages'，切换到留言板视图 */}
          <button
            className={`px-4 py-2 rounded hover:bg-blue-600 focus:outline-none ${
              activeTab ==='messages'? 'bg-blue-700 text-white' : 'text-white'
            }`}
            onClick={() => setActiveTab('messages')}
          >
            留言板
          </button>
          {/* 6.1.2 “聊天室”按钮，点击时设置activeTab为'chat'，切换到聊天室视图 */}
          <button
            className={`px-4 py-2 rounded hover:bg-blue-600 focus:outline-none ${
              activeTab === 'chat'? 'bg-blue-700 text-white' : 'text-white'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            聊天室
          </button>
          {/* 6.1.3 “个人中心”按钮，点击时设置activeTab为'profile'，切换到个人中心视图 */}
          <button
            className={`px-4 py-2 rounded hover:bg-blue-600 focus:outline-none ${
              activeTab === 'profile'? 'bg-blue-700 text-white' : 'text-white'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            个人中心
          </button>
        </div>
      </nav>

      {/* 6.2 页面主体内容部分，使用main元素表示 */}
      <main className="container mx-auto p-4">
        {/* 6.2.1 当activeTab为'messages'时，展示留言板相关内容 */}
        {activeTab ==='messages' && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">留言板</h2>
            <div className="space-y-4">
              {/* 遍历messages数组，将每条消息渲染成一个带有样式的卡片 */}
              {messages.map((message) => (
                <div key={message.id} className="p-2 border border-gray-300 rounded">
                  <p className="text-sm font-semibold">{message.author}:</p>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              {/* 留言板输入框，通过onChange事件实时更新newMessage状态 */}
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="输入你的留言"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              {/* 留言板发送按钮，点击时调用handleSendMessage函数发送消息 */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={handleSendMessage}
              >
                发送
              </button>
            </div>
          </div>
        )}

        {/* 6.2.2 当activeTab为'chat'时，展示聊天室相关内容，结构和留言板部分类似 */}
        {activeTab === 'chat' && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">聊天室</h2>
            <div className="space-y-4">
              {chatMessages.map(message => (
                <div key={message.id} className="p-2 border border-gray-300 rounded">
                  <p className="text-sm font-semibold">{message.author}:</p>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="输入你的聊天"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={handleSendChatMessage}
              >
                发送
              </button>
            </div>
          </div>
        )}

        {/* 6.2.3 当activeTab为'profile'时，展示个人中心相关内容 */}
        {activeTab === 'profile' && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">个人中心</h2>
            <div className="flex items-center space-x-4">
              {/* 此处可能是用于展示头像等的占位元素，目前只是一个简单的灰色方块样式 */}
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div>
                <p className="text-lg font-semibold">用户名: {username}</p>
                <p className="text-gray-600">可以展示更多个人信息</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// 7. 将定义好的App组件默认导出，方便其他模块引入使用
export default App;