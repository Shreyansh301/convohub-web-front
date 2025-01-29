import React from 'react'

export default function UserReviews() {
    return (
      <section className="p-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Review 1 */}
          <div className="p-6 text-center bg-white shadow-lg rounded-lg">
            <p className="text-lg text-gray-700">
              “ConvoHub is a game-changer!.”
            </p>
            <div className="mt-4">
              <img
                src="/man.png"
                alt="User 1"
                className="w-12 h-12 rounded-full mx-auto"
              />
              <div className="mt-2 text-gray-800">Shreyansh Srivastava</div>
            </div>
          </div>
          {/* Review 2 */}
          <div className="p-6 text-center bg-white shadow-lg rounded-lg">
            <p className="text-lg text-gray-700">
              “I feel secure using ConvoHub.”
            </p>
            <div className="mt-4">
              <img
                src="/man2.png"
                alt="User 2"
                className="w-12 h-12 rounded-full mx-auto"
              />
              <div className="mt-2 text-gray-800">Arav Negi</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  