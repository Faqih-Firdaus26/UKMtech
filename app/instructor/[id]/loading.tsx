export default function InstructorDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="h-6 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:shrink-0 md:w-1/3 relative h-64 md:h-auto">
              <div className="bg-gray-200 h-full w-full animate-pulse"></div>
            </div>
            
            <div className="p-8 md:p-6 lg:p-8 md:w-2/3">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
                
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
                
                <div className="mt-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-3 animate-pulse"></div>
                  <div className="flex space-x-4">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="h-6 bg-gray-200 rounded w-2/5 mb-6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 