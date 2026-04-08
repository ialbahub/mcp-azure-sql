<p align="center">
  <h1 align="center">mcp-azure-sql</h1>
  <p align="center">
    <strong>Give any AI agent direct access to Azure SQL databases</strong>
  </p>
  <p align="center">
    <a href="https://www.npmjs.com/package/mcp-azure-sql"><img src="https://img.shields.io/npm/v/mcp-azure-sql?style=flat-square&color=CB3837&logo=npm" alt="npm"></a>
    <a href="https://github.com/ialbahub/mcp-azure-sql/releases"><img src="https://img.shields.io/github/v/release/ialbahub/mcp-azure-sql?style=flat-square&color=00A67E" alt="Release"></a>
    <a href="https://github.com/ialbahub/mcp-azure-sql/blob/main/LICENSE"><img src="https://img.shields.io/github/license/ialbahub/mcp-azure-sql?style=flat-square" alt="License"></a>
    <a href="https://github.com/ialbahub/mcp-azure-sql"><img src="https://img.shields.io/badge/language-Go-00ADD8?style=flat-square&logo=go" alt="Go"></a>
    <img src="https://img.shields.io/badge/tools-34-blue?style=flat-square" alt="34 Tools">
    <a href="https://modelcontextprotocol.io"><img src="https://img.shields.io/badge/MCP-2024--11--05-8B5CF6?style=flat-square" alt="MCP"></a>
  </p>
</p>

---

