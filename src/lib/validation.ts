import type { Context } from 'hono';

export function zodErrorHook(
  result:
    | { success: true; data: unknown }
    | {
        success: false;
        error: { issues: Array<{ path: PropertyKey[]; message: string }> };
      },
  c: Context,
) {
  if (!result.success) {
    return c.json(
      {
        errors: result.error.issues.map((issue) => ({
          path: issue.path.map(String).join('.'),
          message: issue.message,
        })),
      },
      400,
    );
  }
}
