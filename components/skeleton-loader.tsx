import React from 'react'

export function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="aspect-video bg-muted rounded-t-xl" />
            <div className="p-6">
              <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-1"></div>
              <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}