# mcp-azure-sql

**Give any AI agent direct access to Azure SQL databases.**

34 tools. Azure AD auth. Tiered safety gates. Zero dependencies. Written in Go.

[![GitHub](https://img.shields.io/github/v/release/albahubio/mcp-azure-sql?style=flat-square&color=00A67E&label=release)](https://github.com/albahubio/mcp-azure-sql)
[![License](https://img.shields.io/github/license/albahubio/mcp-azure-sql?style=flat-square)](https://github.com/albahubio/mcp-azure-sql/blob/main/LICENSE)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)
![MCP](https://img.shields.io/badge/MCP-2024--11--05-8B5CF6?style=flat-square)

Works with **Claude Code** · **Codex CLI** · **Gemini CLI** · **GitHub Copilot** · **Cursor** · **Windsurf** · **Cline** · **Continue** · and any MCP client.

## Install

```bash
npx -y mcp-azure-sql --version
```

That's it. No Go, no build tools, no dependencies. The npm package automatically downloads the pre-built Go binary for your platform.

## Add to Your AI Agent

```bash
# Claude Code
claude mcp add --transport stdio --scope user azure-sql -- npx -y mcp-azure-sql

# Codex CLI
codex mcp add azure-sql -- npx -y mcp-azure-sql

# Gemini CLI
gemini mcp add -s user azure-sql npx -y mcp-azure-sql
```

For Cursor, Copilot, Windsurf, Cline, Continue, and Claude Desktop — add to your config file:

```json
{
  "azure-sql": {
    "command": "npx",
    "args": ["-y", "mcp-azure-sql"],
    "env": {
      "AZURE_SQL_CONFIG_FILE": "~/.config/azure-sql-mcp/connections.json"
    }
  }
}
```

## Configure Databases

Create `~/.config/azure-sql-mcp/connections.json`:

```json
{
  "defaults": { "auth": "azuread" },
  "connections": [
    {
      "name": "dev",
      "server": "myserver.database.windows.net",
      "database": "myapp-dev",
      "environment": "dev"
    },
    {
      "name": "prod",
      "server": "myserver.database.windows.net",
      "database": "myapp-prod",
      "environment": "prod",
      "prod": true
    }
  ]
}
```

Then: `az login`

## 34 Tools

| Category | Tools |
|:---------|:------|
| **Query** | `query` (read-only) · `execute` (write with safety gate) |
| **Schema** | `list_tables` · `describe_table` · `describe_indexes` · `describe_foreign_keys` · `search_columns` · `table_row_counts` · `search_objects` · `describe_triggers` |
| **Code Objects** | `list_views` · `describe_view` · `list_stored_procs` · `describe_sproc` · `list_functions` · `describe_function` |
| **Performance** | `explain_query` · `active_queries` · `long_running_queries` · `top_queries_by_cpu` · `wait_stats` · `blocking_chains` · `index_usage_stats` · `missing_indexes` · `table_statistics_health` · `database_size` |
| **Connections** | `list_connections` · `test_connection` · `connection_info` · `add_connection` |
| **Compliance** | `compare_tables` · `ef6_migration_status` · `permission_audit` · `hangfire_dashboard` |

## Safety

| | `query` | `execute` (dev) | `execute` (prod) |
|:--|:--|:--|:--|
| SELECT | Allowed | — | — |
| INSERT / UPDATE / DELETE | Blocked | `confirm=true` | `confirm=true` |
| DROP / TRUNCATE / ALTER | Blocked | `confirm=true` | **Blocked** |

Mark connections as production with `"prod": true` in the config file.

## Authentication

| Mode | Use Case |
|:--|:--|
| `azuread` (default) | Azure SQL via `az login`, managed identity, or service principal |
| `sql` | Legacy SQL Server with username/password |
| `connstr` | Any custom connection string |

## How It Works

This npm package is a thin wrapper around a pre-built Go binary. On `npm install`, it downloads the correct binary for your platform (Linux/macOS/Windows, amd64/arm64) from [GitHub Releases](https://github.com/albahubio/mcp-azure-sql/releases). The binary runs as an MCP stdio server — your AI agent communicates with it via JSON-RPC 2.0 over stdin/stdout.

**Why Go?** ~5ms startup, 15MB memory, single binary with zero runtime dependencies. [Read more](https://github.com/albahubio/mcp-azure-sql#why-go).

## Links

- [GitHub](https://github.com/albahubio/mcp-azure-sql) — source, docs, releases
- [Example config](https://github.com/albahubio/mcp-azure-sql/blob/main/example-config.json) — all connection options

## License

MIT — [Albahub, LLC](https://albahub.io)
