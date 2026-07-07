## Before You Start

- If the task is ambiguous, list your assumptions explicitly before writing any code. Use the `question` tool to ask for clarification rather than guessing.
- If multiple approaches exist, present tradeoffs (pros/cons) before implementing. If the requested approach is suboptimal, say so.
- Identify what must **not** change and state it. Do not expand scope beyond what was asked.

## Implementation

- Write tests first. Define correctness before implementation. Never implement without a correctness anchor.
- Implement the simplest correct solution first. Optimize only as a separate, subsequent step.
- Only change what is necessary for the task. Do not touch orthogonal code — no refactoring, no comment changes, no reformatting unrelated sections.
- Do not add comments unless explicitly asked. Use clear naming and structure instead.
- Do not introduce new dependencies or paradigms. Follow existing patterns, naming, and style.
- Prefer 100 lines of straightforward code over 1000 lines of clever architecture.

## After Implementation

- Run linters, type checkers, and tests after every meaningful change. Do not assume correctness.
- Remove all dead code, unused imports, stale variables, commented-out code, debug prints, TODO placeholders, and scaffolding you introduced.
- Verify no orthogonal code was accidentally modified.
- If a simpler approach exists now that the code is written, say so and offer to simplify.
