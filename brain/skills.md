# Skills Directory

This file contains a collection of skills available for the AI assistant.

---
name: api-design-best-practices
description: Creates well-structured REST APIs in Next.js with Zod validation, advanced error handling, TypeScript types, and request logging.
---

# API Design Best Practices for Next.js

## When to use this skill
Use this skill when creating API routes in Next.js App Router projects. This ensures consistent, maintainable, and production-ready API endpoints.

## Standard Response Format
Always return responses in this consistent format:
```typescript
{
  success: true,
  data: {...},
  message: "Optional success message"
}
```

---
name: roll-dice
description: Roll dice using a random number generator. Use when asked to roll a die (d6, d20, etc.), roll dice, or generate a random dice roll.
---

# Roll Dice Skill

To roll a die, use the following command that generates a random number from 1 to the given number of sides:

```bash
echo $((RANDOM % <sides> + 1))
```

```powershell
Get-Random -Minimum 1 -Maximum (<sides> + 1)
```

---
name: seo-geo
description: Optimize websites for AI search engines (ChatGPT, Perplexity, Gemini, Copilot, Claude) and traditional search engines (Google, Bing).
---

# SEO/GEO Optimization Skill

Comprehensive SEO and GEO (Generative Engine Optimization) for websites. Optimize for both traditional search engines (Google, Bing) and AI search engines.

## GEO Methods
| Method | Visibility Boost |
| :--- | :--- |
| Cite Sources | +40% |
| Statistics Addition | +37% |
| Quotation Addition | +30% |
| Authoritative Tone | +25% |

... (and more)
