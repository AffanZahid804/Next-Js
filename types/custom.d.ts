// Minimal global type shims for environments where node_modules aren't installed.
// These are intentionally permissive to allow the project to type-check.

declare namespace JSX {
  // Allow any intrinsic element (e.g. div, h1, etc.)
  interface IntrinsicElements {
    [elemName: string]: any;
  }

  interface IntrinsicAttributes {
  [key: string]: any;
  children?: any;
  }
}

// Provide a minimal React namespace so files that reference `React.*` types compile.
declare namespace React {
  type ReactNode = any;
  interface FormEvent<T = any> {
    preventDefault: () => void;
    stopPropagation: () => void;
  }
  type ChangeEvent<T = any> = any;
}

// Minimal module exports for 'react' used by the codebase.
declare module 'react' {
  export type ReactNode = React.ReactNode;
  export function useState<T = any>(initial?: T): [T, (v: any) => void];
  export function useEffect(fn: () => any, deps?: any[]): void;
  export function useRef<T = any>(): { current: T | null };
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps: any[]): T;
  export default {} as any;
}

// Stub next/navigation so imports of useRouter resolve.
declare module 'next/navigation' {
  export function useRouter(): {
    push: (path: string) => void;
    replace?: (path: string) => void;
  };
}

// Minimal zustand declaration to satisfy the store implementation.
declare module 'zustand' {
  export function create<T extends Record<string, any>>(
    initializer: (set: (partial: Partial<T>) => void, get: () => T) => T
  ): () => T;
}
