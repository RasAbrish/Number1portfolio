"use client"

export default function FloatingCharacter() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] pointer-events-none">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotateCube3D {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg); }
        }
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        .cube-wrapper {
          perspective: 1000px;
          animation: floatUpDown 4s ease-in-out infinite;
        }
        .cube-3d {
          position: relative;
          width: 2.5rem;
          height: 2.5rem;
          transform-style: preserve-3d;
          animation: rotateCube3D 12s infinite linear;
        }
      `}} />
      <div className="cube-wrapper">
        <div className="cube-3d">
          <div className="absolute inset-0 border-[1.5px] border-primary bg-background/60 backdrop-blur-sm [transform:translateZ(1.25rem)]" />
          <div className="absolute inset-0 border-[1.5px] border-primary bg-background/60 backdrop-blur-sm [transform:rotateY(180deg)_translateZ(1.25rem)]" />
          <div className="absolute inset-0 border-[1.5px] border-primary bg-background/60 backdrop-blur-sm [transform:rotateY(90deg)_translateZ(1.25rem)]" />
          <div className="absolute inset-0 border-[1.5px] border-primary bg-background/60 backdrop-blur-sm [transform:rotateY(-90deg)_translateZ(1.25rem)]" />
          <div className="absolute inset-0 border-[1.5px] border-primary bg-background/60 backdrop-blur-sm [transform:rotateX(90deg)_translateZ(1.25rem)]" />
          <div className="absolute inset-0 border-[1.5px] border-primary bg-background/60 backdrop-blur-sm [transform:rotateX(-90deg)_translateZ(1.25rem)]" />
        </div>
      </div>
    </div>
  )
}
