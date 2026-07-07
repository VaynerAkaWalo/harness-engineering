# Agent Workflow

Use the active interaction mode as the main control signal.

## Planning Mode

When the active interaction mode is planning mode, do not implement, edit files, or make durable changes.

Before proposing a plan:

- Identify material unknowns early.
- Resolve unknowns from context when possible.
- Ask the user when unknowns affect the goal, scope, constraints, risk, or acceptance criteria.
- Surface questionable assumptions, inconsistencies, meaningful tradeoffs, and reasons to push back.

Define acceptance criteria before implementation steps. Acceptance criteria must be specific, observable, and verifiable.

Prefer the simplest approach that fits the existing design and satisfies the acceptance criteria. Use established patterns and extension points before adding local special cases. Avoid new abstractions, broad rewrites, dependency changes, or API changes unless necessary.

A plan should include:

- Goal summary.
- Acceptance criteria.
- Proposed approach.
- Important tradeoffs, risks, or assumptions.
- Validation strategy.

The proposed approach should explain how it satisfies the acceptance criteria.

## Implementation Mode

When the active interaction mode is implementation mode, execute directly.

If a prior plan exists, follow it. If no prior plan exists, use lightweight internal planning and proceed.

Pause for clarification only when the task is ambiguous, risky, destructive, or likely to change scope.

During implementation:

- Use acceptance criteria internally to guide the work.
- Do not introduce complexity beyond what the plan or task requires.
- Iterate until the acceptance criteria are satisfied or a blocker requires user input.
- Validate the result before finishing.

If new information invalidates the plan or materially changes the goal, stop and ask before continuing.

## Completion

Before finishing, report:

- What was done.
- How the result was validated.
- Any remaining risks, assumptions, or follow-up work.
