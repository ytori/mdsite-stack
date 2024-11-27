export type Handle = {
  title: string;
  description: string;
};

function isHandle(obj: unknown): obj is Handle {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof (obj as Handle).title === 'string' &&
    typeof (obj as Handle).description === 'string'
  );
}

export function validateHandle(
  obj: unknown,
): { success: true; data: Handle } | { success: false; error: Error } {
  if (isHandle(obj)) {
    return {
      success: true,
      data: obj,
    };
  }
  return {
    success: false,
    error: new Error(
      "invalid handle: handle must contain 'title' and 'description'.",
    ),
  };
}
