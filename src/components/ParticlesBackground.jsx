import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      init={particlesInit}
      options={{
        background: { color: { value: "#000000" } },
        particles: {
          number: { value: 80 },
          color: { value: "#00ff00" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          links: {
            enable: true,
            color: "#00ff00",
            opacity: 0.2
          }
        }
      }}
      className="absolute inset-0"
    />
  )
}

export default ParticlesBackground