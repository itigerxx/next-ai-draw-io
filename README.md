````markdown
# Next AI Draw.io

<div align="center">

**AI-Powered Diagram Creation Tool - Chat, Draw, Visualize**

English | [中文](./docs/cn/README_CN.md) | [日本語](./docs/ja/README_JA.md)

[![TrendShift](https://trendshift.io/api/badge/repositories/15449)](https://next-ai-drawio.jiang.jp/)

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb)](https://react.dev/)
[![Sponsor](https://img.shields.io/badge/Sponsor-❤-ea4aaa)](https://github.com/sponsors/DayuanJiang)

[![Live Demo](./public/live-demo-button.svg)](https://next-ai-drawio.jiang.jp/)

</div>

A Next.js web application that integrates AI capabilities with draw.io diagrams. Create, modify, and enhance diagrams through natural language commands and AI-assisted visualization.

> Note: Thanks to <img src="https://raw.githubusercontent.com/DayuanJiang/next-ai-draw-io/main/public/doubao-color.png" alt="" height="20" /> [ByteDance Doubao](https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=Z9Z3LDTJ&utm_campaign=drawio&utm_content=drawio&utm_medium=devrel&utm_source=OWO&utm_term=drawio) sponsorship, the demo site now uses the powerful glm-4.7 model!

<p align="center">
  <a href="https://www.atlascloud.ai/?utm_source=github&utm_medium=link&utm_campaign=next-ai-draw-io">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./public/atlas-cloud-logo-white.svg">
      <img src="./public/atlas-cloud-logo.svg" alt="Atlas Cloud" width="200">
    </picture>
  </a>
</p>

> 🎁 Thanks to **[Atlas Cloud](https://www.atlascloud.ai/?utm_source=github&utm_medium=link&utm_campaign=next-ai-draw-io)** for sponsoring next-ai-draw-io. Its OpenAI-compatible API gives diagram workflows one provider connection for DeepSeek, Qwen, GLM, Kimi, MiniMax, and more. Budget-friendly access is available through the [Coding Plan](https://www.atlascloud.ai/console/coding-plan).


https://github.com/user-attachments/assets/9d60a3e8-4a1c-4b5e-acbb-26af2d3eabd1


## Table of Contents

- [Next AI Draw.io](#next-ai-drawio)
  - [Table of Contents](#table-of-contents)
  - [Examples](#examples)
  - [Features](#features)
  - [MCP Server](#mcp-server)
    - [Claude Code CLI](#claude-code-cli)
  - [Getting Started](#getting-started)
    - [Try it Online](#try-it-online)
    - [Desktop Application](#desktop-application)
    - [Run with Docker](#run-with-docker)
    - [Installation](#installation)
  - [Deployment](#deployment)
    - [Deploy to EdgeOne Pages](#deploy-to-edgeone-pages)
    - [Deploy on Vercel](#deploy-on-vercel)
    - [Deploy on Cloudflare Workers](#deploy-on-cloudflare-workers)
  - [Multi-Provider Support](#multi-provider-support)
    - [Server-Side Multi-Model Configuration](#server-side-multi-model-configuration)
    - [Admin Panel](#admin-panel)
  - [How It Works](#how-it-works)
  - [Support \& Contact](#support--contact)
  - [FAQ](#faq)
  - [Star History](#star-history)

## Examples

Here are some example prompts and their generated diagrams:

<div align="center">
<table width="100%">
  <tr>
    <td colspan="2" valign="top" align="center">
      <strong>Animated transformer connectors</strong><br />
      <p><strong>Prompt:</strong> Give me a **animated connector** diagram of transformer's architecture.</p>
      <img src="./public/animated_connectors.svg" alt="Transformer Architecture with Animated Connectors" width="480" />
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <strong>RAG Technique Diagram</strong><br />
      <p><strong>Prompt:</strong> Generate a RAG architecture diagram for **chat application**. Use connected diagram for data ingestion</p>
      <img src="./public/rag_prod.svg" alt="RAG Architecture Diagram" width="480" />
    </td>
    <td width="50%" valign="top">
      <strong>Authentication using React and AWS</strong><br />
      <p><strong>Prompt:</strong> Generate authentication process using React with **AWS**. Use Serverless architecture.</p>
      <img src="./public/auth.svg" alt="Authentication Architecture Diagram" width="480" />
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <strong>Open Innovation</strong><br />
      <p><strong>Prompt:</strong> Create visualization of Henry Chesbrough's Open Innovation model.</p>
      <img src="./public/inno.svg" alt="Open Innovation Diagram" width="480" />
    </td>
    <td width="50%" valign="top">
      <strong>Cat sketch</strong><br />
      <p><strong>Prompt:</strong> Draw a cute cat for me.</p>
      <img src="./public/cat_demo.svg" alt="Cat Drawing" width="240" />
    </td>
  </tr>
</table>
</div>

## Features

- **LLM-Powered Diagram Creation**: Leverage Large Language Models to create and manipulate draw.io diagrams directly through natural language commands
- **Image-Based Diagram Replication**: Upload existing diagrams or images and have the AI replicate and enhance them automatically
- **PDF & Text File Upload**: Upload PDF documents and text files to extract content and generate diagrams from existing documents
- **AI Reasoning Display**: View the AI's thinking process for supported models (OpenAI o1/o3, Gemini, Claude, etc.)
- **Diagram History**: Comprehensive version control that tracks all changes, allowing you to view and restore previous versions of your diagrams before the AI editing.
- **Interactive Chat Interface**: Communicate with AI to refine your diagrams in real-time
- **Cloud Architecture Diagram Support**: Specialized support for generating cloud architecture diagrams (AWS, GCP, Azure)
- **Animated Connectors**: Create dynamic and animated connectors between diagram elements for better visualization

## MCP Server

Use Next AI Draw.io with AI agents like Claude Desktop, Cursor, and VS Code via MCP (Model Context Protocol).

```json
{
  "mcpServers": {
    "drawio": {
      "command": "npx",
      "args": ["@next-ai-drawio/mcp-server@latest"]
    }
  }
}
````

### Claude Code CLI

```bash
claude mcp add drawio -- npx @next-ai-drawio/mcp-server@latest
```

Then ask Claude to create diagrams:

> "Create a flowchart showing user authentication with login, MFA, and session management"

The diagram appears in your browser in real-time!

See the [MCP Server README](./packages/mcp-server/README.md) for VS Code, Cursor, and other client configurations.

## Getting Started

### Try it Online

No installation needed! Try the app directly on our demo site:

[![Live Demo](./public/live-demo-button.svg)](https://next-ai-drawio.jiang.jp/)

> **Bring Your Own API Key**: You can use your own API key to bypass usage limits on the demo site. Click the Settings icon in the chat panel to configure your provider and API key. Your key is stored locally in your browser and is never stored on the server.

### Desktop Application

Download the native desktop app for your platform from the [Releases page](https://github.com/DayuanJiang/next-ai-draw-io/releases):

Supported platforms: Windows, macOS, Linux.

### Run with Docker

[Go to Docker Guide](./docs/en/docker.md)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/DayuanJiang/next-ai-draw-io
cd next-ai-draw-io
npm install
cp env.example .env.local
```

See the [Provider Configuration Guide](./docs/en/ai-providers.md) for detailed setup instructions for each provider.

2. Run the development server:

```bash
npm run dev
```

3. Open http://localhost:6002 in your browser to see the application.

## Deployment

### Deploy to EdgeOne Pages

You can deploy with one click using [Tencent EdgeOne Pages](https://pages.edgeone.ai/).

Deploy by this button:

[![Deploy to EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https%3A%2F%2Fgithub.com%2FDayuanJiang%2Fnext-ai-draw-io)

Check out the [Tencent EdgeOne Pages documentation](https://pages.edgeone.ai/document/deployment-overview) for more details.

Additionally, deploying through Tencent EdgeOne Pages will also grant you a [daily free quota for DeepSeek models](https://pages.edgeone.ai/document/edge-ai).

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DayuanJiang/next-ai-draw-io)

The easiest way to deploy is using [Vercel](https://vercel.com/new), the creators of Next.js. Be sure to **set the environment variables** in the Vercel dashboard as you did in your local `.env.local` file.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Deploy on Cloudflare Workers

[Go to Cloudflare Deploy Guide](./docs/en/cloudflare-deploy.md)

## Multi-Provider Support

* [ByteDance Doubao](https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=Z9Z3LDTJ&utm_campaign=drawio&utm_content=drawio&utm_medium=devrel&utm_source=OWO&utm_term=drawio)
* AWS Bedrock (default)
* OpenAI
* Anthropic
* Google AI
* Google Vertex AI
* Azure OpenAI
* Ollama
* OpenRouter
* AIHubMix
* DeepSeek
* SiliconFlow
* ModelScope
* SGLang
* Vercel AI Gateway
* [Atlas Cloud](https://www.atlascloud.ai/?utm_source=github&utm_medium=link&utm_campaign=next-ai-draw-io)

All providers except AWS Bedrock and OpenRouter support custom endpoints.

📖 **[Detailed Provider Configuration Guide](./docs/en/ai-providers.md)** - See setup instructions for each provider.

### Server-Side Multi-Model Configuration

Administrators can configure multiple server-side models that are available to all users without requiring personal API keys. Configure via `AI_MODELS_CONFIG` environment variable (JSON string) or `ai-models.json` file. For a single-provider quick setup, list comma-separated model IDs in `AI_MODEL`.

### Admin Panel

Set the `ADMIN_PASSWORD` environment variable and visit `/admin` to manage server settings (models, access codes, features, observability, quota) from a web panel instead of hand-editing `.env`.

📖 **[Admin Panel Guide](./docs/en/admin-panel.md)** — setup, precedence rules, and notes.

**Model Requirements**: This task requires strong model capabilities for generating long-form text with strict formatting constraints (draw.io XML). Recommended models include Claude Sonnet 4.5, GPT-5.1, Gemini 3 Pro, and DeepSeek V3.2/R1.

Note that the `claude` series has been trained on draw.io diagrams with cloud architecture logos like AWS, Azure, GCP. So if you want to create cloud architecture diagrams, this is the best choice.

## How It Works

The application uses the following technologies:

* **Next.js**: For the frontend framework and routing
* **Vercel AI SDK** (`ai` + `@ai-sdk/*`): For streaming AI responses and multi-provider support
* **react-drawio**: For diagram representation and manipulation

Diagrams are represented as XML that can be rendered in draw.io. The AI processes your commands and generates or modifies this XML accordingly.

## Support & Contact

**Special thanks to [ByteDance Doubao](https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=Z9Z3LDTJ&utm_campaign=drawio&utm_content=drawio&utm_medium=devrel&utm_source=OWO&utm_term=drawio) for sponsoring the API token usage of the demo site!** Register on the ARK platform to get 500K free tokens for all models!

**Special thanks to [Atlas Cloud](https://www.atlascloud.ai/?utm_source=github&utm_medium=link&utm_campaign=next-ai-draw-io) for sponsoring next-ai-draw-io and supporting its multi-provider ecosystem!** Try its OpenAI-compatible LLM API through the [Atlas Cloud Coding Plan](https://www.atlascloud.ai/console/coding-plan).

If you find this project useful, please consider [sponsoring](https://github.com/sponsors/DayuanJiang) to help me host the live demo site!

For support or inquiries, please open an issue on the GitHub repository or contact the maintainer at:

* Email: me[at]jiang.jp

## FAQ

See [FAQ](./docs/en/FAQ.md) for common issues and solutions.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=DayuanJiang/next-ai-draw-io\&type=date\&legend=top-left)](https://www.star-history.com/#DayuanJiang/next-ai-draw-io&type=date&legend=top-left)

---

## 私有化部署说明

将 [Draw.io v31.4.6](https://github.com/jgraph/drawio/releases) 的发行包 `draw.war` 解压并完整放置到 `/public/draw.io` 路径下，这是本地私有化部署 Draw.io 的基础。

后续对 Draw.io 的修改可参考 Git Log 信息。

### Zybank 自定义图标侧边栏

为了在内置的 Draw.io v31.4.6 基础上增加项目自有的 Zybank SVG 图标库，而不修改或重新编译 Draw.io 原有的 `app.min.js`，我们新增了 `js/zybank.js` 并调整了 `js/bootstrap.js` 的脚本加载顺序。

`zybank.js` 基于 Draw.io 原生 `Sidebar` API，通过扩展 `Sidebar.prototype` 增加 `addZybankPalette()` 方法，并使用 `createVertexTemplateEntry()` 将 `public/zybank-icons/` 下的 `computer.svg`、`database.svg`、`mobile.svg`、`server.svg`、`user.svg` 和 `web-server.svg` 注册为一个名为 `Zybank` 的独立侧边栏图标分类。

同时扩展 `Sidebar.prototype.initPalettes()`，在 Draw.io 初始化原有图标库后追加 Zybank 图标库。

`bootstrap.js` 的修改是为了保证执行顺序：必须先加载 Draw.io 的 `app.min.js`，使 `Sidebar` 等核心对象和原生图标库完成加载，再加载 `zybank.js` 对 `Sidebar` 进行扩展，最后才执行 `App.main()` 完成 Draw.io 初始化。

如果 `zybank.js` 在 `app.min.js` 之前执行，`Sidebar` 尚未定义，扩展会失败；如果在 `App.main()` 之后才加载，则 Draw.io 的侧边栏初始化可能已经完成，新增的 palette 不会参与首次初始化。

因此最终加载关系为：

```text
app.min.js → zybank.js → App.main()
```

这种方式属于对 Draw.io 前端 Sidebar 的轻量扩展，不需要修改 Draw.io 核心代码、不需要重新构建 `app.min.js`，也不需要将 SVG 转换成 Base64。

侧边栏中的图标直接通过 `image=/zybank-icons/*.svg` 引用 `public` 目录中的静态 SVG 文件。

#### 后续新增图标分类

如果后续需要增加其他分类，例如 `Network`、`Cloud`、`Payment` 等，不需要再次修改 `bootstrap.js`，只需要在 `zybank.js` 中增加对应的 Palette，并在 `initPalettes()` 中注册即可。

例如新增一个 `Network` 分类：

```javascript
Sidebar.prototype.addNetworkPalette = function()
{
    var fns = [];

    fns.push(
        this.createVertexTemplateEntry(
            'shape=image;html=1;image=/network-icons/router.svg;aspect=fixed;',
            80,
            80,
            '',
            'Router',
            true,
            null,
            'network router gateway'
        )
    );

    fns.push(
        this.createVertexTemplateEntry(
            'shape=image;html=1;image=/network-icons/switch.svg;aspect=fixed;',
            80,
            80,
            '',
            'Switch',
            true,
            null,
            'network switch'
        )
    );

    this.addPaletteFunctions(
        'network',
        'Network',
        false,
        fns
    );
};
```

然后在 `initPalettes()` 中增加：

```javascript
Sidebar.prototype.initPalettes = function()
{
    originalInitPalettes.apply(this, arguments);

    this.addZybankPalette();
    this.addNetworkPalette();
};
```

这样 Draw.io 侧边栏中就会新增一个独立的 `Network` 分类。

分类数量增加后，可以按照相同方式继续添加：

```text
Zybank
Network
Cloud
Payment
...
```

需要注意，**分类和 SVG 文件目录没有强绑定关系**。

例如可以按照分类分别存放：

```text
public/
├── zybank-icons/
│   ├── computer.svg
│   ├── database.svg
│   └── ...
│
├── network-icons/
│   ├── router.svg
│   └── switch.svg
│
└── cloud-icons/
    ├── cloud.svg
    └── cdn.svg
```

也可以全部放在同一个 SVG 目录中。

真正决定图标属于哪个 Draw.io 分类的是 `addPaletteFunctions()` 的注册位置，而不是 SVG 文件所在目录。

因此，后续新增分类的步骤固定为：

1. 将新的 SVG 文件放到 `public` 下。
2. 在 `zybank.js` 中创建对应的 `addXXXPalette()`。
3. 使用 `createVertexTemplateEntry()` 注册该分类中的 SVG。
4. 使用 `addPaletteFunctions()` 指定分类 ID 和显示名称。
5. 在 `initPalettes()` 中调用新的 `addXXXPalette()`。
6. **无需修改 `bootstrap.js`**。

```
```
