# EmailJS 设置指南

本指南将引导您完成 EmailJS 的设置，以便从 2026 情人节测验应用程序发送测验答案。

## 概述

EmailJS 允许您直接从 Web 应用程序发送电子邮件，而无需后端服务器。该测验使用 EmailJS 将用户回复发送到您的电子邮件地址。

## 第 1 步：创建一个免费的 EmailJS 帐户

1. 访问 [emailjs.com](https://www.emailjs.com/)
2. 点击右上角的 **"Sign Up"** (注册)
3. 选择 **"Sign up with Google"** (使用 Google 注册) 或 **"Sign up with Email"** (使用电子邮件注册)
4. 完成注册流程
5. 验证您的电子邮件地址

## 第 2 步：创建一个邮件服务 (Email Service)

EmailJS 需要知道使用哪个邮件服务 (Gmail, Outlook 等)。

### 选项 A：使用 Gmail

1. 在 EmailJS 仪表板中，点击 **"Email Services"** (邮件服务)（左侧边栏）
2. 点击 **"Add Service"** (添加服务)
3. 从列表中选择 **"Gmail"**
4. 点击 **"Connect with Gmail"** (连接 Gmail)
5. 登录您的 Gmail 帐户
6. 授予 EmailJS 发送电子邮件的权限
7. 复制 **Service ID** (看起来像 `service_abc123def456`)
8. 保存它以备后用（第 4 步）

### 选项 B：使用 Outlook/Microsoft 365

1. 在 EmailJS 仪表板中，点击 **"Email Services"**
2. 点击 **"Add Service"**
3. 从列表中选择 **"Gmail"** (注意：如果列表不同，请选择相应的 Outlook 或其他服务)
4. 输入您的电子邮件和密码
5. 复制 **Service ID**
6. 保存它以备后用（第 4 步）

### 选项 C：使用其他电子邮件提供商

1. 在 EmailJS 仪表板中，点击 **"Email Services"**
2. 点击 **"Add Service"**
3. 选择您的电子邮件提供商 (Yahoo, SendGrid 等)
4. 按照提供商的特定说明进行操作
5. 复制 **Service ID**
6. 保存它以备后用（第 4 步）

## 第 3 步：创建一个邮件模板 (Email Template)

邮件模板定义了测验答案在电子邮件中的格式。

1. 在 EmailJS 仪表板中，点击 **"Email Templates"** (邮件模板)（左侧边栏）
2. 点击 **"Create New Template"** (创建新模板)
3. 给它一个名称 (例如 "Quiz Answers")
4. 将 `email-templates/quiz-answers.html` 的内容粘贴到 **HTML Content** 编辑器中
5. 复制 **Template ID** (看起来像 `template_xyz789abc123`)
6. 别忘了点击右侧某处的蓝色小按钮 **Save** (保存)！

## 第 4 步：获取您的公钥 (Public Key)

1. 在 EmailJS 仪表板中，点击 **"Account"** (帐户)（右上角菜单）
2. 点击 **"API Keys"**
3. 复制您的 **Public Key** (看起来像 `pk_abc123xyz789def456`)
4. 保存它以备后用

## 第 5 步：将凭据添加到您的 `.env` 文件

1. 在项目根目录中，创建或编辑 `.env` 文件（如果不存在）
2. 添加这三行：
   ```
   EMAILJS_SERVICE_ID=your_service_id_here
   EMAILJS_TEMPLATE_ID=your_template_id_here
   EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
3. 将占位符值替换为第 2、3 和 4 步中的实际 ID：
   - `your_service_id_here` → 您的 Service ID (例如 `service_abc123`)
   - `your_template_id_here` → 您的 Template ID (例如 `template_xyz789`)
   - `your_public_key_here` → 您的 Public Key (例如 `pk_abc123xyz789`)

**示例：**

```
EMAILJS_SERVICE_ID=service_a1b2c3d4e5f6g7h8
EMAILJS_TEMPLATE_ID=template_x9y8z7w6v5u4t3s2
EMAILJS_PUBLIC_KEY=pk_live_abc123xyz789def456ghi789
```

## 第 6 步：重启您的开发服务器

更新 `.env` 后，重启您的开发服务器：

```bash
bun run dev
```

现在，当用户提交测验时，应用程序会将测验答案发送到您的电子邮件。

## 故障排除

### "EmailJS not fully configured" 警告

**问题：** 您在浏览器控制台中看到此警告。

**解决方案：** 确保在 `.env` 中设置了所有三个环境变量：

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

更新 `.env` 后重启您的开发服务器。

### 邮件未送达

**问题：** 测验提交完成，但邮件未送达。

**可能的原因：**

1. 检查您的垃圾邮件文件夹
2. 验证邮件服务是否已在 EmailJS 仪表板中连接
3. 检查浏览器控制台是否有错误消息 (F12 → Console 选项卡)
4. 验证 `.env` 中的 Template ID 是否正确

### "Service not found" 错误

**问题：** 您在控制台中看到此错误。

**解决方案：** 仔细检查 `.env` 中的 Service ID 是否与 EmailJS 仪表板中显示的完全匹配。复制并粘贴以避免拼写错误。

### "Template not found" 错误

**问题：** 您在控制台中看到此错误。

**解决方案：** 仔细检查 `.env` 中的 Template ID 是否与 EmailJS 仪表板中显示的完全匹配。

## 安全注意事项

- **切勿将 `.env` 提交到 Git** - 它已经在 `.gitignore` 中了
- **公开 Public Key 是安全的** - 它设计为公开的（在浏览器中使用）
- **Service ID 和 Template ID 是半公开的** - 它们在您的 EmailJS 仪表板中可见，但不应随意共享
- **保持您的 `.env` 文件私密** - 不要与他人共享

## 测试 EmailJS

要测试 EmailJS 是否正常工作：

1. 在浏览器中打开测验应用程序
2. 完成测验并提交
3. 检查您的电子邮件收件箱（和垃圾邮件文件夹）
4. 您应该收到一封包含测验答案的电子邮件

如果您没有收到电子邮件，请检查浏览器控制台 (F12) 是否有错误消息。

## 下一步

- 自定义邮件模板以匹配您的品牌
- 如果需要，添加其他模板变量
- 使用不同的电子邮件提供商进行测试
- 在仪表板中监控您的 EmailJS 使用情况（免费层有限制）

## 免费层限制

EmailJS 提供免费层，限制如下：

- 每月 200 封邮件
- 无限的邮件模板
- 无限的邮件服务

如果您超过免费层限制，您可以在 EmailJS 帐户设置中升级到付费计划。

## 支持

有关 EmailJS 的更多信息：

- [EmailJS 文档](https://www.emailjs.com/docs/)
- [EmailJS SDK 参考](https://www.emailjs.com/docs/sdk/send/)
- [EmailJS 支持](https://www.emailjs.com/support/)
