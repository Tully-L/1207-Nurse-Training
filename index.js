// 实例化 Coze Web SDK 并挂载到全局
window.cozeChatClient = new CozeWebSDK.WebChatClient({
  config: {
    type: 'bot',
    bot_id: '7580568267312807970',
    isIframe: false,
  },
  auth: {
    type: 'token',
    token: 'pat_duOuhtXMUYLj3b0k3buM2RPLttA3Fd8pQKoIdJQIoBHxLXnKkdwidQLSJyP0aUl0',
    onRefreshToken: async () => {
      return 'pat_duOuhtXMUYLj3b0k3buM2RPLttA3Fd8pQKoIdJQIoBHxLXnKkdwidQLSJyP0aUl0';
    }
  },
  userInfo: {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    url: 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze/coze-logo.png',
    nickname: '智慧护理用户',
  },
  ui: {
    base: {
      icon: 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze/chatsdk-logo.png',
      layout: 'pc',
      lang: 'zh-CN',
      zIndex: 1000
    },
    header: {
      isShow: true,
      isNeedClose: true,
    },
    asstBtn: {
      isNeed: true // 保留悬浮按钮，可设为false隐藏
    },
    footer: {
      isShow: true,
      expressionText: 'Powered by Tully',
    },
    chatBot: {
      title: '智慧护理助手',
      uploadable: true,
      width: 390,
    },
  },
});

// 新增：适配新版SDK的“打开对话框”方法（封装兼容逻辑）
window.openCozeChat = function() {
  const client = window.cozeChatClient;
  if (!client) return false;
  
  // 优先使用新版方法 setVisible（强制显示）
  if (client.setVisible) {
    client.setVisible(true);
  } 
  // 兼容旧版方法 openChat
  else if (client.openChat) {
    client.openChat();
  } 
  // 兜底：使用 toggleVisible（切换显隐）
  else if (client.toggleVisible) {
    client.toggleVisible();
  } else {
    console.error('Coze SDK 无可用的显隐控制方法');
    return false;
  }
  return true;
};

// 新增：适配新版SDK的“发送消息”方法
window.sendCozeMessage = function(content) {
  const client = window.cozeChatClient;
  if (!client || !content) return;
  
  // 新版SDK发送消息的正确写法
  if (client.sendMessage) {
    client.sendMessage({ content });
  } else if (client.send) { // 兼容更早期版本
    client.send(content);
  }
};