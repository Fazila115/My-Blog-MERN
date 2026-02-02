import React from 'react'

const AppLoader = () => {
    return (
        <div className='p-10 flex flex-col items-center justify-center min-h-screen bg-[#f3845f]'>
            <p className='mb-4 text-white text-lg'>Loading App...</p>
            <div style={{
                width: "50px", aspectRatio: "1",
                color: "white",
                background: `
          radial-gradient(farthest-side,currentColor 92%,transparent) no-repeat 50% 0 / 12px 12px,
          radial-gradient(farthest-side,currentColor 92%,transparent) no-repeat 50% 100% / 12px 12px,
          radial-gradient(farthest-side,currentColor 92%,transparent) no-repeat 100% 50% / 12px 12px,
          radial-gradient(farthest-side,currentColor 92%,transparent) no-repeat 0 50% / 12px 12px,
          radial-gradient(farthest-side,currentColor 92%,transparent) no-repeat 50% 50% / 12px 12px,
          conic-gradient(from 90deg at 4px 4px, transparent 90deg, currentColor 0) -4px -4px / calc(50% + 2px) calc(50% + 2px)
        `,
                animation: "spin 1s infinite linear",
            }}
            ></div>

        </div>
    )
}

export default AppLoader
