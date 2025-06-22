import type { NextRequest } from "next/server";

interface RequestMetrics {
  path: string;
  method: string;
  startTime: number;
  duration?: number;
  status?: number;
}

const metrics: RequestMetrics[] = [];

export async function monitorRequest<T extends Request | NextRequest>(
  req: T,
  handler: (req: T) => Promise<Response>,
) {
  const startTime = performance.now();
  const getPath = (req: Request | NextRequest): string => {
    if ("nextUrl" in req) {
      return req.nextUrl.pathname;
    }
    try {
      return new URL(req.url).pathname;
    } catch {
      // If URL parsing fails, try to extract path from url string
      const urlPath = req.url.split("?")[0];
      return urlPath.startsWith("http") ? new URL(urlPath).pathname : urlPath;
    }
  };

  const path = getPath(req);
  const method = req.method;

  try {
    const response =
      process.env.NODE_ENV === "test"
        ? await handler(req)
        : await Promise.race([
            handler(req),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error("Request timeout")), 30000),
            ),
          ]);

    const duration = performance.now() - startTime;

    // Store metrics
    metrics.push({
      path,
      method,
      startTime,
      duration,
      status: response.status,
    });

    // Log performance metrics
    console.info(
      `API ${method} ${path} completed in ${duration.toFixed(2)}ms with status ${response.status}`,
    );

    return response;
  } catch (error) {
    const duration = performance.now() - startTime;

    // Store error metrics
    metrics.push({
      path,
      method,
      startTime,
      duration,
      status: 500,
    });

    console.error(
      `API ${method} ${path} failed after ${duration.toFixed(2)}ms:`,
      error,
    );
    throw error;
  }
}

// Utility to get recent metrics
export function getRecentMetrics(minutes: number = 5): RequestMetrics[] {
  const cutoff = Date.now() - minutes * 60 * 1000;
  return metrics.filter((m) => m.startTime > cutoff);
}
