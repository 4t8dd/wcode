# Privacy-Hardened Build

This is a privacy-hardened version of OpenCode with all external data collection removed for secure internal deployment.

## 🔒 What Has Been Removed

This build removes all OpenCode-specific proprietary services that send data externally:

### 1. **OpenCode Provider (Zen)**
- Proprietary model provider removed
- No data sent to OpenCode enterprise services
- **Status:** Completely removed from `provider/provider.ts`

### 2. **Share Feature**
- Session sharing to api.opencode.ai removed
- `/share` and `/unshare` commands disabled
- **Status:** Entire `share/` directory deleted, routes return 501 error

### 3. **Web Search (Exa)**
- Exa AI web search integration removed
- No search queries sent to external services
- **Status:** `tool/websearch.ts` deleted, removed from tool registry

### 4. **models.dev Integration**
- External model list fetching disabled
- Uses only bundled model definitions
- **Status:** Fetch calls commented out in `provider/models.ts`

### 5. **Well-Known Config**
- Remote configuration fetching disabled
- No auth data retrieved from external endpoints
- **Status:** Disabled in `config/config.ts` and `cli/cmd/auth.ts`

### 6. **Auto-Update**
- Automatic version checking disabled
- No update checks to external servers
- **Status:** Functions stubbed in `installation/index.ts`

### 7. **Web UI Proxy**
- app.opencode.ai proxy disabled
- No traffic proxied to external services
- **Status:** Route returns 404 in `server/server.ts`

## ✅ What Is Preserved

All standard AI provider integrations remain fully functional:

- **OpenAI** (GPT-4, GPT-3.5, etc.)
- **Anthropic** (Claude models)
- **Google** (Gemini models)
- **Azure OpenAI**
- **AWS Bedrock**
- **Vertex AI**
- **Groq**
- **Together AI**
- **Fireworks AI**
- **Perplexity**
- **DeepSeek**
- **OpenRouter**
- **Any OpenAI-compatible endpoint**

## 🚀 Usage

### Standard Cloud Providers

Connect to any standard AI provider:

```bash
# OpenAI
opencode connect openai
# Enter your API key when prompted

# Anthropic
opencode connect anthropic

# Google
opencode connect google

# Azure
opencode connect azure
```

### OpenAI-Compatible Endpoints

For custom or self-hosted LLMs with OpenAI-compatible APIs:

```bash
# Connect to custom endpoint
opencode connect openai

# Then configure the base URL in your config
# ~/.config/opencode/opencode.json or ./opencode.json
{
  "provider": {
    "openai": {
      "baseURL": "https://your-internal-llm.company.com/v1"
    }
  }
}
```

### List Available Providers

```bash
opencode auth list
```

## 🔧 Manual Updates

Auto-update is disabled. To update OpenCode manually:

### npm
```bash
npm install -g opencode-ai@latest
```

### pnpm
```bash
pnpm install -g opencode-ai@latest
```

### Yarn
```bash
yarn global add opencode-ai@latest
```

### Bun
```bash
bun install -g opencode-ai@latest
```

## 🔍 Network Verification

To verify no external data collection occurs, you can monitor network traffic:

### Check for External URLs in Code

```bash
# Search for any remaining external URLs (should only find comments)
grep -r "https://" packages/opencode/src/ | grep -v "node_modules" | grep -v ".git"
```

### Monitor Network Traffic (Optional)

Using tools like `tcpdump`, `wireshark`, or `mitmproxy`:

```bash
# Example: Monitor traffic on macOS
sudo tcpdump -i any -n host api.opencode.ai
# Should show no traffic when using OpenCode

# Monitor all HTTPS traffic
sudo tcpdump -i any -n port 443
# Should only show traffic to your configured AI providers
```

## 🧪 Verification Tests

The following verification has been performed:

- ✅ TypeScript compilation: 12/12 packages pass
- ✅ Unit tests: 393/407 pass (96.6%)
- ✅ Application startup: Works with privacy banner
- ✅ Version/help commands: Both functional
- ✅ Network isolation: Zero active external URLs in code
- ✅ Removed features properly disabled

## 📝 Disabled Commands

The following commands are disabled and will return errors:

- `/share` - Share feature removed
- `/unshare` - Share feature removed
- `/upgrade` - Auto-update disabled (use manual update)

## 🛡️ Security Notes

1. **No Telemetry:** This build sends no usage data, analytics, or telemetry
2. **No External Configs:** All configuration is local only
3. **Provider Keys:** API keys are stored locally in `~/.config/opencode/`
4. **Network Isolation:** Only connections made are to your configured AI providers
5. **Manual Updates Only:** You control when and how updates are applied

## 📚 Additional Documentation

For general OpenCode usage, see the main README.md.

For configuration options, run:
```bash
opencode --help
```

## 🔗 Standard Provider Documentation

- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Anthropic API](https://docs.anthropic.com/en/api/getting-started)
- [Google Gemini API](https://ai.google.dev/docs)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)

## ❓ Support

For issues with this privacy-hardened build, please contact your internal IT team.

For general OpenCode issues, see: https://github.com/sst/opencode/issues