Enterprise-grade [MCP](https://modelcontextprotocol.io/) server for Azure SQL & SQL Server. Written in Go. 34 tools. Azure AD auth. Tiered safety gates. One command to install.

```
npx -y mcp-azure-sql --version
```

---

## Setup (2 minutes)

### Step 1 — Add to your AI agent

Pick your agent. Copy the config. Restart the agent.

<table>
<tr><td><strong>Claude Code</strong></td><td>

```bash
claude mcp add --transport stdio --scope user azure-sql -- npx -y mcp-azure-sql
```

</td></tr>
<tr><td><strong>Codex CLI</strong></td><td>

Add to `~/.codex/config.toml`:
```toml
[mcp_servers.azure-sql]
command = "npx"
args = ["-y", "mcp-azure-sql"]
env_vars = ["AZURE_SQL_CONFIG_FILE"]
```

</td></tr>
<tr><td><strong>Cursor</strong></td><td>

Add to `~/.cursor/mcp.json` → `mcpServers`:
```json
"azure-sql": {
  "command": "npx",
  "args": ["-y", "mcp-azure-sql"],
  "env": { "AZURE_SQL_CONFIG_FILE": "~/.config/azure-sql-mcp/connections.json" }
}
```

</td></tr>
<tr><td><strong>GitHub Copilot</strong></td><td>

Add to VS Code `settings.json`:
```json
"mcp": { "servers": { "azure-sql": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "mcp-azure-sql"],
  "env": { "AZURE_SQL_CONFIG_FILE": "~/.config/azure-sql-mcp/connections.json" }
}}}
```

</td></tr>
<tr><td><strong>Gemini CLI</strong></td><td>

Add to `~/.gemini/settings.json` → `mcpServers`:
```json
"azure-sql": {
  "command": "npx",
  "args": ["-y", "mcp-azure-sql"],
  "env": { "AZURE_SQL_CONFIG_FILE": "~/.config/azure-sql-mcp/connections.json" }
}
```

</td></tr>
<tr><td><strong>Windsurf</strong></td><td>

Add to `~/.codeium/windsurf/mcp_config.json` → `mcpServers`:
```json
"azure-sql": {
  "command": "npx",
  "args": ["-y", "mcp-azure-sql"],
  "env": { "AZURE_SQL_CONFIG_FILE": "~/.config/azure-sql-mcp/connections.json" }
}
```

</td></tr>
<tr><td><strong>Cline</strong></td><td>

Add via Cline MCP Settings UI, or edit `cline_mcp_settings.json`:
```json
"azure-sql": {
  "command": "npx",
  "args": ["-y", "mcp-azure-sql"],
  "env": { "AZURE_SQL_CONFIG_FILE": "~/.config/azure-sql-mcp/connections.json" }
}
```

</td></tr>
<tr><td><strong>Continue</strong></td><td>

Add to `~/.continue/config.yaml`:
```yaml
mcpServers:
  - name: azure-sql
    command: npx
    args: ["-y", "mcp-azure-sql"]
    env:
      AZURE_SQL_CONFIG_FILE: ~/.config/azure-sql-mcp/connections.json
```

</td></tr>
<tr><td><strong>Claude Desktop</strong></td><td>

Add to `claude_desktop_config.json`:
```json
"azure-sql": {
  "command": "npx",
  "args": ["-y", "mcp-azure-sql"],
  "env": { "AZURE_SQL_CONFIG_FILE": "~/.config/azure-sql-mcp/connections.json" }
}
```

</td></tr>
</table>

### Step 2 — Configure your databases

Create `~/.config/azure-sql-mcp/connections.json`:

```json
{
  "defaults": { "auth": "azuread" },
  "connections": [
    {
      "name": "my-dev-db",
      "server": "myserver-dev.database.windows.net",
      "database": "myapp-dev",
      "environment": "dev"
    },
    {
      "name": "my-prod-db",
      "server": "myserver-prod.database.windows.net",
      "database": "myapp-prod",
      "environment": "prod",
      "prod": true
    }
  ]
}
```

Then sign in to Azure: `az login`

That's it. Your AI agent now has 34 database tools.

---

## What You Get (34 Tools)

<table>
<tr><th>Category</th><th>Tools</th></tr>
<tr><td><strong>Query</strong></td><td><code>query</code> (read-only) &bull; <code>execute</code> (write with safety gate)</td></tr>
<tr><td><strong>Connections</strong></td><td><code>list_connections</code> &bull; <code>test_connection</code> &bull; <code>connection_info</code> &bull; <code>add_connection</code></td></tr>
<tr><td><strong>Schema</strong></td><td><code>list_tables</code> &bull; <code>describe_table</code> &bull; <code>describe_indexes</code> &bull; <code>describe_foreign_keys</code> &bull; <code>search_columns</code> &bull; <code>table_row_counts</code> &bull; <code>search_objects</code> &bull; <code>describe_triggers</code></td></tr>
<tr><td><strong>Code Objects</strong></td><td><code>list_views</code> &bull; <code>describe_view</code> &bull; <code>list_stored_procs</code> &bull; <code>describe_sproc</code> &bull; <code>list_functions</code> &bull; <code>describe_function</code></td></tr>
<tr><td><strong>Performance</strong></td><td><code>explain_query</code> &bull; <code>active_queries</code> &bull; <code>long_running_queries</code> &bull; <code>top_queries_by_cpu</code> &bull; <code>wait_stats</code> &bull; <code>blocking_chains</code> &bull; <code>index_usage_stats</code> &bull; <code>missing_indexes</code> &bull; <code>table_statistics_health</code> &bull; <code>database_size</code></td></tr>
<tr><td><strong>Compliance</strong></td><td><code>compare_tables</code> &bull; <code>ef6_migration_status</code> &bull; <code>permission_audit</code> &bull; <code>hangfire_dashboard</code></td></tr>
</table>

---

## Safety Model

The AI agent **cannot** accidentally destroy your production database.

| | `query` tool | `execute` on dev | `execute` on prod |
|:--|:--|:--|:--|
| **SELECT** | Allowed | — | — |
| **INSERT / UPDATE / DELETE** | Blocked | `confirm=true` required | `confirm=true` required |
| **DROP / TRUNCATE / ALTER** | Blocked | `confirm=true` required | **Blocked entirely** |
| **EXEC / `{call}`** | Blocked | `confirm=true` required | `confirm=true` required |

Mark any connection as production with `"prod": true` or `"environment": "prod"` in the config file.

---

## Authentication

| Mode | Config | Use Case |
|:--|:--|:--|
| **Azure AD** (default) | `"auth": "azuread"` | Azure SQL via `az login`, managed identity, or service principal |
| **SQL Auth** | `"auth": "sql"` + `user` + `password` | Legacy SQL Server with username/password |
| **Connection String** | `"auth": "connstr"` + `connection_string` | Any custom configuration |

---

## Why Go?

Most MCP servers are TypeScript or Python. This one is **Go**.

| | **Go** | TypeScript / Python |
|:--|:--|:--|
| Startup | ~5ms | 500ms+ |
| Binary | 16MB, zero dependencies | Runtime + packages |
| Memory | ~15MB idle | 80MB+ |
| Distribution | Download and run | `npm install` + Node.js |
| Azure AD | Native `go-mssqldb` driver | Requires `@azure/identity` |
| Concurrency | Goroutines | Event loop / GIL |

---

## Install Options

| Method | Command | Requires |
|:--|:--|:--|
| **npx** (recommended) | `npx -y mcp-azure-sql` | Node.js |
| **Install script** | `curl -fsSL https://raw.githubusercontent.com/ialbahub/mcp-azure-sql/main/install.sh \| sh` | curl |
| **Go install** | `go install github.com/ialbahub/mcp-azure-sql@latest` | Go 1.21+ |
| **Download** | [GitHub Releases](https://github.com/ialbahub/mcp-azure-sql/releases) | Nothing |

---

## Configuration Reference

<details>
<summary>Full config file schema</summary>

```json
{
  "defaults": {
    "auth": "azuread",
    "app_name": "my-app"
  },
  "connections": [
    {
      "name": "unique-name",
      "server": "server.database.windows.net",
      "database": "dbname",
      "auth": "azuread",
      "user": "",
      "password": "",
      "connection_string": "",
      "environment": "dev",
      "description": "Human-readable note",
      "app_name": "custom-app-name",
      "prod": false
    }
  ]
}
```

Environment tags: `dev` `sqa` `qa` `beta` `delta` `test` `preprod` `prod`

</details>

<details>
<summary>Legacy env var config (no file needed)</summary>

```bash
export AZURE_SQL_CONNECTIONS="dev=myserver.database.windows.net/mydb;qa=qaserver.database.windows.net/qadb"
```

</details>

<details>
<summary>Override production connections</summary>

```bash
export AZURE_SQL_PROD_CONNECTIONS="my-prod-db,my-staging-db"
```

</details>

---

## Architecture

```
┌──────────────┐     stdio      ┌──────────────────┐    Azure AD    ┌─────────────┐
│  AI Agent    │ ──JSON-RPC──> │  mcp-azure-sql   │ ──────────>   │  Azure SQL  │
│              │ <──────────── │  34 tools         │ <──────────── │  Database   │
└──────────────┘               │  Safety gates     │               └─────────────┘
                               │  Connection pool  │
                               │  Audit logging    │
                               └──────────────────┘
```

- **MCP protocol** — JSON-RPC 2.0 over stdio, version `2024-11-05`
- **Tool annotations** — `ReadOnlyHint`, `DestructiveHint`, `IdempotentHint` on all 34 tools
- **Connection pool** — Cached connections with 30s health-check skip
- **Audit logging** — All queries logged with connection name + production status
- **Error sanitization** — Connection strings never exposed to AI agents
- **GUID formatting** — SQL Server mixed-endian byte ordering handled correctly

---

## Development

```bash
go build -o mcp-azure-sql .
go vet ./...
./mcp-azure-sql --version
```

### Release

```bash
git tag v1.3.0 && git push origin v1.3.0
# GitHub Actions: GoReleaser builds binaries → npm auto-publishes
```

---

<p align="center">
  <sub>Built by <a href="https://albahub.io">Albahub, LLC</a> &bull; <a href="LICENSE">MIT License</a></sub>
</p>
