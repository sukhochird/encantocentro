import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function NewsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden h-full border border-border">
          {/* Image Skeleton */}
          <div className="relative h-48">
            <Skeleton className="w-full h-full" />
            {/* Category Badge Skeleton */}
            <div className="absolute top-4 left-4">
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            {/* Featured Badge Skeleton (occasionally) */}
            {index === 0 && (
              <div className="absolute top-4 right-4">
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            )}
          </div>

          {/* Content Skeleton */}
          <CardContent className="p-6">
            {/* Meta Info Skeleton */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>

            {/* Title Skeleton */}
            <div className="mb-3">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Excerpt Skeleton */}
            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Read More Button Skeleton */}
            <div className="flex items-center justify-between mt-auto">
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}