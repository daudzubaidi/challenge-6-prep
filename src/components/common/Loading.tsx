export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-4">
        <div className="h-12 w-12 rounded-full border-4 border-gray-700 border-t-red-600 animate-spin"></div>
        <p className="text-center text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-900 animate-pulse">
      <div className="aspect-video bg-gray-800"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-800 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
        <div className="flex justify-between">
          <div className="h-3 w-1/3 bg-gray-800 rounded"></div>
          <div className="h-3 w-1/3 bg-gray-800 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const MovieCardSkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};
